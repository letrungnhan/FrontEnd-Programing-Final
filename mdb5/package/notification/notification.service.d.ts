import { ComponentType, Overlay } from '@angular/cdk/overlay';
import { ComponentFactoryResolver, Injector, TemplateRef } from '@angular/core';
import { MdbNotificationConfig } from './notification.config';
import { MdbNotificationRef } from './notification-ref';
import * as i0 from "@angular/core";
export declare class MdbNotificationService {
    private _overlay;
    private _injector;
    private _cfr;
    timeout: any;
    toasts: MdbNotificationRef<[]>[];
    config: MdbNotificationConfig;
    constructor(_overlay: Overlay, _injector: Injector, _cfr: ComponentFactoryResolver);
    open<T, D = any>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, newConfig?: MdbNotificationConfig<D>): MdbNotificationRef<T>;
    updateToast(toastRef: any): void;
    private _createOverlay;
    private _setOffset;
    private _getOverlayConfig;
    private _getPositionStrategy;
    private _createContainer;
    private _createContent;
    private _createInjector;
    static ɵfac: i0.ɵɵFactoryDeclaration<MdbNotificationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MdbNotificationService>;
}
