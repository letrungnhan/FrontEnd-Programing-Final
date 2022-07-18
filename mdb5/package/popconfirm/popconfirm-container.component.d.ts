import { CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { ComponentRef, ElementRef, EmbeddedViewRef } from '@angular/core';
import { Subject } from 'rxjs';
import { MdbPopconfirmConfig } from './popconfirm.config';
import * as i0 from "@angular/core";
export declare class MdbPopconfirmContainerComponent {
    _elementRef: ElementRef;
    _portalOutlet: CdkPortalOutlet;
    readonly _destroy$: Subject<void>;
    _config: MdbPopconfirmConfig;
    constructor(_elementRef: ElementRef);
    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T>;
    attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MdbPopconfirmContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MdbPopconfirmContainerComponent, "mdb-popconfirm-container", never, {}, {}, never, never>;
}
