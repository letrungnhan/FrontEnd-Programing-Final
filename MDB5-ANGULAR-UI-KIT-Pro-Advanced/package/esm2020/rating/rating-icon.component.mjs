import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class MdbRatingIconComponent {
    constructor(_cdRef) {
        this._cdRef = _cdRef;
        this.color = 'primary';
        this.activeIcon = new EventEmitter();
        this._active = false;
        this._icon = 'fa-star fa-sm';
        this._after = '';
        this._before = '';
        this.disabled = false;
    }
    set icon(value) {
        this._icon = value;
    }
    get icon() {
        return this._icon;
    }
    set active(value) {
        this._active = coerceBooleanProperty(value);
    }
    get active() {
        return this._active;
    }
    set after(value) {
        this._after = value;
    }
    get after() {
        return this._after;
    }
    set before(value) {
        this._before = value;
    }
    get before() {
        return this._before;
    }
    onMouseenter() {
        if (this.disabled) {
            return;
        }
        this.setActive(true);
        this.activeIcon.emit(this);
    }
    setActive(isActive, iconClass) {
        this.active = isActive;
        if (iconClass) {
            this.setDynamicIcon(iconClass);
        }
        else {
            this.resetIcon();
        }
        this._cdRef.markForCheck();
    }
    setDynamicIcon(iconClass) {
        if (!this._originalIconClass) {
            this._originalIconClass = this.icon;
        }
        this.icon = iconClass.replace('far', '');
    }
    resetIcon() {
        this.icon = this._originalIconClass || this.icon;
    }
}
MdbRatingIconComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbRatingIconComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MdbRatingIconComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbRatingIconComponent, selector: "mdb-rating-icon", inputs: { icon: "icon", color: "color", active: "active", after: "after", before: "before" }, outputs: { activeIcon: "activeIcon" }, ngImport: i0, template: "<span>\n  <span class=\"text-body\">{{ before }}</span>\n  <i\n    [ngClass]=\"active ? 'fas ' + icon + ' active' : 'far ' + icon\"\n    [ngStyle]=\"{ color: color }\"\n    (mouseenter)=\"onMouseenter()\"\n  ></i>\n  <span class=\"text-body\">{{ after }}</span>\n</span>\n", directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbRatingIconComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-rating-icon', changeDetection: ChangeDetectionStrategy.OnPush, template: "<span>\n  <span class=\"text-body\">{{ before }}</span>\n  <i\n    [ngClass]=\"active ? 'fas ' + icon + ' active' : 'far ' + icon\"\n    [ngStyle]=\"{ color: color }\"\n    (mouseenter)=\"onMouseenter()\"\n  ></i>\n  <span class=\"text-body\">{{ after }}</span>\n</span>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { icon: [{
                type: Input
            }], color: [{
                type: Input
            }], active: [{
                type: Input
            }], after: [{
                type: Input
            }], before: [{
                type: Input
            }], activeIcon: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0aW5nLWljb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L3JhdGluZy9yYXRpbmctaWNvbi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvcmF0aW5nL3JhdGluZy1pY29uLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBZ0IscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RSxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQzs7O0FBT3ZCLE1BQU0sT0FBTyxzQkFBc0I7SUF5Q2pDLFlBQW9CLE1BQXlCO1FBQXpCLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBakNwQyxVQUFLLEdBQUcsU0FBUyxDQUFDO1FBdUJqQixlQUFVLEdBQXlDLElBQUksWUFBWSxFQUFFLENBQUM7UUFFeEUsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixVQUFLLEdBQUcsZUFBZSxDQUFDO1FBRXhCLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFDWixZQUFPLEdBQUcsRUFBRSxDQUFDO1FBRWQsYUFBUSxHQUFHLEtBQUssQ0FBQztJQUV3QixDQUFDO0lBeENqRCxJQUNJLElBQUksQ0FBQyxLQUFhO1FBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7SUFDRCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVELElBQ0ksTUFBTSxDQUFDLEtBQWM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBQ0QsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFDRCxJQUNJLEtBQUssQ0FBQyxLQUFhO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFDRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUNELElBQ0ksTUFBTSxDQUFDLEtBQWE7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQUNELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBY0QsWUFBWTtRQUNWLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxTQUFTLENBQUMsUUFBaUIsRUFBRSxTQUFrQjtRQUM3QyxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztRQUV2QixJQUFJLFNBQVMsRUFBRTtZQUNiLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDaEM7YUFBTTtZQUNMLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNsQjtRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELGNBQWMsQ0FBQyxTQUFpQjtRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQzVCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ3JDO1FBRUQsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsU0FBUztRQUNQLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDbkQsQ0FBQzs7bUhBMUVVLHNCQUFzQjt1R0FBdEIsc0JBQXNCLDRMQ2ZuQyxrUkFTQTsyRkRNYSxzQkFBc0I7a0JBTGxDLFNBQVM7K0JBQ0UsaUJBQWlCLG1CQUVWLHVCQUF1QixDQUFDLE1BQU07d0dBSTNDLElBQUk7c0JBRFAsS0FBSztnQkFPRyxLQUFLO3NCQUFiLEtBQUs7Z0JBRUYsTUFBTTtzQkFEVCxLQUFLO2dCQVFGLEtBQUs7c0JBRFIsS0FBSztnQkFRRixNQUFNO3NCQURULEtBQUs7Z0JBUUksVUFBVTtzQkFBbkIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPdXRwdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZGItcmF0aW5nLWljb24nLFxuICB0ZW1wbGF0ZVVybDogJ3JhdGluZy1pY29uLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1kYlJhdGluZ0ljb25Db21wb25lbnQge1xuICBASW5wdXQoKVxuICBzZXQgaWNvbih2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5faWNvbiA9IHZhbHVlO1xuICB9XG4gIGdldCBpY29uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2ljb247XG4gIH1cbiAgQElucHV0KCkgY29sb3IgPSAncHJpbWFyeSc7XG4gIEBJbnB1dCgpXG4gIHNldCBhY3RpdmUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9hY3RpdmUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIGdldCBhY3RpdmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgYWZ0ZXIodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2FmdGVyID0gdmFsdWU7XG4gIH1cbiAgZ2V0IGFmdGVyKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2FmdGVyO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBiZWZvcmUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2JlZm9yZSA9IHZhbHVlO1xuICB9XG4gIGdldCBiZWZvcmUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fYmVmb3JlO1xuICB9XG5cbiAgQE91dHB1dCgpIGFjdGl2ZUljb246IEV2ZW50RW1pdHRlcjxNZGJSYXRpbmdJY29uQ29tcG9uZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcml2YXRlIF9hY3RpdmUgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfaWNvbiA9ICdmYS1zdGFyIGZhLXNtJztcbiAgcHJpdmF0ZSBfb3JpZ2luYWxJY29uQ2xhc3M6IHN0cmluZztcbiAgcHJpdmF0ZSBfYWZ0ZXIgPSAnJztcbiAgcHJpdmF0ZSBfYmVmb3JlID0gJyc7XG5cbiAgcHVibGljIGRpc2FibGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2RSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gIG9uTW91c2VlbnRlcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc2V0QWN0aXZlKHRydWUpO1xuICAgIHRoaXMuYWN0aXZlSWNvbi5lbWl0KHRoaXMpO1xuICB9XG5cbiAgc2V0QWN0aXZlKGlzQWN0aXZlOiBib29sZWFuLCBpY29uQ2xhc3M/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmFjdGl2ZSA9IGlzQWN0aXZlO1xuXG4gICAgaWYgKGljb25DbGFzcykge1xuICAgICAgdGhpcy5zZXREeW5hbWljSWNvbihpY29uQ2xhc3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlc2V0SWNvbigpO1xuICAgIH1cblxuICAgIHRoaXMuX2NkUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgc2V0RHluYW1pY0ljb24oaWNvbkNsYXNzOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX29yaWdpbmFsSWNvbkNsYXNzKSB7XG4gICAgICB0aGlzLl9vcmlnaW5hbEljb25DbGFzcyA9IHRoaXMuaWNvbjtcbiAgICB9XG5cbiAgICB0aGlzLmljb24gPSBpY29uQ2xhc3MucmVwbGFjZSgnZmFyJywgJycpO1xuICB9XG5cbiAgcmVzZXRJY29uKCk6IHZvaWQge1xuICAgIHRoaXMuaWNvbiA9IHRoaXMuX29yaWdpbmFsSWNvbkNsYXNzIHx8IHRoaXMuaWNvbjtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9hY3RpdmU6IEJvb2xlYW5JbnB1dDtcbn1cbiIsIjxzcGFuPlxuICA8c3BhbiBjbGFzcz1cInRleHQtYm9keVwiPnt7IGJlZm9yZSB9fTwvc3Bhbj5cbiAgPGlcbiAgICBbbmdDbGFzc109XCJhY3RpdmUgPyAnZmFzICcgKyBpY29uICsgJyBhY3RpdmUnIDogJ2ZhciAnICsgaWNvblwiXG4gICAgW25nU3R5bGVdPVwieyBjb2xvcjogY29sb3IgfVwiXG4gICAgKG1vdXNlZW50ZXIpPVwib25Nb3VzZWVudGVyKClcIlxuICA+PC9pPlxuICA8c3BhbiBjbGFzcz1cInRleHQtYm9keVwiPnt7IGFmdGVyIH19PC9zcGFuPlxuPC9zcGFuPlxuIl19