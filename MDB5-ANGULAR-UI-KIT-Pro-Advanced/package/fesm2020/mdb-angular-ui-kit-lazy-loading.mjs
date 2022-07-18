import * as i0 from '@angular/core';
import { EventEmitter, Directive, Input, Output, NgModule } from '@angular/core';
import { fromEvent } from 'rxjs';
import { take } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

function isImage(element) {
    return element.nodeName === 'IMG';
}
function isVideo(element) {
    return element.nodeName === 'VIDEO';
}

class MdbLazyLoadingDirective {
    constructor(_elementRef, _renderer, _ngZone) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._ngZone = _ngZone;
        this.offset = 0;
        this.delay = 0;
        this.loadingStart = new EventEmitter();
        this.loadingEnd = new EventEmitter();
        this.loadingError = new EventEmitter();
    }
    get host() {
        return this._elementRef.nativeElement;
    }
    ngOnInit() {
        this._initObserver();
        if (this.loadingPlaceholder) {
            this._setPlaceholder(this.host, this.loadingPlaceholder);
        }
    }
    ngOnDestroy() {
        if (this._scrollSubscription) {
            this._scrollSubscription.unsubscribe();
        }
    }
    _initObserver() {
        const target = this.container || window;
        this._ngZone.runOutsideAngular(() => {
            this._scrollSubscription = fromEvent(target, 'scroll').subscribe(() => {
                this._handleScroll();
            });
        });
    }
    _handleScroll() {
        if (this._isInViewport()) {
            this._ngZone.run(() => {
                this._lazyLoad(this.host);
            });
        }
    }
    _isInViewport() {
        const elementRect = this.host.getBoundingClientRect();
        if (this.container) {
            const containerRect = this.container.getBoundingClientRect();
            return (containerRect.y > 0 &&
                containerRect.y < window.innerHeight &&
                elementRect.y >= containerRect.y &&
                elementRect.y <= containerRect.y + containerRect.height &&
                elementRect.y <= window.innerHeight);
        }
        return elementRect.top + this.offset <= window.innerHeight && elementRect.bottom >= 0;
    }
    _lazyLoad(element) {
        this._scrollSubscription.unsubscribe();
        this.loadingStart.emit();
        setTimeout(() => {
            if (isImage(element)) {
                this._loadImage(element);
            }
            else if (isVideo(element)) {
                this._loadVideo(element);
            }
        }, this.delay);
    }
    _loadImage(element) {
        if (!element.dataset.src) {
            this.loadingError.emit();
            if (this.errorPlaceholder) {
                this._setPlaceholder(element, this.errorPlaceholder);
            }
            return;
        }
        this._handleLoadingEvents(element);
        this._renderer.setAttribute(element, 'src', element.dataset.src);
        this._renderer.removeAttribute(element, 'data-src');
    }
    _loadVideo(element) {
        if (!element.dataset.src) {
            this.loadingError.emit();
            if (this.errorPlaceholder) {
                this._setPlaceholder(element, this.errorPlaceholder);
            }
            return;
        }
        this._handleLoadingEvents(element);
        this._renderer.setAttribute(element, 'src', element.dataset.src);
        this._renderer.removeAttribute(element, 'data-src');
        this._renderer.removeAttribute(element, 'poster');
    }
    _handleLoadingEvents(element) {
        fromEvent(element, 'load')
            .pipe(take(1))
            .subscribe(() => {
            this.loadingEnd.emit();
        });
        fromEvent(element, 'error')
            .pipe(take(1))
            .subscribe(() => {
            this.loadingError.emit();
            if (this.errorPlaceholder) {
                this._setPlaceholder(element, this.errorPlaceholder);
            }
        });
    }
    _setPlaceholder(element, placeholder) {
        if (element.nodeName === 'IMG') {
            this._renderer.setAttribute(element, 'src', placeholder);
        }
        else if (element.nodeName === 'VIDEO') {
            this._renderer.setAttribute(element, 'poster', placeholder);
        }
    }
}
MdbLazyLoadingDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbLazyLoadingDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
MdbLazyLoadingDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.7", type: MdbLazyLoadingDirective, selector: "[mdbLazyLoading]", inputs: { offset: "offset", loadingPlaceholder: "loadingPlaceholder", errorPlaceholder: "errorPlaceholder", container: "container", delay: "delay" }, outputs: { loadingStart: "loadingStart", loadingEnd: "loadingEnd", loadingError: "loadingError" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbLazyLoadingDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mdbLazyLoading]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.NgZone }]; }, propDecorators: { offset: [{
                type: Input
            }], loadingPlaceholder: [{
                type: Input
            }], errorPlaceholder: [{
                type: Input
            }], container: [{
                type: Input
            }], delay: [{
                type: Input
            }], loadingStart: [{
                type: Output
            }], loadingEnd: [{
                type: Output
            }], loadingError: [{
                type: Output
            }] } });

class MdbLazyLoadingModule {
}
MdbLazyLoadingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbLazyLoadingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbLazyLoadingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbLazyLoadingModule, declarations: [MdbLazyLoadingDirective], imports: [CommonModule], exports: [MdbLazyLoadingDirective] });
MdbLazyLoadingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbLazyLoadingModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbLazyLoadingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [MdbLazyLoadingDirective],
                    exports: [MdbLazyLoadingDirective],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MdbLazyLoadingDirective, MdbLazyLoadingModule };
//# sourceMappingURL=mdb-angular-ui-kit-lazy-loading.mjs.map
