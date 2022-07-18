import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, Inject, } from '@angular/core';
import { OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { merge } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { MdbTimepickerContentComponent } from './timepicker.content';
import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
export class MdbTimepickerComponent {
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
MdbTimepickerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTimepickerComponent, deps: [{ token: DOCUMENT }, { token: i0.ChangeDetectorRef }, { token: i1.Overlay }, { token: i0.ViewContainerRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
MdbTimepickerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbTimepickerComponent, selector: "mdb-timepicker", inputs: { autoClose: "autoClose", format12: "format12", appendValidationInfo: "appendValidationInfo", bodyID: "bodyID", closeModalOnMinutesClick: "closeModalOnMinutesClick", disabled: "disabled", footerID: "footerID", format24: "format24", headID: "headID", increment: "increment", inline: "inline", maxTime: "maxTime", minTime: "minTime", modalID: "modalID", overflowHidden: "overflowHidden", pickerID: "pickerID", switchHoursToMinutesOnClick: "switchHoursToMinutesOnClick", options: "options" }, outputs: { timeChange: "timeChange", closed: "closed", opened: "opened" }, exportAs: ["mdbTimePicker"], ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTimepickerComponent, decorators: [{
            type: Component,
            args: [{
                    template: '',
                    selector: 'mdb-timepicker',
                    exportAs: 'mdbTimePicker',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ChangeDetectorRef }, { type: i1.Overlay }, { type: i0.ViewContainerRef }, { type: i0.Renderer2 }]; }, propDecorators: { autoClose: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvdGltZXBpY2tlci90aW1lcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULHVCQUF1QixFQUd2QixLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFJWixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF1QixhQUFhLEVBQTBCLE1BQU0sc0JBQXNCLENBQUM7QUFDbEcsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUdyRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQWdCLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7OztBQVE1RSxNQUFNLE9BQU8sc0JBQXNCO0lBMElqQyxZQUM0QixTQUFTLEVBQzNCLE1BQXlCLEVBQ3pCLFFBQWlCLEVBQ2pCLElBQXNCLEVBQ3RCLFNBQW9CO1FBSkYsY0FBUyxHQUFULFNBQVMsQ0FBQTtRQUMzQixXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUN6QixhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLFNBQUksR0FBSixJQUFJLENBQWtCO1FBQ3RCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUF2SXRCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFTbkIsY0FBUyxHQUFHLElBQUksQ0FBQztR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ZWN0aW9uU3RyYXRlZ3ksXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIENvbXBvbmVudFJlZixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPbkRlc3Ryb3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBSZW5kZXJlcjIsXG4gIEluamVjdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPdmVybGF5UmVmLCBPdmVybGF5LCBPdmVybGF5Q29uZmlnLCBDb25uZWN0aW9uUG9zaXRpb25QYWlyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ29tcG9uZW50UG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBtZXJnZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTWRiVGltZXBpY2tlckNvbnRlbnRDb21wb25lbnQgfSBmcm9tICcuL3RpbWVwaWNrZXIuY29udGVudCc7XG5pbXBvcnQgeyBNZGJUaW1lcGlja2VyVG9nZ2xlQ29tcG9uZW50IH0gZnJvbSAnLi90aW1lcGlja2VyLXRvZ2dsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3B0aW9ucywgU2VsZWN0ZWRUaW1lIH0gZnJvbSAnLi90aW1lcGlja2VyLmludGVyZmFjZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5cbkBDb21wb25lbnQoe1xuICB0ZW1wbGF0ZTogJycsXG4gIHNlbGVjdG9yOiAnbWRiLXRpbWVwaWNrZXInLFxuICBleHBvcnRBczogJ21kYlRpbWVQaWNrZXInLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWRiVGltZXBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpXG4gIGdldCBhdXRvQ2xvc2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2F1dG9DbG9zZTtcbiAgfVxuICBzZXQgYXV0b0Nsb3NlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fYXV0b0Nsb3NlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9hdXRvQ2xvc2UgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBnZXQgZm9ybWF0MTIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Zvcm1hdDEyO1xuICB9XG4gIHNldCBmb3JtYXQxMih2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Zvcm1hdDEyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9mb3JtYXQxMiA9IHRydWU7XG5cbiAgQElucHV0KClcbiAgZ2V0IGFwcGVuZFZhbGlkYXRpb25JbmZvKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9hcHBlbmRWYWxpZGF0aW9uSW5mbztcbiAgfVxuICBzZXQgYXBwZW5kVmFsaWRhdGlvbkluZm8odmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9hcHBlbmRWYWxpZGF0aW9uSW5mbyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfYXBwZW5kVmFsaWRhdGlvbkluZm8gPSB0cnVlO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBib2R5SUQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2JvZHlJRDtcbiAgfVxuICBzZXQgYm9keUlEKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fYm9keUlEID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9ib2R5SUQgPSB0cnVlO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBjbG9zZU1vZGFsT25NaW51dGVzQ2xpY2soKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Nsb3NlTW9kYWxPbk1pbnV0ZXNDbGljaztcbiAgfVxuICBzZXQgY2xvc2VNb2RhbE9uTWludXRlc0NsaWNrKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fY2xvc2VNb2RhbE9uTWludXRlc0NsaWNrID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9jbG9zZU1vZGFsT25NaW51dGVzQ2xpY2sgPSB0cnVlO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgZ2V0IGZvb3RlcklEKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9mb290ZXJJRDtcbiAgfVxuICBzZXQgZm9vdGVySUQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9mb290ZXJJRCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfZm9vdGVySUQgPSB0cnVlO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBmb3JtYXQyNCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZm9ybWF0MjQ7XG4gIH1cbiAgc2V0IGZvcm1hdDI0KHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZm9ybWF0MjQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2Zvcm1hdDI0ID0gZmFsc2U7XG5cbiAgQElucHV0KCkgaGVhZElEID0gJyc7XG5cbiAgQElucHV0KClcbiAgZ2V0IGluY3JlbWVudCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faW5jcmVtZW50O1xuICB9XG4gIHNldCBpbmNyZW1lbnQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pbmNyZW1lbnQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2luY3JlbWVudCA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBpbmxpbmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lubGluZTtcbiAgfVxuICBzZXQgaW5saW5lKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5faW5saW5lID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9pbmxpbmUgPSBmYWxzZTtcblxuICBASW5wdXQoKSBtYXhUaW1lID0gJyc7XG4gIEBJbnB1dCgpIG1pblRpbWUgPSAnJztcbiAgQElucHV0KCkgbW9kYWxJRCA9ICcnO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBvdmVyZmxvd0hpZGRlbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fb3ZlcmZsb3dIaWRkZW47XG4gIH1cbiAgc2V0IG92ZXJmbG93SGlkZGVuKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fb3ZlcmZsb3dIaWRkZW4gPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX292ZXJmbG93SGlkZGVuID0gdHJ1ZTtcblxuICBASW5wdXQoKSBwaWNrZXJJRCA9ICcnO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBzd2l0Y2hIb3Vyc1RvTWludXRlc09uQ2xpY2soKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3N3aXRjaEhvdXJzVG9NaW51dGVzT25DbGljaztcbiAgfVxuICBzZXQgc3dpdGNoSG91cnNUb01pbnV0ZXNPbkNsaWNrKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc3dpdGNoSG91cnNUb01pbnV0ZXNPbkNsaWNrID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9zd2l0Y2hIb3Vyc1RvTWludXRlc09uQ2xpY2sgPSB0cnVlO1xuXG4gIEBJbnB1dCgpIG9wdGlvbnM6IE9wdGlvbnMgPSB7XG4gICAgY2FuY2VsTGFiZWw6ICdDYW5jZWwnLFxuICAgIGNsZWFyTGFiZWw6ICdDbGVhcicsXG4gICAgb2tMYWJlbDogJ09rJyxcbiAgICBwbUxhYmVsOiAnUE0nLFxuICAgIGFtTGFiZWw6ICdBTScsXG4gIH07XG5cbiAgQE91dHB1dCgpIHRpbWVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxTZWxlY3RlZFRpbWU+ID0gbmV3IEV2ZW50RW1pdHRlcjxTZWxlY3RlZFRpbWU+KCk7XG4gIEBPdXRwdXQoKSBjbG9zZWQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIG9wZW5lZDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIHByaXZhdGUgX3ZhbHVlID0gJzEyOjAwQU0nO1xuICBwcml2YXRlIF9jb250ZW50UmVmOiBDb21wb25lbnRSZWY8TWRiVGltZXBpY2tlckNvbnRlbnRDb21wb25lbnQ+O1xuICBwcml2YXRlIF9vdmVybGF5UmVmOiBPdmVybGF5UmVmIHwgbnVsbDtcbiAgcHJpdmF0ZSBfcG9ydGFsOiBDb21wb25lbnRQb3J0YWw8TWRiVGltZXBpY2tlckNvbnRlbnRDb21wb25lbnQ+O1xuICBwdWJsaWMgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gIHB1YmxpYyB0b2dnbGU6IE1kYlRpbWVwaWNrZXJUb2dnbGVDb21wb25lbnQ7XG5cbiAgcHVibGljIF9zZWxlY3Rpb25DaGFuZ2UkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50LFxuICAgIHByaXZhdGUgX2NkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIF9vdmVybGF5OiBPdmVybGF5LFxuICAgIHByaXZhdGUgX3ZjcjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyXG4gICkge31cblxuICBwcml2YXRlIF9wYXRjaElucHV0VmFsdWVzKCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbnRlbnRSZWYuaW5zdGFuY2UucGlja2VyID0gdGhpcztcbiAgICB0aGlzLl9jb250ZW50UmVmLmluc3RhbmNlLmF1dG9DbG9zZSA9IHRoaXMuYXV0b0Nsb3NlO1xuICAgIHRoaXMuX2NvbnRlbnRSZWYuaW5zdGFuY2Uub3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICB0aGlzLl9jb250ZW50UmVmLmluc3RhbmNlLmluY3JlbWVudCA9IHRoaXMuaW5jcmVtZW50O1xuICAgIHRoaXMuX2NvbnRlbnRSZWYuaW5zdGFuY2UuZm9ybWF0MTIgPSB0aGlzLmZvcm1hdDEyO1xuICAgIHRoaXMuX2NvbnRlbnRSZWYuaW5zdGFuY2UuZm9ybWF0MjQgPSB0aGlzLmZvcm1hdDI0O1xuICAgIHRoaXMuX2NvbnRlbnRSZWYuaW5zdGFuY2UudmFsdWUgPSB0aGlzLl90aW1lVG9PYmoodGhpcy5fdmFsdWUpO1xuICAgIHRoaXMuX2NvbnRlbnRSZWYuaW5zdGFuY2UuaW5saW5lID0gdGhpcy5pbmxpbmU7XG5cbiAgICB0aGlzLl9jb250ZW50UmVmLmluc3RhbmNlLnN3aXRjaEhvdXJzVG9NaW51dGVzT25DbGljayA9IHRoaXMuc3dpdGNoSG91cnNUb01pbnV0ZXNPbkNsaWNrO1xuXG4gICAgaWYgKHRoaXMubWF4VGltZSkge1xuICAgICAgdGhpcy5fY29udGVudFJlZi5pbnN0YW5jZS5tYXhUaW1lID0gdGhpcy5fdGltZVRvT2JqKHRoaXMubWF4VGltZSk7XG4gICAgfVxuICAgIGlmICh0aGlzLm1pblRpbWUpIHtcbiAgICAgIHRoaXMuX2NvbnRlbnRSZWYuaW5zdGFuY2UubWluVGltZSA9IHRoaXMuX3RpbWVUb09iaih0aGlzLm1pblRpbWUpO1xuICAgIH1cblxuICAgIHRoaXMuX2NvbnRlbnRSZWYuaW5zdGFuY2UubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3RpbWVUb09iaih0aW1lOiBhbnkpOiBTZWxlY3RlZFRpbWUge1xuICAgIGNvbnN0IHJvdW5kID0gKHg6IG51bWJlciwgcm91bmRCeTogbnVtYmVyKSA9PiB7XG4gICAgICByZXR1cm4geCAlIHJvdW5kQnkgPCBNYXRoLnJvdW5kKHJvdW5kQnkgLyAyKVxuICAgICAgICA/IHggJSByb3VuZEJ5ID09PSAwXG4gICAgICAgICAgPyB4XG4gICAgICAgICAgOiBNYXRoLmNlaWwoeCAvIHJvdW5kQnkpICogcm91bmRCeVxuICAgICAgICA6IE1hdGguZmxvb3IoeCAvIHJvdW5kQnkpICogcm91bmRCeTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdG9TdHJpbmcodmFsOiBudW1iZXIpOiBzdHJpbmcge1xuICAgICAgcmV0dXJuIHZhbCA8IDEwID8gYDAke3ZhbH1gIDogYCR7dmFsfWA7XG4gICAgfVxuXG4gICAgY29uc3QgaG91ciA9IE51bWJlcih0aW1lLnNwbGl0KCc6JylbMF0pO1xuICAgIGxldCBtaW51dGUgPSBOdW1iZXIodGltZS5zcGxpdCgnOicpWzFdLm1hdGNoKC9cXGQrL2cpKTtcbiAgICBjb25zdCBhbXBtID0gdGltZS5tYXRjaCgvQU18UE0vKSB8fCBbJyddO1xuXG4gICAgaWYgKHRoaXMuaW5jcmVtZW50KSB7XG4gICAgICBtaW51dGUgPSByb3VuZChtaW51dGUsIDUpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBoOiB0b1N0cmluZyhob3VyKSxcbiAgICAgIG06IHRvU3RyaW5nKG1pbnV0ZSksXG4gICAgICBhbXBtOiBhbXBtWzBdLFxuICAgIH07XG4gIH1cbiAgcHVibGljIG1hcmtGb3JDaGVjaygpOiB2b2lkIHtcbiAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIG9wZW4oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgb3ZlcmxheVJlZiA9IHRoaXMuX292ZXJsYXlSZWY7XG4gICAgaWYgKCFvdmVybGF5UmVmKSB7XG4gICAgICB0aGlzLl9wb3J0YWwgPSBuZXcgQ29tcG9uZW50UG9ydGFsKE1kYlRpbWVwaWNrZXJDb250ZW50Q29tcG9uZW50LCB0aGlzLl92Y3IpO1xuICAgICAgb3ZlcmxheVJlZiA9IHRoaXMuX292ZXJsYXkuY3JlYXRlKHRoaXMuX2dldE92ZXJsYXlDb25maWcoKSk7XG5cbiAgICAgIHRoaXMuX292ZXJsYXlSZWYgPSBvdmVybGF5UmVmO1xuICAgIH1cblxuICAgIGlmIChvdmVybGF5UmVmICYmIHRoaXMuX292ZXJsYXlSZWYgJiYgIW92ZXJsYXlSZWYuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgdGhpcy5fY29udGVudFJlZiA9IHRoaXMuX292ZXJsYXlSZWYuYXR0YWNoKHRoaXMuX3BvcnRhbCk7XG4gICAgICB0aGlzLl9wYXRjaElucHV0VmFsdWVzKCk7XG4gICAgICB0aGlzLl9saXN0ZW5Ub091dHNpZGVDbGljaygpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5pbmxpbmUgJiYgdGhpcy5faGFzVmVydGljYWxTY3JvbGwoKSkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZG9jdW1lbnQuYm9keSwgJ292ZXJmbG93JywgJ2hpZGRlbicpO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZG9jdW1lbnQuYm9keSwgJ3BhZGRpbmctcmlnaHQnLCAnMTVweCcpO1xuICAgIH1cblxuICAgIHRoaXMuX2VtaXRUaW1lT3BlbmVkRXZlbnQoKTtcbiAgfVxuXG4gIGNsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbnRlbnRSZWYuaW5zdGFuY2UuX3N0YXJ0SGlkZUFuaW1hdGlvbigpO1xuXG4gICAgaWYgKHRoaXMuX292ZXJsYXlSZWYuYmFja2Ryb3BFbGVtZW50KSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9vdmVybGF5UmVmLmJhY2tkcm9wRWxlbWVudCwgJ29wYWNpdHknLCAnMCcpO1xuICAgIH1cblxuICAgIHRoaXMuX2NvbnRlbnRSZWYuaW5zdGFuY2UuX2hpZGVBbmltYXRpb25Eb25lLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLl9vdmVybGF5UmVmICYmIHRoaXMuX292ZXJsYXlSZWYuaGFzQXR0YWNoZWQoKSkge1xuICAgICAgICB0aGlzLl9kZXN0cm95T3ZlcmxheSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuaW5saW5lKSB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMuX2RvY3VtZW50LmJvZHksICdvdmVyZmxvdycpO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLl9kb2N1bWVudC5ib2R5LCAncGFkZGluZy1yaWdodCcpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9lbWl0VGltZUNsb3NlZEV2ZW50KCk7XG5cbiAgICAgIGlmICh0aGlzLnRvZ2dsZSkge1xuICAgICAgICB0aGlzLnRvZ2dsZS5idXR0b24ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pbnB1dC5mb2N1cygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgX2VtaXRUaW1lQ2hhbmdlRXZlbnQodmFsdWU6IFNlbGVjdGVkVGltZSk6IHZvaWQge1xuICAgIHRoaXMudGltZUNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgfVxuXG4gIF9lbWl0VGltZUNsb3NlZEV2ZW50KCk6IHZvaWQge1xuICAgIHRoaXMuY2xvc2VkLmVtaXQoKTtcbiAgfVxuXG4gIF9lbWl0VGltZU9wZW5lZEV2ZW50KCk6IHZvaWQge1xuICAgIHRoaXMub3BlbmVkLmVtaXQoKTtcbiAgfVxuXG4gIF9zZXRWYWx1ZSh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl92YWx1ZSA9ICcxMjowMCBBTSc7XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlID09PSAnJykge1xuICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5pbnB1dCwgJ2FjdGl2ZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmlucHV0LCAnYWN0aXZlJyk7XG4gICAgfVxuICB9XG5cbiAgc2V0SW5wdXQoaW5wdXQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuaW5wdXQgPSBpbnB1dC5lbC5uYXRpdmVFbGVtZW50O1xuICAgIGlucHV0Ll92YWx1ZUNoYW5nZS5zdWJzY3JpYmUoKHZhbDogYW55KSA9PiB7XG4gICAgICBsZXQgbWF0Y2g7XG5cbiAgICAgIGlmICh0aGlzLmZvcm1hdDI0KSB7XG4gICAgICAgIG1hdGNoID0gdmFsICYmIHZhbC5tYXRjaCgvXFxkXFxkOlxcZFxcZC9naSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtYXRjaCA9IHZhbCAmJiB2YWwubWF0Y2goL1xcZFxcZDpcXGRcXGRcXHM/KEFNfFBNKS9naSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICB0aGlzLl92YWx1ZSA9IG1hdGNoWzBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSAnMTI6MDAgQU0nO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgb25DaGFuZ2VDYjogKF86IGFueSkgPT4gdm9pZCA9ICgpID0+IHt9O1xuICBvblRvdWNoZWRDYjogKCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2VDYiA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkQ2IgPSBmbjtcbiAgfVxuXG4gIHByaXZhdGUgX2hhc1ZlcnRpY2FsU2Nyb2xsKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCA+IHRoaXMuX2RvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gIH1cblxuICBwcml2YXRlIF9nZXRPdmVybGF5Q29uZmlnKCk6IE92ZXJsYXlDb25maWcge1xuICAgIGNvbnN0IGlubGluZVBvc2l0aW9uU3RyYXRlZ3kgPSB0aGlzLl9vdmVybGF5XG4gICAgICAucG9zaXRpb24oKVxuICAgICAgLmZsZXhpYmxlQ29ubmVjdGVkVG8odGhpcy5pbnB1dClcbiAgICAgIC53aXRoUG9zaXRpb25zKHRoaXMuX2dldFBvc2l0aW9ucygpKVxuICAgICAgLndpdGhGbGV4aWJsZURpbWVuc2lvbnMoZmFsc2UpO1xuXG4gICAgY29uc3QgZGlhbG9nUG9zaXRpb25TdHJhdGVneSA9IHRoaXMuX292ZXJsYXlcbiAgICAgIC5wb3NpdGlvbigpXG4gICAgICAuZ2xvYmFsKClcbiAgICAgIC5jZW50ZXJIb3Jpem9udGFsbHkoKVxuICAgICAgLmNlbnRlclZlcnRpY2FsbHkoKTtcblxuICAgIGNvbnN0IGlubGluZVNjcm9sbFN0cmF0ZWd5ID0gdGhpcy5fb3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLnJlcG9zaXRpb24oKTtcbiAgICBjb25zdCBkaWFsb2dTY3JvbGxTdHJhdGVneSA9IHRoaXMuX292ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5ub29wKCk7XG5cbiAgICBjb25zdCBwb3NpdGlvblN0cmF0ZWd5ID0gdGhpcy5pbmxpbmUgPyBpbmxpbmVQb3NpdGlvblN0cmF0ZWd5IDogZGlhbG9nUG9zaXRpb25TdHJhdGVneTtcbiAgICBjb25zdCBzY3JvbGxTdHJhdGVneSA9IHRoaXMuaW5saW5lID8gaW5saW5lU2Nyb2xsU3RyYXRlZ3kgOiBkaWFsb2dTY3JvbGxTdHJhdGVneTtcblxuICAgIGNvbnN0IG92ZXJsYXlDb25maWcgPSBuZXcgT3ZlcmxheUNvbmZpZyh7XG4gICAgICBoYXNCYWNrZHJvcDogdGhpcy5pbmxpbmUgPyBmYWxzZSA6IHRydWUsXG4gICAgICBiYWNrZHJvcENsYXNzOiAnbWRiLWJhY2tkcm9wJyxcbiAgICAgIHNjcm9sbFN0cmF0ZWd5LFxuICAgICAgcG9zaXRpb25TdHJhdGVneSxcbiAgICB9KTtcblxuICAgIHJldHVybiBvdmVybGF5Q29uZmlnO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0UG9zaXRpb25zKCk6IENvbm5lY3Rpb25Qb3NpdGlvblBhaXJbXSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIHtcbiAgICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcbiAgICAgICAgb3JpZ2luWTogJ2JvdHRvbScsXG4gICAgICAgIG92ZXJsYXlYOiAnc3RhcnQnLFxuICAgICAgICBvdmVybGF5WTogJ3RvcCcsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBvcmlnaW5YOiAnc3RhcnQnLFxuICAgICAgICBvcmlnaW5ZOiAndG9wJyxcbiAgICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXG4gICAgICAgIG92ZXJsYXlZOiAnYm90dG9tJyxcbiAgICAgIH0sXG4gICAgXTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rlc3Ryb3lPdmVybGF5KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9vdmVybGF5UmVmKSB7XG4gICAgICB0aGlzLl9vdmVybGF5UmVmLmRpc3Bvc2UoKTtcbiAgICAgIHRoaXMuX292ZXJsYXlSZWYgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2xpc3RlblRvT3V0c2lkZUNsaWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9vdmVybGF5UmVmKSB7XG4gICAgICBtZXJnZShcbiAgICAgICAgdGhpcy5fb3ZlcmxheVJlZi5vdXRzaWRlUG9pbnRlckV2ZW50cygpLFxuICAgICAgICB0aGlzLl9vdmVybGF5UmVmLmRldGFjaG1lbnRzKCksXG4gICAgICAgIHRoaXMuX292ZXJsYXlSZWYua2V5ZG93bkV2ZW50cygpLnBpcGUoXG4gICAgICAgICAgZmlsdGVyKChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICAgICAgLy8gQ2xvc2luZyBvbiBhbHQgKyB1cCBpcyBvbmx5IHZhbGlkIHdoZW4gdGhlcmUncyBhbiBpbnB1dCBhc3NvY2lhdGVkIHdpdGggdGhlIGRhdGVwaWNrZXIuXG4gICAgICAgICAgICByZXR1cm4gZXZlbnQua2V5ID09PSAnRXNjYXBlJztcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICApLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9kZXN0cm95T3ZlcmxheSgpO1xuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2F1dG9DbG9zZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZm9ybWF0MTI6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2FwcGVuZFZhbGlkYXRpb25JbmZvOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9ib2R5SUQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9mb290ZXJJRDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZm9ybWF0MjQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2luY3JlbWVudDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfaW5saW5lOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9vdmVyZmxvd0hpZGRlbjogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc3dpdGNoSG91cnNUb01pbnV0ZXNPbkNsaWNrOiBCb29sZWFuSW5wdXQ7XG59XG4iXX0=