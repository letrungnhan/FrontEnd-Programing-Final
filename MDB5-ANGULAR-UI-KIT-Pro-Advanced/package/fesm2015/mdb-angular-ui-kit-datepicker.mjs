import * as i0 from '@angular/core';
import { EventEmitter, Component, ChangeDetectionStrategy, ViewChild, Input, Output, Inject, forwardRef, Directive, HostListener, ViewEncapsulation, NgModule } from '@angular/core';
import * as i1$1 from '@angular/cdk/overlay';
import { OverlayConfig, OverlayModule } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subject, merge, fromEvent } from 'rxjs';
import { SPACE, ENTER, PAGE_DOWN, PAGE_UP, END, HOME, DOWN_ARROW, UP_ARROW, RIGHT_ARROW, LEFT_ARROW } from '@angular/cdk/keycodes';
import * as i1 from '@angular/common';
import { DOCUMENT, CommonModule } from '@angular/common';
import * as i4 from '@angular/cdk/a11y';
import { A11yModule } from '@angular/cdk/a11y';
import { filter, takeUntil, take } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

const YEARS_IN_ROW = 4;
const YEARS_IN_VIEW = 24;
const MONTHS_IN_ROW = 4;

function getDate(date) {
    return date.getDate();
}
function getDayNumber(date) {
    return date.getDay();
}
function getMonth(date) {
    return date.getMonth();
}
function getYear(date) {
    return date.getFullYear();
}
function getFirstDayOfWeek(year, month, startDay) {
    const firstDayIndex = startDay;
    const sundayIndex = firstDayIndex > 0 ? 7 - firstDayIndex : 0;
    const date = new Date(year, month);
    const index = date.getDay() + sundayIndex;
    const newIndex = index >= 7 ? index - 7 : index;
    return newIndex;
}
function getDaysInMonth(date) {
    return getMonthEnd(date).getDate();
}
function getMonthEnd(date) {
    return createDate(date.getFullYear(), date.getMonth() + 1, 0);
}
function getToday() {
    return new Date();
}
function addYears(date, years) {
    return addMonths(date, years * 12);
}
function addMonths(date, months) {
    const month = createDate(date.getFullYear(), date.getMonth() + months, date.getDate());
    const dayOfPreviousMonth = getDate(date);
    const dayOfNewMonth = getDate(month);
    // Solution for edge cases, like moving from a month with a greater number
    // of days than the destination month. For example, when we move from 31 Mar 2020 to
    // February, createDate(2020, 2, 31) will return 2 Mar 2020, not the desired 29 Feb 2020.
    // We need to use setDate(0) to move back to the last day of the previous month (29 Feb 2020)
    if (dayOfPreviousMonth !== dayOfNewMonth) {
        month.setDate(0);
    }
    return month;
}
function addDays(date, days) {
    return createDate(date.getFullYear(), date.getMonth(), date.getDate() + days);
}
function createDate(year, month, day) {
    const result = new Date(year, month, day);
    // In js native date years from 0 to 99 are treated as abbreviation
    // for dates like 19xx
    if (year >= 0 && year < 100) {
        result.setFullYear(result.getFullYear() - 1900);
    }
    return result;
}
function convertStringToDate(dateString) {
    const dateArr = dateString.split('-');
    const year = Number(dateArr[0]);
    const month = Number(dateArr[1]);
    const day = Number(dateArr[2]);
    return createDate(year, month, day);
}
function isValidDate(date) {
    return !Number.isNaN(date.getTime());
}
function compareDates(date1, date2) {
    return (getYear(date1) - getYear(date2) ||
        getMonth(date1) - getMonth(date2) ||
        getDate(date1) - getDate(date2));
}
function isSameDate(date1, date2) {
    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);
    return date1.getTime() === date2.getTime();
}
function getYearsOffset(activeDate, yearsInView, minDate, maxDate) {
    const activeYear = getYear(activeDate);
    const yearsDifference = activeYear - getStartYear(yearsInView, minDate, maxDate);
    return modulo(yearsDifference, yearsInView);
}
function modulo(a, b) {
    return ((a % b) + b) % b;
}
function getStartYear(yearsInView, minDate, maxDate) {
    let startYear = 0;
    if (maxDate) {
        const maxYear = getYear(maxDate);
        startYear = maxYear - yearsInView + 1;
    }
    else if (minDate) {
        startYear = getYear(minDate);
    }
    return startYear;
}
function isDateDisabled(date, minDate, maxDate, filter) {
    const isBeforeMin = minDate && compareDates(date, minDate) <= 0;
    const isAfterMax = maxDate && compareDates(date, maxDate) >= 0;
    const isDisabled = filter && filter(date) === false;
    return isBeforeMin || isAfterMax || isDisabled;
}
function isMonthDisabled(month, year, minDate, maxDate) {
    const maxYear = maxDate && getYear(maxDate);
    const maxMonth = maxDate && getMonth(maxDate);
    const minYear = minDate && getYear(minDate);
    const minMonth = minDate && getMonth(minDate);
    const isMonthAndYearAfterMax = maxMonth && maxYear && (year > maxYear || (year === maxYear && month > maxMonth));
    const isMonthAndYearBeforeMin = minMonth && minYear && (year < minYear || (year === minYear && month < minMonth));
    return isMonthAndYearAfterMax || isMonthAndYearBeforeMin;
}
function isYearDisabled(year, minDate, maxDate) {
    const min = minDate && getYear(minDate);
    const max = maxDate && getYear(maxDate);
    const isAfterMax = max && year > max;
    const isBeforeMin = min && year < min;
    return isAfterMax || isBeforeMin;
}
function isNextDateDisabled(activeDate, view, yearsInView, minDate, maxDate) {
    return maxDate && areDatesInSameView(activeDate, maxDate, view, yearsInView, minDate, maxDate);
}
function isPreviousDateDisabled(activeDate, view, yearsInView, minDate, maxDate) {
    return minDate && areDatesInSameView(activeDate, minDate, view, yearsInView, minDate, maxDate);
}
function areDatesInSameView(date1, date2, view, yearsInView, minDate, maxDate) {
    if (view === 'days') {
        return getYear(date1) === getYear(date2) && getMonth(date1) === getMonth(date2);
    }
    if (view === 'months') {
        return getYear(date1) === getYear(date2);
    }
    if (view === 'years') {
        const startYear = getStartYear(yearsInView, minDate, maxDate);
        return (Math.floor((getYear(date1) - startYear) / yearsInView) ===
            Math.floor((getYear(date2) - startYear) / yearsInView));
    }
    return false;
}

class MdbDatepickerDayViewComponent {
    constructor() {
        this.dateSelected = new EventEmitter();
        this.activeDateChange = new EventEmitter();
        this._isInitialized = false;
    }
    get activeDate() {
        return this._activeDate;
    }
    set activeDate(date) {
        const oldActiveDate = this._activeDate;
        this._activeDate = date;
        if (this._isInitialized) {
            if (!areDatesInSameView(oldActiveDate, date, 'days', YEARS_IN_VIEW, this.minDate, this.maxDate)) {
                this.dates = this._generateDayView(date);
            }
        }
    }
    ngOnInit() {
        this.init();
    }
    init() {
        this.dates = this._generateDayView(this.activeDate);
        this.weekdays = this._getWeekdays(this.startDay);
        this._isInitialized = true;
        setTimeout(() => {
            this.datesContainer.nativeElement.focus();
        }, 0);
    }
    _generateDayView(activeDate) {
        const dates = [];
        const month = getMonth(activeDate);
        const previousMonth = getMonth(addMonths(activeDate, -1));
        const nextMonth = getMonth(addMonths(activeDate, 1));
        const year = getYear(activeDate);
        const firstDay = getFirstDayOfWeek(year, month, this.startDay);
        const daysInMonth = getDaysInMonth(activeDate);
        const daysInPreviousMonth = getDaysInMonth(addMonths(activeDate, -1));
        const daysInWeek = 7;
        let dayNumber = 1;
        let isCurrentMonth = false;
        for (let i = 1; i < daysInWeek; i++) {
            const week = [];
            if (i === 1) {
                // First week
                const previousMonthDay = daysInPreviousMonth - firstDay + 1;
                // Previous month
                for (let j = previousMonthDay; j <= daysInPreviousMonth; j++) {
                    const date = createDate(year, previousMonth, j);
                    week.push({
                        date,
                        currentMonth: isCurrentMonth,
                        isToday: isSameDate(date, getToday()),
                        dayNumber: getDate(date),
                        disabled: isDateDisabled(date, this.minDate, this.maxDate, this.filter),
                    });
                }
                isCurrentMonth = true;
                // Current month
                const daysLeft = daysInWeek - week.length;
                for (let j = 0; j < daysLeft; j++) {
                    const date = createDate(year, month, dayNumber);
                    week.push({
                        date,
                        currentMonth: isCurrentMonth,
                        isToday: isSameDate(date, getToday()),
                        dayNumber: getDate(date),
                        disabled: isDateDisabled(date, this.minDate, this.maxDate, this.filter),
                    });
                    dayNumber++;
                }
            }
            else {
                // Rest of the weeks
                for (let j = 1; j < 8; j++) {
                    if (dayNumber > daysInMonth) {
                        // Next month
                        dayNumber = 1;
                        isCurrentMonth = false;
                    }
                    const date = createDate(year, isCurrentMonth ? month : nextMonth, dayNumber);
                    week.push({
                        date,
                        currentMonth: isCurrentMonth,
                        isToday: isSameDate(date, getToday()),
                        dayNumber: getDate(date),
                        disabled: isDateDisabled(date, this.minDate, this.maxDate, this.filter),
                    });
                    dayNumber++;
                }
            }
            dates.push(week);
        }
        return dates;
    }
    _getWeekdays(startDay) {
        const weekdays = this.options.weekdaysNarrow;
        const sortedWeekdays = weekdays.slice(startDay).concat(weekdays.slice(0, startDay));
        return startDay !== 0 ? sortedWeekdays : weekdays;
    }
    _handleDaysViewKeydown(event) {
        const isRTL = false;
        switch (event.keyCode) {
            case LEFT_ARROW:
                this.activeDate = addDays(this.activeDate, isRTL ? 1 : -1);
                break;
            case RIGHT_ARROW:
                this.activeDate = addDays(this.activeDate, isRTL ? -1 : 1);
                break;
            case UP_ARROW:
                this.activeDate = addDays(this.activeDate, -7);
                break;
            case DOWN_ARROW:
                this.activeDate = addDays(this.activeDate, 7);
                break;
            case HOME:
                this.activeDate = addDays(this.activeDate, 1 - getDate(this.activeDate));
                break;
            case END:
                this.activeDate = addDays(this.activeDate, getDaysInMonth(this.activeDate) - getDate(this.activeDate));
                break;
            case PAGE_UP:
                this.activeDate = addMonths(this._activeDate, -1);
                break;
            case PAGE_DOWN:
                this.activeDate = addMonths(this._activeDate, 1);
                break;
            case ENTER:
            case SPACE:
                this.dateSelected.emit(this._activeDate);
                event.preventDefault();
                return;
            default:
                return;
        }
        this.activeDateChange.emit(this._activeDate);
        event.preventDefault();
    }
    _isSameDate(date, selectedDate) {
        if (!selectedDate) {
            return;
        }
        return isSameDate(date, selectedDate);
    }
    _selectDate(date) {
        this.dateSelected.emit(date);
    }
}
MdbDatepickerDayViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbDatepickerDayViewComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MdbDatepickerDayViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbDatepickerDayViewComponent, selector: "mdb-datepicker-day-view", inputs: { selectedDate: "selectedDate", minDate: "minDate", maxDate: "maxDate", filter: "filter", startDay: "startDay", activeDate: "activeDate", options: "options" }, outputs: { dateSelected: "dateSelected", activeDateChange: "activeDateChange" }, viewQueries: [{ propertyName: "datesContainer", first: true, predicate: ["datesContainer"], descendants: true, static: true }], ngImport: i0, template: "<table class=\"datepicker-table\">\n  <thead>\n    <tr>\n      <th class=\"datepicker-day-heading\" scope=\"col\" *ngFor=\"let day of weekdays\">\n        {{ day }}\n      </th>\n    </tr>\n  </thead>\n  <tbody\n    #datesContainer\n    class=\"datepicker-table-body\"\n    (keydown)=\"_handleDaysViewKeydown($event)\"\n    [tabindex]=\"0\"\n  >\n    <tr *ngFor=\"let date of dates\">\n      <td\n        class=\"datepicker-cell datepicker-small-cell datepicker-day-cell\"\n        [class.selected]=\"_isSameDate(day.date, selectedDate)\"\n        [class.focused]=\"_isSameDate(day.date, activeDate)\"\n        [class.disabled]=\"day.disabled || !day.currentMonth\"\n        [class.current]=\"day.isToday\"\n        [attr.aria-selected]=\"day.isSelected\"\n        [attr.aria-label]=\"day.date\"\n        *ngFor=\"let day of date\"\n        (click)=\"_selectDate(day.date); $event.stopPropagation()\"\n      >\n        <div class=\"datepicker-cell-content datepicker-small-cell-content\" *ngIf=\"day.currentMonth\">\n          {{ day.dayNumber }}\n        </div>\n      </td>\n    </tr>\n  </tbody>\n</table>\n", directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbDatepickerDayViewComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-datepicker-day-view', changeDetection: ChangeDetectionStrategy.OnPush, template: "<table class=\"datepicker-table\">\n  <thead>\n    <tr>\n      <th class=\"datepicker-day-heading\" scope=\"col\" *ngFor=\"let day of weekdays\">\n        {{ day }}\n      </th>\n    </tr>\n  </thead>\n  <tbody\n    #datesContainer\n    class=\"datepicker-table-body\"\n    (keydown)=\"_handleDaysViewKeydown($event)\"\n    [tabindex]=\"0\"\n  >\n    <tr *ngFor=\"let date of dates\">\n      <td\n        class=\"datepicker-cell datepicker-small-cell datepicker-day-cell\"\n        [class.selected]=\"_isSameDate(day.date, selectedDate)\"\n        [class.focused]=\"_isSameDate(day.date, activeDate)\"\n        [class.disabled]=\"day.disabled || !day.currentMonth\"\n        [class.current]=\"day.isToday\"\n        [attr.aria-selected]=\"day.isSelected\"\n        [attr.aria-label]=\"day.date\"\n        *ngFor=\"let day of date\"\n        (click)=\"_selectDate(day.date); $event.stopPropagation()\"\n      >\n        <div class=\"datepicker-cell-content datepicker-small-cell-content\" *ngIf=\"day.currentMonth\">\n          {{ day.dayNumber }}\n        </div>\n      </td>\n    </tr>\n  </tbody>\n</table>\n" }]
        }], propDecorators: { datesContainer: [{
                type: ViewChild,
                args: ['datesContainer', { static: true }]
            }], selectedDate: [{
                type: Input
            }], minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], filter: [{
                type: Input
            }], startDay: [{
                type: Input
            }], activeDate: [{
                type: Input
            }], options: [{
                type: Input
            }], dateSelected: [{
                type: Output
            }], activeDateChange: [{
                type: Output
            }] } });

class MdbDatepickerYearViewComponent {
    constructor() {
        this.yearSelected = new EventEmitter();
        this.activeDateChange = new EventEmitter();
        this._isInitialized = false;
    }
    get activeDate() {
        return this._activeDate;
    }
    set activeDate(date) {
        const oldActiveDate = this._activeDate;
        this._activeDate = date;
        if (this._isInitialized && date) {
            if (!areDatesInSameView(oldActiveDate, date, 'years', YEARS_IN_VIEW, this.minDate, this.maxDate)) {
                this.years = this._generateYearsView(date, YEARS_IN_VIEW, YEARS_IN_ROW);
            }
        }
    }
    ngOnInit() {
        this.years = this._generateYearsView(this._activeDate, YEARS_IN_VIEW, YEARS_IN_ROW);
        this._isInitialized = true;
        setTimeout(() => {
            this.yearsContainer.nativeElement.focus();
        }, 0);
    }
    _generateYearsView(date, yearsInView, yearsInRow) {
        const years = [];
        const activeYear = getYear(date);
        const currentYear = getYear(getToday());
        const yearsOffset = getYearsOffset(date, yearsInView, this.minDate, this.maxDate);
        const firstYearInView = activeYear - yearsOffset;
        let row = [];
        for (let i = 0; i < yearsInView; i++) {
            const year = firstYearInView + i;
            row.push({
                name: year,
                current: currentYear === year,
                disabled: isYearDisabled(year, this.minDate, this.maxDate),
            });
            if (row.length === yearsInRow) {
                const yearsRow = row;
                years.push(yearsRow);
                row = [];
            }
        }
        return years;
    }
    _handleYearsViewKeydown(event) {
        const isRTL = false;
        switch (event.keyCode) {
            case LEFT_ARROW:
                this._activeDate = addYears(this.activeDate, isRTL ? 1 : -1);
                break;
            case RIGHT_ARROW:
                this._activeDate = addYears(this.activeDate, isRTL ? -1 : 1);
                break;
            case UP_ARROW:
                this._activeDate = addYears(this.activeDate, -YEARS_IN_ROW);
                break;
            case DOWN_ARROW:
                this._activeDate = addYears(this.activeDate, YEARS_IN_ROW);
                break;
            case HOME:
                this._activeDate = addYears(this.activeDate, -getYearsOffset(this.activeDate, YEARS_IN_VIEW, this.minDate, this.maxDate));
                break;
            case END:
                this._activeDate = addYears(this._activeDate, YEARS_IN_VIEW -
                    getYearsOffset(this.activeDate, YEARS_IN_VIEW, this.minDate, this.maxDate) -
                    1);
                break;
            case PAGE_UP:
                this._activeDate = addYears(this.activeDate, -YEARS_IN_VIEW);
                break;
            case PAGE_DOWN:
                this._activeDate = addYears(this.activeDate, YEARS_IN_VIEW);
                break;
            case ENTER:
            case SPACE:
                const activeYear = getYear(this.activeDate);
                this._selectYear(activeYear);
                return;
            default:
                return;
        }
        this.activeDateChange.emit(this.activeDate);
        event.preventDefault();
    }
    _selectYear(year) {
        this.yearSelected.emit(year);
    }
    isActive(year) {
        return getYear(this._activeDate) === year;
    }
}
MdbDatepickerYearViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbDatepickerYearViewComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MdbDatepickerYearViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbDatepickerYearViewComponent, selector: "mdb-datepicker-year-view", inputs: { activeDate: "activeDate", minDate: "minDate", maxDate: "maxDate", selectedYear: "selectedYear", options: "options" }, outputs: { yearSelected: "yearSelected", activeDateChange: "activeDateChange" }, viewQueries: [{ propertyName: "yearsContainer", first: true, predicate: ["yearsContainer"], descendants: true, static: true }], ngImport: i0, template: "<table class=\"datepicker-table\">\n  <tbody\n    #yearsContainer\n    class=\"datepicker-table-body\"\n    (keydown)=\"_handleYearsViewKeydown($event)\"\n    [tabindex]=\"0\"\n  >\n    <tr *ngFor=\"let yearsRow of years\">\n      <td\n        class=\"datepicker-cell datepicker-large-cell datepicker-year-cell\"\n        [class.disabled]=\"year.disabled\"\n        [class.selected]=\"year.name === selectedYear\"\n        [class.current]=\"year.current\"\n        [class.focused]=\"isActive(year.name)\"\n        [attr.aria-label]=\"year.name\"\n        *ngFor=\"let year of yearsRow\"\n        (click)=\"_selectYear(year.name); $event.stopPropagation()\"\n      >\n        <div class=\"datepicker-cell-content datepicker-large-cell-content\">\n          {{ year.name }}\n        </div>\n      </td>\n    </tr>\n  </tbody>\n</table>\n", directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbDatepickerYearViewComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-datepicker-year-view', changeDetection: ChangeDetectionStrategy.OnPush, template: "<table class=\"datepicker-table\">\n  <tbody\n    #yearsContainer\n    class=\"datepicker-table-body\"\n    (keydown)=\"_handleYearsViewKeydown($event)\"\n    [tabindex]=\"0\"\n  >\n    <tr *ngFor=\"let yearsRow of years\">\n      <td\n        class=\"datepicker-cell datepicker-large-cell datepicker-year-cell\"\n        [class.disabled]=\"year.disabled\"\n        [class.selected]=\"year.name === selectedYear\"\n        [class.current]=\"year.current\"\n        [class.focused]=\"isActive(year.name)\"\n        [attr.aria-label]=\"year.name\"\n        *ngFor=\"let year of yearsRow\"\n        (click)=\"_selectYear(year.name); $event.stopPropagation()\"\n      >\n        <div class=\"datepicker-cell-content datepicker-large-cell-content\">\n          {{ year.name }}\n        </div>\n      </td>\n    </tr>\n  </tbody>\n</table>\n" }]
        }], propDecorators: { yearsContainer: [{
                type: ViewChild,
                args: ['yearsContainer', { static: true }]
            }], activeDate: [{
                type: Input
            }], yearSelected: [{
                type: Output
            }], activeDateChange: [{
                type: Output
            }], minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], selectedYear: [{
                type: Input
            }], options: [{
                type: Input
            }] } });

class MdbDatepickerMonthViewComponent {
    constructor() {
        this.monthSelected = new EventEmitter();
        this.activeDateChange = new EventEmitter();
        this._isInitialized = false;
    }
    get activeDate() {
        return this._activeDate;
    }
    set activeDate(date) {
        const oldActiveDate = this._activeDate;
        this._activeDate = date;
        if (this._isInitialized && date) {
            if (!areDatesInSameView(oldActiveDate, date, 'months', YEARS_IN_VIEW, this.minDate, this.maxDate)) {
                this.months = this._generateMonthsView(this.options, MONTHS_IN_ROW);
            }
        }
    }
    ngOnInit() {
        this._init();
    }
    _init() {
        this.months = this._generateMonthsView(this.options, MONTHS_IN_ROW);
        this._isInitialized = true;
        setTimeout(() => {
            this.monthsContainer.nativeElement.focus();
        }, 0);
    }
    _generateMonthsView(options, monthsInRow) {
        const months = [];
        const currentMonth = getMonth(getToday());
        const currentYear = getYear(getToday());
        const activeYear = getYear(this.activeDate);
        let row = [];
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < options.monthsShort.length; i++) {
            row.push({
                name: options.monthsShort[i],
                index: i,
                year: activeYear,
                disabled: isMonthDisabled(i, activeYear, this.minDate, this.maxDate),
                current: i === currentMonth && activeYear === currentYear,
                label: `${options.monthsShort[i]}, ${activeYear}`,
            });
            if (row.length === monthsInRow) {
                const monthsRow = row;
                months.push(monthsRow);
                row = [];
            }
        }
        return months;
    }
    _handleMonthsViewKeydown(event) {
        const isRTL = false;
        switch (event.keyCode) {
            case LEFT_ARROW:
                this.activeDate = addMonths(this.activeDate, isRTL ? 1 : -1);
                break;
            case RIGHT_ARROW:
                this.activeDate = addMonths(this.activeDate, isRTL ? -1 : 1);
                break;
            case UP_ARROW:
                this.activeDate = addMonths(this.activeDate, -4);
                break;
            case DOWN_ARROW:
                this.activeDate = addMonths(this.activeDate, 4);
                break;
            case HOME:
                this.activeDate = addMonths(this.activeDate, -getMonth(this.activeDate));
                break;
            case END:
                this.activeDate = addMonths(this.activeDate, 11 - getMonth(this.activeDate));
                break;
            case PAGE_UP:
                this.activeDate = addYears(this.activeDate, -1);
                break;
            case PAGE_DOWN:
                this.activeDate = addYears(this.activeDate, 1);
                break;
            case ENTER:
            case SPACE:
                const activeMonth = getMonth(this.activeDate);
                this._selectMonth(activeMonth);
                return;
            default:
                return;
        }
        this.activeDateChange.emit(this.activeDate);
        event.preventDefault();
    }
    _selectMonth(month) {
        this.monthSelected.emit(month);
    }
    isActive(index) {
        return getMonth(this.activeDate) === index;
    }
}
MdbDatepickerMonthViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbDatepickerMonthViewComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MdbDatepickerMonthViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbDatepickerMonthViewComponent, selector: "mdb-datepicker-month-view", inputs: { options: "options", minDate: "minDate", maxDate: "maxDate", activeDate: "activeDate", selectedMonth: "selectedMonth", selectedYear: "selectedYear" }, outputs: { monthSelected: "monthSelected", activeDateChange: "activeDateChange" }, viewQueries: [{ propertyName: "monthsContainer", first: true, predicate: ["monthsContainer"], descendants: true, static: true }], ngImport: i0, template: "<table class=\"datepicker-table\">\n  <tbody\n    #monthsContainer\n    class=\"datepicker-table-body\"\n    (keydown)=\"_handleMonthsViewKeydown($event)\"\n    [tabindex]=\"0\"\n  >\n    <tr *ngFor=\"let monthsRow of months\">\n      <td\n        class=\"datepicker-cell datepicker-large-cell datepicker-month-cell\"\n        [class.selected]=\"month.index === selectedMonth && month.year === selectedYear\"\n        [class.focused]=\"isActive(month.index)\"\n        [class.disabled]=\"month.disabled\"\n        [class.current]=\"month.current\"\n        [attr.aria-label]=\"month.label\"\n        *ngFor=\"let month of monthsRow\"\n        (click)=\"_selectMonth(month.index); $event.stopPropagation()\"\n      >\n        <div class=\"datepicker-cell-content datepicker-large-cell-content\">\n          {{ month.name }}\n        </div>\n      </td>\n    </tr>\n  </tbody>\n</table>\n", directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbDatepickerMonthViewComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-datepicker-month-view', changeDetection: ChangeDetectionStrategy.OnPush, template: "<table class=\"datepicker-table\">\n  <tbody\n    #monthsContainer\n    class=\"datepicker-table-body\"\n    (keydown)=\"_handleMonthsViewKeydown($event)\"\n    [tabindex]=\"0\"\n  >\n    <tr *ngFor=\"let monthsRow of months\">\n      <td\n        class=\"datepicker-cell datepicker-large-cell datepicker-month-cell\"\n        [class.selected]=\"month.index === selectedMonth && month.year === selectedYear\"\n        [class.focused]=\"isActive(month.index)\"\n        [class.disabled]=\"month.disabled\"\n        [class.current]=\"month.current\"\n        [attr.aria-label]=\"month.label\"\n        *ngFor=\"let month of monthsRow\"\n        (click)=\"_selectMonth(month.index); $event.stopPropagation()\"\n      >\n        <div class=\"datepicker-cell-content datepicker-large-cell-content\">\n          {{ month.name }}\n        </div>\n      </td>\n    </tr>\n  </tbody>\n</table>\n" }]
        }], propDecorators: { monthsContainer: [{
                type: ViewChild,
                args: ['monthsContainer', { static: true }]
            }], options: [{
                type: Input
            }], minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], activeDate: [{
                type: Input
            }], selectedMonth: [{
                type: Input
            }], selectedYear: [{
                type: Input
            }], monthSelected: [{
                type: Output
            }], activeDateChange: [{
                type: Output
            }] } });

class MdbDatepickerContentComponent {
    constructor(_cdRef) {
        this._cdRef = _cdRef;
        this._hideAnimationDone = new Subject();
        this._contentAnimationState = 'show';
    }
    detectChanges() {
        this._cdRef.markForCheck();
    }
    ngOnDestroy() {
        this._hideAnimationDone.complete();
    }
    onDateSelect(date) {
        this.datepicker._selectDate(date);
    }
    onYearSelect(year) {
        this.datepicker._selectYear(year);
    }
    onMonthSelect(month) {
        this.datepicker._selectMonth(month);
    }
    _startHideAnimation() {
        this._contentAnimationState = 'hide';
        this._cdRef.markForCheck();
    }
    _onAnimationDone(event) {
        if (event.toState === 'hide') {
            this._hideAnimationDone.next();
        }
    }
}
MdbDatepickerContentComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbDatepickerContentComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MdbDatepickerContentComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbDatepickerContentComponent, selector: "mdb-datepicker-content", exportAs: ["mdbDatepickerContent"], ngImport: i0, template: "<div\n  [@fadeInOutDatepicker]=\"_contentAnimationState\"\n  (@fadeInOutDatepicker.done)=\"_onAnimationDone($event)\"\n  cdkTrapFocus\n  [ngClass]=\"{\n    'datepicker-modal-container': !datepicker.inline,\n    'datepicker-dropdown-container': datepicker.inline\n  }\"\n>\n  <div class=\"datepicker-header\" *ngIf=\"!datepicker.inline\">\n    <div class=\"datepicker-title\">\n      <span class=\"datepicker-title-text\">{{ datepicker.options.title }}</span>\n    </div>\n    <div class=\"datepicker-date\">\n      <span class=\"datepicker-date-text\">{{ datepicker._headerDate }}</span>\n    </div>\n  </div>\n  <div class=\"datepicker-main\">\n    <div class=\"datepicker-date-controls\">\n      <button\n        type=\"button\"\n        [attr.aria-label]=\"datepicker.viewChangeButtonLabel\"\n        class=\"datepicker-view-change-button\"\n        (click)=\"datepicker.viewChange(); ($event.preventDefault); $event.stopPropagation()\"\n      >\n        {{ datepicker.viewChangeButtonText }}\n      </button>\n      <div class=\"datepicker-arrow-controls\">\n        <button\n          type=\"button\"\n          [attr.aria-label]=\"datepicker.prevButtonLabel\"\n          class=\"datepicker-previous-button\"\n          [disabled]=\"datepicker._prevBtnDisabled\"\n          (click)=\"datepicker._handlePreviousButtonClick()\"\n        ></button>\n        <button\n          type=\"button\"\n          [attr.aria-label]=\"datepicker.nextButtonLabel\"\n          class=\"datepicker-next-button\"\n          [disabled]=\"datepicker._nextBtnDisabled\"\n          (click)=\"datepicker._handleNextButtonClick()\"\n        ></button>\n      </div>\n    </div>\n    <div class=\"datepicker-view\" [ngSwitch]=\"datepicker._currentView\">\n      <mdb-datepicker-day-view\n        *ngSwitchCase=\"'days'\"\n        [(activeDate)]=\"datepicker._activeDate\"\n        [selectedDate]=\"datepicker._selectedDate\"\n        [startDay]=\"datepicker.startDay\"\n        [options]=\"datepicker.options\"\n        [minDate]=\"datepicker.minDate\"\n        [maxDate]=\"datepicker.maxDate\"\n        [filter]=\"datepicker.filter\"\n        (dateSelected)=\"onDateSelect($event)\"\n      ></mdb-datepicker-day-view>\n      <mdb-datepicker-year-view\n        *ngSwitchCase=\"'years'\"\n        [(activeDate)]=\"datepicker._activeDate\"\n        [minDate]=\"datepicker.minDate\"\n        [maxDate]=\"datepicker.maxDate\"\n        [selectedYear]=\"datepicker._selectedYear\"\n        (yearSelected)=\"onYearSelect($event)\"\n      ></mdb-datepicker-year-view>\n      <mdb-datepicker-month-view\n        *ngSwitchCase=\"'months'\"\n        [(activeDate)]=\"datepicker._activeDate\"\n        [selectedMonth]=\"datepicker._selectedMonth\"\n        [selectedYear]=\"datepicker._selectedYear\"\n        [options]=\"datepicker.options\"\n        [minDate]=\"datepicker.minDate\"\n        [maxDate]=\"datepicker.maxDate\"\n        (monthSelected)=\"onMonthSelect($event)\"\n      ></mdb-datepicker-month-view>\n    </div>\n    <div class=\"datepicker-footer\" *ngIf=\"!datepicker.inline\">\n      <button\n        type=\"button\"\n        [attr.aria-label]=\"datepicker.options.clearBtnLabel\"\n        class=\"datepicker-footer-btn datepicker-clear-btn\"\n        (click)=\"datepicker._handleClearClick()\"\n      >\n        {{ datepicker.options.clearBtnText }}\n      </button>\n      <button\n        type=\"button\"\n        [attr.aria-label]=\"datepicker.options.cancelBtnLabel\"\n        class=\"datepicker-footer-btn datepicker-cancel-btn\"\n        (click)=\"datepicker._handleCancelClick()\"\n      >\n        {{ datepicker.options.cancelBtnText }}\n      </button>\n      <button\n        type=\"button\"\n        [attr.aria-label]=\"datepicker.options.okBtnLabel\"\n        class=\"datepicker-footer-btn datepicker-ok-btn\"\n        (click)=\"datepicker._handleOkClick()\"\n      >\n        {{ datepicker.options.okBtnText }}\n      </button>\n    </div>\n  </div>\n</div>\n", components: [{ type: MdbDatepickerDayViewComponent, selector: "mdb-datepicker-day-view", inputs: ["selectedDate", "minDate", "maxDate", "filter", "startDay", "activeDate", "options"], outputs: ["dateSelected", "activeDateChange"] }, { type: MdbDatepickerYearViewComponent, selector: "mdb-datepicker-year-view", inputs: ["activeDate", "minDate", "maxDate", "selectedYear", "options"], outputs: ["yearSelected", "activeDateChange"] }, { type: MdbDatepickerMonthViewComponent, selector: "mdb-datepicker-month-view", inputs: ["options", "minDate", "maxDate", "activeDate", "selectedMonth", "selectedYear"], outputs: ["monthSelected", "activeDateChange"] }], directives: [{ type: i4.CdkTrapFocus, selector: "[cdkTrapFocus]", inputs: ["cdkTrapFocus", "cdkTrapFocusAutoCapture"], exportAs: ["cdkTrapFocus"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }], animations: [
        trigger('fadeInOutDatepicker', [
            state('void', style({ opacity: 0 })),
            state('hide', style({ opacity: 0 })),
            state('show', style({ opacity: 1 })),
            transition('* <=> *', animate('300ms ease-in-out')),
        ]),
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbDatepickerContentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-datepicker-content', exportAs: 'mdbDatepickerContent', changeDetection: ChangeDetectionStrategy.OnPush, animations: [
                        trigger('fadeInOutDatepicker', [
                            state('void', style({ opacity: 0 })),
                            state('hide', style({ opacity: 0 })),
                            state('show', style({ opacity: 1 })),
                            transition('* <=> *', animate('300ms ease-in-out')),
                        ]),
                    ], template: "<div\n  [@fadeInOutDatepicker]=\"_contentAnimationState\"\n  (@fadeInOutDatepicker.done)=\"_onAnimationDone($event)\"\n  cdkTrapFocus\n  [ngClass]=\"{\n    'datepicker-modal-container': !datepicker.inline,\n    'datepicker-dropdown-container': datepicker.inline\n  }\"\n>\n  <div class=\"datepicker-header\" *ngIf=\"!datepicker.inline\">\n    <div class=\"datepicker-title\">\n      <span class=\"datepicker-title-text\">{{ datepicker.options.title }}</span>\n    </div>\n    <div class=\"datepicker-date\">\n      <span class=\"datepicker-date-text\">{{ datepicker._headerDate }}</span>\n    </div>\n  </div>\n  <div class=\"datepicker-main\">\n    <div class=\"datepicker-date-controls\">\n      <button\n        type=\"button\"\n        [attr.aria-label]=\"datepicker.viewChangeButtonLabel\"\n        class=\"datepicker-view-change-button\"\n        (click)=\"datepicker.viewChange(); ($event.preventDefault); $event.stopPropagation()\"\n      >\n        {{ datepicker.viewChangeButtonText }}\n      </button>\n      <div class=\"datepicker-arrow-controls\">\n        <button\n          type=\"button\"\n          [attr.aria-label]=\"datepicker.prevButtonLabel\"\n          class=\"datepicker-previous-button\"\n          [disabled]=\"datepicker._prevBtnDisabled\"\n          (click)=\"datepicker._handlePreviousButtonClick()\"\n        ></button>\n        <button\n          type=\"button\"\n          [attr.aria-label]=\"datepicker.nextButtonLabel\"\n          class=\"datepicker-next-button\"\n          [disabled]=\"datepicker._nextBtnDisabled\"\n          (click)=\"datepicker._handleNextButtonClick()\"\n        ></button>\n      </div>\n    </div>\n    <div class=\"datepicker-view\" [ngSwitch]=\"datepicker._currentView\">\n      <mdb-datepicker-day-view\n        *ngSwitchCase=\"'days'\"\n        [(activeDate)]=\"datepicker._activeDate\"\n        [selectedDate]=\"datepicker._selectedDate\"\n        [startDay]=\"datepicker.startDay\"\n        [options]=\"datepicker.options\"\n        [minDate]=\"datepicker.minDate\"\n        [maxDate]=\"datepicker.maxDate\"\n        [filter]=\"datepicker.filter\"\n        (dateSelected)=\"onDateSelect($event)\"\n      ></mdb-datepicker-day-view>\n      <mdb-datepicker-year-view\n        *ngSwitchCase=\"'years'\"\n        [(activeDate)]=\"datepicker._activeDate\"\n        [minDate]=\"datepicker.minDate\"\n        [maxDate]=\"datepicker.maxDate\"\n        [selectedYear]=\"datepicker._selectedYear\"\n        (yearSelected)=\"onYearSelect($event)\"\n      ></mdb-datepicker-year-view>\n      <mdb-datepicker-month-view\n        *ngSwitchCase=\"'months'\"\n        [(activeDate)]=\"datepicker._activeDate\"\n        [selectedMonth]=\"datepicker._selectedMonth\"\n        [selectedYear]=\"datepicker._selectedYear\"\n        [options]=\"datepicker.options\"\n        [minDate]=\"datepicker.minDate\"\n        [maxDate]=\"datepicker.maxDate\"\n        (monthSelected)=\"onMonthSelect($event)\"\n      ></mdb-datepicker-month-view>\n    </div>\n    <div class=\"datepicker-footer\" *ngIf=\"!datepicker.inline\">\n      <button\n        type=\"button\"\n        [attr.aria-label]=\"datepicker.options.clearBtnLabel\"\n        class=\"datepicker-footer-btn datepicker-clear-btn\"\n        (click)=\"datepicker._handleClearClick()\"\n      >\n        {{ datepicker.options.clearBtnText }}\n      </button>\n      <button\n        type=\"button\"\n        [attr.aria-label]=\"datepicker.options.cancelBtnLabel\"\n        class=\"datepicker-footer-btn datepicker-cancel-btn\"\n        (click)=\"datepicker._handleCancelClick()\"\n      >\n        {{ datepicker.options.cancelBtnText }}\n      </button>\n      <button\n        type=\"button\"\n        [attr.aria-label]=\"datepicker.options.okBtnLabel\"\n        class=\"datepicker-footer-btn datepicker-ok-btn\"\n        (click)=\"datepicker._handleOkClick()\"\n      >\n        {{ datepicker.options.okBtnText }}\n      </button>\n    </div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; } });

class MdbDatepickerComponent {
    constructor(_document, _overlay, _vcr, _renderer, _cdRef) {
        this._document = _document;
        this._overlay = _overlay;
        this._vcr = _vcr;
        this._renderer = _renderer;
        this._cdRef = _cdRef;
        this.defaultOptions = {
            title: 'Select date',
            monthsFull: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ],
            monthsShort: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
            ],
            weekdaysFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            weekdaysNarrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            okBtnText: 'Ok',
            clearBtnText: 'Clear',
            cancelBtnText: 'Cancel',
            okBtnLabel: 'Confirm selection',
            clearBtnLabel: 'Clear selection',
            cancelBtnLabel: 'Cancel selection',
            nextMonthLabel: 'Next month',
            prevMonthLabel: 'Previous month',
            nextYearLabel: 'Next year',
            prevYearLabel: 'Previous year',
            nextMultiYearLabel: 'Next 24 years',
            prevMultiYearLabel: 'Previous 24 years',
            switchToMultiYearViewLabel: 'Choose year and month',
            switchToDayViewLabel: 'Choose date',
        };
        this._disabled = false;
        this._inline = false;
        this.format = 'dd/mm/yyyy';
        this._openOnInputClick = false;
        this.startDay = 0;
        this.startView = 'days';
        this.dateChanged = new EventEmitter();
        this.viewChanged = new EventEmitter();
        this.clearButtonClicked = new EventEmitter();
        this.cancelButtonClicked = new EventEmitter();
        this.confirmButtonClicked = new EventEmitter();
        this.opened = new EventEmitter();
        this.closed = new EventEmitter();
        this._activeDate = new Date();
        this._prevBtnDisabled = false;
        this._nextBtnDisabled = false;
        this._isOpen = false;
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    get inline() {
        return this._inline;
    }
    set inline(value) {
        this._inline = coerceBooleanProperty(value);
    }
    get openOnInputClick() {
        return this._openOnInputClick;
    }
    set openOnInputClick(value) {
        this._openOnInputClick = coerceBooleanProperty(value);
    }
    get activeDay() {
        return getDate(this._activeDate);
    }
    get activeMonth() {
        return getMonth(this._activeDate);
    }
    get activeYear() {
        return getYear(this._activeDate);
    }
    get firstYearInView() {
        return (this.activeYear - getYearsOffset(this._activeDate, YEARS_IN_VIEW, this.minDate, this.maxDate));
    }
    get lastYearInView() {
        return this.firstYearInView + YEARS_IN_VIEW - 1;
    }
    get viewChangeButtonText() {
        if (this._currentView === 'days') {
            return `${this.options.monthsFull[this.activeMonth]} ${this.activeYear}`;
        }
        if (this._currentView === 'years') {
            return `${this.firstYearInView} - ${this.lastYearInView}`;
        }
        if (this._currentView === 'months') {
            return `${this.activeYear}`;
        }
    }
    get viewChangeButtonLabel() {
        if (this._currentView === 'days') {
            return this.options.switchToMultiYearViewLabel;
        }
        else if (this._currentView === 'years' || this._currentView === 'months') {
            return this.options.switchToDayViewLabel;
        }
    }
    get nextButtonLabel() {
        if (this._currentView === 'days') {
            return this.options.nextMonthLabel;
        }
        else if (this._currentView === 'years') {
            return this.options.nextMultiYearLabel;
        }
        else {
            return this.options.nextYearLabel;
        }
    }
    get prevButtonLabel() {
        if (this._currentView === 'days') {
            return this.options.prevMonthLabel;
        }
        else if (this._currentView === 'years') {
            return this.options.prevMultiYearLabel;
        }
        else {
            return this.options.prevYearLabel;
        }
    }
    ngOnInit() {
        this._inputDirective.selectionChange.subscribe((date) => {
            this._applyInputDate(date);
        });
        this.options = this.options
            ? Object.assign(this.defaultOptions, this.options)
            : this.defaultOptions;
        const headerDate = this._selectedDate || this._activeDate;
        this._updateHeaderDate(headerDate);
    }
    _updateHeaderDate(date) {
        const day = getDayNumber(date);
        const dayNumber = getDate(date);
        const month = getMonth(date);
        const options = this.options;
        this._headerDate = `${options.weekdaysShort[day]}, ${options.monthsShort[month]} ${dayNumber}`;
    }
    open() {
        if (this._isOpen) {
            return;
        }
        this._currentView = this.startView;
        this._setInitialDate();
        let overlayRef = this._overlayRef;
        if (!overlayRef) {
            this._portal = new ComponentPortal(MdbDatepickerContentComponent, this._vcr);
            overlayRef = this._overlay.create(this._getOverlayConfig());
            this._overlayRef = overlayRef;
        }
        if (overlayRef && !overlayRef.hasAttached()) {
            this._pickerRef = this._overlayRef.attach(this._portal);
            this._pickerRef.instance.datepicker = this;
            this._listenToOutsideClick();
        }
        if (!this.inline && this._hasVerticalScroll()) {
            this._renderer.setStyle(this._document.body, 'overflow', 'hidden');
            this._renderer.setStyle(this._document.body, 'padding-right', '15px');
        }
        this._isOpen = true;
        this.opened.emit();
        this._cdRef.markForCheck();
    }
    _getOverlayConfig() {
        const inlinePositionStrategy = this._overlay
            .position()
            .flexibleConnectedTo(this._input)
            .withPositions(this._getPositions())
            .withFlexibleDimensions(false);
        const dialogPositionStrategy = this._overlay
            .position()
            .global()
            .centerHorizontally()
            .centerVertically();
        const inlineScrollStrategy = this._overlay.scrollStrategies.reposition();
        const dialogScrollStrategy = this._overlay.scrollStrategies.noop();
        const positionStrategy = this.inline ? inlinePositionStrategy : dialogPositionStrategy;
        const scrollStrategy = this.inline ? inlineScrollStrategy : dialogScrollStrategy;
        const overlayConfig = new OverlayConfig({
            hasBackdrop: this.inline ? false : true,
            backdropClass: 'mdb-backdrop',
            scrollStrategy,
            positionStrategy,
        });
        return overlayConfig;
    }
    _getPositions() {
        return [
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top',
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'bottom',
            },
        ];
    }
    _hasVerticalScroll() {
        return this._document.body.scrollHeight > this._document.documentElement.clientHeight;
    }
    _listenToOutsideClick() {
        merge(this._overlayRef.keydownEvents().pipe(filter((event) => {
            return event.key === 'Escape';
        })), fromEvent(document, 'click').pipe(takeUntil(this.closed), filter((event) => {
            const toggleButton = this._toggle && this._toggle.button.nativeElement;
            const target = event.target;
            const notToggle = toggleButton && target !== toggleButton && !toggleButton.contains(target);
            const notOrigin = target !== this._input;
            const notOverlay = !!this._overlayRef &&
                this._overlayRef.overlayElement &&
                !this._overlayRef.overlayElement.contains(target);
            return notToggle && notOrigin && notOverlay;
        }))).subscribe(() => {
            this.close();
        });
    }
    close() {
        if (!this._isOpen) {
            return;
        }
        this._pickerRef.instance._startHideAnimation();
        if (this._overlayRef.backdropElement) {
            this._renderer.setStyle(this._overlayRef.backdropElement, 'opacity', '0');
        }
        this._pickerRef.instance._hideAnimationDone.pipe(take(1)).subscribe(() => {
            if (this._overlayRef && this._overlayRef.hasAttached()) {
                this._overlayRef.dispose();
                this._overlayRef = null;
                this._isOpen = false;
            }
            if (!this.inline) {
                this._renderer.removeStyle(this._document.body, 'overflow');
                this._renderer.removeStyle(this._document.body, 'padding-right');
            }
            this.closed.emit();
            if (this._toggle) {
                this._toggle.button.nativeElement.focus();
            }
            else {
                this._input.focus();
            }
        });
        this._cdRef.markForCheck();
    }
    toggle() {
        this._isOpen ? this.close() : this.open();
    }
    viewChange() {
        this._currentView = this._currentView === 'days' ? 'years' : 'days';
        this._updateControlsDisabledState();
    }
    _handlePreviousButtonClick() {
        if (this._currentView === 'days') {
            this._previousMonth();
        }
        else if (this._currentView === 'years') {
            this._previousYears();
        }
        else {
            this._previousYear();
        }
        this._updateControlsDisabledState();
    }
    _handleNextButtonClick() {
        if (this._currentView === 'days') {
            this._nextMonth();
        }
        else if (this._currentView === 'years') {
            this._nextYears();
        }
        else {
            this._nextYear();
        }
        this._updateControlsDisabledState();
    }
    _updateControlsDisabledState() {
        if (isNextDateDisabled(this._activeDate, this._currentView, YEARS_IN_VIEW, this.minDate, this.maxDate)) {
            this._nextBtnDisabled = true;
        }
        else {
            this._nextBtnDisabled = false;
        }
        if (isPreviousDateDisabled(this._activeDate, this._currentView, YEARS_IN_VIEW, this.minDate, this.maxDate)) {
            this._prevBtnDisabled = true;
        }
        else {
            this._prevBtnDisabled = false;
        }
    }
    _nextMonth() {
        this._activeDate = addMonths(this._activeDate, 1);
    }
    _previousMonth() {
        this._activeDate = addMonths(this._activeDate, -1);
    }
    _nextYear() {
        this._activeDate = addYears(this._activeDate, 1);
    }
    _previousYear() {
        this._activeDate = addYears(this._activeDate, -1);
    }
    _nextYears() {
        this._activeDate = addYears(this._activeDate, 24);
    }
    _previousYears() {
        this._activeDate = addYears(this._activeDate, -24);
    }
    _handleUserInput(input, emitChanges = true) {
        const delimeters = this._getDelimeters(this.format);
        const date = this._parseDate(input, this.format, delimeters);
        if (isValidDate(date) && !isDateDisabled(date, this.minDate, this.maxDate, this.filter)) {
            this._activeDate = date;
            this._selectedDate = date;
        }
        else {
            this._activeDate = new Date();
            this._selectedDate = null;
            this._selectedMonth = null;
            this._selectedYear = null;
        }
        if (emitChanges) {
            const valueToEmit = isValidDate(date) ? date : null;
            this._inputDirective.onChange(valueToEmit);
        }
    }
    _getDelimeters(format) {
        return format.match(/[^(dmy)]{1,}/g);
    }
    _parseDate(dateString, format, delimeters) {
        let delimeterPattern;
        if (delimeters[0] !== delimeters[1]) {
            delimeterPattern = delimeters[0] + delimeters[1];
        }
        else {
            delimeterPattern = delimeters[0];
        }
        const regExp = new RegExp(`[${delimeterPattern}]`);
        const dateParts = dateString.split(regExp);
        const formatParts = format.split(regExp);
        const isMonthString = format.indexOf('mmm') !== -1;
        const datesArray = [];
        for (let i = 0; i < formatParts.length; i++) {
            if (formatParts[i].indexOf('yy') !== -1) {
                datesArray[0] = { value: dateParts[i], format: formatParts[i] };
            }
            if (formatParts[i].indexOf('m') !== -1) {
                datesArray[1] = { value: dateParts[i], format: formatParts[i] };
            }
            if (formatParts[i].indexOf('d') !== -1 && formatParts[i].length <= 2) {
                datesArray[2] = { value: dateParts[i], format: formatParts[i] };
            }
        }
        let monthsNames;
        if (format.indexOf('mmmm') !== -1) {
            monthsNames = this.options.monthsFull;
        }
        else {
            monthsNames = this.options.monthsShort;
        }
        const year = Number(datesArray[0].value);
        const month = isMonthString
            ? this._getMonthNumberByMonthName(datesArray[1].value, monthsNames)
            : Number(datesArray[1].value) - 1;
        const day = Number(datesArray[2].value);
        const parsedDate = createDate(year, month, day);
        if (month > 11 || month < 0 || day > getDaysInMonth(createDate(year, month, 1)) || day < 1) {
            return getToday();
        }
        return parsedDate;
    }
    _getMonthNumberByMonthName(monthValue, monthLabels) {
        return monthLabels.findIndex((monthLabel) => monthLabel === monthValue);
    }
    _applyInputDate(date) {
        if (!date) {
            this._clearDate();
            return;
        }
        if (isDateDisabled(date, this.minDate, this.maxDate, this.filter)) {
            return;
        }
        this._selectedDate = date;
        this._activeDate = date;
        this._updateHeaderDate(date);
        const dateString = this._formatDate(date);
        this._input.value = dateString;
        this._renderer.addClass(this._input, 'active');
        if (this._pickerRef) {
            this._pickerRef.instance.detectChanges();
        }
        this.dateChanged.emit(this._selectedDate);
    }
    _selectDate(date) {
        if (isDateDisabled(date, this.minDate, this.maxDate, this.filter)) {
            return;
        }
        this._selectedDate = date;
        this._activeDate = date;
        this._updateHeaderDate(date);
        if (this.inline) {
            this._confirmSelection(this._selectedDate);
            this.close();
        }
    }
    _confirmSelection(date) {
        if (date) {
            const dateString = this._formatDate(date);
            this._input.value = dateString;
            this._renderer.addClass(this._input, 'active');
            this._inputDirective.onChange(date);
            this.dateChanged.emit(this._selectedDate);
        }
    }
    _formatDate(date) {
        const d = getDate(date);
        const dd = this._addLeadingZero(getDate(date));
        const ddd = this.options.weekdaysShort[getDayNumber(date)];
        const dddd = this.options.weekdaysFull[getDayNumber(date)];
        const m = getMonth(date) + 1;
        const mm = this._addLeadingZero(getMonth(date) + 1);
        const mmm = this.options.monthsShort[getMonth(date)];
        const mmmm = this.options.monthsFull[getMonth(date)];
        const yy = getYear(date).toString().length === 2 ? getYear(date) : getYear(date).toString().slice(2, 4);
        const yyyy = getYear(date);
        const preformatted = this.format.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g);
        let formatted = '';
        preformatted.forEach((datePart) => {
            switch (datePart) {
                case 'dddd':
                    datePart = datePart.replace(datePart, dddd.toString());
                    break;
                case 'ddd':
                    datePart = datePart.replace(datePart, ddd.toString());
                    break;
                case 'dd':
                    datePart = datePart.replace(datePart, dd.toString());
                    break;
                case 'd':
                    datePart = datePart.replace(datePart, d.toString());
                    break;
                case 'mmmm':
                    datePart = datePart.replace(datePart, mmmm.toString());
                    break;
                case 'mmm':
                    datePart = datePart.replace(datePart, mmm.toString());
                    break;
                case 'mm':
                    datePart = datePart.replace(datePart, mm.toString());
                    break;
                case 'm':
                    datePart = datePart.replace(datePart, m.toString());
                    break;
                case 'yyyy':
                    datePart = datePart.replace(datePart, yyyy.toString());
                    break;
                case 'yy':
                    datePart = datePart.replace(datePart, yy.toString());
                    break;
                default:
            }
            formatted += datePart;
        });
        return formatted;
    }
    _addLeadingZero(value) {
        return parseInt(value, 10) < 10 ? `0${value}` : value;
    }
    _selectYear(year) {
        if (isYearDisabled(year, this.minDate, this.maxDate)) {
            return;
        }
        const daysInMonth = getDaysInMonth(createDate(year, this.activeMonth, 1));
        const day = Math.min(this.activeDay, daysInMonth);
        const newDate = createDate(year, this.activeMonth, day);
        this._activeDate = newDate;
        this._selectedYear = year;
        this._currentView = 'months';
        this._updateHeaderDate(newDate);
        this._updateControlsDisabledState();
    }
    _selectMonth(month) {
        const year = this.activeYear;
        if (isMonthDisabled(month, year, this.minDate, this.maxDate) ||
            isYearDisabled(year, this.minDate, this.maxDate)) {
            return;
        }
        const daysInMonth = getDaysInMonth(createDate(year, month, 1));
        const day = Math.min(this.activeDay, daysInMonth);
        const newDate = createDate(year, month, day);
        this._activeDate = newDate;
        this._selectedMonth = month;
        this._currentView = 'days';
        this._updateHeaderDate(newDate);
        this._updateControlsDisabledState();
    }
    _handleOkClick() {
        this._confirmSelection(this._selectedDate);
        this.close();
    }
    _handleCancelClick() {
        this._selectedDate = null;
        this._selectedMonth = null;
        this._selectedYear = null;
        this.close();
    }
    _handleClearClick() {
        this._clearDate();
        this._inputDirective.onChange(null);
    }
    _clearDate() {
        this._selectedDate = null;
        this._selectedMonth = null;
        this._selectedYear = null;
        this._input.value = '';
        this._renderer.removeClass(this._input, 'active');
        this._setInitialDate();
        this._updateHeaderDate(this._activeDate);
        this._currentView = 'days';
    }
    _setInitialDate() {
        if (this._input.value) {
            this._handleUserInput(this._input.value, false);
        }
        else if (this.startDate) {
            this._activeDate = this.startDate;
        }
        else {
            this._activeDate = new Date();
        }
        this._updateHeaderDate(this._activeDate);
        this._updateControlsDisabledState();
    }
    ngOnDestroy() {
        if (this._overlayRef) {
            this.close();
            this._overlayRef.dispose();
        }
    }
}
MdbDatepickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbDatepickerComponent, deps: [{ token: DOCUMENT }, { token: i1$1.Overlay }, { token: i0.ViewContainerRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MdbDatepickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbDatepickerComponent, selector: "mdb-datepicker", inputs: { disabled: "disabled", inline: "inline", format: "format", filter: "filter", openOnInputClick: "openOnInputClick", options: "options", startDate: "startDate", startDay: "startDay", startView: "startView", minDate: "minDate", maxDate: "maxDate" }, outputs: { dateChanged: "dateChanged", viewChanged: "viewChanged", clearButtonClicked: "clearButtonClicked", cancelButtonClicked: "cancelButtonClicked", confirmButtonClicked: "confirmButtonClicked", opened: "opened", closed: "closed" }, exportAs: ["mdbDatepicker"], ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbDatepickerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mdb-datepicker',
                    exportAs: 'mdbDatepicker',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Inject,
                        args: [DOCUMENT]
                    }] }, { type: i1$1.Overlay }, { type: i0.ViewContainerRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }];
    }, propDecorators: { disabled: [{
                type: Input
            }], inline: [{
                type: Input
            }], format: [{
                type: Input
            }], filter: [{
                type: Input
            }], openOnInputClick: [{
                type: Input
            }], options: [{
                type: Input
            }], startDate: [{
                type: Input
            }], startDay: [{
                type: Input
            }], startView: [{
                type: Input
            }], minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], dateChanged: [{
                type: Output
            }], viewChanged: [{
                type: Output
            }], clearButtonClicked: [{
                type: Output
            }], cancelButtonClicked: [{
                type: Output
            }], confirmButtonClicked: [{
                type: Output
            }], opened: [{
                type: Output
            }], closed: [{
                type: Output
            }] } });

const MDB_DATEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
    useExisting: forwardRef(() => MdbDatepickerInputDirective),
    multi: true,
};
class MdbDatepickerInputDirective {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        this.selectionChange = new Subject();
        this.disabled = false;
        this.onChange = () => { };
        this.onTouched = () => { };
    }
    onBlur() {
        this.onTouched();
    }
    ngOnInit() {
        this.mdbDatepicker._input = this._elementRef.nativeElement;
        this.mdbDatepicker._inputDirective = this;
        fromEvent(this._elementRef.nativeElement, 'input').subscribe((event) => {
            this.mdbDatepicker._handleUserInput(event.target.value);
        });
    }
    writeValue(value) {
        Promise.resolve().then(() => {
            this.selectionChange.next(value);
        });
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
}
MdbDatepickerInputDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbDatepickerInputDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
MdbDatepickerInputDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.7", type: MdbDatepickerInputDirective, selector: "input[mdbDatepicker]", inputs: { disabled: "disabled", mdbDatepicker: "mdbDatepicker" }, host: { listeners: { "blur": "onBlur()" } }, providers: [MDB_DATEPICKER_VALUE_ACCESSOR], exportAs: ["mdbDatepickerInput"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbDatepickerInputDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: 'input[mdbDatepicker]',
                    exportAs: 'mdbDatepickerInput',
                    providers: [MDB_DATEPICKER_VALUE_ACCESSOR],
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { disabled: [{
                type: Input
            }], mdbDatepicker: [{
                type: Input
            }], onBlur: [{
                type: HostListener,
                args: ['blur']
            }] } });

class MdbDatepickerToggleComponent {
    constructor() {
        this.disabled = false;
        this.icon = 'far fa-calendar';
    }
    onClick() {
        if (this.disabled) {
            return;
        }
        this.toggle();
    }
    open() {
        this.mdbDatepicker.open();
    }
    close() {
        this.mdbDatepicker.close();
    }
    toggle() {
        this.mdbDatepicker.toggle();
    }
    ngOnInit() {
        this.mdbDatepicker._toggle = this;
    }
}
MdbDatepickerToggleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbDatepickerToggleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MdbDatepickerToggleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbDatepickerToggleComponent, selector: "mdb-datepicker-toggle", inputs: { disabled: "disabled", icon: "icon", mdbDatepicker: "mdbDatepicker" }, host: { listeners: { "click": "onClick()" } }, viewQueries: [{ propertyName: "button", first: true, predicate: ["button"], descendants: true, static: true }], ngImport: i0, template: "<button type=\"button\" [disabled]=\"disabled\" #button class=\"datepicker-toggle-button\">\n  <i class=\"{{ icon }} datepicker-toggle-icon\"></i>\n</button>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbDatepickerToggleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-datepicker-toggle', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<button type=\"button\" [disabled]=\"disabled\" #button class=\"datepicker-toggle-button\">\n  <i class=\"{{ icon }} datepicker-toggle-icon\"></i>\n</button>\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { button: [{
                type: ViewChild,
                args: ['button', { static: true }]
            }], disabled: [{
                type: Input
            }], icon: [{
                type: Input
            }], mdbDatepicker: [{
                type: Input
            }], onClick: [{
                type: HostListener,
                args: ['click']
            }] } });

class MdbDatepickerModule {
}
MdbDatepickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbDatepickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbDatepickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbDatepickerModule, declarations: [MdbDatepickerComponent,
        MdbDatepickerContentComponent,
        MdbDatepickerInputDirective,
        MdbDatepickerToggleComponent,
        MdbDatepickerDayViewComponent,
        MdbDatepickerMonthViewComponent,
        MdbDatepickerYearViewComponent], imports: [CommonModule, OverlayModule, A11yModule], exports: [MdbDatepickerComponent,
        MdbDatepickerContentComponent,
        MdbDatepickerInputDirective,
        MdbDatepickerToggleComponent,
        MdbDatepickerDayViewComponent,
        MdbDatepickerMonthViewComponent,
        MdbDatepickerYearViewComponent] });
MdbDatepickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbDatepickerModule, imports: [[CommonModule, OverlayModule, A11yModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbDatepickerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, OverlayModule, A11yModule],
                    declarations: [
                        MdbDatepickerComponent,
                        MdbDatepickerContentComponent,
                        MdbDatepickerInputDirective,
                        MdbDatepickerToggleComponent,
                        MdbDatepickerDayViewComponent,
                        MdbDatepickerMonthViewComponent,
                        MdbDatepickerYearViewComponent,
                    ],
                    exports: [
                        MdbDatepickerComponent,
                        MdbDatepickerContentComponent,
                        MdbDatepickerInputDirective,
                        MdbDatepickerToggleComponent,
                        MdbDatepickerDayViewComponent,
                        MdbDatepickerMonthViewComponent,
                        MdbDatepickerYearViewComponent,
                    ],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MdbDatepickerComponent, MdbDatepickerContentComponent, MdbDatepickerDayViewComponent, MdbDatepickerInputDirective, MdbDatepickerModule, MdbDatepickerMonthViewComponent, MdbDatepickerToggleComponent, MdbDatepickerYearViewComponent };
//# sourceMappingURL=mdb-angular-ui-kit-datepicker.mjs.map
