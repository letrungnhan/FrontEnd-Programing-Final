import { ViewContainerRef } from '@angular/core';
export declare class MdbPopconfirmConfig<D = any> {
    position?: 'top' | 'top-right' | 'right-top' | 'right' | 'right-bottom' | 'bottom-right' | 'bottom' | 'bottom-left' | 'left-bottom' | 'left' | 'left-top' | 'top-left';
    animation?: boolean;
    popconfirmMode?: 'inline' | 'modal';
    viewContainerRef?: ViewContainerRef;
    data?: D | null;
}
