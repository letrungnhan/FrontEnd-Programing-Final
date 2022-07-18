import { DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, SPACE, UP_ARROW, } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import { YEARS_IN_ROW, YEARS_IN_VIEW } from './datepicker-const';
import { addYears, areDatesInSameView, getToday, getYear, getYearsOffset, isYearDisabled, } from './datepicker-utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class MdbDatepickerYearViewComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci15ZWFyLXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L2RhdGVwaWNrZXIvZGF0ZXBpY2tlci15ZWFyLXZpZXcuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L2RhdGVwaWNrZXIvZGF0ZXBpY2tlci15ZWFyLXZpZXcuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFVBQVUsRUFDVixHQUFHLEVBQ0gsS0FBSyxFQUNMLElBQUksRUFDSixVQUFVLEVBQ1YsU0FBUyxFQUNULE9BQU8sRUFDUCxXQUFXLEVBQ1gsS0FBSyxFQUNMLFFBQVEsR0FDVCxNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUVULFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUNOLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2pFLE9BQU8sRUFDTCxRQUFRLEVBQ1Isa0JBQWtCLEVBQ2xCLFFBQVEsRUFDUixPQUFPLEVBQ1AsY0FBYyxFQUNkLGNBQWMsR0FDZixNQUFNLG9CQUFvQixDQUFDOzs7QUFPNUIsTUFBTSxPQUFPLDhCQUE4QjtJQUwzQztRQXlCWSxpQkFBWSxHQUF5QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3hELHFCQUFnQixHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBUzVELG1CQUFjLEdBQUcsS0FBSyxDQUFDO0tBZ0doQztJQTNIQyxJQUNJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQUNELElBQUksVUFBVSxDQUFDLElBQVU7UUFDdkIsTUFBTSxhQUFhLEdB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LENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUU1QyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELFdBQVcsQ0FBQyxJQUFZO1FBQ3RCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxRQUFRLENBQUMsSUFBWTtRQUNuQixPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssSUFBSSxDQUFDO0lBQzVDLENBQUM7OzJIQTdIVSw4QkFBOEI7K0dBQTlCLDhCQUE4QixpWkNyQzNDLHEwQkF5QkE7MkZEWWEsOEJBQThCO2tCQUwxQyxTQUFTOytCQUNFLDBCQUEwQixtQkFFbkIsdUJBQXVCLENBQUMsTUFBTTs4QkFHQSxjQUFjO3NCQUE1RCxTQUFTO3VCQUFDLGdCQUFnQixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFHekMsVUFBVTtzQkFEYixLQUFLO2dCQWlCSSxZQUFZO3NCQUFyQixNQUFNO2dCQUNHLGdCQUFnQjtzQkFBekIsTUFBTTtnQkFFRSxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRE9XTl9BUlJPVyxcbiAgRU5ELFxuICBFTlRFUixcbiAgSE9NRSxcbiAgTEVGVF9BUlJPVyxcbiAgUEFHRV9ET1dOLFxuICBQQUdFX1VQLFxuICBSSUdIVF9BUlJPVyxcbiAgU1BBQ0UsXG4gIFVQX0FSUk9XLFxufSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBZRUFSU19JTl9ST1csIFlFQVJTX0lOX1ZJRVcgfSBmcm9tICcuL2RhdGVwaWNrZXItY29uc3QnO1xuaW1wb3J0IHtcbiAgYWRkWWVhcnMsXG4gIGFyZURhdGVzSW5TYW1lVmlldyxcbiAgZ2V0VG9kYXksXG4gIGdldFllYXIsXG4gIGdldFllYXJzT2Zmc2V0LFxuICBpc1llYXJEaXNhYmxlZCxcbn0gZnJvbSAnLi9kYXRlcGlja2VyLXV0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLWRhdGVwaWNrZXIteWVhci12aWV3JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2RhdGVwaWNrZXIteWVhci12aWV3LmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1kYkRhdGVwaWNrZXJZZWFyVmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBWaWV3Q2hpbGQoJ3llYXJzQ29udGFpbmVyJywgeyBzdGF0aWM6IHRydWUgfSkgeWVhcnNDb250YWluZXI6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gIEBJbnB1dCgpXG4gIGdldCBhY3RpdmVEYXRlKCk6IERhdGUge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmVEYXRlO1xuICB9XG4gIHNldCBhY3RpdmVEYXRlKGRhdGU6IERhdGUpIHtcbiAgICBjb25zdCBvbGRBY3RpdmVEYXRlID0gdGhpcy5fYWN0aXZlRGF0ZTtcbiAgICB0aGlzLl9hY3RpdmVEYXRlID0gZGF0ZTtcbiAgICBpZiAodGhpcy5faXNJbml0aWFsaXplZCAmJiBkYXRlKSB7XG4gICAgICBpZiAoXG4gICAgICAgICFhcmVEYXRlc0luU2FtZVZpZXcob2xkQWN0aXZlRGF0ZSwgZGF0ZSwgJ3llYXJzJywgWUVBUlNfSU5fVklFVywgdGhpcy5taW5EYXRlLCB0aGlzLm1heERhdGUpXG4gICAgICApIHtcbiAgICAgICAgdGhpcy55ZWFycyA9IHRoaXMuX2dlbmVyYXRlWWVhcnNWaWV3KGRhdGUsIFlFQVJTX0lOX1ZJRVcsIFlFQVJTX0lOX1JPVyk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHByaXZhdGUgX2FjdGl2ZURhdGU6IERhdGU7XG5cbiAgQE91dHB1dCgpIHllYXJTZWxlY3RlZDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBhY3RpdmVEYXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQElucHV0KCkgbWluRGF0ZTogRGF0ZTtcbiAgQElucHV0KCkgbWF4RGF0ZTogRGF0ZTtcbiAgQElucHV0KCkgc2VsZWN0ZWRZZWFyOiBudW1iZXI7XG4gIEBJbnB1dCgpIG9wdGlvbnM6IGFueTtcblxuICB5ZWFyczogYW55O1xuXG4gIHByaXZhdGUgX2lzSW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnllYXJzID0gdGhpcy5fZ2VuZXJhdGVZZWFyc1ZpZXcodGhpcy5fYWN0aXZlRGF0ZSwgWUVBUlNfSU5fVklFVywgWUVBUlNfSU5fUk9XKTtcbiAgICB0aGlzLl9pc0luaXRpYWxpemVkID0gdHJ1ZTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy55ZWFyc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfSwgMCk7XG4gIH1cblxuICBwcml2YXRlIF9nZW5lcmF0ZVllYXJzVmlldyhkYXRlOiBEYXRlLCB5ZWFyc0luVmlldzogbnVtYmVyLCB5ZWFyc0luUm93OiBudW1iZXIpOiBhbnkge1xuICAgIGNvbnN0IHllYXJzID0gW107XG4gICAgY29uc3QgYWN0aXZlWWVhciA9IGdldFllYXIoZGF0ZSk7XG4gICAgY29uc3QgY3VycmVudFllYXIgPSBnZXRZZWFyKGdldFRvZGF5KCkpO1xuICAgIGNvbnN0IHllYXJzT2Zmc2V0ID0gZ2V0WWVhcnNPZmZzZXQoZGF0ZSwgeWVhcnNJblZpZXcsIHRoaXMubWluRGF0ZSwgdGhpcy5tYXhEYXRlKTtcblxuICAgIGNvbnN0IGZpcnN0WWVhckluVmlldyA9IGFjdGl2ZVllYXIgLSB5ZWFyc09mZnNldDtcblxuICAgIGxldCByb3cgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgeWVhcnNJblZpZXc7IGkrKykge1xuICAgICAgY29uc3QgeWVhciA9IGZpcnN0WWVhckluVmlldyArIGk7XG4gICAgICByb3cucHVzaCh7XG4gICAgICAgIG5hbWU6IHllYXIsXG4gICAgICAgIGN1cnJlbnQ6IGN1cnJlbnRZZWFyID09PSB5ZWFyLFxuICAgICAgICBkaXNhYmxlZDogaXNZZWFyRGlzYWJsZWQoeWVhciwgdGhpcy5taW5EYXRlLCB0aGlzLm1heERhdGUpLFxuICAgICAgfSk7XG5cbiAgICAgIGlmIChyb3cubGVuZ3RoID09PSB5ZWFyc0luUm93KSB7XG4gICAgICAgIGNvbnN0IHllYXJzUm93ID0gcm93O1xuICAgICAgICB5ZWFycy5wdXNoKHllYXJzUm93KTtcbiAgICAgICAgcm93ID0gW107XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHllYXJzO1xuICB9XG5cbiAgX2hhbmRsZVllYXJzVmlld0tleWRvd24oZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGlzUlRMID0gZmFsc2U7XG5cbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgIGNhc2UgTEVGVF9BUlJPVzpcbiAgICAgICAgdGhpcy5fYWN0aXZlRGF0ZSA9IGFkZFllYXJzKHRoaXMuYWN0aXZlRGF0ZSwgaXNSVEwgPyAxIDogLTEpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgUklHSFRfQVJST1c6XG4gICAgICAgIHRoaXMuX2FjdGl2ZURhdGUgPSBhZGRZZWFycyh0aGlzLmFjdGl2ZURhdGUsIGlzUlRMID8gLTEgOiAxKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFVQX0FSUk9XOlxuICAgICAgICB0aGlzLl9hY3RpdmVEYXRlID0gYWRkWWVhcnModGhpcy5hY3RpdmVEYXRlLCAtWUVBUlNfSU5fUk9XKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIERPV05fQVJST1c6XG4gICAgICAgIHRoaXMuX2FjdGl2ZURhdGUgPSBhZGRZZWFycyh0aGlzLmFjdGl2ZURhdGUsIFlFQVJTX0lOX1JPVyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBIT01FOlxuICAgICAgICB0aGlzLl9hY3RpdmVEYXRlID0gYWRkWWVhcnMoXG4gICAgICAgICAgdGhpcy5hY3RpdmVEYXRlLFxuICAgICAgICAgIC1nZXRZZWFyc09mZnNldCh0aGlzLmFjdGl2ZURhdGUsIFlFQVJTX0lOX1ZJRVcsIHRoaXMubWluRGF0ZSwgdGhpcy5tYXhEYXRlKVxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRU5EOlxuICAgICAgICB0aGlzLl9hY3RpdmVEYXRlID0gYWRkWWVhcnMoXG4gICAgICAgICAgdGhpcy5fYWN0aXZlRGF0ZSxcbiAgICAgICAgICBZRUFSU19JTl9WSUVXIC1cbiAgICAgICAgICAgIGdldFllYXJzT2Zmc2V0KHRoaXMuYWN0aXZlRGF0ZSwgWUVBUlNfSU5fVklFVywgdGhpcy5taW5EYXRlLCB0aGlzLm1heERhdGUpIC1cbiAgICAgICAgICAgIDFcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFBBR0VfVVA6XG4gICAgICAgIHRoaXMuX2FjdGl2ZURhdGUgPSBhZGRZZWFycyh0aGlzLmFjdGl2ZURhdGUsIC1ZRUFSU19JTl9WSUVXKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFBBR0VfRE9XTjpcbiAgICAgICAgdGhpcy5fYWN0aXZlRGF0ZSA9IGFkZFllYXJzKHRoaXMuYWN0aXZlRGF0ZSwgWUVBUlNfSU5fVklFVyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBFTlRFUjpcbiAgICAgIGNhc2UgU1BBQ0U6XG4gICAgICAgIGNvbnN0IGFjdGl2ZVllYXIgPSBnZXRZZWFyKHRoaXMuYWN0aXZlRGF0ZSk7XG4gICAgICAgIHRoaXMuX3NlbGVjdFllYXIoYWN0aXZlWWVhcik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmFjdGl2ZURhdGVDaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZURhdGUpO1xuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIF9zZWxlY3RZZWFyKHllYXI6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMueWVhclNlbGVjdGVkLmVtaXQoeWVhcik7XG4gIH1cblxuICBpc0FjdGl2ZSh5ZWFyOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZ2V0WWVhcih0aGlzLl9hY3RpdmVEYXRlKSA9PT0geWVhcjtcbiAgfVxufVxuIiwiPHRhYmxlIGNsYXNzPVwiZGF0ZXBpY2tlci10YWJsZVwiPlxuICA8dGJvZHlcbiAgICAjeWVhcnNDb250YWluZXJcbiAgICBjbGFzcz1cImRhdGVwaWNrZXItdGFibGUtYm9keVwiXG4gICAgKGtleWRvd24pPVwiX2hhbmRsZVllYXJzVmlld0tleWRvd24oJGV2ZW50KVwiXG4gICAgW3RhYmluZGV4XT1cIjBcIlxuICA+XG4gICAgPHRyICpuZ0Zvcj1cImxldCB5ZWFyc1JvdyBvZiB5ZWFyc1wiPlxuICAgICAgPHRkXG4gICAgICAgIGNsYXNzPVwiZGF0ZXBpY2tlci1jZWxsIGRhdGVwaWNrZXItbGFyZ2UtY2VsbCBkYXRlcGlja2VyLXllYXItY2VsbFwiXG4gICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJ5ZWFyLmRpc2FibGVkXCJcbiAgICAgICAgW2NsYXNzLnNlbGVjdGVkXT1cInllYXIubmFtZSA9PT0gc2VsZWN0ZWRZZWFyXCJcbiAgICAgICAgW2NsYXNzLmN1cnJlbnRdPVwieWVhci5jdXJyZW50XCJcbiAgICAgICAgW2NsYXNzLmZvY3VzZWRdPVwiaXNBY3RpdmUoeWVhci5uYW1lKVwiXG4gICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwieWVhci5uYW1lXCJcbiAgICAgICAgKm5nRm9yPVwibGV0IHllYXIgb2YgeWVhcnNSb3dcIlxuICAgICAgICAoY2xpY2spPVwiX3NlbGVjdFllYXIoeWVhci5uYW1lKTsgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCJcbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRhdGVwaWNrZXItY2VsbC1jb250ZW50IGRhdGVwaWNrZXItbGFyZ2UtY2VsbC1jb250ZW50XCI+XG4gICAgICAgICAge3sgeWVhci5uYW1lIH19XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC90ZD5cbiAgICA8L3RyPlxuICA8L3Rib2R5PlxuPC90YWJsZT5cbiJdfQ==