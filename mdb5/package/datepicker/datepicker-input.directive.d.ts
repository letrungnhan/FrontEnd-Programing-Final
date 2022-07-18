import { ElementRef, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Subject } from 'rxjs';
import { MdbDatepickerComponent } from './datepicker.component';
import * as i0 from "@angular/core";
export declare const MDB_DATEPICKER_VALUE_ACCESSOR: any;
export declare class MdbDatepickerInputDirective implements OnInit, ControlValueAccessor {
    private _elementRef;
    selectionChange: Subject<Date>;
    disabled: boolean;
    mdbDatepicker: MdbDatepickerComponent;
    onBlur(): void;
    constructor(_elementRef: ElementRef);
    ngOnInit(): void;
    onChange: (_: any) => void;
    onTouched: () => void;
    writeValue(value: Date): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MdbDatepickerInputDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MdbDatepickerInputDirective, "input[mdbDatepicker]", ["mdbDatepickerInput"], { "disabled": "disabled"; "mdbDatepicker": "mdbDatepicker"; }, {}, never>;
}
