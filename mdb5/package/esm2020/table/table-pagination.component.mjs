import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "mdb-angular-ui-kit/forms";
import * as i2 from "mdb-angular-ui-kit/select";
import * as i3 from "mdb-angular-ui-kit/option";
import * as i4 from "@angular/forms";
import * as i5 from "@angular/common";
export class MdbTablePaginationComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtcGFnaW5hdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvdGFibGUvdGFibGUtcGFnaW5hdGlvbi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvdGFibGUvdGFibGUtcGFnaW5hdGlvbi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWdCLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQzs7Ozs7OztBQWEvRSxNQUFNLE9BQU8sMkJBQTJCO0lBcUV0QztRQXhCUyxvQkFBZSxHQUFHLGVBQWUsQ0FBQztRQVNuQyxhQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2Qsd0JBQW1CLEdBQUcsS0FBSyxDQUFDO1FBQzVCLHdCQUFtQixHQUFHLEtBQUssQ0FBQztRQUM1QixvQkFBZSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDcEMsV0FBTSxHQUFHLENBQUMsQ0FBQztRQUNYLFVBQUssR0FBRyxDQUFDLENBQUM7UUFFVixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUV4QixxQkFBZ0IsR0FBRyxDQUFDLENBQUM7UUFDckIsb0JBQWUsR0FBRyxDQUFDLENBQUM7UUFDcEIscUJBQWdCLEdBQUcsQ0FBQyxDQUFDO1FBRWxCLHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUF1QixDQUFDO0lBRXRELENBQUM7SUFwRWhCLElBQ0ksT0FBTyxDQUFDLEtBQWE7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFFdEIsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3ZCLElB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QUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQzNDO0lBQ0gsQ0FBQzs7d0hBaEpVLDJCQUEyQjs0R0FBM0IsMkJBQTJCLHNWQ2R4QyxvcENBK0JBOzJGRGpCYSwyQkFBMkI7a0JBTHZDLFNBQVM7K0JBQ0Usc0JBQXNCLFlBRXRCLGVBQWU7MEVBSXJCLE9BQU87c0JBRFYsS0FBSztnQkFZRixrQkFBa0I7c0JBRHJCLEtBQUs7Z0JBUUYsa0JBQWtCO3NCQURyQixLQUFLO2dCQVFGLGNBQWM7c0JBRGpCLEtBQUs7Z0JBWUYsS0FBSztzQkFEUixLQUFLO2dCQVFHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBc0JJLGdCQUFnQjtzQkFBekIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IENvbXBvbmVudCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBNZGJQYWdpbmF0aW9uQ2hhbmdlIHtcbiAgcGFnZTogbnVtYmVyO1xuICBlbnRyaWVzOiBudW1iZXI7XG4gIHRvdGFsOiBudW1iZXI7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21kYi10YWJsZS1wYWdpbmF0aW9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RhYmxlLXBhZ2luYXRpb24uY29tcG9uZW50Lmh0bWwnLFxuICBleHBvcnRBczogJ21kYlBhZ2luYXRpb24nLFxufSlcbmV4cG9ydCBjbGFzcyBNZGJUYWJsZVBhZ2luYXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKVxuICBzZXQgZW50cmllcyh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fZW50cmllcyA9IHZhbHVlO1xuXG4gICAgaWYgKHRoaXMuX2lzSW5pdGlhbGl6ZWQpIHtcbiAgICAgIHRoaXMuX3VwZGF0ZUVudHJpZXNPcHRpb25zKCk7XG4gICAgfVxuICB9XG4gIGdldCBlbnRyaWVzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2VudHJpZXM7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IHByZXZCdXR0b25EaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3ByZXZCdXR0b25EaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgZ2V0IHByZXZCdXR0b25EaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fcHJldkJ1dHRvbkRpc2FibGVkO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBuZXh0QnV0dG9uRGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9uZXh0QnV0dG9uRGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIGdldCBuZXh0QnV0dG9uRGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX25leHRCdXR0b25EaXNhYmxlZDtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgZW50cmllc09wdGlvbnModmFsdWU6IG51bWJlcltdKSB7XG4gICAgdGhpcy5fZW50cmllc09wdGlvbnMgPSB2YWx1ZTtcblxuICAgIGlmICh0aGlzLl9pc0luaXRpYWxpemVkKSB7XG4gICAgICB0aGlzLl91cGRhdGVFbnRyaWVzT3B0aW9ucygpO1xuICAgIH1cbiAgfVxuICBnZXQgZW50cmllc09wdGlvbnMoKTogbnVtYmVyW10ge1xuICAgIHJldHVybiB0aGlzLl9lbnRyaWVzT3B0aW9ucztcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgdG90YWwodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX3RvdGFsID0gdmFsdWU7XG4gIH1cbiAgZ2V0IHRvdGFsKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3RvdGFsO1xuICB9XG5cbiAgQElucHV0KCkgcm93c1BlclBhZ2VUZXh0ID0gJ1Jvd3MgcGVyIHBhZ2UnO1xuXG4gIHNldCBwYWdlKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9wYWdlID0gdmFsdWU7XG4gIH1cbiAgZ2V0IHBhZ2UoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fcGFnZTtcbiAgfVxuXG4gIHByaXZhdGUgX2VudHJpZXMgPSAxMDtcbiAgcHJpdmF0ZSBfcHJldkJ1dHRvbkRpc2FibGVkID0gZmFsc2U7XG4gIHByaXZhdGUgX25leHRCdXR0b25EaXNhYmxlZCA9IGZhbHNlO1xuICBwcml2YXRlIF9lbnRyaWVzT3B0aW9ucyA9IFsxMCwgMjUsIDUwLCAyMDBdO1xuICBwcml2YXRlIF90b3RhbCA9IDA7XG4gIHByaXZhdGUgX3BhZ2UgPSAwO1xuXG4gIHByaXZhdGUgX2lzSW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICBwdWJsaWMgZmlyc3RWaXNpYmxlSXRlbSA9IDE7XG4gIHB1YmxpYyBsYXN0VmlzaWJsZUl0ZW0gPSAwO1xuICBwdWJsaWMgYWN0aXZlUGFnZU51bWJlciA9IDE7XG5cbiAgQE91dHB1dCgpIHBhZ2luYXRpb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE1kYlBhZ2luYXRpb25DaGFuZ2U+KCk7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX2lzSW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIHRoaXMuX3VwZGF0ZUVudHJpZXNPcHRpb25zKCk7XG4gIH1cblxuICBnZXRQYWdpbmF0aW9uUmFuZ2VUZXh0KCk6IHN0cmluZyB7XG4gICAgY29uc3Qgc3RhcnRJbmRleCA9IHRoaXMucGFnZSAqIHRoaXMuZW50cmllcztcbiAgICBjb25zdCBlbmRJbmRleCA9IE1hdGgubWluKHN0YXJ0SW5kZXggKyB0aGlzLmVudHJpZXMsIHRoaXMudG90YWwpO1xuXG4gICAgcmV0dXJuIGAke3RoaXMuX3RvdGFsID8gc3RhcnRJbmRleCArIDEgOiAwfSDigJMgJHtlbmRJbmRleH0gb2YgJHt0aGlzLnRvdGFsfWA7XG4gIH1cblxuICBpc1ByZXZpb3VzUGFnZURpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnBhZ2UgPT09IDA7XG4gIH1cblxuICBpc05leHRQYWdlRGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgYWxsUGFnZXMgPSB0aGlzLl9nZXROdW1iZXJPZlBhZ2VzKCk7XG5cbiAgICByZXR1cm4gdGhpcy5wYWdlID09PSBhbGxQYWdlcyAtIDEgfHwgYWxsUGFnZXMgPT09IDA7XG4gIH1cblxuICBwcml2YXRlIF9nZXROdW1iZXJPZlBhZ2VzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGguY2VpbCh0aGlzLnRvdGFsIC8gdGhpcy5lbnRyaWVzKTtcbiAgfVxuXG4gIG5leHRQYWdlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzTmV4dFBhZ2VEaXNhYmxlZCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5wYWdlKys7XG4gICAgdGhpcy5fZW1pdFBhZ2luYXRpb25DaGFuZ2UoKTtcbiAgfVxuXG4gIHByZXZpb3VzUGFnZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc1ByZXZpb3VzUGFnZURpc2FibGVkKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnBhZ2UtLTtcbiAgICB0aGlzLl9lbWl0UGFnaW5hdGlvbkNoYW5nZSgpO1xuICB9XG5cbiAgdXBkYXRlUm93UGVyUGFnZU51bWJlcihlbnRyaWVzOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBzdGFydEluZGV4ID0gdGhpcy5wYWdlICogdGhpcy5lbnRyaWVzO1xuICAgIHRoaXMuZW50cmllcyA9IGVudHJpZXM7XG4gICAgdGhpcy5wYWdlID0gTWF0aC5mbG9vcihzdGFydEluZGV4IC8gZW50cmllcykgfHwgMDtcblxuICAgIHRoaXMuX2VtaXRQYWdpbmF0aW9uQ2hhbmdlKCk7XG4gIH1cblxuICBwcml2YXRlIF9lbWl0UGFnaW5hdGlvbkNoYW5nZSgpOiB2b2lkIHtcbiAgICB0aGlzLnBhZ2luYXRpb25DaGFuZ2UuZW1pdCh7XG4gICAgICBwYWdlOiB0aGlzLnBhZ2UsXG4gICAgICBlbnRyaWVzOiB0aGlzLmVudHJpZXMsXG4gICAgICB0b3RhbDogdGhpcy50b3RhbCxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUVudHJpZXNPcHRpb25zKCk6IHZvaWQge1xuICAgIGNvbnN0IGVudHJpZXNEZWZhdWx0ID0gMTA7XG4gICAgY29uc3QgaGFzRW50cmllc09wdGlvbnMgPSB0aGlzLmVudHJpZXNPcHRpb25zLmxlbmd0aCAhPT0gMDtcbiAgICBjb25zdCBmaXJzdE9wdGlvbiA9IGhhc0VudHJpZXNPcHRpb25zICYmIHRoaXMuZW50cmllc09wdGlvbnNbMF07XG5cbiAgICBpZiAoIXRoaXMuZW50cmllcykge1xuICAgICAgdGhpcy5lbnRyaWVzID0gZmlyc3RPcHRpb24gPyBmaXJzdE9wdGlvbiA6IGVudHJpZXNEZWZhdWx0O1xuICAgIH1cblxuICAgIGlmICghdGhpcy5lbnRyaWVzT3B0aW9ucy5pbmNsdWRlcyh0aGlzLmVudHJpZXMpKSB7XG4gICAgICB0aGlzLmVudHJpZXNPcHRpb25zLnB1c2godGhpcy5lbnRyaWVzKTtcbiAgICAgIHRoaXMuZW50cmllc09wdGlvbnMuc29ydCgoYSwgYikgPT4gYSAtIGIpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9wcmV2QnV0dG9uRGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX25leHRCdXR0b25EaXNhYmxlZDogQm9vbGVhbklucHV0O1xufVxuIiwiPGRpdiBjbGFzcz1cImRhdGF0YWJsZS1wYWdpbmF0aW9uXCI+XG4gIDxkaXYgY2xhc3M9XCJkYXRhdGFibGUtc2VsZWN0LXdyYXBwZXJcIj5cbiAgICA8cCBjbGFzcz1cImRhdGF0YWJsZS1zZWxlY3QtdGV4dFwiPnt7IHJvd3NQZXJQYWdlVGV4dCB9fTo8L3A+XG4gICAgPG1kYi1mb3JtLWNvbnRyb2w+XG4gICAgICA8bWRiLXNlbGVjdCBbKG5nTW9kZWwpXT1cImVudHJpZXNcIiAoc2VsZWN0ZWQpPVwidXBkYXRlUm93UGVyUGFnZU51bWJlcigkZXZlbnQpXCI+XG4gICAgICAgIDxtZGItb3B0aW9uICpuZ0Zvcj1cImxldCBlbnRyeSBvZiBlbnRyaWVzT3B0aW9uc1wiIFt2YWx1ZV09XCJlbnRyeVwiPnt7IGVudHJ5IH19PC9tZGItb3B0aW9uPlxuICAgICAgPC9tZGItc2VsZWN0PlxuICAgIDwvbWRiLWZvcm0tY29udHJvbD5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJkYXRhdGFibGUtcGFnaW5hdGlvbi1uYXZcIj57eyBnZXRQYWdpbmF0aW9uUmFuZ2VUZXh0KCkgfX08L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwiZGF0YXRhYmxlLXBhZ2luYXRpb24tYnV0dG9uc1wiPlxuICAgIDxidXR0b25cbiAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgY2xhc3M9XCJidG4gYnRuLWxpbmsgZGF0YXRhYmxlLXBhZ2luYXRpb24tYnV0dG9uIGRhdGF0YWJsZS1wYWdpbmF0aW9uLWxlZnRcIlxuICAgICAgW25nQ2xhc3NdPVwieyBkaXNhYmxlZDogaXNQcmV2aW91c1BhZ2VEaXNhYmxlZCgpIHx8IHByZXZCdXR0b25EaXNhYmxlZCB9XCJcbiAgICAgIChjbGljayk9XCJwcmV2aW91c1BhZ2UoKVwiXG4gICAgPlxuICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jaGV2cm9uLWxlZnRcIj48L2k+XG4gICAgPC9idXR0b24+XG5cbiAgICA8YnV0dG9uXG4gICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgIGNsYXNzPVwiYnRuIGJ0bi1saW5rIGRhdGF0YWJsZS1wYWdpbmF0aW9uLWJ1dHRvbiBkYXRhdGFibGUtcGFnaW5hdGlvbi1yaWdodFwiXG4gICAgICBbbmdDbGFzc109XCJ7IGRpc2FibGVkOiBpc05leHRQYWdlRGlzYWJsZWQoKSB8fCBuZXh0QnV0dG9uRGlzYWJsZWQgfVwiXG4gICAgICAoY2xpY2spPVwibmV4dFBhZ2UoKVwiXG4gICAgPlxuICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jaGV2cm9uLXJpZ2h0XCI+PC9pPlxuICAgIDwvYnV0dG9uPlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19