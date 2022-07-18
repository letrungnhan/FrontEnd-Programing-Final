import { ComponentType, Overlay, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { ComponentFactoryResolver, Injector } from '@angular/core';
import { MdbPopconfirmConfig } from './popconfirm.config';
import { MdbPopconfirmRef } from './popconfirm-ref';
import * as i0 from "@angular/core";
export declare class MdbPopconfirmService {
    private _overlay;
    private _injector;
    private _cfr;
    private _overlayPositionBuilder;
    private _element;
    private _overlayRef;
    private _config;
    constructor(_overlay: Overlay, _injector: Injector, _cfr: ComponentFactoryResolver, _overlayPositionBuilder: OverlayPositionBuilder);
    open<T, D = any>(componentRef: ComponentType<T>, element?: HTMLElement, config?: MdbPopconfirmConfig<D>): MdbPopconfirmRef<T>;
    private _createOverlay;
    private _getOverlayConfig;
    private _getBackdropClass;
    private _getBackdropConfig;
    private _getScrollStrategy;
    private _getPositionStrategy;
    private _getPosition;
    private _createContainer;
    private _createContent;
    private _createInjector;
    private _listenToOutsideClick;
    static ɵfac: i0.ɵɵFactoryDeclaration<MdbPopconfirmService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MdbPopconfirmService>;
}
