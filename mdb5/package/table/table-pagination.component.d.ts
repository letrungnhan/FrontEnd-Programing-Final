import { BooleanInput } from '@angular/cdk/coercion';
import { EventEmitter, OnInit } from '@angular/core';
import * as i0 from "@angular/core";
export interface MdbPaginationChange {
    page: number;
    entries: number;
    total: number;
}
export declare class MdbTablePaginationComponent implements OnInit {
    set entries(value: number);
    get entries(): number;
    set prevButtonDisabled(value: boolean);
    get prevButtonDisabled(): boolean;
    set nextButtonDisabled(value: boolean);
    get nextButtonDisabled(): boolean;
    set entriesOptions(value: number[]);
    get entriesOptions(): number[];
    set total(value: number);
    get total(): number;
    rowsPerPageText: string;
    set page(value: number);
    get page(): number;
    private _entries;
    private _prevButtonDisabled;
    private _nextButtonDisabled;
    private _entriesOptions;
    private _total;
    private _page;
    private _isInitialized;
    firstVisibleItem: number;
    lastVisibleItem: number;
    activePageNumber: number;
    paginationChange: EventEmitter<MdbPaginationChange>;
    constructor();
    ngOnInit(): void;
    getPaginationRangeText(): string;
    isPreviousPageDisabled(): boolean;
    isNextPageDisabled(): boolean;
    private _getNumberOfPages;
    nextPage(): void;
    previousPage(): void;
    updateRowPerPageNumber(entries: any): void;
    private _emitPaginationChange;
    private _updateEntriesOptions;
    static ngAcceptInputType_prevButtonDisabled: BooleanInput;
    static ngAcceptInputType_nextButtonDisabled: BooleanInput;
    static ɵfac: i0.ɵɵFactoryDeclaration<MdbTablePaginationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MdbTablePaginationComponent, "mdb-table-pagination", ["mdbPagination"], { "entries": "entries"; "prevButtonDisabled": "prevButtonDisabled"; "nextButtonDisabled": "nextButtonDisabled"; "entriesOptions": "entriesOptions"; "total": "total"; "rowsPerPageText": "rowsPerPageText"; }, { "paginationChange": "paginationChange"; }, never, never>;
}
