import { OnInit } from '@angular/core';
import { MdbOptionParent } from './option.component';
import * as i0 from "@angular/core";
export declare class MdbOptionGroupComponent implements OnInit {
    private _parent;
    optionGroup: boolean;
    _optionHeight: number;
    label: string;
    get disabled(): boolean;
    set disabled(value: boolean);
    private _disabled;
    constructor(_parent: MdbOptionParent);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MdbOptionGroupComponent, [{ optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MdbOptionGroupComponent, "mdb-option-group", never, { "label": "label"; "disabled": "disabled"; }, {}, never, ["mdb-option"]>;
}
