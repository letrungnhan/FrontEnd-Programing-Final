import { Component, forwardRef, HostBinding, HostListener, Inject, Input, } from '@angular/core';
import { MdbTableSortDirective } from './table-sort.directive';
import * as i0 from "@angular/core";
import * as i1 from "./table-sort.directive";
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class MdbTableSortHeaderDirective {
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
        }], ctorParameters: function () { return [{ type: i1.MdbTableSortDirective, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => MdbTableSortDirective)]
                }] }]; }, propDecorators: { name: [{
                type: Input,
                args: ['mdbTableSortHeader']
            }], cursor: [{
                type: HostBinding,
                args: ['style.cursor']
            }], onClick: [{
                type: HostListener,
                args: ['click']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtc29ydC1oZWFkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L3RhYmxlL3RhYmxlLXNvcnQtaGVhZGVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC90YWJsZS90YWJsZS1zb3J0LWhlYWRlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixXQUFXLEVBQ1gsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEdBR04sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLHFCQUFxQixFQUFvQixNQUFNLHdCQUF3QixDQUFDOzs7QUFPakYsa0VBQWtFO0FBQ2xFLE1BQU0sT0FBTywyQkFBMkI7SUE4QnRDLFlBQzJELEtBQTRCO1FBQTVCLFVBQUssR0FBTCxLQUFLLENBQXVCO1FBcEJ2RixjQUFTLEdBQXFCLE1BQU0sQ0FBQztRQVVSLFdBQU0sR0FBRyxTQUFTLENBQUM7SUFXN0MsQ0FBQztJQS9CSiwyREFBMkQ7SUFDM0QsSUFDSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFDRCxJQUFJLElBQUksQ0FBQyxLQUFhO1FBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBS0QsSUFBSSxNQUFNO1FBQ1IsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLEtBQUssRUFBRTtZQUN6RCxPQUFPLGNBQWMsQ0FBQztTQUN2QjthQUFNO1lBQ0wsT0FBTyxnQkFBZ0IsQ0FBQztTQUN6QjtJQUNILENBQUM7SUFLRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUU3QyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBTU8sWUFBWSxDQUFDLEdBQVc7UUFDOUIsT0FBTyxHQUFHO2FBQ1AsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3ZCLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3pCLENBQUMsQ0FBQzthQUNELE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO2FBQ2xCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNyQixPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyxvQkFBb0I7UUFDMUIsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLE1BQU0sRUFBRTtZQUM3QixPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLEtBQUssRUFBRTtZQUM1QixPQUFPLE1BQU0sQ0FBQztTQUNmO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7O3dIQS9EVSwyQkFBMkIsa0JBK0I1QixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMscUJBQXFCLENBQUM7NEdBL0J0QywyQkFBMkIsNE1DbEJ4QywrTEFRQTsyRkRVYSwyQkFBMkI7a0JBTnZDLFNBQVM7K0JBRUUsc0JBQXNCOzswQkFtQzdCLE1BQU07MkJBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHFCQUFxQixDQUFDOzRDQTVCN0MsSUFBSTtzQkFEUCxLQUFLO3VCQUFDLG9CQUFvQjtnQkFtQkUsTUFBTTtzQkFBbEMsV0FBVzt1QkFBQyxjQUFjO2dCQUczQixPQUFPO3NCQUROLFlBQVk7dUJBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgZm9yd2FyZFJlZixcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWRiVGFibGVTb3J0RGlyZWN0aXZlLCBNZGJTb3J0RGlyZWN0aW9uIH0gZnJvbSAnLi90YWJsZS1zb3J0LmRpcmVjdGl2ZSc7XG5cbkBDb21wb25lbnQoe1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L2NvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ1ttZGJUYWJsZVNvcnRIZWFkZXJdJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RhYmxlLXNvcnQtaGVhZGVyLmNvbXBvbmVudC5odG1sJyxcbn0pXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L2NvbXBvbmVudC1jbGFzcy1zdWZmaXhcbmV4cG9ydCBjbGFzcyBNZGJUYWJsZVNvcnRIZWFkZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgnbWRiVGFibGVTb3J0SGVhZGVyJylcbiAgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgfVxuICBzZXQgbmFtZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fbmFtZSA9IHRoaXMuX3RvQ2FtZWxDYXNlKHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9uYW1lOiBzdHJpbmc7XG5cbiAgZGlyZWN0aW9uOiBNZGJTb3J0RGlyZWN0aW9uID0gJ25vbmUnO1xuXG4gIGdldCByb3RhdGUoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT09ICdub25lJyB8fCB0aGlzLmRpcmVjdGlvbiA9PT0gJ2FzYycpIHtcbiAgICAgIHJldHVybiAncm90YXRlKDBkZWcpJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICdyb3RhdGUoMTgwZGVnKSc7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5jdXJzb3InKSBjdXJzb3IgPSAncG9pbnRlcic7XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCk6IHZvaWQge1xuICAgIHRoaXMuZGlyZWN0aW9uID0gdGhpcy5fZ2V0U29ydGluZ0RpcmVjdGlvbigpO1xuXG4gICAgdGhpcy5fc29ydC5zb3J0KHRoaXMpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IE1kYlRhYmxlU29ydERpcmVjdGl2ZSkpIHByaXZhdGUgX3NvcnQ6IE1kYlRhYmxlU29ydERpcmVjdGl2ZVxuICApIHt9XG5cbiAgcHJpdmF0ZSBfdG9DYW1lbENhc2Uoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBzdHJcbiAgICAgIC5yZXBsYWNlKC9cXHMoLikvZywgKGEpID0+IHtcbiAgICAgICAgcmV0dXJuIGEudG9VcHBlckNhc2UoKTtcbiAgICAgIH0pXG4gICAgICAucmVwbGFjZSgvXFxzL2csICcnKVxuICAgICAgLnJlcGxhY2UoL14oLikvLCAoYikgPT4ge1xuICAgICAgICByZXR1cm4gYi50b0xvd2VyQ2FzZSgpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRTb3J0aW5nRGlyZWN0aW9uKCk6IE1kYlNvcnREaXJlY3Rpb24ge1xuICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gJ25vbmUnKSB7XG4gICAgICByZXR1cm4gJ2FzYyc7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZGlyZWN0aW9uID09PSAnYXNjJykge1xuICAgICAgcmV0dXJuICdkZXNjJztcbiAgICB9XG5cbiAgICByZXR1cm4gJ25vbmUnO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fc29ydC5hZGRIZWFkZXIodGhpcy5uYW1lLCB0aGlzKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3NvcnQucmVtb3ZlSGVhZGVyKHRoaXMubmFtZSk7XG4gIH1cbn1cbiIsIjxpXG4gIGNsYXNzPVwiZGF0YXRhYmxlLXNvcnQtaWNvbiBmYXMgZmEtYXJyb3ctdXBcIlxuICBbc3R5bGUudHJhbnNmb3JtXT1cInJvdGF0ZVwiXG4gIFtjbGFzcy5hY3RpdmVdPVwiZGlyZWN0aW9uID09PSAnYXNjJyB8fCBkaXJlY3Rpb24gPT09ICdkZXNjJ1wiXG4+XG48L2k+XG5cbjxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiJdfQ==