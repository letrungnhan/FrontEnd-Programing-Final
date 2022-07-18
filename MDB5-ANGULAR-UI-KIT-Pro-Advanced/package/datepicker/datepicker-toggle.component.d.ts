import { OnInit, ElementRef } from '@angular/core';
import { MdbDatepickerComponent } from './datepicker.component';
import * as i0 from "@angular/core";
export declare class MdbDatepickerToggleComponent implements OnInit {
    button: ElementRef<HTMLElement>;
    disabled: boolean;
    icon: string;
    mdbDatepicker: MdbDatepickerComponent;
    constructor();
    onClick(): void;
    open(): void;
    close(): void;
    toggle(): void;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MdbDatepickerToggleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MdbDatepickerToggleComponent, "mdb-datepicker-toggle", never, { "disabled": "disabled"; "icon": "icon"; "mdbDatepicker": "mdbDatepicker"; }, {}, never, never>;
}
