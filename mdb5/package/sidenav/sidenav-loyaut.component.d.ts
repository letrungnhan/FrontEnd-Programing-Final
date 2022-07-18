import { AfterViewInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { MdbSidenavComponent } from './sidenav.component';
import * as i0 from "@angular/core";
export declare class MdbSidenavLayoutComponent implements AfterViewInit {
    private _cdRef;
    _sidenav: MdbSidenavComponent;
    _sidenavContent: ElementRef<HTMLElement>;
    _backdropEl: ElementRef<HTMLElement>;
    showBackdrop: boolean;
    backdropStyle: {
        transition: string;
        position: string;
        width: string;
        height: string;
        opacity: number;
    };
    constructor(_cdRef: ChangeDetectorRef);
    markForCheck(): void;
    ngAfterViewInit(): void;
    onBackdropClick(): void;
    toggleBackdrop(show: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MdbSidenavLayoutComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MdbSidenavLayoutComponent, "mdb-sidenav-layout", never, {}, {}, ["_sidenav", "_sidenavContent"], ["*"]>;
}
