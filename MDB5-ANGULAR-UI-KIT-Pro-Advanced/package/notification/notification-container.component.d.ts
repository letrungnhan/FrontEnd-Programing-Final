import { CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectorRef, ComponentRef, ElementRef, EmbeddedViewRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { MdbNotificationConfig } from './notification.config';
import { AnimationEvent } from '@angular/animations';
import * as i0 from "@angular/core";
export declare class MdbNotificationContainerComponent implements OnInit, OnDestroy {
    private _document;
    _elementRef: ElementRef;
    private _renderer;
    private _cdRef;
    _portalOutlet: CdkPortalOutlet;
    readonly _destroy$: Subject<void>;
    readonly _hidden: Subject<void>;
    animationState: string;
    _config: MdbNotificationConfig;
    constructor(_document: any, _elementRef: ElementRef, _renderer: Renderer2, _cdRef: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T>;
    attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C>;
    detectChanges(): void;
    onAnimationEnd(event: AnimationEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MdbNotificationContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MdbNotificationContainerComponent, "mdb-notification-container", never, {}, {}, never, never>;
}
