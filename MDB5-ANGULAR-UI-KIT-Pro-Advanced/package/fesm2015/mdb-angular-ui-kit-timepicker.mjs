import * as i0 from '@angular/core';
import { Component, ViewEncapsulation, ChangeDetectionStrategy, Inject, ViewChild, EventEmitter, Input, Output, HostListener, forwardRef, Directive, NgModule } from '@angular/core';
import * as i1$1 from '@angular/cdk/overlay';
import { OverlayConfig, OverlayModule } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Subject, merge } from 'rxjs';
import { take, filter } from 'rxjs/operators';
import * as i2 from '@angular/common';
import { DOCUMENT, CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as i1 from '@angular/cdk/a11y';
import { A11yModule } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

class MdbTimepickerContentComponent {
    constructor(_cdRef, _ngZone, focusMonitor, elem, renderer, _document) {
        this._cdRef = _cdRef;
        this._ngZone = _ngZone;
        this.focusMonitor = focusMonitor;
        this.elem = elem;
        this.renderer = renderer;
        this._document = _document;
        this._hideAnimationDone = new Subject();
        this._contentAnimationState = 'show';
        this._disabledHours = [];
        this._disabledMinutes = [];
        this._isMouseDown = false;
        this._hoursTicks = [];
        this._minuteDigitalDisabled = false;
        this._minutesTicks = [];
        this._okButtonDisabled = false;
        this._showHours = true;
        this._radius = {
            dial: 135,
            inner: 80,
            outer: 110,
            tick: 16,
        };
        this._denominator = {
            1: 30,
            5: 6,
            10: 3,
            15: 2,
            20: 1.5,
            // 30: 1,
            // 60: 0.5
        };
        this.touchSupported = 'ontouchstart' in window;
    }
    ngOnInit() {
        this._maxTime = this.maxTime;
        this._minTime = this.minTime;
        this._selectedTime = this.value;
        const { ampm } = this._selectedTime;
        // Add disabled hours to array for PM and AM Hours
        if (this.format12 && !this.format24) {
            this._selectedTime.ampm = ampm === 'PM' ? 'AM' : 'PM';
            this._generateTick();
            this._selectedTime.ampm = this._selectedTime.ampm === 'PM' ? 'AM' : 'PM';
        }
        this._generateTick();
        this._setOkBtnDisabled();
        this._setMinuteDigitalDisabled();
    }
    ngAfterViewInit() {
        this._checkDraw();
        setTimeout(() => {
            this.focusMonitor.focusVia(this.focus, 'keyboard');
        }, 0);
        if (this.inline) {
            return;
        }
        ['mousedown', 'mouseup', 'touchend', 'touchstart'].forEach((event) => {
            this.renderer.listen(this.plate.nativeElement, event, (ev) => {
                if (event === 'mousedown' || event === 'touchstart') {
                    this._mousedown(ev, false);
                }
            });
        });
    }
    ngOnDestroy() {
        this._hideAnimationDone.complete();
    }
    markForCheck() {
        this._cdRef.markForCheck();
    }
    _onAnimationDone(event) {
        if (event.toState === 'hide') {
            this._hideAnimationDone.next();
        }
    }
    _startHideAnimation() {
        this._contentAnimationState = 'hide';
        this._cdRef.markForCheck();
    }
    _checkDraw() {
        const { h, m } = this._selectedTime;
        const value = this._showHours ? parseInt(h, 0) : parseInt(m, 0);
        const unit = Math.PI / (this._showHours ? 6 : 30);
        const radian = value * unit;
        const radius = this._showHours && value > 0 && value < 13 ? this._radius.inner : this._radius.outer;
        const xd = Math.sin(radian) * radius;
        const yd = -Math.cos(radian) * radius;
        if (this.inline) {
            return;
        }
        this.setClockHand(xd, yd);
    }
    _mousedown(e, space) {
        this._isMouseDown = true;
        const offset = this.plate.nativeElement.getBoundingClientRect();
        const isTouch = /^touch/.test(e.type);
        const x0 = offset.left + this._radius.dial;
        const y0 = offset.top + this._radius.dial;
        const dx = (isTouch ? e.touches[0] : e).clientX - x0;
        const dy = (isTouch ? e.touches[0] : e).clientY - y0;
        const z = Math.sqrt(dx * dx + dy * dy);
        let moved = false;
        if (space &&
            (z < this._radius.outer - this._radius.tick || z > this._radius.outer + this._radius.tick)) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        if (this._showHours) {
            this.setClockHand(dx, dy);
        }
        else {
            this.setClockHand(dx, dy, this.increment);
        }
        const mousemoveEventMethod = (event) => {
            if (!this.touchSupported) {
                event.preventDefault();
            }
            event.stopPropagation();
            // eslint-disable-next-line no-shadow, @typescript-eslint/no-shadow
            const isTouch = /^touch/.test(event.type);
            const x = (isTouch ? event.touches[0] : event).clientX - x0;
            const y = (isTouch ? event.touches[0] : event).clientY - y0;
            if (!moved && x === dx && y === dy) {
                return;
            }
            moved = true;
            this._ngZone.run(() => {
                this.setClockHand(x, y, this.increment);
            });
        };
        const mouseupEventMethod = (event) => {
            this._document.removeEventListener('mousemove', mousemoveEventMethod);
            if (this.touchSupported) {
                this._document.removeEventListener('touchmove', mousemoveEventMethod);
            }
            if (!this.touchSupported) {
                event.preventDefault();
            }
            const x = event.clientX - x0;
            const y = event.clientY - y0;
            if ((space || moved) && x === dx && y === dy) {
                this.setClockHand(x, y);
            }
            this._ngZone.run(() => {
                if (this.autoClose && !this._showHours) {
                    this._okBtnClicked();
                }
            });
            this._showMinutesClock();
            this.digitalMinute.nativeElement.focus();
            this._isMouseDown = false;
            this._document.removeEventListener('mouseup', mouseupEventMethod);
            if (this.touchSupported) {
                this._document.removeEventListener('touchend', mouseupEventMethod);
            }
            this.picker._emitTimeChangeEvent(this._selectedTime);
        };
        this._document.addEventListener('mousemove', mousemoveEventMethod);
        if (this.touchSupported) {
            this._document.addEventListener('touchmove', mousemoveEventMethod);
        }
        this._document.addEventListener('mouseup', mouseupEventMethod);
        if (this.touchSupported) {
            this._document.addEventListener('touchend', mouseupEventMethod);
        }
    }
    _closeBtnClicked() {
        // todo this.isOpen = false;
        const { ampm, h, m } = this._selectedTime;
        this._returnHours = this.format12 && !this.format24 ? `${h}:${m}${ampm}` : `${h}:${m}${ampm}`;
        this.picker.close();
    }
    _clearBtnClicked() {
        this._setAmPm('AM');
        this._setHour(12);
        this._setMinute(0);
        this._generateTick();
        this._showHoursClock();
        this.picker._setValue('');
        this.picker._selectionChange$.next('');
    }
    _okBtnClicked() {
        if (!this._okButtonDisabled) {
            const { ampm, h, m } = this._selectedTime;
            this._returnHours =
                this.format12 && !this.format24 ? `${h}:${m} ${ampm}` : `${h}:${m} ${ampm}`;
            this.renderer.addClass(this.picker.input, 'active');
            this.picker._selectionChange$.next(this.format12 && !this.format24 ? `${h}:${m} ${ampm}` : `${h}:${m}`);
            this.picker._setValue(this._returnHours);
            this.picker.onChangeCb(this._returnHours);
            this.picker.close();
        }
    }
    _arrowChangeHour(key) {
        const { h, ampm } = this._to24(this._selectedTime);
        const selectedHour = Number(h);
        const availableHours = [];
        this._disabledHours.map((hour, index) => !hour && availableHours.push(index));
        let toChange;
        let value = key === 'ArrowUp'
            ? availableHours.indexOf(selectedHour) + 1
            : availableHours.indexOf(selectedHour) - 1;
        value = value < 0 ? availableHours.length - 1 : value;
        value = value > availableHours.length - 1 ? 0 : value;
        toChange = availableHours[value];
        if (this.format12 && !this.format24) {
            if (toChange >= 12) {
                toChange = toChange - 12;
                if (ampm === 'AM') {
                    this._setAmPm('PM');
                }
            }
            else if (toChange <= 0 || toChange < 12) {
                if (ampm === 'PM') {
                    this._setAmPm('AM');
                }
            }
        }
        this._showHoursClock();
        this._setHour(toChange);
        this._checkDraw();
    }
    _arrowChangeMinute(key) {
        if (!this._minuteDigitalDisabled) {
            if (this._showHours) {
                this._showMinutesClock();
            }
            const { m } = this._selectedTime;
            const availableMinutes = [];
            this._generateMinutesDisable();
            this._disabledMinutes.map((disabled, i) => {
                if (!disabled) {
                    availableMinutes.push(i);
                }
            });
            let toChange;
            let value = key === 'ArrowUp'
                ? availableMinutes.indexOf(Number(m)) + 1
                : availableMinutes.indexOf(Number(m)) - 1;
            value = value < 0 ? availableMinutes.length - 1 : value;
            value = value > availableMinutes.length - 1 ? 0 : value;
            toChange = availableMinutes[value];
            this._setMinute(toChange);
            this._checkDraw();
        }
    }
    _generateMinutesDisable() {
        const rounding = this.increment ? 5 : 1;
        for (let i = 0; i < 60; i++) {
            const disableByRounding = rounding > 1 && i % rounding !== 0;
            const disabled = this._rangeMinute(i, 'min') || this._rangeMinute(i, 'max') || disableByRounding;
            this._disabledMinutes[i] = disabled;
        }
    }
    _setHour(hour) {
        if (Number(this._selectedTime.h) !== hour) {
            if (this.format12 && !this.format24) {
                hour = hour <= 0 ? 12 : hour;
                hour = hour > 12 ? 1 : hour;
            }
            else {
                hour = hour >= 24 ? 0 : hour;
                hour = hour <= -1 ? 23 : hour;
            }
            this._selectedTime.h = hour >= 10 ? `${hour}` : `0${hour}`;
            this._setMinuteDigitalDisabled();
        }
    }
    _setMinute(min) {
        if (Number(this._selectedTime.m) !== min) {
            min = min >= 60 ? 0 : min;
            min = min <= -1 ? 59 : min;
            this._selectedTime.m = min >= 10 ? `${min}` : `0${min}`;
            this._setOkBtnDisabled();
        }
    }
    _setAmPm(ampm) {
        this._selectedTime.ampm = ampm;
        this._generateTick();
        this._setOkBtnDisabled();
        this._setMinuteDigitalDisabled();
        this._checkDraw();
        this.picker._emitTimeChangeEvent(this._selectedTime);
    }
    _showHoursClock() {
        this._generateTick();
        this._showHours = true;
        this._setOkBtnDisabled();
        this._checkDraw();
    }
    _showMinutesClock() {
        if (!this.switchHoursToMinutesOnClick) {
            return;
        }
        if (!this._minuteDigitalDisabled) {
            this._showHours = false;
            this._generateTick();
            this._setOkBtnDisabled();
            this._generateMinutesDisable();
            if (this._disabledMinutes[Number(this._selectedTime.m)] === true) {
                this._setMinute(this._disabledMinutes.indexOf(false));
            }
            this._checkDraw();
        }
    }
    _generateTick() {
        if (this.format12 && !this.format24) {
            this._hoursTicks = [];
            for (let i = 1; i < 13; i++) {
                const radian = (i / 6) * Math.PI;
                const tick = {
                    hour: i.toString(),
                    left: this._radius.dial + Math.sin(radian) * this._radius.outer - this._radius.tick,
                    top: this._radius.dial - Math.cos(radian) * this._radius.outer - this._radius.tick,
                    disabled: this._rangeHour(i, 'min') || this._rangeHour(i, 'max'),
                };
                this._hoursTicks.push(tick);
            }
        }
        else {
            this._hoursTicks = [];
            for (let i = 0; i < 24; i++) {
                const radian = (i / 6) * Math.PI;
                const inner = i > 0 && i < 13;
                const radius = inner ? this._radius.inner : this._radius.outer;
                const hour = i === 0 ? '0' + i.toString() : i.toString();
                const tick = {
                    hour,
                    left: this._radius.dial + Math.sin(radian) * radius - this._radius.tick,
                    top: this._radius.dial - Math.cos(radian) * radius - this._radius.tick,
                    disabled: this._rangeHour(i, 'min') || this._rangeHour(i, 'max'),
                };
                this._hoursTicks.push(tick);
            }
        }
        this._minutesTicks = [];
        const rounding = this.increment ? 5 : 1;
        for (let i = 0; i < 60; i += 5) {
            const radian = (i / 30) * Math.PI;
            const disableByRounding = rounding > 1 && i % rounding !== 0;
            const min = i < 10 ? '0' + i.toString() : i.toString();
            const tick = {
                min,
                left: this._radius.dial + Math.sin(radian) * this._radius.outer - this._radius.tick,
                top: this._radius.dial - Math.cos(radian) * this._radius.outer - this._radius.tick,
                disabled: this._rangeMinute(i, 'min') || this._rangeMinute(i, 'max') || disableByRounding,
            };
            this._minutesTicks.push(tick);
        }
    }
    setClockHand(x, y, roundBy) {
        const rounding = roundBy ? 5 : 1;
        let radian = Math.atan2(x, -y);
        const isHours = this._showHours;
        const unit = Math.PI / (isHours ? 6 : rounding ? this._denominator[rounding] : 30);
        const z = Math.sqrt(x * x + y * y);
        const inner = isHours && z < (this._radius.outer + this._radius.inner) / 2;
        let value = this._showHours
            ? parseInt(this._selectedTime.h, 0)
            : parseInt(this._selectedTime.m, 0);
        const radius = inner && (!this.format12 || this.format24) ? this._radius.inner : this._radius.outer;
        if (radian < 0) {
            radian = Math.PI * 2 + radian;
        }
        value = Math.round(radian / unit);
        radian = value * unit;
        if (this.format12 && !this.format24 && isHours) {
            if (value === 0) {
                value = 12;
            }
            if (this._isMouseDown) {
                if (isHours && (this._rangeHour(value, 'min') || this._rangeHour(value, 'max'))) {
                    return;
                }
            }
        }
        else if ((!this.format12 || this.format24) && isHours) {
            value = !inner ? value + 12 : value;
            value = value === 24 ? 0 : value;
            value = inner && value === 0 ? 12 : value;
            value = !inner && value === 12 ? 0 : value;
            if (this._isMouseDown) {
                if (isHours && (this._rangeHour(value, 'min') || this._rangeHour(value, 'max'))) {
                    return;
                }
            }
        }
        else {
            if (rounding) {
                value *= rounding;
            }
            if (value === 60) {
                value = 0;
            }
        }
        if (isHours) {
            this.fg.nativeElement.setAttribute('class', 'mdb-timepicker-canvas-fg');
        }
        else {
            if (this._rangeMinute(value, 'min') || this._rangeMinute(value, 'max')) {
                this._cdRef.markForCheck();
                return;
            }
            if (value % 5 === 0) {
                this.fg.nativeElement.setAttribute('class', 'mdb-timepicker-canvas-fg');
            }
            else {
                this.fg.nativeElement.setAttribute('class', 'mdb-timepicker-canvas-fg active');
            }
        }
        const cx1 = Math.sin(radian) * (radius - this._radius.tick);
        const cy1 = -Math.cos(radian) * (radius - this._radius.tick);
        const cx2 = Math.sin(radian) * radius;
        const cy2 = -Math.cos(radian) * radius;
        this.hand.nativeElement.setAttribute('x2', cx1);
        this.hand.nativeElement.setAttribute('y2', cy1);
        this.bg.nativeElement.setAttribute('cx', cx2);
        this.bg.nativeElement.setAttribute('cy', cy2);
        this.fg.nativeElement.setAttribute('cx', cx2);
        this.fg.nativeElement.setAttribute('cy', cy2);
        if (this._showHours) {
            if (value !== Number(this._selectedTime.h)) {
                this._setHour(value);
                this._setMinuteDigitalDisabled();
            }
        }
        else {
            if (value !== Number(this._selectedTime.m)) {
                this._setMinute(value);
            }
        }
        this._cdRef.markForCheck();
    }
    _to24(time) {
        let hour = time.ampm === 'PM' ? Number(time.h) + 12 : Number(time.h);
        hour = hour === 12 ? 0 : hour;
        hour = hour === 24 ? 12 : hour;
        return Object.assign(Object.assign({}, time), { h: `${hour}` });
    }
    _rangeHour(index, range) {
        let status = false;
        const i = Number(this._to24(Object.assign(Object.assign({}, this._selectedTime), { h: `${index}` })).h);
        if (!this.format12 || this.format24) {
            const minH = this.minTime && Number(this._minTime.h);
            const maxH = this.maxTime && Number(this._maxTime.h);
            if (range === 'min' && this.minTime) {
                status = index < minH;
                if (status && this._maxTime && this._maxTime.h < this._minTime.h) {
                    status = false;
                }
            }
            else if (range === 'max' && this.maxTime) {
                status = index > maxH;
                if (status && this._minTime && this._minTime.h > this._maxTime.h && minH <= index) {
                    status = false;
                }
            }
        }
        else {
            const min = this._minTime && Number(this._to24(this._minTime).h);
            const max = this._maxTime && Number(this._to24(this._maxTime).h);
            if (range === 'min' && this.minTime) {
                status = i < min;
            }
            if (range === 'max' && this.maxTime) {
                status = i > max;
            }
            if (min > max) {
                status = false;
                status = min > i && i > max;
            }
        }
        this._disabledHours[i] = status;
        return status;
    }
    _rangeMinute(index, range) {
        let status = false;
        if (!this._showHours) {
            if (range === 'min' && this.minTime) {
                const isSameHour = this._minTime.h === this._selectedTime.h;
                const value = index < Number(this._minTime.m);
                status = value && isSameHour;
            }
            else if (range === 'max' && this.maxTime) {
                const isSameHour = this._maxTime.h === this._selectedTime.h;
                const value = index > Number(this._maxTime.m);
                status = value && isSameHour;
            }
        }
        if (this.format12 && !this.format24) {
            const min = this._minTime && Number(this._to24(this._minTime).h);
            const max = this._maxTime && Number(this._to24(this._maxTime).h);
            const i = Number(this._to24(this._selectedTime).h);
            if (range === 'min' && min) {
                status = i === min && index < Number(this._minTime.m);
            }
            else if (range === 'max' && max) {
                status = i === max && index > Number(this._maxTime.m);
            }
            status = status || this._disabledHours[i];
        }
        return status;
    }
    _setOkBtnDisabled() {
        const hour = Number(this._to24(this._selectedTime).h);
        this._okButtonDisabled = this._disabledHours[hour];
        if (!this._okButtonDisabled) {
            if (this._minTime &&
                this._selectedTime.h === this._minTime.h &&
                this._selectedTime.ampm === this._minTime.ampm) {
                this._okButtonDisabled = this._selectedTime.m < this._minTime.m;
            }
            if (this._maxTime &&
                this._selectedTime.h === this._maxTime.h &&
                this._selectedTime.ampm === this._maxTime.ampm) {
                this._okButtonDisabled = this._selectedTime.m > this._maxTime.m;
            }
        }
    }
    _setMinuteDigitalDisabled() {
        const { h } = this._to24(this._selectedTime);
        this._minuteDigitalDisabled = this._disabledHours[Number(h)];
    }
}
MdbTimepickerContentComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTimepickerContentComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.NgZone }, { token: i1.FocusMonitor }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component });
MdbTimepickerContentComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbTimepickerContentComponent, selector: "mdb-timepicker-content", viewQueries: [{ propertyName: "plate", first: true, predicate: ["plate"], descendants: true }, { propertyName: "hand", first: true, predicate: ["hand"], descendants: true }, { propertyName: "fg", first: true, predicate: ["fg"], descendants: true }, { propertyName: "bg", first: true, predicate: ["bg"], descendants: true }, { propertyName: "focus", first: true, predicate: ["focus"], descendants: true }, { propertyName: "digitalMinute", first: true, predicate: ["digitalMinute"], descendants: true }], ngImport: i0, template: "<div\n  [@fadeInOutTimepicker]=\"_contentAnimationState\"\n  (@fadeInOutTimepicker.done)=\"_onAnimationDone($event)\"\n  class=\"d-flex align-items-center justify-content-center flex-column shadow timepicker-container\"\n  cdkTrapFocus\n>\n  <div\n    class=\"d-flex flex-column timepicker-elements justify-content-around\"\n    [ngClass]=\"{'timepicker-elements-inline': inline }\"\n  >\n    <!-- HEADER -->\n    <div\n      class=\"timepicker-head d-flex flex-row align-items-center justify-content-center\"\n      [ngClass]=\"{'timepicker-head-inline': inline }\"\n      style=\"padding-right: 0px\"\n    >\n      <div\n        class=\"timepicker-head-content d-flex w-100 justify-content-evenly\"\n        [ngClass]=\"{'align-items-center': inline }\"\n      >\n        <!-- TIME -->\n        <div class=\"timepicker-current-wrapper\">\n          <span\n            (click)=\"_showHoursClock()\"\n            (keydown.arrowdown)=\"_arrowChangeHour($any($event).key)\"\n            (keydown.arrowup)=\"_arrowChangeHour($any($event).key)\"\n            (keydown.enter)=\"_showHoursClock()\"\n            [ngClass]=\"{'timepicker-inline-hour-icons': inline }\"\n            class=\"position-relative h-100\"\n            #focus\n            tabindex=\"0\"\n          >\n            <button\n              *ngIf=\"!inline\"\n              type=\"button\"\n              class=\"timepicker-current timepicker-hour\"\n              [ngClass]=\"{ active: _showHours }\"\n            >\n              {{ _selectedTime.h }}\n            </button>\n            <i\n              (click)=\"_arrowChangeHour('ArrowUp')\"\n              (keydown.enter)=\"_arrowChangeHour('ArrowUp')\"\n              *ngIf=\"inline\"\n              class=\"\n                fas\n                fa-chevron-up\n                position-absolute\n                text-white\n                timepicker-icon-up timepicker-icon-inline-hour\n              \"\n            ></i>\n            <button\n              *ngIf=\"inline\"\n              type=\"button\"\n              class=\"timepicker-current timepicker-hour timepicker-current-inline\"\n              tabindex=\"0\"\n              [ngClass]=\"{ active: _showHours }\"\n            >\n              {{ _selectedTime.h }}\n            </button>\n            <i\n              (click)=\"_arrowChangeHour('ArrowDown')\"\n              (keydown.enter)=\"_arrowChangeHour('ArrowDown')\"\n              *ngIf=\"inline\"\n              class=\"\n                fas\n                fa-chevron-down\n                position-absolute\n                text-white\n                timepicker-icon-down timepicker-icon-inline-hour\n              \"\n            ></i>\n          </span>\n          <button\n            type=\"button\"\n            class=\"timepicker-dot\"\n            disabled\n            [ngClass]=\"{'timepicker-current-inline': inline }\"\n          >\n            :\n          </button>\n          <span\n            (click)=\"_showMinutesClock()\"\n            (keydown.arrowdown)=\"_arrowChangeMinute($any($event).key)\"\n            (keydown.arrowup)=\"_arrowChangeMinute($any($event).key)\"\n            (keydown.enter)=\"_showMinutesClock()\"\n            [ngClass]=\"{'disabled': _minuteDigitalDisabled, 'timepicker-inline-minutes-icons': inline }\"\n            class=\"position-relative h-100\"\n            #digitalMinute\n            tabindex=\"0\"\n          >\n            <button\n              *ngIf=\"!inline\"\n              type=\"button\"\n              class=\"timepicker-current timepicker-minute\"\n              [ngClass]=\"{ 'active': !_showHours, 'timepicker-inline-minutes-icons': inline }\"\n            >\n              {{ _selectedTime.m }}\n            </button>\n            <i\n              (click)=\"_arrowChangeMinute('ArrowUp')\"\n              (keydown.enter)=\"_arrowChangeMinute('ArrowUp')\"\n              *ngIf=\"inline\"\n              class=\"\n                fas\n                fa-chevron-up\n                position-absolute\n                text-white\n                timepicker-icon-up timepicker-icon-inline-minute\n              \"\n            ></i>\n            <button\n              *ngIf=\"inline\"\n              type=\"button\"\n              class=\"timepicker-current timepicker-minute timepicker-current-inline\"\n              tabindex=\"0\"\n              [ngClass]=\"{ active: !_showHours }\"\n            >\n              {{ _selectedTime.m }}\n            </button>\n            <i\n              (click)=\"_arrowChangeMinute('ArrowDown')\"\n              (keydown.enter)=\"_arrowChangeMinute('ArrowDown')\"\n              *ngIf=\"inline\"\n              class=\"\n                fas\n                fa-chevron-down\n                position-absolute\n                text-white\n                timepicker-icon-down timepicker-icon-inline-minute\n              \"\n            ></i>\n          </span>\n        </div>\n        <div\n          class=\"d-flex justify-content-center timepicker-mode-wrapper\"\n          [ngClass]=\"{'flex-column': !inline}\"\n        >\n          <button\n            type=\"button\"\n            (click)=\"_setAmPm('AM')\"\n            (keydown.enter)=\"_setAmPm('AM')\"\n            [ngClass]=\"{ active: _selectedTime.ampm === 'AM', 'me-2 ms-4': inline }\"\n            tabindex=\"0\"\n            class=\"timepicker-hour-mode timepicker-am\"\n            *ngIf=\"format12 && !format24\"\n          >\n            {{options.amLabel}}\n          </button>\n          <button\n            type=\"button\"\n            (click)=\"_setAmPm('PM')\"\n            (keydown.enter)=\"_setAmPm('PM')\"\n            [ngClass]=\"{ active: _selectedTime.ampm === 'PM' }\"\n            tabindex=\"0\"\n            class=\"timepicker-hour-mode timepicker-pm\"\n            *ngIf=\"format12 && !format24\"\n          >\n            {{options.pmLabel}}\n          </button>\n          <button\n            *ngIf=\"inline\"\n            type=\"button\"\n            class=\"timepicker-button timepicker-submit timepicker-submit-inline py-1 px-2 mb-0\"\n            tabindex=\"0\"\n            (click)=\"_okBtnClicked()\"\n            [ngClass]=\"{ disabled: _okButtonDisabled }\"\n            type=\"button\"\n          >\n            {{ options.okLabel }}\n          </button>\n        </div>\n      </div>\n    </div>\n    <!-- /Header -->\n    <!-- Body -->\n    <div\n      *ngIf=\"!inline\"\n      class=\"timepicker-clock-wrapper d-flex justify-content-center flex-column align-items-center\"\n    >\n      <div class=\"position-relative d-flex justify-content-center align-items-center\" #plate>\n        <div class=\"timepicker-canvas\">\n          <svg class=\"timepicker-svg\" width=\"270\" height=\"270\" #svg>\n            <g transform=\"translate(140,140)\" #g>\n              <line class=\"timepicker-hand-pointer\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"-90\" #hand></line>\n              <circle class=\"timepicker-canvas-fg\" r=\"5\" cx=\"0\" cy=\"-110\" #fg></circle>\n              <circle class=\"timepicker-canvas-bg\" r=\"16\" cx=\"0\" cy=\"-110\" #bg></circle>\n              <circle class=\"timepicker-canvas-bearing\" cx=\"0\" cy=\"0\" r=\"2\" #bearing></circle>\n            </g>\n          </svg>\n        </div>\n\n        <div\n          [ngClass]=\"{ 'timepicker-dial-out': !_showHours }\"\n          [ngStyle]=\"{ visibility: !_showHours ? 'hidden' : 'visible' }\"\n          *ngIf=\"_showHours\"\n          #hoursPlate\n          class=\"timepicker-clock\"\n        >\n          <div\n            [ngClass]=\"{ disabled: tick.disabled, 'active': tick.hour === _selectedTime.h || 0 + tick.hour === _selectedTime.h}\"\n            [ngStyle]=\"{ left: tick.left + 'px', top: tick.top + 'px' }\"\n            *ngFor=\"let tick of _hoursTicks\"\n            class=\"timepicker-time-tips-hours\"\n            id=\"{{ tick.hour }}\"\n          >\n            {{ tick.hour }}\n          </div>\n        </div>\n        <div\n          [ngClass]=\"{ 'timepicker-dial-out': _showHours }\"\n          [ngStyle]=\"{ visibility: _showHours ? 'hidden' : 'visible' }\"\n          *ngIf=\"!_showHours\"\n          #minutesPlate\n          class=\"timepicker-clock\"\n        >\n          <div\n            [ngClass]=\"{ disabled: tick.disabled, 'active': tick.min === _selectedTime.m }\"\n            [ngStyle]=\"{ left: tick.left + 'px', top: tick.top + 'px' }\"\n            *ngFor=\"let tick of _minutesTicks\"\n            class=\"timepicker-time-tips-minutes\"\n          >\n            {{ tick.min }}\n          </div>\n        </div>\n      </div>\n    </div>\n    <!-- /Boody -->\n  </div>\n  <!-- Footer -->\n  <div *ngIf=\"!inline\" class=\"timepicker-footer\">\n    <div class=\"w-100 d-flex justify-content-between\">\n      <button (click)=\"_clearBtnClicked()\" class=\"timepicker-button timepicker-clear\" type=\"button\">\n        {{ options.clearLabel }}\n      </button>\n      <button (click)=\"_closeBtnClicked()\" class=\"timepicker-button timepicker-close\" type=\"button\">\n        {{ options.cancelLabel }}\n      </button>\n      <button\n        (click)=\"_okBtnClicked()\"\n        [ngClass]=\"{ disabled: _okButtonDisabled }\"\n        class=\"timepicker-button timepicker-ok\"\n        type=\"button\"\n      >\n        {{ options.okLabel }}\n      </button>\n    </div>\n  </div>\n  <!-- /Footer -->\n</div>\n", directives: [{ type: i1.CdkTrapFocus, selector: "[cdkTrapFocus]", inputs: ["cdkTrapFocus", "cdkTrapFocusAutoCapture"], exportAs: ["cdkTrapFocus"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], animations: [
        trigger('fadeInOutTimepicker', [
            state('void', style({ opacity: 0 })),
            state('hide', style({ opacity: 0 })),
            state('show', style({ opacity: 1 })),
            transition('* <=> *', animate('300ms ease-in-out')),
        ]),
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTimepickerContentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-timepicker-content', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, animations: [
                        trigger('fadeInOutTimepicker', [
                            state('void', style({ opacity: 0 })),
                            state('hide', style({ opacity: 0 })),
                            state('show', style({ opacity: 1 })),
                            transition('* <=> *', animate('300ms ease-in-out')),
                        ]),
                    ], template: "<div\n  [@fadeInOutTimepicker]=\"_contentAnimationState\"\n  (@fadeInOutTimepicker.done)=\"_onAnimationDone($event)\"\n  class=\"d-flex align-items-center justify-content-center flex-column shadow timepicker-container\"\n  cdkTrapFocus\n>\n  <div\n    class=\"d-flex flex-column timepicker-elements justify-content-around\"\n    [ngClass]=\"{'timepicker-elements-inline': inline }\"\n  >\n    <!-- HEADER -->\n    <div\n      class=\"timepicker-head d-flex flex-row align-items-center justify-content-center\"\n      [ngClass]=\"{'timepicker-head-inline': inline }\"\n      style=\"padding-right: 0px\"\n    >\n      <div\n        class=\"timepicker-head-content d-flex w-100 justify-content-evenly\"\n        [ngClass]=\"{'align-items-center': inline }\"\n      >\n        <!-- TIME -->\n        <div class=\"timepicker-current-wrapper\">\n          <span\n            (click)=\"_showHoursClock()\"\n            (keydown.arrowdown)=\"_arrowChangeHour($any($event).key)\"\n            (keydown.arrowup)=\"_arrowChangeHour($any($event).key)\"\n            (keydown.enter)=\"_showHoursClock()\"\n            [ngClass]=\"{'timepicker-inline-hour-icons': inline }\"\n            class=\"position-relative h-100\"\n            #focus\n            tabindex=\"0\"\n          >\n            <button\n              *ngIf=\"!inline\"\n              type=\"button\"\n              class=\"timepicker-current timepicker-hour\"\n              [ngClass]=\"{ active: _showHours }\"\n            >\n              {{ _selectedTime.h }}\n            </button>\n            <i\n              (click)=\"_arrowChangeHour('ArrowUp')\"\n              (keydown.enter)=\"_arrowChangeHour('ArrowUp')\"\n              *ngIf=\"inline\"\n              class=\"\n                fas\n                fa-chevron-up\n                position-absolute\n                text-white\n                timepicker-icon-up timepicker-icon-inline-hour\n              \"\n            ></i>\n            <button\n              *ngIf=\"inline\"\n              type=\"button\"\n              class=\"timepicker-current timepicker-hour timepicker-current-inline\"\n              tabindex=\"0\"\n              [ngClass]=\"{ active: _showHours }\"\n            >\n              {{ _selectedTime.h }}\n            </button>\n            <i\n              (click)=\"_arrowChangeHour('ArrowDown')\"\n              (keydown.enter)=\"_arrowChangeHour('ArrowDown')\"\n              *ngIf=\"inline\"\n              class=\"\n                fas\n                fa-chevron-down\n                position-absolute\n                text-white\n                timepicker-icon-down timepicker-icon-inline-hour\n              \"\n            ></i>\n          </span>\n          <button\n            type=\"button\"\n            class=\"timepicker-dot\"\n            disabled\n            [ngClass]=\"{'timepicker-current-inline': inline }\"\n          >\n            :\n          </button>\n          <span\n            (click)=\"_showMinutesClock()\"\n            (keydown.arrowdown)=\"_arrowChangeMinute($any($event).key)\"\n            (keydown.arrowup)=\"_arrowChangeMinute($any($event).key)\"\n            (keydown.enter)=\"_showMinutesClock()\"\n            [ngClass]=\"{'disabled': _minuteDigitalDisabled, 'timepicker-inline-minutes-icons': inline }\"\n            class=\"position-relative h-100\"\n            #digitalMinute\n            tabindex=\"0\"\n          >\n            <button\n              *ngIf=\"!inline\"\n              type=\"button\"\n              class=\"timepicker-current timepicker-minute\"\n              [ngClass]=\"{ 'active': !_showHours, 'timepicker-inline-minutes-icons': inline }\"\n            >\n              {{ _selectedTime.m }}\n            </button>\n            <i\n              (click)=\"_arrowChangeMinute('ArrowUp')\"\n              (keydown.enter)=\"_arrowChangeMinute('ArrowUp')\"\n              *ngIf=\"inline\"\n              class=\"\n                fas\n                fa-chevron-up\n                position-absolute\n                text-white\n                timepicker-icon-up timepicker-icon-inline-minute\n              \"\n            ></i>\n            <button\n              *ngIf=\"inline\"\n              type=\"button\"\n              class=\"timepicker-current timepicker-minute timepicker-current-inline\"\n              tabindex=\"0\"\n              [ngClass]=\"{ active: !_showHours }\"\n            >\n              {{ _selectedTime.m }}\n            </button>\n            <i\n              (click)=\"_arrowChangeMinute('ArrowDown')\"\n              (keydown.enter)=\"_arrowChangeMinute('ArrowDown')\"\n              *ngIf=\"inline\"\n              class=\"\n                fas\n                fa-chevron-down\n                position-absolute\n                text-white\n                timepicker-icon-down timepicker-icon-inline-minute\n              \"\n            ></i>\n          </span>\n        </div>\n        <div\n          class=\"d-flex justify-content-center timepicker-mode-wrapper\"\n          [ngClass]=\"{'flex-column': !inline}\"\n        >\n          <button\n            type=\"button\"\n            (click)=\"_setAmPm('AM')\"\n            (keydown.enter)=\"_setAmPm('AM')\"\n            [ngClass]=\"{ active: _selectedTime.ampm === 'AM', 'me-2 ms-4': inline }\"\n            tabindex=\"0\"\n            class=\"timepicker-hour-mode timepicker-am\"\n            *ngIf=\"format12 && !format24\"\n          >\n            {{options.amLabel}}\n          </button>\n          <button\n            type=\"button\"\n            (click)=\"_setAmPm('PM')\"\n            (keydown.enter)=\"_setAmPm('PM')\"\n            [ngClass]=\"{ active: _selectedTime.ampm === 'PM' }\"\n            tabindex=\"0\"\n            class=\"timepicker-hour-mode timepicker-pm\"\n            *ngIf=\"format12 && !format24\"\n          >\n            {{options.pmLabel}}\n          </button>\n          <button\n            *ngIf=\"inline\"\n            type=\"button\"\n            class=\"timepicker-button timepicker-submit timepicker-submit-inline py-1 px-2 mb-0\"\n            tabindex=\"0\"\n            (click)=\"_okBtnClicked()\"\n            [ngClass]=\"{ disabled: _okButtonDisabled }\"\n            type=\"button\"\n          >\n            {{ options.okLabel }}\n          </button>\n        </div>\n      </div>\n    </div>\n    <!-- /Header -->\n    <!-- Body -->\n    <div\n      *ngIf=\"!inline\"\n      class=\"timepicker-clock-wrapper d-flex justify-content-center flex-column align-items-center\"\n    >\n      <div class=\"position-relative d-flex justify-content-center align-items-center\" #plate>\n        <div class=\"timepicker-canvas\">\n          <svg class=\"timepicker-svg\" width=\"270\" height=\"270\" #svg>\n            <g transform=\"translate(140,140)\" #g>\n              <line class=\"timepicker-hand-pointer\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"-90\" #hand></line>\n              <circle class=\"timepicker-canvas-fg\" r=\"5\" cx=\"0\" cy=\"-110\" #fg></circle>\n              <circle class=\"timepicker-canvas-bg\" r=\"16\" cx=\"0\" cy=\"-110\" #bg></circle>\n              <circle class=\"timepicker-canvas-bearing\" cx=\"0\" cy=\"0\" r=\"2\" #bearing></circle>\n            </g>\n          </svg>\n        </div>\n\n        <div\n          [ngClass]=\"{ 'timepicker-dial-out': !_showHours }\"\n          [ngStyle]=\"{ visibility: !_showHours ? 'hidden' : 'visible' }\"\n          *ngIf=\"_showHours\"\n          #hoursPlate\n          class=\"timepicker-clock\"\n        >\n          <div\n            [ngClass]=\"{ disabled: tick.disabled, 'active': tick.hour === _selectedTime.h || 0 + tick.hour === _selectedTime.h}\"\n            [ngStyle]=\"{ left: tick.left + 'px', top: tick.top + 'px' }\"\n            *ngFor=\"let tick of _hoursTicks\"\n            class=\"timepicker-time-tips-hours\"\n            id=\"{{ tick.hour }}\"\n          >\n            {{ tick.hour }}\n          </div>\n        </div>\n        <div\n          [ngClass]=\"{ 'timepicker-dial-out': _showHours }\"\n          [ngStyle]=\"{ visibility: _showHours ? 'hidden' : 'visible' }\"\n          *ngIf=\"!_showHours\"\n          #minutesPlate\n          class=\"timepicker-clock\"\n        >\n          <div\n            [ngClass]=\"{ disabled: tick.disabled, 'active': tick.min === _selectedTime.m }\"\n            [ngStyle]=\"{ left: tick.left + 'px', top: tick.top + 'px' }\"\n            *ngFor=\"let tick of _minutesTicks\"\n            class=\"timepicker-time-tips-minutes\"\n          >\n            {{ tick.min }}\n          </div>\n        </div>\n      </div>\n    </div>\n    <!-- /Boody -->\n  </div>\n  <!-- Footer -->\n  <div *ngIf=\"!inline\" class=\"timepicker-footer\">\n    <div class=\"w-100 d-flex justify-content-between\">\n      <button (click)=\"_clearBtnClicked()\" class=\"timepicker-button timepicker-clear\" type=\"button\">\n        {{ options.clearLabel }}\n      </button>\n      <button (click)=\"_closeBtnClicked()\" class=\"timepicker-button timepicker-close\" type=\"button\">\n        {{ options.cancelLabel }}\n      </button>\n      <button\n        (click)=\"_okBtnClicked()\"\n        [ngClass]=\"{ disabled: _okButtonDisabled }\"\n        class=\"timepicker-button timepicker-ok\"\n        type=\"button\"\n      >\n        {{ options.okLabel }}\n      </button>\n    </div>\n  </div>\n  <!-- /Footer -->\n</div>\n" }]
        }], ctorParameters: function () {
        return [{ type: i0.ChangeDetectorRef }, { type: i0.NgZone }, { type: i1.FocusMonitor }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [DOCUMENT]
                    }] }];
    }, propDecorators: { plate: [{
                type: ViewChild,
                args: ['plate', { static: false }]
            }], hand: [{
                type: ViewChild,
                args: ['hand', { static: false }]
            }], fg: [{
                type: ViewChild,
                args: ['fg', { static: false }]
            }], bg: [{
                type: ViewChild,
                args: ['bg', { static: false }]
            }], focus: [{
                type: ViewChild,
                args: ['focus', { static: false }]
            }], digitalMinute: [{
                type: ViewChild,
                args: ['digitalMinute', { static: false }]
            }] } });

class MdbTimepickerComponent {
    constructor(_document, _cdRef, _overlay, _vcr, _renderer) {
        this._document = _document;
        this._cdRef = _cdRef;
        this._overlay = _overlay;
        this._vcr = _vcr;
        this._renderer = _renderer;
        this._autoClose = false;
        this._format12 = true;
        this._appendValidationInfo = true;
        this._bodyID = true;
        this._closeModalOnMinutesClick = true;
        this._disabled = false;
        this._footerID = true;
        this._format24 = false;
        this.headID = '';
        this._increment = false;
        this._inline = false;
        this.maxTime = '';
        this.minTime = '';
        this.modalID = '';
        this._overflowHidden = true;
        this.pickerID = '';
        this._switchHoursToMinutesOnClick = true;
        this.options = {
            cancelLabel: 'Cancel',
            clearLabel: 'Clear',
            okLabel: 'Ok',
            pmLabel: 'PM',
            amLabel: 'AM',
        };
        this.timeChange = new EventEmitter();
        this.closed = new EventEmitter();
        this.opened = new EventEmitter();
        this._value = '12:00AM';
        this._selectionChange$ = new Subject();
        this.onChangeCb = () => { };
        this.onTouchedCb = () => { };
    }
    get autoClose() {
        return this._autoClose;
    }
    set autoClose(value) {
        this._autoClose = coerceBooleanProperty(value);
    }
    get format12() {
        return this._format12;
    }
    set format12(value) {
        this._format12 = coerceBooleanProperty(value);
    }
    get appendValidationInfo() {
        return this._appendValidationInfo;
    }
    set appendValidationInfo(value) {
        this._appendValidationInfo = coerceBooleanProperty(value);
    }
    get bodyID() {
        return this._bodyID;
    }
    set bodyID(value) {
        this._bodyID = coerceBooleanProperty(value);
    }
    get closeModalOnMinutesClick() {
        return this._closeModalOnMinutesClick;
    }
    set closeModalOnMinutesClick(value) {
        this._closeModalOnMinutesClick = coerceBooleanProperty(value);
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    get footerID() {
        return this._footerID;
    }
    set footerID(value) {
        this._footerID = coerceBooleanProperty(value);
    }
    get format24() {
        return this._format24;
    }
    set format24(value) {
        this._format24 = coerceBooleanProperty(value);
    }
    get increment() {
        return this._increment;
    }
    set increment(value) {
        this._increment = coerceBooleanProperty(value);
    }
    get inline() {
        return this._inline;
    }
    set inline(value) {
        this._inline = coerceBooleanProperty(value);
    }
    get overflowHidden() {
        return this._overflowHidden;
    }
    set overflowHidden(value) {
        this._overflowHidden = coerceBooleanProperty(value);
    }
    get switchHoursToMinutesOnClick() {
        return this._switchHoursToMinutesOnClick;
    }
    set switchHoursToMinutesOnClick(value) {
        this._switchHoursToMinutesOnClick = coerceBooleanProperty(value);
    }
    _patchInputValues() {
        this._contentRef.instance.picker = this;
        this._contentRef.instance.autoClose = this.autoClose;
        this._contentRef.instance.options = this.options;
        this._contentRef.instance.increment = this.increment;
        this._contentRef.instance.format12 = this.format12;
        this._contentRef.instance.format24 = this.format24;
        this._contentRef.instance.value = this._timeToObj(this._value);
        this._contentRef.instance.inline = this.inline;
        this._contentRef.instance.switchHoursToMinutesOnClick = this.switchHoursToMinutesOnClick;
        if (this.maxTime) {
            this._contentRef.instance.maxTime = this._timeToObj(this.maxTime);
        }
        if (this.minTime) {
            this._contentRef.instance.minTime = this._timeToObj(this.minTime);
        }
        this._contentRef.instance.markForCheck();
    }
    _timeToObj(time) {
        const round = (x, roundBy) => {
            return x % roundBy < Math.round(roundBy / 2)
                ? x % roundBy === 0
                    ? x
                    : Math.ceil(x / roundBy) * roundBy
                : Math.floor(x / roundBy) * roundBy;
        };
        function toString(val) {
            return val < 10 ? `0${val}` : `${val}`;
        }
        const hour = Number(time.split(':')[0]);
        let minute = Number(time.split(':')[1].match(/\d+/g));
        const ampm = time.match(/AM|PM/) || [''];
        if (this.increment) {
            minute = round(minute, 5);
        }
        return {
            h: toString(hour),
            m: toString(minute),
            ampm: ampm[0],
        };
    }
    markForCheck() {
        this._cdRef.markForCheck();
    }
    open() {
        if (this.disabled) {
            return;
        }
        let overlayRef = this._overlayRef;
        if (!overlayRef) {
            this._portal = new ComponentPortal(MdbTimepickerContentComponent, this._vcr);
            overlayRef = this._overlay.create(this._getOverlayConfig());
            this._overlayRef = overlayRef;
        }
        if (overlayRef && this._overlayRef && !overlayRef.hasAttached()) {
            this._contentRef = this._overlayRef.attach(this._portal);
            this._patchInputValues();
            this._listenToOutsideClick();
        }
        if (!this.inline && this._hasVerticalScroll()) {
            this._renderer.setStyle(this._document.body, 'overflow', 'hidden');
            this._renderer.setStyle(this._document.body, 'padding-right', '15px');
        }
        this._emitTimeOpenedEvent();
    }
    close() {
        this._contentRef.instance._startHideAnimation();
        if (this._overlayRef.backdropElement) {
            this._renderer.setStyle(this._overlayRef.backdropElement, 'opacity', '0');
        }
        this._contentRef.instance._hideAnimationDone.pipe(take(1)).subscribe(() => {
            if (this._overlayRef && this._overlayRef.hasAttached()) {
                this._destroyOverlay();
            }
            if (!this.inline) {
                this._renderer.removeStyle(this._document.body, 'overflow');
                this._renderer.removeStyle(this._document.body, 'padding-right');
            }
            this._emitTimeClosedEvent();
            if (this.toggle) {
                this.toggle.button.nativeElement.focus();
            }
            else {
                this.input.focus();
            }
        });
    }
    _emitTimeChangeEvent(value) {
        this.timeChange.emit(value);
    }
    _emitTimeClosedEvent() {
        this.closed.emit();
    }
    _emitTimeOpenedEvent() {
        this.opened.emit();
    }
    _setValue(value) {
        if (value) {
            this._value = value;
        }
        else {
            this._value = '12:00 AM';
        }
        if (value === '') {
            this._renderer.removeClass(this.input, 'active');
        }
        else {
            this._renderer.addClass(this.input, 'active');
        }
    }
    setInput(input) {
        this.input = input.el.nativeElement;
        input._valueChange.subscribe((val) => {
            let match;
            if (this.format24) {
                match = val && val.match(/\d\d:\d\d/gi);
            }
            else {
                match = val && val.match(/\d\d:\d\d\s?(AM|PM)/gi);
            }
            if (match) {
                this._value = match[0];
            }
            else {
                this._value = '12:00 AM';
            }
        });
    }
    registerOnChange(fn) {
        this.onChangeCb = fn;
    }
    registerOnTouched(fn) {
        this.onTouchedCb = fn;
    }
    _hasVerticalScroll() {
        return this._document.body.scrollHeight > this._document.documentElement.clientHeight;
    }
    _getOverlayConfig() {
        const inlinePositionStrategy = this._overlay
            .position()
            .flexibleConnectedTo(this.input)
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
    _destroyOverlay() {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
        }
    }
    _listenToOutsideClick() {
        if (this._overlayRef) {
            merge(this._overlayRef.outsidePointerEvents(), this._overlayRef.detachments(), this._overlayRef.keydownEvents().pipe(filter((event) => {
                // Closing on alt + up is only valid when there's an input associated with the datepicker.
                return event.key === 'Escape';
            }))).subscribe((event) => {
                if (event) {
                    event.preventDefault();
                }
                this.close();
            });
        }
    }
    ngOnDestroy() {
        this._destroyOverlay();
    }
}
MdbTimepickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTimepickerComponent, deps: [{ token: DOCUMENT }, { token: i0.ChangeDetectorRef }, { token: i1$1.Overlay }, { token: i0.ViewContainerRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
MdbTimepickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbTimepickerComponent, selector: "mdb-timepicker", inputs: { autoClose: "autoClose", format12: "format12", appendValidationInfo: "appendValidationInfo", bodyID: "bodyID", closeModalOnMinutesClick: "closeModalOnMinutesClick", disabled: "disabled", footerID: "footerID", format24: "format24", headID: "headID", increment: "increment", inline: "inline", maxTime: "maxTime", minTime: "minTime", modalID: "modalID", overflowHidden: "overflowHidden", pickerID: "pickerID", switchHoursToMinutesOnClick: "switchHoursToMinutesOnClick", options: "options" }, outputs: { timeChange: "timeChange", closed: "closed", opened: "opened" }, exportAs: ["mdbTimePicker"], ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTimepickerComponent, decorators: [{
            type: Component,
            args: [{
                    template: '',
                    selector: 'mdb-timepicker',
                    exportAs: 'mdbTimePicker',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Inject,
                        args: [DOCUMENT]
                    }] }, { type: i0.ChangeDetectorRef }, { type: i1$1.Overlay }, { type: i0.ViewContainerRef }, { type: i0.Renderer2 }];
    }, propDecorators: { autoClose: [{
                type: Input
            }], format12: [{
                type: Input
            }], appendValidationInfo: [{
                type: Input
            }], bodyID: [{
                type: Input
            }], closeModalOnMinutesClick: [{
                type: Input
            }], disabled: [{
                type: Input
            }], footerID: [{
                type: Input
            }], format24: [{
                type: Input
            }], headID: [{
                type: Input
            }], increment: [{
                type: Input
            }], inline: [{
                type: Input
            }], maxTime: [{
                type: Input
            }], minTime: [{
                type: Input
            }], modalID: [{
                type: Input
            }], overflowHidden: [{
                type: Input
            }], pickerID: [{
                type: Input
            }], switchHoursToMinutesOnClick: [{
                type: Input
            }], options: [{
                type: Input
            }], timeChange: [{
                type: Output
            }], closed: [{
                type: Output
            }], opened: [{
                type: Output
            }] } });

class MdbTimepickerToggleComponent {
    constructor(_cdRef) {
        this._cdRef = _cdRef;
        this.icon = 'far fa-clock';
        this.disabled = false;
    }
    handleClick() {
        if (this.disabled) {
            return;
        }
        this.mdbTimepickerToggle.open();
    }
    ngOnInit() {
        this.mdbTimepickerToggle.toggle = this;
    }
    markForCheck() {
        this._cdRef.markForCheck();
    }
}
MdbTimepickerToggleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTimepickerToggleComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MdbTimepickerToggleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbTimepickerToggleComponent, selector: "mdb-timepicker-toggle", inputs: { mdbTimepickerToggle: "mdbTimepickerToggle", icon: "icon", disabled: "disabled" }, host: { listeners: { "click": "handleClick()" } }, viewQueries: [{ propertyName: "button", first: true, predicate: ["button"], descendants: true, static: true }], ngImport: i0, template: "<button\n  type=\"button\"\n  [attr.disabled]=\"disabled ? 'disable' : null\"\n  #button\n  class=\"timepicker-toggle-button\"\n>\n  <i class=\"{{ icon }} fa-sm timepicker-icon\"></i>\n</button>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTimepickerToggleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-timepicker-toggle', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  type=\"button\"\n  [attr.disabled]=\"disabled ? 'disable' : null\"\n  #button\n  class=\"timepicker-toggle-button\"\n>\n  <i class=\"{{ icon }} fa-sm timepicker-icon\"></i>\n</button>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { button: [{
                type: ViewChild,
                args: ['button', { static: true }]
            }], mdbTimepickerToggle: [{
                type: Input
            }], icon: [{
                type: Input
            }], disabled: [{
                type: Input
            }], handleClick: [{
                type: HostListener,
                args: ['click']
            }] } });

const MDB_TIMEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
    useExisting: forwardRef(() => MdbTimepickerDirective),
    multi: true,
};
class MdbTimepickerDirective {
    constructor(el) {
        this.el = el;
        this._valueChange = new EventEmitter();
        this.onChange = () => { };
        this.onTouched = () => { };
    }
    set value(value) {
        this._value = value;
        this._valueChange.emit(this._value);
        if (value) {
            this.el.nativeElement.value = value;
        }
        else {
            this.el.nativeElement.value = null;
        }
    }
    get value() {
        return this._value;
    }
    handleInput(event) {
        this.onChange(event.target.value);
        this._valueChange.emit(event.target.value);
    }
    ngAfterViewInit() {
        this.mdbTimepicker.setInput(this);
        this._valueChange.emit(this._value);
        this.mdbTimepicker._selectionChange$.subscribe((selectedValue) => {
            this.value = selectedValue;
            this.onChange(selectedValue);
        });
    }
    writeValue(value) {
        this.value = value;
        this.mdbTimepicker._selectionChange$.next(this._value);
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
}
MdbTimepickerDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTimepickerDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
MdbTimepickerDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.7", type: MdbTimepickerDirective, selector: "[mdbTimepicker]", inputs: { mdbTimepicker: "mdbTimepicker", value: "value" }, host: { listeners: { "blur": "onTouched()", "input": "handleInput($event)" } }, providers: [MDB_TIMEPICKER_VALUE_ACCESSOR], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTimepickerDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: '[mdbTimepicker]',
                    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
                    host: { '(blur)': 'onTouched()' },
                    providers: [MDB_TIMEPICKER_VALUE_ACCESSOR],
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { mdbTimepicker: [{
                type: Input
            }], value: [{
                type: Input
            }], handleInput: [{
                type: HostListener,
                args: ['input', ['$event']]
            }] } });

class MdbTimepickerModule {
}
MdbTimepickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTimepickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbTimepickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTimepickerModule, bootstrap: [MdbTimepickerContentComponent], declarations: [MdbTimepickerComponent,
        MdbTimepickerToggleComponent,
        MdbTimepickerDirective,
        MdbTimepickerContentComponent], imports: [CommonModule, OverlayModule, A11yModule], exports: [MdbTimepickerComponent, MdbTimepickerToggleComponent, MdbTimepickerDirective] });
MdbTimepickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTimepickerModule, imports: [[CommonModule, OverlayModule, A11yModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTimepickerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, OverlayModule, A11yModule],
                    declarations: [
                        MdbTimepickerComponent,
                        MdbTimepickerToggleComponent,
                        MdbTimepickerDirective,
                        MdbTimepickerContentComponent,
                    ],
                    exports: [MdbTimepickerComponent, MdbTimepickerToggleComponent, MdbTimepickerDirective],
                    bootstrap: [MdbTimepickerContentComponent],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MDB_TIMEPICKER_VALUE_ACCESSOR, MdbTimepickerComponent, MdbTimepickerContentComponent, MdbTimepickerDirective, MdbTimepickerModule, MdbTimepickerToggleComponent };
//# sourceMappingURL=mdb-angular-ui-kit-timepicker.mjs.map
