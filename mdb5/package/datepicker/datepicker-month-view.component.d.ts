import { ElementRef, EventEmitter, OnInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare class MdbDatepickerMonthViewComponent implements OnInit {
    monthsContainer: ElementRef<HTMLElement>;
    options: any;
    minDate: null | Date;
    maxDate: null | Date;
    get activeDate(): Date;
    set activeDate(date: Date);
    private _activeDate;
    selectedMonth: number;
    selectedYear: number;
    monthSelected: EventEmitter<number>;
    activeDateChange: EventEmitter<Date>;
    months: any;
    private _isInitialized;
    ngOnInit(): void;
    private _init;
    private _generateMonthsView;
    _handleMonthsViewKeydown(event: any): void;
    _selectMonth(month: number): void;
    isActive(index: number): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<MdbDatepickerMonthViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MdbDatepickerMonthViewComponent, "mdb-datepicker-month-view", never, { "options": "options"; "minDate": "minDate"; "maxDate": "maxDate"; "activeDate": "activeDate"; "selectedMonth": "selectedMonth"; "selectedYear": "selectedYear"; }, { "monthSelected": "monthSelected"; "activeDateChange": "activeDateChange"; }, never, never>;
}
