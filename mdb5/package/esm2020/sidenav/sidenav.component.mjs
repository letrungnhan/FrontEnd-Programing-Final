import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, forwardRef, Inject, Input, Output, ViewChild, } from '@angular/core';
import { MdbSidenavLayoutComponent } from './sidenav-loyaut.component';
import { DOCUMENT } from '@angular/common';
import { MdbCollapseDirective } from 'mdb-angular-ui-kit/collapse';
import { fromEvent } from 'rxjs';
import { first } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/a11y";
import * as i2 from "@angular/common";
import * as i3 from "mdb-angular-ui-kit/scrollbar";
import * as i4 from "./sidenav-loyaut.component";
export class MdbSidenavComponent {
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
MdbSidenavComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbSidenavComponent, deps: [{ token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i1.ConfigurableFocusTrapFactory }, { token: forwardRef(() => MdbSidenavLayoutComponent) }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component });
MdbSidenavComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbSidenavComponent, selector: "mdb-sidenav", inputs: { accordion: "accordion", backdrop: "backdrop", backdropClass: "backdropClass", closeOnEsc: "closeOnEsc", color: "color", expandOnHover: "expandOnHover", hidden: "hidden", mode: "mode", scrollContainer: "scrollContainer", slim: "slim", slimCollapsed: "slimCollapsed", slimWidth: "slimWidth", position: "position", right: "right", transitionDuration: "transitionDuration", width: "width", focusTrap: "focusTrap" }, outputs: { sidenavShow: "sidenavShow", sidenavShown: "sidenavShown", sidenavHide: "sidenavHide", sidenavHidden: "sidenavHidden", sidenavExpand: "sidenavExpand", sidenavExpanded: "sidenavExpanded", sidenavCollapse: "sidenavCollapse", sidenavCollapsed: "sidenavCollapsed", sidenavUpdate: "sidenavUpdate" }, queries: [{ propertyName: "_collapse", predicate: MdbCollapseDirective, descendants: true }], viewQueries: [{ propertyName: "_sidenav", first: true, predicate: ["sidenav"], descendants: true }], exportAs: ["mdbSidenav"], ngImport: i0, template: "<ng-container *ngIf=\"scrollContainer\">\n  <nav #sidenav class=\"sidenav\" [ngClass]=\"{'show': !hidden}\">\n    <ng-container *ngTemplateOutlet=\"content\"></ng-container>\n  </nav>\n</ng-container>\n\n<ng-container *ngIf=\"!scrollContainer\">\n  <nav #sidenav class=\"sidenav\" mdbScrollbar [ngClass]=\"{'show': !hidden}\">\n    <ng-container *ngTemplateOutlet=\"content\"></ng-container>\n  </nav>\n</ng-container>\n\n<ng-template #content>\n  <ng-content></ng-content>\n</ng-template>\n", directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i3.MdbScrollbarDirective, selector: "[mdbScrollbar]", inputs: ["config"], outputs: ["scrollY", "scrollX", "scrollUp", "scrollDown", "scrollLeft", "scrollRight", "yReachEnd", "yReachStart", "xReachEnd", "xReachStart"], exportAs: ["mdbScrollbar"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbSidenavComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-sidenav', changeDetection: ChangeDetectionStrategy.OnPush, exportAs: 'mdbSidenav', template: "<ng-container *ngIf=\"scrollContainer\">\n  <nav #sidenav class=\"sidenav\" [ngClass]=\"{'show': !hidden}\">\n    <ng-container *ngTemplateOutlet=\"content\"></ng-container>\n  </nav>\n</ng-container>\n\n<ng-container *ngIf=\"!scrollContainer\">\n  <nav #sidenav class=\"sidenav\" mdbScrollbar [ngClass]=\"{'show': !hidden}\">\n    <ng-container *ngTemplateOutlet=\"content\"></ng-container>\n  </nav>\n</ng-container>\n\n<ng-template #content>\n  <ng-content></ng-content>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i1.ConfigurableFocusTrapFactory }, { type: i4.MdbSidenavLayoutComponent, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZW5hdi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvc2lkZW5hdi9zaWRlbmF2LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9zaWRlbmF2L3NpZGVuYXYuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsZUFBZSxFQUVmLFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBR04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV2QyxPQUFPLEVBQWdCLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7Ozs7OztBQU81RSxNQUFNLE9BQU8sbUJBQW1CO0lBeU45QixZQUNVLFNBQW9CLEVBQ3BCLE1BQWtCLEVBQ2xCLE1BQXlCLEVBQ3pCLGlCQUErQyxFQUNGLFVBQXFDLEVBQ3hFLFNBQVM7UUFMbkIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixXQUFNLEdBQU4sTUFBTSxDQUFZO1FBQ2xCLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQ3pCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBOEI7UUExQy9DLGdCQUFXLEdBQXNDLElBQUksWUFBWSxFQUFFLENBQUM7UUFDcEUsaUJBQVksR0FBc0MsSUFB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SztnQkFXRixLQUFLO3NCQURSLEtBQUs7Z0JBWUYsU0FBUztzQkFEWixLQUFLO2dCQVdJLFdBQVc7c0JBQXBCLE1BQU07Z0JBQ0csWUFBWTtzQkFBckIsTUFBTTtnQkFDRyxXQUFXO3NCQUFwQixNQUFNO2dCQUNHLGFBQWE7c0JBQXRCLE1BQU07Z0JBQ0csYUFBYTtzQkFBdEIsTUFBTTtnQkFDRyxlQUFlO3NCQUF4QixNQUFNO2dCQUNHLGVBQWU7c0JBQXhCLE1BQU07Z0JBQ0csZ0JBQWdCO3NCQUF6QixNQUFNO2dCQUNHLGFBQWE7c0JBQXRCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZGJTaWRlbmF2TGF5b3V0Q29tcG9uZW50IH0gZnJvbSAnLi9zaWRlbmF2LWxveWF1dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTWRiQ29sbGFwc2VEaXJlY3RpdmUgfSBmcm9tICdtZGItYW5ndWxhci11aS1raXQvY29sbGFwc2UnO1xuaW1wb3J0IHsgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaXJzdCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENvbmZpZ3VyYWJsZUZvY3VzVHJhcCwgQ29uZmlndXJhYmxlRm9jdXNUcmFwRmFjdG9yeSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21kYi1zaWRlbmF2JyxcbiAgdGVtcGxhdGVVcmw6ICdzaWRlbmF2LmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGV4cG9ydEFzOiAnbWRiU2lkZW5hdicsXG59KVxuZXhwb3J0IGNsYXNzIE1kYlNpZGVuYXZDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgQFZpZXdDaGlsZCgnc2lkZW5hdicpIF9zaWRlbmF2OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcbiAgQENvbnRlbnRDaGlsZHJlbihNZGJDb2xsYXBzZURpcmVjdGl2ZSwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KVxuICBfY29sbGFwc2U6IFF1ZXJ5TGlzdDxNZGJDb2xsYXBzZURpcmVjdGl2ZT47XG5cbiAgQElucHV0KClcbiAgZ2V0IGFjY29yZGlvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fYWNjb3JkaW9uO1xuICB9XG4gIHNldCBhY2NvcmRpb24obmV3VmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5fYWNjb3JkaW9uICE9PSBuZXdWYWx1ZSkge1xuICAgICAgdGhpcy5fYWNjb3JkaW9uID0gY29lcmNlQm9vbGVhblByb3BlcnR5KG5ld1ZhbHVlKTtcbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICB9XG4gIEBJbnB1dCgpXG4gIGdldCBiYWNrZHJvcCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fYmFja2Ryb3A7XG4gIH1cbiAgc2V0IGJhY2tkcm9wKG5ld1ZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuX2JhY2tkcm9wICE9PSBuZXdWYWx1ZSkge1xuICAgICAgdGhpcy5fYmFja2Ryb3AgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkobmV3VmFsdWUpO1xuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gIH1cbiAgQElucHV0KClcbiAgZ2V0IGJhY2tkcm9wQ2xhc3MoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fYmFja2Ryb3BDbGFzcztcbiAgfVxuICBzZXQgYmFja2Ryb3BDbGFzcyhuZXdWYWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuX2JhY2tkcm9wQ2xhc3MgIT09IG5ld1ZhbHVlKSB7XG4gICAgICB0aGlzLl9iYWNrZHJvcENsYXNzID0gbmV3VmFsdWU7XG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgfVxuICBASW5wdXQoKVxuICBnZXQgY2xvc2VPbkVzYygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fY2xvc2VPbkVzYztcbiAgfVxuICBzZXQgY2xvc2VPbkVzYyhuZXdWYWx1ZTogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLl9jbG9zZU9uRXNjICE9PSBuZXdWYWx1ZSkge1xuICAgICAgdGhpcy5fY2xvc2VPbkVzYyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShuZXdWYWx1ZSk7XG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgfVxuICBASW5wdXQoKVxuICBnZXQgY29sb3IoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fY29sb3I7XG4gIH1cbiAgc2V0IGNvbG9yKG5ld1ZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5fY29sb3IgIT09IG5ld1ZhbHVlKSB7XG4gICAgICB0aGlzLl9jb2xvciA9IG5ld1ZhbHVlO1xuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gIH1cbiAgQElucHV0KClcbiAgZ2V0IGV4cGFuZE9uSG92ZXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2V4cGFuZE9uSG92ZXI7XG4gIH1cbiAgc2V0IGV4cGFuZE9uSG92ZXIobmV3VmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5fZXhwYW5kT25Ib3ZlciAhPT0gbmV3VmFsdWUpIHtcbiAgICAgIHRoaXMuX2V4cGFuZE9uSG92ZXIgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkobmV3VmFsdWUpO1xuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gIH1cbiAgQElucHV0KClcbiAgZ2V0IGhpZGRlbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faGlkZGVuO1xuICB9XG4gIHNldCBoaWRkZW4obmV3VmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5faGlkZGVuICE9PSBuZXdWYWx1ZSkge1xuICAgICAgdGhpcy5faGlkZGVuID0gY29lcmNlQm9vbGVhblByb3BlcnR5KG5ld1ZhbHVlKTtcbiAgICB9XG4gIH1cbiAgQElucHV0KClcbiAgZ2V0IG1vZGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZTtcbiAgfVxuICBzZXQgbW9kZShuZXdWYWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuX21vZGUgIT09IG5ld1ZhbHVlKSB7XG4gICAgICB0aGlzLl9tb2RlID0gbmV3VmFsdWU7XG5cbiAgICAgIGlmICh0aGlzLl9pc0xvYWRlZCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVNpZGVuYXYodGhpcy5pc1Zpc2libGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBASW5wdXQoKVxuICBnZXQgc2Nyb2xsQ29udGFpbmVyKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3Njcm9sbENvbnRhaW5lcjtcbiAgfVxuICBzZXQgc2Nyb2xsQ29udGFpbmVyKG5ld1ZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5fc2Nyb2xsQ29udGFpbmVyICE9PSBuZXdWYWx1ZSkge1xuICAgICAgdGhpcy5fc2Nyb2xsQ29udGFpbmVyID0gbmV3VmFsdWU7XG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgfVxuICBASW5wdXQoKVxuICBnZXQgc2xpbSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2xpbTtcbiAgfVxuICBzZXQgc2xpbShuZXdWYWx1ZTogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLl9zbGltICE9PSBuZXdWYWx1ZSkge1xuICAgICAgdGhpcy5fc2xpbSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShuZXdWYWx1ZSk7XG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgfVxuICBASW5wdXQoKVxuICBnZXQgc2xpbUNvbGxhcHNlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2xpbUNvbGxhcHNlZDtcbiAgfVxuICBzZXQgc2xpbUNvbGxhcHNlZChuZXdWYWx1ZTogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLl9zbGltQ29sbGFwc2VkICE9PSBuZXdWYWx1ZSkge1xuICAgICAgdGhpcy5fc2xpbUNvbGxhcHNlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShuZXdWYWx1ZSk7XG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgfVxuICBASW5wdXQoKVxuICBnZXQgc2xpbVdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3NsaW1XaWR0aDtcbiAgfVxuICBzZXQgc2xpbVdpZHRoKG5ld1ZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5fc2xpbVdpZHRoICE9PSBuZXdWYWx1ZSkge1xuICAgICAgdGhpcy5fc2xpbVdpZHRoID0gbmV3VmFsdWU7XG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgfVxuICBASW5wdXQoKVxuICBnZXQgcG9zaXRpb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fcG9zaXRpb247XG4gIH1cbiAgc2V0IHBvc2l0aW9uKG5ld1ZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5fcG9zaXRpb24gIT09IG5ld1ZhbHVlKSB7XG4gICAgICB0aGlzLl9wb3NpdGlvbiA9IG5ld1ZhbHVlO1xuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gIH1cbiAgQElucHV0KClcbiAgZ2V0IHJpZ2h0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9yaWdodDtcbiAgfVxuICBzZXQgcmlnaHQobmV3VmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5fcmlnaHQgIT09IG5ld1ZhbHVlKSB7XG4gICAgICB0aGlzLl9yaWdodCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShuZXdWYWx1ZSk7XG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgfVxuICBASW5wdXQoKVxuICBnZXQgdHJhbnNpdGlvbkR1cmF0aW9uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3RyYW5zaXRpb25EdXJhdGlvbjtcbiAgfVxuICBzZXQgdHJhbnNpdGlvbkR1cmF0aW9uKG5ld1ZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5fdHJhbnNpdGlvbkR1cmF0aW9uICE9PSBuZXdWYWx1ZSkge1xuICAgICAgdGhpcy5fdHJhbnNpdGlvbkR1cmF0aW9uID0gbmV3VmFsdWU7XG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgfVxuICBASW5wdXQoKVxuICBnZXQgd2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fd2lkdGg7XG4gIH1cbiAgc2V0IHdpZHRoKG5ld1ZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5fd2lkdGggIT09IG5ld1ZhbHVlKSB7XG4gICAgICB0aGlzLl93aWR0aCA9IG5ld1ZhbHVlO1xuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKVxuICBnZXQgZm9jdXNUcmFwKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9mb2N1c1RyYXA7XG4gIH1cbiAgc2V0IGZvY3VzVHJhcChuZXdWYWx1ZTogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLl9mb2N1c1RyYXAgIT09IG5ld1ZhbHVlKSB7XG4gICAgICB0aGlzLl9mb2N1c1RyYXAgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkobmV3VmFsdWUpO1xuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gIH1cblxuICBAT3V0cHV0KCkgc2lkZW5hdlNob3c6IEV2ZW50RW1pdHRlcjxNZGJTaWRlbmF2Q29tcG9uZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHNpZGVuYXZTaG93bjogRXZlbnRFbWl0dGVyPE1kYlNpZGVuYXZDb21wb25lbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgc2lkZW5hdkhpZGU6IEV2ZW50RW1pdHRlcjxNZGJTaWRlbmF2Q29tcG9uZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHNpZGVuYXZIaWRkZW46IEV2ZW50RW1pdHRlcjxNZGJTaWRlbmF2Q29tcG9uZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHNpZGVuYXZFeHBhbmQ6IEV2ZW50RW1pdHRlcjxNZGJTaWRlbmF2Q29tcG9uZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHNpZGVuYXZFeHBhbmRlZDogRXZlbnRFbWl0dGVyPE1kYlNpZGVuYXZDb21wb25lbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgc2lkZW5hdkNvbGxhcHNlOiBFdmVudEVtaXR0ZXI8TWRiU2lkZW5hdkNvbXBvbmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBzaWRlbmF2Q29sbGFwc2VkOiBFdmVudEVtaXR0ZXI8TWRiU2lkZW5hdkNvbXBvbmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBzaWRlbmF2VXBkYXRlOiBFdmVudEVtaXR0ZXI8TWRiU2lkZW5hdkNvbXBvbmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSBfY29sb3IgPSAncHJpbWFyeSc7XG4gIHByaXZhdGUgX2FjY29yZGlvbiA9IGZhbHNlO1xuICBwcml2YXRlIF9iYWNrZHJvcCA9IHRydWU7XG4gIHByaXZhdGUgX2JhY2tkcm9wQ2xhc3M6IHN0cmluZztcbiAgcHJpdmF0ZSBfY2xvc2VPbkVzYyA9IHRydWU7XG4gIHByaXZhdGUgX2V4cGFuZE9uSG92ZXIgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfaGlkZGVuID0gdHJ1ZTtcbiAgcHJpdmF0ZSBfbW9kZSA9ICdvdmVyJztcbiAgcHJpdmF0ZSBfc2Nyb2xsQ29udGFpbmVyOiBzdHJpbmc7XG4gIHByaXZhdGUgX3NsaW0gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfc2xpbUNvbGxhcHNlZCA9IGZhbHNlO1xuICBwcml2YXRlIF9zbGltV2lkdGggPSA3MDtcbiAgcHJpdmF0ZSBfcG9zaXRpb24gPSAnZml4ZWQnO1xuICBwcml2YXRlIF9yaWdodCA9IGZhbHNlO1xuICBwcml2YXRlIF90cmFuc2l0aW9uRHVyYXRpb24gPSAzMDA7XG4gIHByaXZhdGUgX3dpZHRoID0gMjQwO1xuICBwcml2YXRlIF9mb2N1c1RyYXAgPSB0cnVlO1xuXG4gIHByaXZhdGUgdHJhbnNsYXRpb25MZWZ0ID0gLTEwMDtcbiAgcHJpdmF0ZSB0cmFuc2xhdGlvblJpZ2h0ID0gMTAwO1xuICBwcml2YXRlIF9pc0xvYWRlZCA9IGZhbHNlO1xuICBwcml2YXRlIF9jb250ZW50RWw6IENoaWxkTm9kZTtcbiAgcHJpdmF0ZSBfaW5pdGlhbENvbnRlbnRTdHlsZTogYW55O1xuICBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudDtcbiAgcHVibGljIGlzT3BlbiA9IGZhbHNlO1xuICBwdWJsaWMgc2lkZW5hdkxheW91dDogTWRiU2lkZW5hdkxheW91dENvbXBvbmVudDtcbiAgcHJpdmF0ZSBfY29uZmlndXJhYmxlRm9jdXNUcmFwOiBDb25maWd1cmFibGVGb2N1c1RyYXA7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIF9lbFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIF9jZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBfZm9jdXNUcmFwRmFjdG9yeTogQ29uZmlndXJhYmxlRm9jdXNUcmFwRmFjdG9yeSxcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTWRiU2lkZW5hdkxheW91dENvbXBvbmVudCkpIF9jb250YWluZXI6IE1kYlNpZGVuYXZMYXlvdXRDb21wb25lbnQsXG4gICAgQEluamVjdChET0NVTUVOVCkgX2RvY3VtZW50XG4gICkge1xuICAgIHRoaXMuc2lkZW5hdkxheW91dCA9IF9jb250YWluZXI7XG4gICAgdGhpcy5kb2N1bWVudCA9IF9kb2N1bWVudDtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tb2RlKSB7XG4gICAgICB0aGlzLnNldE1vZGUodGhpcy5tb2RlKTtcbiAgICB9XG5cbiAgICB0aGlzLl9pc0xvYWRlZCA9IHRydWU7XG4gICAgdGhpcy5fc2V0dXAoKTtcblxuICAgIGlmICghdGhpcy5oaWRkZW4gJiYgdGhpcy5iYWNrZHJvcCkge1xuICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuc2lkZW5hdkxheW91dC50b2dnbGVCYWNrZHJvcCh0cnVlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGdldCBjb250YWluZXIoKTogSFRNTEVsZW1lbnQge1xuICAgIGlmICh0aGlzLnBvc2l0aW9uID09PSAnZml4ZWQnKSB7XG4gICAgICByZXR1cm4gdGhpcy5kb2N1bWVudC5ib2R5O1xuICAgIH1cblxuICAgIGNvbnN0IGZpbmRDb250YWluZXIgPSAoZWwpID0+IHtcbiAgICAgIGlmICghZWwucGFyZW50Tm9kZSB8fCBlbC5wYXJlbnROb2RlID09PSBkb2N1bWVudCkge1xuICAgICAgICByZXR1cm4gZWw7XG4gICAgICB9XG4gICAgICBpZiAoZWwucGFyZW50Tm9kZS5zdHlsZS5wb3NpdGlvbiA9PT0gJ3JlbGF0aXZlJykge1xuICAgICAgICByZXR1cm4gZWwucGFyZW50Tm9kZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmaW5kQ29udGFpbmVyKGVsLnBhcmVudE5vZGUpO1xuICAgIH07XG5cbiAgICByZXR1cm4gZmluZENvbnRhaW5lcih0aGlzLl9zaWRlbmF2Lm5hdGl2ZUVsZW1lbnQpO1xuICB9XG5cbiAgZ2V0IHRyYW5zbGF0aW9uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMucmlnaHQgPyB0aGlzLnRyYW5zbGF0aW9uUmlnaHQgOiB0aGlzLnRyYW5zbGF0aW9uTGVmdDtcbiAgfVxuXG4gIGdldCBzaWRlbmF2VHJhbnNpdGlvbkR1cmF0aW9uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke3RoaXMudHJhbnNpdGlvbkR1cmF0aW9uIC8gMTAwMH1zYDtcbiAgfVxuXG4gIGdldCBpc1Zpc2libGUoKTogYm9vbGVhbiB7XG4gICAgbGV0IGNvbnRhaW5lclN0YXJ0ID0gMDtcbiAgICBsZXQgY29udGFpbmVyRW5kID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xuXG4gICAgaWYgKHRoaXMucG9zaXRpb24gIT09ICdmaXhlZCcpIHtcbiAgICAgIGNvbnN0IGJvdW5kcnkgPSB0aGlzLmNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGNvbnRhaW5lclN0YXJ0ID0gYm91bmRyeS54O1xuICAgICAgY29udGFpbmVyRW5kID0gYm91bmRyeS54ICsgYm91bmRyeS53aWR0aDtcbiAgICB9XG5cbiAgICBjb25zdCB7IHggfSA9IHRoaXMuX3NpZGVuYXYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIGlmICh0aGlzLnJpZ2h0KSB7XG4gICAgICByZXR1cm4gTWF0aC5hYnMoTWF0aC5mbG9vcih4IC0gY29udGFpbmVyRW5kKSkgPiAxMDtcbiAgICB9XG4gICAgcmV0dXJuIE1hdGguYWJzKE1hdGguZmxvb3IoeCAtIGNvbnRhaW5lclN0YXJ0KSkgPCAxMDtcbiAgfVxuXG4gIGdldCBzaWRlbmF2V2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fc2xpbUNvbGxhcHNlZCA/IHRoaXMuc2xpbVdpZHRoIDogdGhpcy53aWR0aDtcbiAgfVxuXG4gIGdldCBzaWRlbmF2U3R5bGUoKTogb2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgd2lkdGg6IGAke3RoaXMuc2lkZW5hdldpZHRofXB4YCxcbiAgICAgIGhlaWdodDogdGhpcy5wb3NpdGlvbiA9PT0gJ2ZpeGVkJyA/ICcxMDB2aCcgOiAnMTAwJScsXG4gICAgICBwb3NpdGlvbjogdGhpcy5wb3NpdGlvbixcbiAgICAgIHRyYW5zaXRpb246IGBhbGwgJHt0aGlzLnNpZGVuYXZUcmFuc2l0aW9uRHVyYXRpb259IGxpbmVhcmAsXG4gICAgfTtcbiAgfVxuXG4gIGdldCBpc0FsbENvbGxhcHNlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5fY29sbGFwc2UuZmlsdGVyKChlbCkgPT4ge1xuICAgICAgICBjb25zdCBzdHlsZXMgPSBnZXRDb21wdXRlZFN0eWxlKGVsLmhvc3QpO1xuICAgICAgICByZXR1cm4gc3R5bGVzLmRpc3BsYXkgIT09ICdub25lJztcbiAgICAgIH0pLmxlbmd0aCA9PT0gMFxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgaXNUaGVMYXN0SXRlbVRvQmVDb2xsYXBzZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuX2NvbGxhcHNlLmZpbHRlcigoZWwpID0+IHtcbiAgICAgICAgcmV0dXJuIGVsLmhvc3QuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaG93Jyk7XG4gICAgICB9KS5sZW5ndGggPT09IDFcbiAgICApO1xuICB9XG5cbiAgcHVibGljIG1hcmtGb3JDaGVjaygpOiB2b2lkIHtcbiAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGUoKTogdm9pZCB7XG4gICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgICB0aGlzLnRyaWdnZXRWaXNpYmlsaXR5RXZlbnRzKCF0aGlzLmlzVmlzaWJsZSk7XG4gICAgdGhpcy51cGRhdGVTaWRlbmF2KCF0aGlzLmlzVmlzaWJsZSk7XG4gIH1cblxuICBwdWJsaWMgc2hvdygpOiB2b2lkIHtcbiAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICAgIHRoaXMudHJpZ2dldFZpc2liaWxpdHlFdmVudHModHJ1ZSk7XG4gICAgdGhpcy51cGRhdGVTaWRlbmF2KHRydWUpO1xuICB9XG5cbiAgcHVibGljIGhpZGUoKTogdm9pZCB7XG4gICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgICB0aGlzLnRyaWdnZXRWaXNpYmlsaXR5RXZlbnRzKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZVNpZGVuYXYoZmFsc2UpO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2lzTG9hZGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgICB0aGlzLl9zZXR1cCgpO1xuICB9XG5cbiAgcHVibGljIHNldE1vZGUobmV3TW9kZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubW9kZSA9PT0gbmV3TW9kZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubW9kZSA9IG5ld01vZGU7XG4gICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgICB0aGlzLnVwZGF0ZVNpZGVuYXYodGhpcy5pc1Zpc2libGUpO1xuICB9XG5cbiAgcHVibGljIHRvZ2dsZVNsaW0oKTogdm9pZCB7XG4gICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgICB0aGlzLnNldFNsaW0oIXRoaXMuX3NsaW1Db2xsYXBzZWQpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHRyaWdnZXJFdmVudHMoc3RhcnRFdmVudDogc3RyaW5nLCBjb21wbGV0ZUV2ZW50ID0gJycpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICAgIHRoaXNbc3RhcnRFdmVudF0uZW1pdCh0aGlzKTtcblxuICAgIGlmIChjb21wbGV0ZUV2ZW50KSB7XG4gICAgICBhd2FpdCBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpc1tjb21wbGV0ZUV2ZW50XS5lbWl0KHRoaXMpO1xuICAgICAgfSwgdGhpcy50cmFuc2l0aW9uRHVyYXRpb24gKyA1KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdHJpZ2dldFZpc2liaWxpdHlFdmVudHMoc2hvdzogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gICAgY29uc3QgZXZlbnRzID0gc2hvdyA/IFsnc2lkZW5hdlNob3cnLCAnc2lkZW5hdlNob3duJ10gOiBbJ3NpZGVuYXZIaWRlJywgJ3NpZGVuYXZIaWRkZW4nXTtcblxuICAgIGNvbnN0IHN0YXJ0RXZlbnQgPSBldmVudHNbMF07XG4gICAgY29uc3QgY29tcGxldGVFdmVudCA9IGV2ZW50c1sxXTtcbiAgICB0aGlzLnRyaWdnZXJFdmVudHMoc3RhcnRFdmVudCwgY29tcGxldGVFdmVudCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlU2lkZW5hdihzaG93OiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcblxuICAgIGlmICh0aGlzLmZvY3VzVHJhcCAmJiB0aGlzLm1vZGUgPT09ICdvdmVyJykge1xuICAgICAgaWYgKCF0aGlzLmlzVmlzaWJsZSkge1xuICAgICAgICB0aGlzLl9jb25maWd1cmFibGVGb2N1c1RyYXAgPSB0aGlzLl9mb2N1c1RyYXBGYWN0b3J5LmNyZWF0ZSh0aGlzLl9zaWRlbmF2Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuX2NvbmZpZ3VyYWJsZUZvY3VzVHJhcCkge1xuICAgICAgICAgIHRoaXMuX2NvbmZpZ3VyYWJsZUZvY3VzVHJhcC5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl91cGRhdGVEaXNwbGF5KHNob3cpO1xuXG4gICAgaWYgKHRoaXMuYmFja2Ryb3ApIHtcbiAgICAgIHRoaXMuc2lkZW5hdkxheW91dC50b2dnbGVCYWNrZHJvcChzaG93KTtcbiAgICB9XG5cbiAgICB0aGlzLl91cGRhdGVPZmZzZXRzKHNob3cpO1xuXG4gICAgaWYgKHNob3cgJiYgdGhpcy5jbG9zZU9uRXNjICYmIHRoaXMubW9kZSAhPT0gJ3NpZGUnKSB7XG4gICAgICBmcm9tRXZlbnQodGhpcy5kb2N1bWVudCwgJ2tleWRvd24nKVxuICAgICAgICAucGlwZShmaXJzdCgpKVxuICAgICAgICAuc3Vic2NyaWJlKChlOiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgICAgaWYgKGUuY29kZSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2lkZW5hdihmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY29sbGFwc2VJdGVtcygpOiB2b2lkIHtcbiAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICAgIHRoaXMuX2NvbGxhcHNlLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICBpZiAoIWVsLmNvbGxhcHNlZCkge1xuICAgICAgICBlbC5oaWRlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgY2xvc2VPdGhlckNvbGxhcHNlSXRlbXMoYWN0aXZlQ29sbGFwc2U6IE1kYkNvbGxhcHNlRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgICB0aGlzLl9jb2xsYXBzZS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgaWYgKCFlbC5jb2xsYXBzZWQgJiYgZWwgIT09IGFjdGl2ZUNvbGxhcHNlKSB7XG4gICAgICAgIGVsLmhpZGUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRTbGltKHZhbHVlOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgICBjb25zdCBldmVudHMgPSB2YWx1ZVxuICAgICAgPyBbJ3NpZGVuYXZDb2xsYXBzZScsICdzaWRlbmF2Q29sbGFwc2VkJ11cbiAgICAgIDogWydzaWRlbmF2RXhwYW5kJywgJ3NpZGVuYXZFeHBhbmRlZCddO1xuICAgIGNvbnN0IHN0YXJ0RXZlbnQgPSBldmVudHNbMF07XG4gICAgY29uc3QgY29tcGxldGVFdmVudCA9IGV2ZW50c1sxXTtcblxuICAgIHRoaXMudHJpZ2dlckV2ZW50cyhzdGFydEV2ZW50LCBjb21wbGV0ZUV2ZW50KTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuY29sbGFwc2VJdGVtcygpO1xuICAgIH1cblxuICAgIHRoaXMuX3NsaW1Db2xsYXBzZWQgPSB2YWx1ZTtcblxuICAgIHRoaXMuX3RvZ2dsZVNsaW1EaXNwbGF5KHZhbHVlKTtcblxuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX3NpZGVuYXYubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgYCR7dGhpcy5zaWRlbmF2V2lkdGh9cHhgKTtcblxuICAgIHRoaXMuX3VwZGF0ZU9mZnNldHModGhpcy5pc1Zpc2libGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0dXAoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc2xpbSkge1xuICAgICAgdGhpcy5fc2V0dXBTbGltKCk7XG4gICAgfVxuXG4gICAgLy8gSW5pdGlhbCBwb3NpdGlvblxuXG4gICAgdGhpcy5fc2V0dXBJbml0aWFsU3R5bGluZygpO1xuXG4gICAgLy8gUGVyZmVjdCBTY3JvbGxiYXJcblxuICAgIHRoaXMuX3NldHVwU2Nyb2xsaW5nKCk7XG5cbiAgICAvLyBDb250ZW50XG5cbiAgICB0aGlzLl9zZXR1cENvbnRlbnQoKTtcblxuICAgIC8vIFNob3duIG9uIGluaXRcblxuICAgIGlmICghdGhpcy5oaWRkZW4pIHtcbiAgICAgIHRoaXMuX3VwZGF0ZU9mZnNldHModHJ1ZSwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc2V0dXBDb250ZW50KCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbnRlbnRFbCA9IHRoaXMuc2lkZW5hdkxheW91dC5fc2lkZW5hdkNvbnRlbnQubmF0aXZlRWxlbWVudC5maXJzdENoaWxkO1xuICAgIHRoaXMuX2luaXRpYWxDb250ZW50U3R5bGUgPSB7IC4uLndpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuX2NvbnRlbnRFbCBhcyBFbGVtZW50KSB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlRGlzcGxheSh2YWx1ZTogYm9vbGVhbik6IHZvaWQge1xuICAgIGNvbnN0IHRyYW5zbGF0aW9uID0gdmFsdWUgPyAwIDogdGhpcy50cmFuc2xhdGlvbjtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgIHRoaXMuX3NpZGVuYXYubmF0aXZlRWxlbWVudCxcbiAgICAgICd0cmFuc2Zvcm0nLFxuICAgICAgYHRyYW5zbGF0ZVgoJHt0cmFuc2xhdGlvbn0lKWBcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0dXBJbml0aWFsU3R5bGluZygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yaWdodCkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fc2lkZW5hdi5uYXRpdmVFbGVtZW50LCAnc2lkZW5hdi1yaWdodCcpO1xuICAgIH1cblxuICAgIHRoaXMuX3NldENvbG9yKCk7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fc2lkZW5hdi5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCBgJHt0aGlzLnNpZGVuYXZXaWR0aH1weGApO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgdGhpcy5fc2lkZW5hdi5uYXRpdmVFbGVtZW50LFxuICAgICAgJ2hlaWdodCcsXG4gICAgICB0aGlzLnBvc2l0aW9uID09PSAnZml4ZWQnID8gJzEwMHZoJyA6ICcxMDAlJ1xuICAgICk7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fc2lkZW5hdi5uYXRpdmVFbGVtZW50LCAncG9zaXRpb24nLCB0aGlzLnBvc2l0aW9uKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgIHRoaXMuX3NpZGVuYXYubmF0aXZlRWxlbWVudCxcbiAgICAgICAgJ3RyYW5zaXRpb24nLFxuICAgICAgICBgYWxsICR7dGhpcy5zaWRlbmF2VHJhbnNpdGlvbkR1cmF0aW9ufSBsaW5lYXJgXG4gICAgICApO1xuICAgIH0sIDApO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0Q29sb3IoKTogdm9pZCB7XG4gICAgY29uc3QgY29sb3JzID0gW1xuICAgICAgJ3ByaW1hcnknLFxuICAgICAgJ3NlY29uZGFyeScsXG4gICAgICAnc3VjY2VzcycsXG4gICAgICAnaW5mbycsXG4gICAgICAnd2FybmluZycsXG4gICAgICAnZGFuZ2VyJyxcbiAgICAgICdsaWdodCcsXG4gICAgICAnZGFyaycsXG4gICAgXTtcbiAgICBjb25zdCBjb2xvciA9IGNvbG9ycy5pbmNsdWRlcyh0aGlzLmNvbG9yKSA/IHRoaXMuY29sb3IgOiAncHJpbWFyeSc7XG5cbiAgICBjb2xvcnMuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX3NpZGVuYXYubmF0aXZlRWxlbWVudCwgYHNpZGVuYXYtJHtlbH1gKTtcbiAgICB9KTtcblxuICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX3NpZGVuYXYubmF0aXZlRWxlbWVudCwgYHNpZGVuYXYtJHtjb2xvcn1gKTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZU9mZnNldHMoc2hvdzogYm9vbGVhbiwgaW5pdGlhbCA9IGZhbHNlKTogdm9pZCB7XG4gICAgY29uc3QgW3BhZGRpbmdQb3NpdGlvbiwgbWFyZ2luUG9zaXRpb25dID0gdGhpcy5yaWdodCA/IFsncmlnaHQnLCAnbGVmdCddIDogWydsZWZ0JywgJ3JpZ2h0J107XG5cbiAgICBjb25zdCBwYWRkaW5nID0ge1xuICAgICAgcHJvcGVydHk6IHRoaXMuX2dldFByb3BlcnR5KCdwYWRkaW5nJywgcGFkZGluZ1Bvc2l0aW9uKSxcbiAgICAgIHZhbHVlOiB0aGlzLm1vZGUgPT09ICdvdmVyJyA/IDAgOiB0aGlzLnNpZGVuYXZXaWR0aCxcbiAgICB9O1xuXG4gICAgY29uc3QgbWFyZ2luID0ge1xuICAgICAgcHJvcGVydHk6IHRoaXMuX2dldFByb3BlcnR5KCdtYXJnaW4nLCBtYXJnaW5Qb3NpdGlvbiksXG4gICAgICB2YWx1ZTogdGhpcy5tb2RlID09PSAncHVzaCcgPyAtMSAqIHRoaXMuc2lkZW5hdldpZHRoIDogMCxcbiAgICB9O1xuXG4gICAgdGhpcy50cmlnZ2VyRXZlbnRzKCdzaWRlbmF2VXBkYXRlJyk7XG5cbiAgICBpZiAoIXRoaXMuX2NvbnRlbnRFbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3NldENvbnRlbnRPZmZzZXRzKHNob3csIHsgcGFkZGluZywgbWFyZ2luIH0sIGluaXRpYWwpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0dXBTbGltKCk6IHZvaWQge1xuICAgIHRoaXMuX3NsaW1Db2xsYXBzZWQgPSB0aGlzLnNsaW1Db2xsYXBzZWQ7XG5cbiAgICB0aGlzLl90b2dnbGVTbGltRGlzcGxheSh0aGlzLl9zbGltQ29sbGFwc2VkKTtcblxuICAgIGlmICh0aGlzLmV4cGFuZE9uSG92ZXIpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLmxpc3Rlbih0aGlzLl9zaWRlbmF2Lm5hdGl2ZUVsZW1lbnQsICdtb3VzZWVudGVyJywgKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5fc2xpbUNvbGxhcHNlZCkge1xuICAgICAgICAgIHRoaXMuc2V0U2xpbShmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGhpcy5fcmVuZGVyZXIubGlzdGVuKHRoaXMuX3NpZGVuYXYubmF0aXZlRWxlbWVudCwgJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5fc2xpbUNvbGxhcHNlZCkge1xuICAgICAgICAgIHRoaXMuc2V0U2xpbSh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdG9nZ2xlU2xpbURpc3BsYXkoc2xpbTogYm9vbGVhbik6IHZvaWQge1xuICAgIGNvbnN0IHRvZ2dsZUVsZW1lbnRzID0gKCkgPT4ge1xuICAgICAgdGhpcy5fZWxSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbc2xpbT1cInRydWVcIl0nKS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShlbCwgJ2Rpc3BsYXknLCB0aGlzLl9zbGltQ29sbGFwc2VkID8gJ3Vuc2V0JyA6ICdub25lJyk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuX2VsUmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW3NsaW09XCJmYWxzZVwiXScpLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGVsLCAnZGlzcGxheScsIHRoaXMuX3NsaW1Db2xsYXBzZWQgPyAnbm9uZScgOiAndW5zZXQnKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBpZiAoc2xpbSkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB0b2dnbGVFbGVtZW50cygpLCB0aGlzLnRyYW5zaXRpb25EdXJhdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvZ2dsZUVsZW1lbnRzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc2V0dXBTY3JvbGxpbmcoKTogdm9pZCB7XG4gICAgbGV0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuXG4gICAgaWYgKHRoaXMuc2Nyb2xsQ29udGFpbmVyKSB7XG4gICAgICBjb250YWluZXIgPSB0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5zY3JvbGxDb250YWluZXIpO1xuXG4gICAgICBjb25zdCBzaWJsaW5ncyA9IEFycmF5LmZyb20oY29udGFpbmVyLnBhcmVudE5vZGUuY2hpbGRyZW4pLmZpbHRlcigoZWwpID0+IGVsICE9PSBjb250YWluZXIpO1xuXG4gICAgICBjb25zdCBzaWJsaW5nc0hlaWdodCA9IHNpYmxpbmdzLnJlZHVjZSgoYSwgYikgPT4ge1xuICAgICAgICByZXR1cm4gYSArIGIuY2xpZW50SGVpZ2h0O1xuICAgICAgfSwgMCk7XG5cbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGNvbnRhaW5lciwgJ21heEhlaWdodCcsIGBjYWxjKDEwMCUgLSAke3NpYmxpbmdzSGVpZ2h0fXB4KWApO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoY29udGFpbmVyLCAncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zZXRDb250ZW50T2Zmc2V0cyhzaG93OiBib29sZWFuLCBvZmZzZXRzOiBhbnksIGluaXRpYWw6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBjb25zdCBwYWRkaW5nID0gdGhpcy5fZ2V0T2Zmc2V0VmFsdWUoc2hvdywgeyBwcm9wZXJ0eTogJ3BhZGRpbmcnLCBvZmZzZXRzIH0pO1xuICAgIGNvbnN0IG1hcmdpbiA9IHRoaXMuX2dldE9mZnNldFZhbHVlKHNob3csIHsgcHJvcGVydHk6ICdtYXJnaW4nLCBvZmZzZXRzIH0pO1xuXG4gICAgaWYgKCFpbml0aWFsKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgdGhpcy5fY29udGVudEVsLFxuICAgICAgICAndHJhbnNpdGlvbicsXG4gICAgICAgIGBhbGwgJHt0aGlzLnNpZGVuYXZUcmFuc2l0aW9uRHVyYXRpb259IGxpbmVhcmBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fY29udGVudEVsLCBvZmZzZXRzLnBhZGRpbmcucHJvcGVydHksIGAke3BhZGRpbmd9cHhgKTtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9jb250ZW50RWwsIG9mZnNldHMubWFyZ2luLnByb3BlcnR5LCBgJHttYXJnaW59cHhgKTtcblxuICAgIGlmICghc2hvdykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChpbml0aWFsKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9jb250ZW50RWwsICd0cmFuc2l0aW9uJywgdGhpcy5faW5pdGlhbENvbnRlbnRTdHlsZS50cmFuc2l0aW9uKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9nZXRPZmZzZXRWYWx1ZShzaG93OiBib29sZWFuLCB7IHByb3BlcnR5LCBvZmZzZXRzIH0pOiBudW1iZXIge1xuICAgIGNvbnN0IGluaXRpYWxWYWx1ZSA9IHRoaXMuX2dldFB4VmFsdWUodGhpcy5faW5pdGlhbENvbnRlbnRTdHlsZVtvZmZzZXRzW3Byb3BlcnR5XS5wcm9wZXJ0eV0pO1xuICAgIGNvbnN0IG9mZnNldCA9IHNob3cgPyBvZmZzZXRzW3Byb3BlcnR5XS52YWx1ZSA6IDA7XG4gICAgcmV0dXJuIGluaXRpYWxWYWx1ZSArIG9mZnNldDtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFB4VmFsdWUocHJvcGVydHk6IHN0cmluZyk6IG51bWJlciB7XG4gICAgaWYgKCFwcm9wZXJ0eSkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHJldHVybiBwYXJzZUZsb2F0KHByb3BlcnR5KTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFByb3BlcnR5KC4uLmFyZ3M6IGFueSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGFyZ3NcbiAgICAgIC5tYXAoKGFyZywgaSkgPT4ge1xuICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBhcmc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFyZ1swXS50b1VwcGVyQ2FzZSgpLmNvbmNhdChhcmcuc2xpY2UoMSkpO1xuICAgICAgfSlcbiAgICAgIC5qb2luKCcnKTtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9hY2NvcmRpb246IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2JhY2tkcm9wOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9jbG9zZU9uRXNjOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9leHBhbmRPbkhvdmVyOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9oaWRkZW46IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3NsaW06IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3NsaW1Db2xsYXBzZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3JpZ2h0OiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9mb2N1c1RyYXA6IEJvb2xlYW5JbnB1dDtcbn1cbiIsIjxuZy1jb250YWluZXIgKm5nSWY9XCJzY3JvbGxDb250YWluZXJcIj5cbiAgPG5hdiAjc2lkZW5hdiBjbGFzcz1cInNpZGVuYXZcIiBbbmdDbGFzc109XCJ7J3Nob3cnOiAhaGlkZGVufVwiPlxuICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb250ZW50XCI+PC9uZy1jb250YWluZXI+XG4gIDwvbmF2PlxuPC9uZy1jb250YWluZXI+XG5cbjxuZy1jb250YWluZXIgKm5nSWY9XCIhc2Nyb2xsQ29udGFpbmVyXCI+XG4gIDxuYXYgI3NpZGVuYXYgY2xhc3M9XCJzaWRlbmF2XCIgbWRiU2Nyb2xsYmFyIFtuZ0NsYXNzXT1cInsnc2hvdyc6ICFoaWRkZW59XCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbnRlbnRcIj48L25nLWNvbnRhaW5lcj5cbiAgPC9uYXY+XG48L25nLWNvbnRhaW5lcj5cblxuPG5nLXRlbXBsYXRlICNjb250ZW50PlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L25nLXRlbXBsYXRlPlxuIl19