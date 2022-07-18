import PerfectScrollbar from 'perfect-scrollbar';
import * as i0 from '@angular/core';
import { EventEmitter, PLATFORM_ID, Directive, Inject, Input, Output, NgModule } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

class MdbScrollbarDirective {
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

class MdbScrollbarModule {
}
MdbScrollbarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbScrollbarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbScrollbarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbScrollbarModule, declarations: [MdbScrollbarDirective], exports: [MdbScrollbarDirective] });
MdbScrollbarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbScrollbarModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbScrollbarModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [MdbScrollbarDirective],
                    exports: [MdbScrollbarDirective],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MdbScrollbarDirective, MdbScrollbarModule };
//# sourceMappingURL=mdb-angular-ui-kit-scrollbar.mjs.map
