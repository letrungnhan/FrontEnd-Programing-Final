import { ElementRef, EventEmitter, OnInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare class MdbDatepickerYearViewComponent implements OnInit {
    yearsContainer: ElementRef<HTMLElement>;
    get activeDate(): Date;
    set activeDate(date: Date);
    private _activeDate;
    yearSelected: EventEmitter<number>;
    activeDateChange: EventEmitter<Date>;
    minDate: Date;
    maxDate: Date;
    selectedYear: number;
    options: any;
    years: any;
    private _isInitialized;
    ngOnInit(): void;
    private _generateYearsView;
    _handleYearsViewKeydown(event: any): void;
    _selectYear(year: number): void;
    isActive(year: number): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<MdbDatepickerYearViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MdbDatepickerYearViewComponent, "mdb-datepicker-year-view", never, { "activeDate": "activeDate"; "minDate": "minDate"; "maxDate": "maxDate"; "selectedYear": "selectedYear"; "options": "options"; }, { "yearSelected": "yearSelected"; "activeDateChange": "activeDateChange"; }, never, never>;
}
