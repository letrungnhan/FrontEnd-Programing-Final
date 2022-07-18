import { ViewContainerRef, EventEmitter, OnDestroy, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { MdbTimepickerToggleComponent } from './timepicker-toggle.component';
import { Options, SelectedTime } from './timepicker.interface';
import { Subject } from 'rxjs';
import { BooleanInput } from '@angular/cdk/coercion';
import * as i0 from "@angular/core";
export declare class MdbTimepickerComponent implements OnDestroy {
    private _document;
    private _cdRef;
    private _overlay;
    private _vcr;
    private _renderer;
    get autoClose(): boolean;
    set autoClose(value: boolean);
    private _autoClose;
    get format12(): boolean;
    set format12(value: boolean);
    private _format12;
    get appendValidationInfo(): boolean;
    set appendValidationInfo(value: boolean);
    private _appendValidationInfo;
    get bodyID(): boolean;
    set bodyID(value: boolean);
    private _bodyID;
    get closeModalOnMinutesClick(): boolean;
    set closeModalOnMinutesClick(value: boolean);
    private _closeModalOnMinutesClick;
    get disabled(): boolean;
    set disabled(value: boolean);
    private _disabled;
    get footerID(): boolean;
    set footerID(value: boolean);
    private _footerID;
    get format24(): boolean;
    set format24(value: boolean);
    private _format24;
    headID: string;
    get increment(): boolean;
    set increment(value: boolean);
    private _increment;
    get inline(): boolean;
    set inline(value: boolean);
    private _inline;
    maxTime: string;
    minTime: string;
    modalID: string;
    get overflowHidden(): boolean;
    set overflowHidden(value: boolean);
    private _overflowHidden;
    pickerID: string;
    get switchHoursToMinutesOnClick(): boolean;
    set switchHoursToMinutesOnClick(value: boolean);
    private _switchHoursToMinutesOnClick;
    options: Options;
    timeChange: EventEmitter<SelectedTime>;
    closed: EventEmitter<void>;
    opened: EventEmitter<void>;
    private _value;
    private _contentRef;
    private _overlayRef;
    private _portal;
    input: HTMLInputElement;
    toggle: MdbTimepickerToggleComponent;
    _selectionChange$: Subject<string>;
    constructor(_document: any, _cdRef: ChangeDetectorRef, _overlay: Overlay, _vcr: ViewContainerRef, _renderer: Renderer2);
    private _patchInputValues;
    protected _timeToObj(time: any): SelectedTime;
    markForCheck(): void;
    open(): void;
    close(): void;
    _emitTimeChangeEvent(value: SelectedTime): void;
    _emitTimeClosedEvent(): void;
    _emitTimeOpenedEvent(): void;
    _setValue(value: string): void;
    setInput(input: any): void;
    onChangeCb: (_: any) => void;
    onTouchedCb: () => void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    private _hasVerticalScroll;
    private _getOverlayConfig;
    private _getPositions;
    private _destroyOverlay;
    private _listenToOutsideClick;
    ngOnDestroy(): void;
    static ngAcceptInputType_autoClose: BooleanInput;
    static ngAcceptInputType_format12: BooleanInput;
    static ngAcceptInputType_appendValidationInfo: BooleanInput;
    static ngAcceptInputType_bodyID: BooleanInput;
    static ngAcceptInputType_disabled: BooleanInput;
    static ngAcceptInputType_footerID: BooleanInput;
    static ngAcceptInputType_format24: BooleanInput;
    static ngAcceptInputType_increment: BooleanInput;
    static ngAcceptInputType_inline: BooleanInput;
    static ngAcceptInputType_overflowHidden: BooleanInput;
    static ngAcceptInputType_switchHoursToMinutesOnClick: BooleanInput;
    static ɵfac: i0.ɵɵFactoryDeclaration<MdbTimepickerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MdbTimepickerComponent, "mdb-timepicker", ["mdbTimePicker"], { "autoClose": "autoClose"; "format12": "format12"; "appendValidationInfo": "appendValidationInfo"; "bodyID": "bodyID"; "closeModalOnMinutesClick": "closeModalOnMinutesClick"; "disabled": "disabled"; "footerID": "footerID"; "format24": "format24"; "headID": "headID"; "increment": "increment"; "inline": "inline"; "maxTime": "maxTime"; "minTime": "minTime"; "modalID": "modalID"; "overflowHidden": "overflowHidden"; "pickerID": "pickerID"; "switchHoursToMinutesOnClick": "switchHoursToMinutesOnClick"; "options": "options"; }, { "timeChange": "timeChange"; "closed": "closed"; "opened": "opened"; }, never, never>;
}
