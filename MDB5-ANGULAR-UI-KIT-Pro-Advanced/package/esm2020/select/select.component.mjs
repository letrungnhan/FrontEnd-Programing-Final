import { Component, ChangeDetectionStrategy, Input, ViewChild, Output, EventEmitter, ContentChildren, Self, Optional, HostListener, ContentChild, HostBinding, } from '@angular/core';
import { dropdownAnimation, dropdownContainerAnimation } from './select-animations';
import { fromEvent, merge, Subject } from 'rxjs';
import { filter, takeUntil, startWith, switchMap, tap, debounceTime } from 'rxjs/operators';
import { MDB_OPTION_PARENT, MdbOptionComponent } from 'mdb-angular-ui-kit/option';
import { FormControl } from '@angular/forms';
import { MdbOptionGroupComponent } from 'mdb-angular-ui-kit/option';
import { MdbSelectAllOptionComponent } from './select-all-option';
import { TemplatePortal } from '@angular/cdk/portal';
import { ESCAPE, UP_ARROW, HOME, END, ENTER, SPACE, DOWN_ARROW, TAB, } from '@angular/cdk/keycodes';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { MdbAbstractFormControl } from 'mdb-angular-ui-kit/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/common";
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class MdbSelectComponent {
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
MdbSelectComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbSelectComponent, deps: [{ token: i1.Overlay }, { token: i1.ViewportRuler }, { token: i0.ViewContainerRef }, { token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }, { token: i2.NgControl, optional: true, self: true }], target: i0.ɵɵFactoryTarget.Component });
MdbSelectComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbSelectComponent, selector: "mdb-select", inputs: { autoSelect: "autoSelect", clearButton: "clearButton", clearButtonTabindex: "clearButtonTabindex", disabled: "disabled", dropdownClass: "dropdownClass", displayedLabels: "displayedLabels", highlightFirst: "highlightFirst", multiple: "multiple", notFoundMsg: "notFoundMsg", outline: "outline", optionsSelectedLabel: "optionsSelectedLabel", placeholder: "placeholder", tabindex: "tabindex", required: "required", filter: "filter", filterPlaceholder: "filterPlaceholder", filterDebounce: "filterDebounce", ariaLabel: ["aria-label", "ariaLabel"], ariaLabelledby: ["aria-labelledby", "ariaLabelledby"], visibleOptions: "visibleOptions", optionHeight: "optionHeight", dropdownHeight: "dropdownHeight", value: "value", compareWith: "compareWith", sortComparator: "sortComparator" }, outputs: { valueChange: "valueChange", opened: "opened", closed: "closed", selected: "selected", deselected: "deselected", noOptionsFound: "noOptionsFound" }, host: { listeners: { "keydown": "handleKeydown($event)" }, properties: { "class.select": "this.select", "class.focused": "this.isFocused", "class.active": "this.isActive", "attr.aria-multiselectable": "this.isMultiselectable", "attr.aria-haspopup": "this.hasPopup", "attr.aria-disabled": "this.isDisabled", "attr.aria-expanded": "this.isExpanded", "attr.aria-role": "this.role" } }, providers: [
        { provide: MdbAbstractFormControl, useExisting: MdbSelectComponent },
        { provide: MDB_OPTION_PARENT, useExisting: MdbSelectComponent },
    ], queries: [{ propertyName: "selectAllOption", first: true, predicate: MdbSelectAllOptionComponent, descendants: true }, { propertyName: "options", predicate: MdbOptionComponent, descendants: true }, { propertyName: "optionGroups", predicate: MdbOptionGroupComponent }], viewQueries: [{ propertyName: "_input", first: true, predicate: ["input"], descendants: true, static: true }, { propertyName: "_dropdownTemplate", first: true, predicate: ["dropdownTemplate"], descendants: true }, { propertyName: "dropdown", first: true, predicate: ["dropdown"], descendants: true }, { propertyName: "_optionsWrapper", first: true, predicate: ["optionsWrapper"], descendants: true }, { propertyName: "_customContent", first: true, predicate: ["customContent"], descendants: true }, { propertyName: "_filterInput", first: true, predicate: ["filterInput"], descendants: true }], ngImport: i0, template: "<input\n  #input\n  mdbInput\n  type=\"text\"\n  class=\"form-control select-input\"\n  readonly\n  (click)=\"toggle()\"\n  (focus)=\"onFocus()\"\n  (blur)=\"onBlur()\"\n  [value]=\"selectionView\"\n  [disabled]=\"disabled\"\n  [placeholder]=\"placeholder\"\n/>\n<span\n  *ngIf=\"clearButton && hasSelected\"\n  class=\"select-clear-btn\"\n  [tabIndex]=\"clearButtonTabindex\"\n  (keydown.enter)=\"handleSelectionClear(); $event.stopPropagation()\"\n  (click)=\"handleSelectionClear($event); $event.stopPropagation()\"\n  >&#x2715;</span\n>\n<span class=\"select-arrow\" (click)=\"toggle(); $event.stopPropagation()\"></span>\n\n<ng-template #dropdownTemplate>\n  <div\n    #dropdown\n    [@dropdownContainerAnimation]\n    tabindex=\"-1\"\n    class=\"select-dropdown-container {{ dropdownClass }}\"\n  >\n    <div [@dropdownAnimation]=\"'visible'\" class=\"select-dropdown\">\n      <div class=\"input-group\" *ngIf=\"filter\">\n        <input\n          #filterInput\n          [formControl]=\"selectFilter\"\n          [attr.role]=\"'searchbox'\"\n          type=\"text\"\n          class=\"form-control select-filter-input w-100 d-block\"\n          [placeholder]=\"filterPlaceholder\"\n        />\n      </div>\n      <div\n        #optionsWrapper\n        class=\"select-options-wrapper\"\n        [ngStyle]=\"{ 'max-height.px': dropdownHeight }\"\n      >\n        <div class=\"select-options-list\">\n          <ng-content select=\"mdb-select-all-option\"></ng-content>\n          <span\n            class=\"select-no-results\"\n            [style.height.px]=\"optionHeight\"\n            *ngIf=\"filter && _showNoResultsMsg && notFoundMsg\"\n            >{{ notFoundMsg }}</span\n          >\n          <ng-content select=\"mdb-option, mdb-option-group\"></ng-content>\n        </div>\n      </div>\n      <ng-content select=\".select-custom-content\"></ng-content>\n    </div>\n  </div>\n</ng-template>\n", directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i3.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], animations: [dropdownAnimation, dropdownContainerAnimation], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbSelectComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-select', changeDetection: ChangeDetectionStrategy.OnPush, animations: [dropdownAnimation, dropdownContainerAnimation], providers: [
                        { provide: MdbAbstractFormControl, useExisting: MdbSelectComponent },
                        { provide: MDB_OPTION_PARENT, useExisting: MdbSelectComponent },
                    ], template: "<input\n  #input\n  mdbInput\n  type=\"text\"\n  class=\"form-control select-input\"\n  readonly\n  (click)=\"toggle()\"\n  (focus)=\"onFocus()\"\n  (blur)=\"onBlur()\"\n  [value]=\"selectionView\"\n  [disabled]=\"disabled\"\n  [placeholder]=\"placeholder\"\n/>\n<span\n  *ngIf=\"clearButton && hasSelected\"\n  class=\"select-clear-btn\"\n  [tabIndex]=\"clearButtonTabindex\"\n  (keydown.enter)=\"handleSelectionClear(); $event.stopPropagation()\"\n  (click)=\"handleSelectionClear($event); $event.stopPropagation()\"\n  >&#x2715;</span\n>\n<span class=\"select-arrow\" (click)=\"toggle(); $event.stopPropagation()\"></span>\n\n<ng-template #dropdownTemplate>\n  <div\n    #dropdown\n    [@dropdownContainerAnimation]\n    tabindex=\"-1\"\n    class=\"select-dropdown-container {{ dropdownClass }}\"\n  >\n    <div [@dropdownAnimation]=\"'visible'\" class=\"select-dropdown\">\n      <div class=\"input-group\" *ngIf=\"filter\">\n        <input\n          #filterInput\n          [formControl]=\"selectFilter\"\n          [attr.role]=\"'searchbox'\"\n          type=\"text\"\n          class=\"form-control select-filter-input w-100 d-block\"\n          [placeholder]=\"filterPlaceholder\"\n        />\n      </div>\n      <div\n        #optionsWrapper\n        class=\"select-options-wrapper\"\n        [ngStyle]=\"{ 'max-height.px': dropdownHeight }\"\n      >\n        <div class=\"select-options-list\">\n          <ng-content select=\"mdb-select-all-option\"></ng-content>\n          <span\n            class=\"select-no-results\"\n            [style.height.px]=\"optionHeight\"\n            *ngIf=\"filter && _showNoResultsMsg && notFoundMsg\"\n            >{{ notFoundMsg }}</span\n          >\n          <ng-content select=\"mdb-option, mdb-option-group\"></ng-content>\n        </div>\n      </div>\n      <ng-content select=\".select-custom-content\"></ng-content>\n    </div>\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i1.ViewportRuler }, { type: i0.ViewContainerRef }, { type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }, { type: i2.NgControl, decorators: [{
                    type: Self
                }, {
                    type: Optional
                }] }]; }, propDecorators: { _input: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLEtBQUssRUFHTCxTQUFTLEVBRVQsTUFBTSxFQUNOLFlBQVksRUFDWixlQUFlLEVBTWYsSUFBSSxFQUNKLFFBQVEsRUFDUixZQUFZLEVBRVosWUFBWSxFQUNaLFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNwRixPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEYsT0FBTyxFQUFtQyxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQVFsRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDckQsT0FBTyxFQUNMLE1BQU0sRUFDTixRQUFRLEVBQ1IsSUFBSSxFQUNKLEdBQUcsRUFDSCxLQUFLLEVBQ0wsS0FB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O2dCQUNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBQ2UsU0FBUztzQkFBN0IsS0FBSzt1QkFBQyxZQUFZO2dCQUNPLGNBQWM7c0JBQXZDLEtBQUs7dUJBQUMsaUJBQWlCO2dCQUdwQixjQUFjO3NCQURqQixLQUFLO2dCQWNGLFlBQVk7c0JBRGYsS0FBSztnQkFlRixjQUFjO3NCQURqQixLQUFLO2dCQWNGLEtBQUs7c0JBRlIsS0FBSzs7c0JBQ0wsS0FBSztnQkFpQkYsV0FBVztzQkFGZCxLQUFLO2dCQVdHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBTWEsV0FBVztzQkFBN0IsTUFBTTtnQkFDRyxNQUFNO3NCQUFmLE1BQU07Z0JBQ0csTUFBTTtzQkFBZixNQUFNO2dCQUNHLFFBQVE7c0JBQWpCLE1BQU07Z0JBRUcsVUFBVTtzQkFBbkIsTUFBTTtnQkFHRyxjQUFjO3NCQUF2QixNQUFNO2dCQXVFUCxhQUFhO3NCQURaLFlBQVk7dUJBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQVEvQixNQUFNO3NCQURULFdBQVc7dUJBQUMsY0FBYztnQkFNdkIsU0FBUztzQkFEWixXQUFXO3VCQUFDLGVBQWU7Z0JBTXhCLFFBQVE7c0JBRFgsV0FBVzt1QkFBQyxjQUFjO2dCQU12QixpQkFBaUI7c0JBRHBCLFdBQVc7dUJBQUMsMkJBQTJCO2dCQU1wQyxRQUFRO3NCQURYLFdBQVc7dUJBQUMsb0JBQW9CO2dCQU03QixVQUFVO3NCQURiLFdBQVc7dUJBQUMsb0JBQW9CO2dCQU03QixVQUFVO3NCQURiLFdBQVc7dUJBQUMsb0JBQW9CO2dCQU03QixJQUFJO3NCQURQLFdBQVc7dUJBQUMsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgSW5wdXQsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIEVsZW1lbnRSZWYsXG4gIFZpZXdDaGlsZCxcbiAgVGVtcGxhdGVSZWYsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIFF1ZXJ5TGlzdCxcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBTZWxmLFxuICBPcHRpb25hbCxcbiAgSG9zdExpc3RlbmVyLFxuICBSZW5kZXJlcjIsXG4gIENvbnRlbnRDaGlsZCxcbiAgSG9zdEJpbmRpbmcsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZHJvcGRvd25BbmltYXRpb24sIGRyb3Bkb3duQ29udGFpbmVyQW5pbWF0aW9uIH0gZnJvbSAnLi9zZWxlY3QtYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIG1lcmdlLCBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2VVbnRpbCwgc3RhcnRXaXRoLCBzd2l0Y2hNYXAsIHRhcCwgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTURCX09QVElPTl9QQVJFTlQsIE1kYk9wdGlvbkNvbXBvbmVudCB9IGZyb20gJ21kYi1hbmd1bGFyLXVpLWtpdC9vcHRpb24nO1xuaW1wb3J0IHsgTmdDb250cm9sLCBDb250cm9sVmFsdWVBY2Nlc3NvciwgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNZGJPcHRpb25Hcm91cENvbXBvbmVudCB9IGZyb20gJ21kYi1hbmd1bGFyLXVpLWtpdC9vcHRpb24nO1xuaW1wb3J0IHsgTWRiU2VsZWN0QWxsT3B0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9zZWxlY3QtYWxsLW9wdGlvbic7XG5pbXBvcnQge1xuICBPdmVybGF5UmVmLFxuICBQb3NpdGlvblN0cmF0ZWd5LFxuICBPdmVybGF5LFxuICBWaWV3cG9ydFJ1bGVyLFxuICBDb25uZWN0aW9uUG9zaXRpb25QYWlyLFxufSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBUZW1wbGF0ZVBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHtcbiAgRVNDQVBFLFxuICBVUF9BUlJPVyxcbiAgSE9NRSxcbiAgRU5ELFxuICBFTlRFUixcbiAgU1BBQ0UsXG4gIERPV05fQVJST1csXG4gIFRBQixcbiAgSSxcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IEFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgU2VsZWN0aW9uTW9kZWwgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHsgTWRiQWJzdHJhY3RGb3JtQ29udHJvbCB9IGZyb20gJ21kYi1hbmd1bGFyLXVpLWtpdC9mb3Jtcyc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21kYi1zZWxlY3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vc2VsZWN0LmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGFuaW1hdGlvbnM6IFtkcm9wZG93bkFuaW1hdGlvbiwgZHJvcGRvd25Db250YWluZXJBbmltYXRpb25dLFxuICBwcm92aWRlcnM6IFtcbiAgICB7IHByb3ZpZGU6IE1kYkFic3RyYWN0Rm9ybUNvbnRyb2wsIHVzZUV4aXN0aW5nOiBNZGJTZWxlY3RDb21wb25lbnQgfSxcbiAgICB7IHByb3ZpZGU6IE1EQl9PUFRJT05fUEFSRU5ULCB1c2VFeGlzdGluZzogTWRiU2VsZWN0Q29tcG9uZW50IH0sXG4gIF0sXG59KVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L2NvbXBvbmVudC1jbGFzcy1zdWZmaXhcbmV4cG9ydCBjbGFzcyBNZGJTZWxlY3RDb21wb25lbnRcbiAgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgQWZ0ZXJDb250ZW50SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3JcbntcbiAgQFZpZXdDaGlsZCgnaW5wdXQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBfaW5wdXQ6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD47XG4gIEBWaWV3Q2hpbGQoJ2Ryb3Bkb3duVGVtcGxhdGUnKSBfZHJvcGRvd25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgQFZpZXdDaGlsZCgnZHJvcGRvd24nKSBkcm9wZG93bjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnb3B0aW9uc1dyYXBwZXInKSBwcml2YXRlIF9vcHRpb25zV3JhcHBlcjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnY3VzdG9tQ29udGVudCcpIF9jdXN0b21Db250ZW50OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdmaWx0ZXJJbnB1dCcsIHsgc3RhdGljOiBmYWxzZSB9KSBfZmlsdGVySW5wdXQ6IEVsZW1lbnRSZWY7XG4gIEBDb250ZW50Q2hpbGQoTWRiU2VsZWN0QWxsT3B0aW9uQ29tcG9uZW50KSBzZWxlY3RBbGxPcHRpb246IE1kYlNlbGVjdEFsbE9wdGlvbkNvbXBvbmVudDtcbiAgQENvbnRlbnRDaGlsZHJlbihNZGJPcHRpb25Db21wb25lbnQsIHsgZGVzY2VuZGFudHM6IHRydWUgfSlcbiAgb3B0aW9uczogUXVlcnlMaXN0PE1kYk9wdGlvbkNvbXBvbmVudD47XG4gIEBDb250ZW50Q2hpbGRyZW4oTWRiT3B0aW9uR3JvdXBDb21wb25lbnQpIG9wdGlvbkdyb3VwczogUXVlcnlMaXN0PE1kYk9wdGlvbkdyb3VwQ29tcG9uZW50PjtcblxuICBASW5wdXQoKVxuICBnZXQgYXV0b1NlbGVjdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fYXV0b1NlbGVjdDtcbiAgfVxuICBzZXQgYXV0b1NlbGVjdCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2F1dG9TZWxlY3QgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2F1dG9TZWxlY3Q6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgZ2V0IGNsZWFyQnV0dG9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9jbGVhckJ1dHRvbjtcbiAgfVxuICBzZXQgY2xlYXJCdXR0b24odmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9jbGVhckJ1dHRvbiA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfY2xlYXJCdXR0b24gPSBmYWxzZTtcblxuICBASW5wdXQoKSBjbGVhckJ1dHRvblRhYmluZGV4ID0gMDtcblxuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICB9XG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIGRyb3Bkb3duQ2xhc3M6IHN0cmluZztcbiAgQElucHV0KCkgZGlzcGxheWVkTGFiZWxzID0gNTtcblxuICBASW5wdXQoKVxuICBnZXQgaGlnaGxpZ2h0Rmlyc3QoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2hpZ2hsaWdodEZpcnN0O1xuICB9XG4gIHNldCBoaWdobGlnaHRGaXJzdCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2hpZ2hsaWdodEZpcnN0ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9oaWdobGlnaHRGaXJzdCA9IHRydWU7XG5cbiAgQElucHV0KClcbiAgZ2V0IG11bHRpcGxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9tdWx0aXBsZTtcbiAgfVxuICBzZXQgbXVsdGlwbGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9tdWx0aXBsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfbXVsdGlwbGUgPSBmYWxzZTtcblxuICBASW5wdXQoKSBub3RGb3VuZE1zZyA9ICdObyByZXN1bHRzIGZvdW5kJztcblxuICBASW5wdXQoKVxuICBnZXQgb3V0bGluZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fb3V0bGluZTtcbiAgfVxuICBzZXQgb3V0bGluZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX291dGxpbmUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX291dGxpbmUgPSBmYWxzZTtcblxuICBASW5wdXQoKSBvcHRpb25zU2VsZWN0ZWRMYWJlbCA9ICdvcHRpb25zIHNlbGVjdGVkJztcbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnJztcbiAgQElucHV0KCkgdGFiaW5kZXggPSAwO1xuXG4gIEBJbnB1dCgpXG4gIGdldCByZXF1aXJlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWlyZWQ7XG4gIH1cbiAgc2V0IHJlcXVpcmVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmVxdWlyZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX3JlcXVpcmVkID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgZ2V0IGZpbHRlcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZmlsdGVyO1xuICB9XG4gIHNldCBmaWx0ZXIodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9maWx0ZXIgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2ZpbHRlciA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIGZpbHRlclBsYWNlaG9sZGVyID0gJ1NlYXJjaC4uLic7XG4gIEBJbnB1dCgpIGZpbHRlckRlYm91bmNlID0gMzAwO1xuICBASW5wdXQoJ2FyaWEtbGFiZWwnKSBhcmlhTGFiZWwgPSAnJztcbiAgQElucHV0KCdhcmlhLWxhYmVsbGVkYnknKSBhcmlhTGFiZWxsZWRieTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIGdldCB2aXNpYmxlT3B0aW9ucygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl92aXNpYmxlT3B0aW9ucztcbiAgfVxuXG4gIHNldCB2aXNpYmxlT3B0aW9ucyh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHZhbHVlICE9PSAwKSB7XG4gICAgICB0aGlzLl92aXNpYmxlT3B0aW9ucyA9IHZhbHVlO1xuICAgICAgdGhpcy5kcm9wZG93bkhlaWdodCA9IHRoaXMudmlzaWJsZU9wdGlvbnMgKiB0aGlzLm9wdGlvbkhlaWdodDtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBfdmlzaWJsZU9wdGlvbnMgPSA1O1xuXG4gIEBJbnB1dCgpXG4gIGdldCBvcHRpb25IZWlnaHQoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9uSGVpZ2h0O1xuICB9XG5cbiAgc2V0IG9wdGlvbkhlaWdodCh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlICE9PSAwKSB7XG4gICAgICB0aGlzLl9vcHRpb25IZWlnaHQgPSB2YWx1ZTtcbiAgICAgIHRoaXMuZHJvcGRvd25IZWlnaHQgPSB0aGlzLnZpc2libGVPcHRpb25zICogdGhpcy5vcHRpb25IZWlnaHQ7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfb3B0aW9uSGVpZ2h0ID0gMzg7XG5cbiAgQElucHV0KClcbiAgZ2V0IGRyb3Bkb3duSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2Ryb3Bkb3duSGVpZ2h0O1xuICB9XG5cbiAgc2V0IGRyb3Bkb3duSGVpZ2h0KHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodmFsdWUgIT09IDApIHtcbiAgICAgIHRoaXMuX2Ryb3Bkb3duSGVpZ2h0ID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIHByb3RlY3RlZCBfZHJvcGRvd25IZWlnaHQgPSB0aGlzLnZpc2libGVPcHRpb25zICogdGhpcy5vcHRpb25IZWlnaHQ7XG5cbiAgQElucHV0KClcbiAgQElucHV0KClcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG4gIHNldCB2YWx1ZShuZXdWYWx1ZTogYW55KSB7XG4gICAgaWYgKG5ld1ZhbHVlICE9PSB0aGlzLl92YWx1ZSkge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucykge1xuICAgICAgICB0aGlzLl9zZXRTZWxlY3Rpb24obmV3VmFsdWUpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl92YWx1ZSA9IG5ld1ZhbHVlO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIF92YWx1ZTogYW55O1xuXG4gIEBJbnB1dCgpXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICBnZXQgY29tcGFyZVdpdGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBhcmVXaXRoO1xuICB9XG4gIHNldCBjb21wYXJlV2l0aChmbjogKG8xOiBhbnksIG8yOiBhbnkpID0+IGJvb2xlYW4pIHtcbiAgICBpZiAodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLl9jb21wYXJlV2l0aCA9IGZuO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIHNvcnRDb21wYXJhdG9yOiAoXG4gICAgYTogTWRiT3B0aW9uQ29tcG9uZW50LFxuICAgIGI6IE1kYk9wdGlvbkNvbXBvbmVudCxcbiAgICBvcHRpb25zOiBNZGJPcHRpb25Db21wb25lbnRbXVxuICApID0+IG51bWJlcjtcblxuICBAT3V0cHV0KCkgcmVhZG9ubHkgdmFsdWVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBvcGVuZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBjbG9zZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBzZWxlY3RlZDogRXZlbnRFbWl0dGVyPE1kYk9wdGlvbkNvbXBvbmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1kYk9wdGlvbkNvbXBvbmVudD4oKTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgQE91dHB1dCgpIGRlc2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxNZGJPcHRpb25Db21wb25lbnQgfCBNZGJPcHRpb25Db21wb25lbnRbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgIE1kYk9wdGlvbkNvbXBvbmVudCB8IE1kYk9wdGlvbkNvbXBvbmVudFtdXG4gID4oKTtcbiAgQE91dHB1dCgpIG5vT3B0aW9uc0ZvdW5kOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIHJlYWRvbmx5IHN0YXRlQ2hhbmdlczogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgc2VsZWN0RmlsdGVyOiBGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgpO1xuXG4gIGdldCBhY3RpdmVPcHRpb24oKTogTWRiT3B0aW9uQ29tcG9uZW50IHwgbnVsbCB7XG4gICAgaWYgKHRoaXMuX2tleU1hbmFnZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLl9rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW07XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBnZXQgc2VsZWN0aW9uVmlldygpOiBzdHJpbmcge1xuICAgIGlmIChcbiAgICAgIHRoaXMubXVsdGlwbGUgJiZcbiAgICAgIHRoaXMuZGlzcGxheWVkTGFiZWxzICE9PSAtMSAmJlxuICAgICAgdGhpcy5fc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWQubGVuZ3RoID4gdGhpcy5kaXNwbGF5ZWRMYWJlbHNcbiAgICApIHtcbiAgICAgIHJldHVybiBgJHt0aGlzLl9zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZC5sZW5ndGh9ICR7dGhpcy5vcHRpb25zU2VsZWN0ZWRMYWJlbH1gO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICBjb25zdCBzZWxlY3RlZE9wdGlvbnMgPSB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZC5tYXAoKG9wdGlvbikgPT4gb3B0aW9uLmxhYmVsLnRyaW0oKSk7XG5cbiAgICAgIHJldHVybiBzZWxlY3RlZE9wdGlvbnMuam9pbignLCAnKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWRbMF0pIHtcbiAgICAgIHJldHVybiB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZFswXS5sYWJlbDtcbiAgICB9XG5cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBnZXQgaGFzU2VsZWN0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3Rpb25Nb2RlbCAmJiAhdGhpcy5fc2VsZWN0aW9uTW9kZWwuaXNFbXB0eSgpO1xuICB9XG5cbiAgZ2V0IGFsbENoZWNrZWQoKTogYm9vbGVhbiB7XG4gICAgY29uc3Qgc2VsZWN0aW9uc051bWJlciA9IHRoaXMuX3NlbGVjdGlvbk1vZGVsLnNlbGVjdGVkLmxlbmd0aDtcbiAgICBjb25zdCBvcHRpb25zTnVtYmVyID0gdGhpcy5vcHRpb25zLmxlbmd0aDtcblxuICAgIHJldHVybiBzZWxlY3Rpb25zTnVtYmVyID09PSBvcHRpb25zTnVtYmVyO1xuICB9XG5cbiAgcHJpdmF0ZSBfa2V5TWFuYWdlcjogQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXI8TWRiT3B0aW9uQ29tcG9uZW50IHwgbnVsbD47XG5cbiAgcHJpdmF0ZSBfb3ZlcmxheVJlZjogT3ZlcmxheVJlZiB8IG51bGw7XG4gIHByaXZhdGUgX3BvcnRhbDogVGVtcGxhdGVQb3J0YWw7XG5cbiAgcHJpdmF0ZSBfc2VsZWN0aW9uTW9kZWw6IFNlbGVjdGlvbk1vZGVsPE1kYk9wdGlvbkNvbXBvbmVudD47XG5cbiAgcHJldmlvdXNTZWxlY3RlZFZhbHVlczogYW55O1xuXG4gIHByaXZhdGUgX2Rlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIF9pc09wZW4gPSBmYWxzZTtcblxuICBfaGFzRm9jdXMgPSBmYWxzZTtcblxuICBfbGFiZWxBY3RpdmUgPSBmYWxzZTtcblxuICBfc2hvd05vUmVzdWx0c01zZyA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX3NlbGVjdEFsbENoZWNrZWQgPSBmYWxzZTtcblxuICBwcml2YXRlIF9jb21wYXJlV2l0aCA9IChvMTogYW55LCBvMjogYW55KSA9PiBvMSA9PT0gbzI7XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIGhhbmRsZUtleWRvd24oZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5faGFuZGxlQ2xvc2VkS2V5ZG93bihldmVudCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zZWxlY3QnKVxuICBnZXQgc2VsZWN0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5mb2N1c2VkJylcbiAgZ2V0IGlzRm9jdXNlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faGFzRm9jdXMgfHwgdGhpcy5faXNPcGVuO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hY3RpdmUnKVxuICBnZXQgaXNBY3RpdmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaGFzU2VsZWN0ZWQgfHwgdGhpcy5pc0ZvY3VzZWQ7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1tdWx0aXNlbGVjdGFibGUnKVxuICBnZXQgaXNNdWx0aXNlbGVjdGFibGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlwbGU7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1oYXNwb3B1cCcpXG4gIGdldCBoYXNQb3B1cCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWRpc2FibGVkJylcbiAgZ2V0IGlzRGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQ7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1leHBhbmRlZCcpXG4gIGdldCBpc0V4cGFuZGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc09wZW47XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1yb2xlJylcbiAgZ2V0IHJvbGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXIgPyAnY29tYm9ib3gnIDogJ2xpc3Rib3gnO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfb3ZlcmxheTogT3ZlcmxheSxcbiAgICBwcml2YXRlIF92aWV3cG9ydFJ1bGVyOiBWaWV3cG9ydFJ1bGVyLFxuICAgIHByaXZhdGUgX3ZjcjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIF9jZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBAU2VsZigpIEBPcHRpb25hbCgpIHB1YmxpYyBuZ0NvbnRyb2w6IE5nQ29udHJvbFxuICApIHtcbiAgICBpZiAodGhpcy5uZ0NvbnRyb2wpIHtcbiAgICAgIHRoaXMubmdDb250cm9sLnZhbHVlQWNjZXNzb3IgPSB0aGlzO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9pbml0S2V5TWFuYWdlcih0aGlzLm9wdGlvbnMpO1xuICAgIHRoaXMuX3NldEluaXRpYWxWYWx1ZSgpO1xuICAgIHRoaXMuX2xpc3RlblRvT3B0aW9uQ2xpY2soKTtcblxuICAgIGlmICh0aGlzLnNlbGVjdEFsbE9wdGlvbikge1xuICAgICAgdGhpcy5fbGlzdGVuVG9TZWxlY3RBbGxDbGljaygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2luaXRLZXlNYW5hZ2VyKHZpZXdPcHRpb25zKTogdm9pZCB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuc2VsZWN0QWxsT3B0aW9uID8gW3RoaXMuc2VsZWN0QWxsT3B0aW9uLCAuLi52aWV3T3B0aW9uc10gOiB2aWV3T3B0aW9ucztcblxuICAgIGlmICh0aGlzLmZpbHRlcikge1xuICAgICAgdGhpcy5fa2V5TWFuYWdlciA9IG5ldyBBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlcjxNZGJPcHRpb25Db21wb25lbnQgfCBudWxsPihcbiAgICAgICAgb3B0aW9uc1xuICAgICAgKS53aXRoVmVydGljYWxPcmllbnRhdGlvbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9rZXlNYW5hZ2VyID0gbmV3IEFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyPE1kYk9wdGlvbkNvbXBvbmVudCB8IG51bGw+KG9wdGlvbnMpXG4gICAgICAgIC53aXRoVHlwZUFoZWFkKDIwMClcbiAgICAgICAgLndpdGhWZXJ0aWNhbE9yaWVudGF0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfbGlzdGVuVG9PcHRpb25DbGljaygpOiB2b2lkIHtcbiAgICB0aGlzLm9wdGlvbnMuY2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIHN0YXJ0V2l0aCh0aGlzLm9wdGlvbnMpLFxuICAgICAgICB0YXAoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuX3NldEluaXRpYWxWYWx1ZSgpO1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fc2hvd05vUmVzdWx0c01zZyA9IHRoaXMub3B0aW9ucy5sZW5ndGggPT09IDA7XG4gICAgICAgICAgICB0aGlzLl9rZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0obnVsbCk7XG4gICAgICAgICAgICB0aGlzLl9pbml0S2V5TWFuYWdlcih0aGlzLm9wdGlvbnMpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5faXNPcGVuKSB7XG4gICAgICAgICAgICAgIHRoaXMuX2hpZ2hsaWdodEZpcnN0T3B0aW9uKCk7XG5cbiAgICAgICAgICAgICAgaWYgKHRoaXMuX2tleU1hbmFnZXIuYWN0aXZlSXRlbSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Njcm9sbFRvT3B0aW9uKHRoaXMuX2tleU1hbmFnZXIuYWN0aXZlSXRlbSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfSksXG4gICAgICAgIHN3aXRjaE1hcCgob3B0aW9uczogUXVlcnlMaXN0PE1kYk9wdGlvbkNvbXBvbmVudD4pID0+IHtcbiAgICAgICAgICByZXR1cm4gbWVyZ2UoLi4ub3B0aW9ucy5tYXAoKG9wdGlvbjogTWRiT3B0aW9uQ29tcG9uZW50KSA9PiBvcHRpb24uY2xpY2skKSk7XG4gICAgICAgIH0pLFxuICAgICAgICB0YWtlVW50aWwodGhpcy5fZGVzdHJveSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKGNsaWNrZWRPcHRpb246IE1kYk9wdGlvbkNvbXBvbmVudCkgPT4gdGhpcy5faGFuZGxlT3B0aW9uQ2xpY2soY2xpY2tlZE9wdGlvbikpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbGlzdGVuVG9TZWxlY3RBbGxDbGljaygpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdEFsbE9wdGlvbi5jbGljayRcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95KSlcbiAgICAgIC5zdWJzY3JpYmUoKG9wdGlvbjogTWRiU2VsZWN0QWxsT3B0aW9uQ29tcG9uZW50KSA9PiB7XG4gICAgICAgIHRoaXMub25TZWxlY3RBbGwob3B0aW9uKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlVmFsdWUoKTogdm9pZCB7XG4gICAgbGV0IHVwZGF0ZWRWYWx1ZTogYW55ID0gbnVsbDtcblxuICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICB1cGRhdGVkVmFsdWUgPSB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZC5tYXAoKG9wdGlvbikgPT4gb3B0aW9uLnZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdXBkYXRlZFZhbHVlID0gdGhpcy5fc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWRbMF0udmFsdWU7XG4gICAgfVxuXG4gICAgdGhpcy5fdmFsdWUgPSB1cGRhdGVkVmFsdWU7XG4gICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVPcHRpb25DbGljayhvcHRpb246IE1kYk9wdGlvbkNvbXBvbmVudCk6IHZvaWQge1xuICAgIGlmIChvcHRpb24uZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgdGhpcy5faGFuZGxlTXVsdGlwbGVTZWxlY3Rpb24ob3B0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGFuZGxlU2luZ2xlU2VsZWN0aW9uKG9wdGlvbik7XG4gICAgfVxuXG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIHRoaXMuX2NkUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlU2luZ2xlU2VsZWN0aW9uKG9wdGlvbjogTWRiT3B0aW9uQ29tcG9uZW50KTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudFNlbGVjdGlvbiA9IHRoaXMuX3NlbGVjdGlvbk1vZGVsLnNlbGVjdGVkWzBdO1xuXG4gICAgdGhpcy5fc2VsZWN0aW9uTW9kZWwuc2VsZWN0KG9wdGlvbik7XG4gICAgb3B0aW9uLnNlbGVjdCgpO1xuXG4gICAgaWYgKGN1cnJlbnRTZWxlY3Rpb24gJiYgY3VycmVudFNlbGVjdGlvbiAhPT0gb3B0aW9uKSB7XG4gICAgICB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5kZXNlbGVjdChjdXJyZW50U2VsZWN0aW9uKTtcbiAgICAgIGN1cnJlbnRTZWxlY3Rpb24uZGVzZWxlY3QoKTtcbiAgICAgIHRoaXMuZGVzZWxlY3RlZC5lbWl0KGN1cnJlbnRTZWxlY3Rpb24udmFsdWUpO1xuICAgIH1cblxuICAgIGlmICghY3VycmVudFNlbGVjdGlvbiB8fCAoY3VycmVudFNlbGVjdGlvbiAmJiBjdXJyZW50U2VsZWN0aW9uICE9PSBvcHRpb24pKSB7XG4gICAgICB0aGlzLl91cGRhdGVWYWx1ZSgpO1xuICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHRoaXMudmFsdWUpO1xuICAgICAgdGhpcy5fb25DaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICB0aGlzLnNlbGVjdGVkLmVtaXQob3B0aW9uLnZhbHVlKTtcbiAgICB9XG5cbiAgICB0aGlzLmNsb3NlKCk7XG4gICAgdGhpcy5fZm9jdXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZU11bHRpcGxlU2VsZWN0aW9uKG9wdGlvbjogTWRiT3B0aW9uQ29tcG9uZW50KTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudFNlbGVjdGlvbnMgPSB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZDtcbiAgICBpZiAob3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5kZXNlbGVjdChvcHRpb24pO1xuICAgICAgb3B0aW9uLmRlc2VsZWN0KCk7XG4gICAgICB0aGlzLmRlc2VsZWN0ZWQuZW1pdChjdXJyZW50U2VsZWN0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3NlbGVjdGlvbk1vZGVsLnNlbGVjdChvcHRpb24pO1xuICAgICAgb3B0aW9uLnNlbGVjdCgpO1xuICAgICAgdGhpcy5zZWxlY3RlZC5lbWl0KG9wdGlvbi52YWx1ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5fc2VsZWN0QWxsQ2hlY2tlZCA9IHRoaXMuYWxsQ2hlY2tlZCA/IHRydWUgOiBmYWxzZTtcblxuICAgIGlmICh0aGlzLnNlbGVjdEFsbE9wdGlvbiAmJiAhdGhpcy5fc2VsZWN0QWxsQ2hlY2tlZCkge1xuICAgICAgdGhpcy5zZWxlY3RBbGxPcHRpb24uZGVzZWxlY3QoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2VsZWN0QWxsT3B0aW9uICYmIHRoaXMuX3NlbGVjdEFsbENoZWNrZWQpIHtcbiAgICAgIHRoaXMuc2VsZWN0QWxsT3B0aW9uLnNlbGVjdCgpO1xuICAgIH1cblxuICAgIHRoaXMuX3VwZGF0ZVZhbHVlKCk7XG4gICAgdGhpcy5fc29ydFZhbHVlcygpO1xuICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh0aGlzLnZhbHVlKTtcbiAgICB0aGlzLl9vbkNoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldFNlbGVjdGlvbihzZWxlY3RWYWx1ZTogYW55IHwgYW55W10pOiB2b2lkIHtcbiAgICBjb25zdCBwcmV2aW91c1NlbGVjdGVkID0gdGhpcy5fc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWQ7XG5cbiAgICBwcmV2aW91c1NlbGVjdGVkLmZvckVhY2goKHNlbGVjdGVkT3B0aW9uOiBNZGJPcHRpb25Db21wb25lbnQpID0+IHtcbiAgICAgIHNlbGVjdGVkT3B0aW9uLmRlc2VsZWN0KCk7XG4gICAgfSk7XG4gICAgdGhpcy5fc2VsZWN0aW9uTW9kZWwuY2xlYXIoKTtcblxuICAgIGlmIChzZWxlY3RWYWx1ZSAhPSBudWxsKSB7XG4gICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgICBzZWxlY3RWYWx1ZS5mb3JFYWNoKCh2YWx1ZTogYW55KSA9PiB0aGlzLl9zZWxlY3RCeVZhbHVlKHZhbHVlKSk7XG4gICAgICAgIHRoaXMuX3NvcnRWYWx1ZXMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdEJ5VmFsdWUoc2VsZWN0VmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLnNlbGVjdEFsbE9wdGlvbikge1xuICAgICAgaWYgKHRoaXMuYWxsQ2hlY2tlZCkge1xuICAgICAgICB0aGlzLnNlbGVjdEFsbE9wdGlvbi5zZWxlY3QoKTtcbiAgICAgICAgdGhpcy5fc2VsZWN0QWxsQ2hlY2tlZCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNlbGVjdEFsbE9wdGlvbi5kZXNlbGVjdCgpO1xuICAgICAgICB0aGlzLl9zZWxlY3RBbGxDaGVja2VkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIHRoaXMuX2NkUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2hvd0ZpbHRlcmVkT3B0aW9ucygpOiB2b2lkIHtcbiAgICB0aGlzLm9wdGlvbnMudG9BcnJheSgpLmZvckVhY2goKG9wdGlvbjogTWRiT3B0aW9uQ29tcG9uZW50KSA9PiB7XG4gICAgICBvcHRpb24uaGlkZGVuID0gZmFsc2U7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9zaG93Tm9SZXN1bHRzTXNnID0gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIF9zZWxlY3RCeVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBtYXRjaGluZ09wdGlvbiA9IHRoaXMub3B0aW9uc1xuICAgICAgLnRvQXJyYXkoKVxuICAgICAgLmZpbmQoXG4gICAgICAgIChvcHRpb246IE1kYk9wdGlvbkNvbXBvbmVudCkgPT5cbiAgICAgICAgICBvcHRpb24udmFsdWUgIT0gbnVsbCAmJiB0aGlzLl9jb21wYXJlV2l0aChvcHRpb24udmFsdWUsIHZhbHVlKVxuICAgICAgKTtcblxuICAgIGlmIChtYXRjaGluZ09wdGlvbikge1xuICAgICAgdGhpcy5fc2VsZWN0aW9uTW9kZWwuc2VsZWN0KG1hdGNoaW5nT3B0aW9uKTtcbiAgICAgIG1hdGNoaW5nT3B0aW9uLnNlbGVjdCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3NldEluaXRpYWxWYWx1ZSgpOiB2b2lkIHtcbiAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5uZ0NvbnRyb2wgPyB0aGlzLm5nQ29udHJvbC52YWx1ZSA6IHRoaXMuX3ZhbHVlO1xuICAgICAgdGhpcy5fc2V0U2VsZWN0aW9uKHZhbHVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIG9uU2VsZWN0QWxsKHNlbGVjdEFsbG9wdGlvbjogTWRiU2VsZWN0QWxsT3B0aW9uQ29tcG9uZW50KTogdm9pZCB7XG4gICAgaWYgKHNlbGVjdEFsbG9wdGlvbi5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghc2VsZWN0QWxsb3B0aW9uLnNlbGVjdGVkICYmICF0aGlzLl9zZWxlY3RBbGxDaGVja2VkKSB7XG4gICAgICB0aGlzLl9zZWxlY3RBbGxDaGVja2VkID0gdHJ1ZTtcbiAgICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKChvcHRpb246IE1kYk9wdGlvbkNvbXBvbmVudCkgPT4ge1xuICAgICAgICBpZiAoIW9wdGlvbi5kaXNhYmxlZCkge1xuICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbk1vZGVsLnNlbGVjdChvcHRpb24pO1xuICAgICAgICAgIG9wdGlvbi5zZWxlY3QoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLl91cGRhdGVWYWx1ZSgpO1xuICAgICAgdGhpcy5fc29ydFZhbHVlcygpO1xuICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHRoaXMudmFsdWUpO1xuICAgICAgdGhpcy5fb25DaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICBzZWxlY3RBbGxvcHRpb24uc2VsZWN0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3NlbGVjdEFsbENoZWNrZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuX3NlbGVjdGlvbk1vZGVsLmNsZWFyKCk7XG4gICAgICB0aGlzLm9wdGlvbnMuZm9yRWFjaCgob3B0aW9uOiBNZGJPcHRpb25Db21wb25lbnQpID0+IHtcbiAgICAgICAgb3B0aW9uLmRlc2VsZWN0KCk7XG4gICAgICB9KTtcbiAgICAgIHNlbGVjdEFsbG9wdGlvbi5kZXNlbGVjdCgpO1xuICAgICAgdGhpcy5fdXBkYXRlVmFsdWUoKTtcbiAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh0aGlzLnZhbHVlKTtcbiAgICAgIHRoaXMuX29uQ2hhbmdlKHRoaXMudmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIG9wZW4oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgb3ZlcmxheVJlZiA9IHRoaXMuX292ZXJsYXlSZWY7XG5cbiAgICBpZiAoIW92ZXJsYXlSZWYpIHtcbiAgICAgIHRoaXMuX3BvcnRhbCA9IG5ldyBUZW1wbGF0ZVBvcnRhbCh0aGlzLl9kcm9wZG93blRlbXBsYXRlLCB0aGlzLl92Y3IpO1xuXG4gICAgICBvdmVybGF5UmVmID0gdGhpcy5fb3ZlcmxheS5jcmVhdGUoe1xuICAgICAgICB3aWR0aDogdGhpcy5pbnB1dC5vZmZzZXRXaWR0aCxcbiAgICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMuX292ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5yZXBvc2l0aW9uKCksXG4gICAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHRoaXMuX2dldE92ZXJsYXlQb3NpdGlvbigpLFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX292ZXJsYXlSZWYgPSBvdmVybGF5UmVmO1xuXG4gICAgICBvdmVybGF5UmVmLmtleWRvd25FdmVudHMoKS5zdWJzY3JpYmUoKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleUNvZGU7XG5cbiAgICAgICAgaWYgKGtleSA9PT0gRVNDQVBFIHx8IChrZXkgPT09IFVQX0FSUk9XICYmIGV2ZW50LmFsdEtleSkpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICB0aGlzLl9mb2N1cygpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5maWx0ZXIpIHtcbiAgICAgIHRoaXMuX3Nob3dGaWx0ZXJlZE9wdGlvbnMoKTtcbiAgICAgIHRoaXMuc2VsZWN0RmlsdGVyLnNldFZhbHVlKCcnKTtcbiAgICAgIHRoaXMuX2luaXRLZXlNYW5hZ2VyKHRoaXMub3B0aW9ucyk7XG4gICAgfVxuXG4gICAgaWYgKG92ZXJsYXlSZWYgJiYgIW92ZXJsYXlSZWYuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgb3ZlcmxheVJlZi5hdHRhY2godGhpcy5fcG9ydGFsKTtcbiAgICAgIHRoaXMuX2xpc3RlblRvT3V0U2lkZUNsaWNrKG92ZXJsYXlSZWYsIHRoaXMuaW5wdXQpLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsb3NlKCkpO1xuXG4gICAgICB0aGlzLl9oaWdobGlnaHRGaXJzdE9wdGlvbigpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl92aWV3cG9ydFJ1bGVyKSB7XG4gICAgICB0aGlzLl92aWV3cG9ydFJ1bGVyXG4gICAgICAgIC5jaGFuZ2UoKVxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveSkpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLl9pc09wZW4gJiYgb3ZlcmxheVJlZikge1xuICAgICAgICAgICAgb3ZlcmxheVJlZi51cGRhdGVTaXplKHsgd2lkdGg6IHRoaXMuaW5wdXQub2Zmc2V0V2lkdGggfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmZpbHRlcikge1xuICAgICAgICB0aGlzLl9maWx0ZXJJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG5cbiAgICAgICAgdGhpcy5zZWxlY3RGaWx0ZXIudmFsdWVDaGFuZ2VzXG4gICAgICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKHRoaXMuZmlsdGVyRGVib3VuY2UpLCB0YWtlVW50aWwodGhpcy5jbG9zZWQpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZpbHRlclZhbHVlID0gdmFsdWUudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9ucy50b0FycmF5KCkuZmlsdGVyKChvcHRpb246IE1kYk9wdGlvbkNvbXBvbmVudCkgPT4ge1xuICAgICAgICAgICAgICBpZiAob3B0aW9uLmxhYmVsLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoZmlsdGVyVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9uLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb247XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb3B0aW9uLmhpZGRlbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5fc2hvd05vUmVzdWx0c01zZyA9IG9wdGlvbnMubGVuZ3RoID09PSAwO1xuICAgICAgICAgICAgdGhpcy5fa2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKG51bGwpO1xuICAgICAgICAgICAgdGhpcy5faW5pdEtleU1hbmFnZXIob3B0aW9ucyk7XG4gICAgICAgICAgICBpZiAoZmlsdGVyVmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIHRoaXMuX2hpZ2hsaWdodEZpcnN0T3B0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSwgMCk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnN0IGZpcnN0U2VsZWN0ZWQgPSB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5zZWxlY3RlZFswXTtcbiAgICAgIGlmIChmaXJzdFNlbGVjdGVkKSB7XG4gICAgICAgIHRoaXMuX3Njcm9sbFRvT3B0aW9uKGZpcnN0U2VsZWN0ZWQpO1xuICAgICAgfVxuICAgIH0sIDApO1xuXG4gICAgdGhpcy5vcGVuZWQuZW1pdCgpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5saXN0ZW4odGhpcy5kcm9wZG93bi5uYXRpdmVFbGVtZW50LCAna2V5ZG93bicsIChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICB0aGlzLl9oYW5kbGVPcGVuS2V5ZG93bihldmVudCk7XG4gICAgICB9KTtcbiAgICB9LCAwKTtcblxuICAgIGlmICghdGhpcy5maWx0ZXIpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmRyb3Bkb3duLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIH0sIDApO1xuICAgIH1cblxuICAgIHRoaXMuX2lzT3BlbiA9IHRydWU7XG4gICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9zb3J0VmFsdWVzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zLnRvQXJyYXkoKTtcblxuICAgICAgdGhpcy5fc2VsZWN0aW9uTW9kZWwuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zb3J0Q29tcGFyYXRvclxuICAgICAgICAgID8gdGhpcy5zb3J0Q29tcGFyYXRvcihhLCBiLCBvcHRpb25zKVxuICAgICAgICAgIDogb3B0aW9ucy5pbmRleE9mKGEpIC0gb3B0aW9ucy5pbmRleE9mKGIpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfbGlzdGVuVG9PdXRTaWRlQ2xpY2soXG4gICAgb3ZlcmxheVJlZjogT3ZlcmxheVJlZixcbiAgICBvcmlnaW46IEhUTUxFbGVtZW50XG4gICk6IE9ic2VydmFibGU8TW91c2VFdmVudD4ge1xuICAgIHJldHVybiBmcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpLnBpcGUoXG4gICAgICBmaWx0ZXIoKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgY29uc3Qgbm90T3JpZ2luID0gdGFyZ2V0ICE9PSBvcmlnaW47XG4gICAgICAgIC8vIGNvbnN0IG5vdFZhbHVlID0gIXRoaXMuX3NlbGVjdFZhbHVlLm5hdGl2ZUVsZW1lbnQuY29udGFpbnModGFyZ2V0KTtcbiAgICAgICAgY29uc3Qgbm90T3ZlcmxheSA9ICEhb3ZlcmxheVJlZiAmJiBvdmVybGF5UmVmLm92ZXJsYXlFbGVtZW50LmNvbnRhaW5zKHRhcmdldCkgPT09IGZhbHNlO1xuICAgICAgICByZXR1cm4gbm90T3JpZ2luICYmIG5vdE92ZXJsYXk7XG4gICAgICB9KSxcbiAgICAgIHRha2VVbnRpbChvdmVybGF5UmVmLmRldGFjaG1lbnRzKCkpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldE92ZXJsYXlQb3NpdGlvbigpOiBQb3NpdGlvblN0cmF0ZWd5IHtcbiAgICBjb25zdCBwb3NpdGlvblN0cmF0ZWd5ID0gdGhpcy5fb3ZlcmxheVxuICAgICAgLnBvc2l0aW9uKClcbiAgICAgIC5mbGV4aWJsZUNvbm5lY3RlZFRvKHRoaXMuaW5wdXQpXG4gICAgICAud2l0aFBvc2l0aW9ucyh0aGlzLl9nZXRQb3NpdGlvbnMoKSlcbiAgICAgIC53aXRoRmxleGlibGVEaW1lbnNpb25zKGZhbHNlKTtcblxuICAgIHJldHVybiBwb3NpdGlvblN0cmF0ZWd5O1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0UG9zaXRpb25zKCk6IENvbm5lY3Rpb25Qb3NpdGlvblBhaXJbXSB7XG4gICAgY29uc3QgdG9wT2Zmc2V0ID0gdGhpcy5vdXRsaW5lID8gLTcgOiAtMztcblxuICAgIHJldHVybiBbXG4gICAgICB7XG4gICAgICAgIG9yaWdpblg6ICdzdGFydCcsXG4gICAgICAgIG9yaWdpblk6ICdib3R0b20nLFxuICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgICAgb3ZlcmxheVk6ICd0b3AnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcbiAgICAgICAgb3JpZ2luWTogJ3RvcCcsXG4gICAgICAgIG9mZnNldFk6IHRvcE9mZnNldCxcbiAgICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXG4gICAgICAgIG92ZXJsYXlZOiAnYm90dG9tJyxcbiAgICAgIH0sXG4gICAgXTtcbiAgfVxuXG4gIGNsb3NlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5faXNPcGVuKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX292ZXJsYXlSZWYgJiYgdGhpcy5fb3ZlcmxheVJlZi5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICB0aGlzLl9vdmVybGF5UmVmLmRldGFjaCgpO1xuICAgICAgdGhpcy5faXNPcGVuID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy5jbG9zZWQuZW1pdCgpO1xuICAgIHRoaXMuX2tleU1hbmFnZXIuc2V0QWN0aXZlSXRlbShudWxsKTtcbiAgICB0aGlzLl9vblRvdWNoZWQoKTtcbiAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9pc09wZW4gPyB0aGlzLmNsb3NlKCkgOiB0aGlzLm9wZW4oKTtcbiAgfVxuXG4gIGdldCBoYXNTZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWQubGVuZ3RoICE9PSAwO1xuICB9XG5cbiAgZ2V0IGlucHV0KCk6IEhUTUxJbnB1dEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLl9pbnB1dC5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgZ2V0IGxhYmVsQWN0aXZlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmhhc1NlbGVjdGVkO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2Nyb2xsVG9PcHRpb24ob3B0aW9uOiBNZGJPcHRpb25Db21wb25lbnQpOiB2b2lkIHtcbiAgICBsZXQgb3B0aW9uSW5kZXg6IG51bWJlcjtcblxuICAgIGlmICh0aGlzLm11bHRpcGxlICYmIHRoaXMuc2VsZWN0QWxsT3B0aW9uKSB7XG4gICAgICBvcHRpb25JbmRleCA9IHRoaXMub3B0aW9ucy50b0FycmF5KCkuaW5kZXhPZihvcHRpb24pICsgMTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0aW9uSW5kZXggPSB0aGlzLm9wdGlvbnMudG9BcnJheSgpLmluZGV4T2Yob3B0aW9uKTtcbiAgICB9XG5cbiAgICBjb25zdCBncm91cHNOdW1iZXIgPSB0aGlzLl9nZXROdW1iZXJPZkdyb3Vwc0JlZm9yZU9wdGlvbihvcHRpb25JbmRleCk7XG5cbiAgICBjb25zdCBzY3JvbGxUb0luZGV4ID0gb3B0aW9uSW5kZXggKyBncm91cHNOdW1iZXI7XG5cbiAgICBjb25zdCBsaXN0ID0gdGhpcy5fb3B0aW9uc1dyYXBwZXIubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCBsaXN0SGVpZ2h0ID0gbGlzdC5vZmZzZXRIZWlnaHQ7XG5cbiAgICBpZiAob3B0aW9uSW5kZXggPiAtMSkge1xuICAgICAgY29uc3Qgb3B0aW9uVG9wID0gc2Nyb2xsVG9JbmRleCAqIHRoaXMub3B0aW9uSGVpZ2h0O1xuICAgICAgY29uc3Qgb3B0aW9uQm90dG9tID0gb3B0aW9uVG9wICsgdGhpcy5vcHRpb25IZWlnaHQ7XG5cbiAgICAgIGNvbnN0IHZpZXdUb3AgPSBsaXN0LnNjcm9sbFRvcDtcbiAgICAgIGNvbnN0IHZpZXdCb3R0b20gPSB0aGlzLmRyb3Bkb3duSGVpZ2h0O1xuXG4gICAgICBpZiAob3B0aW9uQm90dG9tID4gdmlld0JvdHRvbSkge1xuICAgICAgICBsaXN0LnNjcm9sbFRvcCA9IG9wdGlvbkJvdHRvbSAtIGxpc3RIZWlnaHQ7XG4gICAgICB9IGVsc2UgaWYgKG9wdGlvblRvcCA8IHZpZXdUb3ApIHtcbiAgICAgICAgbGlzdC5zY3JvbGxUb3AgPSBvcHRpb25Ub3A7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0TnVtYmVyT2ZHcm91cHNCZWZvcmVPcHRpb24ob3B0aW9uSW5kZXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKHRoaXMub3B0aW9uR3JvdXBzLmxlbmd0aCkge1xuICAgICAgY29uc3Qgb3B0aW9uc0xpc3QgPSB0aGlzLm9wdGlvbnMudG9BcnJheSgpO1xuICAgICAgY29uc3QgZ3JvdXBzTGlzdCA9IHRoaXMub3B0aW9uR3JvdXBzLnRvQXJyYXkoKTtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5tdWx0aXBsZSA/IG9wdGlvbkluZGV4IC0gMSA6IG9wdGlvbkluZGV4O1xuICAgICAgbGV0IGdyb3Vwc051bWJlciA9IDA7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IGluZGV4OyBpKyspIHtcbiAgICAgICAgaWYgKG9wdGlvbnNMaXN0W2ldLmdyb3VwICYmIG9wdGlvbnNMaXN0W2ldLmdyb3VwID09PSBncm91cHNMaXN0W2dyb3Vwc051bWJlcl0pIHtcbiAgICAgICAgICBncm91cHNOdW1iZXIrKztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZ3JvdXBzTnVtYmVyO1xuICAgIH1cblxuICAgIHJldHVybiAwO1xuICB9XG5cbiAgaGFuZGxlU2VsZWN0aW9uQ2xlYXIoZXZlbnQ/OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2ZW50ICYmIGV2ZW50LmJ1dHRvbiA9PT0gMikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3NlbGVjdGlvbk1vZGVsLmNsZWFyKCk7XG4gICAgdGhpcy5vcHRpb25zLmZvckVhY2goKG9wdGlvbjogTWRiT3B0aW9uQ29tcG9uZW50KSA9PiB7XG4gICAgICBvcHRpb24uZGVzZWxlY3QoKTtcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLnNlbGVjdEFsbE9wdGlvbiAmJiB0aGlzLl9zZWxlY3RBbGxDaGVja2VkKSB7XG4gICAgICB0aGlzLnNlbGVjdEFsbE9wdGlvbi5kZXNlbGVjdCgpO1xuICAgICAgdGhpcy5fc2VsZWN0QWxsQ2hlY2tlZCA9IGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLnZhbHVlID0gbnVsbDtcbiAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQobnVsbCk7XG4gICAgdGhpcy5fb25DaGFuZ2UobnVsbCk7XG4gICAgdGhpcy5fc2VsZWN0QWxsQ2hlY2tlZCA9IGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlT3BlbktleWRvd24oZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleUNvZGU7XG4gICAgY29uc3QgbWFuYWdlciA9IHRoaXMuX2tleU1hbmFnZXI7XG4gICAgY29uc3QgaXNVc2VyVHlwaW5nID0gbWFuYWdlci5pc1R5cGluZygpO1xuICAgIGNvbnN0IHByZXZpb3VzQWN0aXZlSXRlbSA9IG1hbmFnZXIuYWN0aXZlSXRlbTtcbiAgICBtYW5hZ2VyLm9uS2V5ZG93bihldmVudCk7XG5cbiAgICBpZiAoa2V5ID09PSBUQUIgfHwgKGtleSA9PT0gVEFCICYmIGV2ZW50LnNoaWZ0S2V5KSkge1xuICAgICAgaWYgKHRoaXMuYXV0b1NlbGVjdCAmJiAhdGhpcy5tdWx0aXBsZSAmJiBtYW5hZ2VyLmFjdGl2ZUl0ZW0pIHtcbiAgICAgICAgdGhpcy5faGFuZGxlT3B0aW9uQ2xpY2sobWFuYWdlci5hY3RpdmVJdGVtKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fZm9jdXMoKTtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG5cbiAgICBpZiAoa2V5ID09PSBIT01FIHx8IGtleSA9PT0gRU5EKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAga2V5ID09PSBIT01FID8gbWFuYWdlci5zZXRGaXJzdEl0ZW1BY3RpdmUoKSA6IG1hbmFnZXIuc2V0TGFzdEl0ZW1BY3RpdmUoKTtcbiAgICAgIGlmIChtYW5hZ2VyLmFjdGl2ZUl0ZW0pIHtcbiAgICAgICAgdGhpcy5fc2Nyb2xsVG9PcHRpb24obWFuYWdlci5hY3RpdmVJdGVtKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKFxuICAgICAgdGhpcy5fb3ZlcmxheVJlZiAmJlxuICAgICAgdGhpcy5fb3ZlcmxheVJlZi5oYXNBdHRhY2hlZCgpICYmXG4gICAgICAhaXNVc2VyVHlwaW5nICYmXG4gICAgICBtYW5hZ2VyLmFjdGl2ZUl0ZW0gJiZcbiAgICAgIChrZXkgPT09IEVOVEVSIHx8IChrZXkgPT09IFNQQUNFICYmICF0aGlzLmZpbHRlcikpXG4gICAgKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBpZiAodGhpcy5tdWx0aXBsZSAmJiB0aGlzLnNlbGVjdEFsbE9wdGlvbiAmJiBtYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCA9PT0gMCkge1xuICAgICAgICB0aGlzLm9uU2VsZWN0QWxsKHRoaXMuc2VsZWN0QWxsT3B0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2hhbmRsZU9wdGlvbkNsaWNrKG1hbmFnZXIuYWN0aXZlSXRlbSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICgoa2V5ID09PSBVUF9BUlJPVyAmJiBldmVudC5hbHRLZXkpIHx8IGtleSA9PT0gRVNDQVBFKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgdGhpcy5fZm9jdXMoKTtcbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gVVBfQVJST1cgfHwga2V5ID09PSBET1dOX0FSUk9XKSB7XG4gICAgICBpZiAobWFuYWdlci5hY3RpdmVJdGVtICYmIG1hbmFnZXIuYWN0aXZlSXRlbSAhPT0gcHJldmlvdXNBY3RpdmVJdGVtKSB7XG4gICAgICAgIHRoaXMuX3Njcm9sbFRvT3B0aW9uKG1hbmFnZXIuYWN0aXZlSXRlbSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlQ2xvc2VkS2V5ZG93bihldmVudDogYW55KTogdm9pZCB7XG4gICAgY29uc3Qga2V5ID0gZXZlbnQua2V5Q29kZTtcbiAgICBjb25zdCBtYW5hZ2VyID0gdGhpcy5fa2V5TWFuYWdlcjtcblxuICAgIGlmICgoa2V5ID09PSBET1dOX0FSUk9XICYmIGV2ZW50LmFsdEtleSkgfHwga2V5ID09PSBFTlRFUikge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMub3BlbigpO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMubXVsdGlwbGUgJiYga2V5ID09PSBET1dOX0FSUk9XKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbWFuYWdlci5zZXROZXh0SXRlbUFjdGl2ZSgpO1xuICAgICAgaWYgKG1hbmFnZXIuYWN0aXZlSXRlbSkge1xuICAgICAgICB0aGlzLl9oYW5kbGVPcHRpb25DbGljayhtYW5hZ2VyLmFjdGl2ZUl0ZW0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXRoaXMubXVsdGlwbGUgJiYga2V5ID09PSBVUF9BUlJPVykge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG1hbmFnZXIuc2V0UHJldmlvdXNJdGVtQWN0aXZlKCk7XG4gICAgICBpZiAobWFuYWdlci5hY3RpdmVJdGVtKSB7XG4gICAgICAgIHRoaXMuX2hhbmRsZU9wdGlvbkNsaWNrKG1hbmFnZXIuYWN0aXZlSXRlbSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghdGhpcy5tdWx0aXBsZSAmJiBrZXkgPT09IEhPTUUpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBtYW5hZ2VyLnNldEZpcnN0SXRlbUFjdGl2ZSgpO1xuICAgICAgaWYgKG1hbmFnZXIuYWN0aXZlSXRlbSkge1xuICAgICAgICB0aGlzLl9oYW5kbGVPcHRpb25DbGljayhtYW5hZ2VyLmFjdGl2ZUl0ZW0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXRoaXMubXVsdGlwbGUgJiYga2V5ID09PSBFTkQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBtYW5hZ2VyLnNldExhc3RJdGVtQWN0aXZlKCk7XG4gICAgICBpZiAobWFuYWdlci5hY3RpdmVJdGVtKSB7XG4gICAgICAgIHRoaXMuX2hhbmRsZU9wdGlvbkNsaWNrKG1hbmFnZXIuYWN0aXZlSXRlbSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLm11bHRpcGxlICYmIChrZXkgPT09IERPV05fQVJST1cgfHwga2V5ID09PSBVUF9BUlJPVykpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLm9wZW4oKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVPcHRpb25zV2hlZWwoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IG9wdGlvbnNMaXN0ID0gdGhpcy5fb3B0aW9uc1dyYXBwZXIubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCBhdFRvcCA9IG9wdGlvbnNMaXN0LnNjcm9sbFRvcCA9PT0gMDtcbiAgICBjb25zdCBhdEJvdHRvbSA9IG9wdGlvbnNMaXN0Lm9mZnNldEhlaWdodCArIG9wdGlvbnNMaXN0LnNjcm9sbFRvcCA9PT0gb3B0aW9uc0xpc3Quc2Nyb2xsSGVpZ2h0O1xuXG4gICAgaWYgKGF0VG9wICYmIGV2ZW50LmRlbHRhWSA8IDApIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSBlbHNlIGlmIChhdEJvdHRvbSAmJiBldmVudC5kZWx0YVkgPiAwKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2ZvY3VzKCk6IHZvaWQge1xuICAgIHRoaXMuX2hhc0ZvY3VzID0gdHJ1ZTtcbiAgICB0aGlzLmlucHV0LmZvY3VzKCk7XG4gIH1cblxuICBwcml2YXRlIF9oaWdobGlnaHRGaXJzdE9wdGlvbigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaGlnaGxpZ2h0Rmlyc3QpIHJldHVybjtcbiAgICBpZiAoIXRoaXMuaGFzU2VsZWN0aW9uKSB7XG4gICAgICB0aGlzLl9rZXlNYW5hZ2VyLnNldEZpcnN0SXRlbUFjdGl2ZSgpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5oYXNTZWxlY3Rpb24gJiYgIXRoaXMuX3NlbGVjdGlvbk1vZGVsLnNlbGVjdGVkWzBdLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLl9rZXlNYW5hZ2VyLnNldEFjdGl2ZUl0ZW0odGhpcy5fc2VsZWN0aW9uTW9kZWwuc2VsZWN0ZWRbMF0pO1xuICAgIH1cbiAgfVxuXG4gIG9uRm9jdXMoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLl9mb2N1cygpO1xuICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cbiAgfVxuXG4gIG9uQmx1cigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2lzT3BlbiAmJiAhdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5fb25Ub3VjaGVkKCk7XG4gICAgfVxuICAgIHRoaXMuX2hhc0ZvY3VzID0gZmFsc2U7XG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fc2VsZWN0aW9uTW9kZWwgPSBuZXcgU2VsZWN0aW9uTW9kZWw8TWRiT3B0aW9uQ29tcG9uZW50Pih0aGlzLm11bHRpcGxlKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX2Rlc3Ryb3kubmV4dCgpO1xuICAgIHRoaXMuX2Rlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB0aGlzLl9kZXN0cm95RHJvcGRvd24oKTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rlc3Ryb3lEcm9wZG93bigpIHtcbiAgICBpZiAodGhpcy5fb3ZlcmxheVJlZikge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgdGhpcy5fb3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgICB0aGlzLl9vdmVybGF5UmVmID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvLyBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2UgbWV0aG9kcy5cblxuICBwcml2YXRlIF9vbkNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xuICBwcml2YXRlIF9vblRvdWNoZWQgPSAoKSA9PiB7fTtcblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChfOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9jbGVhckJ1dHRvbjogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2hpZ2hsaWdodEZpcnN0OiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9tdWx0aXBsZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfb3V0bGluZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfcmVxdWlyZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2ZpbHRlcjogQm9vbGVhbklucHV0O1xufVxuIiwiPGlucHV0XG4gICNpbnB1dFxuICBtZGJJbnB1dFxuICB0eXBlPVwidGV4dFwiXG4gIGNsYXNzPVwiZm9ybS1jb250cm9sIHNlbGVjdC1pbnB1dFwiXG4gIHJlYWRvbmx5XG4gIChjbGljayk9XCJ0b2dnbGUoKVwiXG4gIChmb2N1cyk9XCJvbkZvY3VzKClcIlxuICAoYmx1cik9XCJvbkJsdXIoKVwiXG4gIFt2YWx1ZV09XCJzZWxlY3Rpb25WaWV3XCJcbiAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbi8+XG48c3BhblxuICAqbmdJZj1cImNsZWFyQnV0dG9uICYmIGhhc1NlbGVjdGVkXCJcbiAgY2xhc3M9XCJzZWxlY3QtY2xlYXItYnRuXCJcbiAgW3RhYkluZGV4XT1cImNsZWFyQnV0dG9uVGFiaW5kZXhcIlxuICAoa2V5ZG93bi5lbnRlcik9XCJoYW5kbGVTZWxlY3Rpb25DbGVhcigpOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIlxuICAoY2xpY2spPVwiaGFuZGxlU2VsZWN0aW9uQ2xlYXIoJGV2ZW50KTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCJcbiAgPiYjeDI3MTU7PC9zcGFuXG4+XG48c3BhbiBjbGFzcz1cInNlbGVjdC1hcnJvd1wiIChjbGljayk9XCJ0b2dnbGUoKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCI+PC9zcGFuPlxuXG48bmctdGVtcGxhdGUgI2Ryb3Bkb3duVGVtcGxhdGU+XG4gIDxkaXZcbiAgICAjZHJvcGRvd25cbiAgICBbQGRyb3Bkb3duQ29udGFpbmVyQW5pbWF0aW9uXVxuICAgIHRhYmluZGV4PVwiLTFcIlxuICAgIGNsYXNzPVwic2VsZWN0LWRyb3Bkb3duLWNvbnRhaW5lciB7eyBkcm9wZG93bkNsYXNzIH19XCJcbiAgPlxuICAgIDxkaXYgW0Bkcm9wZG93bkFuaW1hdGlvbl09XCIndmlzaWJsZSdcIiBjbGFzcz1cInNlbGVjdC1kcm9wZG93blwiPlxuICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCIgKm5nSWY9XCJmaWx0ZXJcIj5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgI2ZpbHRlcklucHV0XG4gICAgICAgICAgW2Zvcm1Db250cm9sXT1cInNlbGVjdEZpbHRlclwiXG4gICAgICAgICAgW2F0dHIucm9sZV09XCInc2VhcmNoYm94J1wiXG4gICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sIHNlbGVjdC1maWx0ZXItaW5wdXQgdy0xMDAgZC1ibG9ja1wiXG4gICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImZpbHRlclBsYWNlaG9sZGVyXCJcbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdlxuICAgICAgICAjb3B0aW9uc1dyYXBwZXJcbiAgICAgICAgY2xhc3M9XCJzZWxlY3Qtb3B0aW9ucy13cmFwcGVyXCJcbiAgICAgICAgW25nU3R5bGVdPVwieyAnbWF4LWhlaWdodC5weCc6IGRyb3Bkb3duSGVpZ2h0IH1cIlxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VsZWN0LW9wdGlvbnMtbGlzdFwiPlxuICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm1kYi1zZWxlY3QtYWxsLW9wdGlvblwiPjwvbmctY29udGVudD5cbiAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgY2xhc3M9XCJzZWxlY3Qtbm8tcmVzdWx0c1wiXG4gICAgICAgICAgICBbc3R5bGUuaGVpZ2h0LnB4XT1cIm9wdGlvbkhlaWdodFwiXG4gICAgICAgICAgICAqbmdJZj1cImZpbHRlciAmJiBfc2hvd05vUmVzdWx0c01zZyAmJiBub3RGb3VuZE1zZ1wiXG4gICAgICAgICAgICA+e3sgbm90Rm91bmRNc2cgfX08L3NwYW5cbiAgICAgICAgICA+XG4gICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibWRiLW9wdGlvbiwgbWRiLW9wdGlvbi1ncm91cFwiPjwvbmctY29udGVudD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIi5zZWxlY3QtY3VzdG9tLWNvbnRlbnRcIj48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cbiJdfQ==