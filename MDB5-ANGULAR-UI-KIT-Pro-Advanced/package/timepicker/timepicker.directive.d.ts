import { ElementRef, EventEmitter, AfterViewInit } from '@angular/core';
import { MdbTimepickerComponent } from './timepicker.component';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
export declare const MDB_TIMEPICKER_VALUE_ACCESSOR: any;
export declare class MdbTimepickerDirective implements ControlValueAccessor, AfterViewInit {
    private el;
    mdbTimepicker: MdbTimepickerComponent;
    set value(value: string);
    get value(): string;
    private _value;
    _valueChange: EventEmitter<string>;
    constructor(el: ElementRef);
    handleInput(event: any): void;
    ngAfterViewInit(): void;
    onChange: (value: any) => void;
    onTouched: () => void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MdbTimepickerDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MdbTimepickerDirective, "[mdbTimepicker]", never, { "mdbTimepicker": "mdbTimepicker"; "value": "value"; }, {}, never>;
}
