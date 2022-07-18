import { EventEmitter } from '@angular/core';
import { MdbTableSortHeaderDirective } from './table-sort-header.component';
import * as i0 from "@angular/core";
export declare type MdbSortDirection = 'asc' | 'desc' | 'none';
export interface MdbSortChange {
    name: string;
    direction: MdbSortDirection;
}
export declare class MdbTableSortDirective {
    headers: Map<string, MdbTableSortHeaderDirective>;
    active: MdbTableSortHeaderDirective;
    sortChange: EventEmitter<MdbSortChange>;
    sort(header: MdbTableSortHeaderDirective): void;
    addHeader(name: string, header: MdbTableSortHeaderDirective): void;
    removeHeader(name: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MdbTableSortDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MdbTableSortDirective, "[mdbTableSort]", ["mdbTableSort"], {}, { "sortChange": "sortChange"; }, never>;
}
