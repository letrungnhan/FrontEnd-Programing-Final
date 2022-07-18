import { ViewEncapsulation, ChangeDetectionStrategy, Component, Input, HostListener, ViewChild, } from '@angular/core';
import * as i0 from "@angular/core";
export class MdbDatepickerToggleComponent {
    constructor() {
        this.disabled = false;
        this.icon = 'far fa-calendar';
    }
    onClick() {
        if (this.disabled) {
            return;
        }
        this.toggle();
    }
    open() {
        this.mdbDatepicker.open();
    }
    close() {
        this.mdbDatepicker.close();
    }
    toggle() {
        this.mdbDatepicker.toggle();
    }
    ngOnInit() {
        this.mdbDatepicker._toggle = this;
    }
}
MdbDatepickerToggleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbDatepickerToggleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MdbDatepickerToggleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbDatepickerToggleComponent, selector: "mdb-datepicker-toggle", inputs: { disabled: "disabled", icon: "icon", mdbDatepicker: "mdbDatepicker" }, host: { listeners: { "click": "onClick()" } }, viewQueries: [{ propertyName: "button", first: true, predicate: ["button"], descendants: true, static: true }], ngImport: i0, template: "<button type=\"button\" [disabled]=\"disabled\" #button class=\"datepicker-toggle-button\">\n  <i class=\"{{ icon }} datepicker-toggle-icon\"></i>\n</button>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbDatepickerToggleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-datepicker-toggle', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<button type=\"button\" [disabled]=\"disabled\" #button class=\"datepicker-toggle-button\">\n  <i class=\"{{ icon }} datepicker-toggle-icon\"></i>\n</button>\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { button: [{
                type: ViewChild,
                args: ['button', { static: true }]
            }], disabled: [{
                type: Input
            }], icon: [{
                type: Input
            }], mdbDatepicker: [{
                type: Input
            }], onClick: [{
                type: HostListener,
                args: ['click']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci10b2dnbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L2RhdGVwaWNrZXIvZGF0ZXBpY2tlci10b2dnbGUuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L2RhdGVwaWNrZXIvZGF0ZXBpY2tlci10b2dnbGUuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLGlCQUFpQixFQUNqQix1QkFBdUIsRUFDdkIsU0FBUyxFQUNULEtBQUssRUFDTCxZQUFZLEVBR1osU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDOztBQVN2QixNQUFNLE9BQU8sNEJBQTRCO0lBT3ZDO1FBSlMsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixTQUFJLEdBQUcsaUJBQWlCLENBQUM7SUFHbkIsQ0FBQztJQUdoQixPQUFPO1FBQ0wsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsSUFBSTtRQUNGLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUNwQyxDQUFDOzt5SEFoQ1UsNEJBQTRCOzZHQUE1Qiw0QkFBNEIsNFNDbEJ6QyxpS0FHQTsyRkRlYSw0QkFBNEI7a0JBTnhDLFNBQVM7K0JBQ0UsdUJBQXVCLGlCQUVsQixpQkFBaUIsQ0FBQyxJQUFJLG1CQUNwQix1QkFBdUIsQ0FBQyxNQUFNOzBFQUdSLE1BQU07c0JBQTVDLFNBQVM7dUJBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFFNUIsUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFLTixPQUFPO3NCQUROLFlBQVk7dUJBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgSG9zdExpc3RlbmVyLFxuICBPbkluaXQsXG4gIEVsZW1lbnRSZWYsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZGJEYXRlcGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9kYXRlcGlja2VyLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21kYi1kYXRlcGlja2VyLXRvZ2dsZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9kYXRlcGlja2VyLXRvZ2dsZS5jb21wb25lbnQuaHRtbCcsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNZGJEYXRlcGlja2VyVG9nZ2xlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQFZpZXdDaGlsZCgnYnV0dG9uJywgeyBzdGF0aWM6IHRydWUgfSkgYnV0dG9uOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcblxuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBpY29uID0gJ2ZhciBmYS1jYWxlbmRhcic7XG4gIEBJbnB1dCgpIG1kYkRhdGVwaWNrZXI6IE1kYkRhdGVwaWNrZXJDb21wb25lbnQ7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMudG9nZ2xlKCk7XG4gIH1cblxuICBvcGVuKCk6IHZvaWQge1xuICAgIHRoaXMubWRiRGF0ZXBpY2tlci5vcGVuKCk7XG4gIH1cblxuICBjbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLm1kYkRhdGVwaWNrZXIuY2xvc2UoKTtcbiAgfVxuXG4gIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICB0aGlzLm1kYkRhdGVwaWNrZXIudG9nZ2xlKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLm1kYkRhdGVwaWNrZXIuX3RvZ2dsZSA9IHRoaXM7XG4gIH1cbn1cbiIsIjxidXR0b24gdHlwZT1cImJ1dHRvblwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiICNidXR0b24gY2xhc3M9XCJkYXRlcGlja2VyLXRvZ2dsZS1idXR0b25cIj5cbiAgPGkgY2xhc3M9XCJ7eyBpY29uIH19IGRhdGVwaWNrZXItdG9nZ2xlLWljb25cIj48L2k+XG48L2J1dHRvbj5cbiJdfQ==