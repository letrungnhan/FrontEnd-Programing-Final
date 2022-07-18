import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DOCUMENT } from '@angular/common';
import { Directive, EventEmitter, Inject, Input, Output, } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
export class MdbInfiniteScrollDirective {
    constructor(_elementRef, _ngZone, _document) {
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        this._document = _document;
        this.direction = 'vertical';
        this._window = false;
        this.infiniteScrollCompleted = new EventEmitter();
        this._destroy$ = new Subject();
    }
    get window() {
        return this._window;
    }
    set window(value) {
        this._window = coerceBooleanProperty(value);
    }
    get host() {
        return this.container ? this.container : this._elementRef.nativeElement;
    }
    ngOnInit() {
        const target = this.window ? window : this.host;
        this._ngZone.runOutsideAngular(() => {
            fromEvent(target, 'scroll')
                .pipe(takeUntil(this._destroy$))
                .subscribe(() => {
                if (this._isCompleted()) {
                    this._ngZone.run(() => {
                        this.infiniteScrollCompleted.emit();
                    });
                }
            });
        });
    }
    _isCompleted() {
        if (this.window) {
            return this._isCompletedWindow();
        }
        return this.isCompletedContainer();
    }
    isCompletedContainer() {
        const rect = this.host.getBoundingClientRect();
        if (this.direction === 'vertical') {
            return rect.height + this.host.scrollTop >= this.host.scrollHeight;
        }
        else {
            return rect.width + this.host.scrollLeft + 10 >= this.host.scrollWidth;
        }
    }
    _isCompletedWindow() {
        return window.scrollY + window.innerHeight === this._document.documentElement.scrollHeight;
    }
}
MdbInfiniteScrollDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbInfiniteScrollDirective, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
MdbInfiniteScrollDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.7", type: MdbInfiniteScrollDirective, selector: "[mdbInfiniteScroll]", inputs: { direction: "direction", container: "container", window: "window" }, outputs: { infiniteScrollCompleted: "infiniteScrollCompleted" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbInfiniteScrollDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: '[mdbInfiniteScroll]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { direction: [{
                type: Input
            }], container: [{
                type: Input
            }], window: [{
                type: Input
            }], infiniteScrollCompleted: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5maW5pdGUtc2Nyb2xsLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9pbmZpbml0ZS1zY3JvbGwvaW5maW5pdGUtc2Nyb2xsLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWdCLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFDTCxTQUFTLEVBRVQsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBR0wsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFRM0MsTUFBTSxPQUFPLDBCQUEwQjtJQWlCckMsWUFDVSxXQUF1QixFQUN2QixPQUFlLEVBQ0csU0FBYztRQUZoQyxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUN2QixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ0csY0FBUyxHQUFULFNBQVMsQ0FBSztRQW5CakMsY0FBUyxHQUErQixVQUFVLENBQUM7UUFVcEQsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUVkLDRCQUF1QixHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO1FBRXRFLGNBQVMsR0FBa0IsSUFBSSxPQUFPLEVBQVEsQ0FBQztJQU1yRCxDQUFDO0lBakJKLElBQ0ksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBQ0QsSUFBSSxNQUFNLENBQUMsS0FBYztRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFhRCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDO0lBQzFFLENBQUM7SUFFRCxRQUFRO1FBQ04sTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ2hELElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO1lBQ2xDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDO2lCQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDL0IsU0FBUyxDQUFDLEdBQUcsRUFBRTtnQkFDZCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRTtvQkFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFO3dCQUNwQixJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ3RDLENBQUMsQ0FBQyxDQUFDO2lCQUNKO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxZQUFZO1FBQ2xCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDbEM7UUFFRCxPQUFPLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFTyxvQkFBb0I7UUFDMUIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBRS9DLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxVQUFVLEVBQUU7WUFDakMsT0FBTyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1NBQ3BFO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1NBQ3hFO0lBQ0gsQ0FBQztJQUVPLGtCQUFrQjtRQUN4QixPQUFPLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLFdBQVcsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUM7SUFDN0YsQ0FBQzs7dUhBOURVLDBCQUEwQixrRUFvQjNCLFFBQVE7MkdBcEJQLDBCQUEwQjsyRkFBMUIsMEJBQTBCO2tCQUp0QyxTQUFTO21CQUFDO29CQUNULDhEQUE4RDtvQkFDOUQsUUFBUSxFQUFFLHFCQUFxQjtpQkFDaEM7OzBCQXFCSSxNQUFNOzJCQUFDLFFBQVE7NENBbkJULFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFHRixNQUFNO3NCQURULEtBQUs7Z0JBU0ksdUJBQXVCO3NCQUFoQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCB0eXBlIE1kYkluZmluaXRlU2Nyb2xsRGlyZWN0aW9uID0gJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJztcblxuQERpcmVjdGl2ZSh7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvZGlyZWN0aXZlLXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnW21kYkluZmluaXRlU2Nyb2xsXScsXG59KVxuZXhwb3J0IGNsYXNzIE1kYkluZmluaXRlU2Nyb2xsRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgZGlyZWN0aW9uOiBNZGJJbmZpbml0ZVNjcm9sbERpcmVjdGlvbiA9ICd2ZXJ0aWNhbCc7XG4gIEBJbnB1dCgpIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XG5cbiAgQElucHV0KClcbiAgZ2V0IHdpbmRvdygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fd2luZG93O1xuICB9XG4gIHNldCB3aW5kb3codmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl93aW5kb3cgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX3dpbmRvdyA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSBpbmZpbml0ZVNjcm9sbENvbXBsZXRlZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICByZWFkb25seSBfZGVzdHJveSQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueVxuICApIHt9XG5cbiAgZ2V0IGhvc3QoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmNvbnRhaW5lciA/IHRoaXMuY29udGFpbmVyIDogdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgY29uc3QgdGFyZ2V0ID0gdGhpcy53aW5kb3cgPyB3aW5kb3cgOiB0aGlzLmhvc3Q7XG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIGZyb21FdmVudCh0YXJnZXQsICdzY3JvbGwnKVxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveSQpKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5faXNDb21wbGV0ZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5fbmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuaW5maW5pdGVTY3JvbGxDb21wbGV0ZWQuZW1pdCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2lzQ29tcGxldGVkKCkge1xuICAgIGlmICh0aGlzLndpbmRvdykge1xuICAgICAgcmV0dXJuIHRoaXMuX2lzQ29tcGxldGVkV2luZG93KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaXNDb21wbGV0ZWRDb250YWluZXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNDb21wbGV0ZWRDb250YWluZXIoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgcmVjdCA9IHRoaXMuaG9zdC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgcmV0dXJuIHJlY3QuaGVpZ2h0ICsgdGhpcy5ob3N0LnNjcm9sbFRvcCA+PSB0aGlzLmhvc3Quc2Nyb2xsSGVpZ2h0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVjdC53aWR0aCArIHRoaXMuaG9zdC5zY3JvbGxMZWZ0ICsgMTAgPj0gdGhpcy5ob3N0LnNjcm9sbFdpZHRoO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2lzQ29tcGxldGVkV2luZG93KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB3aW5kb3cuc2Nyb2xsWSArIHdpbmRvdy5pbm5lckhlaWdodCA9PT0gdGhpcy5fZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodDtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV93aW5kb3c6IEJvb2xlYW5JbnB1dDtcbn1cbiJdfQ==