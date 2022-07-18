import { DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, SPACE, UP_ARROW, } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, ViewChild, } from '@angular/core';
import { YEARS_IN_VIEW } from './datepicker-const';
import { addDays, addMonths, areDatesInSameView, createDate, getDate, getDaysInMonth, getFirstDayOfWeek, getMonth, getToday, getYear, isDateDisabled, isSameDate, } from './datepicker-utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class MdbDatepickerDayViewComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1kYXktdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvZGF0ZXBpY2tlci9kYXRlcGlja2VyLWRheS12aWV3LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9kYXRlcGlja2VyL2RhdGVwaWNrZXItZGF5LXZpZXcuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFVBQVUsRUFDVixHQUFHLEVBQ0gsS0FBSyxFQUNMLElBQUksRUFDSixVQUFVLEVBQ1YsU0FBUyxFQUNULE9BQU8sRUFDUCxXQUFXLEVBQ1gsS0FBSyxFQUNMLFFBQVEsR0FDVCxNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULEtBQUssRUFFTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFNBQVMsR0FFVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbkQsT0FBTyxFQUNMLE9BQU8sRUFDUCxTQUFTLEVBQ1Qsa0JBQWtCLEVBQ2xCLFVBQVUsRUFDVixPQUFPLEVBQ1AsY0FBYyxFQUNkLGlCQUFpQixFQUNqQixRQUFRLEVBQ1IsUUFBUSxFQUNSLE9BQU8sRUFDUCxjQUFjLEVBQ2QsVUFBVSxHQUNYLE1BQU0sb0JBQW9CLENBQUM7OztBQU81QixNQUFNLE9BQU8sNkJBQTZCO0lBTDFDO1FBaUNZLGlCQUFZLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdEQscUJBQWdCLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUM7UUFJNUQsbUJBQWMsR0FBRyxLQUFLLENBQUM7S0F1SmhDO0lBL0tDLElBQ0ksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMx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SSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDekMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixPQUFPO1lBQ1Q7Z0JBQ0UsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDN0MsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxXQUFXLENBQUMsSUFBVSxFQUFFLFlBQWtCO1FBQ3hDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDakIsT0FBTztTQUNSO1FBQ0QsT0FBTyxVQUFVLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxXQUFXLENBQUMsSUFBVTtRQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDOzswSEF2TFUsNkJBQTZCOzhHQUE3Qiw2QkFBNkIsd2JDM0MxQyx3bENBaUNBOzJGRFVhLDZCQUE2QjtrQkFMekMsU0FBUzsrQkFDRSx5QkFBeUIsbUJBRWxCLHVCQUF1QixDQUFDLE1BQU07OEJBR0EsY0FBYztzQkFBNUQsU0FBUzt1QkFBQyxnQkFBZ0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBRXBDLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFHRixVQUFVO3NCQURiLEtBQUs7Z0JBaUJHLE9BQU87c0JBQWYsS0FBSztnQkFFSSxZQUFZO3NCQUFyQixNQUFNO2dCQUNHLGdCQUFnQjtzQkFBekIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERPV05fQVJST1csXG4gIEVORCxcbiAgRU5URVIsXG4gIEhPTUUsXG4gIExFRlRfQVJST1csXG4gIFBBR0VfRE9XTixcbiAgUEFHRV9VUCxcbiAgUklHSFRfQVJST1csXG4gIFNQQUNFLFxuICBVUF9BUlJPVyxcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBWaWV3Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgWUVBUlNfSU5fVklFVyB9IGZyb20gJy4vZGF0ZXBpY2tlci1jb25zdCc7XG5pbXBvcnQge1xuICBhZGREYXlzLFxuICBhZGRNb250aHMsXG4gIGFyZURhdGVzSW5TYW1lVmlldyxcbiAgY3JlYXRlRGF0ZSxcbiAgZ2V0RGF0ZSxcbiAgZ2V0RGF5c0luTW9udGgsXG4gIGdldEZpcnN0RGF5T2ZXZWVrLFxuICBnZXRNb250aCxcbiAgZ2V0VG9kYXksXG4gIGdldFllYXIsXG4gIGlzRGF0ZURpc2FibGVkLFxuICBpc1NhbWVEYXRlLFxufSBmcm9tICcuL2RhdGVwaWNrZXItdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZGItZGF0ZXBpY2tlci1kYXktdmlldycsXG4gIHRlbXBsYXRlVXJsOiAnLi9kYXRlcGlja2VyLWRheS12aWV3LmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1kYkRhdGVwaWNrZXJEYXlWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQFZpZXdDaGlsZCgnZGF0ZXNDb250YWluZXInLCB7IHN0YXRpYzogdHJ1ZSB9KSBkYXRlc0NvbnRhaW5lcjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG5cbiAgQElucHV0KCkgc2VsZWN0ZWREYXRlOiBEYXRlO1xuICBASW5wdXQoKSBtaW5EYXRlOiBudWxsIHwgRGF0ZTtcbiAgQElucHV0KCkgbWF4RGF0ZTogbnVsbCB8IERhdGU7XG4gIEBJbnB1dCgpIGZpbHRlcjogKGRhdGU6IERhdGUpID0+IGJvb2xlYW47XG4gIEBJbnB1dCgpIHN0YXJ0RGF5OiBudW1iZXI7XG5cbiAgQElucHV0KClcbiAgZ2V0IGFjdGl2ZURhdGUoKTogRGF0ZSB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZURhdGU7XG4gIH1cbiAgc2V0IGFjdGl2ZURhdGUoZGF0ZTogRGF0ZSkge1xuICAgIGNvbnN0IG9sZEFjdGl2ZURhdGUgPSB0aGlzLl9hY3RpdmVEYXRlO1xuICAgIHRoaXMuX2FjdGl2ZURhdGUgPSBkYXRlO1xuICAgIGlmICh0aGlzLl9pc0luaXRpYWxpemVkKSB7XG4gICAgICBpZiAoXG4gICAgICAgICFhcmVEYXRlc0luU2FtZVZpZXcob2xkQWN0aXZlRGF0ZSwgZGF0ZSwgJ2RheXMnLCBZRUFSU19JTl9WSUVXLCB0aGlzLm1pbkRhdGUsIHRoaXMubWF4RGF0ZSlcbiAgICAgICkge1xuICAgICAgICB0aGlzLmRhdGVzID0gdGhpcy5fZ2VuZXJhdGVEYXlWaWV3KGRhdGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBwcml2YXRlIF9hY3RpdmVEYXRlOiBEYXRlO1xuXG4gIEBJbnB1dCgpIG9wdGlvbnM6IGFueTtcblxuICBAT3V0cHV0KCkgZGF0ZVNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8RGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBhY3RpdmVEYXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgZGF0ZXM6IGFueTtcbiAgd2Vla2RheXM6IHN0cmluZ1tdO1xuICBwcml2YXRlIF9pc0luaXRpYWxpemVkID0gZmFsc2U7XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBwcml2YXRlIGluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5kYXRlcyA9IHRoaXMuX2dlbmVyYXRlRGF5Vmlldyh0aGlzLmFjdGl2ZURhdGUpO1xuICAgIHRoaXMud2Vla2RheXMgPSB0aGlzLl9nZXRXZWVrZGF5cyh0aGlzLnN0YXJ0RGF5KTtcbiAgICB0aGlzLl9pc0luaXRpYWxpemVkID0gdHJ1ZTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5kYXRlc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfSwgMCk7XG4gIH1cblxuICBwcml2YXRlIF9nZW5lcmF0ZURheVZpZXcoYWN0aXZlRGF0ZTogRGF0ZSk6IGFueSB7XG4gICAgY29uc3QgZGF0ZXMgPSBbXTtcblxuICAgIGNvbnN0IG1vbnRoID0gZ2V0TW9udGgoYWN0aXZlRGF0ZSk7XG4gICAgY29uc3QgcHJldmlvdXNNb250aCA9IGdldE1vbnRoKGFkZE1vbnRocyhhY3RpdmVEYXRlLCAtMSkpO1xuICAgIGNvbnN0IG5leHRNb250aCA9IGdldE1vbnRoKGFkZE1vbnRocyhhY3RpdmVEYXRlLCAxKSk7XG4gICAgY29uc3QgeWVhciA9IGdldFllYXIoYWN0aXZlRGF0ZSk7XG5cbiAgICBjb25zdCBmaXJzdERheSA9IGdldEZpcnN0RGF5T2ZXZWVrKHllYXIsIG1vbnRoLCB0aGlzLnN0YXJ0RGF5KTtcbiAgICBjb25zdCBkYXlzSW5Nb250aCA9IGdldERheXNJbk1vbnRoKGFjdGl2ZURhdGUpO1xuICAgIGNvbnN0IGRheXNJblByZXZpb3VzTW9udGggPSBnZXREYXlzSW5Nb250aChhZGRNb250aHMoYWN0aXZlRGF0ZSwgLTEpKTtcbiAgICBjb25zdCBkYXlzSW5XZWVrID0gNztcblxuICAgIGxldCBkYXlOdW1iZXIgPSAxO1xuICAgIGxldCBpc0N1cnJlbnRNb250aCA9IGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgZGF5c0luV2VlazsgaSsrKSB7XG4gICAgICBjb25zdCB3ZWVrID0gW107XG4gICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAvLyBGaXJzdCB3ZWVrXG4gICAgICAgIGNvbnN0IHByZXZpb3VzTW9udGhEYXkgPSBkYXlzSW5QcmV2aW91c01vbnRoIC0gZmlyc3REYXkgKyAxO1xuICAgICAgICAvLyBQcmV2aW91cyBtb250aFxuICAgICAgICBmb3IgKGxldCBqID0gcHJldmlvdXNNb250aERheTsgaiA8PSBkYXlzSW5QcmV2aW91c01vbnRoOyBqKyspIHtcbiAgICAgICAgICBjb25zdCBkYXRlID0gY3JlYXRlRGF0ZSh5ZWFyLCBwcmV2aW91c01vbnRoLCBqKTtcblxuICAgICAgICAgIHdlZWsucHVzaCh7XG4gICAgICAgICAgICBkYXRlLFxuICAgICAgICAgICAgY3VycmVudE1vbnRoOiBpc0N1cnJlbnRNb250aCxcbiAgICAgICAgICAgIGlzVG9kYXk6IGlzU2FtZURhdGUoZGF0ZSwgZ2V0VG9kYXkoKSksXG4gICAgICAgICAgICBkYXlOdW1iZXI6IGdldERhdGUoZGF0ZSksXG4gICAgICAgICAgICBkaXNhYmxlZDogaXNEYXRlRGlzYWJsZWQoZGF0ZSwgdGhpcy5taW5EYXRlLCB0aGlzLm1heERhdGUsIHRoaXMuZmlsdGVyKSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlzQ3VycmVudE1vbnRoID0gdHJ1ZTtcbiAgICAgICAgLy8gQ3VycmVudCBtb250aFxuICAgICAgICBjb25zdCBkYXlzTGVmdCA9IGRheXNJbldlZWsgLSB3ZWVrLmxlbmd0aDtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBkYXlzTGVmdDsgaisrKSB7XG4gICAgICAgICAgY29uc3QgZGF0ZSA9IGNyZWF0ZURhdGUoeWVhciwgbW9udGgsIGRheU51bWJlcik7XG5cbiAgICAgICAgICB3ZWVrLnB1c2goe1xuICAgICAgICAgICAgZGF0ZSxcbiAgICAgICAgICAgIGN1cnJlbnRNb250aDogaXNDdXJyZW50TW9udGgsXG4gICAgICAgICAgICBpc1RvZGF5OiBpc1NhbWVEYXRlKGRhdGUsIGdldFRvZGF5KCkpLFxuICAgICAgICAgICAgZGF5TnVtYmVyOiBnZXREYXRlKGRhdGUpLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IGlzRGF0ZURpc2FibGVkKGRhdGUsIHRoaXMubWluRGF0ZSwgdGhpcy5tYXhEYXRlLCB0aGlzLmZpbHRlciksXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZGF5TnVtYmVyKys7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFJlc3Qgb2YgdGhlIHdlZWtzXG4gICAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgODsgaisrKSB7XG4gICAgICAgICAgaWYgKGRheU51bWJlciA+IGRheXNJbk1vbnRoKSB7XG4gICAgICAgICAgICAvLyBOZXh0IG1vbnRoXG4gICAgICAgICAgICBkYXlOdW1iZXIgPSAxO1xuICAgICAgICAgICAgaXNDdXJyZW50TW9udGggPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgZGF0ZSA9IGNyZWF0ZURhdGUoeWVhciwgaXNDdXJyZW50TW9udGggPyBtb250aCA6IG5leHRNb250aCwgZGF5TnVtYmVyKTtcblxuICAgICAgICAgIHdlZWsucHVzaCh7XG4gICAgICAgICAgICBkYXRlLFxuICAgICAgICAgICAgY3VycmVudE1vbnRoOiBpc0N1cnJlbnRNb250aCxcbiAgICAgICAgICAgIGlzVG9kYXk6IGlzU2FtZURhdGUoZGF0ZSwgZ2V0VG9kYXkoKSksXG4gICAgICAgICAgICBkYXlOdW1iZXI6IGdldERhdGUoZGF0ZSksXG4gICAgICAgICAgICBkaXNhYmxlZDogaXNEYXRlRGlzYWJsZWQoZGF0ZSwgdGhpcy5taW5EYXRlLCB0aGlzLm1heERhdGUsIHRoaXMuZmlsdGVyKSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBkYXlOdW1iZXIrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZGF0ZXMucHVzaCh3ZWVrKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0ZXM7XG4gIH1cblxuICBwcml2YXRlIF9nZXRXZWVrZGF5cyhzdGFydERheTogbnVtYmVyKTogc3RyaW5nW10ge1xuICAgIGNvbnN0IHdlZWtkYXlzID0gdGhpcy5vcHRpb25zLndlZWtkYXlzTmFycm93O1xuICAgIGNvbnN0IHNvcnRlZFdlZWtkYXlzID0gd2Vla2RheXMuc2xpY2Uoc3RhcnREYXkpLmNvbmNhdCh3ZWVrZGF5cy5zbGljZSgwLCBzdGFydERheSkpO1xuXG4gICAgcmV0dXJuIHN0YXJ0RGF5ICE9PSAwID8gc29ydGVkV2Vla2RheXMgOiB3ZWVrZGF5cztcbiAgfVxuXG4gIF9oYW5kbGVEYXlzVmlld0tleWRvd24oZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGlzUlRMID0gZmFsc2U7XG5cbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgIGNhc2UgTEVGVF9BUlJPVzpcbiAgICAgICAgdGhpcy5hY3RpdmVEYXRlID0gYWRkRGF5cyh0aGlzLmFjdGl2ZURhdGUsIGlzUlRMID8gMSA6IC0xKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFJJR0hUX0FSUk9XOlxuICAgICAgICB0aGlzLmFjdGl2ZURhdGUgPSBhZGREYXlzKHRoaXMuYWN0aXZlRGF0ZSwgaXNSVEwgPyAtMSA6IDEpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVVBfQVJST1c6XG4gICAgICAgIHRoaXMuYWN0aXZlRGF0ZSA9IGFkZERheXModGhpcy5hY3RpdmVEYXRlLCAtNyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBET1dOX0FSUk9XOlxuICAgICAgICB0aGlzLmFjdGl2ZURhdGUgPSBhZGREYXlzKHRoaXMuYWN0aXZlRGF0ZSwgNyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBIT01FOlxuICAgICAgICB0aGlzLmFjdGl2ZURhdGUgPSBhZGREYXlzKHRoaXMuYWN0aXZlRGF0ZSwgMSAtIGdldERhdGUodGhpcy5hY3RpdmVEYXRlKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBFTkQ6XG4gICAgICAgIHRoaXMuYWN0aXZlRGF0ZSA9IGFkZERheXMoXG4gICAgICAgICAgdGhpcy5hY3RpdmVEYXRlLFxuICAgICAgICAgIGdldERheXNJbk1vbnRoKHRoaXMuYWN0aXZlRGF0ZSkgLSBnZXREYXRlKHRoaXMuYWN0aXZlRGF0ZSlcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFBBR0VfVVA6XG4gICAgICAgIHRoaXMuYWN0aXZlRGF0ZSA9IGFkZE1vbnRocyh0aGlzLl9hY3RpdmVEYXRlLCAtMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQQUdFX0RPV046XG4gICAgICAgIHRoaXMuYWN0aXZlRGF0ZSA9IGFkZE1vbnRocyh0aGlzLl9hY3RpdmVEYXRlLCAxKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEVOVEVSOlxuICAgICAgY2FzZSBTUEFDRTpcbiAgICAgICAgdGhpcy5kYXRlU2VsZWN0ZWQuZW1pdCh0aGlzLl9hY3RpdmVEYXRlKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuYWN0aXZlRGF0ZUNoYW5nZS5lbWl0KHRoaXMuX2FjdGl2ZURhdGUpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICBfaXNTYW1lRGF0ZShkYXRlOiBEYXRlLCBzZWxlY3RlZERhdGU6IERhdGUpOiBib29sZWFuIHtcbiAgICBpZiAoIXNlbGVjdGVkRGF0ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gaXNTYW1lRGF0ZShkYXRlLCBzZWxlY3RlZERhdGUpO1xuICB9XG5cbiAgX3NlbGVjdERhdGUoZGF0ZTogRGF0ZSk6IHZvaWQge1xuICAgIHRoaXMuZGF0ZVNlbGVjdGVkLmVtaXQoZGF0ZSk7XG4gIH1cbn1cbiIsIjx0YWJsZSBjbGFzcz1cImRhdGVwaWNrZXItdGFibGVcIj5cbiAgPHRoZWFkPlxuICAgIDx0cj5cbiAgICAgIDx0aCBjbGFzcz1cImRhdGVwaWNrZXItZGF5LWhlYWRpbmdcIiBzY29wZT1cImNvbFwiICpuZ0Zvcj1cImxldCBkYXkgb2Ygd2Vla2RheXNcIj5cbiAgICAgICAge3sgZGF5IH19XG4gICAgICA8L3RoPlxuICAgIDwvdHI+XG4gIDwvdGhlYWQ+XG4gIDx0Ym9keVxuICAgICNkYXRlc0NvbnRhaW5lclxuICAgIGNsYXNzPVwiZGF0ZXBpY2tlci10YWJsZS1ib2R5XCJcbiAgICAoa2V5ZG93bik9XCJfaGFuZGxlRGF5c1ZpZXdLZXlkb3duKCRldmVudClcIlxuICAgIFt0YWJpbmRleF09XCIwXCJcbiAgPlxuICAgIDx0ciAqbmdGb3I9XCJsZXQgZGF0ZSBvZiBkYXRlc1wiPlxuICAgICAgPHRkXG4gICAgICAgIGNsYXNzPVwiZGF0ZXBpY2tlci1jZWxsIGRhdGVwaWNrZXItc21hbGwtY2VsbCBkYXRlcGlja2VyLWRheS1jZWxsXCJcbiAgICAgICAgW2NsYXNzLnNlbGVjdGVkXT1cIl9pc1NhbWVEYXRlKGRheS5kYXRlLCBzZWxlY3RlZERhdGUpXCJcbiAgICAgICAgW2NsYXNzLmZvY3VzZWRdPVwiX2lzU2FtZURhdGUoZGF5LmRhdGUsIGFjdGl2ZURhdGUpXCJcbiAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImRheS5kaXNhYmxlZCB8fCAhZGF5LmN1cnJlbnRNb250aFwiXG4gICAgICAgIFtjbGFzcy5jdXJyZW50XT1cImRheS5pc1RvZGF5XCJcbiAgICAgICAgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJkYXkuaXNTZWxlY3RlZFwiXG4gICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiZGF5LmRhdGVcIlxuICAgICAgICAqbmdGb3I9XCJsZXQgZGF5IG9mIGRhdGVcIlxuICAgICAgICAoY2xpY2spPVwiX3NlbGVjdERhdGUoZGF5LmRhdGUpOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIlxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci1jZWxsLWNvbnRlbnQgZGF0ZXBpY2tlci1zbWFsbC1jZWxsLWNvbnRlbnRcIiAqbmdJZj1cImRheS5jdXJyZW50TW9udGhcIj5cbiAgICAgICAgICB7eyBkYXkuZGF5TnVtYmVyIH19XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC90ZD5cbiAgICA8L3RyPlxuICA8L3Rib2R5PlxuPC90YWJsZT5cbiJdfQ==