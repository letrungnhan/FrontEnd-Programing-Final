import * as i0 from '@angular/core';
import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, ContentChildren, ViewChild, Input, Output, forwardRef, Directive, Inject, HostListener, HostBinding, NgModule } from '@angular/core';
import { MDB_OPTION_PARENT, MdbOptionComponent, MdbOptionModule } from 'mdb-angular-ui-kit/option';
import { Subject, merge, fromEvent } from 'rxjs';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { trigger, transition, query, animateChild, state, style, animate } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i1 from '@angular/common';
import { DOCUMENT, CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { TAB, ENTER, DOWN_ARROW, HOME, END, ESCAPE, UP_ARROW } from '@angular/cdk/keycodes';
import { takeUntil, startWith, tap, switchMap, filter } from 'rxjs/operators';
import { TemplatePortal } from '@angular/cdk/portal';
import * as i1$1 from '@angular/cdk/overlay';
import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';

const dropdownContainerAnimation = trigger('dropdownContainerAnimation', [
    transition('* => void', [query('@*', [animateChild()], { optional: true })]),
]);
const dropdownAnimation = trigger('dropdownAnimation', [
    state('void', style({
        transform: 'scaleY(0.8)',
        opacity: 0,
    })),
    state('visible', style({
        opacity: 1,
        transform: 'scaleY(1)',
    })),
    transition('void => *', animate('200ms')),
    transition('* => void', animate('200ms')),
]);

class MdbAutocompleteComponent {
    constructor(_cdRef) {
        this._cdRef = _cdRef;
        this._optionHeight = 38;
        // Equal to 5 * optionHeight (which is 38px by default)
        this._listHeight = 190;
        this.selected = new EventEmitter();
        this.opened = new EventEmitter();
        this.closed = new EventEmitter();
        this._destroy$ = new Subject();
        this._isOpen = false;
        this.showNoResultText = false;
    }
    get autoSelect() {
        return this._autoSelect;
    }
    set autoSelect(value) {
        this._autoSelect = coerceBooleanProperty(value);
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    get optionHeight() {
        return this._optionHeight;
    }
    set optionHeight(value) {
        if (value !== 0) {
            this._optionHeight = value;
        }
    }
    get listHeight() {
        return this._listHeight;
    }
    set listHeight(value) {
        if (value !== 0) {
            this._listHeight = value;
        }
    }
    _getOptionsArray() {
        return this.options.toArray();
    }
    get isOpen() {
        return this._isOpen;
    }
    _getScrollTop() {
        return this.dropdown ? this.dropdown.nativeElement.scrollTop : 0;
    }
    _setScrollTop(scrollPosition) {
        if (this.dropdown) {
            this.dropdown.nativeElement.scrollTop = scrollPosition;
        }
    }
    _markForCheck() {
        this._cdRef.markForCheck();
    }
    ngAfterContentInit() {
        this._keyManager = new ActiveDescendantKeyManager(this.options);
    }
    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }
}
MdbAutocompleteComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbAutocompleteComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MdbAutocompleteComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbAutocompleteComponent, selector: "mdb-autocomplete", inputs: { autoSelect: "autoSelect", disabled: "disabled", optionHeight: "optionHeight", listHeight: "listHeight", displayValue: "displayValue" }, outputs: { selected: "selected", opened: "opened", closed: "closed" }, providers: [{ provide: MDB_OPTION_PARENT, useExisting: MdbAutocompleteComponent }], queries: [{ propertyName: "options", predicate: MdbOptionComponent, descendants: true }], viewQueries: [{ propertyName: "dropdown", first: true, predicate: ["dropdown"], descendants: true }, { propertyName: "dropdownTemplate", first: true, predicate: ["dropdownTemplate"], descendants: true, static: true }], exportAs: ["mdbAutocomplete"], ngImport: i0, template: "<ng-template #dropdownTemplate>\n  <div [@dropdownContainerAnimation] class=\"autocomplete-dropdown-container\">\n    <div [@dropdownAnimation] role=\"listbox\" class=\"autocomplete-dropdown\">\n      <div\n        #dropdown\n        class=\"autocomplete-items-list\"\n        [ngStyle]=\"{\n          'max-height.px': listHeight\n        }\"\n      >\n        <ng-content></ng-content>\n      </div>\n      <ng-content select=\".autocomplete-no-results\"></ng-content>\n      <ng-content select=\".autocomplete-custom-content\"></ng-content>\n    </div>\n  </div>\n</ng-template>\n", directives: [{ type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], animations: [dropdownAnimation, dropdownContainerAnimation], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbAutocompleteComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-autocomplete', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, exportAs: 'mdbAutocomplete', animations: [dropdownAnimation, dropdownContainerAnimation], providers: [{ provide: MDB_OPTION_PARENT, useExisting: MdbAutocompleteComponent }], template: "<ng-template #dropdownTemplate>\n  <div [@dropdownContainerAnimation] class=\"autocomplete-dropdown-container\">\n    <div [@dropdownAnimation] role=\"listbox\" class=\"autocomplete-dropdown\">\n      <div\n        #dropdown\n        class=\"autocomplete-items-list\"\n        [ngStyle]=\"{\n          'max-height.px': listHeight\n        }\"\n      >\n        <ng-content></ng-content>\n      </div>\n      <ng-content select=\".autocomplete-no-results\"></ng-content>\n      <ng-content select=\".autocomplete-custom-content\"></ng-content>\n    </div>\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { options: [{
                type: ContentChildren,
                args: [MdbOptionComponent, { descendants: true }]
            }], dropdown: [{
                type: ViewChild,
                args: ['dropdown', { static: false }]
            }], dropdownTemplate: [{
                type: ViewChild,
                args: ['dropdownTemplate', { static: true }]
            }], autoSelect: [{
                type: Input
            }], disabled: [{
                type: Input
            }], optionHeight: [{
                type: Input
            }], listHeight: [{
                type: Input
            }], displayValue: [{
                type: Input
            }], selected: [{
                type: Output
            }], opened: [{
                type: Output
            }], closed: [{
                type: Output
            }] } });

const MDB_AUTOCOMPLETE_VALUE_ACCESOR = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line: no-use-before-declare
    useExisting: forwardRef(() => MdbAutocompleteDirective),
    multi: true,
};
class MdbAutocompleteDirective {
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
MdbAutocompleteDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbAutocompleteDirective, deps: [{ token: i1$1.Overlay }, { token: i0.ViewContainerRef }, { token: i0.ElementRef }, { token: i1$1.ViewportRuler }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
MdbAutocompleteDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.7", type: MdbAutocompleteDirective, selector: "input[mdbAutocomplete], textarea[mdbAutocomplete]", inputs: { mdbAutocomplete: "mdbAutocomplete" }, host: { listeners: { "keydown": "onKeydown($event)", "input": "_handleInput($event)", "focusin": "_handleFocusIn()", "blur": "_handleBlur()" }, properties: { "class.autocomplete-input": "this.autocomplete", "class.focused": "this.isOpen", "class.autocomplete-active": "this.labelActive" } }, providers: [MDB_AUTOCOMPLETE_VALUE_ACCESOR], exportAs: ["mdbAutocompleteInput"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbAutocompleteDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[mdbAutocomplete], textarea[mdbAutocomplete]',
                    exportAs: 'mdbAutocompleteInput',
                    providers: [MDB_AUTOCOMPLETE_VALUE_ACCESOR],
                }]
        }], ctorParameters: function () {
        return [{ type: i1$1.Overlay }, { type: i0.ViewContainerRef }, { type: i0.ElementRef }, { type: i1$1.ViewportRuler }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [DOCUMENT]
                    }] }];
    }, propDecorators: { mdbAutocomplete: [{
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

class MdbAutocompleteModule {
}
MdbAutocompleteModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbAutocompleteModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbAutocompleteModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbAutocompleteModule, declarations: [MdbAutocompleteComponent, MdbAutocompleteDirective], imports: [CommonModule, HttpClientModule, FormsModule, MdbOptionModule, OverlayModule], exports: [MdbAutocompleteComponent, MdbAutocompleteDirective, MdbOptionModule] });
MdbAutocompleteModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbAutocompleteModule, imports: [[CommonModule, HttpClientModule, FormsModule, MdbOptionModule, OverlayModule], MdbOptionModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbAutocompleteModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, HttpClientModule, FormsModule, MdbOptionModule, OverlayModule],
                    declarations: [MdbAutocompleteComponent, MdbAutocompleteDirective],
                    exports: [MdbAutocompleteComponent, MdbAutocompleteDirective, MdbOptionModule],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MdbAutocompleteComponent, MdbAutocompleteDirective, MdbAutocompleteModule };
//# sourceMappingURL=mdb-angular-ui-kit-autocomplete.mjs.map
