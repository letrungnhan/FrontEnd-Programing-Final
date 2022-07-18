import * as i0 from '@angular/core';
import { Component, Optional, Inject, EventEmitter, ChangeDetectionStrategy, Self, ViewChild, ContentChild, ContentChildren, Input, Output, HostListener, HostBinding, NgModule } from '@angular/core';
import { trigger, transition, query, animateChild, state, style, animate } from '@angular/animations';
import { Subject, merge, fromEvent } from 'rxjs';
import { startWith, tap, switchMap, takeUntil, debounceTime, filter } from 'rxjs/operators';
import { MdbOptionComponent, MDB_OPTION_PARENT, MDB_OPTION_GROUP, MdbOptionGroupComponent, MdbOptionModule } from 'mdb-angular-ui-kit/option';
import * as i2 from '@angular/forms';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { TemplatePortal } from '@angular/cdk/portal';
import { ESCAPE, UP_ARROW, TAB, HOME, END, ENTER, SPACE, DOWN_ARROW } from '@angular/cdk/keycodes';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { MdbAbstractFormControl, MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i1$1 from '@angular/cdk/overlay';
import { OverlayModule } from '@angular/cdk/overlay';

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

class MdbSelectAllOptionComponent extends MdbOptionComponent {
    constructor(_el, _cdRef, _parent, group) {
        super(_el, _cdRef, _parent, group);
        this._multiple = true;
    }
    ngOnInit() {
        if (this._parent && this._parent.visibleOptions && this._parent.optionHeight) {
            this._optionHeight = this._parent.optionHeight;
        }
    }
}
MdbSelectAllOptionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbSelectAllOptionComponent, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: MDB_OPTION_PARENT, optional: true }, { token: MDB_OPTION_GROUP, optional: true }], target: i0.ɵɵFactoryTarget.Component });
MdbSelectAllOptionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbSelectAllOptionComponent, selector: "mdb-select-all-option", usesInheritance: true, ngImport: i0, template: `
    <span class="select-option-text" ngClass="{'active', active}">
      <input
        *ngIf="_multiple"
        class="form-check-input"
        type="checkbox"
        [checked]="selected"
        [disabled]="disabled"
      />
      <ng-content></ng-content>
    </span>
    <ng-content select=".select-option-icon-container"></ng-content>
  `, isInline: true, directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbSelectAllOptionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mdb-select-all-option',
                    template: `
    <span class="select-option-text" ngClass="{'active', active}">
      <input
        *ngIf="_multiple"
        class="form-check-input"
        type="checkbox"
        [checked]="selected"
        [disabled]="disabled"
      />
      <ng-content></ng-content>
    </span>
    <ng-content select=".select-option-icon-container"></ng-content>
  `,
                }]
        }], ctorParameters: function () {
        return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [MDB_OPTION_PARENT]
                    }] }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [MDB_OPTION_GROUP]
                    }] }];
    } });

// eslint-disable-next-line @angular-eslint/component-class-suffix
class MdbSelectComponent {
    constructor(_overlay, _viewportRuler, _vcr, _cdRef, _renderer, ngControl) {
        this._overlay = _overlay;
        this._viewportRuler = _viewportRuler;
        this._vcr = _vcr;
        this._cdRef = _cdRef;
        this._renderer = _renderer;
        this.ngControl = ngControl;
        this._clearButton = false;
        this.clearButtonTabindex = 0;
        this._disabled = false;
        this.displayedLabels = 5;
        this._highlightFirst = true;
        this._multiple = false;
        this.notFoundMsg = 'No results found';
        this._outline = false;
        this.optionsSelectedLabel = 'options selected';
        this.placeholder = '';
        this.tabindex = 0;
        this._required = false;
        this._filter = false;
        this.filterPlaceholder = 'Search...';
        this.filterDebounce = 300;
        this.ariaLabel = '';
        this._visibleOptions = 5;
        this._optionHeight = 38;
        this._dropdownHeight = this.visibleOptions * this.optionHeight;
        this.valueChange = new EventEmitter();
        this.opened = new EventEmitter();
        this.closed = new EventEmitter();
        this.selected = new EventEmitter();
        // eslint-disable-next-line max-len
        this.deselected = new EventEmitter();
        this.noOptionsFound = new EventEmitter();
        this.stateChanges = new Subject();
        this.selectFilter = new FormControl();
        this._destroy = new Subject();
        this._isOpen = false;
        this._hasFocus = false;
        this._labelActive = false;
        this._showNoResultsMsg = false;
        this._selectAllChecked = false;
        this._compareWith = (o1, o2) => o1 === o2;
        // ControlValueAccessor interface methods.
        this._onChange = (_) => { };
        this._onTouched = () => { };
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }
    get autoSelect() {
        return this._autoSelect;
    }
    set autoSelect(value) {
        this._autoSelect = coerceBooleanProperty(value);
    }
    get clearButton() {
        return this._clearButton;
    }
    set clearButton(value) {
        this._clearButton = coerceBooleanProperty(value);
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    get highlightFirst() {
        return this._highlightFirst;
    }
    set highlightFirst(value) {
        this._highlightFirst = coerceBooleanProperty(value);
    }
    get multiple() {
        return this._multiple;
    }
    set multiple(value) {
        this._multiple = coerceBooleanProperty(value);
    }
    get outline() {
        return this._outline;
    }
    set outline(value) {
        this._outline = coerceBooleanProperty(value);
    }
    get required() {
        return this._required;
    }
    set required(value) {
        this._required = coerceBooleanProperty(value);
    }
    get filter() {
        return this._filter;
    }
    set filter(value) {
        this._filter = coerceBooleanProperty(value);
    }
    get visibleOptions() {
        return this._visibleOptions;
    }
    set visibleOptions(value) {
        if (value !== 0) {
            this._visibleOptions = value;
            this.dropdownHeight = this.visibleOptions * this.optionHeight;
        }
    }
    get optionHeight() {
        return this._optionHeight;
    }
    set optionHeight(value) {
        if (value !== 0) {
            this._optionHeight = value;
            this.dropdownHeight = this.visibleOptions * this.optionHeight;
        }
    }
    get dropdownHeight() {
        return this._dropdownHeight;
    }
    set dropdownHeight(value) {
        if (value !== 0) {
            this._dropdownHeight = value;
        }
    }
    get value() {
        return this._value;
    }
    set value(newValue) {
        if (newValue !== this._value) {
            if (this.options) {
                this._setSelection(newValue);
            }
            this._value = newValue;
        }
    }
    get compareWith() {
        return this._compareWith;
    }
    set compareWith(fn) {
        if (typeof fn === 'function') {
            this._compareWith = fn;
        }
    }
    get activeOption() {
        if (this._keyManager) {
            return this._keyManager.activeItem;
        }
        return null;
    }
    get selectionView() {
        if (this.multiple &&
            this.displayedLabels !== -1 &&
            this._selectionModel.selected.length > this.displayedLabels) {
            return `${this._selectionModel.selected.length} ${this.optionsSelectedLabel}`;
        }
        if (this.multiple) {
            const selectedOptions = this._selectionModel.selected.map((option) => option.label.trim());
            return selectedOptions.join(', ');
        }
        if (this._selectionModel.selected[0]) {
            return this._selectionModel.selected[0].label;
        }
        return '';
    }
    get hasSelection() {
        return this._selectionModel && !this._selectionModel.isEmpty();
    }
    get allChecked() {
        const selectionsNumber = this._selectionModel.selected.length;
        const optionsNumber = this.options.length;
        return selectionsNumber === optionsNumber;
    }
    handleKeydown(event) {
        if (!this.disabled) {
            this._handleClosedKeydown(event);
        }
    }
    get select() {
        return true;
    }
    get isFocused() {
        return this._hasFocus || this._isOpen;
    }
    get isActive() {
        return this.hasSelected || this.isFocused;
    }
    get isMultiselectable() {
        return this.multiple;
    }
    get hasPopup() {
        return true;
    }
    get isDisabled() {
        return this.disabled;
    }
    get isExpanded() {
        return this._isOpen;
    }
    get role() {
        return this.filter ? 'combobox' : 'listbox';
    }
    ngAfterContentInit() {
        this._initKeyManager(this.options);
        this._setInitialValue();
        this._listenToOptionClick();
        if (this.selectAllOption) {
            this._listenToSelectAllClick();
        }
    }
    _initKeyManager(viewOptions) {
        const options = this.selectAllOption ? [this.selectAllOption, ...viewOptions] : viewOptions;
        if (this.filter) {
            this._keyManager = new ActiveDescendantKeyManager(options).withVerticalOrientation();
        }
        else {
            this._keyManager = new ActiveDescendantKeyManager(options)
                .withTypeAhead(200)
                .withVerticalOrientation();
        }
    }
    _listenToOptionClick() {
        this.options.changes
            .pipe(startWith(this.options), tap(() => {
            this._setInitialValue();
            setTimeout(() => {
                this._showNoResultsMsg = this.options.length === 0;
                this._keyManager.setActiveItem(null);
                this._initKeyManager(this.options);
                if (this._isOpen) {
                    this._highlightFirstOption();
                    if (this._keyManager.activeItem) {
                        this._scrollToOption(this._keyManager.activeItem);
                    }
                }
            }, 0);
        }), switchMap((options) => {
            return merge(...options.map((option) => option.click$));
        }), takeUntil(this._destroy))
            .subscribe((clickedOption) => this._handleOptionClick(clickedOption));
    }
    _listenToSelectAllClick() {
        this.selectAllOption.click$
            .pipe(takeUntil(this._destroy))
            .subscribe((option) => {
            this.onSelectAll(option);
        });
    }
    _updateValue() {
        let updatedValue = null;
        if (this.multiple) {
            updatedValue = this._selectionModel.selected.map((option) => option.value);
        }
        else {
            updatedValue = this._selectionModel.selected[0].value;
        }
        this._value = updatedValue;
        this._cdRef.markForCheck();
    }
    _handleOptionClick(option) {
        if (option.disabled) {
            return;
        }
        if (this.multiple) {
            this._handleMultipleSelection(option);
        }
        else {
            this._handleSingleSelection(option);
        }
        this.stateChanges.next();
        this._cdRef.markForCheck();
    }
    _handleSingleSelection(option) {
        const currentSelection = this._selectionModel.selected[0];
        this._selectionModel.select(option);
        option.select();
        if (currentSelection && currentSelection !== option) {
            this._selectionModel.deselect(currentSelection);
            currentSelection.deselect();
            this.deselected.emit(currentSelection.value);
        }
        if (!currentSelection || (currentSelection && currentSelection !== option)) {
            this._updateValue();
            this.valueChange.emit(this.value);
            this._onChange(this.value);
            this.selected.emit(option.value);
        }
        this.close();
        this._focus();
    }
    _handleMultipleSelection(option) {
        const currentSelections = this._selectionModel.selected;
        if (option.selected) {
            this._selectionModel.deselect(option);
            option.deselect();
            this.deselected.emit(currentSelections);
        }
        else {
            this._selectionModel.select(option);
            option.select();
            this.selected.emit(option.value);
        }
        this._selectAllChecked = this.allChecked ? true : false;
        if (this.selectAllOption && !this._selectAllChecked) {
            this.selectAllOption.deselect();
        }
        else if (this.selectAllOption && this._selectAllChecked) {
            this.selectAllOption.select();
        }
        this._updateValue();
        this._sortValues();
        this.valueChange.emit(this.value);
        this._onChange(this.value);
        this._cdRef.markForCheck();
    }
    _setSelection(selectValue) {
        const previousSelected = this._selectionModel.selected;
        previousSelected.forEach((selectedOption) => {
            selectedOption.deselect();
        });
        this._selectionModel.clear();
        if (selectValue != null) {
            if (this.multiple) {
                selectValue.forEach((value) => this._selectByValue(value));
                this._sortValues();
            }
            else {
                this._selectByValue(selectValue);
            }
        }
        if (this.selectAllOption) {
            if (this.allChecked) {
                this.selectAllOption.select();
                this._selectAllChecked = true;
            }
            else {
                this.selectAllOption.deselect();
                this._selectAllChecked = false;
            }
        }
        this.stateChanges.next();
        this._cdRef.markForCheck();
    }
    _showFilteredOptions() {
        this.options.toArray().forEach((option) => {
            option.hidden = false;
        });
        this._showNoResultsMsg = false;
    }
    _selectByValue(value) {
        const matchingOption = this.options
            .toArray()
            .find((option) => option.value != null && this._compareWith(option.value, value));
        if (matchingOption) {
            this._selectionModel.select(matchingOption);
            matchingOption.select();
        }
    }
    _setInitialValue() {
        Promise.resolve().then(() => {
            const value = this.ngControl ? this.ngControl.value : this._value;
            this._setSelection(value);
        });
    }
    onSelectAll(selectAlloption) {
        if (selectAlloption.disabled) {
            return;
        }
        if (!selectAlloption.selected && !this._selectAllChecked) {
            this._selectAllChecked = true;
            this.options.forEach((option) => {
                if (!option.disabled) {
                    this._selectionModel.select(option);
                    option.select();
                }
            });
            this._updateValue();
            this._sortValues();
            this.valueChange.emit(this.value);
            this._onChange(this.value);
            selectAlloption.select();
        }
        else {
            this._selectAllChecked = false;
            this._selectionModel.clear();
            this.options.forEach((option) => {
                option.deselect();
            });
            selectAlloption.deselect();
            this._updateValue();
            this.valueChange.emit(this.value);
            this._onChange(this.value);
        }
    }
    open() {
        if (this.disabled) {
            return;
        }
        let overlayRef = this._overlayRef;
        if (!overlayRef) {
            this._portal = new TemplatePortal(this._dropdownTemplate, this._vcr);
            overlayRef = this._overlay.create({
                width: this.input.offsetWidth,
                scrollStrategy: this._overlay.scrollStrategies.reposition(),
                positionStrategy: this._getOverlayPosition(),
            });
            this._overlayRef = overlayRef;
            overlayRef.keydownEvents().subscribe((event) => {
                const key = event.keyCode;
                if (key === ESCAPE || (key === UP_ARROW && event.altKey)) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.close();
                    this._focus();
                }
            });
        }
        if (this.filter) {
            this._showFilteredOptions();
            this.selectFilter.setValue('');
            this._initKeyManager(this.options);
        }
        if (overlayRef && !overlayRef.hasAttached()) {
            overlayRef.attach(this._portal);
            this._listenToOutSideClick(overlayRef, this.input).subscribe(() => this.close());
            this._highlightFirstOption();
        }
        if (this._viewportRuler) {
            this._viewportRuler
                .change()
                .pipe(takeUntil(this._destroy))
                .subscribe(() => {
                if (this._isOpen && overlayRef) {
                    overlayRef.updateSize({ width: this.input.offsetWidth });
                }
            });
        }
        setTimeout(() => {
            if (this.filter) {
                this._filterInput.nativeElement.focus();
                this.selectFilter.valueChanges
                    .pipe(debounceTime(this.filterDebounce), takeUntil(this.closed))
                    .subscribe((value) => {
                    const filterValue = value.toLowerCase();
                    const options = this.options.toArray().filter((option) => {
                        if (option.label.toLowerCase().includes(filterValue)) {
                            option.hidden = false;
                            return option;
                        }
                        else {
                            option.hidden = true;
                            return false;
                        }
                    });
                    this._showNoResultsMsg = options.length === 0;
                    this._keyManager.setActiveItem(null);
                    this._initKeyManager(options);
                    if (filterValue.length === 0) {
                        this._highlightFirstOption();
                    }
                });
            }
        }, 0);
        setTimeout(() => {
            const firstSelected = this._selectionModel.selected[0];
            if (firstSelected) {
                this._scrollToOption(firstSelected);
            }
        }, 0);
        this.opened.emit();
        setTimeout(() => {
            this._renderer.listen(this.dropdown.nativeElement, 'keydown', (event) => {
                this._handleOpenKeydown(event);
            });
        }, 0);
        if (!this.filter) {
            setTimeout(() => {
                this.dropdown.nativeElement.focus();
            }, 0);
        }
        this._isOpen = true;
        this._cdRef.markForCheck();
    }
    _sortValues() {
        if (this.multiple) {
            const options = this.options.toArray();
            this._selectionModel.sort((a, b) => {
                return this.sortComparator
                    ? this.sortComparator(a, b, options)
                    : options.indexOf(a) - options.indexOf(b);
            });
        }
    }
    _listenToOutSideClick(overlayRef, origin) {
        return fromEvent(document, 'click').pipe(filter((event) => {
            const target = event.target;
            const notOrigin = target !== origin;
            // const notValue = !this._selectValue.nativeElement.contains(target);
            const notOverlay = !!overlayRef && overlayRef.overlayElement.contains(target) === false;
            return notOrigin && notOverlay;
        }), takeUntil(overlayRef.detachments()));
    }
    _getOverlayPosition() {
        const positionStrategy = this._overlay
            .position()
            .flexibleConnectedTo(this.input)
            .withPositions(this._getPositions())
            .withFlexibleDimensions(false);
        return positionStrategy;
    }
    _getPositions() {
        const topOffset = this.outline ? -7 : -3;
        return [
            {
                originX: 'start',
                originY: 'bottom',
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
    close() {
        if (!this._isOpen) {
            return;
        }
        if (this._overlayRef && this._overlayRef.hasAttached()) {
            this._overlayRef.detach();
            this._isOpen = false;
        }
        this.closed.emit();
        this._keyManager.setActiveItem(null);
        this._onTouched();
        this._cdRef.markForCheck();
    }
    toggle() {
        this._isOpen ? this.close() : this.open();
    }
    get hasSelected() {
        return this._selectionModel.selected.length !== 0;
    }
    get input() {
        return this._input.nativeElement;
    }
    get labelActive() {
        return this.hasSelected;
    }
    _scrollToOption(option) {
        let optionIndex;
        if (this.multiple && this.selectAllOption) {
            optionIndex = this.options.toArray().indexOf(option) + 1;
        }
        else {
            optionIndex = this.options.toArray().indexOf(option);
        }
        const groupsNumber = this._getNumberOfGroupsBeforeOption(optionIndex);
        const scrollToIndex = optionIndex + groupsNumber;
        const list = this._optionsWrapper.nativeElement;
        const listHeight = list.offsetHeight;
        if (optionIndex > -1) {
            const optionTop = scrollToIndex * this.optionHeight;
            const optionBottom = optionTop + this.optionHeight;
            const viewTop = list.scrollTop;
            const viewBottom = this.dropdownHeight;
            if (optionBottom > viewBottom) {
                list.scrollTop = optionBottom - listHeight;
            }
            else if (optionTop < viewTop) {
                list.scrollTop = optionTop;
            }
        }
    }
    _getNumberOfGroupsBeforeOption(optionIndex) {
        if (this.optionGroups.length) {
            const optionsList = this.options.toArray();
            const groupsList = this.optionGroups.toArray();
            const index = this.multiple ? optionIndex - 1 : optionIndex;
            let groupsNumber = 0;
            for (let i = 0; i <= index; i++) {
                if (optionsList[i].group && optionsList[i].group === groupsList[groupsNumber]) {
                    groupsNumber++;
                }
            }
            return groupsNumber;
        }
        return 0;
    }
    handleSelectionClear(event) {
        if (event && event.button === 2) {
            return;
        }
        this._selectionModel.clear();
        this.options.forEach((option) => {
            option.deselect();
        });
        if (this.selectAllOption && this._selectAllChecked) {
            this.selectAllOption.deselect();
            this._selectAllChecked = false;
        }
        this.value = null;
        this.valueChange.emit(null);
        this._onChange(null);
        this._selectAllChecked = false;
    }
    _handleOpenKeydown(event) {
        const key = event.keyCode;
        const manager = this._keyManager;
        const isUserTyping = manager.isTyping();
        const previousActiveItem = manager.activeItem;
        manager.onKeydown(event);
        if (key === TAB || (key === TAB && event.shiftKey)) {
            if (this.autoSelect && !this.multiple && manager.activeItem) {
                this._handleOptionClick(manager.activeItem);
            }
            this._focus();
            this.close();
        }
        if (key === HOME || key === END) {
            event.preventDefault();
            key === HOME ? manager.setFirstItemActive() : manager.setLastItemActive();
            if (manager.activeItem) {
                this._scrollToOption(manager.activeItem);
            }
        }
        else if (this._overlayRef &&
            this._overlayRef.hasAttached() &&
            !isUserTyping &&
            manager.activeItem &&
            (key === ENTER || (key === SPACE && !this.filter))) {
            event.preventDefault();
            if (this.multiple && this.selectAllOption && manager.activeItemIndex === 0) {
                this.onSelectAll(this.selectAllOption);
            }
            else {
                this._handleOptionClick(manager.activeItem);
            }
        }
        else if ((key === UP_ARROW && event.altKey) || key === ESCAPE) {
            event.preventDefault();
            this.close();
            this._focus();
        }
        else if (key === UP_ARROW || key === DOWN_ARROW) {
            if (manager.activeItem && manager.activeItem !== previousActiveItem) {
                this._scrollToOption(manager.activeItem);
            }
        }
    }
    _handleClosedKeydown(event) {
        const key = event.keyCode;
        const manager = this._keyManager;
        if ((key === DOWN_ARROW && event.altKey) || key === ENTER) {
            event.preventDefault();
            this.open();
        }
        else if (!this.multiple && key === DOWN_ARROW) {
            event.preventDefault();
            manager.setNextItemActive();
            if (manager.activeItem) {
                this._handleOptionClick(manager.activeItem);
            }
        }
        else if (!this.multiple && key === UP_ARROW) {
            event.preventDefault();
            manager.setPreviousItemActive();
            if (manager.activeItem) {
                this._handleOptionClick(manager.activeItem);
            }
        }
        else if (!this.multiple && key === HOME) {
            event.preventDefault();
            manager.setFirstItemActive();
            if (manager.activeItem) {
                this._handleOptionClick(manager.activeItem);
            }
        }
        else if (!this.multiple && key === END) {
            event.preventDefault();
            manager.setLastItemActive();
            if (manager.activeItem) {
                this._handleOptionClick(manager.activeItem);
            }
        }
        else if (this.multiple && (key === DOWN_ARROW || key === UP_ARROW)) {
            event.preventDefault();
            this.open();
        }
    }
    handleOptionsWheel(event) {
        const optionsList = this._optionsWrapper.nativeElement;
        const atTop = optionsList.scrollTop === 0;
        const atBottom = optionsList.offsetHeight + optionsList.scrollTop === optionsList.scrollHeight;
        if (atTop && event.deltaY < 0) {
            event.preventDefault();
        }
        else if (atBottom && event.deltaY > 0) {
            event.preventDefault();
        }
    }
    _focus() {
        this._hasFocus = true;
        this.input.focus();
    }
    _highlightFirstOption() {
        if (!this.highlightFirst)
            return;
        if (!this.hasSelection) {
            this._keyManager.setFirstItemActive();
        }
        else if (this.hasSelection && !this._selectionModel.selected[0].disabled) {
            this._keyManager.setActiveItem(this._selectionModel.selected[0]);
        }
    }
    onFocus() {
        if (!this.disabled) {
            this._focus();
            this.stateChanges.next();
        }
    }
    onBlur() {
        if (!this._isOpen && !this.disabled) {
            this._onTouched();
        }
        this._hasFocus = false;
        this.stateChanges.next();
    }
    ngOnInit() {
        this._selectionModel = new SelectionModel(this.multiple);
    }
    ngOnDestroy() {
        this._destroy.next();
        this._destroy.complete();
        this._destroyDropdown();
    }
    _destroyDropdown() {
        if (this._overlayRef) {
            this.close();
            this._overlayRef.dispose();
            this._overlayRef = null;
        }
    }
    writeValue(value) {
        this.value = value;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this._cdRef.markForCheck();
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
}
MdbSelectComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbSelectComponent, deps: [{ token: i1$1.Overlay }, { token: i1$1.ViewportRuler }, { token: i0.ViewContainerRef }, { token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }, { token: i2.NgControl, optional: true, self: true }], target: i0.ɵɵFactoryTarget.Component });
MdbSelectComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbSelectComponent, selector: "mdb-select", inputs: { autoSelect: "autoSelect", clearButton: "clearButton", clearButtonTabindex: "clearButtonTabindex", disabled: "disabled", dropdownClass: "dropdownClass", displayedLabels: "displayedLabels", highlightFirst: "highlightFirst", multiple: "multiple", notFoundMsg: "notFoundMsg", outline: "outline", optionsSelectedLabel: "optionsSelectedLabel", placeholder: "placeholder", tabindex: "tabindex", required: "required", filter: "filter", filterPlaceholder: "filterPlaceholder", filterDebounce: "filterDebounce", ariaLabel: ["aria-label", "ariaLabel"], ariaLabelledby: ["aria-labelledby", "ariaLabelledby"], visibleOptions: "visibleOptions", optionHeight: "optionHeight", dropdownHeight: "dropdownHeight", value: "value", compareWith: "compareWith", sortComparator: "sortComparator" }, outputs: { valueChange: "valueChange", opened: "opened", closed: "closed", selected: "selected", deselected: "deselected", noOptionsFound: "noOptionsFound" }, host: { listeners: { "keydown": "handleKeydown($event)" }, properties: { "class.select": "this.select", "class.focused": "this.isFocused", "class.active": "this.isActive", "attr.aria-multiselectable": "this.isMultiselectable", "attr.aria-haspopup": "this.hasPopup", "attr.aria-disabled": "this.isDisabled", "attr.aria-expanded": "this.isExpanded", "attr.aria-role": "this.role" } }, providers: [
        { provide: MdbAbstractFormControl, useExisting: MdbSelectComponent },
        { provide: MDB_OPTION_PARENT, useExisting: MdbSelectComponent },
    ], queries: [{ propertyName: "selectAllOption", first: true, predicate: MdbSelectAllOptionComponent, descendants: true }, { propertyName: "options", predicate: MdbOptionComponent, descendants: true }, { propertyName: "optionGroups", predicate: MdbOptionGroupComponent }], viewQueries: [{ propertyName: "_input", first: true, predicate: ["input"], descendants: true, static: true }, { propertyName: "_dropdownTemplate", first: true, predicate: ["dropdownTemplate"], descendants: true }, { propertyName: "dropdown", first: true, predicate: ["dropdown"], descendants: true }, { propertyName: "_optionsWrapper", first: true, predicate: ["optionsWrapper"], descendants: true }, { propertyName: "_customContent", first: true, predicate: ["customContent"], descendants: true }, { propertyName: "_filterInput", first: true, predicate: ["filterInput"], descendants: true }], ngImport: i0, template: "<input\n  #input\n  mdbInput\n  type=\"text\"\n  class=\"form-control select-input\"\n  readonly\n  (click)=\"toggle()\"\n  (focus)=\"onFocus()\"\n  (blur)=\"onBlur()\"\n  [value]=\"selectionView\"\n  [disabled]=\"disabled\"\n  [placeholder]=\"placeholder\"\n/>\n<span\n  *ngIf=\"clearButton && hasSelected\"\n  class=\"select-clear-btn\"\n  [tabIndex]=\"clearButtonTabindex\"\n  (keydown.enter)=\"handleSelectionClear(); $event.stopPropagation()\"\n  (click)=\"handleSelectionClear($event); $event.stopPropagation()\"\n  >&#x2715;</span\n>\n<span class=\"select-arrow\" (click)=\"toggle(); $event.stopPropagation()\"></span>\n\n<ng-template #dropdownTemplate>\n  <div\n    #dropdown\n    [@dropdownContainerAnimation]\n    tabindex=\"-1\"\n    class=\"select-dropdown-container {{ dropdownClass }}\"\n  >\n    <div [@dropdownAnimation]=\"'visible'\" class=\"select-dropdown\">\n      <div class=\"input-group\" *ngIf=\"filter\">\n        <input\n          #filterInput\n          [formControl]=\"selectFilter\"\n          [attr.role]=\"'searchbox'\"\n          type=\"text\"\n          class=\"form-control select-filter-input w-100 d-block\"\n          [placeholder]=\"filterPlaceholder\"\n        />\n      </div>\n      <div\n        #optionsWrapper\n        class=\"select-options-wrapper\"\n        [ngStyle]=\"{ 'max-height.px': dropdownHeight }\"\n      >\n        <div class=\"select-options-list\">\n          <ng-content select=\"mdb-select-all-option\"></ng-content>\n          <span\n            class=\"select-no-results\"\n            [style.height.px]=\"optionHeight\"\n            *ngIf=\"filter && _showNoResultsMsg && notFoundMsg\"\n            >{{ notFoundMsg }}</span\n          >\n          <ng-content select=\"mdb-option, mdb-option-group\"></ng-content>\n        </div>\n      </div>\n      <ng-content select=\".select-custom-content\"></ng-content>\n    </div>\n  </div>\n</ng-template>\n", directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], animations: [dropdownAnimation, dropdownContainerAnimation], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbSelectComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-select', changeDetection: ChangeDetectionStrategy.OnPush, animations: [dropdownAnimation, dropdownContainerAnimation], providers: [
                        { provide: MdbAbstractFormControl, useExisting: MdbSelectComponent },
                        { provide: MDB_OPTION_PARENT, useExisting: MdbSelectComponent },
                    ], template: "<input\n  #input\n  mdbInput\n  type=\"text\"\n  class=\"form-control select-input\"\n  readonly\n  (click)=\"toggle()\"\n  (focus)=\"onFocus()\"\n  (blur)=\"onBlur()\"\n  [value]=\"selectionView\"\n  [disabled]=\"disabled\"\n  [placeholder]=\"placeholder\"\n/>\n<span\n  *ngIf=\"clearButton && hasSelected\"\n  class=\"select-clear-btn\"\n  [tabIndex]=\"clearButtonTabindex\"\n  (keydown.enter)=\"handleSelectionClear(); $event.stopPropagation()\"\n  (click)=\"handleSelectionClear($event); $event.stopPropagation()\"\n  >&#x2715;</span\n>\n<span class=\"select-arrow\" (click)=\"toggle(); $event.stopPropagation()\"></span>\n\n<ng-template #dropdownTemplate>\n  <div\n    #dropdown\n    [@dropdownContainerAnimation]\n    tabindex=\"-1\"\n    class=\"select-dropdown-container {{ dropdownClass }}\"\n  >\n    <div [@dropdownAnimation]=\"'visible'\" class=\"select-dropdown\">\n      <div class=\"input-group\" *ngIf=\"filter\">\n        <input\n          #filterInput\n          [formControl]=\"selectFilter\"\n          [attr.role]=\"'searchbox'\"\n          type=\"text\"\n          class=\"form-control select-filter-input w-100 d-block\"\n          [placeholder]=\"filterPlaceholder\"\n        />\n      </div>\n      <div\n        #optionsWrapper\n        class=\"select-options-wrapper\"\n        [ngStyle]=\"{ 'max-height.px': dropdownHeight }\"\n      >\n        <div class=\"select-options-list\">\n          <ng-content select=\"mdb-select-all-option\"></ng-content>\n          <span\n            class=\"select-no-results\"\n            [style.height.px]=\"optionHeight\"\n            *ngIf=\"filter && _showNoResultsMsg && notFoundMsg\"\n            >{{ notFoundMsg }}</span\n          >\n          <ng-content select=\"mdb-option, mdb-option-group\"></ng-content>\n        </div>\n      </div>\n      <ng-content select=\".select-custom-content\"></ng-content>\n    </div>\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: function () {
        return [{ type: i1$1.Overlay }, { type: i1$1.ViewportRuler }, { type: i0.ViewContainerRef }, { type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }, { type: i2.NgControl, decorators: [{
                        type: Self
                    }, {
                        type: Optional
                    }] }];
    }, propDecorators: { _input: [{
                type: ViewChild,
                args: ['input', { static: true }]
            }], _dropdownTemplate: [{
                type: ViewChild,
                args: ['dropdownTemplate']
            }], dropdown: [{
                type: ViewChild,
                args: ['dropdown']
            }], _optionsWrapper: [{
                type: ViewChild,
                args: ['optionsWrapper']
            }], _customContent: [{
                type: ViewChild,
                args: ['customContent']
            }], _filterInput: [{
                type: ViewChild,
                args: ['filterInput', { static: false }]
            }], selectAllOption: [{
                type: ContentChild,
                args: [MdbSelectAllOptionComponent]
            }], options: [{
                type: ContentChildren,
                args: [MdbOptionComponent, { descendants: true }]
            }], optionGroups: [{
                type: ContentChildren,
                args: [MdbOptionGroupComponent]
            }], autoSelect: [{
                type: Input
            }], clearButton: [{
                type: Input
            }], clearButtonTabindex: [{
                type: Input
            }], disabled: [{
                type: Input
            }], dropdownClass: [{
                type: Input
            }], displayedLabels: [{
                type: Input
            }], highlightFirst: [{
                type: Input
            }], multiple: [{
                type: Input
            }], notFoundMsg: [{
                type: Input
            }], outline: [{
                type: Input
            }], optionsSelectedLabel: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], required: [{
                type: Input
            }], filter: [{
                type: Input
            }], filterPlaceholder: [{
                type: Input
            }], filterDebounce: [{
                type: Input
            }], ariaLabel: [{
                type: Input,
                args: ['aria-label']
            }], ariaLabelledby: [{
                type: Input,
                args: ['aria-labelledby']
            }], visibleOptions: [{
                type: Input
            }], optionHeight: [{
                type: Input
            }], dropdownHeight: [{
                type: Input
            }], value: [{
                type: Input
            }, {
                type: Input
            }], compareWith: [{
                type: Input
            }], sortComparator: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], opened: [{
                type: Output
            }], closed: [{
                type: Output
            }], selected: [{
                type: Output
            }], deselected: [{
                type: Output
            }], noOptionsFound: [{
                type: Output
            }], handleKeydown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }], select: [{
                type: HostBinding,
                args: ['class.select']
            }], isFocused: [{
                type: HostBinding,
                args: ['class.focused']
            }], isActive: [{
                type: HostBinding,
                args: ['class.active']
            }], isMultiselectable: [{
                type: HostBinding,
                args: ['attr.aria-multiselectable']
            }], hasPopup: [{
                type: HostBinding,
                args: ['attr.aria-haspopup']
            }], isDisabled: [{
                type: HostBinding,
                args: ['attr.aria-disabled']
            }], isExpanded: [{
                type: HostBinding,
                args: ['attr.aria-expanded']
            }], role: [{
                type: HostBinding,
                args: ['attr.aria-role']
            }] } });

class MdbSelectModule {
}
MdbSelectModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbSelectModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbSelectModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbSelectModule, declarations: [MdbSelectComponent, MdbSelectAllOptionComponent], imports: [CommonModule, OverlayModule, ReactiveFormsModule], exports: [MdbSelectComponent, MdbSelectAllOptionComponent, MdbFormsModule, MdbOptionModule] });
MdbSelectModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbSelectModule, imports: [[CommonModule, OverlayModule, ReactiveFormsModule], MdbFormsModule, MdbOptionModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbSelectModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [MdbSelectComponent, MdbSelectAllOptionComponent],
                    imports: [CommonModule, OverlayModule, ReactiveFormsModule],
                    exports: [MdbSelectComponent, MdbSelectAllOptionComponent, MdbFormsModule, MdbOptionModule],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MdbSelectAllOptionComponent, MdbSelectComponent, MdbSelectModule };
//# sourceMappingURL=mdb-angular-ui-kit-select.mjs.map
