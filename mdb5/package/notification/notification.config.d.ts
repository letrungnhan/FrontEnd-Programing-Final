import { ViewContainerRef } from '@angular/core';
export declare class MdbNotificationConfig<D = any> {
    position?: 'top-center' | 'bottom-center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    width?: string;
    delay?: number;
    autohide?: boolean;
    stacking?: boolean;
    offset?: number;
    animation?: boolean;
    viewContainerRef?: ViewContainerRef;
    data?: D | null;
}
