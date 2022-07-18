import { OnInit, EventEmitter, ElementRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class MdbDatepickerDayViewComponent implements OnInit {
    datesContainer: ElementRef<HTMLElement>;
    selectedDate: Date;
    minDate: null | Date;
    maxDate: null | Date;
    filter: (date: Date) => boolean;
    startDay: number;
    get activeDate(): Date;
    set activeDate(date: Date);
    private _activeDate;
    options: any;
    dateSelected: EventEmitter<Date>;
    activeDateChange: EventEmitter<Date>;
    dates: any;
    weekdays: string[];
    private _isInitialized;
    ngOnInit(): void;
    private init;
    private _generateDayView;
    private _getWeekdays;
    _handleDaysViewKeydown(event: any): void;
    _isSameDate(date: Date, selectedDate: Date): boolean;
    _selectDate(date: Date): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MdbDatepickerDayViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MdbDatepickerDayViewComponent, "mdb-datepicker-day-view", never, { "selectedDate": "selectedDate"; "minDate": "minDate"; "maxDate": "maxDate"; "filter": "filter"; "startDay": "startDay"; "activeDate": "activeDate"; "options": "options"; }, { "dateSelected": "dateSelected"; "activeDateChange": "activeDateChange"; }, never, never>;
}
