import { Directive, EventEmitter, Input, Output, } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
// tslint:disable-next-line:component-class-suffix
export class MdbStickyDirective {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RpY2t5LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9zdGlja3kvc3RpY2t5LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsU0FBUyxFQUVULFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxHQUVQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFjM0Msa0RBQWtEO0FBQ2xELE1BQU0sT0FBTyxrQkFBa0I7SUFpRjdCLFlBQ1UsV0FBdUIsRUFDdkIsU0FBb0IsRUFDcEIsT0FBZTtRQUZmLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3ZCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQTNCZixXQUFNLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDaEQsYUFBUSxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2xELGtCQUFhLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFekQsaUJBQVksR0FBRyxDQUFDLENBQUM7UUFDakIseUJBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQzdCLHFCQUFnQixHQUF1QixNQUFNLENBQUM7UUFDOUMsaUJBQVksR0FBRyxDQUFDLENBQUM7UUFDakIsb0JBQWUsR0FBc0IsS0FBSyxDQUFDO1FBRTNDLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBS2xCLDJCQUFzQixHQUEyQixFQUFFLENBQUM7UUFDcEQsZUFBVSxHQUFHLENBQUMsQ0FBQztRQUVmLHNCQUFpQixHQUFHLENBQUMsQ0FBQztRQUU5QixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRVQsY0FBUyxHQUFrQixJQUFJLE9BQU8sRUFBUSxD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LEVBQUUsYUFBYTtvQkFDdkIsUUFBUSxFQUFFLFdBQVc7aUJBQ3RCOzhJQUlLLFdBQVc7c0JBRGQsS0FBSztnQkFTRixlQUFlO3NCQURsQixLQUFLO2dCQVNGLFdBQVc7c0JBRGQsS0FBSztnQkFTRixjQUFjO3NCQURqQixLQUFLO2dCQVNGLGlCQUFpQjtzQkFEcEIsS0FBSztnQkFTRixZQUFZO3NCQURmLEtBQUs7Z0JBU0YsY0FBYztzQkFEakIsS0FBSztnQkFRSSxNQUFNO3NCQUFmLE1BQU07Z0JBQ0csUUFBUTtzQkFBakIsTUFBTTtnQkFDRyxhQUFhO3NCQUF0QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1xuICBNZGJTdGlja3lQb3NpdGlvbixcbiAgTWRiU3RpY2t5RGlyZWN0aW9uLFxuICBNZGJTdGlja3lPZmZzZXQsXG4gIE1kYlN0aWNreUVsZW1lbnRTdHlsZXMsXG4gIE1kYlN0aWNreVN0eWxlcyxcbn0gZnJvbSAnLi9zdGlja3kudHlwZXMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdbbWRiU3RpY2t5XScsXG4gIGV4cG9ydEFzOiAnbWRiU3RpY2t5Jyxcbn0pXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LWNsYXNzLXN1ZmZpeFxuZXhwb3J0IGNsYXNzIE1kYlN0aWNreURpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpXG4gIGdldCBzdGlja3lNZWRpYSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9zdGlja3lNZWRpYTtcbiAgfVxuICBzZXQgc3RpY2t5TWVkaWEodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX3N0aWNreU1lZGlhID0gdmFsdWU7XG4gIH1cblxuICBASW5wdXQoKVxuICBnZXQgc3RpY2t5RGlyZWN0aW9uKCk6IE1kYlN0aWNreURpcmVjdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMuX3N0aWNreURpcmVjdGlvbjtcbiAgfVxuICBzZXQgc3RpY2t5RGlyZWN0aW9uKHZhbHVlOiBNZGJTdGlja3lEaXJlY3Rpb24pIHtcbiAgICB0aGlzLl9zdGlja3lEaXJlY3Rpb24gPSB2YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIGdldCBzdGlja3lEZWxheSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9zdGlja3lEZWxheTtcbiAgfVxuICBzZXQgc3RpY2t5RGVsYXkodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX3N0aWNreURlbGF5ID0gdmFsdWU7XG4gIH1cblxuICBASW5wdXQoKVxuICBnZXQgc3RpY2t5UG9zaXRpb24oKTogTWRiU3RpY2t5UG9zaXRpb24ge1xuICAgIHJldHVybiB0aGlzLl9zdGlja3lQb3NpdGlvbjtcbiAgfVxuICBzZXQgc3RpY2t5UG9zaXRpb24odmFsdWU6IE1kYlN0aWNreVBvc2l0aW9uKSB7XG4gICAgdGhpcy5fc3RpY2t5UG9zaXRpb24gPSB2YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIGdldCBzdGlja3lBY3RpdmVDbGFzcygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9zdGlja3lBY3RpdmVDbGFzcztcbiAgfVxuICBzZXQgc3RpY2t5QWN0aXZlQ2xhc3ModmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX3N0aWNreUFjdGl2ZUNsYXNzID0gdmFsdWU7XG4gIH1cblxuICBASW5wdXQoKVxuICBnZXQgc3RpY2t5T2Zmc2V0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3N0aWNreU9mZnNldDtcbiAgfVxuICBzZXQgc3RpY2t5T2Zmc2V0KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9zdGlja3lPZmZzZXQgPSB2YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIGdldCBzdGlja3lCb3VuZGFyeSgpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX3N0aWNreUJvdW5kYXJ5O1xuICB9XG4gIHNldCBzdGlja3lCb3VuZGFyeSh2YWx1ZTogSFRNTEVsZW1lbnQpIHtcbiAgICB0aGlzLl9zdGlja3lCb3VuZGFyeSA9IHZhbHVlO1xuICB9XG5cbiAgQE91dHB1dCgpIGFjdGl2ZTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgaW5hY3RpdmU6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHN0YXJ0SW5hY3RpdmU6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcml2YXRlIF9zdGlja3lNZWRpYSA9IDA7XG4gIHByaXZhdGUgX21hbnVhbGx5RGVhY3RpdmF0ZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfc3RpY2t5RGlyZWN0aW9uOiBNZGJTdGlja3lEaXJlY3Rpb24gPSAnZG93bic7XG4gIHByaXZhdGUgX3N0aWNreURlbGF5ID0gMDtcbiAgcHJpdmF0ZSBfc3RpY2t5UG9zaXRpb246IE1kYlN0aWNreVBvc2l0aW9uID0gJ3RvcCc7XG4gIHByaXZhdGUgX3N0aWNreUFjdGl2ZUNsYXNzOiBzdHJpbmc7XG4gIHByaXZhdGUgX3N0aWNreU9mZnNldCA9IDA7XG4gIHByaXZhdGUgX3N0aWNreUJvdW5kYXJ5OiBIVE1MRWxlbWVudDtcblxuICBwcml2YXRlIF9zY3JvbGxEaXJlY3Rpb246IHN0cmluZztcbiAgcHJpdmF0ZSBfcHVzaFBvaW50OiBudW1iZXI7XG4gIHByaXZhdGUgX2VsZW1lbnRQb3NpdGlvblN0eWxlczogTWRiU3RpY2t5RWxlbWVudFN0eWxlcyA9IHt9O1xuICBwcml2YXRlIF9zY3JvbGxUb3AgPSAwO1xuICBwcml2YXRlIF9oaWRkZW5FbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfZWxlbWVudE9mZnNldFRvcCA9IDA7XG5cbiAgaXNTdGlja2VkID0gZmFsc2U7XG5cbiAgcmVhZG9ubHkgX2Rlc3Ryb3kkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmVcbiAgKSB7fVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgZnJvbUV2ZW50KHdpbmRvdywgJ3Jlc2l6ZScpXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95JCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuX3VwZGF0ZUVsZW1lbnRQb3NpdGlvbigpO1xuICAgICAgICAgIHRoaXMuX3VwZGF0ZUVsZW1lbnRPZmZzZXQoKTtcbiAgICAgICAgfSk7XG4gICAgICBmcm9tRXZlbnQod2luZG93LCAnc2Nyb2xsJylcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kkKSlcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDw9IHRoaXMuc3RpY2t5TWVkaWEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5fbWFudWFsbHlEZWFjdGl2YXRlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGRvYyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgICBjb25zdCBzY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jLnNjcm9sbFRvcDtcblxuICAgICAgICAgIHRoaXMuX3VwZGF0ZUVsZW1lbnRPZmZzZXQoKTtcbiAgICAgICAgICB0aGlzLl91cGRhdGVQdXNoUG9pbnQoKTtcbiAgICAgICAgICB0aGlzLl91cGRhdGVTY3JvbGxEaXJlY3Rpb24oc2Nyb2xsVG9wKTtcblxuICAgICAgICAgIGNvbnN0IGlzQ29ycmVjdFNjcm9sbERpcmVjdGlvbiA9IFt0aGlzLl9zY3JvbGxEaXJlY3Rpb24sICdib3RoJ10uaW5jbHVkZXMoXG4gICAgICAgICAgICB0aGlzLnN0aWNreURpcmVjdGlvblxuICAgICAgICAgICk7XG4gICAgICAgICAgY29uc3QgaXNQdXNoUG9pbnRSZWFjaGVkID0gdGhpcy5fcHVzaFBvaW50IDw9IHNjcm9sbFRvcDtcblxuICAgICAgICAgIGNvbnN0IHNob3VsZEJlU3RpY2t5ID0gaXNQdXNoUG9pbnRSZWFjaGVkICYmICF0aGlzLmlzU3RpY2tlZCAmJiBpc0NvcnJlY3RTY3JvbGxEaXJlY3Rpb247XG4gICAgICAgICAgY29uc3Qgc2hvdWxkTm90QmVTdGlja3kgPVxuICAgICAgICAgICAgKCFpc1B1c2hQb2ludFJlYWNoZWQgfHwgIWlzQ29ycmVjdFNjcm9sbERpcmVjdGlvbikgJiYgdGhpcy5pc1N0aWNrZWQ7XG5cbiAgICAgICAgICBpZiAoc2hvdWxkQmVTdGlja3kpIHtcbiAgICAgICAgICAgIHRoaXMuX2NyZWF0ZUhpZGRlbkVsZW1lbnQoKTtcbiAgICAgICAgICAgIHRoaXMuX2VuYWJsZVN0aWNreSgpO1xuICAgICAgICAgICAgdGhpcy5fY2hhbmdlQm91bmRhcnlQb3NpdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5pc1N0aWNrZWQgPSB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzaG91bGROb3RCZVN0aWNreSkge1xuICAgICAgICAgICAgdGhpcy5fZGlzYWJsZVN0aWNreSgpO1xuICAgICAgICAgICAgdGhpcy5pc1N0aWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5pc1N0aWNrZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVBvc2l0aW9uKHRoaXMuX2VsZW1lbnRQb3NpdGlvblN0eWxlcyk7XG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VCb3VuZGFyeVBvc2l0aW9uKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5fc2Nyb2xsVG9wID0gc2Nyb2xsVG9wIDw9IDAgPyAwIDogc2Nyb2xsVG9wO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX2Rlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLl9kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlRWxlbWVudE9mZnNldCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5faGlkZGVuRWxlbWVudCkge1xuICAgICAgdGhpcy5fZWxlbWVudE9mZnNldFRvcCA9IHRoaXMuX2hpZGRlbkVsZW1lbnQub2Zmc2V0VG9wO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9lbGVtZW50T2Zmc2V0VG9wID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm9mZnNldFRvcDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVQdXNoUG9pbnQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc3RpY2t5UG9zaXRpb24gPT09ICd0b3AnKSB7XG4gICAgICB0aGlzLl9wdXNoUG9pbnQgPSB0aGlzLl9lbGVtZW50T2Zmc2V0VG9wIC0gdGhpcy5zdGlja3lEZWxheTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcHVzaFBvaW50ID1cbiAgICAgICAgdGhpcy5fZWxlbWVudE9mZnNldFRvcCArXG4gICAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5oZWlnaHQgLVxuICAgICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCArXG4gICAgICAgIHRoaXMuc3RpY2t5RGVsYXk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlU2Nyb2xsRGlyZWN0aW9uKHNjcm9sbFRvcDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHNjcm9sbFRvcCA+IHRoaXMuX3Njcm9sbFRvcCkge1xuICAgICAgdGhpcy5fc2Nyb2xsRGlyZWN0aW9uID0gJ2Rvd24nO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zY3JvbGxEaXJlY3Rpb24gPSAndXAnO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUhpZGRlbkVsZW1lbnQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9oaWRkZW5FbGVtZW50KSB7XG4gICAgICB0aGlzLl9oaWRkZW5FbGVtZW50ID0gdGhpcy5fY29weUVsZW1lbnQodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jb3B5RWxlbWVudChpdGVtVG9Db3B5OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcbiAgICBjb25zdCB7IGhlaWdodCwgd2lkdGggfSA9IGl0ZW1Ub0NvcHkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgQ09QSUVEX0lURU0gPSBpdGVtVG9Db3B5LmNsb25lTm9kZShmYWxzZSkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgQ09QSUVEX0lURU0uaGlkZGVuID0gdHJ1ZTtcblxuICAgIHRoaXMuX3NldFN0eWxlKENPUElFRF9JVEVNLCB7XG4gICAgICBoZWlnaHQ6IGAke2hlaWdodH1weGAsXG4gICAgICB3aWR0aDogYCR7d2lkdGh9cHhgLFxuICAgICAgb3BhY2l0eTogJzAnLFxuICAgIH0pO1xuXG4gICAgaXRlbVRvQ29weS5wYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZShDT1BJRURfSVRFTSwgaXRlbVRvQ29weSk7XG5cbiAgICByZXR1cm4gQ09QSUVEX0lURU07XG4gIH1cblxuICBwcml2YXRlIF9zZXRTdHlsZShlbGVtZW50OiBIVE1MRWxlbWVudCwgc3R5bGVzOiBNZGJTdGlja3lTdHlsZXMpOiB2b2lkIHtcbiAgICBPYmplY3Qua2V5cyhzdHlsZXMpLmZvckVhY2goKHN0eWxlKSA9PiB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShlbGVtZW50LCBzdHlsZSwgc3R5bGVzW3N0eWxlXSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9lbmFibGVTdGlja3koKTogdm9pZCB7XG4gICAgY29uc3QgeyBoZWlnaHQsIGxlZnQsIHdpZHRoIH0gPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICB0aGlzLl90b2dnbGVDbGFzcyh0aGlzLnN0aWNreUFjdGl2ZUNsYXNzLCAnJywgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcblxuICAgIHRoaXMuX3NldFN0eWxlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwge1xuICAgICAgdG9wOiB0aGlzLnN0aWNreVBvc2l0aW9uID09PSAndG9wJyAmJiBgJHswICsgdGhpcy5zdGlja3lPZmZzZXR9cHhgLFxuICAgICAgYm90dG9tOiB0aGlzLnN0aWNreVBvc2l0aW9uID09PSAnYm90dG9tJyAmJiBgJHswICsgdGhpcy5zdGlja3lPZmZzZXR9cHhgLFxuICAgICAgaGVpZ2h0OiBgJHtoZWlnaHR9cHhgLFxuICAgICAgd2lkdGg6IGAke3dpZHRofXB4YCxcbiAgICAgIGxlZnQ6IGAke2xlZnR9cHhgLFxuICAgICAgekluZGV4OiAnMTAwJyxcbiAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxuICAgIH0pO1xuXG4gICAgdGhpcy5faGlkZGVuRWxlbWVudC5oaWRkZW4gPSBmYWxzZTtcblxuICAgIHRoaXMuYWN0aXZlLmVtaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3RvZ2dsZUNsYXNzKGFkZENsYXNzOiBzdHJpbmcsIHJlbW92ZUNsYXNzOiBzdHJpbmcsIHRhcmdldDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBpZiAoYWRkQ2xhc3MpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRhcmdldCwgYWRkQ2xhc3MpO1xuICAgIH1cblxuICAgIGlmIChyZW1vdmVDbGFzcykge1xuICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGFyZ2V0LCByZW1vdmVDbGFzcyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY2hhbmdlQm91bmRhcnlQb3NpdGlvbigpOiB2b2lkIHtcbiAgICBjb25zdCB7IGhlaWdodCB9ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHBhcmVudE9mZnNldCA9IHtcbiAgICAgIGhlaWdodDogdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0LFxuICAgICAgLi4udGhpcy5fZ2V0T2Zmc2V0KHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50KSxcbiAgICB9O1xuXG4gICAgbGV0IHN0b3BQb2ludDogbnVtYmVyO1xuXG4gICAgaWYgKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50ID09PSB0aGlzLnN0aWNreUJvdW5kYXJ5KSB7XG4gICAgICBzdG9wUG9pbnQgPVxuICAgICAgICBwYXJlbnRPZmZzZXQuaGVpZ2h0ICsgcGFyZW50T2Zmc2V0W3RoaXMuc3RpY2t5UG9zaXRpb25dIC0gaGVpZ2h0IC0gdGhpcy5zdGlja3lPZmZzZXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0b3BQb2ludCA9IHRoaXMuX2dldE9mZnNldCh0aGlzLnN0aWNreUJvdW5kYXJ5KS50b3AgLSBoZWlnaHQgLSB0aGlzLnN0aWNreU9mZnNldDtcbiAgICB9XG5cbiAgICBjb25zdCBpc1N0aWNreVRvcCA9IHRoaXMuc3RpY2t5UG9zaXRpb24gPT09ICd0b3AnO1xuICAgIGNvbnN0IGlzU3RpY2t5Qm90dG9tID0gdGhpcy5zdGlja3lQb3NpdGlvbiA9PT0gJ2JvdHRvbSc7XG4gICAgY29uc3QgaXNCZWxvd1N0b3BQb2ludCA9IHN0b3BQb2ludCA8IDA7XG4gICAgY29uc3QgaXNCZWxvd1BhcmVudEVsZW1lbnRFbmQgPSBzdG9wUG9pbnQgPiBwYXJlbnRPZmZzZXQuaGVpZ2h0IC0gaGVpZ2h0O1xuICAgIGxldCBlbGVtZW50U3R5bGU6IE1kYlN0aWNreVN0eWxlcztcblxuICAgIGlmIChpc1N0aWNreVRvcCkge1xuICAgICAgaWYgKGlzQmVsb3dTdG9wUG9pbnQpIHtcbiAgICAgICAgZWxlbWVudFN0eWxlID0geyB0b3A6IGAke3RoaXMuc3RpY2t5T2Zmc2V0ICsgc3RvcFBvaW50fXB4YCB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudFN0eWxlID0geyB0b3A6IGAke3RoaXMuc3RpY2t5T2Zmc2V0ICsgMH1weGAgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaXNTdGlja3lCb3R0b20pIHtcbiAgICAgIGlmIChpc0JlbG93U3RvcFBvaW50KSB7XG4gICAgICAgIGVsZW1lbnRTdHlsZSA9IHsgYm90dG9tOiBgJHt0aGlzLnN0aWNreU9mZnNldCArIHN0b3BQb2ludH1weGAgfTtcbiAgICAgIH0gZWxzZSBpZiAoaXNCZWxvd1BhcmVudEVsZW1lbnRFbmQpIHtcbiAgICAgICAgZWxlbWVudFN0eWxlID0geyBib3R0b206IGAke3RoaXMuc3RpY2t5T2Zmc2V0ICsgcGFyZW50T2Zmc2V0LmJvdHRvbX1weGAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnRTdHlsZSA9IHsgYm90dG9tOiBgJHt0aGlzLnN0aWNreU9mZnNldCArIDB9cHhgIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5fc2V0U3R5bGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBlbGVtZW50U3R5bGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0T2Zmc2V0KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogTWRiU3RpY2t5T2Zmc2V0IHtcbiAgICBjb25zdCByZWN0RWxlbWVudCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3Qgb2Zmc2V0RWxlbWVudCA9IHtcbiAgICAgIHRvcDogcmVjdEVsZW1lbnQudG9wICsgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AsXG4gICAgICBsZWZ0OiByZWN0RWxlbWVudC5sZWZ0ICsgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0LFxuICAgIH07XG5cbiAgICBjb25zdCBib3R0b20gPVxuICAgICAgb2Zmc2V0RWxlbWVudC5sZWZ0ID09PSAwICYmIG9mZnNldEVsZW1lbnQudG9wID09PSAwXG4gICAgICAgID8gMFxuICAgICAgICA6IHdpbmRvdy5pbm5lckhlaWdodCAtIHJlY3RFbGVtZW50LmJvdHRvbTtcblxuICAgIHJldHVybiB7XG4gICAgICAuLi5vZmZzZXRFbGVtZW50LFxuICAgICAgYm90dG9tLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIF9kaXNhYmxlU3RpY2t5KCk6IHZvaWQge1xuICAgIHRoaXMuc3RhcnRJbmFjdGl2ZS5lbWl0KCk7XG5cbiAgICBjb25zdCBhbmltYXRpb25EdXJhdGlvbiA9IHBhcnNlRmxvYXQoXG4gICAgICBnZXRDb21wdXRlZFN0eWxlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkuYW5pbWF0aW9uRHVyYXRpb25cbiAgICApO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLl9yZXNldFN0eWxlcygpO1xuICAgICAgdGhpcy5fcmVtb3ZlSGlkZGVuRWxlbWVudCgpO1xuICAgICAgdGhpcy5fdG9nZ2xlQ2xhc3MoJycsIHRoaXMuc3RpY2t5QWN0aXZlQ2xhc3MsIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG5cbiAgICAgIHRoaXMuaW5hY3RpdmUuZW1pdCgpO1xuICAgIH0sIGFuaW1hdGlvbkR1cmF0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Jlc2V0U3R5bGVzKCk6IHZvaWQge1xuICAgIHRoaXMuX3NldFN0eWxlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwge1xuICAgICAgdG9wOiBudWxsLFxuICAgICAgYm90dG9tOiBudWxsLFxuICAgICAgcG9zaXRpb246IG51bGwsXG4gICAgICBsZWZ0OiBudWxsLFxuICAgICAgekluZGV4OiBudWxsLFxuICAgICAgd2lkdGg6IG51bGwsXG4gICAgICBoZWlnaHQ6IG51bGwsXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVIaWRkZW5FbGVtZW50KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5faGlkZGVuRWxlbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2hpZGRlbkVsZW1lbnQucmVtb3ZlKCk7XG4gICAgdGhpcy5faGlkZGVuRWxlbWVudCA9IG51bGw7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVQb3NpdGlvbihzdHlsZXM6IE1kYlN0aWNreVN0eWxlcyk6IHZvaWQge1xuICAgIHRoaXMuX3NldFN0eWxlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgc3R5bGVzKTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUVsZW1lbnRQb3NpdGlvbigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5faGlkZGVuRWxlbWVudCkge1xuICAgICAgY29uc3QgeyBsZWZ0IH0gPSB0aGlzLl9oaWRkZW5FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICB0aGlzLl9lbGVtZW50UG9zaXRpb25TdHlsZXMgPSB7XG4gICAgICAgIGxlZnQ6IGAke2xlZnR9cHhgLFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZWxlbWVudFBvc2l0aW9uU3R5bGVzID0ge307XG4gICAgfVxuXG4gICAgdGhpcy5fc2V0U3R5bGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLl9lbGVtZW50UG9zaXRpb25TdHlsZXMpO1xuICB9XG59XG4iXX0=