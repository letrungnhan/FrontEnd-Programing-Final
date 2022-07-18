import { BooleanInput } from '@angular/cdk/coercion';
import { ElementRef, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export declare class MdbLightboxItemDirective implements OnDestroy {
    el: ElementRef;
    caption: string;
    img: string;
    get disabled(): boolean;
    set disabled(value: boolean);
    private _disabled;
    click$: Subject<MdbLightboxItemDirective>;
    onClick(): void;
    get isDisabled(): boolean;
    constructor(el: ElementRef);
    ngOnDestroy(): void;
    static ngAcceptInputType_flush: BooleanInput;
    static ɵfac: i0.ɵɵFactoryDeclaration<MdbLightboxItemDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MdbLightboxItemDirective, "[mdbLightboxItem]", ["mdbLightboxItem"], { "caption": "caption"; "img": "img"; "disabled": "disabled"; }, {}, never>;
}
