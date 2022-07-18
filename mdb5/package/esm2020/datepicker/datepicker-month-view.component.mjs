import { DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, SPACE, UP_ARROW, } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import { MONTHS_IN_ROW, YEARS_IN_VIEW } from './datepicker-const';
import { addMonths, addYears, areDatesInSameView, getMonth, getToday, getYear, isMonthDisabled, } from './datepicker-utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class MdbDatepickerMonthViewComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1tb250aC12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9kYXRlcGlja2VyL2RhdGVwaWNrZXItbW9udGgtdmlldy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvZGF0ZXBpY2tlci9kYXRlcGlja2VyLW1vbnRoLXZpZXcuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFVBQVUsRUFDVixHQUFHLEVBQ0gsS0FBSyxFQUNMLElBQUksRUFDSixVQUFVLEVBQ1YsU0FBUyxFQUNULE9BQU8sRUFDUCxXQUFXLEVBQ1gsS0FBSyxFQUNMLFFBQVEsR0FDVCxNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUVULFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUNOLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xFLE9BQU8sRUFDTCxTQUFTLEVBQ1QsUUFBUSxFQUNSLGtCQUFrQixFQUNsQixRQUFRLEVBQ1IsUUFBUSxFQUNSLE9BQU8sRUFDUCxlQUFlLEdBQ2hCLE1BQU0sb0JBQW9CLENBQUM7OztBQU81QixNQUFNLE9BQU8sK0JBQStCO0lBTDVDO1FBdUNZLGtCQUFhLEdBQXlCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDekQscUJBQWdCLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUM7UUFJNUQsbUJBQWMsR0FBRyxLQUFLLENBQUM7S0E2RmhDO0lBN0hDLElBQ0ksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBQ0QsSUFBSSxVQUFVLENBQUMsSUFBVTtRQUN2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VjtRQUVELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRTVDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQWE7UUFDeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFhO1FBQ3BCLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxLQUFLLENBQUM7SUFDN0MsQ0FBQzs7NEhBbklVLCtCQUErQjtnSEFBL0IsK0JBQStCLHNiQ3RDNUMsdzNCQXlCQTsyRkRhYSwrQkFBK0I7a0JBTDNDLFNBQVM7K0JBQ0UsMkJBQTJCLG1CQUVwQix1QkFBdUIsQ0FBQyxNQUFNOzhCQUdDLGVBQWU7c0JBQTlELFNBQVM7dUJBQUMsaUJBQWlCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQUVyQyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFHRixVQUFVO3NCQURiLEtBQUs7Z0JBd0JHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFFSSxhQUFhO3NCQUF0QixNQUFNO2dCQUNHLGdCQUFnQjtzQkFBekIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERPV05fQVJST1csXG4gIEVORCxcbiAgRU5URVIsXG4gIEhPTUUsXG4gIExFRlRfQVJST1csXG4gIFBBR0VfRE9XTixcbiAgUEFHRV9VUCxcbiAgUklHSFRfQVJST1csXG4gIFNQQUNFLFxuICBVUF9BUlJPVyxcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTU9OVEhTX0lOX1JPVywgWUVBUlNfSU5fVklFVyB9IGZyb20gJy4vZGF0ZXBpY2tlci1jb25zdCc7XG5pbXBvcnQge1xuICBhZGRNb250aHMsXG4gIGFkZFllYXJzLFxuICBhcmVEYXRlc0luU2FtZVZpZXcsXG4gIGdldE1vbnRoLFxuICBnZXRUb2RheSxcbiAgZ2V0WWVhcixcbiAgaXNNb250aERpc2FibGVkLFxufSBmcm9tICcuL2RhdGVwaWNrZXItdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZGItZGF0ZXBpY2tlci1tb250aC12aWV3JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2RhdGVwaWNrZXItbW9udGgtdmlldy5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNZGJEYXRlcGlja2VyTW9udGhWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQFZpZXdDaGlsZCgnbW9udGhzQ29udGFpbmVyJywgeyBzdGF0aWM6IHRydWUgfSkgbW9udGhzQ29udGFpbmVyOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcblxuICBASW5wdXQoKSBvcHRpb25zOiBhbnk7XG4gIEBJbnB1dCgpIG1pbkRhdGU6IG51bGwgfCBEYXRlO1xuICBASW5wdXQoKSBtYXhEYXRlOiBudWxsIHwgRGF0ZTtcblxuICBASW5wdXQoKVxuICBnZXQgYWN0aXZlRGF0ZSgpOiBEYXRlIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlRGF0ZTtcbiAgfVxuICBzZXQgYWN0aXZlRGF0ZShkYXRlOiBEYXRlKSB7XG4gICAgY29uc3Qgb2xkQWN0aXZlRGF0ZSA9IHRoaXMuX2FjdGl2ZURhdGU7XG4gICAgdGhpcy5fYWN0aXZlRGF0ZSA9IGRhdGU7XG4gICAgaWYgKHRoaXMuX2lzSW5pdGlhbGl6ZWQgJiYgZGF0ZSkge1xuICAgICAgaWYgKFxuICAgICAgICAhYXJlRGF0ZXNJblNhbWVWaWV3KFxuICAgICAgICAgIG9sZEFjdGl2ZURhdGUsXG4gICAgICAgICAgZGF0ZSxcbiAgICAgICAgICAnbW9udGhzJyxcbiAgICAgICAgICBZRUFSU19JTl9WSUVXLFxuICAgICAgICAgIHRoaXMubWluRGF0ZSxcbiAgICAgICAgICB0aGlzLm1heERhdGVcbiAgICAgICAgKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMubW9udGhzID0gdGhpcy5fZ2VuZXJhdGVNb250aHNWaWV3KHRoaXMub3B0aW9ucywgTU9OVEhTX0lOX1JPVyk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHByaXZhdGUgX2FjdGl2ZURhdGU6IERhdGU7XG5cbiAgQElucHV0KCkgc2VsZWN0ZWRNb250aDogbnVtYmVyO1xuICBASW5wdXQoKSBzZWxlY3RlZFllYXI6IG51bWJlcjtcblxuICBAT3V0cHV0KCkgbW9udGhTZWxlY3RlZDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBhY3RpdmVEYXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgbW9udGhzOiBhbnk7XG5cbiAgcHJpdmF0ZSBfaXNJbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX2luaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5tb250aHMgPSB0aGlzLl9nZW5lcmF0ZU1vbnRoc1ZpZXcodGhpcy5vcHRpb25zLCBNT05USFNfSU5fUk9XKTtcbiAgICB0aGlzLl9pc0luaXRpYWxpemVkID0gdHJ1ZTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5tb250aHNDb250YWluZXIubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH0sIDApO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2VuZXJhdGVNb250aHNWaWV3KG9wdGlvbnM6IGFueSwgbW9udGhzSW5Sb3c6IG51bWJlcik6IGFueSB7XG4gICAgY29uc3QgbW9udGhzID0gW107XG4gICAgY29uc3QgY3VycmVudE1vbnRoID0gZ2V0TW9udGgoZ2V0VG9kYXkoKSk7XG4gICAgY29uc3QgY3VycmVudFllYXIgPSBnZXRZZWFyKGdldFRvZGF5KCkpO1xuICAgIGNvbnN0IGFjdGl2ZVllYXIgPSBnZXRZZWFyKHRoaXMuYWN0aXZlRGF0ZSk7XG5cbiAgICBsZXQgcm93ID0gW107XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L3ByZWZlci1mb3Itb2ZcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdGlvbnMubW9udGhzU2hvcnQubGVuZ3RoOyBpKyspIHtcbiAgICAgIHJvdy5wdXNoKHtcbiAgICAgICAgbmFtZTogb3B0aW9ucy5tb250aHNTaG9ydFtpXSxcbiAgICAgICAgaW5kZXg6IGksXG4gICAgICAgIHllYXI6IGFjdGl2ZVllYXIsXG4gICAgICAgIGRpc2FibGVkOiBpc01vbnRoRGlzYWJsZWQoaSwgYWN0aXZlWWVhciwgdGhpcy5taW5EYXRlLCB0aGlzLm1heERhdGUpLFxuICAgICAgICBjdXJyZW50OiBpID09PSBjdXJyZW50TW9udGggJiYgYWN0aXZlWWVhciA9PT0gY3VycmVudFllYXIsXG4gICAgICAgIGxhYmVsOiBgJHtvcHRpb25zLm1vbnRoc1Nob3J0W2ldfSwgJHthY3RpdmVZZWFyfWAsXG4gICAgICB9KTtcblxuICAgICAgaWYgKHJvdy5sZW5ndGggPT09IG1vbnRoc0luUm93KSB7XG4gICAgICAgIGNvbnN0IG1vbnRoc1JvdyA9IHJvdztcbiAgICAgICAgbW9udGhzLnB1c2gobW9udGhzUm93KTtcbiAgICAgICAgcm93ID0gW107XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1vbnRocztcbiAgfVxuXG4gIF9oYW5kbGVNb250aHNWaWV3S2V5ZG93bihldmVudDogYW55KTogdm9pZCB7XG4gICAgY29uc3QgaXNSVEwgPSBmYWxzZTtcblxuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgY2FzZSBMRUZUX0FSUk9XOlxuICAgICAgICB0aGlzLmFjdGl2ZURhdGUgPSBhZGRNb250aHModGhpcy5hY3RpdmVEYXRlLCBpc1JUTCA/IDEgOiAtMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBSSUdIVF9BUlJPVzpcbiAgICAgICAgdGhpcy5hY3RpdmVEYXRlID0gYWRkTW9udGhzKHRoaXMuYWN0aXZlRGF0ZSwgaXNSVEwgPyAtMSA6IDEpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVVBfQVJST1c6XG4gICAgICAgIHRoaXMuYWN0aXZlRGF0ZSA9IGFkZE1vbnRocyh0aGlzLmFjdGl2ZURhdGUsIC00KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIERPV05fQVJST1c6XG4gICAgICAgIHRoaXMuYWN0aXZlRGF0ZSA9IGFkZE1vbnRocyh0aGlzLmFjdGl2ZURhdGUsIDQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgSE9NRTpcbiAgICAgICAgdGhpcy5hY3RpdmVEYXRlID0gYWRkTW9udGhzKHRoaXMuYWN0aXZlRGF0ZSwgLWdldE1vbnRoKHRoaXMuYWN0aXZlRGF0ZSkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRU5EOlxuICAgICAgICB0aGlzLmFjdGl2ZURhdGUgPSBhZGRNb250aHModGhpcy5hY3RpdmVEYXRlLCAxMSAtIGdldE1vbnRoKHRoaXMuYWN0aXZlRGF0ZSkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgUEFHRV9VUDpcbiAgICAgICAgdGhpcy5hY3RpdmVEYXRlID0gYWRkWWVhcnModGhpcy5hY3RpdmVEYXRlLCAtMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQQUdFX0RPV046XG4gICAgICAgIHRoaXMuYWN0aXZlRGF0ZSA9IGFkZFllYXJzKHRoaXMuYWN0aXZlRGF0ZSwgMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBFTlRFUjpcbiAgICAgIGNhc2UgU1BBQ0U6XG4gICAgICAgIGNvbnN0IGFjdGl2ZU1vbnRoID0gZ2V0TW9udGgodGhpcy5hY3RpdmVEYXRlKTtcbiAgICAgICAgdGhpcy5fc2VsZWN0TW9udGgoYWN0aXZlTW9udGgpO1xuICAgICAgICByZXR1cm47XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5hY3RpdmVEYXRlQ2hhbmdlLmVtaXQodGhpcy5hY3RpdmVEYXRlKTtcblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICBfc2VsZWN0TW9udGgobW9udGg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMubW9udGhTZWxlY3RlZC5lbWl0KG1vbnRoKTtcbiAgfVxuXG4gIGlzQWN0aXZlKGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZ2V0TW9udGgodGhpcy5hY3RpdmVEYXRlKSA9PT0gaW5kZXg7XG4gIH1cbn1cbiIsIjx0YWJsZSBjbGFzcz1cImRhdGVwaWNrZXItdGFibGVcIj5cbiAgPHRib2R5XG4gICAgI21vbnRoc0NvbnRhaW5lclxuICAgIGNsYXNzPVwiZGF0ZXBpY2tlci10YWJsZS1ib2R5XCJcbiAgICAoa2V5ZG93bik9XCJfaGFuZGxlTW9udGhzVmlld0tleWRvd24oJGV2ZW50KVwiXG4gICAgW3RhYmluZGV4XT1cIjBcIlxuICA+XG4gICAgPHRyICpuZ0Zvcj1cImxldCBtb250aHNSb3cgb2YgbW9udGhzXCI+XG4gICAgICA8dGRcbiAgICAgICAgY2xhc3M9XCJkYXRlcGlja2VyLWNlbGwgZGF0ZXBpY2tlci1sYXJnZS1jZWxsIGRhdGVwaWNrZXItbW9udGgtY2VsbFwiXG4gICAgICAgIFtjbGFzcy5zZWxlY3RlZF09XCJtb250aC5pbmRleCA9PT0gc2VsZWN0ZWRNb250aCAmJiBtb250aC55ZWFyID09PSBzZWxlY3RlZFllYXJcIlxuICAgICAgICBbY2xhc3MuZm9jdXNlZF09XCJpc0FjdGl2ZShtb250aC5pbmRleClcIlxuICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwibW9udGguZGlzYWJsZWRcIlxuICAgICAgICBbY2xhc3MuY3VycmVudF09XCJtb250aC5jdXJyZW50XCJcbiAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJtb250aC5sYWJlbFwiXG4gICAgICAgICpuZ0Zvcj1cImxldCBtb250aCBvZiBtb250aHNSb3dcIlxuICAgICAgICAoY2xpY2spPVwiX3NlbGVjdE1vbnRoKG1vbnRoLmluZGV4KTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCJcbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItY2VsbC1jb250ZW50IGRhdGVwaWNrZXItbGFyZ2UtY2VsbC1jb250ZW50XCI+XG4gICAgICAgICAge3sgbW9udGgubmFtZSB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvdGQ+XG4gICAgPC90cj5cbiAgPC90Ym9keT5cbjwvdGFibGU+XG4iXX0=