import { Directive, EventEmitter, Output } from '@angular/core';
import * as i0 from "@angular/core";
export class MdbTableSortDirective {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtc29ydC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvdGFibGUvdGFibGUtc29ydC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQWVoRSxNQUFNLE9BQU8scUJBQXFCO0lBTGxDO1FBTUUsWUFBTyxHQUFHLElBQUksR0FBRyxFQUF1QyxDQUFDO1FBSS9DLGVBQVUsR0FBZ0MsSUFBSSxZQUFZLEVBQWlCLENBQUM7S0FxQnZGO0lBbkJDLElBQUksQ0FBQyxNQUFtQztRQUN0QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUVyQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFO1lBQ2xDLElBQUksVUFBVSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsSUFBSSxFQUFFO2dCQUNuQyxVQUFVLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQzthQUMvQjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVELFNBQVMsQ0FBQyxJQUFZLEVBQUUsTUFBbUM7UUFDekQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxZQUFZLENBQUMsSUFBWTtRQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDOztrSEF6QlUscUJBQXFCO3NHQUFyQixxQkFBcUI7MkZBQXJCLHFCQUFxQjtrQkFMakMsU0FBUzttQkFBQztvQkFDVCw4REFBOEQ7b0JBQzlELFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRSxjQUFjO2lCQUN6Qjs4QkFNVyxVQUFVO3NCQUFuQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWRiVGFibGVTb3J0SGVhZGVyRGlyZWN0aXZlIH0gZnJvbSAnLi90YWJsZS1zb3J0LWhlYWRlci5jb21wb25lbnQnO1xuXG5leHBvcnQgdHlwZSBNZGJTb3J0RGlyZWN0aW9uID0gJ2FzYycgfCAnZGVzYycgfCAnbm9uZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWRiU29ydENoYW5nZSB7XG4gIG5hbWU6IHN0cmluZztcbiAgZGlyZWN0aW9uOiBNZGJTb3J0RGlyZWN0aW9uO1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9kaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdbbWRiVGFibGVTb3J0XScsXG4gIGV4cG9ydEFzOiAnbWRiVGFibGVTb3J0Jyxcbn0pXG5leHBvcnQgY2xhc3MgTWRiVGFibGVTb3J0RGlyZWN0aXZlIHtcbiAgaGVhZGVycyA9IG5ldyBNYXA8c3RyaW5nLCBNZGJUYWJsZVNvcnRIZWFkZXJEaXJlY3RpdmU+KCk7XG5cbiAgYWN0aXZlOiBNZGJUYWJsZVNvcnRIZWFkZXJEaXJlY3RpdmU7XG5cbiAgQE91dHB1dCgpIHNvcnRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxNZGJTb3J0Q2hhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TWRiU29ydENoYW5nZT4oKTtcblxuICBzb3J0KGhlYWRlcjogTWRiVGFibGVTb3J0SGVhZGVyRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmUgPSBoZWFkZXI7XG5cbiAgICB0aGlzLmhlYWRlcnMuZm9yRWFjaCgoc29ydEhlYWRlcikgPT4ge1xuICAgICAgaWYgKHNvcnRIZWFkZXIubmFtZSAhPT0gaGVhZGVyLm5hbWUpIHtcbiAgICAgICAgc29ydEhlYWRlci5kaXJlY3Rpb24gPSAnbm9uZSc7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLnNvcnRDaGFuZ2UuZW1pdCh7IG5hbWU6IGhlYWRlci5uYW1lLCBkaXJlY3Rpb246IGhlYWRlci5kaXJlY3Rpb24gfSk7XG4gIH1cblxuICBhZGRIZWFkZXIobmFtZTogc3RyaW5nLCBoZWFkZXI6IE1kYlRhYmxlU29ydEhlYWRlckRpcmVjdGl2ZSk6IHZvaWQge1xuICAgIHRoaXMuaGVhZGVycy5zZXQobmFtZSwgaGVhZGVyKTtcbiAgfVxuXG4gIHJlbW92ZUhlYWRlcihuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmhlYWRlcnMuZGVsZXRlKG5hbWUpO1xuICB9XG59XG4iXX0=