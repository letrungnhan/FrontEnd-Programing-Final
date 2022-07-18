import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, HostListener, ViewChild, } from '@angular/core';
import * as i0 from "@angular/core";
export class MdbTimepickerToggleComponent {
    constructor(_cdRef) {
        this._cdRef = _cdRef;
        this.icon = 'far fa-clock';
        this.disabled = false;
    }
    handleClick() {
        if (this.disabled) {
            return;
        }
        this.mdbTimepickerToggle.open();
    }
    ngOnInit() {
        this.mdbTimepickerToggle.toggle = this;
    }
    markForCheck() {
        this._cdRef.markForCheck();
    }
}
MdbTimepickerToggleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTimepickerToggleComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MdbTimepickerToggleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbTimepickerToggleComponent, selector: "mdb-timepicker-toggle", inputs: { mdbTimepickerToggle: "mdbTimepickerToggle", icon: "icon", disabled: "disabled" }, host: { listeners: { "click": "handleClick()" } }, viewQueries: [{ propertyName: "button", first: true, predicate: ["button"], descendants: true, static: true }], ngImport: i0, template: "<button\n  type=\"button\"\n  [attr.disabled]=\"disabled ? 'disable' : null\"\n  #button\n  class=\"timepicker-toggle-button\"\n>\n  <i class=\"{{ icon }} fa-sm timepicker-icon\"></i>\n</button>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTimepickerToggleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-timepicker-toggle', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  type=\"button\"\n  [attr.disabled]=\"disabled ? 'disable' : null\"\n  #button\n  class=\"timepicker-toggle-button\"\n>\n  <i class=\"{{ icon }} fa-sm timepicker-icon\"></i>\n</button>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { button: [{
                type: ViewChild,
                args: ['button', { static: true }]
            }], mdbTimepickerToggle: [{
                type: Input
            }], icon: [{
                type: Input
            }], disabled: [{
                type: Input
            }], handleClick: [{
                type: HostListener,
                args: ['click']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci10b2dnbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L3RpbWVwaWNrZXIvdGltZXBpY2tlci10b2dnbGUuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L3RpbWVwaWNrZXIvdGltZXBpY2tlci10b2dnbGUuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsdUJBQXVCLEVBRXZCLEtBQUssRUFDTCxZQUFZLEVBRVosU0FBUyxHQUVWLE1BQU0sZUFBZSxDQUFDOztBQVV2QixNQUFNLE9BQU8sNEJBQTRCO0lBZ0J2QyxZQUFvQixNQUF5QjtRQUF6QixXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQVpwQyxTQUFJLEdBQUcsY0FBYyxDQUFDO1FBQ3RCLGFBQVEsR0FBRyxLQUFLLENBQUM7SUFXc0IsQ0FBQztJQVJqRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBSUQsUUFBUTtRQUNOLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ3pDLENBQUM7SUFFRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUM3QixDQUFDOzt5SEF4QlUsNEJBQTRCOzZHQUE1Qiw0QkFBNEIsNFRDcEJ6QyxzTUFRQTsyRkRZYSw0QkFBNEI7a0JBUHhDLFNBQVM7K0JBR0UsdUJBQXVCLGlCQUNsQixpQkFBaUIsQ0FBQyxJQUFJLG1CQUNwQix1QkFBdUIsQ0FBQyxNQUFNO3dHQUdSLE1BQU07c0JBQTVDLFNBQVM7dUJBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFFNUIsbUJBQW1CO3NCQUEzQixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUdOLFdBQVc7c0JBRFYsWUFBWTt1QkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIE9uSW5pdCxcbiAgSW5wdXQsXG4gIEhvc3RMaXN0ZW5lcixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIFZpZXdDaGlsZCxcbiAgRWxlbWVudFJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZGJUaW1lcGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi90aW1lcGlja2VyLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICB0ZW1wbGF0ZVVybDogJy4vdGltZXBpY2tlci10b2dnbGUuY29tcG9uZW50Lmh0bWwnLFxuXG4gIHNlbGVjdG9yOiAnbWRiLXRpbWVwaWNrZXItdG9nZ2xlJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1kYlRpbWVwaWNrZXJUb2dnbGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAVmlld0NoaWxkKCdidXR0b24nLCB7IHN0YXRpYzogdHJ1ZSB9KSBidXR0b246IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gIEBJbnB1dCgpIG1kYlRpbWVwaWNrZXJUb2dnbGU6IE1kYlRpbWVwaWNrZXJDb21wb25lbnQ7XG4gIEBJbnB1dCgpIGljb24gPSAnZmFyIGZhLWNsb2NrJztcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIGhhbmRsZUNsaWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5tZGJUaW1lcGlja2VyVG9nZ2xlLm9wZW4oKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLm1kYlRpbWVwaWNrZXJUb2dnbGUudG9nZ2xlID0gdGhpcztcbiAgfVxuXG4gIG1hcmtGb3JDaGVjaygpOiB2b2lkIHtcbiAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxufVxuIiwiPGJ1dHRvblxuICB0eXBlPVwiYnV0dG9uXCJcbiAgW2F0dHIuZGlzYWJsZWRdPVwiZGlzYWJsZWQgPyAnZGlzYWJsZScgOiBudWxsXCJcbiAgI2J1dHRvblxuICBjbGFzcz1cInRpbWVwaWNrZXItdG9nZ2xlLWJ1dHRvblwiXG4+XG4gIDxpIGNsYXNzPVwie3sgaWNvbiB9fSBmYS1zbSB0aW1lcGlja2VyLWljb25cIj48L2k+XG48L2J1dHRvbj5cbiJdfQ==