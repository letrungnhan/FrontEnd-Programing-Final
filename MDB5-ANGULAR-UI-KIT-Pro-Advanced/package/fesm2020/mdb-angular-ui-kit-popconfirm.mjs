import { Subject, merge } from 'rxjs';
import * as i1 from '@angular/cdk/portal';
import { CdkPortalOutlet, ComponentPortal, TemplatePortal, PortalModule } from '@angular/cdk/portal';
import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, Injector, Injectable, NgModule } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import * as i1$1 from '@angular/cdk/overlay';
import { OverlayConfig, OverlayModule } from '@angular/cdk/overlay';
import { filter } from 'rxjs/operators';

/* eslint-disable @typescript-eslint/no-inferrable-types */
class MdbPopconfirmConfig {
    constructor() {
        this.position = 'bottom';
        this.animation = true;
        this.popconfirmMode = 'inline';
        this.data = null;
    }
}

class MdbPopconfirmRef {
    constructor(overlayRef) {
        this.overlayRef = overlayRef;
        this.onClose$ = new Subject();
        this.onConfirm$ = new Subject();
        this.onClose = this.onClose$.asObservable();
        this.onConfirm = this.onConfirm$.asObservable();
    }
    close(message) {
        this.onClose$.next(message);
        this.onClose$.complete();
        this.overlayRef.detach();
        this.overlayRef.dispose();
    }
    confirm(message) {
        this.onConfirm$.next(message);
        this.onConfirm$.complete();
        this.overlayRef.detach();
        this.overlayRef.dispose();
    }
    getPosition() {
        return this.overlayRef.overlayElement.getBoundingClientRect();
    }
}

class MdbPopconfirmContainerComponent {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        this._destroy$ = new Subject();
    }
    attachComponentPortal(portal) {
        return this._portalOutlet.attachComponentPortal(portal);
    }
    attachTemplatePortal(portal) {
        return this._portalOutlet.attachTemplatePortal(portal);
    }
}
MdbPopconfirmContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbPopconfirmContainerComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
MdbPopconfirmContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbPopconfirmContainerComponent, selector: "mdb-popconfirm-container", viewQueries: [{ propertyName: "_portalOutlet", first: true, predicate: CdkPortalOutlet, descendants: true, static: true }], ngImport: i0, template: "<div @fade>\n  <ng-template cdkPortalOutlet></ng-template>\n</div>\n", directives: [{ type: i1.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }], animations: [
        trigger('fade', [
            transition(':enter', [style({ opacity: 0 }), animate('150ms linear', style({ opacity: 1 }))]),
            transition(':leave', [style({ opacity: 1 }), animate('150ms linear', style({ opacity: 0 }))]),
        ]),
    ], changeDetection: i0.ChangeDetectionStrategy.Default });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbPopconfirmContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-popconfirm-container', changeDetection: ChangeDetectionStrategy.Default, animations: [
                        trigger('fade', [
                            transition(':enter', [style({ opacity: 0 }), animate('150ms linear', style({ opacity: 1 }))]),
                            transition(':leave', [style({ opacity: 1 }), animate('150ms linear', style({ opacity: 0 }))]),
                        ]),
                    ], template: "<div @fade>\n  <ng-template cdkPortalOutlet></ng-template>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { _portalOutlet: [{
                type: ViewChild,
                args: [CdkPortalOutlet, { static: true }]
            }] } });

class MdbPopconfirmService {
    constructor(_overlay, _injector, _cfr, _overlayPositionBuilder) {
        this._overlay = _overlay;
        this._injector = _injector;
        this._cfr = _cfr;
        this._overlayPositionBuilder = _overlayPositionBuilder;
    }
    open(componentRef, element, config) {
        this._element = element;
        const defaultConfig = new MdbPopconfirmConfig();
        this._config = config ? Object.assign(defaultConfig, config) : defaultConfig;
        if (!element && this._config.popconfirmMode === 'inline') {
            throw Error('Target element is required in inline mode');
        }
        this._overlayRef = this._createOverlay();
        const container = this._createContainer();
        const popconfirmRef = this._createContent(componentRef, container);
        this._listenToOutsideClick(popconfirmRef);
        return popconfirmRef;
    }
    _createOverlay() {
        const overlayConfig = this._getOverlayConfig();
        return this._overlay.create(overlayConfig);
    }
    _getOverlayConfig() {
        const overlayConfig = new OverlayConfig({
            scrollStrategy: this._getScrollStrategy(),
            positionStrategy: this._getPositionStrategy(),
            hasBackdrop: this._getBackdropConfig(),
            backdropClass: this._getBackdropClass(),
        });
        return overlayConfig;
    }
    _getBackdropClass() {
        if (this._config.popconfirmMode === 'modal') {
            return 'mdb-backdrop';
        }
        else {
            return '';
        }
    }
    _getBackdropConfig() {
        if (this._config.popconfirmMode === 'modal') {
            return true;
        }
        else {
            return false;
        }
    }
    _getScrollStrategy() {
        if (this._config.popconfirmMode === 'modal') {
            return this._overlay.scrollStrategies.noop();
        }
        else {
            return this._overlay.scrollStrategies.reposition();
        }
    }
    _getPositionStrategy() {
        if (this._config.popconfirmMode === 'modal') {
            return this._overlay.position().global().centerVertically().centerHorizontally();
        }
        const positionStrategy = this._overlayPositionBuilder
            .flexibleConnectedTo(this._element)
            .withPositions(this._getPosition());
        return positionStrategy;
    }
    _getPosition() {
        let position;
        const positionTopLeft = {
            originX: 'end',
            originY: 'top',
            overlayX: 'end',
            overlayY: 'bottom',
            offsetY: 0,
        };
        const positionTop = {
            originX: 'center',
            originY: 'top',
            overlayX: 'center',
            overlayY: 'bottom',
            offsetY: 0,
        };
        const positionTopRight = {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'bottom',
            offsetY: 0,
        };
        const positionRightTop = {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'bottom',
            offsetX: 0,
        };
        const positionRight = {
            originX: 'end',
            originY: 'center',
            overlayX: 'start',
            overlayY: 'center',
            offsetX: 0,
        };
        const positionRightBottom = {
            originX: 'end',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'top',
            offsetX: 0,
        };
        const positionBottomRight = {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
            offsetY: 0,
        };
        const positionBottom = {
            originX: 'center',
            originY: 'bottom',
            overlayX: 'center',
            overlayY: 'top',
            offsetY: 0,
        };
        const positionBottomLeft = {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'top',
            offsetY: 0,
        };
        const positionLeftBottom = {
            originX: 'start',
            originY: 'top',
            overlayX: 'end',
            overlayY: 'top',
            offsetX: 0,
        };
        const positionLeft = {
            originX: 'start',
            originY: 'center',
            overlayX: 'end',
            overlayY: 'center',
            offsetX: 0,
        };
        const positionLeftTop = {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'bottom',
            offsetY: 0,
        };
        switch (this._config.position) {
            case 'top-left':
                position = [positionTopLeft, positionBottomLeft, positionTopRight, positionBottomRight];
                break;
            case 'top':
                position = [positionTop, positionBottom];
                break;
            case 'top-right':
                position = [positionTopRight, positionTopLeft, positionBottomRight, positionBottomLeft];
                break;
            case 'right-top':
                position = [positionRightTop, positionLeftTop, positionRightBottom, positionLeftBottom];
                break;
            case 'right':
                position = [positionRight, positionLeft];
                break;
            case 'right-bottom':
                position = [positionRightBottom, positionLeftBottom, positionRightTop, positionLeftTop];
                break;
            case 'bottom-right':
                position = [positionBottomRight, positionBottomLeft, positionTopRight, positionTopLeft];
                break;
            case 'bottom':
                position = [positionBottom, positionTop];
                break;
            case 'bottom-left':
                position = [positionBottomLeft, positionTopLeft, positionBottomRight, positionTopLeft];
                break;
            case 'left-bottom':
                position = [positionLeftBottom, positionRightBottom, positionLeftTop, positionRightTop];
                break;
            case 'left':
                position = [positionLeft, positionRight];
                break;
            case 'left-top':
                position = [positionLeftTop, positionLeftBottom, positionRightTop, positionRightBottom];
                break;
            default:
                break;
        }
        return position;
    }
    _createContainer() {
        const portal = new ComponentPortal(MdbPopconfirmContainerComponent, null, this._injector, this._cfr);
        const containerRef = this._overlayRef.attach(portal);
        containerRef.instance._config = this._config;
        return containerRef.instance;
    }
    _createContent(componentOrTemplate, container) {
        const popconfirmRef = new MdbPopconfirmRef(this._overlayRef);
        if (componentOrTemplate instanceof TemplateRef) {
            container.attachTemplatePortal(new TemplatePortal(componentOrTemplate, null, {
                $implicit: this._config.data,
                popconfirmRef,
            }));
        }
        else {
            const injector = this._createInjector(popconfirmRef, container);
            const contentRef = container.attachComponentPortal(new ComponentPortal(componentOrTemplate, this._config.viewContainerRef, injector));
            if (this._config.data) {
                Object.assign(contentRef.instance, { ...this._config.data });
            }
        }
        return popconfirmRef;
    }
    _createInjector(popconfirmRef, container) {
        const userInjector = this._config && this._config.viewContainerRef && this._config.viewContainerRef.injector;
        const providers = [
            { provide: MdbPopconfirmContainerComponent, useValue: container },
            { provide: MdbPopconfirmRef, useValue: popconfirmRef },
        ];
        return Injector.create({ parent: userInjector || this._injector, providers });
    }
    _listenToOutsideClick(popconfirmRef) {
        if (this._overlayRef) {
            merge(this._overlayRef.outsidePointerEvents(), this._overlayRef.detachments(), this._overlayRef.keydownEvents().pipe(filter((event) => {
                return event.key === 'Escape';
            }))).subscribe((event) => {
                if (!event) {
                    return;
                }
                else {
                    event.preventDefault();
                }
                popconfirmRef.close();
            });
        }
    }
}
MdbPopconfirmService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbPopconfirmService, deps: [{ token: i1$1.Overlay }, { token: i0.Injector }, { token: i0.ComponentFactoryResolver }, { token: i1$1.OverlayPositionBuilder }], target: i0.ɵɵFactoryTarget.Injectable });
MdbPopconfirmService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbPopconfirmService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbPopconfirmService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$1.Overlay }, { type: i0.Injector }, { type: i0.ComponentFactoryResolver }, { type: i1$1.OverlayPositionBuilder }]; } });

class MdbPopconfirmModule {
}
MdbPopconfirmModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbPopconfirmModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbPopconfirmModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbPopconfirmModule, declarations: [MdbPopconfirmContainerComponent], imports: [OverlayModule, PortalModule], exports: [MdbPopconfirmContainerComponent] });
MdbPopconfirmModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbPopconfirmModule, providers: [MdbPopconfirmService], imports: [[OverlayModule, PortalModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbPopconfirmModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [OverlayModule, PortalModule],
                    exports: [MdbPopconfirmContainerComponent],
                    declarations: [MdbPopconfirmContainerComponent],
                    providers: [MdbPopconfirmService],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MdbPopconfirmConfig, MdbPopconfirmContainerComponent, MdbPopconfirmModule, MdbPopconfirmRef, MdbPopconfirmService };
//# sourceMappingURL=mdb-angular-ui-kit-popconfirm.mjs.map
