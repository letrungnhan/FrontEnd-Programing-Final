import { OnDestroy, OnInit } from '@angular/core';
import { MdbTableSortDirective, MdbSortDirection } from './table-sort.directive';
import * as i0 from "@angular/core";
export declare class MdbTableSortHeaderDirective implements OnInit, OnDestroy {
    private _sort;
    get name(): string;
    set name(value: string);
    private _name;
    direction: MdbSortDirection;
    get rotate(): string;
    cursor: string;
    onClick(): void;
    constructor(_sort: MdbTableSortDirective);
    private _toCamelCase;
    private _getSortingDirection;
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MdbTableSortHeaderDirective, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MdbTableSortHeaderDirective, "[mdbTableSortHeader]", never, { "name": "mdbTableSortHeader"; }, {}, never, ["*"]>;
}
