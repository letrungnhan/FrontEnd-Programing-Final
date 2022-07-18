import { Directive, Inject, Input, forwardRef, HostListener, HostBinding, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TAB, ENTER, HOME, END, ESCAPE, UP_ARROW, DOWN_ARROW } from '@angular/cdk/keycodes';
import { Subject, fromEvent, merge } from 'rxjs';
import { takeUntil, filter, tap, switchMap, startWith } from 'rxjs/operators';
import { TemplatePortal } from '@angular/cdk/portal';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
export const MDB_AUTOCOMPLETE_VALUE_ACCESOR = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line: no-use-before-declare
    useExisting: forwardRef(() => MdbAutocompleteDirective),
    multi: true,
};
export class MdbAutocompleteDirective {
    constructor(_overlay, _vcr, _elementRef, _viewportRuler, document) {
        this._overlay = _overlay;
        this._vcr = _vcr;
        this._elementRef = _elementRef;
        this._viewportRuler = _viewportRuler;
        this.document = document;
        this._canOpenOnFocus = true;
        this._isDropdownOpen = false;
        this._destroy$ = new Subject();
        this.autocomplete = true;
        this._onChange = () => { };
        this._onTouched = () => { };
    }
    get input() {
        return this._elementRef.nativeElement;
    }
    // get labelActive(): boolean {
    //   return this._isDropdownOpen || this.hasValue;
    // }
    get hasValue() {
        return this._elementRef.nativeElement.value;
    }
    onKeydown(event) {
        this._handleKeyDown(event);
        // tslint:disable-next-line: deprecation
        const isTabKey = event.keyCode === TAB;
        if (isTabKey) {
            if (this.mdbAutocomplete.autoSelect && this.activeOption && this._isDropdownOpen) {
                this._setValue(this.activeOption);
                this.activeOption.select();
                this._resetHighlight();
                this._clearPreviousSelection();
            }
            this.close();
        }
    }
    _handleInput(event) {
        if (!this._isDropdownOpen) {
            this.open();
        }
        this._onChange(event.target.value);
    }
    _handleFocusIn() {
        if (!this._canOpenOnFocus) {
            this._canOpenOnFocus = true;
        }
        else {
            this.open();
        }
    }
    _handleBlur() {
        this._canOpenOnFocus = this.document.activeElement !== this.input;
        this._onTouched();
    }
    get isOpen() {
        return this._isDropdownOpen;
    }
    get labelActive() {
        return this._isDropdownOpen || this.hasValue;
    }
    _handleKeyDown(event) {
        // tslint:disable-next-line: deprecation
        const key = event.keyCode;
        const manager = this.mdbAutocomplete._keyManager;
        if (this.activeOption && this._isDropdownOpen && key === ENTER) {
            this._setValue(this.activeOption);
            this.activeOption.select();
            this._resetHighlight();
            this._clearPreviousSelection();
            this.close();
            event.preventDefault();
        }
        if (this.mdbAutocomplete) {
            const previousActiveItem = manager.activeItem;
            if (this._isDropdownOpen || key === TAB) {
                manager.onKeydown(event);
            }
            if (!this._isDropdownOpen && key === DOWN_ARROW && event.altKey) {
                this.open();
            }
            if (key === HOME) {
                manager.setFirstItemActive();
            }
            else if (key === END) {
                manager.setLastItemActive();
            }
            if (manager.activeItem !== previousActiveItem) {
                this._moveHighlightedIntoView();
            }
        }
    }
    _moveHighlightedIntoView() {
        const index = this.mdbAutocomplete._keyManager.activeItemIndex;
        if (index === 0) {
            this.mdbAutocomplete._setScrollTop(0);
        }
        else if (index && index > -1) {
            let newScrollPosition;
            const option = this.mdbAutocomplete._getOptionsArray()[index];
            const optionHeight = option.offsetHeight;
            const listHeight = this.mdbAutocomplete.listHeight;
            const itemTop = index * optionHeight;
            const itemBottom = itemTop + optionHeight;
            const viewTop = this.mdbAutocomplete._getScrollTop();
            const viewBottom = viewTop + listHeight;
            if (itemBottom > viewBottom) {
                newScrollPosition = itemBottom - listHeight;
                this.mdbAutocomplete._setScrollTop(newScrollPosition);
            }
            else if (itemTop < viewTop) {
                newScrollPosition = itemTop;
                this.mdbAutocomplete._setScrollTop(newScrollPosition);
            }
        }
    }
    _setValue(option) {
        this._clearPreviousSelection();
        const value = this.mdbAutocomplete && this.mdbAutocomplete.displayValue
            ? this.mdbAutocomplete.displayValue(option.value)
            : option.value;
        this._setInputValue(value);
        this._onChange(value);
        this.mdbAutocomplete.selected.emit({
            component: this.mdbAutocomplete,
            option: option,
        });
    }
    _clearPreviousSelection() {
        this.mdbAutocomplete.options.forEach((option) => {
            if (option.selected) {
                option.deselect();
            }
        });
    }
    _setInputValue(value) {
        this.input.value = value;
    }
    get activeOption() {
        if (this.mdbAutocomplete && this.mdbAutocomplete._keyManager) {
            return this.mdbAutocomplete._keyManager.activeItem;
        }
        return null;
    }
    _resetHighlight() {
        this.mdbAutocomplete._keyManager.setActiveItem(0);
    }
    open() {
        let overlayRef = this._overlayRef;
        if (!overlayRef) {
            this._portal = new TemplatePortal(this.mdbAutocomplete.dropdownTemplate, this._vcr);
            overlayRef = this._overlay.create({
                width: this.input.offsetWidth,
                scrollStrategy: this._overlay.scrollStrategies.reposition(),
                positionStrategy: this._getOverlayPosition(),
            });
            this._overlayRef = overlayRef;
            overlayRef.keydownEvents().subscribe((event) => {
                // tslint:disable-next-line: deprecation
                const key = event.keyCode;
                if (key === ESCAPE || (key === UP_ARROW && event.altKey)) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.close();
                    this._resetHighlight();
                }
            });
            this._listenToOptionChange();
        }
        if (overlayRef && !overlayRef.hasAttached()) {
            overlayRef.attach(this._portal);
            this._listenToOutSideCick(overlayRef, this.input).subscribe(() => this.close());
        }
        if (this._viewportRuler) {
            this._viewportRuler
                .change()
                .pipe(takeUntil(this._destroy$))
                .subscribe(() => {
                if (this._isDropdownOpen && overlayRef) {
                    overlayRef.updateSize({ width: this.input.offsetWidth });
                }
            });
        }
        this.mdbAutocomplete._keyManager.setActiveItem(0);
        this.mdbAutocomplete._markForCheck();
        this._isDropdownOpen = true;
        this.mdbAutocomplete.opened.emit();
    }
    _listenToOptionChange() {
        this.mdbAutocomplete.options.changes
            .pipe(startWith(this.mdbAutocomplete.options), tap(() => {
            if (this._overlayRef && this._overlayRef.hasAttached()) {
                this._overlayRef.updatePosition();
            }
        }), switchMap((options) => {
            Promise.resolve().then(() => this._resetHighlight());
            return merge(...options.map((option) => option.click$));
        }), takeUntil(this._destroy$))
            .subscribe((clickedOption) => this._handleOptionClick(clickedOption));
    }
    _handleOptionClick(option) {
        this._resetHighlight();
        this._clearPreviousSelection();
        this._setValue(option);
        this._canOpenOnFocus = false;
        this.input.focus();
        this.close();
        option.select();
    }
    close() {
        if (!this._isDropdownOpen) {
            return;
        }
        if (this._overlayRef && this._overlayRef.hasAttached()) {
            this._overlayRef.detach();
            this._isDropdownOpen = false;
            this.mdbAutocomplete.closed.emit();
        }
    }
    _listenToOutSideCick(overlayRef, origin) {
        return fromEvent(document, 'click').pipe(filter((event) => {
            const target = event.target;
            const notOrigin = target !== origin;
            const notOverlay = !!overlayRef && overlayRef.overlayElement.contains(target) === false;
            return notOrigin && notOverlay;
        }), takeUntil(overlayRef.detachments()));
    }
    _getOverlayPosition() {
        const positionStrategy = this._overlay
            .position()
            .flexibleConnectedTo(this.input)
            .withPositions(this._getPositions())
            .withPush(false);
        return positionStrategy;
    }
    _getPositions() {
        // If label floats we need to add additional offset for top position
        // Bottom offset is needed because of the box-shadow on input border
        const bottomOffset = 1;
        const topOffset = -6;
        return [
            {
                originX: 'start',
                originY: 'bottom',
                offsetY: bottomOffset,
                overlayX: 'start',
                overlayY: 'top',
            },
            {
                originX: 'start',
                originY: 'top',
                offsetY: topOffset,
                overlayX: 'start',
                overlayY: 'bottom',
            },
        ];
    }
    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
        this._destroyDropdown();
    }
    _destroyDropdown() {
        if (this._overlayRef) {
            this.close();
            this._overlayRef.dispose();
            this._overlayRef = null;
        }
    }
    /** Control value accessor methods */
    setDisabledState(isDisabled) {
        this.input.disabled = isDisabled;
    }
    writeValue(value) {
        Promise.resolve().then(() => {
            this.input.value = value;
        });
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
}
MdbAutocompleteDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbAutocompleteDirective, deps: [{ token: i1.Overlay }, { token: i0.ViewContainerRef }, { token: i0.ElementRef }, { token: i1.ViewportRuler }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
MdbAutocompleteDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.7", type: MdbAutocompleteDirective, selector: "input[mdbAutocomplete], textarea[mdbAutocomplete]", inputs: { mdbAutocomplete: "mdbAutocomplete" }, host: { listeners: { "keydown": "onKeydown($event)", "input": "_handleInput($event)", "focusin": "_handleFocusIn()", "blur": "_handleBlur()" }, properties: { "class.autocomplete-input": "this.autocomplete", "class.focused": "this.isOpen", "class.autocomplete-active": "this.labelActive" } }, providers: [MDB_AUTOCOMPLETE_VALUE_ACCESOR], exportAs: ["mdbAutocompleteInput"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbAutocompleteDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[mdbAutocomplete], textarea[mdbAutocomplete]',
                    exportAs: 'mdbAutocompleteInput',
                    providers: [MDB_AUTOCOMPLETE_VALUE_ACCESOR],
                }]
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i0.ViewContainerRef }, { type: i0.ElementRef }, { type: i1.ViewportRuler }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { mdbAutocomplete: [{
                type: Input
            }], onKeydown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }], _handleInput: [{
                type: HostListener,
                args: ['input', ['$event']]
            }], _handleFocusIn: [{
                type: HostListener,
                args: ['focusin']
            }], _handleBlur: [{
                type: HostListener,
                args: ['blur']
            }], autocomplete: [{
                type: HostBinding,
                args: ['class.autocomplete-input']
            }], isOpen: [{
                type: HostBinding,
                args: ['class.focused']
            }], labelActive: [{
                type: HostBinding,
                args: ['class.autocomplete-active']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULE1BQU0sRUFDTixLQUFLLEVBRUwsVUFBVSxFQUNWLFlBQVksRUFHWixXQUFXLEdBQ1osTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUYsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFROUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7QUFHckQsTUFBTSxDQUFDLE1BQU0sOEJBQThCLEdBQVE7SUFDakQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixrREFBa0Q7SUFDbEQsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztJQUN2RCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFPRixNQUFNLE9BQU8sd0JBQXdCO0lBMEVuQyxZQUNVLFFBQWlCLEVBQ2pCLElBQXNCLEVBQ3RCLFdBQXVCLEVBQ3ZCLGNBQTZCLEVBQ1gsUUFBYTtRQUovQixhQUFR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QUFZO3VCQUFDLE1BQU07Z0JBTXFCLFlBQVk7c0JBQXBELFdBQVc7dUJBQUMsMEJBQTBCO2dCQUduQyxNQUFNO3NCQURULFdBQVc7dUJBQUMsZUFBZTtnQkFNeEIsV0FBVztzQkFEZCxXQUFXO3VCQUFDLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBmb3J3YXJkUmVmLFxuICBIb3N0TGlzdGVuZXIsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFF1ZXJ5TGlzdCxcbiAgSG9zdEJpbmRpbmcsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWRiQXV0b2NvbXBsZXRlQ29tcG9uZW50IH0gZnJvbSAnLi9hdXRvY29tcGxldGUuY29tcG9uZW50JztcblxuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgVEFCLCBFTlRFUiwgSE9NRSwgRU5ELCBFU0NBUEUsIFVQX0FSUk9XLCBET1dOX0FSUk9XIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IFN1YmplY3QsIGZyb21FdmVudCwgbWVyZ2UgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCwgZmlsdGVyLCB0YXAsIHN3aXRjaE1hcCwgc3RhcnRXaXRoIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgT3ZlcmxheVJlZixcbiAgT3ZlcmxheSxcbiAgUG9zaXRpb25TdHJhdGVneSxcbiAgQ29ubmVjdGlvblBvc2l0aW9uUGFpcixcbiAgVmlld3BvcnRSdWxlcixcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgVGVtcGxhdGVQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IE1kYk9wdGlvbkNvbXBvbmVudCB9IGZyb20gJ21kYi1hbmd1bGFyLXVpLWtpdC9vcHRpb24nO1xuXG5leHBvcnQgY29uc3QgTURCX0FVVE9DT01QTEVURV9WQUxVRV9BQ0NFU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVzZS1iZWZvcmUtZGVjbGFyZVxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNZGJBdXRvY29tcGxldGVEaXJlY3RpdmUpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2lucHV0W21kYkF1dG9jb21wbGV0ZV0sIHRleHRhcmVhW21kYkF1dG9jb21wbGV0ZV0nLFxuICBleHBvcnRBczogJ21kYkF1dG9jb21wbGV0ZUlucHV0JyxcbiAgcHJvdmlkZXJzOiBbTURCX0FVVE9DT01QTEVURV9WQUxVRV9BQ0NFU09SXSxcbn0pXG5leHBvcnQgY2xhc3MgTWRiQXV0b2NvbXBsZXRlRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIEBJbnB1dCgpIG1kYkF1dG9jb21wbGV0ZTogTWRiQXV0b2NvbXBsZXRlQ29tcG9uZW50O1xuXG4gIHByaXZhdGUgX292ZXJsYXlSZWY6IE92ZXJsYXlSZWYgfCBudWxsO1xuICBwcml2YXRlIF9wb3J0YWw6IFRlbXBsYXRlUG9ydGFsO1xuICBwcml2YXRlIF9jYW5PcGVuT25Gb2N1cyA9IHRydWU7XG4gIF9pc0Ryb3Bkb3duT3BlbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX2Rlc3Ryb3kkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3QoKTtcblxuICBnZXQgaW5wdXQoKTogSFRNTElucHV0RWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIC8vIGdldCBsYWJlbEFjdGl2ZSgpOiBib29sZWFuIHtcbiAgLy8gICByZXR1cm4gdGhpcy5faXNEcm9wZG93bk9wZW4gfHwgdGhpcy5oYXNWYWx1ZTtcbiAgLy8gfVxuXG4gIGdldCBoYXNWYWx1ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIG9uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIHRoaXMuX2hhbmRsZUtleURvd24oZXZlbnQpO1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICBjb25zdCBpc1RhYktleSA9IGV2ZW50LmtleUNvZGUgPT09IFRBQjtcbiAgICBpZiAoaXNUYWJLZXkpIHtcbiAgICAgIGlmICh0aGlzLm1kYkF1dG9jb21wbGV0ZS5hdXRvU2VsZWN0ICYmIHRoaXMuYWN0aXZlT3B0aW9uICYmIHRoaXMuX2lzRHJvcGRvd25PcGVuKSB7XG4gICAgICAgIHRoaXMuX3NldFZhbHVlKHRoaXMuYWN0aXZlT3B0aW9uKTtcbiAgICAgICAgdGhpcy5hY3RpdmVPcHRpb24uc2VsZWN0KCk7XG4gICAgICAgIHRoaXMuX3Jlc2V0SGlnaGxpZ2h0KCk7XG4gICAgICAgIHRoaXMuX2NsZWFyUHJldmlvdXNTZWxlY3Rpb24oKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdpbnB1dCcsIFsnJGV2ZW50J10pXG4gIF9oYW5kbGVJbnB1dChldmVudDogYW55KSB7XG4gICAgaWYgKCF0aGlzLl9pc0Ryb3Bkb3duT3Blbikge1xuICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fb25DaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzaW4nKVxuICBfaGFuZGxlRm9jdXNJbigpIHtcbiAgICBpZiAoIXRoaXMuX2Nhbk9wZW5PbkZvY3VzKSB7XG4gICAgICB0aGlzLl9jYW5PcGVuT25Gb2N1cyA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3BlbigpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxuICBfaGFuZGxlQmx1cigpIHtcbiAgICB0aGlzLl9jYW5PcGVuT25Gb2N1cyA9IHRoaXMuZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gdGhpcy5pbnB1dDtcbiAgICB0aGlzLl9vblRvdWNoZWQoKTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYXV0b2NvbXBsZXRlLWlucHV0JykgYXV0b2NvbXBsZXRlID0gdHJ1ZTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZvY3VzZWQnKVxuICBnZXQgaXNPcGVuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc0Ryb3Bkb3duT3BlbjtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYXV0b2NvbXBsZXRlLWFjdGl2ZScpXG4gIGdldCBsYWJlbEFjdGl2ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNEcm9wZG93bk9wZW4gfHwgdGhpcy5oYXNWYWx1ZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX292ZXJsYXk6IE92ZXJsYXksXG4gICAgcHJpdmF0ZSBfdmNyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBfdmlld3BvcnRSdWxlcjogVmlld3BvcnRSdWxlcixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnlcbiAgKSB7fVxuXG4gIHByaXZhdGUgX2hhbmRsZUtleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRlcHJlY2F0aW9uXG4gICAgY29uc3Qga2V5ID0gZXZlbnQua2V5Q29kZTtcbiAgICBjb25zdCBtYW5hZ2VyID0gdGhpcy5tZGJBdXRvY29tcGxldGUuX2tleU1hbmFnZXI7XG5cbiAgICBpZiAodGhpcy5hY3RpdmVPcHRpb24gJiYgdGhpcy5faXNEcm9wZG93bk9wZW4gJiYga2V5ID09PSBFTlRFUikge1xuICAgICAgdGhpcy5fc2V0VmFsdWUodGhpcy5hY3RpdmVPcHRpb24pO1xuICAgICAgdGhpcy5hY3RpdmVPcHRpb24uc2VsZWN0KCk7XG4gICAgICB0aGlzLl9yZXNldEhpZ2hsaWdodCgpO1xuICAgICAgdGhpcy5fY2xlYXJQcmV2aW91c1NlbGVjdGlvbigpO1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5tZGJBdXRvY29tcGxldGUpIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzQWN0aXZlSXRlbSA9IG1hbmFnZXIuYWN0aXZlSXRlbTtcblxuICAgICAgaWYgKHRoaXMuX2lzRHJvcGRvd25PcGVuIHx8IGtleSA9PT0gVEFCKSB7XG4gICAgICAgIG1hbmFnZXIub25LZXlkb3duKGV2ZW50KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLl9pc0Ryb3Bkb3duT3BlbiAmJiBrZXkgPT09IERPV05fQVJST1cgJiYgZXZlbnQuYWx0S2V5KSB7XG4gICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgfVxuXG4gICAgICBpZiAoa2V5ID09PSBIT01FKSB7XG4gICAgICAgIG1hbmFnZXIuc2V0Rmlyc3RJdGVtQWN0aXZlKCk7XG4gICAgICB9IGVsc2UgaWYgKGtleSA9PT0gRU5EKSB7XG4gICAgICAgIG1hbmFnZXIuc2V0TGFzdEl0ZW1BY3RpdmUoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1hbmFnZXIuYWN0aXZlSXRlbSAhPT0gcHJldmlvdXNBY3RpdmVJdGVtKSB7XG4gICAgICAgIHRoaXMuX21vdmVIaWdobGlnaHRlZEludG9WaWV3KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfbW92ZUhpZ2hsaWdodGVkSW50b1ZpZXcoKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLm1kYkF1dG9jb21wbGV0ZS5fa2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXg7XG5cbiAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgIHRoaXMubWRiQXV0b2NvbXBsZXRlLl9zZXRTY3JvbGxUb3AoMCk7XG4gICAgfSBlbHNlIGlmIChpbmRleCAmJiBpbmRleCA+IC0xKSB7XG4gICAgICBsZXQgbmV3U2Nyb2xsUG9zaXRpb246IG51bWJlcjtcbiAgICAgIGNvbnN0IG9wdGlvbiA9IHRoaXMubWRiQXV0b2NvbXBsZXRlLl9nZXRPcHRpb25zQXJyYXkoKVtpbmRleF07XG4gICAgICBjb25zdCBvcHRpb25IZWlnaHQgPSBvcHRpb24ub2Zmc2V0SGVpZ2h0O1xuICAgICAgY29uc3QgbGlzdEhlaWdodCA9IHRoaXMubWRiQXV0b2NvbXBsZXRlLmxpc3RIZWlnaHQ7XG5cbiAgICAgIGNvbnN0IGl0ZW1Ub3AgPSBpbmRleCAqIG9wdGlvbkhlaWdodDtcbiAgICAgIGNvbnN0IGl0ZW1Cb3R0b20gPSBpdGVtVG9wICsgb3B0aW9uSGVpZ2h0O1xuXG4gICAgICBjb25zdCB2aWV3VG9wID0gdGhpcy5tZGJBdXRvY29tcGxldGUuX2dldFNjcm9sbFRvcCgpO1xuICAgICAgY29uc3Qgdmlld0JvdHRvbSA9IHZpZXdUb3AgKyBsaXN0SGVpZ2h0O1xuXG4gICAgICBpZiAoaXRlbUJvdHRvbSA+IHZpZXdCb3R0b20pIHtcbiAgICAgICAgbmV3U2Nyb2xsUG9zaXRpb24gPSBpdGVtQm90dG9tIC0gbGlzdEhlaWdodDtcbiAgICAgICAgdGhpcy5tZGJBdXRvY29tcGxldGUuX3NldFNjcm9sbFRvcChuZXdTY3JvbGxQb3NpdGlvbik7XG4gICAgICB9IGVsc2UgaWYgKGl0ZW1Ub3AgPCB2aWV3VG9wKSB7XG4gICAgICAgIG5ld1Njcm9sbFBvc2l0aW9uID0gaXRlbVRvcDtcbiAgICAgICAgdGhpcy5tZGJBdXRvY29tcGxldGUuX3NldFNjcm9sbFRvcChuZXdTY3JvbGxQb3NpdGlvbik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc2V0VmFsdWUob3B0aW9uOiBNZGJPcHRpb25Db21wb25lbnQpIHtcbiAgICB0aGlzLl9jbGVhclByZXZpb3VzU2VsZWN0aW9uKCk7XG5cbiAgICBjb25zdCB2YWx1ZSA9XG4gICAgICB0aGlzLm1kYkF1dG9jb21wbGV0ZSAmJiB0aGlzLm1kYkF1dG9jb21wbGV0ZS5kaXNwbGF5VmFsdWVcbiAgICAgICAgPyB0aGlzLm1kYkF1dG9jb21wbGV0ZS5kaXNwbGF5VmFsdWUob3B0aW9uLnZhbHVlKVxuICAgICAgICA6IG9wdGlvbi52YWx1ZTtcbiAgICB0aGlzLl9zZXRJbnB1dFZhbHVlKHZhbHVlKTtcbiAgICB0aGlzLl9vbkNoYW5nZSh2YWx1ZSk7XG5cbiAgICB0aGlzLm1kYkF1dG9jb21wbGV0ZS5zZWxlY3RlZC5lbWl0KHtcbiAgICAgIGNvbXBvbmVudDogdGhpcy5tZGJBdXRvY29tcGxldGUsXG4gICAgICBvcHRpb246IG9wdGlvbixcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2NsZWFyUHJldmlvdXNTZWxlY3Rpb24oKSB7XG4gICAgdGhpcy5tZGJBdXRvY29tcGxldGUub3B0aW9ucy5mb3JFYWNoKChvcHRpb246IE1kYk9wdGlvbkNvbXBvbmVudCkgPT4ge1xuICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICBvcHRpb24uZGVzZWxlY3QoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldElucHV0VmFsdWUodmFsdWU6IGFueSkge1xuICAgIHRoaXMuaW5wdXQudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBhY3RpdmVPcHRpb24oKTogTWRiT3B0aW9uQ29tcG9uZW50IHwgbnVsbCB7XG4gICAgaWYgKHRoaXMubWRiQXV0b2NvbXBsZXRlICYmIHRoaXMubWRiQXV0b2NvbXBsZXRlLl9rZXlNYW5hZ2VyKSB7XG4gICAgICByZXR1cm4gdGhpcy5tZGJBdXRvY29tcGxldGUuX2tleU1hbmFnZXIuYWN0aXZlSXRlbTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgX3Jlc2V0SGlnaGxpZ2h0KCkge1xuICAgIHRoaXMubWRiQXV0b2NvbXBsZXRlLl9rZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0oMCk7XG4gIH1cblxuICBvcGVuKCkge1xuICAgIGxldCBvdmVybGF5UmVmID0gdGhpcy5fb3ZlcmxheVJlZjtcblxuICAgIGlmICghb3ZlcmxheVJlZikge1xuICAgICAgdGhpcy5fcG9ydGFsID0gbmV3IFRlbXBsYXRlUG9ydGFsKHRoaXMubWRiQXV0b2NvbXBsZXRlLmRyb3Bkb3duVGVtcGxhdGUsIHRoaXMuX3Zjcik7XG5cbiAgICAgIG92ZXJsYXlSZWYgPSB0aGlzLl9vdmVybGF5LmNyZWF0ZSh7XG4gICAgICAgIHdpZHRoOiB0aGlzLmlucHV0Lm9mZnNldFdpZHRoLFxuICAgICAgICBzY3JvbGxTdHJhdGVneTogdGhpcy5fb3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLnJlcG9zaXRpb24oKSxcbiAgICAgICAgcG9zaXRpb25TdHJhdGVneTogdGhpcy5fZ2V0T3ZlcmxheVBvc2l0aW9uKCksXG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fb3ZlcmxheVJlZiA9IG92ZXJsYXlSZWY7XG5cbiAgICAgIG92ZXJsYXlSZWYua2V5ZG93bkV2ZW50cygpLnN1YnNjcmliZSgoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkZXByZWNhdGlvblxuICAgICAgICBjb25zdCBrZXkgPSBldmVudC5rZXlDb2RlO1xuXG4gICAgICAgIGlmIChrZXkgPT09IEVTQ0FQRSB8fCAoa2V5ID09PSBVUF9BUlJPVyAmJiBldmVudC5hbHRLZXkpKSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgdGhpcy5fcmVzZXRIaWdobGlnaHQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX2xpc3RlblRvT3B0aW9uQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgaWYgKG92ZXJsYXlSZWYgJiYgIW92ZXJsYXlSZWYuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgb3ZlcmxheVJlZi5hdHRhY2godGhpcy5fcG9ydGFsKTtcbiAgICAgIHRoaXMuX2xpc3RlblRvT3V0U2lkZUNpY2sob3ZlcmxheVJlZiwgdGhpcy5pbnB1dCkuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2UoKSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3ZpZXdwb3J0UnVsZXIpIHtcbiAgICAgIHRoaXMuX3ZpZXdwb3J0UnVsZXJcbiAgICAgICAgLmNoYW5nZSgpXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95JCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLl9pc0Ryb3Bkb3duT3BlbiAmJiBvdmVybGF5UmVmKSB7XG4gICAgICAgICAgICBvdmVybGF5UmVmLnVwZGF0ZVNpemUoeyB3aWR0aDogdGhpcy5pbnB1dC5vZmZzZXRXaWR0aCB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMubWRiQXV0b2NvbXBsZXRlLl9rZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0oMCk7XG4gICAgdGhpcy5tZGJBdXRvY29tcGxldGUuX21hcmtGb3JDaGVjaygpO1xuICAgIHRoaXMuX2lzRHJvcGRvd25PcGVuID0gdHJ1ZTtcbiAgICB0aGlzLm1kYkF1dG9jb21wbGV0ZS5vcGVuZWQuZW1pdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbGlzdGVuVG9PcHRpb25DaGFuZ2UoKSB7XG4gICAgdGhpcy5tZGJBdXRvY29tcGxldGUub3B0aW9ucy5jaGFuZ2VzXG4gICAgICAucGlwZShcbiAgICAgICAgc3RhcnRXaXRoKHRoaXMubWRiQXV0b2NvbXBsZXRlLm9wdGlvbnMpLFxuICAgICAgICB0YXAoKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLl9vdmVybGF5UmVmICYmIHRoaXMuX292ZXJsYXlSZWYuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5fb3ZlcmxheVJlZi51cGRhdGVQb3NpdGlvbigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIHN3aXRjaE1hcCgob3B0aW9uczogUXVlcnlMaXN0PE1kYk9wdGlvbkNvbXBvbmVudD4pID0+IHtcbiAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHRoaXMuX3Jlc2V0SGlnaGxpZ2h0KCkpO1xuICAgICAgICAgIHJldHVybiBtZXJnZSguLi5vcHRpb25zLm1hcCgob3B0aW9uOiBNZGJPcHRpb25Db21wb25lbnQpID0+IG9wdGlvbi5jbGljayQpKTtcbiAgICAgICAgfSksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLl9kZXN0cm95JClcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKGNsaWNrZWRPcHRpb246IE1kYk9wdGlvbkNvbXBvbmVudCkgPT4gdGhpcy5faGFuZGxlT3B0aW9uQ2xpY2soY2xpY2tlZE9wdGlvbikpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlT3B0aW9uQ2xpY2sob3B0aW9uOiBNZGJPcHRpb25Db21wb25lbnQpIHtcbiAgICB0aGlzLl9yZXNldEhpZ2hsaWdodCgpO1xuICAgIHRoaXMuX2NsZWFyUHJldmlvdXNTZWxlY3Rpb24oKTtcbiAgICB0aGlzLl9zZXRWYWx1ZShvcHRpb24pO1xuICAgIHRoaXMuX2Nhbk9wZW5PbkZvY3VzID0gZmFsc2U7XG4gICAgdGhpcy5pbnB1dC5mb2N1cygpO1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgICBvcHRpb24uc2VsZWN0KCk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICBpZiAoIXRoaXMuX2lzRHJvcGRvd25PcGVuKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX292ZXJsYXlSZWYgJiYgdGhpcy5fb3ZlcmxheVJlZi5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICB0aGlzLl9vdmVybGF5UmVmLmRldGFjaCgpO1xuICAgICAgdGhpcy5faXNEcm9wZG93bk9wZW4gPSBmYWxzZTtcbiAgICAgIHRoaXMubWRiQXV0b2NvbXBsZXRlLmNsb3NlZC5lbWl0KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfbGlzdGVuVG9PdXRTaWRlQ2ljayhvdmVybGF5UmVmOiBPdmVybGF5UmVmLCBvcmlnaW46IEhUTUxFbGVtZW50KSB7XG4gICAgcmV0dXJuIGZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJykucGlwZShcbiAgICAgIGZpbHRlcigoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgICAgICBjb25zdCBub3RPcmlnaW4gPSB0YXJnZXQgIT09IG9yaWdpbjtcbiAgICAgICAgY29uc3Qgbm90T3ZlcmxheSA9ICEhb3ZlcmxheVJlZiAmJiBvdmVybGF5UmVmLm92ZXJsYXlFbGVtZW50LmNvbnRhaW5zKHRhcmdldCkgPT09IGZhbHNlO1xuICAgICAgICByZXR1cm4gbm90T3JpZ2luICYmIG5vdE92ZXJsYXk7XG4gICAgICB9KSxcbiAgICAgIHRha2VVbnRpbChvdmVybGF5UmVmLmRldGFjaG1lbnRzKCkpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldE92ZXJsYXlQb3NpdGlvbigpOiBQb3NpdGlvblN0cmF0ZWd5IHtcbiAgICBjb25zdCBwb3NpdGlvblN0cmF0ZWd5ID0gdGhpcy5fb3ZlcmxheVxuICAgICAgLnBvc2l0aW9uKClcbiAgICAgIC5mbGV4aWJsZUNvbm5lY3RlZFRvKHRoaXMuaW5wdXQpXG4gICAgICAud2l0aFBvc2l0aW9ucyh0aGlzLl9nZXRQb3NpdGlvbnMoKSlcbiAgICAgIC53aXRoUHVzaChmYWxzZSk7XG5cbiAgICByZXR1cm4gcG9zaXRpb25TdHJhdGVneTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFBvc2l0aW9ucygpOiBDb25uZWN0aW9uUG9zaXRpb25QYWlyW10ge1xuICAgIC8vIElmIGxhYmVsIGZsb2F0cyB3ZSBuZWVkIHRvIGFkZCBhZGRpdGlvbmFsIG9mZnNldCBmb3IgdG9wIHBvc2l0aW9uXG4gICAgLy8gQm90dG9tIG9mZnNldCBpcyBuZWVkZWQgYmVjYXVzZSBvZiB0aGUgYm94LXNoYWRvdyBvbiBpbnB1dCBib3JkZXJcbiAgICBjb25zdCBib3R0b21PZmZzZXQgPSAxO1xuICAgIGNvbnN0IHRvcE9mZnNldCA9IC02O1xuICAgIHJldHVybiBbXG4gICAgICB7XG4gICAgICAgIG9yaWdpblg6ICdzdGFydCcsXG4gICAgICAgIG9yaWdpblk6ICdib3R0b20nLFxuICAgICAgICBvZmZzZXRZOiBib3R0b21PZmZzZXQsXG4gICAgICAgIG92ZXJsYXlYOiAnc3RhcnQnLFxuICAgICAgICBvdmVybGF5WTogJ3RvcCcsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBvcmlnaW5YOiAnc3RhcnQnLFxuICAgICAgICBvcmlnaW5ZOiAndG9wJyxcbiAgICAgICAgb2Zmc2V0WTogdG9wT2Zmc2V0LFxuICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgICAgb3ZlcmxheVk6ICdib3R0b20nLFxuICAgICAgfSxcbiAgICBdO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuX2Rlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fZGVzdHJveURyb3Bkb3duKCk7XG4gIH1cblxuICBwcml2YXRlIF9kZXN0cm95RHJvcGRvd24oKSB7XG4gICAgaWYgKHRoaXMuX292ZXJsYXlSZWYpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgIHRoaXMuX292ZXJsYXlSZWYuZGlzcG9zZSgpO1xuICAgICAgdGhpcy5fb3ZlcmxheVJlZiA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqIENvbnRyb2wgdmFsdWUgYWNjZXNzb3IgbWV0aG9kcyAqL1xuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbikge1xuICAgIHRoaXMuaW5wdXQuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICB9XG5cbiAgX29uQ2hhbmdlOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gIF9vblRvdWNoZWQgPSAoKSA9PiB7fTtcblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuaW5wdXQudmFsdWUgPSB2YWx1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB7fSk6IHZvaWQge1xuICAgIHRoaXMuX29uQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4ge30pIHtcbiAgICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcbiAgfVxufVxuIl19