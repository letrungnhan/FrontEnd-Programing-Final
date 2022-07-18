import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from '@angular/core';
import { Directive, Input, HostListener, HostBinding, forwardRef, Component, ChangeDetectionStrategy, Inject, ViewChild, ViewChildren, EventEmitter, ViewEncapsulation, Output, ContentChildren, NgModule } from '@angular/core';
import { Subject, fromEvent, merge } from 'rxjs';
import * as i2 from '@angular/common';
import { DOCUMENT, CommonModule } from '@angular/common';
import * as i1$1 from '@angular/cdk/overlay';
import { OverlayConfig, OverlayModule } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
import { take, startWith, switchMap, takeUntil, filter } from 'rxjs/operators';
import * as i1 from '@angular/cdk/a11y';

class MdbLightboxItemDirective {
    constructor(el) {
        this.el = el;
        this._disabled = false;
        this.click$ = new Subject();
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    onClick() {
        if (this.disabled) {
            return;
        }
        this.click$.next(this);
    }
    get isDisabled() {
        return this.disabled;
    }
    ngOnDestroy() {
        this.click$.complete();
    }
}
MdbLightboxItemDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbLightboxItemDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
MdbLightboxItemDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.7", type: MdbLightboxItemDirective, selector: "[mdbLightboxItem]", inputs: { caption: "caption", img: "img", disabled: "disabled" }, host: { listeners: { "click": "onClick($event.target)" }, properties: { "class.lightbox-disabled": "this.isDisabled" } }, exportAs: ["mdbLightboxItem"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbLightboxItemDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mdbLightboxItem]',
                    exportAs: 'mdbLightboxItem',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { caption: [{
                type: Input
            }], img: [{
                type: Input
            }], disabled: [{
                type: Input
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event.target']]
            }], isDisabled: [{
                type: HostBinding,
                args: ['class.lightbox-disabled']
            }] } });

class MdbLightboxModalComponent {
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
                }] }, { type: MdbLightboxComponent, decorators: [{
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

class MdbLightboxComponent {
    constructor(_overlay, _vcr) {
        this._overlay = _overlay;
        this._vcr = _vcr;
        this.zoomLevel = 1;
        this.fontAwesome = 'free';
        this.lightboxOpen = new EventEmitter();
        this.lightboxOpened = new EventEmitter();
        this.lightboxSlide = new EventEmitter();
        this.lightboxSlided = new EventEmitter();
        this.lightboxZoomIn = new EventEmitter();
        this.lightboxZoomedIn = new EventEmitter();
        this.lightboxZoomOut = new EventEmitter();
        this.lightboxZoomedOut = new EventEmitter();
        this.lightboxClose = new EventEmitter();
        this.lightboxClosed = new EventEmitter();
        this._destroy$ = new Subject();
    }
    ngAfterContentInit() {
        this.lightboxItems.changes
            .pipe(startWith(this.lightboxItems), switchMap((items) => {
            return merge(...items.map((item) => item.click$));
        }), takeUntil(this._destroy$))
            .subscribe((clickedItem) => {
            this.open(clickedItem);
        });
    }
    _patchInputValues(lightboxItem) {
        this._contentRef.instance.lightboxItems = this.lightboxItems;
        this._contentRef.instance.activeLightboxItem = lightboxItem;
        this._contentRef.instance.zoomLevel = this.zoomLevel;
    }
    open(lightboxItem) {
        let overlayRef = this._overlayRef;
        if (!overlayRef) {
            this.lightboxOpen.emit();
            this._portal = new ComponentPortal(MdbLightboxModalComponent, this._vcr);
            overlayRef = this._overlay.create(this._getOverlayConfig());
            this._overlayRef = overlayRef;
        }
        if (overlayRef && this._overlayRef && !overlayRef.hasAttached()) {
            this._contentRef = this._overlayRef.attach(this._portal);
            this._patchInputValues(lightboxItem);
            this._listenToOutsideClick();
            this.lightboxOpened.emit();
        }
    }
    close() {
        if (this._overlayRef && this._overlayRef.backdropElement) {
            this.lightboxClose.emit();
            const cssTransitionDuration = parseFloat(getComputedStyle(this._overlayRef.backdropElement).transitionDuration) * 1000;
            setTimeout(() => {
                this._destroyOverlay();
                this.lightboxClosed.emit();
            }, cssTransitionDuration);
        }
    }
    slide(direction) {
        this._contentRef.instance.slide(direction);
    }
    zoomIn() {
        this._contentRef.instance.zoomIn();
    }
    zoomOut() {
        this._contentRef.instance.zoomOut();
    }
    toggleFullscreen() {
        this._contentRef.instance.toggleFullscreen();
    }
    reset() {
        this._contentRef.instance.reset();
    }
    _getOverlayConfig() {
        const positionStrategy = this._overlay
            .position()
            .global()
            .centerHorizontally()
            .centerVertically();
        const overlayConfig = new OverlayConfig({
            hasBackdrop: true,
            scrollStrategy: this._overlay.scrollStrategies.noop(),
            positionStrategy,
            backdropClass: 'lightbox-gallery',
        });
        return overlayConfig;
    }
    _destroyOverlay() {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
        }
    }
    _listenToOutsideClick() {
        if (this._overlayRef) {
            merge(this._overlayRef.backdropClick(), this._overlayRef.detachments(), this._overlayRef.keydownEvents().pipe(filter((event) => {
                return event.key === 'escape';
            }))).subscribe((event) => {
                if (event) {
                    event.preventDefault();
                }
                this.close();
            });
        }
    }
    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
        this._destroyOverlay();
    }
}
MdbLightboxComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbLightboxComponent, deps: [{ token: i1$1.Overlay }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component });
MdbLightboxComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbLightboxComponent, selector: "mdb-lightbox", inputs: { zoomLevel: "zoomLevel", fontAwesome: "fontAwesome" }, outputs: { lightboxOpen: "lightboxOpen", lightboxOpened: "lightboxOpened", lightboxSlide: "lightboxSlide", lightboxSlided: "lightboxSlided", lightboxZoomIn: "lightboxZoomIn", lightboxZoomedIn: "lightboxZoomedIn", lightboxZoomOut: "lightboxZoomOut", lightboxZoomedOut: "lightboxZoomedOut", lightboxClose: "lightboxClose", lightboxClosed: "lightboxClosed" }, queries: [{ propertyName: "lightboxItems", predicate: MdbLightboxItemDirective, descendants: true }], ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbLightboxComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mdb-lightbox',
                    template: '<ng-content></ng-content>',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i1$1.Overlay }, { type: i0.ViewContainerRef }]; }, propDecorators: { zoomLevel: [{
                type: Input
            }], fontAwesome: [{
                type: Input
            }], lightboxOpen: [{
                type: Output
            }], lightboxOpened: [{
                type: Output
            }], lightboxSlide: [{
                type: Output
            }], lightboxSlided: [{
                type: Output
            }], lightboxZoomIn: [{
                type: Output
            }], lightboxZoomedIn: [{
                type: Output
            }], lightboxZoomOut: [{
                type: Output
            }], lightboxZoomedOut: [{
                type: Output
            }], lightboxClose: [{
                type: Output
            }], lightboxClosed: [{
                type: Output
            }], lightboxItems: [{
                type: ContentChildren,
                args: [MdbLightboxItemDirective, { descendants: true }]
            }] } });

class MdbLightboxModule {
}
MdbLightboxModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbLightboxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbLightboxModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbLightboxModule, declarations: [MdbLightboxComponent, MdbLightboxItemDirective, MdbLightboxModalComponent], imports: [CommonModule, OverlayModule], exports: [MdbLightboxComponent, MdbLightboxItemDirective, MdbLightboxModalComponent] });
MdbLightboxModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbLightboxModule, imports: [[CommonModule, OverlayModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbLightboxModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, OverlayModule],
                    declarations: [MdbLightboxComponent, MdbLightboxItemDirective, MdbLightboxModalComponent],
                    exports: [MdbLightboxComponent, MdbLightboxItemDirective, MdbLightboxModalComponent],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MdbLightboxComponent, MdbLightboxItemDirective, MdbLightboxModalComponent, MdbLightboxModule };
//# sourceMappingURL=mdb-angular-ui-kit-lightbox.mjs.map
