import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, HostBinding, Input, } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class MdbTableDirective {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L3RhYmxlL3RhYmxlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWdCLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUUsT0FBTyxFQUdMLFNBQVMsRUFFVCxXQUFXLEVBQ1gsS0FBSyxHQUlOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFVM0Msa0VBQWtFO0FBQ2xFLE1BQU0sT0FBTyxpQkFBaUI7SUF3RjVCLFlBQ1UsRUFBYyxFQUNkLFFBQW1CLEVBQ25CLE1BQXlCO1FBRnpCLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBVDNCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBRXBCLGFBQVEsR0FBNkMsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQVUzRSxnQkFBVyxHQUFlLEVBQUUsQ0FBQztRQUM3QixrQkFBYSxHQUFRLEVBQUUsQ0FBQztRQUN4Qix1QkFBa0IsR0FBaUIsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQUN0RCxnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUloQixjQUFTLEdBQWtCLElBQUksT0FBTyxFQUFRLENBQUM7UUErSGhELFlBQU8sR0FBRyxDQUFDLENBQWtCLEVBQUUsQ0FBa0IsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxD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O3NCQURiLEtBQUs7Z0JBZUYsV0FBVztzQkFEZCxLQUFLO2dCQVNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBSZW5kZXJlcjIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTWRiVGFibGVQYWdpbmF0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS1wYWdpbmF0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZGJUYWJsZVNvcnREaXJlY3RpdmUgfSBmcm9tICcuL3RhYmxlLXNvcnQuZGlyZWN0aXZlJztcblxuQENvbXBvbmVudCh7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvY29tcG9uZW50LXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnW21kYlRhYmxlXScsXG4gIGV4cG9ydEFzOiAnbWRiVGFibGUnLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxufSlcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvY29tcG9uZW50LWNsYXNzLXN1ZmZpeFxuZXhwb3J0IGNsYXNzIE1kYlRhYmxlRGlyZWN0aXZlPFQ+IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRhYmxlLXN0cmlwZWQnKVxuICBnZXQgc3RyaXBlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc3RyaXBlZDtcbiAgfVxuICBzZXQgc3RyaXBlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3N0cmlwZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX3N0cmlwZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50YWJsZS1ib3JkZXJlZCcpXG4gIGdldCBib3JkZXJlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fYm9yZGVyZWQ7XG4gIH1cbiAgc2V0IGJvcmRlcmVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fYm9yZGVyZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2JvcmRlcmVkOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGFibGUtYm9yZGVybGVzcycpXG4gIGdldCBib3JkZXJsZXNzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9ib3JkZXJsZXNzO1xuICB9XG4gIHNldCBib3JkZXJsZXNzKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fYm9yZGVybGVzcyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfYm9yZGVybGVzczogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRhYmxlLWhvdmVyJylcbiAgZ2V0IGhvdmVyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9ob3ZlcjtcbiAgfVxuICBzZXQgaG92ZXIodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9ob3ZlciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfaG92ZXI6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50YWJsZS1zbScpXG4gIGdldCBzbSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc207XG4gIH1cbiAgc2V0IHNtKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc20gPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX3NtOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIEBIb3N0QmluZGluZygnY2xhc3MudGFibGUtcmVzcG9uc2l2ZScpXG4gIGdldCByZXNwb25zaXZlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9yZXNwb25zaXZlO1xuICB9XG4gIHNldCByZXNwb25zaXZlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmVzcG9uc2l2ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfcmVzcG9uc2l2ZTogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBnZXQgZGF0YVNvdXJjZSgpOiBUW10gfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZTtcbiAgfVxuICBzZXQgZGF0YVNvdXJjZShuZXdEYXRhOiBUW10gfCBudWxsKSB7XG4gICAgaWYgKG5ld0RhdGEpIHtcbiAgICAgIHRoaXMuX2RhdGFTb3VyY2UgPSBuZXdEYXRhO1xuXG4gICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5fdXBkYXRlRGF0YSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KClcbiAgZ2V0IGZpeGVkSGVhZGVyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9maXhlZEhlYWRlcjtcbiAgfVxuICBzZXQgZml4ZWRIZWFkZXIodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9maXhlZEhlYWRlciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfZml4ZWRIZWFkZXIgPSBmYWxzZTtcblxuICBASW5wdXQoKSBmaWx0ZXJGbjogKGRhdGE6IFQsIHNlYXJjaFRlcm06IHN0cmluZykgPT4gYm9vbGVhbiA9IHRoaXMuZGVmYXVsdEZpbHRlckZuO1xuICBASW5wdXQoKSBwYWdpbmF0aW9uOiBNZGJUYWJsZVBhZ2luYXRpb25Db21wb25lbnQ7XG4gIEBJbnB1dCgpIHNvcnQ6IE1kYlRhYmxlU29ydERpcmVjdGl2ZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIF9jZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7fVxuXG4gIHByaXZhdGUgX2RhdGFTb3VyY2U6IFRbXSB8IG51bGwgPSBbXTtcbiAgcHJpdmF0ZSBfZmlsdGVyZWREYXRhOiBhbnkgPSBbXTtcbiAgcHJpdmF0ZSBfZGF0YVNvdXJjZUNoYW5nZWQ6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgcHJpdmF0ZSBfc2VhcmNoVGV4dCA9ICcnO1xuXG4gIHB1YmxpYyBkYXRhOiBUW107XG5cbiAgcmVhZG9ubHkgX2Rlc3Ryb3kkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBhZGRSb3cobmV3Um93OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9kYXRhU291cmNlLnB1c2gobmV3Um93KTtcbiAgfVxuXG4gIGFkZFJvd0FmdGVyKGluZGV4OiBudW1iZXIsIHJvdzogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fZGF0YVNvdXJjZS5zcGxpY2UoaW5kZXgsIDAsIHJvdyk7XG4gIH1cblxuICByZW1vdmVSb3coaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX2RhdGFTb3VyY2Uuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxuXG4gIHJvd1JlbW92ZWQoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPGJvb2xlYW4+KChvYnNlcnZlcjogYW55KSA9PiB7XG4gICAgICBvYnNlcnZlci5uZXh0KHRydWUpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlTGFzdFJvdygpOiB2b2lkIHtcbiAgICB0aGlzLl9kYXRhU291cmNlLnBvcCgpO1xuICB9XG5cbiAgZGF0YVNvdXJjZUNoYW5nZSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlQ2hhbmdlZDtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndGFibGUnKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wYWdpbmF0aW9uKSB7XG4gICAgICB0aGlzLnBhZ2luYXRpb24ucGFnaW5hdGlvbkNoYW5nZS5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95JCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZURhdGEoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNvcnQpIHtcbiAgICAgIHRoaXMuc29ydC5zb3J0Q2hhbmdlLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5fdXBkYXRlRGF0YSgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZml4ZWRIZWFkZXIpIHtcbiAgICAgIGNvbnN0IHRhYmxlSGVhZCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCd0aGVhZCcpO1xuICAgICAgQXJyYXkuZnJvbSh0YWJsZUhlYWQuZmlyc3RFbGVtZW50Q2hpbGQuY2hpbGRyZW4pLmZvckVhY2goKGNoaWxkOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhjaGlsZCwgJ2ZpeGVkLWNlbGwnKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX2Rlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLl9kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgc2VhcmNoKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9zZWFyY2hUZXh0ID0gdmFsdWU7XG4gICAgdGhpcy5fdXBkYXRlRGF0YSgpO1xuICB9XG5cbiAgX3VwZGF0ZURhdGEoKTogdm9pZCB7XG4gICAgbGV0IHVwZGF0ZWREYXRhOiBUW10gPSBbXTtcblxuICAgIHVwZGF0ZWREYXRhID0gdGhpcy5fZmlsdGVyRGF0YSh0aGlzLmRhdGFTb3VyY2UpO1xuXG4gICAgaWYgKHRoaXMuc29ydCAmJiB0aGlzLnNvcnQuYWN0aXZlKSB7XG4gICAgICB1cGRhdGVkRGF0YSA9IHRoaXMuX3NvcnREYXRhKHVwZGF0ZWREYXRhLnNsaWNlKCkpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBhZ2luYXRpb24pIHtcbiAgICAgIHVwZGF0ZWREYXRhID0gdGhpcy5fcGFnaW5hdGVEYXRhKHVwZGF0ZWREYXRhKTtcbiAgICB9XG5cbiAgICB0aGlzLmRhdGEgPSB1cGRhdGVkRGF0YTtcblxuICAgIHRoaXMuX2NkUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZmlsdGVyRGF0YShkYXRhOiBUW10pOiBUW10ge1xuICAgIGlmICh0aGlzLl9zZWFyY2hUZXh0ID09PSBudWxsIHx8IHRoaXMuX3NlYXJjaFRleHQgPT09ICcnKSB7XG4gICAgICB0aGlzLl9maWx0ZXJlZERhdGEgPSBkYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9maWx0ZXJlZERhdGEgPSBkYXRhLmZpbHRlcigob2JqOiBUKSA9PiB0aGlzLmZpbHRlckZuKG9iaiwgdGhpcy5fc2VhcmNoVGV4dCkpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnBhZ2luYXRpb24pIHtcbiAgICAgIHRoaXMucGFnaW5hdGlvbi50b3RhbCA9IHRoaXMuX2ZpbHRlcmVkRGF0YS5sZW5ndGg7XG5cbiAgICAgIGNvbnN0IGN1cnJlbnRQYWdlID0gdGhpcy5wYWdpbmF0aW9uLnBhZ2U7XG5cbiAgICAgIGlmIChjdXJyZW50UGFnZSA+IDApIHtcbiAgICAgICAgY29uc3QgbGFzdFBhZ2UgPSBNYXRoLmNlaWwodGhpcy5wYWdpbmF0aW9uLnRvdGFsIC8gdGhpcy5wYWdpbmF0aW9uLmVudHJpZXMpIC0gMSB8fCAwO1xuXG4gICAgICAgIGlmIChjdXJyZW50UGFnZSA+IGxhc3RQYWdlKSB7XG4gICAgICAgICAgdGhpcy5wYWdpbmF0aW9uLnBhZ2UgPSBsYXN0UGFnZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9maWx0ZXJlZERhdGE7XG4gIH1cblxuICBkZWZhdWx0RmlsdGVyRm4oZGF0YTogVCwgc2VhcmNoVGVybTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGRhdGEpLnNvbWUoKGtleTogYW55KSA9PiB7XG4gICAgICBpZiAoZGF0YVtrZXldKSB7XG4gICAgICAgIHJldHVybiBkYXRhW2tleV0udG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9zb3J0RGF0YShkYXRhOiBUW10pOiBUW10ge1xuICAgIGNvbnN0IG5hbWUgPSB0aGlzLnNvcnQuYWN0aXZlLm5hbWU7XG4gICAgY29uc3QgZGlyZWN0aW9uID0gdGhpcy5zb3J0LmFjdGl2ZS5kaXJlY3Rpb247XG5cbiAgICBpZiAoZGlyZWN0aW9uICE9PSAnbm9uZScpIHtcbiAgICAgIHJldHVybiBkYXRhLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5fc29ydEZuKGFbbmFtZV0sIGJbbmFtZV0pO1xuICAgICAgICByZXR1cm4gZGlyZWN0aW9uID09PSAnYXNjJyA/IHJlc3VsdCA6IC1yZXN1bHQ7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc29ydEZuID0gKGE6IHN0cmluZyB8IG51bWJlciwgYjogc3RyaW5nIHwgbnVtYmVyKSA9PiAoYSA8IGIgPyAtMSA6IGEgPiBiID8gMSA6IDApO1xuXG4gIHByaXZhdGUgX3BhZ2luYXRlRGF0YShkYXRhOiBUW10pOiBUW10ge1xuICAgIGNvbnN0IHN0YXJ0SW5kZXggPSB0aGlzLnBhZ2luYXRpb24ucGFnZSAqIHRoaXMucGFnaW5hdGlvbi5lbnRyaWVzO1xuICAgIGNvbnN0IGVuZEluZGV4ID0gc3RhcnRJbmRleCArIHRoaXMucGFnaW5hdGlvbi5lbnRyaWVzO1xuXG4gICAgcmV0dXJuIGRhdGEuc2xpY2Uoc3RhcnRJbmRleCwgZW5kSW5kZXgpO1xuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3N0cmlwZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2JvcmRlcmVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9ib3JkZXJsZXNzOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9ob3ZlcjogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc206IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3Jlc3BvbnNpdmU6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2ZpeGVkSGVhZGVyOiBCb29sZWFuSW5wdXQ7XG59XG4iXX0=