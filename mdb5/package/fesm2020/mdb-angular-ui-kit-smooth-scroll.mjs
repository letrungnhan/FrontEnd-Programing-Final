import { DOCUMENT, CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { EventEmitter, Directive, Inject, Input, Output, HostListener, NgModule } from '@angular/core';

const easingFunctions = {
    linear: linear,
    easeInQuad: easeInQuad,
    easeInCubic: easeInCubic,
    easeInQuart: easeInQuart,
    easeInQuint: easeInQuint,
    easeInOutQuad: easeInOutQuad,
    easeInOutCubic: easeInOutCubic,
    easeInOutQuart: easeInOutQuart,
    easeInOutQuint: easeInOutQuint,
    easeOutQuad: easeOutQuad,
    easeOutCubic: easeOutCubic,
    easeOutQuart: easeOutQuart,
    easeOutQuint: easeOutQuint,
};
function linear(t) {
    return t;
}
function easeInQuad(t) {
    return t * t;
}
function easeInCubic(t) {
    return t * t * t;
}
function easeInQuart(t) {
    return t * t * t * t;
}
function easeInQuint(t) {
    return t * t * t * t * t;
}
function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
function easeInOutCubic(t) {
    t /= 0.5;
    if (t < 1)
        return (t * t * t) / 2;
    t -= 2;
    return (t * t * t + 2) / 2;
}
function easeInOutQuart(t) {
    t /= 0.5;
    if (t < 1)
        return 0.5 * t * t * t * t;
    t -= 2;
    return -(t * t * t * t - 2) / 2;
}
function easeInOutQuint(t) {
    t /= 0.5;
    if (t < 1)
        return (t * t * t * t * t) / 2;
    t -= 2;
    return (t * t * t * t * t + 2) / 2;
}
function easeOutQuad(t) {
    return -t * (t - 2);
}
function easeOutCubic(t) {
    t--;
    return t * t * t + 1;
}
function easeOutQuart(t) {
    t--;
    return -(t * t * t * t - 1);
}
function easeOutQuint(t) {
    t--;
    return t * t * t * t * t + 1;
}

class MdbSmoothScrollDirective {
    constructor(_document) {
        this._document = _document;
        this.duration = 500;
        this.easing = 'linear';
        this.offset = 0;
        this.scrollStart = new EventEmitter();
        this.scrollEnd = new EventEmitter();
        this.scrollCancel = new EventEmitter();
        this._isCanceled = false;
    }
    onClick(event) {
        event.stopPropagation();
        event.preventDefault();
        this._scroll();
    }
    _scroll() {
        const container = this._getContainer();
        const positionFrom = container.scrollTop;
        const positionTo = this._getDistance();
        const progress = 0;
        const speed = 1 / this.duration;
        // Thanks to this value time of scrolling is almost equal to value which user set
        const step = 4.25;
        const easing = easingFunctions[this.easing];
        this.scrollStart.emit();
        // If element is hidden in a container which is not visible in viewport,
        // scroll to the container first, then scroll to the element
        if (!this._isInViewport()) {
            this._scrollOnNextTick(this._document.documentElement, this._document.documentElement.scrollTop, container.offsetTop, progress, speed, step, easing);
            setTimeout(() => {
                this._scrollOnNextTick(container, positionFrom, positionTo, progress, speed, step, easing);
                this._isCanceled = false;
            }, this.duration);
        }
        else {
            this._scrollOnNextTick(container, positionFrom, positionTo, progress, speed, step, easing);
        }
    }
    _scrollOnNextTick(container, positionFrom, positionTo, progress, speed, step, easing) {
        const negativeProgress = progress < 0;
        const scrollEnd = progress > 1;
        const negativeSpeed = speed < 0;
        const scrollContainer = this.container ? this.container : window;
        if (negativeProgress || scrollEnd || negativeSpeed || this._isCanceled) {
            if (this._isCanceled) {
                if (this._isInViewport()) {
                    this._isCanceled = false;
                }
                this.scrollCancel.emit();
                return;
            }
            this.scrollEnd.emit();
            container.scrollTop = positionTo;
            return;
        }
        scrollContainer.scrollTo({
            top: positionFrom - (positionFrom - positionTo) * easing(progress),
        });
        progress += speed * step;
        setTimeout(() => {
            this._scrollOnNextTick(container, positionFrom, positionTo, progress, speed, step, easing);
        });
    }
    _getContainer() {
        return this.container ? this.container : this._document.documentElement;
    }
    _getTarget() {
        return this._document.querySelector(this.href);
    }
    _getDistance() {
        let distance;
        const target = this._getTarget();
        if (!this.container) {
            distance = this._getDistanceForWindow(target);
        }
        else {
            distance = this._getDistanceForContainer(target);
        }
        return distance;
    }
    _getDistanceForWindow(target) {
        const distanceFromTop = this._document.documentElement.scrollTop;
        const targetTop = this._getElementTopOffset(target);
        const offset = this.offset;
        return targetTop - offset + distanceFromTop;
    }
    _getElementTopOffset(target) {
        const rect = target.getBoundingClientRect();
        return rect.top + this._document.documentElement.scrollTop;
    }
    _getDistanceForContainer(target) {
        const targetY = target.getBoundingClientRect().y;
        const containerY = this.container.getBoundingClientRect().y;
        const distanceFromTop = this.container.scrollTop;
        const distanceFromContainer = targetY - containerY;
        const offset = this.offset;
        return distanceFromContainer - offset + distanceFromTop;
    }
    _isInViewport() {
        if (!this.container) {
            return true;
        }
        const rect = this.container.getBoundingClientRect();
        const containerTop = rect.top;
        const containerBottom = rect.bottom;
        return containerTop >= 0 && containerBottom <= this._document.documentElement.clientHeight;
    }
    cancelScroll() {
        this._isCanceled = true;
    }
}
MdbSmoothScrollDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbSmoothScrollDirective, deps: [{ token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
MdbSmoothScrollDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.7", type: MdbSmoothScrollDirective, selector: "[mdbSmoothScroll]", inputs: { container: "container", duration: "duration", easing: "easing", href: "href", target: "target", offset: "offset" }, outputs: { scrollStart: "scrollStart", scrollEnd: "scrollEnd", scrollCancel: "scrollCancel" }, host: { listeners: { "click": "onClick($event)" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbSmoothScrollDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mdbSmoothScroll]',
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { container: [{
                type: Input
            }], duration: [{
                type: Input
            }], easing: [{
                type: Input
            }], href: [{
                type: Input
            }], target: [{
                type: Input
            }], offset: [{
                type: Input
            }], scrollStart: [{
                type: Output
            }], scrollEnd: [{
                type: Output
            }], scrollCancel: [{
                type: Output
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });

class MdbSmoothScrollModule {
}
MdbSmoothScrollModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbSmoothScrollModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbSmoothScrollModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbSmoothScrollModule, declarations: [MdbSmoothScrollDirective], imports: [CommonModule], exports: [MdbSmoothScrollDirective] });
MdbSmoothScrollModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbSmoothScrollModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbSmoothScrollModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [MdbSmoothScrollDirective],
                    imports: [CommonModule],
                    exports: [MdbSmoothScrollDirective],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MdbSmoothScrollDirective, MdbSmoothScrollModule };
//# sourceMappingURL=mdb-angular-ui-kit-smooth-scroll.mjs.map
