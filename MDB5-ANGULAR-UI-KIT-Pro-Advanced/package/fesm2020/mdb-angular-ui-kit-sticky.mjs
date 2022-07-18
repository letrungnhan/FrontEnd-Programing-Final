import * as i0 from '@angular/core';
import { EventEmitter, Directive, Input, Output, NgModule } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

// tslint:disable-next-line:component-class-suffix
class MdbStickyDirective {
    constructor(_elementRef, _renderer, _ngZone) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._ngZone = _ngZone;
        this.active = new EventEmitter();
        this.inactive = new EventEmitter();
        this.startInactive = new EventEmitter();
        this._stickyMedia = 0;
        this._manuallyDeactivated = false;
        this._stickyDirection = 'down';
        this._stickyDelay = 0;
        this._stickyPosition = 'top';
        this._stickyOffset = 0;
        this._elementPositionStyles = {};
        this._scrollTop = 0;
        this._elementOffsetTop = 0;
        this.isSticked = false;
        this._destroy$ = new Subject();
    }
    get stickyMedia() {
        return this._stickyMedia;
    }
    set stickyMedia(value) {
        this._stickyMedia = value;
    }
    get stickyDirection() {
        return this._stickyDirection;
    }
    set stickyDirection(value) {
        this._stickyDirection = value;
    }
    get stickyDelay() {
        return this._stickyDelay;
    }
    set stickyDelay(value) {
        this._stickyDelay = value;
    }
    get stickyPosition() {
        return this._stickyPosition;
    }
    set stickyPosition(value) {
        this._stickyPosition = value;
    }
    get stickyActiveClass() {
        return this._stickyActiveClass;
    }
    set stickyActiveClass(value) {
        this._stickyActiveClass = value;
    }
    get stickyOffset() {
        return this._stickyOffset;
    }
    set stickyOffset(value) {
        this._stickyOffset = value;
    }
    get stickyBoundary() {
        return this._stickyBoundary;
    }
    set stickyBoundary(value) {
        this._stickyBoundary = value;
    }
    ngAfterContentInit() {
        this._ngZone.runOutsideAngular(() => {
            fromEvent(window, 'resize')
                .pipe(takeUntil(this._destroy$))
                .subscribe(() => {
                this._updateElementPosition();
                this._updateElementOffset();
            });
            fromEvent(window, 'scroll')
                .pipe(takeUntil(this._destroy$))
                .subscribe(() => {
                if (window.innerWidth <= this.stickyMedia) {
                    return;
                }
                if (this._manuallyDeactivated) {
                    return;
                }
                const doc = document.documentElement;
                const scrollTop = window.pageYOffset || doc.scrollTop;
                this._updateElementOffset();
                this._updatePushPoint();
                this._updateScrollDirection(scrollTop);
                const isCorrectScrollDirection = [this._scrollDirection, 'both'].includes(this.stickyDirection);
                const isPushPointReached = this._pushPoint <= scrollTop;
                const shouldBeSticky = isPushPointReached && !this.isSticked && isCorrectScrollDirection;
                const shouldNotBeSticky = (!isPushPointReached || !isCorrectScrollDirection) && this.isSticked;
                if (shouldBeSticky) {
                    this._createHiddenElement();
                    this._enableSticky();
                    this._changeBoundaryPosition();
                    this.isSticked = true;
                }
                if (shouldNotBeSticky) {
                    this._disableSticky();
                    this.isSticked = false;
                }
                if (this.isSticked) {
                    this._updatePosition(this._elementPositionStyles);
                    this._changeBoundaryPosition();
                }
                this._scrollTop = scrollTop <= 0 ? 0 : scrollTop;
            });
        });
    }
    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }
    _updateElementOffset() {
        if (this._hiddenElement) {
            this._elementOffsetTop = this._hiddenElement.offsetTop;
        }
        else {
            this._elementOffsetTop = this._elementRef.nativeElement.offsetTop;
        }
    }
    _updatePushPoint() {
        if (this.stickyPosition === 'top') {
            this._pushPoint = this._elementOffsetTop - this.stickyDelay;
        }
        else {
            this._pushPoint =
                this._elementOffsetTop +
                    this._elementRef.nativeElement.height -
                    document.body.scrollHeight +
                    this.stickyDelay;
        }
    }
    _updateScrollDirection(scrollTop) {
        if (scrollTop > this._scrollTop) {
            this._scrollDirection = 'down';
        }
        else {
            this._scrollDirection = 'up';
        }
    }
    _createHiddenElement() {
        if (!this._hiddenElement) {
            this._hiddenElement = this._copyElement(this._elementRef.nativeElement);
        }
    }
    _copyElement(itemToCopy) {
        const { height, width } = itemToCopy.getBoundingClientRect();
        const COPIED_ITEM = itemToCopy.cloneNode(false);
        COPIED_ITEM.hidden = true;
        this._setStyle(COPIED_ITEM, {
            height: `${height}px`,
            width: `${width}px`,
            opacity: '0',
        });
        itemToCopy.parentElement.insertBefore(COPIED_ITEM, itemToCopy);
        return COPIED_ITEM;
    }
    _setStyle(element, styles) {
        Object.keys(styles).forEach((style) => {
            this._renderer.setStyle(element, style, styles[style]);
        });
    }
    _enableSticky() {
        const { height, left, width } = this._elementRef.nativeElement.getBoundingClientRect();
        this._toggleClass(this.stickyActiveClass, '', this._elementRef.nativeElement);
        this._setStyle(this._elementRef.nativeElement, {
            top: this.stickyPosition === 'top' && `${0 + this.stickyOffset}px`,
            bottom: this.stickyPosition === 'bottom' && `${0 + this.stickyOffset}px`,
            height: `${height}px`,
            width: `${width}px`,
            left: `${left}px`,
            zIndex: '100',
            position: 'fixed',
        });
        this._hiddenElement.hidden = false;
        this.active.emit();
    }
    _toggleClass(addClass, removeClass, target) {
        if (addClass) {
            this._renderer.addClass(target, addClass);
        }
        if (removeClass) {
            this._renderer.removeClass(target, removeClass);
        }
    }
    _changeBoundaryPosition() {
        const { height } = this._elementRef.nativeElement.getBoundingClientRect();
        const parentOffset = {
            height: this._elementRef.nativeElement.parentElement.getBoundingClientRect().height,
            ...this._getOffset(this._elementRef.nativeElement.parentElement),
        };
        let stopPoint;
        if (this._elementRef.nativeElement.parentElement === this.stickyBoundary) {
            stopPoint =
                parentOffset.height + parentOffset[this.stickyPosition] - height - this.stickyOffset;
        }
        else {
            stopPoint = this._getOffset(this.stickyBoundary).top - height - this.stickyOffset;
        }
        const isStickyTop = this.stickyPosition === 'top';
        const isStickyBottom = this.stickyPosition === 'bottom';
        const isBelowStopPoint = stopPoint < 0;
        const isBelowParentElementEnd = stopPoint > parentOffset.height - height;
        let elementStyle;
        if (isStickyTop) {
            if (isBelowStopPoint) {
                elementStyle = { top: `${this.stickyOffset + stopPoint}px` };
            }
            else {
                elementStyle = { top: `${this.stickyOffset + 0}px` };
            }
        }
        if (isStickyBottom) {
            if (isBelowStopPoint) {
                elementStyle = { bottom: `${this.stickyOffset + stopPoint}px` };
            }
            else if (isBelowParentElementEnd) {
                elementStyle = { bottom: `${this.stickyOffset + parentOffset.bottom}px` };
            }
            else {
                elementStyle = { bottom: `${this.stickyOffset + 0}px` };
            }
        }
        this._setStyle(this._elementRef.nativeElement, elementStyle);
    }
    _getOffset(element) {
        const rectElement = element.getBoundingClientRect();
        const offsetElement = {
            top: rectElement.top + document.body.scrollTop,
            left: rectElement.left + document.body.scrollLeft,
        };
        const bottom = offsetElement.left === 0 && offsetElement.top === 0
            ? 0
            : window.innerHeight - rectElement.bottom;
        return {
            ...offsetElement,
            bottom,
        };
    }
    _disableSticky() {
        this.startInactive.emit();
        const animationDuration = parseFloat(getComputedStyle(this._elementRef.nativeElement).animationDuration);
        setTimeout(() => {
            this._resetStyles();
            this._removeHiddenElement();
            this._toggleClass('', this.stickyActiveClass, this._elementRef.nativeElement);
            this.inactive.emit();
        }, animationDuration);
    }
    _resetStyles() {
        this._setStyle(this._elementRef.nativeElement, {
            top: null,
            bottom: null,
            position: null,
            left: null,
            zIndex: null,
            width: null,
            height: null,
        });
    }
    _removeHiddenElement() {
        if (!this._hiddenElement) {
            return;
        }
        this._hiddenElement.remove();
        this._hiddenElement = null;
    }
    _updatePosition(styles) {
        this._setStyle(this._elementRef.nativeElement, styles);
    }
    _updateElementPosition() {
        if (this._hiddenElement) {
            const { left } = this._hiddenElement.getBoundingClientRect();
            this._elementPositionStyles = {
                left: `${left}px`,
            };
        }
        else {
            this._elementPositionStyles = {};
        }
        this._setStyle(this._elementRef.nativeElement, this._elementPositionStyles);
    }
}
MdbStickyDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbStickyDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
MdbStickyDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.7", type: MdbStickyDirective, selector: "[mdbSticky]", inputs: { stickyMedia: "stickyMedia", stickyDirection: "stickyDirection", stickyDelay: "stickyDelay", stickyPosition: "stickyPosition", stickyActiveClass: "stickyActiveClass", stickyOffset: "stickyOffset", stickyBoundary: "stickyBoundary" }, outputs: { active: "active", inactive: "inactive", startInactive: "startInactive" }, exportAs: ["mdbSticky"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbStickyDirective, decorators: [{
            type: Directive,
            args: [{
                    // tslint:disable-next-line: directive-selector
                    selector: '[mdbSticky]',
                    exportAs: 'mdbSticky',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.NgZone }]; }, propDecorators: { stickyMedia: [{
                type: Input
            }], stickyDirection: [{
                type: Input
            }], stickyDelay: [{
                type: Input
            }], stickyPosition: [{
                type: Input
            }], stickyActiveClass: [{
                type: Input
            }], stickyOffset: [{
                type: Input
            }], stickyBoundary: [{
                type: Input
            }], active: [{
                type: Output
            }], inactive: [{
                type: Output
            }], startInactive: [{
                type: Output
            }] } });

class MdbStickyModule {
}
MdbStickyModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbStickyModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbStickyModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbStickyModule, declarations: [MdbStickyDirective], imports: [CommonModule], exports: [MdbStickyDirective] });
MdbStickyModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbStickyModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbStickyModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [MdbStickyDirective],
                    exports: [MdbStickyDirective],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MdbStickyDirective, MdbStickyModule };
//# sourceMappingURL=mdb-angular-ui-kit-sticky.mjs.map
