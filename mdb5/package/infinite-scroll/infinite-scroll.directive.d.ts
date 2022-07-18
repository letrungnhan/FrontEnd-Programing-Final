import { BooleanInput } from '@angular/cdk/coercion';
import { ElementRef, EventEmitter, NgZone, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export declare type MdbInfiniteScrollDirection = 'horizontal' | 'vertical';
export declare class MdbInfiniteScrollDirective implements OnInit {
    private _elementRef;
    private _ngZone;
    private _document;
    direction: MdbInfiniteScrollDirection;
    container: HTMLElement;
    get window(): boolean;
    set window(value: boolean);
    private _window;
    infiniteScrollCompleted: EventEmitter<any>;
    readonly _destroy$: Subject<void>;
    constructor(_elementRef: ElementRef, _ngZone: NgZone, _document: any);
    get host(): HTMLElement;
    ngOnInit(): void;
    private _isCompleted;
    private isCompletedContainer;
    private _isCompletedWindow;
    static ngAcceptInputType_window: BooleanInput;
    static ɵfac: i0.ɵɵFactoryDeclaration<MdbInfiniteScrollDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MdbInfiniteScrollDirective, "[mdbInfiniteScroll]", never, { "direction": "direction"; "container": "container"; "window": "window"; }, { "infiniteScrollCompleted": "infiniteScrollCompleted"; }, never>;
}
