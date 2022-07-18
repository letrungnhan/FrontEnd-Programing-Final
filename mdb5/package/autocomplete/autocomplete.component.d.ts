import { AfterContentInit, ElementRef, EventEmitter, QueryList, OnDestroy, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { MdbOptionComponent } from 'mdb-angular-ui-kit/option';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { BooleanInput } from '@angular/cdk/coercion';
import * as i0 from "@angular/core";
export interface MdbAutocompleteSelectedEvent {
    component: MdbAutocompleteComponent;
    option: MdbOptionComponent;
}
export declare class MdbAutocompleteComponent implements AfterContentInit, OnDestroy {
    private _cdRef;
    options: QueryList<MdbOptionComponent>;
    dropdown: ElementRef;
    dropdownTemplate: TemplateRef<any>;
    get autoSelect(): boolean;
    set autoSelect(value: boolean);
    private _autoSelect;
    get disabled(): boolean;
    set disabled(value: boolean);
    private _disabled;
    get optionHeight(): any;
    set optionHeight(value: any);
    private _optionHeight;
    get listHeight(): number;
    set listHeight(value: number);
    private _listHeight;
    displayValue: ((value: any) => string) | null;
    selected: EventEmitter<MdbAutocompleteSelectedEvent>;
    opened: EventEmitter<void>;
    closed: EventEmitter<void>;
    private _destroy$;
    _keyManager: ActiveDescendantKeyManager<MdbOptionComponent>;
    private _isOpen;
    protected showNoResultText: boolean;
    constructor(_cdRef: ChangeDetectorRef);
    _getOptionsArray(): MdbOptionComponent[];
    get isOpen(): boolean;
    _getScrollTop(): number;
    _setScrollTop(scrollPosition: number): void;
    _markForCheck(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    static ngAcceptInputType_disabled: BooleanInput;
    static ɵfac: i0.ɵɵFactoryDeclaration<MdbAutocompleteComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MdbAutocompleteComponent, "mdb-autocomplete", ["mdbAutocomplete"], { "autoSelect": "autoSelect"; "disabled": "disabled"; "optionHeight": "optionHeight"; "listHeight": "listHeight"; "displayValue": "displayValue"; }, { "selected": "selected"; "opened": "opened"; "closed": "closed"; }, ["options"], ["*", ".autocomplete-no-results", ".autocomplete-custom-content"]>;
}
