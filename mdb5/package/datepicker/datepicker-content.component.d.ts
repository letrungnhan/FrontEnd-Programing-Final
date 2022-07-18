import { AnimationEvent } from '@angular/animations';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { MdbDatepickerComponent } from './datepicker.component';
import * as i0 from "@angular/core";
export declare class MdbDatepickerContentComponent implements OnDestroy {
    private _cdRef;
    datepicker: MdbDatepickerComponent;
    _hideAnimationDone: Subject<void>;
    _contentAnimationState: string;
    constructor(_cdRef: ChangeDetectorRef);
    detectChanges(): void;
    ngOnDestroy(): void;
    onDateSelect(date: Date): void;
    onYearSelect(year: number): void;
    onMonthSelect(month: number): void;
    _startHideAnimation(): void;
    _onAnimationDone(event: AnimationEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MdbDatepickerContentComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MdbDatepickerContentComponent, "mdb-datepicker-content", ["mdbDatepickerContent"], {}, {}, never, never>;
}
