import { Component, Optional, Inject } from '@angular/core';
import { MDB_OPTION_PARENT, MDB_OPTION_GROUP, MdbOptionComponent, } from 'mdb-angular-ui-kit/option';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class MdbSelectAllOptionComponent extends MdbOptionComponent {
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
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MDB_OPTION_PARENT]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MDB_OPTION_GROUP]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWFsbC1vcHRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvc2VsZWN0L3NlbGVjdC1hbGwtb3B0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXlDLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkcsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixnQkFBZ0IsRUFFaEIsa0JBQWtCLEdBRW5CLE1BQU0sMkJBQTJCLENBQUM7OztBQWtCbkMsTUFBTSxPQUFPLDJCQUE0QixTQUFRLGtCQUFrQjtJQUlqRSxZQUNFLEdBQWUsRUFDZixNQUF5QixFQUNjLE9BQXdCLEVBQ3pCLEtBQXFCO1FBRTNELEtBQUssQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQVRyQyxjQUFTLEdBQUcsSUFBSSxDQUFDO0lBVWpCLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFO1lBQzVFLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7U0FDaEQ7SUFDSCxDQUFDOzt3SEFqQlUsMkJBQTJCLDZFQU9oQixpQkFBaUIsNkJBQ2pCLGdCQUFnQjs0R0FSM0IsMkJBQTJCLG9GQWQ1Qjs7Ozs7Ozs7Ozs7O0dBWVQ7MkZBRVUsMkJBQTJCO2tCQWhCdkMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsdUJBQXVCO29CQUNqQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7OztHQVlUO2lCQUNGOzswQkFRSSxRQUFROzswQkFBSSxNQUFNOzJCQUFDLGlCQUFpQjs7MEJBQ3BDLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEVsZW1lbnRSZWYsIENoYW5nZURldGVjdG9yUmVmLCBPcHRpb25hbCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBNREJfT1BUSU9OX1BBUkVOVCxcbiAgTURCX09QVElPTl9HUk9VUCxcbiAgTWRiT3B0aW9uR3JvdXAsXG4gIE1kYk9wdGlvbkNvbXBvbmVudCxcbiAgTWRiT3B0aW9uUGFyZW50LFxufSBmcm9tICdtZGItYW5ndWxhci11aS1raXQvb3B0aW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLXNlbGVjdC1hbGwtb3B0aW9uJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3BhbiBjbGFzcz1cInNlbGVjdC1vcHRpb24tdGV4dFwiIG5nQ2xhc3M9XCJ7J2FjdGl2ZScsIGFjdGl2ZX1cIj5cbiAgICAgIDxpbnB1dFxuICAgICAgICAqbmdJZj1cIl9tdWx0aXBsZVwiXG4gICAgICAgIGNsYXNzPVwiZm9ybS1jaGVjay1pbnB1dFwiXG4gICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgIFtjaGVja2VkXT1cInNlbGVjdGVkXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgIC8+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9zcGFuPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIi5zZWxlY3Qtb3B0aW9uLWljb24tY29udGFpbmVyXCI+PC9uZy1jb250ZW50PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBNZGJTZWxlY3RBbGxPcHRpb25Db21wb25lbnQgZXh0ZW5kcyBNZGJPcHRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBfbXVsdGlwbGUgPSB0cnVlO1xuICBfb3B0aW9uSGVpZ2h0OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgX2VsOiBFbGVtZW50UmVmLFxuICAgIF9jZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChNREJfT1BUSU9OX1BBUkVOVCkgX3BhcmVudDogTWRiT3B0aW9uUGFyZW50LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTURCX09QVElPTl9HUk9VUCkgZ3JvdXA6IE1kYk9wdGlvbkdyb3VwXG4gICkge1xuICAgIHN1cGVyKF9lbCwgX2NkUmVmLCBfcGFyZW50LCBncm91cCk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fcGFyZW50ICYmIHRoaXMuX3BhcmVudC52aXNpYmxlT3B0aW9ucyAmJiB0aGlzLl9wYXJlbnQub3B0aW9uSGVpZ2h0KSB7XG4gICAgICB0aGlzLl9vcHRpb25IZWlnaHQgPSB0aGlzLl9wYXJlbnQub3B0aW9uSGVpZ2h0O1xuICAgIH1cbiAgfVxufVxuIl19