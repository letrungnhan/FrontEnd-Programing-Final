import { OnInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { MdbTimepickerComponent } from './timepicker.component';
import * as i0 from "@angular/core";
export declare class MdbTimepickerToggleComponent implements OnInit {
    private _cdRef;
    button: ElementRef<HTMLElement>;
    mdbTimepickerToggle: MdbTimepickerComponent;
    icon: string;
    disabled: boolean;
    handleClick(): void;
    constructor(_cdRef: ChangeDetectorRef);
    ngOnInit(): void;
    markForCheck(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MdbTimepickerToggleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MdbTimepickerToggleComponent, "mdb-timepicker-toggle", never, { "mdbTimepickerToggle": "mdbTimepickerToggle"; "icon": "icon"; "disabled": "disabled"; }, {}, never, never>;
}
