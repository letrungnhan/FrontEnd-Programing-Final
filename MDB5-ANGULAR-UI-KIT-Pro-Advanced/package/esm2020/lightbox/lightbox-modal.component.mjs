import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { Component, ChangeDetectionStrategy, ViewChild, Inject, forwardRef, HostListener, ViewChildren, } from '@angular/core';
import { fromEvent } from 'rxjs';
import { take } from 'rxjs/operators';
import { MdbLightboxComponent } from './lightbox.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/a11y";
import * as i2 from "@angular/common";
import * as i3 from "./lightbox.component";
export class MdbLightboxModalComponent {
    constructor(_renderer, _elementRef, _cdRef, _focusTrapFactory, _document, _lightbox) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._cdRef = _cdRef;
        this._focusTrapFactory = _focusTrapFactory;
        this._document = _document;
        this.animationState = '';
        this.activeModalImageIndex = 1;
        this._fullscreen = false;
        this._scale = 1;
        this._mousedown = false;
        this._tapCounter = 0;
        this._tapTime = 0;
        this._toolsTimeout = 4000;
        this._doubleTapTimeout = 300;
        this.lightbox = _lightbox;
    }
    onHostMousemove() {
        this._resetToolsToggler();
    }
    onHostKeyup(event) {
        this._onKeyup(event);
    }
    onHostClick(target) {
        this._resetToolsToggler();
        if (target.tagName !== 'DIV') {
            return;
        }
        this.close();
    }
    ngAfterViewInit() {
        this.index = this.lightboxItems.toArray().indexOf(this.activeLightboxItem);
        this.total = this.lightboxItems.toArray().length;
        this._setActiveImageData();
        this._setToolsToggleTimeout();
        this._disableScroll();
        this._previouslyFocusedElement = this._document.activeElement;
        this._focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement);
        this._focusTrap.focusInitialElementWhenReady();
        this._setDefaultAnimationStyle();
        this._preloadInactiveImages();
    }
    ngOnDestroy() {
        this._previouslyFocusedElement.focus();
        this._focusTrap.destroy();
        this._enableScroll();
    }
    get activeImageElement() {
        return this.images.toArray()[this.activeModalImageIndex].nativeElement;
    }
    get activeImageWrapper() {
        return this.imageWrappers.toArray()[this.activeModalImageIndex].nativeElement;
    }
    get nextImageWrapper() {
        if (this.activeModalImageIndex < this.images.length - 1) {
            return this.imageWrappers.toArray()[this.activeModalImageIndex + 1].nativeElement;
        }
        else if ((this.activeModalImageIndex = this.images.length - 1)) {
            return this.imageWrappers.toArray()[0].nativeElement;
        }
    }
    get previousImageWrapper() {
        if (this.activeModalImageIndex > 0) {
            return this.imageWrappers.toArray()[this.activeModalImageIndex - 1].nativeElement;
        }
        else if ((this.activeModalImageIndex = 0)) {
            return this.imageWrappers.toArray()[this.images.length].nativeElement;
        }
    }
    get nextImage() {
        if (this.activeModalImageIndex < this.images.length - 1) {
            return this.images.toArray()[this.activeModalImageIndex + 1].nativeElement;
        }
        else if (this.activeModalImageIndex === this.images.length - 1) {
            return this.images.toArray()[0].nativeElement;
        }
    }
    get previousImage() {
        if (this.activeModalImageIndex > 0) {
            return this.images.toArray()[this.activeModalImageIndex - 1].nativeElement;
        }
        else if (this.activeModalImageIndex === 0) {
            return this.images.toArray()[this.images.length - 1].nativeElement;
        }
    }
    onMousedown(event) {
        const touch = event.touches;
        const x = touch ? touch[0].clientX : event.clientX;
        const y = touch ? touch[0].clientY : event.clientY;
        this._originalPositionX = parseFloat(this.activeImageElement.style.left) || 0;
        this._originalPositionY = parseFloat(this.activeImageElement.style.top) || 0;
        this._positionX = this._originalPositionX;
        this._positionY = this._originalPositionY;
        this._mousedownPositionX = x * (1 / this._scale) - this._positionX;
        this._mousedownPositionY = y * (1 / this._scale) - this._positionY;
        this._mousedown = true;
    }
    onMousemove(event) {
        if (!this._mousedown)
            return;
        const touch = event.touches;
        const x = touch ? touch[0].clientX : event.clientX;
        const y = touch ? touch[0].clientY : event.clientY;
        if (touch)
            this._resetToolsToggler();
        if (this._scale !== 1) {
            this._positionX = x * (1 / this._scale) - this._mousedownPositionX;
            this._positionY = y * (1 / this._scale) - this._mousedownPositionY;
            this._renderer.setStyle(this.activeImageElement, 'left', `${this._positionX}px`);
            this._renderer.setStyle(this.activeImageElement, 'top', `${this._positionY}px`);
        }
        else {
            if (this.total <= 1)
                return;
            this._positionX = x * (1 / this._scale) - this._mousedownPositionX;
            this._renderer.setStyle(this.activeImageElement, 'left', `${this._positionX}px`);
        }
    }
    onMouseup(event) {
        this._mousedown = false;
        this._moveImg(event.target);
        this._checkDoubleTap(event);
    }
    zoom() {
        if (this._scale === 1) {
            this.zoomIn();
        }
        else {
            this.zoomOut();
        }
    }
    close() {
        this._renderer.setStyle(this.activeImageWrapper, 'transform', 'scale(0.25)');
        this._renderer.setStyle(this.activeImageWrapper, 'opacity', 0);
        this.lightbox.close();
    }
    toggleFullscreen() {
        if (this._fullscreen === false) {
            this._renderer.addClass(this.btnFullsreen.nativeElement, 'active');
            if (this._elementRef.nativeElement.requestFullscreen) {
                this._elementRef.nativeElement.requestFullscreen();
            }
            this._fullscreen = true;
        }
        else {
            this._renderer.removeClass(this.btnFullsreen.nativeElement, 'active');
            if (this._document.exitFullscreen) {
                this._document.exitFullscreen();
            }
            this._fullscreen = false;
        }
    }
    _setDefaultAnimationStyle() {
        this.imageWrappers.toArray().forEach((wrapper, index) => {
            if (index === this.activeModalImageIndex) {
                return;
            }
            const isNextWrapper = index > this.index;
            this._renderer.setStyle(wrapper.nativeElement, 'left', isNextWrapper ? '-100%' : '100%');
            this._renderer.setStyle(wrapper.nativeElement, 'transform', 'scale(0.25)');
        });
    }
    _preloadInactiveImages() {
        const nextIndex = this.index < this.lightboxItems.toArray().length - 1 ? this.index + 1 : 0;
        const previousIndex = this.index > 0 ? this.index - 1 : this.lightboxItems.toArray().length - 1;
        this.previousImage.src =
            this.lightboxItems.toArray()[previousIndex].img ||
                this.lightboxItems.toArray()[previousIndex].el.nativeElement.src;
        this.previousImage.alt = this.lightboxItems.toArray()[previousIndex].el.nativeElement.alt;
        this.nextImage.src =
            this.lightboxItems.toArray()[nextIndex].img ||
                this.lightboxItems.toArray()[nextIndex].el.nativeElement.src;
        this.nextImage.alt = this.lightboxItems.toArray()[nextIndex].el.nativeElement.alt;
    }
    _onKeyup(event) {
        this._resetToolsToggler();
        switch (event.key) {
            case 'ArrowRight':
                this.slide();
                break;
            case 'ArrowLeft':
                this.slide('left');
                break;
            case 'Escape':
                this.close();
                break;
            case 'Home':
                this.slide('first');
                break;
            case 'End':
                this.slide('last');
                break;
            case 'ArrowUp':
                this.zoomIn();
                break;
            case 'ArrowDown':
                this.zoomOut();
                break;
            default:
                break;
        }
    }
    _moveImg(target) {
        if (this._scale !== 1 || target !== this.activeImageElement || this.lightboxItems.length <= 1) {
            return;
        }
        const movement = this._positionX - this._originalPositionX;
        if (movement > 0) {
            this.slide('left');
        }
        else if (movement < 0) {
            this.slide();
        }
    }
    _setActiveImageData() {
        this.activeImageElement.src =
            this.activeLightboxItem.img || this.activeLightboxItem.el.nativeElement.src;
        this.activeImageElement.alt = this.activeLightboxItem.el.nativeElement.alt;
    }
    _setNewPositionOnZoomIn(event) {
        clearTimeout(this._zoomTimer);
        this._positionX = window.innerWidth / 2 - event.offsetX - 50;
        this._positionY = window.innerHeight / 2 - event.offsetY - 50;
        this._renderer.setStyle(this.activeImageElement, 'transition', 'all 0.5s ease-out');
        this._renderer.setStyle(this.activeImageElement, 'left', `${this._positionX}px`);
        this._renderer.setStyle(this.activeImageElement, 'top', `${this._positionY}px`);
        this._zoomTimer = setTimeout(() => {
            this._renderer.setStyle(this.activeImageElement, 'transition', 'none');
        }, 500);
    }
    _resetToolsToggler() {
        this.toggleToolbar(1);
        clearTimeout(this._toolsToggleTimer);
        this._setToolsToggleTimeout();
    }
    toggleToolbar(opacity) {
        this._renderer.setStyle(this.galleryToolbar.nativeElement, 'opacity', opacity);
        this._renderer.setStyle(this.leftArrow.nativeElement, 'opacity', opacity);
        this._renderer.setStyle(this.rightArrow.nativeElement, 'opacity', opacity);
    }
    _setToolsToggleTimeout() {
        this._toolsToggleTimer = setTimeout(() => {
            this.toggleToolbar(0);
            clearTimeout(this._toolsToggleTimer);
        }, this._toolsTimeout);
    }
    onWheel(event) {
        if (event.deltaY > 0) {
            this.zoomOut();
        }
        else {
            if (this._scale >= 3)
                return;
            this._setNewPositionOnZoomIn(event);
            this.zoomIn();
        }
    }
    zoomIn() {
        if (this._scale >= 3) {
            return;
        }
        this.lightbox.lightboxZoomIn.emit();
        this._scale += this.zoomLevel;
        this._renderer.setStyle(this.activeImageWrapper, 'transform', `scale(${this._scale})`);
        this._updateZoomBtn();
        this.lightbox.lightboxZoomedIn.emit();
    }
    zoomOut() {
        if (this._scale <= 1) {
            return;
        }
        this.lightbox.lightboxZoomOut.emit();
        this._scale -= this.zoomLevel;
        this._renderer.setStyle(this.activeImageWrapper, 'transform', `scale(${this._scale})`);
        this._updateZoomBtn();
        this._updateImgPosition();
        this.lightbox.lightboxZoomedOut.emit();
    }
    slide(target = 'right') {
        if (this.lightboxItems.length <= 1) {
            return;
        }
        this.lightbox.lightboxSlide.emit();
        if (target === 'right' || target === 'first') {
            this.slideRight = true;
        }
        else {
            this.slideRight = false;
        }
        clearTimeout(this._slideTimer);
        this._renderer.setStyle(this.activeImageWrapper, 'transform', 'scale(0.25)');
        this._renderer.setStyle(this.activeImageWrapper, 'left', this.slideRight ? '-100%' : '100%');
        if (target === 'right' || target === 'first') {
            this.slideRight = true;
        }
        else {
            this.slideRight = false;
        }
        clearTimeout(this._slideTimer);
        this._renderer.setStyle(this.activeImageWrapper, 'transform', 'scale(0.25)');
        this._renderer.setStyle(this.activeImageWrapper, 'left', this.slideRight ? '-100%' : '100%');
        switch (target) {
            case 'right':
                this.index + 1 === this.total ? (this.index = 0) : (this.index += 1);
                this.activeModalImageIndex + 1 === this.imageWrappers.length
                    ? (this.activeModalImageIndex = 0)
                    : (this.activeModalImageIndex += 1);
                break;
            case 'left':
                this.index - 1 < 0 ? (this.index = this.total - 1) : (this.index -= 1);
                this.activeModalImageIndex - 1 < 0
                    ? (this.activeModalImageIndex = this.imageWrappers.length - 1)
                    : (this.activeModalImageIndex -= 1);
                break;
            case 'first':
                this.index = 0;
                this.activeModalImageIndex = 0;
                break;
            case 'last':
                this.index = this.lightboxItems.length - 1;
                this.activeModalImageIndex = 2;
                break;
            default:
                break;
        }
        this._updateActiveLightboxItem();
        this._preloadInactiveImages();
        if (this.activeImageElement.src) {
            return;
        }
        fromEvent(this.activeImageWrapper, 'transitionend')
            .pipe(take(1))
            .subscribe(() => {
            this._showLoader();
        });
    }
    reset() {
        if (this._fullscreen) {
            this.toggleFullscreen();
        }
        this._restoreDefaultPosition();
        this._restoreDefaultZoom();
        clearTimeout(this._toolsToggleTimer);
        clearTimeout(this._doubleTapTimer);
    }
    _disableScroll() {
        this._renderer.addClass(this._document.body, 'disabled-scroll');
        if (this._document.documentElement.scrollHeight > this._document.documentElement.clientHeight) {
            this._renderer.addClass(this._document.body, 'replace-scrollbar');
        }
    }
    _enableScroll() {
        this._renderer.removeClass(this._document.body, 'disabled-scroll');
        this._renderer.removeClass(this._document.body, 'replace-scrollbar');
    }
    _restoreDefaultZoom() {
        if (this._scale !== 1) {
            this._scale = 1;
            this._renderer.setStyle(this.activeImageWrapper, 'transform', `scale(${this._scale})`);
            this._updateZoomBtn();
            this._updateImgPosition();
        }
    }
    _updateImgPosition() {
        if (this._scale === 1) {
            this._restoreDefaultPosition();
        }
    }
    _checkDoubleTap(event) {
        clearTimeout(this._doubleTapTimer);
        const currentTime = new Date().getTime();
        const tapLength = currentTime - this._tapTime;
        if (this._tapCounter > 0 && tapLength < 500) {
            this._onDoubleClick(event);
            this._doubleTapTimer = setTimeout(() => {
                this._tapTime = new Date().getTime();
                this._tapCounter = 0;
            }, this._doubleTapTimeout);
        }
        else {
            this._tapCounter++;
            this._tapTime = new Date().getTime();
        }
    }
    _onDoubleClick(event) {
        const touchEvent = event;
        if (touchEvent.touches) {
            this._setNewPositionOnZoomIn(event);
        }
        if (this._scale !== 1) {
            this._restoreDefaultZoom();
        }
        else {
            this.zoomIn();
        }
    }
    _updateZoomBtn() {
        if (this._scale > 1) {
            this._renderer.addClass(this.btnZoom.nativeElement, 'active');
            this._renderer.setAttribute(this.btnZoom.nativeElement, 'aria-label', 'Zoom out');
        }
        else {
            this._renderer.removeClass(this.btnZoom.nativeElement, 'active');
            this._renderer.setAttribute(this.btnZoom.nativeElement, 'aria-label', 'Zoom in');
        }
    }
    _restoreDefaultPosition() {
        clearTimeout(this._zoomTimer);
        this._renderer.setStyle(this.activeImageElement, 'left', 0);
        this._renderer.setStyle(this.activeImageElement, 'top', 0);
        this._renderer.setStyle(this.activeImageElement, 'transition', 'all 0.5s ease-out');
        this._calculateImgSize();
        setTimeout(() => {
            this._renderer.setStyle(this.activeImageElement, 'transition', 'none');
        }, 500);
    }
    _updateActiveLightboxItem() {
        this.activeLightboxItem = this.lightboxItems.toArray()[this.index];
        this._setActiveImageData();
        this._cdRef.markForCheck();
    }
    load() {
        this._hideLoader();
        if (this.activeImageWrapper.style.transform == 'scale(0.25)') {
            this._renderer.setStyle(this.activeImageWrapper, 'transition', 'none');
            this._renderer.setStyle(this.activeImageWrapper, 'left', this.slideRight ? '100%' : '-100%');
            this._slideTimer = setTimeout(() => {
                this._renderer.setStyle(this.activeImageWrapper, 'transition', '');
                this._renderer.setStyle(this.activeImageWrapper, 'left', '0');
                this._renderer.setStyle(this.activeImageWrapper, 'transform', 'scale(1)');
                this.lightbox.lightboxSlided.emit();
            }, 0);
        }
        this._calculateImgSize();
    }
    _showLoader() {
        if (this.activeImageElement.src) {
            return;
        }
        this._renderer.setStyle(this.loader.nativeElement, 'opacity', 1);
    }
    _hideLoader() {
        this._renderer.setStyle(this.loader.nativeElement, 'opacity', 0);
    }
    _calculateImgSize() {
        if (this.activeImageElement.width >= this.activeImageElement.height) {
            this._renderer.setStyle(this.activeImageElement, 'width', '100%');
            this._renderer.setStyle(this.activeImageElement, 'maxWidth', '100%');
            this._renderer.setStyle(this.activeImageElement, 'height', 'auto');
            const top = `${(this.activeImageWrapper.offsetHeight - this.activeImageElement.height) / 2}px`;
            this._renderer.setStyle(this.activeImageElement, 'top', top);
            this._renderer.setStyle(this.activeImageElement, 'left', 0);
        }
        else {
            this._renderer.setStyle(this.activeImageElement, 'height', '100%');
            this._renderer.setStyle(this.activeImageElement, 'maxHeight', '100%');
            this._renderer.setStyle(this.activeImageElement, 'width', 'auto');
            const left = `${(this.activeImageWrapper.offsetWidth - this.activeImageElement.width) / 2}px`;
            this._renderer.setStyle(this.activeImageElement, 'left', left);
            this._renderer.setStyle(this.activeImageElement, 'top', 0);
        }
        if (this.activeImageElement.width >= this.activeImageWrapper.offsetWidth) {
            this._renderer.setStyle(this.activeImageElement, 'width', `${this.activeImageWrapper.offsetWidth}px`);
            this._renderer.setStyle(this.activeImageElement, 'height', 'auto');
            this._renderer.setStyle(this.activeImageElement, 'height', 'auto');
            const top = `${(this.activeImageWrapper.offsetHeight - this.activeImageElement.height) / 2}px`;
            this._renderer.setStyle(this.activeImageElement, 'top', top);
            this._renderer.setStyle(this.activeImageElement, 'left', 0);
        }
        if (this.activeImageElement.height >= this.activeImageWrapper.offsetHeight) {
            this._renderer.setStyle(this.activeImageElement, 'height', `${this.activeImageWrapper.offsetHeight}px`);
            this._renderer.setStyle(this.activeImageElement, 'width', 'auto');
            this._renderer.setStyle(this.activeImageElement, 'top', 0);
            const left = `${(this.activeImageWrapper.offsetWidth - this.activeImageElement.width) / 2}px`;
            this._renderer.setStyle(this.activeImageElement, 'left', left);
        }
    }
}
MdbLightboxModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbLightboxModalComponent, deps: [{ token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i1.ConfigurableFocusTrapFactory }, { token: DOCUMENT }, { token: forwardRef(() => MdbLightboxComponent) }], target: i0.ɵɵFactoryTarget.Component });
MdbLightboxModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbLightboxModalComponent, selector: "mdb-lightbox-modal", host: { listeners: { "mousemove": "onHostMousemove()", "keyup": "onHostKeyup($event)", "click": "onHostClick($event.target)" } }, viewQueries: [{ propertyName: "galleryToolbar", first: true, predicate: ["galleryToolbar"], descendants: true }, { propertyName: "btnPrevious", first: true, predicate: ["btnPrevious"], descendants: true }, { propertyName: "btnNext", first: true, predicate: ["btnNext"], descendants: true }, { propertyName: "rightArrow", first: true, predicate: ["rightArrow"], descendants: true }, { propertyName: "leftArrow", first: true, predicate: ["leftArrow"], descendants: true }, { propertyName: "btnFullsreen", first: true, predicate: ["btnFullsreen"], descendants: true }, { propertyName: "btnZoom", first: true, predicate: ["btnZoom"], descendants: true }, { propertyName: "loader", first: true, predicate: ["loader"], descendants: true }, { propertyName: "imageWrappers", predicate: ["imageWrapper"], descendants: true }, { propertyName: "images", predicate: ["image"], descendants: true }], ngImport: i0, template: "<div #galleryToolbar class=\"lightbox-gallery-toolbar\">\n  <div #loader class=\"lightbox-gallery-loader\" style=\"opacity: 0\">\n    <div class=\"spinner-grow text-light\" role=\"status\">\n      <span class=\"sr-only\">Loading...</span>\n    </div>\n  </div>\n  <div class=\"lightbox-gallery-left-tools\">\n    <p class=\"lightbox-gallery-counter\">{{ index + 1 }} / {{ total }}</p>\n  </div>\n  <div class=\"lightbox-gallery-right-tools\">\n    <button\n      type=\"button\"\n      #btnFullsreen\n      class=\"lightbox-gallery-button lightbox-gallery-fullscreen-btn\"\n      [ngClass]=\"{ 'fontawesome-pro': lightbox.fontAwesome === 'pro' }\"\n      aria-label=\"Toggle fullscreen\"\n      (click)=\"toggleFullscreen()\"\n    ></button>\n    <button\n      type=\"button\"\n      #btnZoom\n      class=\"lightbox-gallery-button lightbox-gallery-zoom-btn\"\n      [ngClass]=\"{ 'fontawesome-pro': lightbox.fontAwesome === 'pro' }\"\n      aria-label=\"Zoom in\"\n      (click)=\"zoom()\"\n    ></button>\n    <button\n      type=\"button\"\n      class=\"lightbox-gallery-button lightbox-gallery-close-btn\"\n      [ngClass]=\"{ 'fontawesome-pro': lightbox.fontAwesome === 'pro' }\"\n      aria-label=\"Close\"\n      (click)=\"close()\"\n    ></button>\n  </div>\n</div>\n\n<div class=\"lightbox-gallery-content\">\n  <ng-container *ngFor=\"let item of [].constructor(3); let index = index\">\n    <div \n      #imageWrapper\n      class=\"lightbox-gallery-image\"\n      [ngStyle]=\"{'opacity': activeModalImageIndex === index ? '1' : '0'}\"\n    >\n      <img\n        #image\n        draggable=\"false\"\n        @fade\n        (load)=\"load()\"\n        (mousedown)=\"onMousedown($event)\"\n        (mouseup)=\"onMouseup($event)\"\n        (mousemove)=\"onMousemove($event)\"\n        (wheel)=\"onWheel($event)\"\n      />\n    </div>\n  </ng-container>\n</div>\n\n<div #leftArrow class=\"lightbox-gallery-arrow-left\" style=\"opacity: 1\">\n  <button\n    type=\"button\"\n    #btnPrevious\n    aria-label=\"Previous\"\n    (click)=\"slide('left')\"\n    class=\"lightbox-gallery-button\"\n    [ngClass]=\"{ 'fontawesome-pro': lightbox.fontAwesome === 'pro' }\"\n  ></button>\n</div>\n<div #rightArrow class=\"lightbox-gallery-arrow-right\" style=\"opacity: 1\">\n  <button\n    type=\"button\"\n    #btnNext\n    aria-label=\"Next\"\n    (click)=\"slide('right')\"\n    class=\"lightbox-gallery-button\"\n    [ngClass]=\"{ 'fontawesome-pro': lightbox.fontAwesome === 'pro' }\"\n  ></button>\n</div>\n<div class=\"lightbox-gallery-caption-wrapper\">\n  <p class=\"lightbox-gallery-caption\">\n    {{ activeLightboxItem.caption || activeLightboxItem.el.nativeElement.alt }}\n  </p>\n</div>\n", directives: [{ type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], animations: [
        trigger('fade', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('1500ms', keyframes([
                    style({ opacity: 0, transform: 'scale3d(0.3, 0.3, 0.3)', offset: 0, easing: 'ease' }),
                    style({
                        opacity: 1,
                        transform: 'scale3d(1, 1, 1)',
                        offset: 0.5,
                        easing: 'ease',
                        display: 'block',
                    }),
                ])),
            ]),
            transition(':leave', [
                style({ opacity: 1 }),
                animate('1500ms', keyframes([
                    style({ opacity: 1, offset: 0 }),
                    style({ opacity: 0, transform: 'scale3d(0.3, 0.3, 0.3)', offset: 0.5 }),
                    style({ opacity: 0, offset: 1 }),
                ])),
            ]),
        ]),
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbLightboxModalComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-lightbox-modal', changeDetection: ChangeDetectionStrategy.OnPush, animations: [
                        trigger('fade', [
                            transition(':enter', [
                                style({ opacity: 0 }),
                                animate('1500ms', keyframes([
                                    style({ opacity: 0, transform: 'scale3d(0.3, 0.3, 0.3)', offset: 0, easing: 'ease' }),
                                    style({
                                        opacity: 1,
                                        transform: 'scale3d(1, 1, 1)',
                                        offset: 0.5,
                                        easing: 'ease',
                                        display: 'block',
                                    }),
                                ])),
                            ]),
                            transition(':leave', [
                                style({ opacity: 1 }),
                                animate('1500ms', keyframes([
                                    style({ opacity: 1, offset: 0 }),
                                    style({ opacity: 0, transform: 'scale3d(0.3, 0.3, 0.3)', offset: 0.5 }),
                                    style({ opacity: 0, offset: 1 }),
                                ])),
                            ]),
                        ]),
                    ], template: "<div #galleryToolbar class=\"lightbox-gallery-toolbar\">\n  <div #loader class=\"lightbox-gallery-loader\" style=\"opacity: 0\">\n    <div class=\"spinner-grow text-light\" role=\"status\">\n      <span class=\"sr-only\">Loading...</span>\n    </div>\n  </div>\n  <div class=\"lightbox-gallery-left-tools\">\n    <p class=\"lightbox-gallery-counter\">{{ index + 1 }} / {{ total }}</p>\n  </div>\n  <div class=\"lightbox-gallery-right-tools\">\n    <button\n      type=\"button\"\n      #btnFullsreen\n      class=\"lightbox-gallery-button lightbox-gallery-fullscreen-btn\"\n      [ngClass]=\"{ 'fontawesome-pro': lightbox.fontAwesome === 'pro' }\"\n      aria-label=\"Toggle fullscreen\"\n      (click)=\"toggleFullscreen()\"\n    ></button>\n    <button\n      type=\"button\"\n      #btnZoom\n      class=\"lightbox-gallery-button lightbox-gallery-zoom-btn\"\n      [ngClass]=\"{ 'fontawesome-pro': lightbox.fontAwesome === 'pro' }\"\n      aria-label=\"Zoom in\"\n      (click)=\"zoom()\"\n    ></button>\n    <button\n      type=\"button\"\n      class=\"lightbox-gallery-button lightbox-gallery-close-btn\"\n      [ngClass]=\"{ 'fontawesome-pro': lightbox.fontAwesome === 'pro' }\"\n      aria-label=\"Close\"\n      (click)=\"close()\"\n    ></button>\n  </div>\n</div>\n\n<div class=\"lightbox-gallery-content\">\n  <ng-container *ngFor=\"let item of [].constructor(3); let index = index\">\n    <div \n      #imageWrapper\n      class=\"lightbox-gallery-image\"\n      [ngStyle]=\"{'opacity': activeModalImageIndex === index ? '1' : '0'}\"\n    >\n      <img\n        #image\n        draggable=\"false\"\n        @fade\n        (load)=\"load()\"\n        (mousedown)=\"onMousedown($event)\"\n        (mouseup)=\"onMouseup($event)\"\n        (mousemove)=\"onMousemove($event)\"\n        (wheel)=\"onWheel($event)\"\n      />\n    </div>\n  </ng-container>\n</div>\n\n<div #leftArrow class=\"lightbox-gallery-arrow-left\" style=\"opacity: 1\">\n  <button\n    type=\"button\"\n    #btnPrevious\n    aria-label=\"Previous\"\n    (click)=\"slide('left')\"\n    class=\"lightbox-gallery-button\"\n    [ngClass]=\"{ 'fontawesome-pro': lightbox.fontAwesome === 'pro' }\"\n  ></button>\n</div>\n<div #rightArrow class=\"lightbox-gallery-arrow-right\" style=\"opacity: 1\">\n  <button\n    type=\"button\"\n    #btnNext\n    aria-label=\"Next\"\n    (click)=\"slide('right')\"\n    class=\"lightbox-gallery-button\"\n    [ngClass]=\"{ 'fontawesome-pro': lightbox.fontAwesome === 'pro' }\"\n  ></button>\n</div>\n<div class=\"lightbox-gallery-caption-wrapper\">\n  <p class=\"lightbox-gallery-caption\">\n    {{ activeLightboxItem.caption || activeLightboxItem.el.nativeElement.alt }}\n  </p>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i1.ConfigurableFocusTrapFactory }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i3.MdbLightboxComponent, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => MdbLightboxComponent)]
                }] }]; }, propDecorators: { galleryToolbar: [{
                type: ViewChild,
                args: ['galleryToolbar']
            }], btnPrevious: [{
                type: ViewChild,
                args: ['btnPrevious']
            }], btnNext: [{
                type: ViewChild,
                args: ['btnNext']
            }], rightArrow: [{
                type: ViewChild,
                args: ['rightArrow']
            }], leftArrow: [{
                type: ViewChild,
                args: ['leftArrow']
            }], btnFullsreen: [{
                type: ViewChild,
                args: ['btnFullsreen']
            }], btnZoom: [{
                type: ViewChild,
                args: ['btnZoom']
            }], loader: [{
                type: ViewChild,
                args: ['loader']
            }], imageWrappers: [{
                type: ViewChildren,
                args: ['imageWrapper']
            }], images: [{
                type: ViewChildren,
                args: ['image']
            }], onHostMousemove: [{
                type: HostListener,
                args: ['mousemove']
            }], onHostKeyup: [{
                type: HostListener,
                args: ['keyup', ['$event']]
            }], onHostClick: [{
                type: HostListener,
                args: ['click', ['$event.target']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlnaHRib3gtbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L2xpZ2h0Ym94L2xpZ2h0Ym94LW1vZGFsLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9saWdodGJveC9saWdodGJveC1tb2RhbC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXJGLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQ0wsU0FBUyxFQUVULHVCQUF1QixFQUN2QixTQUFTLEVBR1QsTUFBTSxFQUNOLFVBQVUsRUFHVixZQUFZLEVBRVosWUFBWSxHQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDakMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXRDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7OztBQXNDNUQsTUFBTSxPQUFPLHlCQUF5QjtJQStEcEMsWUFDVSxTQUFvQixFQUNwQixXQUF1QixFQUN2QixNQUF5QixFQUN6QixpQkFBK0MsRUFDN0IsU0FBUyxFQUNhLFNBQStCO1FBTHZFLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDdkIsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFDekIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUE4QjtRQUM3QixjQUFTLEdBQVQsU0FBUyxDQUFBO1FBN0JyQyxtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUVwQiwwQkFB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QUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7b0NBQ2hDLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQztvQ0FDdkUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7aUNBQ2pDLENBQUMsQ0FDSDs2QkFDRixDQUFDO3lCQUNILENBQUM7cUJBQ0g7OzBCQXNFRSxNQUFNOzJCQUFDLFFBQVE7OzBCQUNmLE1BQU07MkJBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLG9CQUFvQixDQUFDOzRDQXBFbkIsY0FBYztzQkFBMUMsU0FBUzt1QkFBQyxnQkFBZ0I7Z0JBQ0QsV0FBVztzQkFBcEMsU0FBUzt1QkFBQyxhQUFhO2dCQUNGLE9BQU87c0JBQTVCLFNBQVM7dUJBQUMsU0FBUztnQkFDSyxVQUFVO3NCQUFsQyxTQUFTO3VCQUFDLFlBQVk7Z0JBQ0MsU0FBUztzQkFBaEMsU0FBUzt1QkFBQyxXQUFXO2dCQUNLLFlBQVk7c0JBQXRDLFNBQVM7dUJBQUMsY0FBYztnQkFDSCxPQUFPO3NCQUE1QixTQUFTO3VCQUFDLFNBQVM7Z0JBQ0MsTUFBTTtzQkFBMUIsU0FBUzt1QkFBQyxRQUFRO2dCQUNXLGFBQWE7c0JBQTFDLFlBQVk7dUJBQUMsY0FBYztnQkFDTCxNQUFNO3NCQUE1QixZQUFZO3VCQUFDLE9BQU87Z0JBR3JCLGVBQWU7c0JBRGQsWUFBWTt1QkFBQyxXQUFXO2dCQU16QixXQUFXO3NCQURWLFlBQVk7dUJBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQU1qQyxXQUFXO3NCQURWLFlBQVk7dUJBQUMsT0FBTyxFQUFFLENBQUMsZUFBZSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYW5pbWF0ZSwga2V5ZnJhbWVzLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQ29uZmlndXJhYmxlRm9jdXNUcmFwLCBDb25maWd1cmFibGVGb2N1c1RyYXBGYWN0b3J5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgVmlld0NoaWxkLFxuICBRdWVyeUxpc3QsXG4gIFJlbmRlcmVyMixcbiAgSW5qZWN0LFxuICBmb3J3YXJkUmVmLFxuICBFbGVtZW50UmVmLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgSG9zdExpc3RlbmVyLFxuICBPbkRlc3Ryb3ksXG4gIFZpZXdDaGlsZHJlbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNZGJMaWdodGJveEl0ZW1EaXJlY3RpdmUgfSBmcm9tICcuL2xpZ2h0Ym94LWl0ZW0uZGlyZWN0aXZlJztcbmltcG9ydCB7IE1kYkxpZ2h0Ym94Q29tcG9uZW50IH0gZnJvbSAnLi9saWdodGJveC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZGItbGlnaHRib3gtbW9kYWwnLFxuICB0ZW1wbGF0ZVVybDogJy4vbGlnaHRib3gtbW9kYWwuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2ZhZGUnLCBbXG4gICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXG4gICAgICAgIHN0eWxlKHsgb3BhY2l0eTogMCB9KSxcbiAgICAgICAgYW5pbWF0ZShcbiAgICAgICAgICAnMTUwMG1zJyxcbiAgICAgICAgICBrZXlmcmFtZXMoW1xuICAgICAgICAgICAgc3R5bGUoeyBvcGFjaXR5OiAwLCB0cmFuc2Zvcm06ICdzY2FsZTNkKDAuMywgMC4zLCAwLjMpJywgb2Zmc2V0OiAwLCBlYXNpbmc6ICdlYXNlJyB9KSxcbiAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUzZCgxLCAxLCAxKScsXG4gICAgICAgICAgICAgIG9mZnNldDogMC41LFxuICAgICAgICAgICAgICBlYXNpbmc6ICdlYXNlJyxcbiAgICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgIF0pXG4gICAgICAgICksXG4gICAgICBdKSxcbiAgICAgIHRyYW5zaXRpb24oJzpsZWF2ZScsIFtcbiAgICAgICAgc3R5bGUoeyBvcGFjaXR5OiAxIH0pLFxuICAgICAgICBhbmltYXRlKFxuICAgICAgICAgICcxNTAwbXMnLFxuICAgICAgICAgIGtleWZyYW1lcyhbXG4gICAgICAgICAgICBzdHlsZSh7IG9wYWNpdHk6IDEsIG9mZnNldDogMCB9KSxcbiAgICAgICAgICAgIHN0eWxlKHsgb3BhY2l0eTogMCwgdHJhbnNmb3JtOiAnc2NhbGUzZCgwLjMsIDAuMywgMC4zKScsIG9mZnNldDogMC41IH0pLFxuICAgICAgICAgICAgc3R5bGUoeyBvcGFjaXR5OiAwLCBvZmZzZXQ6IDEgfSksXG4gICAgICAgICAgXSlcbiAgICAgICAgKSxcbiAgICAgIF0pLFxuICAgIF0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBNZGJMaWdodGJveE1vZGFsQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZCgnZ2FsbGVyeVRvb2xiYXInKSBnYWxsZXJ5VG9vbGJhcjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnYnRuUHJldmlvdXMnKSBidG5QcmV2aW91czogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnYnRuTmV4dCcpIGJ0bk5leHQ6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3JpZ2h0QXJyb3cnKSByaWdodEFycm93OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdsZWZ0QXJyb3cnKSBsZWZ0QXJyb3c6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2J0bkZ1bGxzcmVlbicpIGJ0bkZ1bGxzcmVlbjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnYnRuWm9vbScpIGJ0blpvb206IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2xvYWRlcicpIGxvYWRlcjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZHJlbignaW1hZ2VXcmFwcGVyJykgaW1hZ2VXcmFwcGVyczogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuICBAVmlld0NoaWxkcmVuKCdpbWFnZScpIGltYWdlczogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbW92ZScpXG4gIG9uSG9zdE1vdXNlbW92ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZXNldFRvb2xzVG9nZ2xlcigpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5dXAnLCBbJyRldmVudCddKVxuICBvbkhvc3RLZXl1cChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuX29uS2V5dXAoZXZlbnQpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudC50YXJnZXQnXSlcbiAgb25Ib3N0Q2xpY2sodGFyZ2V0OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIHRoaXMuX3Jlc2V0VG9vbHNUb2dnbGVyKCk7XG5cbiAgICBpZiAodGFyZ2V0LnRhZ05hbWUgIT09ICdESVYnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgbGlnaHRib3g6IE1kYkxpZ2h0Ym94Q29tcG9uZW50O1xuICBsaWdodGJveEl0ZW1zOiBRdWVyeUxpc3Q8TWRiTGlnaHRib3hJdGVtRGlyZWN0aXZlPjtcbiAgYWN0aXZlTGlnaHRib3hJdGVtOiBNZGJMaWdodGJveEl0ZW1EaXJlY3RpdmU7XG4gIHpvb21MZXZlbDogbnVtYmVyO1xuICBpbmRleDogbnVtYmVyO1xuICB0b3RhbDogbnVtYmVyO1xuICBhbmltYXRpb25TdGF0ZSA9ICcnO1xuICBzbGlkZVJpZ2h0OiBib29sZWFuO1xuICBhY3RpdmVNb2RhbEltYWdlSW5kZXggPSAxO1xuXG4gIHByaXZhdGUgX3NsaWRlVGltZXI6IFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+O1xuICBwcml2YXRlIF90b29sc1RvZ2dsZVRpbWVyOiBSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PjtcbiAgcHJpdmF0ZSBfem9vbVRpbWVyOiBSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PjtcbiAgcHJpdmF0ZSBfZG91YmxlVGFwVGltZXI6IFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+O1xuICBwcml2YXRlIF9mb2N1c1RyYXA6IENvbmZpZ3VyYWJsZUZvY3VzVHJhcDtcbiAgcHJpdmF0ZSBfcHJldmlvdXNseUZvY3VzZWRFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfZnVsbHNjcmVlbiA9IGZhbHNlO1xuICBwcml2YXRlIF9zY2FsZSA9IDE7XG4gIHByaXZhdGUgX21vdXNlZG93biA9IGZhbHNlO1xuICBwcml2YXRlIF9wb3NpdGlvblg6IG51bWJlcjtcbiAgcHJpdmF0ZSBfcG9zaXRpb25ZOiBudW1iZXI7XG4gIHByaXZhdGUgX21vdXNlZG93blBvc2l0aW9uWDogbnVtYmVyO1xuICBwcml2YXRlIF9tb3VzZWRvd25Qb3NpdGlvblk6IG51bWJlcjtcbiAgcHJpdmF0ZSBfb3JpZ2luYWxQb3NpdGlvblg6IG51bWJlcjtcbiAgcHJpdmF0ZSBfb3JpZ2luYWxQb3NpdGlvblk6IG51bWJlcjtcbiAgcHJpdmF0ZSBfdGFwQ291bnRlciA9IDA7XG4gIHByaXZhdGUgX3RhcFRpbWUgPSAwO1xuICBwcml2YXRlIF90b29sc1RpbWVvdXQgPSA0MDAwO1xuICBwcml2YXRlIF9kb3VibGVUYXBUaW1lb3V0ID0gMzAwO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIF9jZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBfZm9jdXNUcmFwRmFjdG9yeTogQ29uZmlndXJhYmxlRm9jdXNUcmFwRmFjdG9yeSxcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudCxcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTWRiTGlnaHRib3hDb21wb25lbnQpKSBfbGlnaHRib3g6IE1kYkxpZ2h0Ym94Q29tcG9uZW50XG4gICkge1xuICAgIHRoaXMubGlnaHRib3ggPSBfbGlnaHRib3g7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pbmRleCA9IHRoaXMubGlnaHRib3hJdGVtcy50b0FycmF5KCkuaW5kZXhPZih0aGlzLmFjdGl2ZUxpZ2h0Ym94SXRlbSk7XG4gICAgdGhpcy50b3RhbCA9IHRoaXMubGlnaHRib3hJdGVtcy50b0FycmF5KCkubGVuZ3RoO1xuICAgIHRoaXMuX3NldEFjdGl2ZUltYWdlRGF0YSgpO1xuXG4gICAgdGhpcy5fc2V0VG9vbHNUb2dnbGVUaW1lb3V0KCk7XG4gICAgdGhpcy5fZGlzYWJsZVNjcm9sbCgpO1xuICAgIHRoaXMuX3ByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCA9IHRoaXMuX2RvY3VtZW50LmFjdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgdGhpcy5fZm9jdXNUcmFwID0gdGhpcy5fZm9jdXNUcmFwRmFjdG9yeS5jcmVhdGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLl9mb2N1c1RyYXAuZm9jdXNJbml0aWFsRWxlbWVudFdoZW5SZWFkeSgpO1xuXG4gICAgdGhpcy5fc2V0RGVmYXVsdEFuaW1hdGlvblN0eWxlKCk7XG4gICAgdGhpcy5fcHJlbG9hZEluYWN0aXZlSW1hZ2VzKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9wcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQuZm9jdXMoKTtcbiAgICB0aGlzLl9mb2N1c1RyYXAuZGVzdHJveSgpO1xuICAgIHRoaXMuX2VuYWJsZVNjcm9sbCgpO1xuICB9XG5cbiAgZ2V0IGFjdGl2ZUltYWdlRWxlbWVudCgpOiBIVE1MSW1hZ2VFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5pbWFnZXMudG9BcnJheSgpW3RoaXMuYWN0aXZlTW9kYWxJbWFnZUluZGV4XS5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgZ2V0IGFjdGl2ZUltYWdlV3JhcHBlcigpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuaW1hZ2VXcmFwcGVycy50b0FycmF5KClbdGhpcy5hY3RpdmVNb2RhbEltYWdlSW5kZXhdLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBnZXQgbmV4dEltYWdlV3JhcHBlcigpOiBIVE1MRWxlbWVudCB7XG4gICAgaWYgKHRoaXMuYWN0aXZlTW9kYWxJbWFnZUluZGV4IDwgdGhpcy5pbWFnZXMubGVuZ3RoIC0gMSkge1xuICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VXcmFwcGVycy50b0FycmF5KClbdGhpcy5hY3RpdmVNb2RhbEltYWdlSW5kZXggKyAxXS5uYXRpdmVFbGVtZW50O1xuICAgIH0gZWxzZSBpZiAoKHRoaXMuYWN0aXZlTW9kYWxJbWFnZUluZGV4ID0gdGhpcy5pbWFnZXMubGVuZ3RoIC0gMSkpIHtcbiAgICAgIHJldHVybiB0aGlzLmltYWdlV3JhcHBlcnMudG9BcnJheSgpWzBdLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHByZXZpb3VzSW1hZ2VXcmFwcGVyKCk6IEhUTUxFbGVtZW50IHtcbiAgICBpZiAodGhpcy5hY3RpdmVNb2RhbEltYWdlSW5kZXggPiAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbWFnZVdyYXBwZXJzLnRvQXJyYXkoKVt0aGlzLmFjdGl2ZU1vZGFsSW1hZ2VJbmRleCAtIDFdLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfSBlbHNlIGlmICgodGhpcy5hY3RpdmVNb2RhbEltYWdlSW5kZXggPSAwKSkge1xuICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VXcmFwcGVycy50b0FycmF5KClbdGhpcy5pbWFnZXMubGVuZ3RoXS5uYXRpdmVFbGVtZW50O1xuICAgIH1cbiAgfVxuXG4gIGdldCBuZXh0SW1hZ2UoKTogSFRNTEltYWdlRWxlbWVudCB7XG4gICAgaWYgKHRoaXMuYWN0aXZlTW9kYWxJbWFnZUluZGV4IDwgdGhpcy5pbWFnZXMubGVuZ3RoIC0gMSkge1xuICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VzLnRvQXJyYXkoKVt0aGlzLmFjdGl2ZU1vZGFsSW1hZ2VJbmRleCArIDFdLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfSBlbHNlIGlmICh0aGlzLmFjdGl2ZU1vZGFsSW1hZ2VJbmRleCA9PT0gdGhpcy5pbWFnZXMubGVuZ3RoIC0gMSkge1xuICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VzLnRvQXJyYXkoKVswXS5uYXRpdmVFbGVtZW50O1xuICAgIH1cbiAgfVxuXG4gIGdldCBwcmV2aW91c0ltYWdlKCk6IEhUTUxJbWFnZUVsZW1lbnQge1xuICAgIGlmICh0aGlzLmFjdGl2ZU1vZGFsSW1hZ2VJbmRleCA+IDApIHtcbiAgICAgIHJldHVybiB0aGlzLmltYWdlcy50b0FycmF5KClbdGhpcy5hY3RpdmVNb2RhbEltYWdlSW5kZXggLSAxXS5uYXRpdmVFbGVtZW50O1xuICAgIH0gZWxzZSBpZiAodGhpcy5hY3RpdmVNb2RhbEltYWdlSW5kZXggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzLmltYWdlcy50b0FycmF5KClbdGhpcy5pbWFnZXMubGVuZ3RoIC0gMV0ubmF0aXZlRWxlbWVudDtcbiAgICB9XG4gIH1cblxuICBvbk1vdXNlZG93bihldmVudCk6IHZvaWQge1xuICAgIGNvbnN0IHRvdWNoID0gZXZlbnQudG91Y2hlcztcbiAgICBjb25zdCB4ID0gdG91Y2ggPyB0b3VjaFswXS5jbGllbnRYIDogZXZlbnQuY2xpZW50WDtcbiAgICBjb25zdCB5ID0gdG91Y2ggPyB0b3VjaFswXS5jbGllbnRZIDogZXZlbnQuY2xpZW50WTtcblxuICAgIHRoaXMuX29yaWdpbmFsUG9zaXRpb25YID0gcGFyc2VGbG9hdCh0aGlzLmFjdGl2ZUltYWdlRWxlbWVudC5zdHlsZS5sZWZ0KSB8fCAwO1xuICAgIHRoaXMuX29yaWdpbmFsUG9zaXRpb25ZID0gcGFyc2VGbG9hdCh0aGlzLmFjdGl2ZUltYWdlRWxlbWVudC5zdHlsZS50b3ApIHx8IDA7XG4gICAgdGhpcy5fcG9zaXRpb25YID0gdGhpcy5fb3JpZ2luYWxQb3NpdGlvblg7XG4gICAgdGhpcy5fcG9zaXRpb25ZID0gdGhpcy5fb3JpZ2luYWxQb3NpdGlvblk7XG4gICAgdGhpcy5fbW91c2Vkb3duUG9zaXRpb25YID0geCAqICgxIC8gdGhpcy5fc2NhbGUpIC0gdGhpcy5fcG9zaXRpb25YO1xuICAgIHRoaXMuX21vdXNlZG93blBvc2l0aW9uWSA9IHkgKiAoMSAvIHRoaXMuX3NjYWxlKSAtIHRoaXMuX3Bvc2l0aW9uWTtcbiAgICB0aGlzLl9tb3VzZWRvd24gPSB0cnVlO1xuICB9XG5cbiAgb25Nb3VzZW1vdmUoZXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX21vdXNlZG93bikgcmV0dXJuO1xuXG4gICAgY29uc3QgdG91Y2ggPSBldmVudC50b3VjaGVzO1xuICAgIGNvbnN0IHggPSB0b3VjaCA/IHRvdWNoWzBdLmNsaWVudFggOiBldmVudC5jbGllbnRYO1xuICAgIGNvbnN0IHkgPSB0b3VjaCA/IHRvdWNoWzBdLmNsaWVudFkgOiBldmVudC5jbGllbnRZO1xuXG4gICAgaWYgKHRvdWNoKSB0aGlzLl9yZXNldFRvb2xzVG9nZ2xlcigpO1xuXG4gICAgaWYgKHRoaXMuX3NjYWxlICE9PSAxKSB7XG4gICAgICB0aGlzLl9wb3NpdGlvblggPSB4ICogKDEgLyB0aGlzLl9zY2FsZSkgLSB0aGlzLl9tb3VzZWRvd25Qb3NpdGlvblg7XG4gICAgICB0aGlzLl9wb3NpdGlvblkgPSB5ICogKDEgLyB0aGlzLl9zY2FsZSkgLSB0aGlzLl9tb3VzZWRvd25Qb3NpdGlvblk7XG5cbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuYWN0aXZlSW1hZ2VFbGVtZW50LCAnbGVmdCcsIGAke3RoaXMuX3Bvc2l0aW9uWH1weGApO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5hY3RpdmVJbWFnZUVsZW1lbnQsICd0b3AnLCBgJHt0aGlzLl9wb3NpdGlvbll9cHhgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMudG90YWwgPD0gMSkgcmV0dXJuO1xuXG4gICAgICB0aGlzLl9wb3NpdGlvblggPSB4ICogKDEgLyB0aGlzLl9zY2FsZSkgLSB0aGlzLl9tb3VzZWRvd25Qb3NpdGlvblg7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmFjdGl2ZUltYWdlRWxlbWVudCwgJ2xlZnQnLCBgJHt0aGlzLl9wb3NpdGlvblh9cHhgKTtcbiAgICB9XG4gIH1cblxuICBvbk1vdXNldXAoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLl9tb3VzZWRvd24gPSBmYWxzZTtcbiAgICB0aGlzLl9tb3ZlSW1nKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCk7XG4gICAgdGhpcy5fY2hlY2tEb3VibGVUYXAoZXZlbnQpO1xuICB9XG5cbiAgem9vbSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fc2NhbGUgPT09IDEpIHtcbiAgICAgIHRoaXMuem9vbUluKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuem9vbU91dCgpO1xuICAgIH1cbiAgfVxuXG4gIGNsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuYWN0aXZlSW1hZ2VXcmFwcGVyLCAndHJhbnNmb3JtJywgJ3NjYWxlKDAuMjUpJyk7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5hY3RpdmVJbWFnZVdyYXBwZXIsICdvcGFjaXR5JywgMCk7XG4gICAgdGhpcy5saWdodGJveC5jbG9zZSgpO1xuICB9XG5cbiAgdG9nZ2xlRnVsbHNjcmVlbigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZnVsbHNjcmVlbiA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuYnRuRnVsbHNyZWVuLm5hdGl2ZUVsZW1lbnQsICdhY3RpdmUnKTtcblxuICAgICAgaWYgKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5yZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fZnVsbHNjcmVlbiA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuYnRuRnVsbHNyZWVuLm5hdGl2ZUVsZW1lbnQsICdhY3RpdmUnKTtcblxuICAgICAgaWYgKHRoaXMuX2RvY3VtZW50LmV4aXRGdWxsc2NyZWVuKSB7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50LmV4aXRGdWxsc2NyZWVuKCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2Z1bGxzY3JlZW4gPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zZXREZWZhdWx0QW5pbWF0aW9uU3R5bGUoKTogdm9pZCB7XG4gICAgdGhpcy5pbWFnZVdyYXBwZXJzLnRvQXJyYXkoKS5mb3JFYWNoKCh3cmFwcGVyLCBpbmRleCkgPT4ge1xuICAgICAgaWYgKGluZGV4ID09PSB0aGlzLmFjdGl2ZU1vZGFsSW1hZ2VJbmRleCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGlzTmV4dFdyYXBwZXIgPSBpbmRleCA+IHRoaXMuaW5kZXg7XG5cbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHdyYXBwZXIubmF0aXZlRWxlbWVudCwgJ2xlZnQnLCBpc05leHRXcmFwcGVyID8gJy0xMDAlJyA6ICcxMDAlJyk7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh3cmFwcGVyLm5hdGl2ZUVsZW1lbnQsICd0cmFuc2Zvcm0nLCAnc2NhbGUoMC4yNSknKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3ByZWxvYWRJbmFjdGl2ZUltYWdlcygpOiB2b2lkIHtcbiAgICBjb25zdCBuZXh0SW5kZXggPSB0aGlzLmluZGV4IDwgdGhpcy5saWdodGJveEl0ZW1zLnRvQXJyYXkoKS5sZW5ndGggLSAxID8gdGhpcy5pbmRleCArIDEgOiAwO1xuICAgIGNvbnN0IHByZXZpb3VzSW5kZXggPSB0aGlzLmluZGV4ID4gMCA/IHRoaXMuaW5kZXggLSAxIDogdGhpcy5saWdodGJveEl0ZW1zLnRvQXJyYXkoKS5sZW5ndGggLSAxO1xuXG4gICAgdGhpcy5wcmV2aW91c0ltYWdlLnNyYyA9XG4gICAgICB0aGlzLmxpZ2h0Ym94SXRlbXMudG9BcnJheSgpW3ByZXZpb3VzSW5kZXhdLmltZyB8fFxuICAgICAgdGhpcy5saWdodGJveEl0ZW1zLnRvQXJyYXkoKVtwcmV2aW91c0luZGV4XS5lbC5uYXRpdmVFbGVtZW50LnNyYztcbiAgICB0aGlzLnByZXZpb3VzSW1hZ2UuYWx0ID0gdGhpcy5saWdodGJveEl0ZW1zLnRvQXJyYXkoKVtwcmV2aW91c0luZGV4XS5lbC5uYXRpdmVFbGVtZW50LmFsdDtcblxuICAgIHRoaXMubmV4dEltYWdlLnNyYyA9XG4gICAgICB0aGlzLmxpZ2h0Ym94SXRlbXMudG9BcnJheSgpW25leHRJbmRleF0uaW1nIHx8XG4gICAgICB0aGlzLmxpZ2h0Ym94SXRlbXMudG9BcnJheSgpW25leHRJbmRleF0uZWwubmF0aXZlRWxlbWVudC5zcmM7XG4gICAgdGhpcy5uZXh0SW1hZ2UuYWx0ID0gdGhpcy5saWdodGJveEl0ZW1zLnRvQXJyYXkoKVtuZXh0SW5kZXhdLmVsLm5hdGl2ZUVsZW1lbnQuYWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBfb25LZXl1cChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuX3Jlc2V0VG9vbHNUb2dnbGVyKCk7XG4gICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICB0aGlzLnNsaWRlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgdGhpcy5zbGlkZSgnbGVmdCcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdIb21lJzpcbiAgICAgICAgdGhpcy5zbGlkZSgnZmlyc3QnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdFbmQnOlxuICAgICAgICB0aGlzLnNsaWRlKCdsYXN0Jyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgIHRoaXMuem9vbUluKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgdGhpcy56b29tT3V0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfbW92ZUltZyh0YXJnZXQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3NjYWxlICE9PSAxIHx8IHRhcmdldCAhPT0gdGhpcy5hY3RpdmVJbWFnZUVsZW1lbnQgfHwgdGhpcy5saWdodGJveEl0ZW1zLmxlbmd0aCA8PSAxKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbW92ZW1lbnQgPSB0aGlzLl9wb3NpdGlvblggLSB0aGlzLl9vcmlnaW5hbFBvc2l0aW9uWDtcblxuICAgIGlmIChtb3ZlbWVudCA+IDApIHtcbiAgICAgIHRoaXMuc2xpZGUoJ2xlZnQnKTtcbiAgICB9IGVsc2UgaWYgKG1vdmVtZW50IDwgMCkge1xuICAgICAgdGhpcy5zbGlkZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3NldEFjdGl2ZUltYWdlRGF0YSgpOiB2b2lkIHtcbiAgICB0aGlzLmFjdGl2ZUltYWdlRWxlbWVudC5zcmMgPVxuICAgICAgdGhpcy5hY3RpdmVMaWdodGJveEl0ZW0uaW1nIHx8IHRoaXMuYWN0aXZlTGlnaHRib3hJdGVtLmVsLm5hdGl2ZUVsZW1lbnQuc3JjO1xuICAgIHRoaXMuYWN0aXZlSW1hZ2VFbGVtZW50LmFsdCA9IHRoaXMuYWN0aXZlTGlnaHRib3hJdGVtLmVsLm5hdGl2ZUVsZW1lbnQuYWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0TmV3UG9zaXRpb25Pblpvb21JbihldmVudDogV2hlZWxFdmVudCk6IHZvaWQge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLl96b29tVGltZXIpO1xuICAgIHRoaXMuX3Bvc2l0aW9uWCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gMiAtIGV2ZW50Lm9mZnNldFggLSA1MDtcbiAgICB0aGlzLl9wb3NpdGlvblkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyIC0gZXZlbnQub2Zmc2V0WSAtIDUwO1xuXG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5hY3RpdmVJbWFnZUVsZW1lbnQsICd0cmFuc2l0aW9uJywgJ2FsbCAwLjVzIGVhc2Utb3V0Jyk7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5hY3RpdmVJbWFnZUVsZW1lbnQsICdsZWZ0JywgYCR7dGhpcy5fcG9zaXRpb25YfXB4YCk7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5hY3RpdmVJbWFnZUVsZW1lbnQsICd0b3AnLCBgJHt0aGlzLl9wb3NpdGlvbll9cHhgKTtcblxuICAgIHRoaXMuX3pvb21UaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5hY3RpdmVJbWFnZUVsZW1lbnQsICd0cmFuc2l0aW9uJywgJ25vbmUnKTtcbiAgICB9LCA1MDApO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVzZXRUb29sc1RvZ2dsZXIoKTogdm9pZCB7XG4gICAgdGhpcy50b2dnbGVUb29sYmFyKDEpO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLl90b29sc1RvZ2dsZVRpbWVyKTtcbiAgICB0aGlzLl9zZXRUb29sc1RvZ2dsZVRpbWVvdXQoKTtcbiAgfVxuXG4gIHRvZ2dsZVRvb2xiYXIob3BhY2l0eTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5nYWxsZXJ5VG9vbGJhci5uYXRpdmVFbGVtZW50LCAnb3BhY2l0eScsIG9wYWNpdHkpO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMubGVmdEFycm93Lm5hdGl2ZUVsZW1lbnQsICdvcGFjaXR5Jywgb3BhY2l0eSk7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5yaWdodEFycm93Lm5hdGl2ZUVsZW1lbnQsICdvcGFjaXR5Jywgb3BhY2l0eSk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRUb29sc1RvZ2dsZVRpbWVvdXQoKTogdm9pZCB7XG4gICAgdGhpcy5fdG9vbHNUb2dnbGVUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy50b2dnbGVUb29sYmFyKDApO1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3Rvb2xzVG9nZ2xlVGltZXIpO1xuICAgIH0sIHRoaXMuX3Rvb2xzVGltZW91dCk7XG4gIH1cblxuICBvbldoZWVsKGV2ZW50OiBXaGVlbEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2ZW50LmRlbHRhWSA+IDApIHtcbiAgICAgIHRoaXMuem9vbU91dCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5fc2NhbGUgPj0gMykgcmV0dXJuO1xuICAgICAgdGhpcy5fc2V0TmV3UG9zaXRpb25Pblpvb21JbihldmVudCk7XG4gICAgICB0aGlzLnpvb21JbigpO1xuICAgIH1cbiAgfVxuXG4gIHpvb21JbigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fc2NhbGUgPj0gMykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubGlnaHRib3gubGlnaHRib3hab29tSW4uZW1pdCgpO1xuXG4gICAgdGhpcy5fc2NhbGUgKz0gdGhpcy56b29tTGV2ZWw7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5hY3RpdmVJbWFnZVdyYXBwZXIsICd0cmFuc2Zvcm0nLCBgc2NhbGUoJHt0aGlzLl9zY2FsZX0pYCk7XG4gICAgdGhpcy5fdXBkYXRlWm9vbUJ0bigpO1xuXG4gICAgdGhpcy5saWdodGJveC5saWdodGJveFpvb21lZEluLmVtaXQoKTtcbiAgfVxuXG4gIHpvb21PdXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3NjYWxlIDw9IDEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmxpZ2h0Ym94LmxpZ2h0Ym94Wm9vbU91dC5lbWl0KCk7XG5cbiAgICB0aGlzLl9zY2FsZSAtPSB0aGlzLnpvb21MZXZlbDtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmFjdGl2ZUltYWdlV3JhcHBlciwgJ3RyYW5zZm9ybScsIGBzY2FsZSgke3RoaXMuX3NjYWxlfSlgKTtcblxuICAgIHRoaXMuX3VwZGF0ZVpvb21CdG4oKTtcbiAgICB0aGlzLl91cGRhdGVJbWdQb3NpdGlvbigpO1xuXG4gICAgdGhpcy5saWdodGJveC5saWdodGJveFpvb21lZE91dC5lbWl0KCk7XG4gIH1cblxuICBzbGlkZSh0YXJnZXQgPSAncmlnaHQnKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubGlnaHRib3hJdGVtcy5sZW5ndGggPD0gMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmxpZ2h0Ym94LmxpZ2h0Ym94U2xpZGUuZW1pdCgpO1xuXG4gICAgaWYgKHRhcmdldCA9PT0gJ3JpZ2h0JyB8fCB0YXJnZXQgPT09ICdmaXJzdCcpIHtcbiAgICAgIHRoaXMuc2xpZGVSaWdodCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2xpZGVSaWdodCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGNsZWFyVGltZW91dCh0aGlzLl9zbGlkZVRpbWVyKTtcblxuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuYWN0aXZlSW1hZ2VXcmFwcGVyLCAndHJhbnNmb3JtJywgJ3NjYWxlKDAuMjUpJyk7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5hY3RpdmVJbWFnZVdyYXBwZXIsICdsZWZ0JywgdGhpcy5zbGlkZVJpZ2h0ID8gJy0xMDAlJyA6ICcxMDAlJyk7XG5cbiAgICBpZiAodGFyZ2V0ID09PSAncmlnaHQnIHx8IHRhcmdldCA9PT0gJ2ZpcnN0Jykge1xuICAgICAgdGhpcy5zbGlkZVJpZ2h0ID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zbGlkZVJpZ2h0ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuX3NsaWRlVGltZXIpO1xuXG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5hY3RpdmVJbWFnZVdyYXBwZXIsICd0cmFuc2Zvcm0nLCAnc2NhbGUoMC4yNSknKTtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmFjdGl2ZUltYWdlV3JhcHBlciwgJ2xlZnQnLCB0aGlzLnNsaWRlUmlnaHQgPyAnLTEwMCUnIDogJzEwMCUnKTtcblxuICAgIHN3aXRjaCAodGFyZ2V0KSB7XG4gICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgIHRoaXMuaW5kZXggKyAxID09PSB0aGlzLnRvdGFsID8gKHRoaXMuaW5kZXggPSAwKSA6ICh0aGlzLmluZGV4ICs9IDEpO1xuICAgICAgICB0aGlzLmFjdGl2ZU1vZGFsSW1hZ2VJbmRleCArIDEgPT09IHRoaXMuaW1hZ2VXcmFwcGVycy5sZW5ndGhcbiAgICAgICAgICA/ICh0aGlzLmFjdGl2ZU1vZGFsSW1hZ2VJbmRleCA9IDApXG4gICAgICAgICAgOiAodGhpcy5hY3RpdmVNb2RhbEltYWdlSW5kZXggKz0gMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgIHRoaXMuaW5kZXggLSAxIDwgMCA/ICh0aGlzLmluZGV4ID0gdGhpcy50b3RhbCAtIDEpIDogKHRoaXMuaW5kZXggLT0gMSk7XG4gICAgICAgIHRoaXMuYWN0aXZlTW9kYWxJbWFnZUluZGV4IC0gMSA8IDBcbiAgICAgICAgICA/ICh0aGlzLmFjdGl2ZU1vZGFsSW1hZ2VJbmRleCA9IHRoaXMuaW1hZ2VXcmFwcGVycy5sZW5ndGggLSAxKVxuICAgICAgICAgIDogKHRoaXMuYWN0aXZlTW9kYWxJbWFnZUluZGV4IC09IDEpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2ZpcnN0JzpcbiAgICAgICAgdGhpcy5pbmRleCA9IDA7XG4gICAgICAgIHRoaXMuYWN0aXZlTW9kYWxJbWFnZUluZGV4ID0gMDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdsYXN0JzpcbiAgICAgICAgdGhpcy5pbmRleCA9IHRoaXMubGlnaHRib3hJdGVtcy5sZW5ndGggLSAxO1xuICAgICAgICB0aGlzLmFjdGl2ZU1vZGFsSW1hZ2VJbmRleCA9IDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgdGhpcy5fdXBkYXRlQWN0aXZlTGlnaHRib3hJdGVtKCk7XG4gICAgdGhpcy5fcHJlbG9hZEluYWN0aXZlSW1hZ2VzKCk7XG5cbiAgICBpZiAodGhpcy5hY3RpdmVJbWFnZUVsZW1lbnQuc3JjKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZnJvbUV2ZW50KHRoaXMuYWN0aXZlSW1hZ2VXcmFwcGVyLCAndHJhbnNpdGlvbmVuZCcpXG4gICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuX3Nob3dMb2FkZXIoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcmVzZXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2Z1bGxzY3JlZW4pIHtcbiAgICAgIHRoaXMudG9nZ2xlRnVsbHNjcmVlbigpO1xuICAgIH1cblxuICAgIHRoaXMuX3Jlc3RvcmVEZWZhdWx0UG9zaXRpb24oKTtcbiAgICB0aGlzLl9yZXN0b3JlRGVmYXVsdFpvb20oKTtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5fdG9vbHNUb2dnbGVUaW1lcik7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuX2RvdWJsZVRhcFRpbWVyKTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rpc2FibGVTY3JvbGwoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZG9jdW1lbnQuYm9keSwgJ2Rpc2FibGVkLXNjcm9sbCcpO1xuXG4gICAgaWYgKHRoaXMuX2RvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQgPiB0aGlzLl9kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9kb2N1bWVudC5ib2R5LCAncmVwbGFjZS1zY3JvbGxiYXInKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9lbmFibGVTY3JvbGwoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5fZG9jdW1lbnQuYm9keSwgJ2Rpc2FibGVkLXNjcm9sbCcpO1xuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2RvY3VtZW50LmJvZHksICdyZXBsYWNlLXNjcm9sbGJhcicpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVzdG9yZURlZmF1bHRab29tKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9zY2FsZSAhPT0gMSkge1xuICAgICAgdGhpcy5fc2NhbGUgPSAxO1xuXG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmFjdGl2ZUltYWdlV3JhcHBlciwgJ3RyYW5zZm9ybScsIGBzY2FsZSgke3RoaXMuX3NjYWxlfSlgKTtcblxuICAgICAgdGhpcy5fdXBkYXRlWm9vbUJ0bigpO1xuICAgICAgdGhpcy5fdXBkYXRlSW1nUG9zaXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVJbWdQb3NpdGlvbigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fc2NhbGUgPT09IDEpIHtcbiAgICAgIHRoaXMuX3Jlc3RvcmVEZWZhdWx0UG9zaXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jaGVja0RvdWJsZVRhcChldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLl9kb3VibGVUYXBUaW1lcik7XG4gICAgY29uc3QgY3VycmVudFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICBjb25zdCB0YXBMZW5ndGggPSBjdXJyZW50VGltZSAtIHRoaXMuX3RhcFRpbWU7XG5cbiAgICBpZiAodGhpcy5fdGFwQ291bnRlciA+IDAgJiYgdGFwTGVuZ3RoIDwgNTAwKSB7XG4gICAgICB0aGlzLl9vbkRvdWJsZUNsaWNrKGV2ZW50KTtcbiAgICAgIHRoaXMuX2RvdWJsZVRhcFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuX3RhcFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdGhpcy5fdGFwQ291bnRlciA9IDA7XG4gICAgICB9LCB0aGlzLl9kb3VibGVUYXBUaW1lb3V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fdGFwQ291bnRlcisrO1xuICAgICAgdGhpcy5fdGFwVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX29uRG91YmxlQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgdG91Y2hFdmVudCA9IGV2ZW50IGFzIFRvdWNoRXZlbnQ7XG5cbiAgICBpZiAodG91Y2hFdmVudC50b3VjaGVzKSB7XG4gICAgICB0aGlzLl9zZXROZXdQb3NpdGlvbk9uWm9vbUluKGV2ZW50IGFzIFdoZWVsRXZlbnQpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9zY2FsZSAhPT0gMSkge1xuICAgICAgdGhpcy5fcmVzdG9yZURlZmF1bHRab29tKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuem9vbUluKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlWm9vbUJ0bigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fc2NhbGUgPiAxKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmJ0blpvb20ubmF0aXZlRWxlbWVudCwgJ2FjdGl2ZScpO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuYnRuWm9vbS5uYXRpdmVFbGVtZW50LCAnYXJpYS1sYWJlbCcsICdab29tIG91dCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmJ0blpvb20ubmF0aXZlRWxlbWVudCwgJ2FjdGl2ZScpO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuYnRuWm9vbS5uYXRpdmVFbGVtZW50LCAnYXJpYS1sYWJlbCcsICdab29tIGluJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcmVzdG9yZURlZmF1bHRQb3NpdGlvbigpOiB2b2lkIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5fem9vbVRpbWVyKTtcblxuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuYWN0aXZlSW1hZ2VFbGVtZW50LCAnbGVmdCcsIDApO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuYWN0aXZlSW1hZ2VFbGVtZW50LCAndG9wJywgMCk7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5hY3RpdmVJbWFnZUVsZW1lbnQsICd0cmFuc2l0aW9uJywgJ2FsbCAwLjVzIGVhc2Utb3V0Jyk7XG5cbiAgICB0aGlzLl9jYWxjdWxhdGVJbWdTaXplKCk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuYWN0aXZlSW1hZ2VFbGVtZW50LCAndHJhbnNpdGlvbicsICdub25lJyk7XG4gICAgfSwgNTAwKTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUFjdGl2ZUxpZ2h0Ym94SXRlbSgpOiB2b2lkIHtcbiAgICB0aGlzLmFjdGl2ZUxpZ2h0Ym94SXRlbSA9IHRoaXMubGlnaHRib3hJdGVtcy50b0FycmF5KClbdGhpcy5pbmRleF07XG4gICAgdGhpcy5fc2V0QWN0aXZlSW1hZ2VEYXRhKCk7XG4gICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBsb2FkKCk6IHZvaWQge1xuICAgIHRoaXMuX2hpZGVMb2FkZXIoKTtcblxuICAgIGlmICh0aGlzLmFjdGl2ZUltYWdlV3JhcHBlci5zdHlsZS50cmFuc2Zvcm0gPT0gJ3NjYWxlKDAuMjUpJykge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5hY3RpdmVJbWFnZVdyYXBwZXIsICd0cmFuc2l0aW9uJywgJ25vbmUnKTtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuYWN0aXZlSW1hZ2VXcmFwcGVyLCAnbGVmdCcsIHRoaXMuc2xpZGVSaWdodCA/ICcxMDAlJyA6ICctMTAwJScpO1xuXG4gICAgICB0aGlzLl9zbGlkZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuYWN0aXZlSW1hZ2VXcmFwcGVyLCAndHJhbnNpdGlvbicsICcnKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5hY3RpdmVJbWFnZVdyYXBwZXIsICdsZWZ0JywgJzAnKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5hY3RpdmVJbWFnZVdyYXBwZXIsICd0cmFuc2Zvcm0nLCAnc2NhbGUoMSknKTtcblxuICAgICAgICB0aGlzLmxpZ2h0Ym94LmxpZ2h0Ym94U2xpZGVkLmVtaXQoKTtcbiAgICAgIH0sIDApO1xuICAgIH1cblxuICAgIHRoaXMuX2NhbGN1bGF0ZUltZ1NpemUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Nob3dMb2FkZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYWN0aXZlSW1hZ2VFbGVtZW50LnNyYykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmxvYWRlci5uYXRpdmVFbGVtZW50LCAnb3BhY2l0eScsIDEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGlkZUxvYWRlcigpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmxvYWRlci5uYXRpdmVFbGVtZW50LCAnb3BhY2l0eScsIDApO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2FsY3VsYXRlSW1nU2l6ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hY3RpdmVJbWFnZUVsZW1lbnQud2lkdGggPj0gdGhpcy5hY3RpdmVJbWFnZUVsZW1lbnQuaGVpZ2h0KSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmFjdGl2ZUltYWdlRWxlbWVudCwgJ3dpZHRoJywgJzEwMCUnKTtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuYWN0aXZlSW1hZ2VFbGVtZW50LCAnbWF4V2lkdGgnLCAnMTAwJScpO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5hY3RpdmVJbWFnZUVsZW1lbnQsICdoZWlnaHQnLCAnYXV0bycpO1xuXG4gICAgICBjb25zdCB0b3AgPSBgJHtcbiAgICAgICAgKHRoaXMuYWN0aXZlSW1hZ2VXcmFwcGVyLm9mZnNldEhlaWdodCAtIHRoaXMuYWN0aXZlSW1hZ2VFbGVtZW50LmhlaWdodCkgLyAyXG4gICAgICB9cHhgO1xuXG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmFjdGl2ZUltYWdlRWxlbWVudCwgJ3RvcCcsIHRvcCk7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmFjdGl2ZUltYWdlRWxlbWVudCwgJ2xlZnQnLCAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5hY3RpdmVJbWFnZUVsZW1lbnQsICdoZWlnaHQnLCAnMTAwJScpO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5hY3RpdmVJbWFnZUVsZW1lbnQsICdtYXhIZWlnaHQnLCAnMTAwJScpO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5hY3RpdmVJbWFnZUVsZW1lbnQsICd3aWR0aCcsICdhdXRvJyk7XG5cbiAgICAgIGNvbnN0IGxlZnQgPSBgJHsodGhpcy5hY3RpdmVJbWFnZVdyYXBwZXIub2Zmc2V0V2lkdGggLSB0aGlzLmFjdGl2ZUltYWdlRWxlbWVudC53aWR0aCkgLyAyfXB4YDtcblxuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5hY3RpdmVJbWFnZUVsZW1lbnQsICdsZWZ0JywgbGVmdCk7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmFjdGl2ZUltYWdlRWxlbWVudCwgJ3RvcCcsIDApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmFjdGl2ZUltYWdlRWxlbWVudC53aWR0aCA+PSB0aGlzLmFjdGl2ZUltYWdlV3JhcHBlci5vZmZzZXRXaWR0aCkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgIHRoaXMuYWN0aXZlSW1hZ2VFbGVtZW50LFxuICAgICAgICAnd2lkdGgnLFxuICAgICAgICBgJHt0aGlzLmFjdGl2ZUltYWdlV3JhcHBlci5vZmZzZXRXaWR0aH1weGBcbiAgICAgICk7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmFjdGl2ZUltYWdlRWxlbWVudCwgJ2hlaWdodCcsICdhdXRvJyk7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmFjdGl2ZUltYWdlRWxlbWVudCwgJ2hlaWdodCcsICdhdXRvJyk7XG5cbiAgICAgIGNvbnN0IHRvcCA9IGAke1xuICAgICAgICAodGhpcy5hY3RpdmVJbWFnZVdyYXBwZXIub2Zmc2V0SGVpZ2h0IC0gdGhpcy5hY3RpdmVJbWFnZUVsZW1lbnQuaGVpZ2h0KSAvIDJcbiAgICAgIH1weGA7XG5cbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuYWN0aXZlSW1hZ2VFbGVtZW50LCAndG9wJywgdG9wKTtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuYWN0aXZlSW1hZ2VFbGVtZW50LCAnbGVmdCcsIDApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmFjdGl2ZUltYWdlRWxlbWVudC5oZWlnaHQgPj0gdGhpcy5hY3RpdmVJbWFnZVdyYXBwZXIub2Zmc2V0SGVpZ2h0KSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgdGhpcy5hY3RpdmVJbWFnZUVsZW1lbnQsXG4gICAgICAgICdoZWlnaHQnLFxuICAgICAgICBgJHt0aGlzLmFjdGl2ZUltYWdlV3JhcHBlci5vZmZzZXRIZWlnaHR9cHhgXG4gICAgICApO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5hY3RpdmVJbWFnZUVsZW1lbnQsICd3aWR0aCcsICdhdXRvJyk7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmFjdGl2ZUltYWdlRWxlbWVudCwgJ3RvcCcsIDApO1xuXG4gICAgICBjb25zdCBsZWZ0ID0gYCR7KHRoaXMuYWN0aXZlSW1hZ2VXcmFwcGVyLm9mZnNldFdpZHRoIC0gdGhpcy5hY3RpdmVJbWFnZUVsZW1lbnQud2lkdGgpIC8gMn1weGA7XG5cbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuYWN0aXZlSW1hZ2VFbGVtZW50LCAnbGVmdCcsIGxlZnQpO1xuICAgIH1cbiAgfVxufVxuIiwiPGRpdiAjZ2FsbGVyeVRvb2xiYXIgY2xhc3M9XCJsaWdodGJveC1nYWxsZXJ5LXRvb2xiYXJcIj5cbiAgPGRpdiAjbG9hZGVyIGNsYXNzPVwibGlnaHRib3gtZ2FsbGVyeS1sb2FkZXJcIiBzdHlsZT1cIm9wYWNpdHk6IDBcIj5cbiAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1ncm93IHRleHQtbGlnaHRcIiByb2xlPVwic3RhdHVzXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cInNyLW9ubHlcIj5Mb2FkaW5nLi4uPC9zcGFuPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImxpZ2h0Ym94LWdhbGxlcnktbGVmdC10b29sc1wiPlxuICAgIDxwIGNsYXNzPVwibGlnaHRib3gtZ2FsbGVyeS1jb3VudGVyXCI+e3sgaW5kZXggKyAxIH19IC8ge3sgdG90YWwgfX08L3A+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwibGlnaHRib3gtZ2FsbGVyeS1yaWdodC10b29sc1wiPlxuICAgIDxidXR0b25cbiAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgI2J0bkZ1bGxzcmVlblxuICAgICAgY2xhc3M9XCJsaWdodGJveC1nYWxsZXJ5LWJ1dHRvbiBsaWdodGJveC1nYWxsZXJ5LWZ1bGxzY3JlZW4tYnRuXCJcbiAgICAgIFtuZ0NsYXNzXT1cInsgJ2ZvbnRhd2Vzb21lLXBybyc6IGxpZ2h0Ym94LmZvbnRBd2Vzb21lID09PSAncHJvJyB9XCJcbiAgICAgIGFyaWEtbGFiZWw9XCJUb2dnbGUgZnVsbHNjcmVlblwiXG4gICAgICAoY2xpY2spPVwidG9nZ2xlRnVsbHNjcmVlbigpXCJcbiAgICA+PC9idXR0b24+XG4gICAgPGJ1dHRvblxuICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAjYnRuWm9vbVxuICAgICAgY2xhc3M9XCJsaWdodGJveC1nYWxsZXJ5LWJ1dHRvbiBsaWdodGJveC1nYWxsZXJ5LXpvb20tYnRuXCJcbiAgICAgIFtuZ0NsYXNzXT1cInsgJ2ZvbnRhd2Vzb21lLXBybyc6IGxpZ2h0Ym94LmZvbnRBd2Vzb21lID09PSAncHJvJyB9XCJcbiAgICAgIGFyaWEtbGFiZWw9XCJab29tIGluXCJcbiAgICAgIChjbGljayk9XCJ6b29tKClcIlxuICAgID48L2J1dHRvbj5cbiAgICA8YnV0dG9uXG4gICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgIGNsYXNzPVwibGlnaHRib3gtZ2FsbGVyeS1idXR0b24gbGlnaHRib3gtZ2FsbGVyeS1jbG9zZS1idG5cIlxuICAgICAgW25nQ2xhc3NdPVwieyAnZm9udGF3ZXNvbWUtcHJvJzogbGlnaHRib3guZm9udEF3ZXNvbWUgPT09ICdwcm8nIH1cIlxuICAgICAgYXJpYS1sYWJlbD1cIkNsb3NlXCJcbiAgICAgIChjbGljayk9XCJjbG9zZSgpXCJcbiAgICA+PC9idXR0b24+XG4gIDwvZGl2PlxuPC9kaXY+XG5cbjxkaXYgY2xhc3M9XCJsaWdodGJveC1nYWxsZXJ5LWNvbnRlbnRcIj5cbiAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgaXRlbSBvZiBbXS5jb25zdHJ1Y3RvcigzKTsgbGV0IGluZGV4ID0gaW5kZXhcIj5cbiAgICA8ZGl2IFxuICAgICAgI2ltYWdlV3JhcHBlclxuICAgICAgY2xhc3M9XCJsaWdodGJveC1nYWxsZXJ5LWltYWdlXCJcbiAgICAgIFtuZ1N0eWxlXT1cInsnb3BhY2l0eSc6IGFjdGl2ZU1vZGFsSW1hZ2VJbmRleCA9PT0gaW5kZXggPyAnMScgOiAnMCd9XCJcbiAgICA+XG4gICAgICA8aW1nXG4gICAgICAgICNpbWFnZVxuICAgICAgICBkcmFnZ2FibGU9XCJmYWxzZVwiXG4gICAgICAgIEBmYWRlXG4gICAgICAgIChsb2FkKT1cImxvYWQoKVwiXG4gICAgICAgIChtb3VzZWRvd24pPVwib25Nb3VzZWRvd24oJGV2ZW50KVwiXG4gICAgICAgIChtb3VzZXVwKT1cIm9uTW91c2V1cCgkZXZlbnQpXCJcbiAgICAgICAgKG1vdXNlbW92ZSk9XCJvbk1vdXNlbW92ZSgkZXZlbnQpXCJcbiAgICAgICAgKHdoZWVsKT1cIm9uV2hlZWwoJGV2ZW50KVwiXG4gICAgICAvPlxuICAgIDwvZGl2PlxuICA8L25nLWNvbnRhaW5lcj5cbjwvZGl2PlxuXG48ZGl2ICNsZWZ0QXJyb3cgY2xhc3M9XCJsaWdodGJveC1nYWxsZXJ5LWFycm93LWxlZnRcIiBzdHlsZT1cIm9wYWNpdHk6IDFcIj5cbiAgPGJ1dHRvblxuICAgIHR5cGU9XCJidXR0b25cIlxuICAgICNidG5QcmV2aW91c1xuICAgIGFyaWEtbGFiZWw9XCJQcmV2aW91c1wiXG4gICAgKGNsaWNrKT1cInNsaWRlKCdsZWZ0JylcIlxuICAgIGNsYXNzPVwibGlnaHRib3gtZ2FsbGVyeS1idXR0b25cIlxuICAgIFtuZ0NsYXNzXT1cInsgJ2ZvbnRhd2Vzb21lLXBybyc6IGxpZ2h0Ym94LmZvbnRBd2Vzb21lID09PSAncHJvJyB9XCJcbiAgPjwvYnV0dG9uPlxuPC9kaXY+XG48ZGl2ICNyaWdodEFycm93IGNsYXNzPVwibGlnaHRib3gtZ2FsbGVyeS1hcnJvdy1yaWdodFwiIHN0eWxlPVwib3BhY2l0eTogMVwiPlxuICA8YnV0dG9uXG4gICAgdHlwZT1cImJ1dHRvblwiXG4gICAgI2J0bk5leHRcbiAgICBhcmlhLWxhYmVsPVwiTmV4dFwiXG4gICAgKGNsaWNrKT1cInNsaWRlKCdyaWdodCcpXCJcbiAgICBjbGFzcz1cImxpZ2h0Ym94LWdhbGxlcnktYnV0dG9uXCJcbiAgICBbbmdDbGFzc109XCJ7ICdmb250YXdlc29tZS1wcm8nOiBsaWdodGJveC5mb250QXdlc29tZSA9PT0gJ3BybycgfVwiXG4gID48L2J1dHRvbj5cbjwvZGl2PlxuPGRpdiBjbGFzcz1cImxpZ2h0Ym94LWdhbGxlcnktY2FwdGlvbi13cmFwcGVyXCI+XG4gIDxwIGNsYXNzPVwibGlnaHRib3gtZ2FsbGVyeS1jYXB0aW9uXCI+XG4gICAge3sgYWN0aXZlTGlnaHRib3hJdGVtLmNhcHRpb24gfHwgYWN0aXZlTGlnaHRib3hJdGVtLmVsLm5hdGl2ZUVsZW1lbnQuYWx0IH19XG4gIDwvcD5cbjwvZGl2PlxuIl19