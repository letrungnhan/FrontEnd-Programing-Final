import { BooleanInput } from '@angular/cdk/coercion';
import { ElementRef, InjectionToken, OnInit, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { MdbOptionGroupComponent } from './option-group.component';
import * as i0 from "@angular/core";
export interface MdbOptionParent {
    optionHeight: number;
    visibleOptions: number;
    multiple: boolean;
}
export interface MdbOptionGroup {
    disabled?: boolean;
}
export declare const MDB_OPTION_PARENT: InjectionToken<MdbOptionParent>;
export declare const MDB_OPTION_GROUP: InjectionToken<MdbOptionGroupComponent>;
export declare class MdbOptionComponent implements OnInit {
    private _el;
    private _cdRef;
    _parent: MdbOptionParent;
    group: MdbOptionGroup;
    value: any;
    hidden: boolean;
    get label(): string;
    set label(newValue: string);
    private _label;
    get isHidden(): boolean;
    get disabled(): boolean;
    set disabled(value: boolean);
    private _disabled;
    readonly selectionChange: EventEmitter<MdbOptionComponent>;
    _optionHeight: number;
    private _selected;
    private _active;
    _multiple: boolean;
    clicked: boolean;
    clickSource: Subject<MdbOptionComponent>;
    click$: Observable<MdbOptionComponent>;
    constructor(_el: ElementRef, _cdRef: ChangeDetectorRef, _parent: MdbOptionParent, group: MdbOptionGroup);
    option: boolean;
    get active(): boolean;
    get selected(): boolean;
    get optionHeight(): number;
    get role(): string;
    get isDisabled(): boolean;
    get isSelected(): boolean;
    onClick(): void;
    getLabel(): string;
    get offsetHeight(): number;
    ngOnInit(): void;
    select(): void;
    deselect(): void;
    setActiveStyles(): void;
    setInactiveStyles(): void;
    static ngAcceptInputType_disabled: BooleanInput;
    static ɵfac: i0.ɵɵFactoryDeclaration<MdbOptionComponent, [null, null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MdbOptionComponent, "mdb-option", never, { "value": "value"; "label": "label"; "disabled": "disabled"; }, { "selectionChange": "selectionChange"; }, never, ["*", ".option-icon-container"]>;
}
