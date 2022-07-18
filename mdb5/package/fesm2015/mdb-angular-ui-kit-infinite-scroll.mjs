import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DOCUMENT, CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { EventEmitter, Directive, Inject, Input, Output, NgModule } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

class MdbInfiniteScrollDirective {
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
        }], ctorParameters: function () {
        return [{ type: i0.ElementRef }, { type: i0.NgZone }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [DOCUMENT]
                    }] }];
    }, propDecorators: { direction: [{
                type: Input
            }], container: [{
                type: Input
            }], window: [{
                type: Input
            }], infiniteScrollCompleted: [{
                type: Output
            }] } });

class MdbInfiniteScrollModule {
}
MdbInfiniteScrollModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbInfiniteScrollModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbInfiniteScrollModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbInfiniteScrollModule, declarations: [MdbInfiniteScrollDirective], imports: [CommonModule], exports: [MdbInfiniteScrollDirective] });
MdbInfiniteScrollModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbInfiniteScrollModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbInfiniteScrollModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [MdbInfiniteScrollDirective],
                    exports: [MdbInfiniteScrollDirective],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MdbInfiniteScrollDirective, MdbInfiniteScrollModule };
//# sourceMappingURL=mdb-angular-ui-kit-infinite-scroll.mjs.map
