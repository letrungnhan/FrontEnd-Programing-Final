import { AfterViewInit, EventEmitter, QueryList, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { MdbRatingIconComponent } from './rating-icon.component';
import * as i0 from "@angular/core";
export declare class MdbRatingComponent implements AfterViewInit, OnDestroy {
    icons: QueryList<MdbRatingIconComponent>;
    readonly: boolean;
    set value(value: number);
    get value(): number;
    onSelect: EventEmitter<number>;
    onHover: EventEmitter<number>;
    private _value;
    private _iconIndex;
    private _icon;
    private _selectedIcon;
    readonly _destroy$: Subject<void>;
    constructor();
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    setActive(iconIndex: number, iconClass?: string): void;
    onClick(): void;
    onMouseleave(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MdbRatingComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MdbRatingComponent, "mdb-rating", never, { "readonly": "readonly"; "value": "value"; }, { "onSelect": "onSelect"; "onHover": "onHover"; }, ["icons"], ["*"]>;
}
