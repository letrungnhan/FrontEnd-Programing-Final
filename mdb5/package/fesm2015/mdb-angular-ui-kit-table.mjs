import * as i0 from '@angular/core';
import { Component, Input, HostBinding, EventEmitter, Directive, Output, forwardRef, Inject, HostListener, NgModule } from '@angular/core';
import * as i5 from '@angular/common';
import { CommonModule } from '@angular/common';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i1 from 'mdb-angular-ui-kit/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import * as i2 from 'mdb-angular-ui-kit/select';
import { MdbSelectModule } from 'mdb-angular-ui-kit/select';
import * as i3 from 'mdb-angular-ui-kit/option';
import * as i4 from '@angular/forms';
import { FormsModule } from '@angular/forms';

// eslint-disable-next-line @angular-eslint/component-class-suffix
class MdbTableDirective {
    constructor(el, renderer, _cdRef) {
        this.el = el;
        this.renderer = renderer;
        this._cdRef = _cdRef;
        this._fixedHeader = false;
        this.filterFn = this.defaultFilterFn;
        this._dataSource = [];
        this._filteredData = [];
        this._dataSourceChanged = new Subject();
        this._searchText = '';
        this._destroy$ = new Subject();
        this._sortFn = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
    }
    get striped() {
        return this._striped;
    }
    set striped(value) {
        this._striped = coerceBooleanProperty(value);
    }
    get bordered() {
        return this._bordered;
    }
    set bordered(value) {
        this._bordered = coerceBooleanProperty(value);
    }
    get borderless() {
        return this._borderless;
    }
    set borderless(value) {
        this._borderless = coerceBooleanProperty(value);
    }
    get hover() {
        return this._hover;
    }
    set hover(value) {
        this._hover = coerceBooleanProperty(value);
    }
    get sm() {
        return this._sm;
    }
    set sm(value) {
        this._sm = coerceBooleanProperty(value);
    }
    get responsive() {
        return this._responsive;
    }
    set responsive(value) {
        this._responsive = coerceBooleanProperty(value);
    }
    get dataSource() {
        return this._dataSource;
    }
    set dataSource(newData) {
        if (newData) {
            this._dataSource = newData;
            Promise.resolve().then(() => {
                this._updateData();
            });
        }
    }
    get fixedHeader() {
        return this._fixedHeader;
    }
    set fixedHeader(value) {
        this._fixedHeader = coerceBooleanProperty(value);
    }
    addRow(newRow) {
        this._dataSource.push(newRow);
    }
    addRowAfter(index, row) {
        this._dataSource.splice(index, 0, row);
    }
    removeRow(index) {
        this._dataSource.splice(index, 1);
    }
    rowRemoved() {
        return new Observable((observer) => {
            observer.next(true);
        });
    }
    removeLastRow() {
        this._dataSource.pop();
    }
    dataSourceChange() {
        return this._dataSourceChanged;
    }
    ngOnInit() {
        this.renderer.addClass(this.el.nativeElement, 'table');
    }
    ngAfterViewInit() {
        if (this.pagination) {
            this.pagination.paginationChange.pipe(takeUntil(this._destroy$)).subscribe(() => {
                this._updateData();
            });
        }
        if (this.sort) {
            this.sort.sortChange.pipe(takeUntil(this._destroy$)).subscribe(() => {
                this._updateData();
            });
        }
        if (this.fixedHeader) {
            const tableHead = this.el.nativeElement.querySelector('thead');
            Array.from(tableHead.firstElementChild.children).forEach((child) => {
                this.renderer.addClass(child, 'fixed-cell');
            });
        }
    }
    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }
    search(value) {
        this._searchText = value;
        this._updateData();
    }
    _updateData() {
        let updatedData = [];
        updatedData = this._filterData(this.dataSource);
        if (this.sort && this.sort.active) {
            updatedData = this._sortData(updatedData.slice());
        }
        if (this.pagination) {
            updatedData = this._paginateData(updatedData);
        }
        this.data = updatedData;
        this._cdRef.markForCheck();
    }
    _filterData(data) {
        if (this._searchText === null || this._searchText === '') {
            this._filteredData = data;
        }
        else {
            this._filteredData = data.filter((obj) => this.filterFn(obj, this._searchText));
        }
        if (this.pagination) {
            this.pagination.total = this._filteredData.length;
            const currentPage = this.pagination.page;
            if (currentPage > 0) {
                const lastPage = Math.ceil(this.pagination.total / this.pagination.entries) - 1 || 0;
                if (currentPage > lastPage) {
                    this.pagination.page = lastPage;
                }
            }
        }
        return this._filteredData;
    }
    defaultFilterFn(data, searchTerm) {
        return Object.keys(data).some((key) => {
            if (data[key]) {
                return data[key].toString().toLowerCase().includes(searchTerm.toLowerCase());
            }
        });
    }
    _sortData(data) {
        const name = this.sort.active.name;
        const direction = this.sort.active.direction;
        if (direction !== 'none') {
            return data.sort((a, b) => {
                const result = this._sortFn(a[name], b[name]);
                return direction === 'asc' ? result : -result;
            });
        }
        else {
            return data;
        }
    }
    _paginateData(data) {
        const startIndex = this.pagination.page * this.pagination.entries;
        const endIndex = startIndex + this.pagination.entries;
        return data.slice(startIndex, endIndex);
    }
}
MdbTableDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTableDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MdbTableDirective.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbTableDirective, selector: "[mdbTable]", inputs: { striped: "striped", bordered: "bordered", borderless: "borderless", hover: "hover", sm: "sm", responsive: "responsive", dataSource: "dataSource", fixedHeader: "fixedHeader", filterFn: "filterFn", pagination: "pagination", sort: "sort" }, host: { properties: { "class.table-striped": "this.striped", "class.table-bordered": "this.bordered", "class.table-borderless": "this.borderless", "class.table-hover": "this.hover", "class.table-sm": "this.sm", "class.table-responsive": "this.responsive" } }, exportAs: ["mdbTable"], ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTableDirective, decorators: [{
            type: Component,
            args: [{
                    // eslint-disable-next-line @angular-eslint/component-selector
                    selector: '[mdbTable]',
                    exportAs: 'mdbTable',
                    template: '<ng-content></ng-content>',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { striped: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.table-striped']
            }], bordered: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.table-bordered']
            }], borderless: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.table-borderless']
            }], hover: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.table-hover']
            }], sm: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.table-sm']
            }], responsive: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.table-responsive']
            }], dataSource: [{
                type: Input
            }], fixedHeader: [{
                type: Input
            }], filterFn: [{
                type: Input
            }], pagination: [{
                type: Input
            }], sort: [{
                type: Input
            }] } });

class MdbTableSortDirective {
    constructor() {
        this.headers = new Map();
        this.sortChange = new EventEmitter();
    }
    sort(header) {
        this.active = header;
        this.headers.forEach((sortHeader) => {
            if (sortHeader.name !== header.name) {
                sortHeader.direction = 'none';
            }
        });
        this.sortChange.emit({ name: header.name, direction: header.direction });
    }
    addHeader(name, header) {
        this.headers.set(name, header);
    }
    removeHeader(name) {
        this.headers.delete(name);
    }
}
MdbTableSortDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTableSortDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MdbTableSortDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.7", type: MdbTableSortDirective, selector: "[mdbTableSort]", outputs: { sortChange: "sortChange" }, exportAs: ["mdbTableSort"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTableSortDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: '[mdbTableSort]',
                    exportAs: 'mdbTableSort',
                }]
        }], propDecorators: { sortChange: [{
                type: Output
            }] } });

// eslint-disable-next-line @angular-eslint/component-class-suffix
class MdbTableSortHeaderDirective {
    constructor(_sort) {
        this._sort = _sort;
        this.direction = 'none';
        this.cursor = 'pointer';
    }
    // eslint-disable-next-line @angular-eslint/no-input-rename
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = this._toCamelCase(value);
    }
    get rotate() {
        if (this.direction === 'none' || this.direction === 'asc') {
            return 'rotate(0deg)';
        }
        else {
            return 'rotate(180deg)';
        }
    }
    onClick() {
        this.direction = this._getSortingDirection();
        this._sort.sort(this);
    }
    _toCamelCase(str) {
        return str
            .replace(/\s(.)/g, (a) => {
            return a.toUpperCase();
        })
            .replace(/\s/g, '')
            .replace(/^(.)/, (b) => {
            return b.toLowerCase();
        });
    }
    _getSortingDirection() {
        if (this.direction === 'none') {
            return 'asc';
        }
        if (this.direction === 'asc') {
            return 'desc';
        }
        return 'none';
    }
    ngOnInit() {
        this._sort.addHeader(this.name, this);
    }
    ngOnDestroy() {
        this._sort.removeHeader(this.name);
    }
}
MdbTableSortHeaderDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTableSortHeaderDirective, deps: [{ token: forwardRef(() => MdbTableSortDirective) }], target: i0.ɵɵFactoryTarget.Component });
MdbTableSortHeaderDirective.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbTableSortHeaderDirective, selector: "[mdbTableSortHeader]", inputs: { name: ["mdbTableSortHeader", "name"] }, host: { listeners: { "click": "onClick()" }, properties: { "style.cursor": "this.cursor" } }, ngImport: i0, template: "<i\n  class=\"datatable-sort-icon fas fa-arrow-up\"\n  [style.transform]=\"rotate\"\n  [class.active]=\"direction === 'asc' || direction === 'desc'\"\n>\n</i>\n\n<ng-content></ng-content>\n" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTableSortHeaderDirective, decorators: [{
            type: Component,
            args: [{ selector: '[mdbTableSortHeader]', template: "<i\n  class=\"datatable-sort-icon fas fa-arrow-up\"\n  [style.transform]=\"rotate\"\n  [class.active]=\"direction === 'asc' || direction === 'desc'\"\n>\n</i>\n\n<ng-content></ng-content>\n" }]
        }], ctorParameters: function () {
        return [{ type: MdbTableSortDirective, decorators: [{
                        type: Inject,
                        args: [forwardRef(() => MdbTableSortDirective)]
                    }] }];
    }, propDecorators: { name: [{
                type: Input,
                args: ['mdbTableSortHeader']
            }], cursor: [{
                type: HostBinding,
                args: ['style.cursor']
            }], onClick: [{
                type: HostListener,
                args: ['click']
            }] } });

class MdbTablePaginationComponent {
    constructor() {
        this.rowsPerPageText = 'Rows per page';
        this._entries = 10;
        this._prevButtonDisabled = false;
        this._nextButtonDisabled = false;
        this._entriesOptions = [10, 25, 50, 200];
        this._total = 0;
        this._page = 0;
        this._isInitialized = false;
        this.firstVisibleItem = 1;
        this.lastVisibleItem = 0;
        this.activePageNumber = 1;
        this.paginationChange = new EventEmitter();
    }
    set entries(value) {
        this._entries = value;
        if (this._isInitialized) {
            this._updateEntriesOptions();
        }
    }
    get entries() {
        return this._entries;
    }
    set prevButtonDisabled(value) {
        this._prevButtonDisabled = coerceBooleanProperty(value);
    }
    get prevButtonDisabled() {
        return this._prevButtonDisabled;
    }
    set nextButtonDisabled(value) {
        this._nextButtonDisabled = coerceBooleanProperty(value);
    }
    get nextButtonDisabled() {
        return this._nextButtonDisabled;
    }
    set entriesOptions(value) {
        this._entriesOptions = value;
        if (this._isInitialized) {
            this._updateEntriesOptions();
        }
    }
    get entriesOptions() {
        return this._entriesOptions;
    }
    set total(value) {
        this._total = value;
    }
    get total() {
        return this._total;
    }
    set page(value) {
        this._page = value;
    }
    get page() {
        return this._page;
    }
    ngOnInit() {
        this._isInitialized = true;
        this._updateEntriesOptions();
    }
    getPaginationRangeText() {
        const startIndex = this.page * this.entries;
        const endIndex = Math.min(startIndex + this.entries, this.total);
        return `${this._total ? startIndex + 1 : 0} – ${endIndex} of ${this.total}`;
    }
    isPreviousPageDisabled() {
        return this.page === 0;
    }
    isNextPageDisabled() {
        const allPages = this._getNumberOfPages();
        return this.page === allPages - 1 || allPages === 0;
    }
    _getNumberOfPages() {
        return Math.ceil(this.total / this.entries);
    }
    nextPage() {
        if (this.isNextPageDisabled()) {
            return;
        }
        this.page++;
        this._emitPaginationChange();
    }
    previousPage() {
        if (this.isPreviousPageDisabled()) {
            return;
        }
        this.page--;
        this._emitPaginationChange();
    }
    updateRowPerPageNumber(entries) {
        const startIndex = this.page * this.entries;
        this.entries = entries;
        this.page = Math.floor(startIndex / entries) || 0;
        this._emitPaginationChange();
    }
    _emitPaginationChange() {
        this.paginationChange.emit({
            page: this.page,
            entries: this.entries,
            total: this.total,
        });
    }
    _updateEntriesOptions() {
        const entriesDefault = 10;
        const hasEntriesOptions = this.entriesOptions.length !== 0;
        const firstOption = hasEntriesOptions && this.entriesOptions[0];
        if (!this.entries) {
            this.entries = firstOption ? firstOption : entriesDefault;
        }
        if (!this.entriesOptions.includes(this.entries)) {
            this.entriesOptions.push(this.entries);
            this.entriesOptions.sort((a, b) => a - b);
        }
    }
}
MdbTablePaginationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTablePaginationComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MdbTablePaginationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbTablePaginationComponent, selector: "mdb-table-pagination", inputs: { entries: "entries", prevButtonDisabled: "prevButtonDisabled", nextButtonDisabled: "nextButtonDisabled", entriesOptions: "entriesOptions", total: "total", rowsPerPageText: "rowsPerPageText" }, outputs: { paginationChange: "paginationChange" }, exportAs: ["mdbPagination"], ngImport: i0, template: "<div class=\"datatable-pagination\">\n  <div class=\"datatable-select-wrapper\">\n    <p class=\"datatable-select-text\">{{ rowsPerPageText }}:</p>\n    <mdb-form-control>\n      <mdb-select [(ngModel)]=\"entries\" (selected)=\"updateRowPerPageNumber($event)\">\n        <mdb-option *ngFor=\"let entry of entriesOptions\" [value]=\"entry\">{{ entry }}</mdb-option>\n      </mdb-select>\n    </mdb-form-control>\n  </div>\n  <div class=\"datatable-pagination-nav\">{{ getPaginationRangeText() }}</div>\n\n  <div class=\"datatable-pagination-buttons\">\n    <button\n      type=\"button\"\n      class=\"btn btn-link datatable-pagination-button datatable-pagination-left\"\n      [ngClass]=\"{ disabled: isPreviousPageDisabled() || prevButtonDisabled }\"\n      (click)=\"previousPage()\"\n    >\n      <i class=\"fa fa-chevron-left\"></i>\n    </button>\n\n    <button\n      type=\"button\"\n      class=\"btn btn-link datatable-pagination-button datatable-pagination-right\"\n      [ngClass]=\"{ disabled: isNextPageDisabled() || nextButtonDisabled }\"\n      (click)=\"nextPage()\"\n    >\n      <i class=\"fa fa-chevron-right\"></i>\n    </button>\n  </div>\n</div>\n", components: [{ type: i1.MdbFormControlComponent, selector: "mdb-form-control" }, { type: i2.MdbSelectComponent, selector: "mdb-select", inputs: ["autoSelect", "clearButton", "clearButtonTabindex", "disabled", "dropdownClass", "displayedLabels", "highlightFirst", "multiple", "notFoundMsg", "outline", "optionsSelectedLabel", "placeholder", "tabindex", "required", "filter", "filterPlaceholder", "filterDebounce", "aria-label", "aria-labelledby", "visibleOptions", "optionHeight", "dropdownHeight", "value", "compareWith", "sortComparator"], outputs: ["valueChange", "opened", "closed", "selected", "deselected", "noOptionsFound"] }, { type: i3.MdbOptionComponent, selector: "mdb-option", inputs: ["value", "label", "disabled"], outputs: ["selectionChange"] }], directives: [{ type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i5.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTablePaginationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-table-pagination', exportAs: 'mdbPagination', template: "<div class=\"datatable-pagination\">\n  <div class=\"datatable-select-wrapper\">\n    <p class=\"datatable-select-text\">{{ rowsPerPageText }}:</p>\n    <mdb-form-control>\n      <mdb-select [(ngModel)]=\"entries\" (selected)=\"updateRowPerPageNumber($event)\">\n        <mdb-option *ngFor=\"let entry of entriesOptions\" [value]=\"entry\">{{ entry }}</mdb-option>\n      </mdb-select>\n    </mdb-form-control>\n  </div>\n  <div class=\"datatable-pagination-nav\">{{ getPaginationRangeText() }}</div>\n\n  <div class=\"datatable-pagination-buttons\">\n    <button\n      type=\"button\"\n      class=\"btn btn-link datatable-pagination-button datatable-pagination-left\"\n      [ngClass]=\"{ disabled: isPreviousPageDisabled() || prevButtonDisabled }\"\n      (click)=\"previousPage()\"\n    >\n      <i class=\"fa fa-chevron-left\"></i>\n    </button>\n\n    <button\n      type=\"button\"\n      class=\"btn btn-link datatable-pagination-button datatable-pagination-right\"\n      [ngClass]=\"{ disabled: isNextPageDisabled() || nextButtonDisabled }\"\n      (click)=\"nextPage()\"\n    >\n      <i class=\"fa fa-chevron-right\"></i>\n    </button>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { entries: [{
                type: Input
            }], prevButtonDisabled: [{
                type: Input
            }], nextButtonDisabled: [{
                type: Input
            }], entriesOptions: [{
                type: Input
            }], total: [{
                type: Input
            }], rowsPerPageText: [{
                type: Input
            }], paginationChange: [{
                type: Output
            }] } });

class MdbTableModule {
}
MdbTableModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbTableModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTableModule, declarations: [MdbTablePaginationComponent,
        MdbTableSortDirective,
        MdbTableSortHeaderDirective,
        MdbTableDirective], imports: [CommonModule, MdbSelectModule, MdbFormsModule, FormsModule], exports: [MdbTablePaginationComponent,
        MdbTableSortDirective,
        MdbTableSortHeaderDirective,
        MdbTableDirective] });
MdbTableModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTableModule, imports: [[CommonModule, MdbSelectModule, MdbFormsModule, FormsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTableModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, MdbSelectModule, MdbFormsModule, FormsModule],
                    declarations: [
                        MdbTablePaginationComponent,
                        MdbTableSortDirective,
                        MdbTableSortHeaderDirective,
                        MdbTableDirective,
                    ],
                    exports: [
                        MdbTablePaginationComponent,
                        MdbTableSortDirective,
                        MdbTableSortHeaderDirective,
                        MdbTableDirective,
                    ],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MdbTableDirective, MdbTableModule, MdbTablePaginationComponent, MdbTableSortDirective, MdbTableSortHeaderDirective };
//# sourceMappingURL=mdb-angular-ui-kit-table.mjs.map
