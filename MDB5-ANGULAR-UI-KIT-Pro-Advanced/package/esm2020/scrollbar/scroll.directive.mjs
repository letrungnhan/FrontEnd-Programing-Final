import PerfectScrollbar from 'perfect-scrollbar';
import { Directive, EventEmitter, Inject, Input, Output, PLATFORM_ID, } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import * as i0 from "@angular/core";
export class MdbScrollbarDirective {
    constructor(_elementRef, _ngZone, 
    // eslint-disable-next-line @typescript-eslint/ban-types
    platformId) {
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        this.platformId = platformId;
        this.scrollY = new EventEmitter();
        this.scrollX = new EventEmitter();
        this.scrollUp = new EventEmitter();
        this.scrollDown = new EventEmitter();
        this.scrollLeft = new EventEmitter();
        this.scrollRight = new EventEmitter();
        this.yReachEnd = new EventEmitter();
        this.yReachStart = new EventEmitter();
        this.xReachEnd = new EventEmitter();
        this.xReachStart = new EventEmitter();
        this._destroy = new Subject();
        this._scrollbar = null;
        this._events = [
            { ps: 'ps-scroll-y', mdb: 'scrollY' },
            { ps: 'ps-scroll-x', mdb: 'scrollX' },
            { ps: 'ps-scroll-up', mdb: 'scrollUp' },
            { ps: 'ps-scroll-down', mdb: 'scrollDown' },
            { ps: 'ps-scroll-left', mdb: 'scrollLeft' },
            { ps: 'ps-scroll-right', mdb: 'scrollRight' },
            { ps: 'ps-y-reach-end', mdb: 'yReachEnd' },
            { ps: 'ps-y-reach-start', mdb: 'yReachStart' },
            { ps: 'ps-x-reach-end', mdb: 'xReachEnd' },
            { ps: 'ps-x-reach-start', mdb: 'xReachStart' },
        ];
        this._defaultConfig = {
            handlers: ['click-rail', 'drag-thumb', 'keyboard', 'wheel', 'touch'],
            wheelSpeed: 1,
            wheelPropagation: true,
            swipeEasing: true,
            minScrollbarLength: null,
            maxScrollbarLength: null,
            scrollingThreshold: 1000,
            useBothWheelAxes: false,
            suppressScrollX: false,
            suppressScrollY: false,
            scrollXMarginOffset: 0,
            scrollYMarginOffset: 0,
        };
    }
    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this._initScrollbar();
            this._bindEvents();
        }
    }
    ngOnDestroy() {
        this._destroyScrollbar();
        this._destroy.next();
        this._destroy.complete();
    }
    _initScrollbar() {
        const config = this.config
            ? Object.assign(this._defaultConfig, this.config)
            : this._defaultConfig;
        this._ngZone.runOutsideAngular(() => {
            this._scrollbar = new PerfectScrollbar(this._elementRef.nativeElement, config);
        });
    }
    _bindEvents() {
        this._ngZone.runOutsideAngular(() => {
            this._events.forEach((eventName) => {
                fromEvent(this._elementRef.nativeElement, eventName.ps)
                    .pipe(takeUntil(this._destroy))
                    .subscribe((event) => {
                    this[eventName.mdb].emit(event);
                });
            });
        });
    }
    _destroyScrollbar() {
        this._ngZone.runOutsideAngular(() => {
            if (this._scrollbar) {
                this._scrollbar.destroy();
            }
        });
        this._scrollbar = null;
    }
}
MdbScrollbarDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbScrollbarDirective, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Directive });
MdbScrollbarDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.7", type: MdbScrollbarDirective, selector: "[mdbScrollbar]", inputs: { config: "config" }, outputs: { scrollY: "scrollY", scrollX: "scrollX", scrollUp: "scrollUp", scrollDown: "scrollDown", scrollLeft: "scrollLeft", scrollRight: "scrollRight", yReachEnd: "yReachEnd", yReachStart: "yReachStart", xReachEnd: "xReachEnd", xReachStart: "xReachStart" }, exportAs: ["mdbScrollbar"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbScrollbarDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: '[mdbScrollbar]',
                    exportAs: 'mdbScrollbar',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; }, propDecorators: { config: [{
                type: Input
            }], scrollY: [{
                type: Output
            }], scrollX: [{
                type: Output
            }], scrollUp: [{
                type: Output
            }], scrollDown: [{
                type: Output
            }], scrollLeft: [{
                type: Output
            }], scrollRight: [{
                type: Output
            }], yReachEnd: [{
                type: Output
            }], yReachStart: [{
                type: Output
            }], xReachEnd: [{
                type: Output
            }], xReachStart: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9zY3JvbGxiYXIvc2Nyb2xsLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGdCQUFnQixNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFDTCxTQUFTLEVBRVQsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBSUwsTUFBTSxFQUNOLFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMxQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBT3BELE1BQU0sT0FBTyxxQkFBcUI7SUFnQmhDLFlBQ1UsV0FBdUIsRUFDdkIsT0FBZTtJQUN2Qix3REFBd0Q7SUFDM0IsVUFBa0I7UUFIdkMsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDdkIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUVNLGVBQVUsR0FBVixVQUFVLENBQVE7UUFqQnZDLFlBQU8sR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNyRCxZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFFckQsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ3RELGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUN4RCxlQUFVLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFDeEQsZ0JBQVcsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUV6RCxjQUFTLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFDdkQsZ0JBQVcsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUN6RCxjQUFTLEdBQXNC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Y3JvbGxiYXIgZnJvbSAncGVyZmVjdC1zY3JvbGxiYXInO1xuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUExBVEZPUk1fSUQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBEaXJlY3RpdmUoe1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L2RpcmVjdGl2ZS1zZWxlY3RvclxuICBzZWxlY3RvcjogJ1ttZGJTY3JvbGxiYXJdJyxcbiAgZXhwb3J0QXM6ICdtZGJTY3JvbGxiYXInLFxufSlcbmV4cG9ydCBjbGFzcyBNZGJTY3JvbGxiYXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIGNvbmZpZzogYW55O1xuXG4gIEBPdXRwdXQoKSBzY3JvbGxZOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgc2Nyb2xsWDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgc2Nyb2xsVXA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBzY3JvbGxEb3duOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgc2Nyb2xsTGVmdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHNjcm9sbFJpZ2h0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoKSB5UmVhY2hFbmQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSB5UmVhY2hTdGFydDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHhSZWFjaEVuZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHhSZWFjaFN0YXJ0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHlwZXNcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdFxuICApIHt9XG5cbiAgcHJpdmF0ZSByZWFkb25seSBfZGVzdHJveTogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgcHJpdmF0ZSBfc2Nyb2xsYmFyOiBhbnkgfCBudWxsID0gbnVsbDtcblxuICBwcml2YXRlIF9ldmVudHMgPSBbXG4gICAgeyBwczogJ3BzLXNjcm9sbC15JywgbWRiOiAnc2Nyb2xsWScgfSxcbiAgICB7IHBzOiAncHMtc2Nyb2xsLXgnLCBtZGI6ICdzY3JvbGxYJyB9LFxuICAgIHsgcHM6ICdwcy1zY3JvbGwtdXAnLCBtZGI6ICdzY3JvbGxVcCcgfSxcbiAgICB7IHBzOiAncHMtc2Nyb2xsLWRvd24nLCBtZGI6ICdzY3JvbGxEb3duJyB9LFxuICAgIHsgcHM6ICdwcy1zY3JvbGwtbGVmdCcsIG1kYjogJ3Njcm9sbExlZnQnIH0sXG4gICAgeyBwczogJ3BzLXNjcm9sbC1yaWdodCcsIG1kYjogJ3Njcm9sbFJpZ2h0JyB9LFxuICAgIHsgcHM6ICdwcy15LXJlYWNoLWVuZCcsIG1kYjogJ3lSZWFjaEVuZCcgfSxcbiAgICB7IHBzOiAncHMteS1yZWFjaC1zdGFydCcsIG1kYjogJ3lSZWFjaFN0YXJ0JyB9LFxuICAgIHsgcHM6ICdwcy14LXJlYWNoLWVuZCcsIG1kYjogJ3hSZWFjaEVuZCcgfSxcbiAgICB7IHBzOiAncHMteC1yZWFjaC1zdGFydCcsIG1kYjogJ3hSZWFjaFN0YXJ0JyB9LFxuICBdO1xuXG4gIHByaXZhdGUgX2RlZmF1bHRDb25maWcgPSB7XG4gICAgaGFuZGxlcnM6IFsnY2xpY2stcmFpbCcsICdkcmFnLXRodW1iJywgJ2tleWJvYXJkJywgJ3doZWVsJywgJ3RvdWNoJ10sXG4gICAgd2hlZWxTcGVlZDogMSxcbiAgICB3aGVlbFByb3BhZ2F0aW9uOiB0cnVlLFxuICAgIHN3aXBlRWFzaW5nOiB0cnVlLFxuICAgIG1pblNjcm9sbGJhckxlbmd0aDogbnVsbCxcbiAgICBtYXhTY3JvbGxiYXJMZW5ndGg6IG51bGwsXG4gICAgc2Nyb2xsaW5nVGhyZXNob2xkOiAxMDAwLFxuICAgIHVzZUJvdGhXaGVlbEF4ZXM6IGZhbHNlLFxuICAgIHN1cHByZXNzU2Nyb2xsWDogZmFsc2UsXG4gICAgc3VwcHJlc3NTY3JvbGxZOiBmYWxzZSxcbiAgICBzY3JvbGxYTWFyZ2luT2Zmc2V0OiAwLFxuICAgIHNjcm9sbFlNYXJnaW5PZmZzZXQ6IDAsXG4gIH07XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMuX2luaXRTY3JvbGxiYXIoKTtcbiAgICAgIHRoaXMuX2JpbmRFdmVudHMoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9kZXN0cm95U2Nyb2xsYmFyKCk7XG4gICAgdGhpcy5fZGVzdHJveS5uZXh0KCk7XG4gICAgdGhpcy5fZGVzdHJveS5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFNjcm9sbGJhcigpOiB2b2lkIHtcbiAgICBjb25zdCBjb25maWcgPSB0aGlzLmNvbmZpZ1xuICAgICAgPyBPYmplY3QuYXNzaWduKHRoaXMuX2RlZmF1bHRDb25maWcsIHRoaXMuY29uZmlnKVxuICAgICAgOiB0aGlzLl9kZWZhdWx0Q29uZmlnO1xuXG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuX3Njcm9sbGJhciA9IG5ldyBQZXJmZWN0U2Nyb2xsYmFyKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgY29uZmlnKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2JpbmRFdmVudHMoKTogdm9pZCB7XG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuX2V2ZW50cy5mb3JFYWNoKChldmVudE5hbWU6IGFueSkgPT4ge1xuICAgICAgICBmcm9tRXZlbnQ8RXZlbnQ+KHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgZXZlbnROYW1lLnBzKVxuICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95KSlcbiAgICAgICAgICAuc3Vic2NyaWJlKChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXNbZXZlbnROYW1lLm1kYl0uZW1pdChldmVudCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rlc3Ryb3lTY3JvbGxiYXIoKTogdm9pZCB7XG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLl9zY3JvbGxiYXIpIHtcbiAgICAgICAgdGhpcy5fc2Nyb2xsYmFyLmRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLl9zY3JvbGxiYXIgPSBudWxsO1xuICB9XG59XG4iXX0=