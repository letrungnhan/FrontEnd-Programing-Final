import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import * as i1 from '@angular/cdk/portal';
import { CdkPortalOutlet, ComponentPortal, TemplatePortal, PortalModule } from '@angular/cdk/portal';
import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, Inject, ViewChild, TemplateRef, Injector, Injectable, NgModule } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import * as i1$1 from '@angular/cdk/overlay';
import { OverlayConfig, OverlayModule } from '@angular/cdk/overlay';

/* eslint-disable @typescript-eslint/no-inferrable-types */
class MdbNotificationConfig {
    constructor() {
        this.position = 'top-right';
        this.width = 'unset';
        this.delay = 5000;
        this.autohide = false;
        this.stacking = false;
        this.offset = 10;
        this.animation = true;
        this.data = null;
    }
}

class MdbNotificationRef {
    constructor(overlayRef, _notificationService, _container) {
        this.overlayRef = overlayRef;
        this._notificationService = _notificationService;
        this._container = _container;
        this.onClose$ = new Subject();
        this.onClose = this.onClose$.asObservable();
    }
    close(message) {
        this.onClose$.next(message);
        this.onClose$.complete();
        this._container._hidden.pipe(first()).subscribe(() => {
            this._notificationService.updateToast(this);
            this.overlayRef.detach();
            this.overlayRef.dispose();
        });
        this._container.animationState = 'hidden';
    }
    getPosition() {
        const overlayPosition = this.overlayRef.overlayElement;
        if (overlayPosition) {
            return overlayPosition.getBoundingClientRect();
        }
        else {
            return new DOMRect();
        }
    }
}

class MdbNotificationContainerComponent {
    constructor(_document, _elementRef, _renderer, _cdRef) {
        this._document = _document;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._cdRef = _cdRef;
        this._destroy$ = new Subject();
        this._hidden = new Subject();
        this.animationState = 'visible';
    }
    ngOnInit() {
        this._renderer.addClass(this._document.body, 'notification-open');
    }
    ngOnDestroy() {
        this._renderer.removeClass(this._document.body, 'notification-open');
    }
    attachComponentPortal(portal) {
        return this._portalOutlet.attachComponentPortal(portal);
    }
    attachTemplatePortal(portal) {
        return this._portalOutlet.attachTemplatePortal(portal);
    }
    detectChanges() {
        this._cdRef.detectChanges();
    }
    onAnimationEnd(event) {
        if (event.toState === 'hidden') {
            this._hidden.next();
        }
    }
}
MdbNotificationContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbNotificationContainerComponent, deps: [{ token: DOCUMENT }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MdbNotificationContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbNotificationContainerComponent, selector: "mdb-notification-container", viewQueries: [{ propertyName: "_portalOutlet", first: true, predicate: CdkPortalOutlet, descendants: true, static: true }], ngImport: i0, template: "<div   \n  [@fade]=\"animationState\"\n  (@fade.done)=\"onAnimationEnd($event)\"\n>\n  <ng-template cdkPortalOutlet></ng-template>\n</div>\n", directives: [{ type: i1.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }], animations: [
        trigger('fade', [
            state('visible', style({ opacity: 1 })),
            state('hidden', style({ opacity: 0 })),
            transition('visible => hidden', animate('150ms linear')),
            transition(':enter', [style({ opacity: 0 }), animate('150ms linear')]),
        ]),
    ], changeDetection: i0.ChangeDetectionStrategy.Default });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbNotificationContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-notification-container', changeDetection: ChangeDetectionStrategy.Default, animations: [
                        trigger('fade', [
                            state('visible', style({ opacity: 1 })),
                            state('hidden', style({ opacity: 0 })),
                            transition('visible => hidden', animate('150ms linear')),
                            transition(':enter', [style({ opacity: 0 }), animate('150ms linear')]),
                        ]),
                    ], template: "<div   \n  [@fade]=\"animationState\"\n  (@fade.done)=\"onAnimationEnd($event)\"\n>\n  <ng-template cdkPortalOutlet></ng-template>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { _portalOutlet: [{
                type: ViewChild,
                args: [CdkPortalOutlet, { static: true }]
            }] } });

class MdbNotificationService {
    constructor(_overlay, _injector, _cfr) {
        this._overlay = _overlay;
        this._injector = _injector;
        this._cfr = _cfr;
        this.toasts = [];
    }
    open(componentOrTemplateRef, newConfig) {
        const defaultConfig = new MdbNotificationConfig();
        this.config = newConfig ? Object.assign(defaultConfig, newConfig) : defaultConfig;
        const overlayRef = this._createOverlay(this.config);
        const container = this._createContainer(overlayRef, this.config);
        const toastRef = this._createContent(componentOrTemplateRef, container, overlayRef, this.config);
        if (this.config.stacking) {
            this.toasts.push(toastRef);
        }
        if (this.config.autohide) {
            this.timeout = setTimeout(() => {
                container._hidden.pipe(first()).subscribe(() => {
                    if (this.config.stacking) {
                        this.updateToast(toastRef);
                    }
                    overlayRef.detach();
                    overlayRef.dispose();
                });
                container.animationState = 'hidden';
                container.detectChanges();
            }, this.config.delay);
        }
        return toastRef;
    }
    updateToast(toastRef) {
        const toastIndex = this.toasts.indexOf(toastRef);
        this.toasts.splice(toastIndex, 1);
        this.toasts.forEach((toast, index) => {
            toast.overlayRef.updatePositionStrategy(this._getPositionStrategy(this.config, index - 1));
        });
    }
    _createOverlay(config) {
        const overlayConfig = this._getOverlayConfig(config);
        return this._overlay.create(overlayConfig);
    }
    _setOffset(config, index) {
        const verticalDirection = config.position.startsWith('top') ? 'bottom' : 'top';
        const shouldCalculateFromTop = verticalDirection === 'top' ? false : true;
        const calculationAdjustment = shouldCalculateFromTop ? 0 : window.innerHeight;
        if (this.toasts.length === 0 || index <= -1) {
            return config.offset;
        }
        else if (index || index === 0) {
            return Math.abs(calculationAdjustment - this.toasts[index].getPosition()[verticalDirection]);
        }
        else {
            return Math.abs(calculationAdjustment - this.toasts[this.toasts.length - 1].getPosition()[verticalDirection]);
        }
    }
    _getOverlayConfig(notificationConfig) {
        const width = notificationConfig.width;
        const config = new OverlayConfig({
            positionStrategy: this._getPositionStrategy(notificationConfig),
            scrollStrategy: this._overlay.scrollStrategies.reposition(),
            hasBackdrop: false,
            height: 'fit-content',
            width,
        });
        return config;
    }
    _getPositionStrategy(notificationConfig, index) {
        const offset = `${this._setOffset(notificationConfig, index)}px`;
        let positionStrategy;
        switch (notificationConfig.position) {
            case 'top-left':
                positionStrategy = this._overlay
                    .position()
                    .global()
                    .top(offset)
                    .left(`${notificationConfig.offset}px`);
                break;
            case 'bottom-left':
                positionStrategy = this._overlay
                    .position()
                    .global()
                    .bottom(offset)
                    .left(`${notificationConfig.offset}px`);
                break;
            case 'bottom-right':
                positionStrategy = this._overlay
                    .position()
                    .global()
                    .bottom(offset)
                    .right(`${notificationConfig.offset}px`);
                break;
            case 'bottom-center':
                positionStrategy = this._overlay.position().global().bottom(offset).centerHorizontally();
                break;
            case 'top-center':
                positionStrategy = this._overlay.position().global().top(offset).centerHorizontally();
                break;
            default:
                positionStrategy = this._overlay
                    .position()
                    .global()
                    .top(offset)
                    .right(`${notificationConfig.offset}px`);
                break;
        }
        return positionStrategy;
    }
    _createContainer(overlayRef, config) {
        const portal = new ComponentPortal(MdbNotificationContainerComponent, null, this._injector, this._cfr);
        const containerRef = overlayRef.attach(portal);
        containerRef.instance._config = config;
        return containerRef.instance;
    }
    _createContent(componentOrTemplate, container, overlayRef, config) {
        const notificationRef = new MdbNotificationRef(overlayRef, this, container);
        if (componentOrTemplate instanceof TemplateRef) {
            container.attachTemplatePortal(new TemplatePortal(componentOrTemplate, null, {
                $implicit: config.data,
                notificationRef,
            }));
        }
        else {
            const injector = this._createInjector(config, notificationRef, container);
            const contentRef = container.attachComponentPortal(new ComponentPortal(componentOrTemplate, config.viewContainerRef, injector));
            if (config.data) {
                Object.assign(contentRef.instance, { ...config.data });
            }
        }
        return notificationRef;
    }
    _createInjector(config, notificationRef, container) {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        const providers = [
            { provide: MdbNotificationContainerComponent, useValue: container },
            { provide: MdbNotificationRef, useValue: notificationRef },
        ];
        return Injector.create({ parent: userInjector || this._injector, providers });
    }
}
MdbNotificationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbNotificationService, deps: [{ token: i1$1.Overlay }, { token: i0.Injector }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.Injectable });
MdbNotificationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbNotificationService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbNotificationService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$1.Overlay }, { type: i0.Injector }, { type: i0.ComponentFactoryResolver }]; } });

class MdbNotificationModule {
}
MdbNotificationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbNotificationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbNotificationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbNotificationModule, declarations: [MdbNotificationContainerComponent], imports: [OverlayModule, PortalModule], exports: [MdbNotificationContainerComponent] });
MdbNotificationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbNotificationModule, providers: [MdbNotificationService], imports: [[OverlayModule, PortalModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbNotificationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [OverlayModule, PortalModule],
                    exports: [MdbNotificationContainerComponent],
                    declarations: [MdbNotificationContainerComponent],
                    providers: [MdbNotificationService],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MdbNotificationConfig, MdbNotificationContainerComponent, MdbNotificationModule, MdbNotificationRef, MdbNotificationService };
//# sourceMappingURL=mdb-angular-ui-kit-notification.mjs.map
