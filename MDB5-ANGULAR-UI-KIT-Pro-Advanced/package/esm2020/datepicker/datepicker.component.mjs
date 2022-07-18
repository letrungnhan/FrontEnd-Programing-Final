import { ChangeDetectionStrategy, Component, Input, EventEmitter, Output, Inject, } from '@angular/core';
import { OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MdbDatepickerContentComponent } from './datepicker-content.component';
import { filter, take, takeUntil } from 'rxjs/operators';
import { fromEvent, merge } from 'rxjs';
import { addMonths, addYears, createDate, getDate, getDayNumber, getDaysInMonth, getMonth, getToday, getYear, getYearsOffset, isDateDisabled, isMonthDisabled, isNextDateDisabled, isPreviousDateDisabled, isValidDate, isYearDisabled, } from './datepicker-utils';
import { DOCUMENT } from '@angular/common';
import { YEARS_IN_VIEW } from './datepicker-const';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
export class MdbDatepickerComponent {
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
MdbDatepickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbDatepickerComponent, deps: [{ token: DOCUMENT }, { token: i1.Overlay }, { token: i0.ViewContainerRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MdbDatepickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbDatepickerComponent, selector: "mdb-datepicker", inputs: { disabled: "disabled", inline: "inline", format: "format", filter: "filter", openOnInputClick: "openOnInputClick", options: "options", startDate: "startDate", startDay: "startDay", startView: "startView", minDate: "minDate", maxDate: "maxDate" }, outputs: { dateChanged: "dateChanged", viewChanged: "viewChanged", clearButtonClicked: "clearButtonClicked", cancelButtonClicked: "cancelButtonClicked", confirmButtonClicked: "confirmButtonClicked", opened: "opened", closed: "closed" }, exportAs: ["mdbDatepicker"], ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbDatepickerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mdb-datepicker',
                    exportAs: 'mdbDatepicker',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i1.Overlay }, { type: i0.ViewContainerRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { disabled: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvZGF0ZXBpY2tlci9kYXRlcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFJVCxLQUFLLEVBQ0wsWUFBWSxFQUNaLE1BQU0sRUFJTixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF1QixhQUFhLEVBQTBCLE1BQU0sc0JBQXNCLENBQUM7QUFDbEcsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3hDLE9BQU8sRUFDTCxTQUFTLEVBQ1QsUUFBUSxFQUNSLFVBQVUsRUFDVixPQUFPLEVBQ1AsWUFBWSxFQUNaLGNBQWMsRUFDZCxRQUFRLEVBQ1IsUUFBUSxFQUNSLE9BQU8sRUFDUCxjQUFjLEVBQ2QsY0FBYyxFQUNkLGVBQWUsRUFDZixrQkFBa0IsRUFDbEIsc0JBQXNCLEVBQ3RCLFdBQVcsRUFDWCxjQUFjLEdBQ2YsTUFBTSxvQkFBb0IsQ0FBQztBQUU1QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRW5ELE9BQU8sRUFBZ0IscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7O0FBVTVFLE1BQU0sT0FBTyxzQkFBc0I7SUFxTGpDLFlBQzRCLFNBQVMsRUFDM0IsUUFBaUIs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eEIsTUFBTTtnQkFDWSxNQUFNO3NCQUF4QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgT25EZXN0cm95LFxuICBDb21wb25lbnRSZWYsXG4gIElucHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIE91dHB1dCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIE9uSW5pdCxcbiAgUmVuZGVyZXIyLFxuICBJbmplY3QsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT3ZlcmxheSwgT3ZlcmxheVJlZiwgT3ZlcmxheUNvbmZpZywgQ29ubmVjdGlvblBvc2l0aW9uUGFpciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbXBvbmVudFBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgTWRiRGF0ZXBpY2tlckNvbnRlbnRDb21wb25lbnQgfSBmcm9tICcuL2RhdGVwaWNrZXItY29udGVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIG1lcmdlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBhZGRNb250aHMsXG4gIGFkZFllYXJzLFxuICBjcmVhdGVEYXRlLFxuICBnZXREYXRlLFxuICBnZXREYXlOdW1iZXIsXG4gIGdldERheXNJbk1vbnRoLFxuICBnZXRNb250aCxcbiAgZ2V0VG9kYXksXG4gIGdldFllYXIsXG4gIGdldFllYXJzT2Zmc2V0LFxuICBpc0RhdGVEaXNhYmxlZCxcbiAgaXNNb250aERpc2FibGVkLFxuICBpc05leHREYXRlRGlzYWJsZWQsXG4gIGlzUHJldmlvdXNEYXRlRGlzYWJsZWQsXG4gIGlzVmFsaWREYXRlLFxuICBpc1llYXJEaXNhYmxlZCxcbn0gZnJvbSAnLi9kYXRlcGlja2VyLXV0aWxzJztcbmltcG9ydCB7IE1kYkRhdGVwaWNrZXJUb2dnbGVDb21wb25lbnQgfSBmcm9tICcuL2RhdGVwaWNrZXItdG9nZ2xlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBZRUFSU19JTl9WSUVXIH0gZnJvbSAnLi9kYXRlcGlja2VyLWNvbnN0JztcbmltcG9ydCB7IE1kYkRhdGVwaWNrZXJJbnB1dERpcmVjdGl2ZSB9IGZyb20gJy4vZGF0ZXBpY2tlci1pbnB1dC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuXG5leHBvcnQgdHlwZSBNZGJEYXRlcGlja2VyVmlldyA9ICdkYXlzJyB8ICdtb250aHMnIHwgJ3llYXJzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLWRhdGVwaWNrZXInLFxuICBleHBvcnRBczogJ21kYkRhdGVwaWNrZXInLFxuICB0ZW1wbGF0ZTogJycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNZGJEYXRlcGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICB0aXRsZTogJ1NlbGVjdCBkYXRlJyxcbiAgICBtb250aHNGdWxsOiBbXG4gICAgICAnSmFudWFyeScsXG4gICAgICAnRmVicnVhcnknLFxuICAgICAgJ01hcmNoJyxcbiAgICAgICdBcHJpbCcsXG4gICAgICAnTWF5JyxcbiAgICAgICdKdW5lJyxcbiAgICAgICdKdWx5JyxcbiAgICAgICdBdWd1c3QnLFxuICAgICAgJ1NlcHRlbWJlcicsXG4gICAgICAnT2N0b2JlcicsXG4gICAgICAnTm92ZW1iZXInLFxuICAgICAgJ0RlY2VtYmVyJyxcbiAgICBdLFxuICAgIG1vbnRoc1Nob3J0OiBbXG4gICAgICAnSmFuJyxcbiAgICAgICdGZWInLFxuICAgICAgJ01hcicsXG4gICAgICAnQXByJyxcbiAgICAgICdNYXknLFxuICAgICAgJ0p1bicsXG4gICAgICAnSnVsJyxcbiAgICAgICdBdWcnLFxuICAgICAgJ1NlcCcsXG4gICAgICAnT2N0JyxcbiAgICAgICdOb3YnLFxuICAgICAgJ0RlYycsXG4gICAgXSxcbiAgICB3ZWVrZGF5c0Z1bGw6IFsnU3VuZGF5JywgJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknXSxcbiAgICB3ZWVrZGF5c1Nob3J0OiBbJ1N1bicsICdNb24nLCAnVHVlJywgJ1dlZCcsICdUaHUnLCAnRnJpJywgJ1NhdCddLFxuICAgIHdlZWtkYXlzTmFycm93OiBbJ1MnLCAnTScsICdUJywgJ1cnLCAnVCcsICdGJywgJ1MnXSxcbiAgICBva0J0blRleHQ6ICdPaycsXG4gICAgY2xlYXJCdG5UZXh0OiAnQ2xlYXInLFxuICAgIGNhbmNlbEJ0blRleHQ6ICdDYW5jZWwnLFxuXG4gICAgb2tCdG5MYWJlbDogJ0NvbmZpcm0gc2VsZWN0aW9uJyxcbiAgICBjbGVhckJ0bkxhYmVsOiAnQ2xlYXIgc2VsZWN0aW9uJyxcbiAgICBjYW5jZWxCdG5MYWJlbDogJ0NhbmNlbCBzZWxlY3Rpb24nLFxuICAgIG5leHRNb250aExhYmVsOiAnTmV4dCBtb250aCcsXG4gICAgcHJldk1vbnRoTGFiZWw6ICdQcmV2aW91cyBtb250aCcsXG4gICAgbmV4dFllYXJMYWJlbDogJ05leHQgeWVhcicsXG4gICAgcHJldlllYXJMYWJlbDogJ1ByZXZpb3VzIHllYXInLFxuICAgIG5leHRNdWx0aVllYXJMYWJlbDogJ05leHQgMjQgeWVhcnMnLFxuICAgIHByZXZNdWx0aVllYXJMYWJlbDogJ1ByZXZpb3VzIDI0IHllYXJzJyxcbiAgICBzd2l0Y2hUb011bHRpWWVhclZpZXdMYWJlbDogJ0Nob29zZSB5ZWFyIGFuZCBtb250aCcsXG4gICAgc3dpdGNoVG9EYXlWaWV3TGFiZWw6ICdDaG9vc2UgZGF0ZScsXG4gIH07XG5cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBnZXQgaW5saW5lKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pbmxpbmU7XG4gIH1cbiAgc2V0IGlubGluZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2lubGluZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfaW5saW5lID0gZmFsc2U7XG5cbiAgQElucHV0KCkgZm9ybWF0ID0gJ2RkL21tL3l5eXknO1xuICBASW5wdXQoKSBmaWx0ZXI6IChkYXRlOiBEYXRlKSA9PiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBvcGVuT25JbnB1dENsaWNrKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9vcGVuT25JbnB1dENsaWNrO1xuICB9XG4gIHNldCBvcGVuT25JbnB1dENsaWNrKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fb3Blbk9uSW5wdXRDbGljayA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfb3Blbk9uSW5wdXRDbGljayA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIG9wdGlvbnM6IGFueTtcbiAgQElucHV0KCkgc3RhcnREYXRlOiBudWxsIHwgRGF0ZTtcbiAgQElucHV0KCkgc3RhcnREYXkgPSAwO1xuICBASW5wdXQoKSBzdGFydFZpZXc6IE1kYkRhdGVwaWNrZXJWaWV3ID0gJ2RheXMnO1xuICBASW5wdXQoKSBtaW5EYXRlOiBEYXRlO1xuICBASW5wdXQoKSBtYXhEYXRlOiBEYXRlO1xuXG4gIEBPdXRwdXQoKSByZWFkb25seSBkYXRlQ2hhbmdlZDogRXZlbnRFbWl0dGVyPERhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgdmlld0NoYW5nZWQ6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBjbGVhckJ1dHRvbkNsaWNrZWQ6IEV2ZW50RW1pdHRlcjxudWxsPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVsbD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGNhbmNlbEJ1dHRvbkNsaWNrZWQ6IEV2ZW50RW1pdHRlcjxudWxsPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVsbD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGNvbmZpcm1CdXR0b25DbGlja2VkOiBFdmVudEVtaXR0ZXI8bnVsbD4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bGw+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBvcGVuZWQ6IEV2ZW50RW1pdHRlcjxudWxsPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVsbD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGNsb3NlZDogRXZlbnRFbWl0dGVyPG51bGw+ID0gbmV3IEV2ZW50RW1pdHRlcjxudWxsPigpO1xuXG4gIHByaXZhdGUgX292ZXJsYXlSZWY6IE92ZXJsYXlSZWY7XG4gIHByaXZhdGUgX3BvcnRhbDogQ29tcG9uZW50UG9ydGFsPE1kYkRhdGVwaWNrZXJDb250ZW50Q29tcG9uZW50PjtcbiAgcHJpdmF0ZSBfcGlja2VyUmVmOiBDb21wb25lbnRSZWY8TWRiRGF0ZXBpY2tlckNvbnRlbnRDb21wb25lbnQ+O1xuXG4gIF9hY3RpdmVEYXRlID0gbmV3IERhdGUoKTtcbiAgX3NlbGVjdGVkRGF0ZTogbnVsbCB8IERhdGU7XG4gIF9zZWxlY3RlZFllYXI6IG51bGwgfCBudW1iZXI7XG4gIF9zZWxlY3RlZE1vbnRoOiBudWxsIHwgbnVtYmVyO1xuXG4gIF9wcmV2QnRuRGlzYWJsZWQgPSBmYWxzZTtcbiAgX25leHRCdG5EaXNhYmxlZCA9IGZhbHNlO1xuXG4gIF9jdXJyZW50VmlldzogTWRiRGF0ZXBpY2tlclZpZXc7XG5cbiAgX2lucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuICBfaW5wdXREaXJlY3RpdmU6IE1kYkRhdGVwaWNrZXJJbnB1dERpcmVjdGl2ZTtcbiAgX3RvZ2dsZTogTWRiRGF0ZXBpY2tlclRvZ2dsZUNvbXBvbmVudDtcbiAgX2hlYWRlckRhdGU6IHN0cmluZztcblxuICBfaXNPcGVuID0gZmFsc2U7XG5cbiAgZ2V0IGFjdGl2ZURheSgpOiBudW1iZXIge1xuICAgIHJldHVybiBnZXREYXRlKHRoaXMuX2FjdGl2ZURhdGUpO1xuICB9XG5cbiAgZ2V0IGFjdGl2ZU1vbnRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIGdldE1vbnRoKHRoaXMuX2FjdGl2ZURhdGUpO1xuICB9XG5cbiAgZ2V0IGFjdGl2ZVllYXIoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZ2V0WWVhcih0aGlzLl9hY3RpdmVEYXRlKTtcbiAgfVxuXG4gIGdldCBmaXJzdFllYXJJblZpZXcoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5hY3RpdmVZZWFyIC0gZ2V0WWVhcnNPZmZzZXQodGhpcy5fYWN0aXZlRGF0ZSwgWUVBUlNfSU5fVklFVywgdGhpcy5taW5EYXRlLCB0aGlzLm1heERhdGUpXG4gICAgKTtcbiAgfVxuXG4gIGdldCBsYXN0WWVhckluVmlldygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmZpcnN0WWVhckluVmlldyArIFlFQVJTX0lOX1ZJRVcgLSAxO1xuICB9XG5cbiAgZ2V0IHZpZXdDaGFuZ2VCdXR0b25UZXh0KCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRWaWV3ID09PSAnZGF5cycpIHtcbiAgICAgIHJldHVybiBgJHt0aGlzLm9wdGlvbnMubW9udGhzRnVsbFt0aGlzLmFjdGl2ZU1vbnRoXX0gJHt0aGlzLmFjdGl2ZVllYXJ9YDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fY3VycmVudFZpZXcgPT09ICd5ZWFycycpIHtcbiAgICAgIHJldHVybiBgJHt0aGlzLmZpcnN0WWVhckluVmlld30gLSAke3RoaXMubGFzdFllYXJJblZpZXd9YDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fY3VycmVudFZpZXcgPT09ICdtb250aHMnKSB7XG4gICAgICByZXR1cm4gYCR7dGhpcy5hY3RpdmVZZWFyfWA7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHZpZXdDaGFuZ2VCdXR0b25MYWJlbCgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLl9jdXJyZW50VmlldyA9PT0gJ2RheXMnKSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnN3aXRjaFRvTXVsdGlZZWFyVmlld0xhYmVsO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fY3VycmVudFZpZXcgPT09ICd5ZWFycycgfHwgdGhpcy5fY3VycmVudFZpZXcgPT09ICdtb250aHMnKSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnN3aXRjaFRvRGF5Vmlld0xhYmVsO1xuICAgIH1cbiAgfVxuXG4gIGdldCBuZXh0QnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5fY3VycmVudFZpZXcgPT09ICdkYXlzJykge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5uZXh0TW9udGhMYWJlbDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2N1cnJlbnRWaWV3ID09PSAneWVhcnMnKSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLm5leHRNdWx0aVllYXJMYWJlbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5uZXh0WWVhckxhYmVsO1xuICAgIH1cbiAgfVxuXG4gIGdldCBwcmV2QnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5fY3VycmVudFZpZXcgPT09ICdkYXlzJykge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5wcmV2TW9udGhMYWJlbDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2N1cnJlbnRWaWV3ID09PSAneWVhcnMnKSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnByZXZNdWx0aVllYXJMYWJlbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5wcmV2WWVhckxhYmVsO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50LFxuICAgIHByaXZhdGUgX292ZXJsYXk6IE92ZXJsYXksXG4gICAgcHJpdmF0ZSBfdmNyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBfY2RSZWY6IENoYW5nZURldGVjdG9yUmVmXG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9pbnB1dERpcmVjdGl2ZS5zZWxlY3Rpb25DaGFuZ2Uuc3Vic2NyaWJlKChkYXRlKSA9PiB7XG4gICAgICB0aGlzLl9hcHBseUlucHV0RGF0ZShkYXRlKTtcbiAgICB9KTtcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLm9wdGlvbnNcbiAgICAgID8gT2JqZWN0LmFzc2lnbih0aGlzLmRlZmF1bHRPcHRpb25zLCB0aGlzLm9wdGlvbnMpXG4gICAgICA6IHRoaXMuZGVmYXVsdE9wdGlvbnM7XG5cbiAgICBjb25zdCBoZWFkZXJEYXRlID0gdGhpcy5fc2VsZWN0ZWREYXRlIHx8IHRoaXMuX2FjdGl2ZURhdGU7XG4gICAgdGhpcy5fdXBkYXRlSGVhZGVyRGF0ZShoZWFkZXJEYXRlKTtcbiAgfVxuXG4gIF91cGRhdGVIZWFkZXJEYXRlKGRhdGU6IERhdGUpOiB2b2lkIHtcbiAgICBjb25zdCBkYXkgPSBnZXREYXlOdW1iZXIoZGF0ZSk7XG4gICAgY29uc3QgZGF5TnVtYmVyID0gZ2V0RGF0ZShkYXRlKTtcbiAgICBjb25zdCBtb250aCA9IGdldE1vbnRoKGRhdGUpO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cbiAgICB0aGlzLl9oZWFkZXJEYXRlID0gYCR7b3B0aW9ucy53ZWVrZGF5c1Nob3J0W2RheV19LCAke29wdGlvbnMubW9udGhzU2hvcnRbbW9udGhdfSAke2RheU51bWJlcn1gO1xuICB9XG5cbiAgb3BlbigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5faXNPcGVuKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fY3VycmVudFZpZXcgPSB0aGlzLnN0YXJ0VmlldztcbiAgICB0aGlzLl9zZXRJbml0aWFsRGF0ZSgpO1xuXG4gICAgbGV0IG92ZXJsYXlSZWYgPSB0aGlzLl9vdmVybGF5UmVmO1xuXG4gICAgaWYgKCFvdmVybGF5UmVmKSB7XG4gICAgICB0aGlzLl9wb3J0YWwgPSBuZXcgQ29tcG9uZW50UG9ydGFsPE1kYkRhdGVwaWNrZXJDb250ZW50Q29tcG9uZW50PihcbiAgICAgICAgTWRiRGF0ZXBpY2tlckNvbnRlbnRDb21wb25lbnQsXG4gICAgICAgIHRoaXMuX3ZjclxuICAgICAgKTtcbiAgICAgIG92ZXJsYXlSZWYgPSB0aGlzLl9vdmVybGF5LmNyZWF0ZSh0aGlzLl9nZXRPdmVybGF5Q29uZmlnKCkpO1xuICAgICAgdGhpcy5fb3ZlcmxheVJlZiA9IG92ZXJsYXlSZWY7XG4gICAgfVxuXG4gICAgaWYgKG92ZXJsYXlSZWYgJiYgIW92ZXJsYXlSZWYuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgdGhpcy5fcGlja2VyUmVmID0gdGhpcy5fb3ZlcmxheVJlZi5hdHRhY2godGhpcy5fcG9ydGFsKTtcbiAgICAgIHRoaXMuX3BpY2tlclJlZi5pbnN0YW5jZS5kYXRlcGlja2VyID0gdGhpcztcblxuICAgICAgdGhpcy5fbGlzdGVuVG9PdXRzaWRlQ2xpY2soKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuaW5saW5lICYmIHRoaXMuX2hhc1ZlcnRpY2FsU2Nyb2xsKCkpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2RvY3VtZW50LmJvZHksICdvdmVyZmxvdycsICdoaWRkZW4nKTtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2RvY3VtZW50LmJvZHksICdwYWRkaW5nLXJpZ2h0JywgJzE1cHgnKTtcbiAgICB9XG5cbiAgICB0aGlzLl9pc09wZW4gPSB0cnVlO1xuICAgIHRoaXMub3BlbmVkLmVtaXQoKTtcbiAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldE92ZXJsYXlDb25maWcoKTogT3ZlcmxheUNvbmZpZyB7XG4gICAgY29uc3QgaW5saW5lUG9zaXRpb25TdHJhdGVneSA9IHRoaXMuX292ZXJsYXlcbiAgICAgIC5wb3NpdGlvbigpXG4gICAgICAuZmxleGlibGVDb25uZWN0ZWRUbyh0aGlzLl9pbnB1dClcbiAgICAgIC53aXRoUG9zaXRpb25zKHRoaXMuX2dldFBvc2l0aW9ucygpKVxuICAgICAgLndpdGhGbGV4aWJsZURpbWVuc2lvbnMoZmFsc2UpO1xuXG4gICAgY29uc3QgZGlhbG9nUG9zaXRpb25TdHJhdGVneSA9IHRoaXMuX292ZXJsYXlcbiAgICAgIC5wb3NpdGlvbigpXG4gICAgICAuZ2xvYmFsKClcbiAgICAgIC5jZW50ZXJIb3Jpem9udGFsbHkoKVxuICAgICAgLmNlbnRlclZlcnRpY2FsbHkoKTtcblxuICAgIGNvbnN0IGlubGluZVNjcm9sbFN0cmF0ZWd5ID0gdGhpcy5fb3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLnJlcG9zaXRpb24oKTtcbiAgICBjb25zdCBkaWFsb2dTY3JvbGxTdHJhdGVneSA9IHRoaXMuX292ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5ub29wKCk7XG5cbiAgICBjb25zdCBwb3NpdGlvblN0cmF0ZWd5ID0gdGhpcy5pbmxpbmUgPyBpbmxpbmVQb3NpdGlvblN0cmF0ZWd5IDogZGlhbG9nUG9zaXRpb25TdHJhdGVneTtcbiAgICBjb25zdCBzY3JvbGxTdHJhdGVneSA9IHRoaXMuaW5saW5lID8gaW5saW5lU2Nyb2xsU3RyYXRlZ3kgOiBkaWFsb2dTY3JvbGxTdHJhdGVneTtcblxuICAgIGNvbnN0IG92ZXJsYXlDb25maWcgPSBuZXcgT3ZlcmxheUNvbmZpZyh7XG4gICAgICBoYXNCYWNrZHJvcDogdGhpcy5pbmxpbmUgPyBmYWxzZSA6IHRydWUsXG4gICAgICBiYWNrZHJvcENsYXNzOiAnbWRiLWJhY2tkcm9wJyxcbiAgICAgIHNjcm9sbFN0cmF0ZWd5LFxuICAgICAgcG9zaXRpb25TdHJhdGVneSxcbiAgICB9KTtcbiAgICByZXR1cm4gb3ZlcmxheUNvbmZpZztcbiAgfVxuXG4gIHByaXZhdGUgX2dldFBvc2l0aW9ucygpOiBDb25uZWN0aW9uUG9zaXRpb25QYWlyW10ge1xuICAgIHJldHVybiBbXG4gICAgICB7XG4gICAgICAgIG9yaWdpblg6ICdzdGFydCcsXG4gICAgICAgIG9yaWdpblk6ICdib3R0b20nLFxuICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgICAgb3ZlcmxheVk6ICd0b3AnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcbiAgICAgICAgb3JpZ2luWTogJ3RvcCcsXG4gICAgICAgIG92ZXJsYXlYOiAnc3RhcnQnLFxuICAgICAgICBvdmVybGF5WTogJ2JvdHRvbScsXG4gICAgICB9LFxuICAgIF07XG4gIH1cblxuICBwcml2YXRlIF9oYXNWZXJ0aWNhbFNjcm9sbCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQgPiB0aGlzLl9kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICB9XG5cbiAgcHJpdmF0ZSBfbGlzdGVuVG9PdXRzaWRlQ2xpY2soKTogdm9pZCB7XG4gICAgbWVyZ2UoXG4gICAgICB0aGlzLl9vdmVybGF5UmVmLmtleWRvd25FdmVudHMoKS5waXBlKFxuICAgICAgICBmaWx0ZXIoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGV2ZW50LmtleSA9PT0gJ0VzY2FwZSc7XG4gICAgICAgIH0pXG4gICAgICApLFxuICAgICAgZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKS5waXBlKFxuICAgICAgICB0YWtlVW50aWwodGhpcy5jbG9zZWQpLFxuICAgICAgICBmaWx0ZXIoKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgY29uc3QgdG9nZ2xlQnV0dG9uID0gdGhpcy5fdG9nZ2xlICYmIHRoaXMuX3RvZ2dsZS5idXR0b24ubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgICAgY29uc3Qgbm90VG9nZ2xlID1cbiAgICAgICAgICAgIHRvZ2dsZUJ1dHRvbiAmJiB0YXJnZXQgIT09IHRvZ2dsZUJ1dHRvbiAmJiAhdG9nZ2xlQnV0dG9uLmNvbnRhaW5zKHRhcmdldCk7XG4gICAgICAgICAgY29uc3Qgbm90T3JpZ2luID0gdGFyZ2V0ICE9PSB0aGlzLl9pbnB1dDtcbiAgICAgICAgICBjb25zdCBub3RPdmVybGF5ID1cbiAgICAgICAgICAgICEhdGhpcy5fb3ZlcmxheVJlZiAmJlxuICAgICAgICAgICAgdGhpcy5fb3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudCAmJlxuICAgICAgICAgICAgIXRoaXMuX292ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQuY29udGFpbnModGFyZ2V0KTtcbiAgICAgICAgICByZXR1cm4gbm90VG9nZ2xlICYmIG5vdE9yaWdpbiAmJiBub3RPdmVybGF5O1xuICAgICAgICB9KVxuICAgICAgKVxuICAgICkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNsb3NlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5faXNPcGVuKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fcGlja2VyUmVmLmluc3RhbmNlLl9zdGFydEhpZGVBbmltYXRpb24oKTtcbiAgICBpZiAodGhpcy5fb3ZlcmxheVJlZi5iYWNrZHJvcEVsZW1lbnQpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX292ZXJsYXlSZWYuYmFja2Ryb3BFbGVtZW50LCAnb3BhY2l0eScsICcwJyk7XG4gICAgfVxuXG4gICAgdGhpcy5fcGlja2VyUmVmLmluc3RhbmNlLl9oaWRlQW5pbWF0aW9uRG9uZS5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5fb3ZlcmxheVJlZiAmJiB0aGlzLl9vdmVybGF5UmVmLmhhc0F0dGFjaGVkKCkpIHtcbiAgICAgICAgdGhpcy5fb3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgICAgIHRoaXMuX292ZXJsYXlSZWYgPSBudWxsO1xuICAgICAgICB0aGlzLl9pc09wZW4gPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5pbmxpbmUpIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5fZG9jdW1lbnQuYm9keSwgJ292ZXJmbG93Jyk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMuX2RvY3VtZW50LmJvZHksICdwYWRkaW5nLXJpZ2h0Jyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2xvc2VkLmVtaXQoKTtcblxuICAgICAgaWYgKHRoaXMuX3RvZ2dsZSkge1xuICAgICAgICB0aGlzLl90b2dnbGUuYnV0dG9uLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2lucHV0LmZvY3VzKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9pc09wZW4gPyB0aGlzLmNsb3NlKCkgOiB0aGlzLm9wZW4oKTtcbiAgfVxuXG4gIHZpZXdDaGFuZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5fY3VycmVudFZpZXcgPSB0aGlzLl9jdXJyZW50VmlldyA9PT0gJ2RheXMnID8gJ3llYXJzJyA6ICdkYXlzJztcbiAgICB0aGlzLl91cGRhdGVDb250cm9sc0Rpc2FibGVkU3RhdGUoKTtcbiAgfVxuXG4gIF9oYW5kbGVQcmV2aW91c0J1dHRvbkNsaWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jdXJyZW50VmlldyA9PT0gJ2RheXMnKSB7XG4gICAgICB0aGlzLl9wcmV2aW91c01vbnRoKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9jdXJyZW50VmlldyA9PT0gJ3llYXJzJykge1xuICAgICAgdGhpcy5fcHJldmlvdXNZZWFycygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9wcmV2aW91c1llYXIoKTtcbiAgICB9XG5cbiAgICB0aGlzLl91cGRhdGVDb250cm9sc0Rpc2FibGVkU3RhdGUoKTtcbiAgfVxuXG4gIF9oYW5kbGVOZXh0QnV0dG9uQ2xpY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRWaWV3ID09PSAnZGF5cycpIHtcbiAgICAgIHRoaXMuX25leHRNb250aCgpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fY3VycmVudFZpZXcgPT09ICd5ZWFycycpIHtcbiAgICAgIHRoaXMuX25leHRZZWFycygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9uZXh0WWVhcigpO1xuICAgIH1cblxuICAgIHRoaXMuX3VwZGF0ZUNvbnRyb2xzRGlzYWJsZWRTdGF0ZSgpO1xuICB9XG5cbiAgX3VwZGF0ZUNvbnRyb2xzRGlzYWJsZWRTdGF0ZSgpOiB2b2lkIHtcbiAgICBpZiAoXG4gICAgICBpc05leHREYXRlRGlzYWJsZWQoXG4gICAgICAgIHRoaXMuX2FjdGl2ZURhdGUsXG4gICAgICAgIHRoaXMuX2N1cnJlbnRWaWV3LFxuICAgICAgICBZRUFSU19JTl9WSUVXLFxuICAgICAgICB0aGlzLm1pbkRhdGUsXG4gICAgICAgIHRoaXMubWF4RGF0ZVxuICAgICAgKVxuICAgICkge1xuICAgICAgdGhpcy5fbmV4dEJ0bkRpc2FibGVkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbmV4dEJ0bkRpc2FibGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgaXNQcmV2aW91c0RhdGVEaXNhYmxlZChcbiAgICAgICAgdGhpcy5fYWN0aXZlRGF0ZSxcbiAgICAgICAgdGhpcy5fY3VycmVudFZpZXcsXG4gICAgICAgIFlFQVJTX0lOX1ZJRVcsXG4gICAgICAgIHRoaXMubWluRGF0ZSxcbiAgICAgICAgdGhpcy5tYXhEYXRlXG4gICAgICApXG4gICAgKSB7XG4gICAgICB0aGlzLl9wcmV2QnRuRGlzYWJsZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9wcmV2QnRuRGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBfbmV4dE1vbnRoKCk6IHZvaWQge1xuICAgIHRoaXMuX2FjdGl2ZURhdGUgPSBhZGRNb250aHModGhpcy5fYWN0aXZlRGF0ZSwgMSk7XG4gIH1cblxuICBfcHJldmlvdXNNb250aCgpOiB2b2lkIHtcbiAgICB0aGlzLl9hY3RpdmVEYXRlID0gYWRkTW9udGhzKHRoaXMuX2FjdGl2ZURhdGUsIC0xKTtcbiAgfVxuXG4gIF9uZXh0WWVhcigpOiB2b2lkIHtcbiAgICB0aGlzLl9hY3RpdmVEYXRlID0gYWRkWWVhcnModGhpcy5fYWN0aXZlRGF0ZSwgMSk7XG4gIH1cblxuICBfcHJldmlvdXNZZWFyKCk6IHZvaWQge1xuICAgIHRoaXMuX2FjdGl2ZURhdGUgPSBhZGRZZWFycyh0aGlzLl9hY3RpdmVEYXRlLCAtMSk7XG4gIH1cblxuICBfbmV4dFllYXJzKCk6IHZvaWQge1xuICAgIHRoaXMuX2FjdGl2ZURhdGUgPSBhZGRZZWFycyh0aGlzLl9hY3RpdmVEYXRlLCAyNCk7XG4gIH1cblxuICBfcHJldmlvdXNZZWFycygpOiB2b2lkIHtcbiAgICB0aGlzLl9hY3RpdmVEYXRlID0gYWRkWWVhcnModGhpcy5fYWN0aXZlRGF0ZSwgLTI0KTtcbiAgfVxuXG4gIF9oYW5kbGVVc2VySW5wdXQoaW5wdXQ6IHN0cmluZywgZW1pdENoYW5nZXMgPSB0cnVlKTogdm9pZCB7XG4gICAgY29uc3QgZGVsaW1ldGVycyA9IHRoaXMuX2dldERlbGltZXRlcnModGhpcy5mb3JtYXQpO1xuICAgIGNvbnN0IGRhdGUgPSB0aGlzLl9wYXJzZURhdGUoaW5wdXQsIHRoaXMuZm9ybWF0LCBkZWxpbWV0ZXJzKTtcblxuICAgIGlmIChpc1ZhbGlkRGF0ZShkYXRlKSAmJiAhaXNEYXRlRGlzYWJsZWQoZGF0ZSwgdGhpcy5taW5EYXRlLCB0aGlzLm1heERhdGUsIHRoaXMuZmlsdGVyKSkge1xuICAgICAgdGhpcy5fYWN0aXZlRGF0ZSA9IGRhdGU7XG4gICAgICB0aGlzLl9zZWxlY3RlZERhdGUgPSBkYXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9hY3RpdmVEYXRlID0gbmV3IERhdGUoKTtcbiAgICAgIHRoaXMuX3NlbGVjdGVkRGF0ZSA9IG51bGw7XG4gICAgICB0aGlzLl9zZWxlY3RlZE1vbnRoID0gbnVsbDtcbiAgICAgIHRoaXMuX3NlbGVjdGVkWWVhciA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKGVtaXRDaGFuZ2VzKSB7XG4gICAgICBjb25zdCB2YWx1ZVRvRW1pdCA9IGlzVmFsaWREYXRlKGRhdGUpID8gZGF0ZSA6IG51bGw7XG4gICAgICB0aGlzLl9pbnB1dERpcmVjdGl2ZS5vbkNoYW5nZSh2YWx1ZVRvRW1pdCk7XG4gICAgfVxuICB9XG5cbiAgX2dldERlbGltZXRlcnMoZm9ybWF0OiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiBmb3JtYXQubWF0Y2goL1teKGRteSldezEsfS9nKTtcbiAgfVxuXG4gIF9wYXJzZURhdGUoZGF0ZVN0cmluZzogc3RyaW5nLCBmb3JtYXQ6IHN0cmluZywgZGVsaW1ldGVyczogYW55KTogRGF0ZSB7XG4gICAgbGV0IGRlbGltZXRlclBhdHRlcm46IHN0cmluZztcblxuICAgIGlmIChkZWxpbWV0ZXJzWzBdICE9PSBkZWxpbWV0ZXJzWzFdKSB7XG4gICAgICBkZWxpbWV0ZXJQYXR0ZXJuID0gZGVsaW1ldGVyc1swXSArIGRlbGltZXRlcnNbMV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGltZXRlclBhdHRlcm4gPSBkZWxpbWV0ZXJzWzBdO1xuICAgIH1cblxuICAgIGNvbnN0IHJlZ0V4cCA9IG5ldyBSZWdFeHAoYFske2RlbGltZXRlclBhdHRlcm59XWApO1xuICAgIGNvbnN0IGRhdGVQYXJ0cyA9IGRhdGVTdHJpbmcuc3BsaXQocmVnRXhwKTtcbiAgICBjb25zdCBmb3JtYXRQYXJ0cyA9IGZvcm1hdC5zcGxpdChyZWdFeHApO1xuICAgIGNvbnN0IGlzTW9udGhTdHJpbmcgPSBmb3JtYXQuaW5kZXhPZignbW1tJykgIT09IC0xO1xuXG4gICAgY29uc3QgZGF0ZXNBcnJheSA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3JtYXRQYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGZvcm1hdFBhcnRzW2ldLmluZGV4T2YoJ3l5JykgIT09IC0xKSB7XG4gICAgICAgIGRhdGVzQXJyYXlbMF0gPSB7IHZhbHVlOiBkYXRlUGFydHNbaV0sIGZvcm1hdDogZm9ybWF0UGFydHNbaV0gfTtcbiAgICAgIH1cbiAgICAgIGlmIChmb3JtYXRQYXJ0c1tpXS5pbmRleE9mKCdtJykgIT09IC0xKSB7XG4gICAgICAgIGRhdGVzQXJyYXlbMV0gPSB7IHZhbHVlOiBkYXRlUGFydHNbaV0sIGZvcm1hdDogZm9ybWF0UGFydHNbaV0gfTtcbiAgICAgIH1cbiAgICAgIGlmIChmb3JtYXRQYXJ0c1tpXS5pbmRleE9mKCdkJykgIT09IC0xICYmIGZvcm1hdFBhcnRzW2ldLmxlbmd0aCA8PSAyKSB7XG4gICAgICAgIGRhdGVzQXJyYXlbMl0gPSB7IHZhbHVlOiBkYXRlUGFydHNbaV0sIGZvcm1hdDogZm9ybWF0UGFydHNbaV0gfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgbW9udGhzTmFtZXM6IHN0cmluZ1tdO1xuXG4gICAgaWYgKGZvcm1hdC5pbmRleE9mKCdtbW1tJykgIT09IC0xKSB7XG4gICAgICBtb250aHNOYW1lcyA9IHRoaXMub3B0aW9ucy5tb250aHNGdWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBtb250aHNOYW1lcyA9IHRoaXMub3B0aW9ucy5tb250aHNTaG9ydDtcbiAgICB9XG5cbiAgICBjb25zdCB5ZWFyID0gTnVtYmVyKGRhdGVzQXJyYXlbMF0udmFsdWUpO1xuICAgIGNvbnN0IG1vbnRoID0gaXNNb250aFN0cmluZ1xuICAgICAgPyB0aGlzLl9nZXRNb250aE51bWJlckJ5TW9udGhOYW1lKGRhdGVzQXJyYXlbMV0udmFsdWUsIG1vbnRoc05hbWVzKVxuICAgICAgOiBOdW1iZXIoZGF0ZXNBcnJheVsxXS52YWx1ZSkgLSAxO1xuICAgIGNvbnN0IGRheSA9IE51bWJlcihkYXRlc0FycmF5WzJdLnZhbHVlKTtcblxuICAgIGNvbnN0IHBhcnNlZERhdGUgPSBjcmVhdGVEYXRlKHllYXIsIG1vbnRoLCBkYXkpO1xuXG4gICAgaWYgKG1vbnRoID4gMTEgfHwgbW9udGggPCAwIHx8IGRheSA+IGdldERheXNJbk1vbnRoKGNyZWF0ZURhdGUoeWVhciwgbW9udGgsIDEpKSB8fCBkYXkgPCAxKSB7XG4gICAgICByZXR1cm4gZ2V0VG9kYXkoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyc2VkRGF0ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldE1vbnRoTnVtYmVyQnlNb250aE5hbWUobW9udGhWYWx1ZTogc3RyaW5nLCBtb250aExhYmVsczogc3RyaW5nW10pOiBudW1iZXIge1xuICAgIHJldHVybiBtb250aExhYmVscy5maW5kSW5kZXgoKG1vbnRoTGFiZWw6IHN0cmluZykgPT4gbW9udGhMYWJlbCA9PT0gbW9udGhWYWx1ZSk7XG4gIH1cblxuICBfYXBwbHlJbnB1dERhdGUoZGF0ZTogRGF0ZSB8IG51bGwpOiB2b2lkIHtcbiAgICBpZiAoIWRhdGUpIHtcbiAgICAgIHRoaXMuX2NsZWFyRGF0ZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChpc0RhdGVEaXNhYmxlZChkYXRlLCB0aGlzLm1pbkRhdGUsIHRoaXMubWF4RGF0ZSwgdGhpcy5maWx0ZXIpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fc2VsZWN0ZWREYXRlID0gZGF0ZTtcbiAgICB0aGlzLl9hY3RpdmVEYXRlID0gZGF0ZTtcbiAgICB0aGlzLl91cGRhdGVIZWFkZXJEYXRlKGRhdGUpO1xuXG4gICAgY29uc3QgZGF0ZVN0cmluZyA9IHRoaXMuX2Zvcm1hdERhdGUoZGF0ZSk7XG4gICAgdGhpcy5faW5wdXQudmFsdWUgPSBkYXRlU3RyaW5nO1xuICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2lucHV0LCAnYWN0aXZlJyk7XG5cbiAgICBpZiAodGhpcy5fcGlja2VyUmVmKSB7XG4gICAgICB0aGlzLl9waWNrZXJSZWYuaW5zdGFuY2UuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIHRoaXMuZGF0ZUNoYW5nZWQuZW1pdCh0aGlzLl9zZWxlY3RlZERhdGUpO1xuICB9XG5cbiAgX3NlbGVjdERhdGUoZGF0ZTogRGF0ZSk6IHZvaWQge1xuICAgIGlmIChpc0RhdGVEaXNhYmxlZChkYXRlLCB0aGlzLm1pbkRhdGUsIHRoaXMubWF4RGF0ZSwgdGhpcy5maWx0ZXIpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fc2VsZWN0ZWREYXRlID0gZGF0ZTtcbiAgICB0aGlzLl9hY3RpdmVEYXRlID0gZGF0ZTtcbiAgICB0aGlzLl91cGRhdGVIZWFkZXJEYXRlKGRhdGUpO1xuXG4gICAgaWYgKHRoaXMuaW5saW5lKSB7XG4gICAgICB0aGlzLl9jb25maXJtU2VsZWN0aW9uKHRoaXMuX3NlbGVjdGVkRGF0ZSk7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgX2NvbmZpcm1TZWxlY3Rpb24oZGF0ZTogRGF0ZSk6IHZvaWQge1xuICAgIGlmIChkYXRlKSB7XG4gICAgICBjb25zdCBkYXRlU3RyaW5nID0gdGhpcy5fZm9ybWF0RGF0ZShkYXRlKTtcbiAgICAgIHRoaXMuX2lucHV0LnZhbHVlID0gZGF0ZVN0cmluZztcbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2lucHV0LCAnYWN0aXZlJyk7XG4gICAgICB0aGlzLl9pbnB1dERpcmVjdGl2ZS5vbkNoYW5nZShkYXRlKTtcbiAgICAgIHRoaXMuZGF0ZUNoYW5nZWQuZW1pdCh0aGlzLl9zZWxlY3RlZERhdGUpO1xuICAgIH1cbiAgfVxuXG4gIF9mb3JtYXREYXRlKGRhdGU6IERhdGUpOiBzdHJpbmcge1xuICAgIGNvbnN0IGQgPSBnZXREYXRlKGRhdGUpO1xuICAgIGNvbnN0IGRkID0gdGhpcy5fYWRkTGVhZGluZ1plcm8oZ2V0RGF0ZShkYXRlKSk7XG4gICAgY29uc3QgZGRkID0gdGhpcy5vcHRpb25zLndlZWtkYXlzU2hvcnRbZ2V0RGF5TnVtYmVyKGRhdGUpXTtcbiAgICBjb25zdCBkZGRkID0gdGhpcy5vcHRpb25zLndlZWtkYXlzRnVsbFtnZXREYXlOdW1iZXIoZGF0ZSldO1xuICAgIGNvbnN0IG0gPSBnZXRNb250aChkYXRlKSArIDE7XG4gICAgY29uc3QgbW0gPSB0aGlzLl9hZGRMZWFkaW5nWmVybyhnZXRNb250aChkYXRlKSArIDEpO1xuICAgIGNvbnN0IG1tbSA9IHRoaXMub3B0aW9ucy5tb250aHNTaG9ydFtnZXRNb250aChkYXRlKV07XG4gICAgY29uc3QgbW1tbSA9IHRoaXMub3B0aW9ucy5tb250aHNGdWxsW2dldE1vbnRoKGRhdGUpXTtcbiAgICBjb25zdCB5eSA9XG4gICAgICBnZXRZZWFyKGRhdGUpLnRvU3RyaW5nKCkubGVuZ3RoID09PSAyID8gZ2V0WWVhcihkYXRlKSA6IGdldFllYXIoZGF0ZSkudG9TdHJpbmcoKS5zbGljZSgyLCA0KTtcbiAgICBjb25zdCB5eXl5ID0gZ2V0WWVhcihkYXRlKTtcblxuICAgIGNvbnN0IHByZWZvcm1hdHRlZCA9IHRoaXMuZm9ybWF0LnNwbGl0KC8oZHsxLDR9fG17MSw0fXx5ezR9fHl5fCEuKS9nKTtcbiAgICBsZXQgZm9ybWF0dGVkID0gJyc7XG4gICAgcHJlZm9ybWF0dGVkLmZvckVhY2goKGRhdGVQYXJ0KSA9PiB7XG4gICAgICBzd2l0Y2ggKGRhdGVQYXJ0KSB7XG4gICAgICAgIGNhc2UgJ2RkZGQnOlxuICAgICAgICAgIGRhdGVQYXJ0ID0gZGF0ZVBhcnQucmVwbGFjZShkYXRlUGFydCwgZGRkZC50b1N0cmluZygpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZGRkJzpcbiAgICAgICAgICBkYXRlUGFydCA9IGRhdGVQYXJ0LnJlcGxhY2UoZGF0ZVBhcnQsIGRkZC50b1N0cmluZygpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZGQnOlxuICAgICAgICAgIGRhdGVQYXJ0ID0gZGF0ZVBhcnQucmVwbGFjZShkYXRlUGFydCwgZGQudG9TdHJpbmcoKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2QnOlxuICAgICAgICAgIGRhdGVQYXJ0ID0gZGF0ZVBhcnQucmVwbGFjZShkYXRlUGFydCwgZC50b1N0cmluZygpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnbW1tbSc6XG4gICAgICAgICAgZGF0ZVBhcnQgPSBkYXRlUGFydC5yZXBsYWNlKGRhdGVQYXJ0LCBtbW1tLnRvU3RyaW5nKCkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdtbW0nOlxuICAgICAgICAgIGRhdGVQYXJ0ID0gZGF0ZVBhcnQucmVwbGFjZShkYXRlUGFydCwgbW1tLnRvU3RyaW5nKCkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdtbSc6XG4gICAgICAgICAgZGF0ZVBhcnQgPSBkYXRlUGFydC5yZXBsYWNlKGRhdGVQYXJ0LCBtbS50b1N0cmluZygpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnbSc6XG4gICAgICAgICAgZGF0ZVBhcnQgPSBkYXRlUGFydC5yZXBsYWNlKGRhdGVQYXJ0LCBtLnRvU3RyaW5nKCkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd5eXl5JzpcbiAgICAgICAgICBkYXRlUGFydCA9IGRhdGVQYXJ0LnJlcGxhY2UoZGF0ZVBhcnQsIHl5eXkudG9TdHJpbmcoKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3l5JzpcbiAgICAgICAgICBkYXRlUGFydCA9IGRhdGVQYXJ0LnJlcGxhY2UoZGF0ZVBhcnQsIHl5LnRvU3RyaW5nKCkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgfVxuICAgICAgZm9ybWF0dGVkICs9IGRhdGVQYXJ0O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZvcm1hdHRlZDtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZExlYWRpbmdaZXJvKHZhbHVlOiBhbnkpOiBzdHJpbmcgfCBudW1iZXIge1xuICAgIHJldHVybiBwYXJzZUludCh2YWx1ZSwgMTApIDwgMTAgPyBgMCR7dmFsdWV9YCA6IHZhbHVlO1xuICB9XG5cbiAgX3NlbGVjdFllYXIoeWVhcjogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGlzWWVhckRpc2FibGVkKHllYXIsIHRoaXMubWluRGF0ZSwgdGhpcy5tYXhEYXRlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGRheXNJbk1vbnRoID0gZ2V0RGF5c0luTW9udGgoY3JlYXRlRGF0ZSh5ZWFyLCB0aGlzLmFjdGl2ZU1vbnRoLCAxKSk7XG4gICAgY29uc3QgZGF5ID0gTWF0aC5taW4odGhpcy5hY3RpdmVEYXksIGRheXNJbk1vbnRoKTtcblxuICAgIGNvbnN0IG5ld0RhdGUgPSBjcmVhdGVEYXRlKHllYXIsIHRoaXMuYWN0aXZlTW9udGgsIGRheSk7XG5cbiAgICB0aGlzLl9hY3RpdmVEYXRlID0gbmV3RGF0ZTtcbiAgICB0aGlzLl9zZWxlY3RlZFllYXIgPSB5ZWFyO1xuICAgIHRoaXMuX2N1cnJlbnRWaWV3ID0gJ21vbnRocyc7XG5cbiAgICB0aGlzLl91cGRhdGVIZWFkZXJEYXRlKG5ld0RhdGUpO1xuICAgIHRoaXMuX3VwZGF0ZUNvbnRyb2xzRGlzYWJsZWRTdGF0ZSgpO1xuICB9XG5cbiAgX3NlbGVjdE1vbnRoKG1vbnRoOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCB5ZWFyID0gdGhpcy5hY3RpdmVZZWFyO1xuXG4gICAgaWYgKFxuICAgICAgaXNNb250aERpc2FibGVkKG1vbnRoLCB5ZWFyLCB0aGlzLm1pbkRhdGUsIHRoaXMubWF4RGF0ZSkgfHxcbiAgICAgIGlzWWVhckRpc2FibGVkKHllYXIsIHRoaXMubWluRGF0ZSwgdGhpcy5tYXhEYXRlKVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGRheXNJbk1vbnRoID0gZ2V0RGF5c0luTW9udGgoY3JlYXRlRGF0ZSh5ZWFyLCBtb250aCwgMSkpO1xuICAgIGNvbnN0IGRheSA9IE1hdGgubWluKHRoaXMuYWN0aXZlRGF5LCBkYXlzSW5Nb250aCk7XG5cbiAgICBjb25zdCBuZXdEYXRlID0gY3JlYXRlRGF0ZSh5ZWFyLCBtb250aCwgZGF5KTtcblxuICAgIHRoaXMuX2FjdGl2ZURhdGUgPSBuZXdEYXRlO1xuICAgIHRoaXMuX3NlbGVjdGVkTW9udGggPSBtb250aDtcbiAgICB0aGlzLl9jdXJyZW50VmlldyA9ICdkYXlzJztcblxuICAgIHRoaXMuX3VwZGF0ZUhlYWRlckRhdGUobmV3RGF0ZSk7XG4gICAgdGhpcy5fdXBkYXRlQ29udHJvbHNEaXNhYmxlZFN0YXRlKCk7XG4gIH1cblxuICBfaGFuZGxlT2tDbGljaygpOiB2b2lkIHtcbiAgICB0aGlzLl9jb25maXJtU2VsZWN0aW9uKHRoaXMuX3NlbGVjdGVkRGF0ZSk7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgX2hhbmRsZUNhbmNlbENsaWNrKCk6IHZvaWQge1xuICAgIHRoaXMuX3NlbGVjdGVkRGF0ZSA9IG51bGw7XG4gICAgdGhpcy5fc2VsZWN0ZWRNb250aCA9IG51bGw7XG4gICAgdGhpcy5fc2VsZWN0ZWRZZWFyID0gbnVsbDtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICBfaGFuZGxlQ2xlYXJDbGljaygpOiB2b2lkIHtcbiAgICB0aGlzLl9jbGVhckRhdGUoKTtcbiAgICB0aGlzLl9pbnB1dERpcmVjdGl2ZS5vbkNoYW5nZShudWxsKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NsZWFyRGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zZWxlY3RlZERhdGUgPSBudWxsO1xuICAgIHRoaXMuX3NlbGVjdGVkTW9udGggPSBudWxsO1xuICAgIHRoaXMuX3NlbGVjdGVkWWVhciA9IG51bGw7XG4gICAgdGhpcy5faW5wdXQudmFsdWUgPSAnJztcbiAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLl9pbnB1dCwgJ2FjdGl2ZScpO1xuICAgIHRoaXMuX3NldEluaXRpYWxEYXRlKCk7XG4gICAgdGhpcy5fdXBkYXRlSGVhZGVyRGF0ZSh0aGlzLl9hY3RpdmVEYXRlKTtcbiAgICB0aGlzLl9jdXJyZW50VmlldyA9ICdkYXlzJztcbiAgfVxuXG4gIHByaXZhdGUgX3NldEluaXRpYWxEYXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9pbnB1dC52YWx1ZSkge1xuICAgICAgdGhpcy5faGFuZGxlVXNlcklucHV0KHRoaXMuX2lucHV0LnZhbHVlLCBmYWxzZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnN0YXJ0RGF0ZSkge1xuICAgICAgdGhpcy5fYWN0aXZlRGF0ZSA9IHRoaXMuc3RhcnREYXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9hY3RpdmVEYXRlID0gbmV3IERhdGUoKTtcbiAgICB9XG5cbiAgICB0aGlzLl91cGRhdGVIZWFkZXJEYXRlKHRoaXMuX2FjdGl2ZURhdGUpO1xuICAgIHRoaXMuX3VwZGF0ZUNvbnRyb2xzRGlzYWJsZWRTdGF0ZSgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX292ZXJsYXlSZWYpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgIHRoaXMuX292ZXJsYXlSZWYuZGlzcG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfaW5saW5lOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9vcGVuT25JbnB1dENsaWNrOiBCb29sZWFuSW5wdXQ7XG59XG4iXX0=