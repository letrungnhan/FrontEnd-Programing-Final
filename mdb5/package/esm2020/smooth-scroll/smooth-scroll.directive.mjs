import { DOCUMENT } from '@angular/common';
import { Directive, EventEmitter, HostListener, Inject, Input, Output } from '@angular/core';
import { easingFunctions, } from './easing-functions';
import * as i0 from "@angular/core";
export class MdbSmoothScrollDirective {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21vb3RoLXNjcm9sbC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvc21vb3RoLXNjcm9sbC9zbW9vdGgtc2Nyb2xsLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdGLE9BQU8sRUFDTCxlQUFlLEdBR2hCLE1BQU0sb0JBQW9CLENBQUM7O0FBSzVCLE1BQU0sT0FBTyx3QkFBd0I7SUFxQm5DLFlBQXNDLFNBQWM7UUFBZCxjQUFTLEdBQVQsU0FBUyxDQUFLO1FBbkIzQyxhQUFRLEdBQUcsR0FBRyxDQUFDO1FBQ2YsV0FBTSxHQUEwQixRQUFRLENBQUM7UUFHekMsV0FBTSxHQUFHLENBQUMsQ0FBQztRQUVWLGdCQUFXLEdBQXVCLElBQUksWUFBWSxFQUFRLENBQUM7UUFDM0QsY0FBUyxHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ3pELGlCQUFZLEdBQXVCLElBQUksWUFBWSxFQUFRLENBQUM7UUFTOUQsZ0JBQVcsR0FBRyxLQUFLLENBQUM7SUFFMkIsQ0FBQztJQVJ4RCxPQUFPLENBQUMsS0FBaUI7UUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQU1PLE9BQU87UUFDYixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdkMsTUFBTSxZQUFZLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQztRQUN6QyxNQUFNLFVBQVUsR0FBRyxJ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cEIsTUFBTTtnQkFDRyxTQUFTO3NCQUFsQixNQUFNO2dCQUNHLFlBQVk7c0JBQXJCLE1BQU07Z0JBR1AsT0FBTztzQkFETixZQUFZO3VCQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIEluamVjdCwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgZWFzaW5nRnVuY3Rpb25zLFxuICBNZGJTbW9vdGhTY3JvbGxFYXNpbmcsXG4gIE1kYlNtb290aFNjcm9sbEVhc2luZ0Z1bmN0aW9uLFxufSBmcm9tICcuL2Vhc2luZy1mdW5jdGlvbnMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWRiU21vb3RoU2Nyb2xsXScsXG59KVxuZXhwb3J0IGNsYXNzIE1kYlNtb290aFNjcm9sbERpcmVjdGl2ZSB7XG4gIEBJbnB1dCgpIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XG4gIEBJbnB1dCgpIGR1cmF0aW9uID0gNTAwO1xuICBASW5wdXQoKSBlYXNpbmc6IE1kYlNtb290aFNjcm9sbEVhc2luZyA9ICdsaW5lYXInO1xuICBASW5wdXQoKSBocmVmOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHRhcmdldDogc3RyaW5nO1xuICBASW5wdXQoKSBvZmZzZXQgPSAwO1xuXG4gIEBPdXRwdXQoKSBzY3JvbGxTdGFydDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgc2Nyb2xsRW5kOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSBzY3JvbGxDYW5jZWw6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIG9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuX3Njcm9sbCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaXNDYW5jZWxlZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnkpIHt9XG5cbiAgcHJpdmF0ZSBfc2Nyb2xsKCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuX2dldENvbnRhaW5lcigpO1xuICAgIGNvbnN0IHBvc2l0aW9uRnJvbSA9IGNvbnRhaW5lci5zY3JvbGxUb3A7XG4gICAgY29uc3QgcG9zaXRpb25UbyA9IHRoaXMuX2dldERpc3RhbmNlKCk7XG4gICAgY29uc3QgcHJvZ3Jlc3MgPSAwO1xuICAgIGNvbnN0IHNwZWVkID0gMSAvIHRoaXMuZHVyYXRpb247XG4gICAgLy8gVGhhbmtzIHRvIHRoaXMgdmFsdWUgdGltZSBvZiBzY3JvbGxpbmcgaXMgYWxtb3N0IGVxdWFsIHRvIHZhbHVlIHdoaWNoIHVzZXIgc2V0XG4gICAgY29uc3Qgc3RlcCA9IDQuMjU7XG4gICAgY29uc3QgZWFzaW5nID0gZWFzaW5nRnVuY3Rpb25zW3RoaXMuZWFzaW5nXTtcblxuICAgIHRoaXMuc2Nyb2xsU3RhcnQuZW1pdCgpO1xuXG4gICAgLy8gSWYgZWxlbWVudCBpcyBoaWRkZW4gaW4gYSBjb250YWluZXIgd2hpY2ggaXMgbm90IHZpc2libGUgaW4gdmlld3BvcnQsXG4gICAgLy8gc2Nyb2xsIHRvIHRoZSBjb250YWluZXIgZmlyc3QsIHRoZW4gc2Nyb2xsIHRvIHRoZSBlbGVtZW50XG4gICAgaWYgKCF0aGlzLl9pc0luVmlld3BvcnQoKSkge1xuICAgICAgdGhpcy5fc2Nyb2xsT25OZXh0VGljayhcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LFxuICAgICAgICB0aGlzLl9kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wLFxuICAgICAgICBjb250YWluZXIub2Zmc2V0VG9wLFxuICAgICAgICBwcm9ncmVzcyxcbiAgICAgICAgc3BlZWQsXG4gICAgICAgIHN0ZXAsXG4gICAgICAgIGVhc2luZ1xuICAgICAgKTtcblxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuX3Njcm9sbE9uTmV4dFRpY2soY29udGFpbmVyLCBwb3NpdGlvbkZyb20sIHBvc2l0aW9uVG8sIHByb2dyZXNzLCBzcGVlZCwgc3RlcCwgZWFzaW5nKTtcbiAgICAgICAgdGhpcy5faXNDYW5jZWxlZCA9IGZhbHNlO1xuICAgICAgfSwgdGhpcy5kdXJhdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3Njcm9sbE9uTmV4dFRpY2soY29udGFpbmVyLCBwb3NpdGlvbkZyb20sIHBvc2l0aW9uVG8sIHByb2dyZXNzLCBzcGVlZCwgc3RlcCwgZWFzaW5nKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zY3JvbGxPbk5leHRUaWNrKFxuICAgIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsXG4gICAgcG9zaXRpb25Gcm9tOiBudW1iZXIsXG4gICAgcG9zaXRpb25UbzogbnVtYmVyLFxuICAgIHByb2dyZXNzOiBudW1iZXIsXG4gICAgc3BlZWQ6IG51bWJlcixcbiAgICBzdGVwOiBudW1iZXIsXG4gICAgZWFzaW5nOiBNZGJTbW9vdGhTY3JvbGxFYXNpbmdGdW5jdGlvblxuICApIHtcbiAgICBjb25zdCBuZWdhdGl2ZVByb2dyZXNzID0gcHJvZ3Jlc3MgPCAwO1xuICAgIGNvbnN0IHNjcm9sbEVuZCA9IHByb2dyZXNzID4gMTtcbiAgICBjb25zdCBuZWdhdGl2ZVNwZWVkID0gc3BlZWQgPCAwO1xuICAgIGNvbnN0IHNjcm9sbENvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyID8gdGhpcy5jb250YWluZXIgOiB3aW5kb3c7XG5cbiAgICBpZiAobmVnYXRpdmVQcm9ncmVzcyB8fCBzY3JvbGxFbmQgfHwgbmVnYXRpdmVTcGVlZCB8fCB0aGlzLl9pc0NhbmNlbGVkKSB7XG4gICAgICBpZiAodGhpcy5faXNDYW5jZWxlZCkge1xuICAgICAgICBpZiAodGhpcy5faXNJblZpZXdwb3J0KCkpIHtcbiAgICAgICAgICB0aGlzLl9pc0NhbmNlbGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zY3JvbGxDYW5jZWwuZW1pdCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLnNjcm9sbEVuZC5lbWl0KCk7XG4gICAgICBjb250YWluZXIuc2Nyb2xsVG9wID0gcG9zaXRpb25UbztcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzY3JvbGxDb250YWluZXIuc2Nyb2xsVG8oe1xuICAgICAgdG9wOiBwb3NpdGlvbkZyb20gLSAocG9zaXRpb25Gcm9tIC0gcG9zaXRpb25UbykgKiBlYXNpbmcocHJvZ3Jlc3MpLFxuICAgIH0pO1xuXG4gICAgcHJvZ3Jlc3MgKz0gc3BlZWQgKiBzdGVwO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLl9zY3JvbGxPbk5leHRUaWNrKGNvbnRhaW5lciwgcG9zaXRpb25Gcm9tLCBwb3NpdGlvblRvLCBwcm9ncmVzcywgc3BlZWQsIHN0ZXAsIGVhc2luZyk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRDb250YWluZXIoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmNvbnRhaW5lciA/IHRoaXMuY29udGFpbmVyIDogdGhpcy5fZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0VGFyZ2V0KCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5fZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmhyZWYpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0RGlzdGFuY2UoKTogbnVtYmVyIHtcbiAgICBsZXQgZGlzdGFuY2U6IG51bWJlcjtcbiAgICBjb25zdCB0YXJnZXQgPSB0aGlzLl9nZXRUYXJnZXQoKTtcblxuICAgIGlmICghdGhpcy5jb250YWluZXIpIHtcbiAgICAgIGRpc3RhbmNlID0gdGhpcy5fZ2V0RGlzdGFuY2VGb3JXaW5kb3codGFyZ2V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlzdGFuY2UgPSB0aGlzLl9nZXREaXN0YW5jZUZvckNvbnRhaW5lcih0YXJnZXQpO1xuICAgIH1cblxuICAgIHJldHVybiBkaXN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldERpc3RhbmNlRm9yV2luZG93KHRhcmdldDogSFRNTEVsZW1lbnQpOiBudW1iZXIge1xuICAgIGNvbnN0IGRpc3RhbmNlRnJvbVRvcCA9IHRoaXMuX2RvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gICAgY29uc3QgdGFyZ2V0VG9wID0gdGhpcy5fZ2V0RWxlbWVudFRvcE9mZnNldCh0YXJnZXQpO1xuICAgIGNvbnN0IG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuXG4gICAgcmV0dXJuIHRhcmdldFRvcCAtIG9mZnNldCArIGRpc3RhbmNlRnJvbVRvcDtcbiAgfVxuXG4gIHByaXZhdGUgX2dldEVsZW1lbnRUb3BPZmZzZXQodGFyZ2V0OiBIVE1MRWxlbWVudCk6IG51bWJlciB7XG4gICAgY29uc3QgcmVjdCA9IHRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIHJldHVybiByZWN0LnRvcCArIHRoaXMuX2RvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gIH1cblxuICBwcml2YXRlIF9nZXREaXN0YW5jZUZvckNvbnRhaW5lcih0YXJnZXQ6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcbiAgICBjb25zdCB0YXJnZXRZID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnk7XG4gICAgY29uc3QgY29udGFpbmVyWSA9IHRoaXMuY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnk7XG4gICAgY29uc3QgZGlzdGFuY2VGcm9tVG9wID0gdGhpcy5jb250YWluZXIuc2Nyb2xsVG9wO1xuICAgIGNvbnN0IGRpc3RhbmNlRnJvbUNvbnRhaW5lciA9IHRhcmdldFkgLSBjb250YWluZXJZO1xuICAgIGNvbnN0IG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuXG4gICAgcmV0dXJuIGRpc3RhbmNlRnJvbUNvbnRhaW5lciAtIG9mZnNldCArIGRpc3RhbmNlRnJvbVRvcDtcbiAgfVxuXG4gIHByaXZhdGUgX2lzSW5WaWV3cG9ydCgpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuY29udGFpbmVyKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdCByZWN0ID0gdGhpcy5jb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgY29udGFpbmVyVG9wID0gcmVjdC50b3A7XG4gICAgY29uc3QgY29udGFpbmVyQm90dG9tID0gcmVjdC5ib3R0b207XG5cbiAgICByZXR1cm4gY29udGFpbmVyVG9wID49IDAgJiYgY29udGFpbmVyQm90dG9tIDw9IHRoaXMuX2RvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gIH1cblxuICBjYW5jZWxTY3JvbGwoKTogdm9pZCB7XG4gICAgdGhpcy5faXNDYW5jZWxlZCA9IHRydWU7XG4gIH1cbn1cbiJdfQ==