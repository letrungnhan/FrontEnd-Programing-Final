import { Component, ChangeDetectionStrategy, Input, HostBinding, Optional, Inject, } from '@angular/core';
import { MDB_OPTION_GROUP, MDB_OPTION_PARENT } from './option.component';
import * as i0 from "@angular/core";
export class MdbOptionGroupComponent {
    constructor(_parent) {
        this._parent = _parent;
        this.optionGroup = true;
        this._optionHeight = 48;
        this._disabled = false;
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = value;
    }
    ngOnInit() {
        if (this._parent && this._parent.visibleOptions && this._parent.optionHeight) {
            this._optionHeight = this._parent.optionHeight;
        }
    }
}
MdbOptionGroupComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbOptionGroupComponent, deps: [{ token: MDB_OPTION_PARENT, optional: true }], target: i0.ɵɵFactoryTarget.Component });
MdbOptionGroupComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbOptionGroupComponent, selector: "mdb-option-group", inputs: { label: "label", disabled: "disabled" }, host: { properties: { "class.option-group": "this.optionGroup" } }, providers: [{ provide: MDB_OPTION_GROUP, useExisting: MdbOptionGroupComponent }], ngImport: i0, template: "<label\n  class=\"option-group-label\"\n  [style.height.px]=\"_optionHeight\"\n  [style.line-height.px]=\"_optionHeight\"\n  >{{ label }}</label\n>\n<ng-content select=\"mdb-option\"></ng-content>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbOptionGroupComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-option-group', changeDetection: ChangeDetectionStrategy.OnPush, providers: [{ provide: MDB_OPTION_GROUP, useExisting: MdbOptionGroupComponent }], template: "<label\n  class=\"option-group-label\"\n  [style.height.px]=\"_optionHeight\"\n  [style.line-height.px]=\"_optionHeight\"\n  >{{ label }}</label\n>\n<ng-content select=\"mdb-option\"></ng-content>\n" }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MDB_OPTION_PARENT]
                }] }]; }, propDecorators: { optionGroup: [{
                type: HostBinding,
                args: ['class.option-group']
            }], label: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLWdyb3VwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9vcHRpb24vb3B0aW9uLWdyb3VwLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9vcHRpb24vb3B0aW9uLWdyb3VwLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBRVQsdUJBQXVCLEVBQ3ZCLEtBQUssRUFDTCxXQUFXLEVBQ1gsUUFBUSxFQUNSLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQW1CLE1BQU0sb0JBQW9CLENBQUM7O0FBUTFGLE1BQU0sT0FBTyx1QkFBdUI7SUFnQmxDLFlBQTJELE9BQXdCO1FBQXhCLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBZG5GLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBV1gsY0FBUyxHQUFHLEtBQUssQ0FBQztJQUU0RCxDQUFDO0lBVHZGLElBQ0ksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBYztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUN6QixDQUFDO0lBS0QsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRTtZQUM1RSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDO1NBQ2hEO0lBQ0gsQ0FBQzs7b0hBdEJVLHVCQUF1QixrQkFnQkYsaUJBQWlCO3dHQWhCdEMsdUJBQXVCLGlLQUZ2QixDQUFDLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBRSx1QkFBdUIsRUFBRSxDQUFDLDBCQ2ZsRix3TUFPQTsyRkRVYSx1QkFBdUI7a0JBTm5DLFNBQVM7K0JBQ0Usa0JBQWtCLG1CQUVYLHVCQUF1QixDQUFDLE1BQU0sYUFDcEMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLHlCQUF5QixFQUFFLENBQUM7OzBCQWtCbkUsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxpQkFBaUI7NENBZGpELFdBQVc7c0JBRFYsV0FBVzt1QkFBQyxvQkFBb0I7Z0JBSXhCLEtBQUs7c0JBQWIsS0FBSztnQkFHRixRQUFRO3NCQURYLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIE9uSW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIElucHV0LFxuICBIb3N0QmluZGluZyxcbiAgT3B0aW9uYWwsXG4gIEluamVjdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNREJfT1BUSU9OX0dST1VQLCBNREJfT1BUSU9OX1BBUkVOVCwgTWRiT3B0aW9uUGFyZW50IH0gZnJvbSAnLi9vcHRpb24uY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLW9wdGlvbi1ncm91cCcsXG4gIHRlbXBsYXRlVXJsOiAnb3B0aW9uLWdyb3VwLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogTURCX09QVElPTl9HUk9VUCwgdXNlRXhpc3Rpbmc6IE1kYk9wdGlvbkdyb3VwQ29tcG9uZW50IH1dLFxufSlcbmV4cG9ydCBjbGFzcyBNZGJPcHRpb25Hcm91cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBIb3N0QmluZGluZygnY2xhc3Mub3B0aW9uLWdyb3VwJylcbiAgb3B0aW9uR3JvdXAgPSB0cnVlO1xuICBfb3B0aW9uSGVpZ2h0ID0gNDg7XG5cbiAgQElucHV0KCkgbGFiZWw6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICB9XG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gdmFsdWU7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBASW5qZWN0KE1EQl9PUFRJT05fUEFSRU5UKSBwcml2YXRlIF9wYXJlbnQ6IE1kYk9wdGlvblBhcmVudCkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fcGFyZW50ICYmIHRoaXMuX3BhcmVudC52aXNpYmxlT3B0aW9ucyAmJiB0aGlzLl9wYXJlbnQub3B0aW9uSGVpZ2h0KSB7XG4gICAgICB0aGlzLl9vcHRpb25IZWlnaHQgPSB0aGlzLl9wYXJlbnQub3B0aW9uSGVpZ2h0O1xuICAgIH1cbiAgfVxufVxuIiwiPGxhYmVsXG4gIGNsYXNzPVwib3B0aW9uLWdyb3VwLWxhYmVsXCJcbiAgW3N0eWxlLmhlaWdodC5weF09XCJfb3B0aW9uSGVpZ2h0XCJcbiAgW3N0eWxlLmxpbmUtaGVpZ2h0LnB4XT1cIl9vcHRpb25IZWlnaHRcIlxuICA+e3sgbGFiZWwgfX08L2xhYmVsXG4+XG48bmctY29udGVudCBzZWxlY3Q9XCJtZGItb3B0aW9uXCI+PC9uZy1jb250ZW50PlxuIl19