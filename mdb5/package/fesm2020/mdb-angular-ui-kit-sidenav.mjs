import * as i0 from '@angular/core';
import { ElementRef, Component, ChangeDetectionStrategy, ContentChild, ViewChild, EventEmitter, forwardRef, Inject, ContentChildren, Input, Output, Optional, NgModule } from '@angular/core';
import * as i1 from '@angular/common';
import { DOCUMENT, CommonModule } from '@angular/common';
import { MdbCollapseDirective, MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { fromEvent, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i1$1 from '@angular/cdk/a11y';
import * as i3 from 'mdb-angular-ui-kit/scrollbar';
import { MdbScrollbarModule } from 'mdb-angular-ui-kit/scrollbar';
import * as i1$2 from '@angular/router';

class MdbSidenavLayoutComponent {
    constructor(_cdRef) {
        this._cdRef = _cdRef;
        this.showBackdrop = false;
        this.backdropStyle = {
            transition: '',
            position: '',
            width: '',
            height: '',
            opacity: 0,
        };
    }
    markForCheck() {
        this._cdRef.markForCheck();
    }
    ngAfterViewInit() {
        this.backdropStyle.transition = `opacity ${this._sidenav.sidenavTransitionDuration} ease-out`;
        this.backdropStyle.position = this._sidenav.position;
        this.backdropStyle.width = this._sidenav.position === 'fixed' ? '100vw' : '100%';
        this.backdropStyle.height = this._sidenav.position === 'fixed' ? '100vh' : '100%';
        this.backdropStyle.opacity = 1;
        // Backdrop
        if (this._sidenav.backdrop && !this._sidenav.hidden && this._sidenav.mode === 'over') {
            this.showBackdrop = true;
        }
    }
    onBackdropClick() {
        this.markForCheck();
        this._sidenav.triggetVisibilityEvents(false);
        this._sidenav.updateSidenav(false);
    }
    toggleBackdrop(show) {
        this.markForCheck();
        if (show && this._sidenav.mode === 'over') {
            this.showBackdrop = true;
            this.backdropStyle.opacity = 1;
        }
        else {
            this.backdropStyle.opacity = 0;
            setTimeout(() => {
                this.showBackdrop = false;
                this.markForCheck();
            }, this._sidenav.transitionDuration);
        }
    }
}
MdbSidenavLayoutComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbSidenavLayoutComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MdbSidenavLayoutComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbSidenavLayoutComponent, selector: "mdb-sidenav-layout", queries: [{ propertyName: "_sidenav", first: true, predicate: ["sidenav"], descendants: true }, { propertyName: "_sidenavContent", first: true, predicate: ["sidenavContent"], descendants: true, read: ElementRef }], viewQueries: [{ propertyName: "_backdropEl", first: true, predicate: ["backdrop"], descendants: true }], ngImport: i0, template: "<ng-content></ng-content>\n<div\n  #backdrop\n  class=\"sidenav-backdrop\"\n  ngClass=\"{{ _sidenav.backdropClass }}\"\n  (click)=\"onBackdropClick()\"\n  [ngStyle]=\"backdropStyle\"\n  *ngIf=\"showBackdrop && _sidenav.backdrop\"\n></div>\n", directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbSidenavLayoutComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-sidenav-layout', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>\n<div\n  #backdrop\n  class=\"sidenav-backdrop\"\n  ngClass=\"{{ _sidenav.backdropClass }}\"\n  (click)=\"onBackdropClick()\"\n  [ngStyle]=\"backdropStyle\"\n  *ngIf=\"showBackdrop && _sidenav.backdrop\"\n></div>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { _sidenav: [{
                type: ContentChild,
                args: ['sidenav']
            }], _sidenavContent: [{
                type: ContentChild,
                args: ['sidenavContent', { read: ElementRef }]
            }], _backdropEl: [{
                type: ViewChild,
                args: ['backdrop']
            }] } });

class MdbSidenavComponent {
    constructor(_renderer, _elRef, _cdRef, _focusTrapFactory, _container, _document) {
        this._renderer = _renderer;
        this._elRef = _elRef;
        this._cdRef = _cdRef;
        this._focusTrapFactory = _focusTrapFactory;
        this.sidenavShow = new EventEmitter();
        this.sidenavShown = new EventEmitter();
        this.sidenavHide = new EventEmitter();
        this.sidenavHidden = new EventEmitter();
        this.sidenavExpand = new EventEmitter();
        this.sidenavExpanded = new EventEmitter();
        this.sidenavCollapse = new EventEmitter();
        this.sidenavCollapsed = new EventEmitter();
        this.sidenavUpdate = new EventEmitter();
        this._color = 'primary';
        this._accordion = false;
        this._backdrop = true;
        this._closeOnEsc = true;
        this._expandOnHover = false;
        this._hidden = true;
        this._mode = 'over';
        this._slim = false;
        this._slimCollapsed = false;
        this._slimWidth = 70;
        this._position = 'fixed';
        this._right = false;
        this._transitionDuration = 300;
        this._width = 240;
        this._focusTrap = true;
        this.translationLeft = -100;
        this.translationRight = 100;
        this._isLoaded = false;
        this.isOpen = false;
        this.sidenavLayout = _container;
        this.document = _document;
    }
    get accordion() {
        return this._accordion;
    }
    set accordion(newValue) {
        if (this._accordion !== newValue) {
            this._accordion = coerceBooleanProperty(newValue);
            this.update();
        }
    }
    get backdrop() {
        return this._backdrop;
    }
    set backdrop(newValue) {
        if (this._backdrop !== newValue) {
            this._backdrop = coerceBooleanProperty(newValue);
            this.update();
        }
    }
    get backdropClass() {
        return this._backdropClass;
    }
    set backdropClass(newValue) {
        if (this._backdropClass !== newValue) {
            this._backdropClass = newValue;
            this.update();
        }
    }
    get closeOnEsc() {
        return this._closeOnEsc;
    }
    set closeOnEsc(newValue) {
        if (this._closeOnEsc !== newValue) {
            this._closeOnEsc = coerceBooleanProperty(newValue);
            this.update();
        }
    }
    get color() {
        return this._color;
    }
    set color(newValue) {
        if (this._color !== newValue) {
            this._color = newValue;
            this.update();
        }
    }
    get expandOnHover() {
        return this._expandOnHover;
    }
    set expandOnHover(newValue) {
        if (this._expandOnHover !== newValue) {
            this._expandOnHover = coerceBooleanProperty(newValue);
            this.update();
        }
    }
    get hidden() {
        return this._hidden;
    }
    set hidden(newValue) {
        if (this._hidden !== newValue) {
            this._hidden = coerceBooleanProperty(newValue);
        }
    }
    get mode() {
        return this._mode;
    }
    set mode(newValue) {
        if (this._mode !== newValue) {
            this._mode = newValue;
            if (this._isLoaded) {
                this.updateSidenav(this.isVisible);
            }
        }
    }
    get scrollContainer() {
        return this._scrollContainer;
    }
    set scrollContainer(newValue) {
        if (this._scrollContainer !== newValue) {
            this._scrollContainer = newValue;
            this.update();
        }
    }
    get slim() {
        return this._slim;
    }
    set slim(newValue) {
        if (this._slim !== newValue) {
            this._slim = coerceBooleanProperty(newValue);
            this.update();
        }
    }
    get slimCollapsed() {
        return this._slimCollapsed;
    }
    set slimCollapsed(newValue) {
        if (this._slimCollapsed !== newValue) {
            this._slimCollapsed = coerceBooleanProperty(newValue);
            this.update();
        }
    }
    get slimWidth() {
        return this._slimWidth;
    }
    set slimWidth(newValue) {
        if (this._slimWidth !== newValue) {
            this._slimWidth = newValue;
            this.update();
        }
    }
    get position() {
        return this._position;
    }
    set position(newValue) {
        if (this._position !== newValue) {
            this._position = newValue;
            this.update();
        }
    }
    get right() {
        return this._right;
    }
    set right(newValue) {
        if (this._right !== newValue) {
            this._right = coerceBooleanProperty(newValue);
            this.update();
        }
    }
    get transitionDuration() {
        return this._transitionDuration;
    }
    set transitionDuration(newValue) {
        if (this._transitionDuration !== newValue) {
            this._transitionDuration = newValue;
            this.update();
        }
    }
    get width() {
        return this._width;
    }
    set width(newValue) {
        if (this._width !== newValue) {
            this._width = newValue;
            this.update();
        }
    }
    get focusTrap() {
        return this._focusTrap;
    }
    set focusTrap(newValue) {
        if (this._focusTrap !== newValue) {
            this._focusTrap = coerceBooleanProperty(newValue);
            this.update();
        }
    }
    ngAfterViewInit() {
        if (this.mode) {
            this.setMode(this.mode);
        }
        this._isLoaded = true;
        this._setup();
        if (!this.hidden && this.backdrop) {
            Promise.resolve().then(() => {
                this.sidenavLayout.toggleBackdrop(true);
            });
        }
    }
    get container() {
        if (this.position === 'fixed') {
            return this.document.body;
        }
        const findContainer = (el) => {
            if (!el.parentNode || el.parentNode === document) {
                return el;
            }
            if (el.parentNode.style.position === 'relative') {
                return el.parentNode;
            }
            return findContainer(el.parentNode);
        };
        return findContainer(this._sidenav.nativeElement);
    }
    get translation() {
        return this.right ? this.translationRight : this.translationLeft;
    }
    get sidenavTransitionDuration() {
        return `${this.transitionDuration / 1000}s`;
    }
    get isVisible() {
        let containerStart = 0;
        let containerEnd = document.documentElement.clientWidth;
        if (this.position !== 'fixed') {
            const boundry = this.container.getBoundingClientRect();
            containerStart = boundry.x;
            containerEnd = boundry.x + boundry.width;
        }
        const { x } = this._sidenav.nativeElement.getBoundingClientRect();
        if (this.right) {
            return Math.abs(Math.floor(x - containerEnd)) > 10;
        }
        return Math.abs(Math.floor(x - containerStart)) < 10;
    }
    get sidenavWidth() {
        return this._slimCollapsed ? this.slimWidth : this.width;
    }
    get sidenavStyle() {
        return {
            width: `${this.sidenavWidth}px`,
            height: this.position === 'fixed' ? '100vh' : '100%',
            position: this.position,
            transition: `all ${this.sidenavTransitionDuration} linear`,
        };
    }
    get isAllCollapsed() {
        return (this._collapse.filter((el) => {
            const styles = getComputedStyle(el.host);
            return styles.display !== 'none';
        }).length === 0);
    }
    isTheLastItemToBeCollapsed() {
        return (this._collapse.filter((el) => {
            return el.host.classList.contains('show');
        }).length === 1);
    }
    markForCheck() {
        this._cdRef.markForCheck();
    }
    toggle() {
        this.markForCheck();
        this.triggetVisibilityEvents(!this.isVisible);
        this.updateSidenav(!this.isVisible);
    }
    show() {
        this.markForCheck();
        this.triggetVisibilityEvents(true);
        this.updateSidenav(true);
    }
    hide() {
        this.markForCheck();
        this.triggetVisibilityEvents(false);
        this.updateSidenav(false);
    }
    update() {
        if (!this._isLoaded) {
            return;
        }
        this.markForCheck();
        this._setup();
    }
    setMode(newMode) {
        if (this.mode === newMode) {
            return;
        }
        this.mode = newMode;
        this.markForCheck();
        this.updateSidenav(this.isVisible);
    }
    toggleSlim() {
        this.markForCheck();
        this.setSlim(!this._slimCollapsed);
    }
    async triggerEvents(startEvent, completeEvent = '') {
        this.markForCheck();
        this[startEvent].emit(this);
        if (completeEvent) {
            await setTimeout(() => {
                this[completeEvent].emit(this);
            }, this.transitionDuration + 5);
        }
    }
    triggetVisibilityEvents(show) {
        this.markForCheck();
        const events = show ? ['sidenavShow', 'sidenavShown'] : ['sidenavHide', 'sidenavHidden'];
        const startEvent = events[0];
        const completeEvent = events[1];
        this.triggerEvents(startEvent, completeEvent);
    }
    updateSidenav(show) {
        this.markForCheck();
        if (this.focusTrap && this.mode === 'over') {
            if (!this.isVisible) {
                this._configurableFocusTrap = this._focusTrapFactory.create(this._sidenav.nativeElement);
            }
            else {
                if (this._configurableFocusTrap) {
                    this._configurableFocusTrap.destroy();
                }
            }
        }
        this._updateDisplay(show);
        if (this.backdrop) {
            this.sidenavLayout.toggleBackdrop(show);
        }
        this._updateOffsets(show);
        if (show && this.closeOnEsc && this.mode !== 'side') {
            fromEvent(this.document, 'keydown')
                .pipe(first())
                .subscribe((e) => {
                if (e.code === 'Escape') {
                    this.updateSidenav(false);
                }
            });
        }
    }
    collapseItems() {
        this.markForCheck();
        this._collapse.forEach((el) => {
            if (!el.collapsed) {
                el.hide();
            }
        });
    }
    closeOtherCollapseItems(activeCollapse) {
        this.markForCheck();
        this._collapse.forEach((el) => {
            if (!el.collapsed && el !== activeCollapse) {
                el.hide();
            }
        });
    }
    setSlim(value) {
        this.markForCheck();
        const events = value
            ? ['sidenavCollapse', 'sidenavCollapsed']
            : ['sidenavExpand', 'sidenavExpanded'];
        const startEvent = events[0];
        const completeEvent = events[1];
        this.triggerEvents(startEvent, completeEvent);
        if (value) {
            this.collapseItems();
        }
        this._slimCollapsed = value;
        this._toggleSlimDisplay(value);
        this._renderer.setStyle(this._sidenav.nativeElement, 'width', `${this.sidenavWidth}px`);
        this._updateOffsets(this.isVisible);
    }
    _setup() {
        if (this.slim) {
            this._setupSlim();
        }
        // Initial position
        this._setupInitialStyling();
        // Perfect Scrollbar
        this._setupScrolling();
        // Content
        this._setupContent();
        // Shown on init
        if (!this.hidden) {
            this._updateOffsets(true, true);
        }
    }
    _setupContent() {
        this._contentEl = this.sidenavLayout._sidenavContent.nativeElement.firstChild;
        this._initialContentStyle = { ...window.getComputedStyle(this._contentEl) };
    }
    _updateDisplay(value) {
        const translation = value ? 0 : this.translation;
        this._renderer.setStyle(this._sidenav.nativeElement, 'transform', `translateX(${translation}%)`);
    }
    _setupInitialStyling() {
        if (this.right) {
            this._renderer.addClass(this._sidenav.nativeElement, 'sidenav-right');
        }
        this._setColor();
        this._renderer.setStyle(this._sidenav.nativeElement, 'width', `${this.sidenavWidth}px`);
        this._renderer.setStyle(this._sidenav.nativeElement, 'height', this.position === 'fixed' ? '100vh' : '100%');
        this._renderer.setStyle(this._sidenav.nativeElement, 'position', this.position);
        setTimeout(() => {
            this._renderer.setStyle(this._sidenav.nativeElement, 'transition', `all ${this.sidenavTransitionDuration} linear`);
        }, 0);
    }
    _setColor() {
        const colors = [
            'primary',
            'secondary',
            'success',
            'info',
            'warning',
            'danger',
            'light',
            'dark',
        ];
        const color = colors.includes(this.color) ? this.color : 'primary';
        colors.forEach((el) => {
            this._renderer.removeClass(this._sidenav.nativeElement, `sidenav-${el}`);
        });
        this._renderer.addClass(this._sidenav.nativeElement, `sidenav-${color}`);
    }
    _updateOffsets(show, initial = false) {
        const [paddingPosition, marginPosition] = this.right ? ['right', 'left'] : ['left', 'right'];
        const padding = {
            property: this._getProperty('padding', paddingPosition),
            value: this.mode === 'over' ? 0 : this.sidenavWidth,
        };
        const margin = {
            property: this._getProperty('margin', marginPosition),
            value: this.mode === 'push' ? -1 * this.sidenavWidth : 0,
        };
        this.triggerEvents('sidenavUpdate');
        if (!this._contentEl) {
            return;
        }
        this._setContentOffsets(show, { padding, margin }, initial);
    }
    _setupSlim() {
        this._slimCollapsed = this.slimCollapsed;
        this._toggleSlimDisplay(this._slimCollapsed);
        if (this.expandOnHover) {
            this._renderer.listen(this._sidenav.nativeElement, 'mouseenter', () => {
                if (this._slimCollapsed) {
                    this.setSlim(false);
                }
            });
            this._renderer.listen(this._sidenav.nativeElement, 'mouseleave', () => {
                if (!this._slimCollapsed) {
                    this.setSlim(true);
                }
            });
        }
    }
    _toggleSlimDisplay(slim) {
        const toggleElements = () => {
            this._elRef.nativeElement.querySelectorAll('[slim="true"]').forEach((el) => {
                this._renderer.setStyle(el, 'display', this._slimCollapsed ? 'unset' : 'none');
            });
            this._elRef.nativeElement.querySelectorAll('[slim="false"]').forEach((el) => {
                this._renderer.setStyle(el, 'display', this._slimCollapsed ? 'none' : 'unset');
            });
        };
        if (slim) {
            setTimeout(() => toggleElements(), this.transitionDuration);
        }
        else {
            toggleElements();
        }
    }
    _setupScrolling() {
        let container = this.container;
        if (this.scrollContainer) {
            container = this._elRef.nativeElement.querySelector(this.scrollContainer);
            const siblings = Array.from(container.parentNode.children).filter((el) => el !== container);
            const siblingsHeight = siblings.reduce((a, b) => {
                return a + b.clientHeight;
            }, 0);
            this._renderer.setStyle(container, 'maxHeight', `calc(100% - ${siblingsHeight}px)`);
            this._renderer.setStyle(container, 'position', 'relative');
        }
    }
    _setContentOffsets(show, offsets, initial) {
        const padding = this._getOffsetValue(show, { property: 'padding', offsets });
        const margin = this._getOffsetValue(show, { property: 'margin', offsets });
        if (!initial) {
            this._renderer.setStyle(this._contentEl, 'transition', `all ${this.sidenavTransitionDuration} linear`);
        }
        this._renderer.setStyle(this._contentEl, offsets.padding.property, `${padding}px`);
        this._renderer.setStyle(this._contentEl, offsets.margin.property, `${margin}px`);
        if (!show) {
            return;
        }
        if (initial) {
            this._renderer.setStyle(this._contentEl, 'transition', this._initialContentStyle.transition);
            return;
        }
    }
    _getOffsetValue(show, { property, offsets }) {
        const initialValue = this._getPxValue(this._initialContentStyle[offsets[property].property]);
        const offset = show ? offsets[property].value : 0;
        return initialValue + offset;
    }
    _getPxValue(property) {
        if (!property) {
            return 0;
        }
        return parseFloat(property);
    }
    _getProperty(...args) {
        return args
            .map((arg, i) => {
            if (i === 0) {
                return arg;
            }
            return arg[0].toUpperCase().concat(arg.slice(1));
        })
            .join('');
    }
}
MdbSidenavComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbSidenavComponent, deps: [{ token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i1$1.ConfigurableFocusTrapFactory }, { token: forwardRef(() => MdbSidenavLayoutComponent) }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component });
MdbSidenavComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbSidenavComponent, selector: "mdb-sidenav", inputs: { accordion: "accordion", backdrop: "backdrop", backdropClass: "backdropClass", closeOnEsc: "closeOnEsc", color: "color", expandOnHover: "expandOnHover", hidden: "hidden", mode: "mode", scrollContainer: "scrollContainer", slim: "slim", slimCollapsed: "slimCollapsed", slimWidth: "slimWidth", position: "position", right: "right", transitionDuration: "transitionDuration", width: "width", focusTrap: "focusTrap" }, outputs: { sidenavShow: "sidenavShow", sidenavShown: "sidenavShown", sidenavHide: "sidenavHide", sidenavHidden: "sidenavHidden", sidenavExpand: "sidenavExpand", sidenavExpanded: "sidenavExpanded", sidenavCollapse: "sidenavCollapse", sidenavCollapsed: "sidenavCollapsed", sidenavUpdate: "sidenavUpdate" }, queries: [{ propertyName: "_collapse", predicate: MdbCollapseDirective, descendants: true }], viewQueries: [{ propertyName: "_sidenav", first: true, predicate: ["sidenav"], descendants: true }], exportAs: ["mdbSidenav"], ngImport: i0, template: "<ng-container *ngIf=\"scrollContainer\">\n  <nav #sidenav class=\"sidenav\" [ngClass]=\"{'show': !hidden}\">\n    <ng-container *ngTemplateOutlet=\"content\"></ng-container>\n  </nav>\n</ng-container>\n\n<ng-container *ngIf=\"!scrollContainer\">\n  <nav #sidenav class=\"sidenav\" mdbScrollbar [ngClass]=\"{'show': !hidden}\">\n    <ng-container *ngTemplateOutlet=\"content\"></ng-container>\n  </nav>\n</ng-container>\n\n<ng-template #content>\n  <ng-content></ng-content>\n</ng-template>\n", directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i3.MdbScrollbarDirective, selector: "[mdbScrollbar]", inputs: ["config"], outputs: ["scrollY", "scrollX", "scrollUp", "scrollDown", "scrollLeft", "scrollRight", "yReachEnd", "yReachStart", "xReachEnd", "xReachStart"], exportAs: ["mdbScrollbar"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbSidenavComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-sidenav', changeDetection: ChangeDetectionStrategy.OnPush, exportAs: 'mdbSidenav', template: "<ng-container *ngIf=\"scrollContainer\">\n  <nav #sidenav class=\"sidenav\" [ngClass]=\"{'show': !hidden}\">\n    <ng-container *ngTemplateOutlet=\"content\"></ng-container>\n  </nav>\n</ng-container>\n\n<ng-container *ngIf=\"!scrollContainer\">\n  <nav #sidenav class=\"sidenav\" mdbScrollbar [ngClass]=\"{'show': !hidden}\">\n    <ng-container *ngTemplateOutlet=\"content\"></ng-container>\n  </nav>\n</ng-container>\n\n<ng-template #content>\n  <ng-content></ng-content>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i1$1.ConfigurableFocusTrapFactory }, { type: MdbSidenavLayoutComponent, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => MdbSidenavLayoutComponent)]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { _sidenav: [{
                type: ViewChild,
                args: ['sidenav']
            }], _collapse: [{
                type: ContentChildren,
                args: [MdbCollapseDirective, { descendants: true }]
            }], accordion: [{
                type: Input
            }], backdrop: [{
                type: Input
            }], backdropClass: [{
                type: Input
            }], closeOnEsc: [{
                type: Input
            }], color: [{
                type: Input
            }], expandOnHover: [{
                type: Input
            }], hidden: [{
                type: Input
            }], mode: [{
                type: Input
            }], scrollContainer: [{
                type: Input
            }], slim: [{
                type: Input
            }], slimCollapsed: [{
                type: Input
            }], slimWidth: [{
                type: Input
            }], position: [{
                type: Input
            }], right: [{
                type: Input
            }], transitionDuration: [{
                type: Input
            }], width: [{
                type: Input
            }], focusTrap: [{
                type: Input
            }], sidenavShow: [{
                type: Output
            }], sidenavShown: [{
                type: Output
            }], sidenavHide: [{
                type: Output
            }], sidenavHidden: [{
                type: Output
            }], sidenavExpand: [{
                type: Output
            }], sidenavExpanded: [{
                type: Output
            }], sidenavCollapse: [{
                type: Output
            }], sidenavCollapsed: [{
                type: Output
            }], sidenavUpdate: [{
                type: Output
            }] } });

class MdbSidenavContentComponent {
    constructor() { }
}
MdbSidenavContentComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbSidenavContentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MdbSidenavContentComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbSidenavContentComponent, selector: "mdb-sidenav-content", ngImport: i0, template: "<div>\n  <ng-content></ng-content>\n</div>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbSidenavContentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-sidenav-content', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div>\n  <ng-content></ng-content>\n</div>\n" }]
        }], ctorParameters: function () { return []; } });

class MdbSidenavItemComponent {
    constructor(_renderer, _elRef, _router, _route, _cdRef, _sidenav) {
        this._renderer = _renderer;
        this._elRef = _elRef;
        this._router = _router;
        this._route = _route;
        this._cdRef = _cdRef;
        this._sidenav = _sidenav;
        this._tempSlim = false;
        this._isSlimTransitioning = false;
        this._destroy$ = new Subject();
    }
    ngAfterContentInit() {
        if (this.collapse) {
            this.collapse.collapseShow.pipe(takeUntil(this._destroy$)).subscribe(() => {
                this._toggleArrowIcon('up');
            });
            this.collapse.collapseHide.pipe(takeUntil(this._destroy$)).subscribe(() => {
                this._toggleArrowIcon('down');
            });
        }
    }
    ngAfterViewInit() {
        if (!this.collapse) {
            return;
        }
        const links = this._elRef.nativeElement.querySelectorAll('.sidenav-link');
        links[0].innerHTML += '<i class="fas fa-angle-down rotate-icon"></i>';
        if (!this.collapse.collapsed) {
            this._toggleArrowIcon('up');
        }
        this._sidenav.sidenavCollapsed.pipe(takeUntil(this._destroy$)).subscribe(() => {
            this._isSlimTransitioning = false;
        });
        this._sidenav.sidenavCollapse.pipe(takeUntil(this._destroy$)).subscribe(() => {
            this._isSlimTransitioning = true;
        });
        this._sidenav.sidenavExpand.pipe(takeUntil(this._destroy$)).subscribe(() => {
            this._isSlimTransitioning = true;
        });
        this._sidenav.sidenavExpanded.pipe(takeUntil(this._destroy$)).subscribe(() => {
            this._isSlimTransitioning = false;
        });
        this.collapse.collapseHide.pipe(takeUntil(this._destroy$)).subscribe(() => {
            if (!this._sidenav.slim) {
                return;
            }
            if (this._sidenav.isTheLastItemToBeCollapsed() &&
                !this._sidenav.slimCollapsed &&
                !this._isSlimTransitioning) {
                this._tempSlim = false;
                this._sidenav.setSlim(true);
            }
        });
        this.collapse.host.childNodes.forEach((child) => {
            fromEvent(child, 'click')
                .pipe(takeUntil(this._destroy$))
                .subscribe(() => this.setActiveElement(child));
        });
        fromEvent(this._sidenavLink.nativeElement, 'click')
            .pipe(takeUntil(this._destroy$))
            .subscribe(() => {
            if (this._sidenav.accordion) {
                this._sidenav.closeOtherCollapseItems(this.collapse);
            }
            this.collapse.toggle();
            if (this._sidenav.slimCollapsed && !this._isSlimTransitioning) {
                this._tempSlim = true;
                this._sidenav.setSlim(false);
            }
        });
    }
    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }
    markForCheck() {
        this._cdRef.markForCheck();
    }
    setActiveElement(el) {
        this.markForCheck();
        this.collapse.host.childNodes.forEach((child) => {
            if (child instanceof HTMLElement) {
                if (el === child) {
                    this._renderer.addClass(child.querySelector('.sidenav-link'), 'active');
                }
                else {
                    this._renderer.removeClass(child.querySelector('.sidenav-link'), 'active');
                }
            }
        });
    }
    setActiveCategory() {
        this.markForCheck();
        this._renderer.addClass(this._sidenavLink.nativeElement.querySelector('.sidenav-link'), 'active');
    }
    unsetActiveCategory() {
        this.markForCheck();
        this._renderer.removeClass(this._sidenavLink.nativeElement.querySelector('.sidenav-link'), 'active');
    }
    _toggleArrowIcon(direction) {
        const arrowIcon = this._sidenavLink.nativeElement.querySelector('.fa-angle-down');
        if (direction === 'down') {
            this._renderer.setStyle(arrowIcon, 'transform', 'rotate(0deg)');
        }
        else {
            this._renderer.setStyle(arrowIcon, 'transform', 'rotate(180deg)');
        }
    }
}
MdbSidenavItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbSidenavItemComponent, deps: [{ token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i1$2.Router, optional: true }, { token: i1$2.ActivatedRoute, optional: true }, { token: i0.ChangeDetectorRef }, { token: forwardRef(() => MdbSidenavComponent) }], target: i0.ɵɵFactoryTarget.Component });
MdbSidenavItemComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbSidenavItemComponent, selector: "mdb-sidenav-item", queries: [{ propertyName: "collapse", first: true, predicate: MdbCollapseDirective, descendants: true }], viewQueries: [{ propertyName: "_sidenavLink", first: true, predicate: ["linkWrapper"], descendants: true }], ngImport: i0, template: "<li class=\"sidenav-item\">\n  <div #linkWrapper>\n    <ng-content select=\".sidenav-link\"></ng-content>\n  </div>\n  <ng-content select=\".sidenav-collapse\"></ng-content>\n</li>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbSidenavItemComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-sidenav-item', changeDetection: ChangeDetectionStrategy.OnPush, template: "<li class=\"sidenav-item\">\n  <div #linkWrapper>\n    <ng-content select=\".sidenav-link\"></ng-content>\n  </div>\n  <ng-content select=\".sidenav-collapse\"></ng-content>\n</li>\n" }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i1$2.Router, decorators: [{
                    type: Optional
                }] }, { type: i1$2.ActivatedRoute, decorators: [{
                    type: Optional
                }] }, { type: i0.ChangeDetectorRef }, { type: MdbSidenavComponent, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => MdbSidenavComponent)]
                }] }]; }, propDecorators: { _sidenavLink: [{
                type: ViewChild,
                args: ['linkWrapper']
            }], collapse: [{
                type: ContentChild,
                args: [MdbCollapseDirective]
            }] } });

class MdbSidenavModule {
}
MdbSidenavModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbSidenavModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbSidenavModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbSidenavModule, declarations: [MdbSidenavComponent,
        MdbSidenavLayoutComponent,
        MdbSidenavContentComponent,
        MdbSidenavItemComponent], imports: [CommonModule, MdbCollapseModule, MdbScrollbarModule], exports: [MdbSidenavComponent,
        MdbSidenavLayoutComponent,
        MdbSidenavContentComponent,
        MdbSidenavItemComponent] });
MdbSidenavModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbSidenavModule, imports: [[CommonModule, MdbCollapseModule, MdbScrollbarModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbSidenavModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, MdbCollapseModule, MdbScrollbarModule],
                    declarations: [
                        MdbSidenavComponent,
                        MdbSidenavLayoutComponent,
                        MdbSidenavContentComponent,
                        MdbSidenavItemComponent,
                    ],
                    exports: [
                        MdbSidenavComponent,
                        MdbSidenavLayoutComponent,
                        MdbSidenavContentComponent,
                        MdbSidenavItemComponent,
                    ],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MdbSidenavComponent, MdbSidenavContentComponent, MdbSidenavItemComponent, MdbSidenavLayoutComponent, MdbSidenavModule };
//# sourceMappingURL=mdb-angular-ui-kit-sidenav.mjs.map
