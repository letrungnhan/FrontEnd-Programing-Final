import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, HostBinding, HostListener, Input, } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class MdbLightboxItemDirective {
    constructor(el) {
        this.el = el;
        this._disabled = false;
        this.click$ = new Subject();
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    onClick() {
        if (this.disabled) {
            return;
        }
        this.click$.next(this);
    }
    get isDisabled() {
        return this.disabled;
    }
    ngOnDestroy() {
        this.click$.complete();
    }
}
MdbLightboxItemDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbLightboxItemDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
MdbLightboxItemDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.7", type: MdbLightboxItemDirective, selector: "[mdbLightboxItem]", inputs: { caption: "caption", img: "img", disabled: "disabled" }, host: { listeners: { "click": "onClick($event.target)" }, properties: { "class.lightbox-disabled": "this.isDisabled" } }, exportAs: ["mdbLightboxItem"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbLightboxItemDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mdbLightboxItem]',
                    exportAs: 'mdbLightboxItem',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { caption: [{
                type: Input
            }], img: [{
                type: Input
            }], disabled: [{
                type: Input
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event.target']]
            }], isDisabled: [{
                type: HostBinding,
                args: ['class.lightbox-disabled']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlnaHRib3gtaXRlbS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvbGlnaHRib3gvbGlnaHRib3gtaXRlbS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFnQixxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVFLE9BQU8sRUFDTCxTQUFTLEVBRVQsV0FBVyxFQUNYLFlBQVksRUFDWixLQUFLLEdBR04sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFNL0IsTUFBTSxPQUFPLHdCQUF3QjtJQTZCbkMsWUFBbUIsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7UUFsQnpCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFFMUIsV0FBTSxHQUFHLElBQUksT0FBTyxFQUE0QixDQUFDO0lBZ0JiLENBQUM7SUF6QnJDLElBQ0ksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBYztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFNRCxPQUFPO1FBQ0wsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUNJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUlELFdBQVc7UUFDVCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7O3FIQWpDVSx3QkFBd0I7eUdBQXhCLHdCQUF3QjsyRkFBeEIsd0JBQXdCO2tCQUpwQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFFBQVEsRUFBRSxpQkFBaUI7aUJBQzVCO2lHQUVVLE9BQU87c0JBQWYsS0FBSztnQkFDRyxHQUFHO3NCQUFYLEtBQUs7Z0JBR0YsUUFBUTtzQkFEWCxLQUFLO2dCQVlOLE9BQU87c0JBRE4sWUFBWTt1QkFBQyxPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUM7Z0JBVXBDLFVBQVU7c0JBRGIsV0FBVzt1QkFBQyx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZGJMaWdodGJveEl0ZW1dJyxcbiAgZXhwb3J0QXM6ICdtZGJMaWdodGJveEl0ZW0nLFxufSlcbmV4cG9ydCBjbGFzcyBNZGJMaWdodGJveEl0ZW1EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBjYXB0aW9uOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGltZzogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XG5cbiAgY2xpY2skID0gbmV3IFN1YmplY3Q8TWRiTGlnaHRib3hJdGVtRGlyZWN0aXZlPigpO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQudGFyZ2V0J10pXG4gIG9uQ2xpY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmNsaWNrJC5uZXh0KHRoaXMpO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5saWdodGJveC1kaXNhYmxlZCcpXG4gIGdldCBpc0Rpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRpc2FibGVkO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmKSB7fVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuY2xpY2skLmNvbXBsZXRlKCk7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZmx1c2g6IEJvb2xlYW5JbnB1dDtcbn1cbiJdfQ==