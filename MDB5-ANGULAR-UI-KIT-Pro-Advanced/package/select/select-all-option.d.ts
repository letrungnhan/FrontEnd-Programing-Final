import { OnInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MdbOptionGroup, MdbOptionComponent, MdbOptionParent } from 'mdb-angular-ui-kit/option';
import * as i0 from "@angular/core";
export declare class MdbSelectAllOptionComponent extends MdbOptionComponent implements OnInit {
    _multiple: boolean;
    _optionHeight: number;
    constructor(_el: ElementRef, _cdRef: ChangeDetectorRef, _parent: MdbOptionParent, group: MdbOptionGroup);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MdbSelectAllOptionComponent, [null, null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MdbSelectAllOptionComponent, "mdb-select-all-option", never, {}, {}, never, ["*", ".select-option-icon-container"]>;
}
