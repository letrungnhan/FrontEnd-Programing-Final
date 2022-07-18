import { AfterContentInit, AfterViewInit, ChangeDetectorRef, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MdbCollapseDirective } from 'mdb-angular-ui-kit/collapse';
import { MdbSidenavLayoutComponent } from './sidenav-loyaut.component';
import { MdbSidenavComponent } from './sidenav.component';
import * as i0 from "@angular/core";
export declare class MdbSidenavItemComponent implements AfterViewInit, AfterContentInit, OnDestroy {
    private _renderer;
    private _elRef;
    private _router;
    private _route;
    private _cdRef;
    private _sidenav;
    _sidenavLink: ElementRef;
    collapse: MdbCollapseDirective;
    private _tempSlim;
    private _isSlimTransitioning;
    sidenavLayout: MdbSidenavLayoutComponent;
    readonly _destroy$: Subject<void>;
    constructor(_renderer: Renderer2, _elRef: ElementRef, _router: Router, _route: ActivatedRoute, _cdRef: ChangeDetectorRef, _sidenav: MdbSidenavComponent);
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    markForCheck(): void;
    setActiveElement(el: HTMLElement): void;
    setActiveCategory(): void;
    unsetActiveCategory(): void;
    private _toggleArrowIcon;
    static ɵfac: i0.ɵɵFactoryDeclaration<MdbSidenavItemComponent, [null, null, { optional: true; }, { optional: true; }, null, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MdbSidenavItemComponent, "mdb-sidenav-item", never, {}, {}, ["collapse"], [".sidenav-link", ".sidenav-collapse"]>;
}
