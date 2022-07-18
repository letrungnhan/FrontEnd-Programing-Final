import { Component, ContentChildren, Input, ViewChild, ViewChildren, Output, EventEmitter, ChangeDetectionStrategy, } from '@angular/core';
import { MdbStepComponent } from './step.component';
import { FormControl } from '@angular/forms';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { horizontalAnimation, verticalAnimation } from './stepper-animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/cdk/portal";
export class MdbStepperComponent {
    constructor(_cdRef) {
        this._cdRef = _cdRef;
        this.orientation = 'horizontal';
        this._linear = false;
        this._stepperHeadClick = true;
        this._mobile = false;
        this.mobileBarBreakpoint = 4;
        this._stepperMobileStepTxt = 'Step';
        this._stepperMobileBackBtn = 'Back';
        this._stepperMobileNextBtn = 'Next';
        this._stepperMobileOfTxt = 'of';
        this._markAsCompleted = true;
        this.stepChange = new EventEmitter();
        this._destroy = new Subject();
    }
    get linear() {
        return this._linear;
    }
    set linear(value) {
        this._linear = coerceBooleanProperty(value);
    }
    get stepperHeadClick() {
        return this._stepperHeadClick;
    }
    set stepperHeadClick(value) {
        this._stepperHeadClick = coerceBooleanProperty(value);
    }
    get mobile() {
        return this._mobile;
    }
    set mobile(value) {
        this._mobile = coerceBooleanProperty(value);
    }
    get stepperMobileStepTxt() {
        return this._stepperMobileStepTxt;
    }
    set stepperMobileStepTxt(value) {
        this._stepperMobileStepTxt = value;
    }
    get stepperMobileBackBtn() {
        return this._stepperMobileBackBtn;
    }
    set stepperMobileBackBtn(value) {
        this._stepperMobileBackBtn = value;
    }
    get stepperMobileNextBtn() {
        return this._stepperMobileNextBtn;
    }
    set stepperMobileNextBtn(value) {
        this._stepperMobileNextBtn = value;
    }
    get stepperMobileOfTxt() {
        return this._stepperMobileOfTxt;
    }
    set stepperMobileOfTxt(value) {
        this._stepperMobileOfTxt = value;
    }
    get markAsCompleted() {
        return this._markAsCompleted;
    }
    set markAsCompleted(value) {
        this._markAsCompleted = coerceBooleanProperty(value);
    }
    get allStepsNumber() {
        return this.steps.length;
    }
    getProgressBarWidth() {
        return ((this.activeStepIndex + 1) / this.steps.length) * 100;
    }
    get activeStepIndex() {
        return this._activeStepIndex;
    }
    set activeStepIndex(value) {
        this._activeStepIndex = value;
    }
    _isStepValid(step) {
        if (!step.stepForm) {
            return true;
        }
        if (step.stepForm && step.stepForm.valid) {
            return true;
        }
        return false;
    }
    getAnimationState(index) {
        const nextElPosition = index - this.activeStepIndex;
        if (nextElPosition < 0) {
            return 'previous';
        }
        else if (nextElPosition > 0) {
            return 'next';
        }
        return 'current';
    }
    _getStepByIndex(index) {
        return this.steps.toArray()[index];
    }
    next() {
        if (this.activeStepIndex < this.steps.length - 1) {
            this.setNewActiveStep(this.activeStepIndex + 1);
            this._cdRef.markForCheck();
        }
    }
    previous() {
        if (this.activeStepIndex > 0) {
            this.setNewActiveStep(this.activeStepIndex - 1);
            this._cdRef.markForCheck();
        }
    }
    submit() {
        if (this.linear) {
            this._markCurrentAsDone();
            this._cdRef.markForCheck();
        }
    }
    handleHeaderClick(index) {
        if (!this.stepperHeadClick) {
            return;
        }
        this.setNewActiveStep(index);
    }
    setNewActiveStep(index) {
        setTimeout(() => {
            const currentStep = this._activeStep;
            const currentStepIndex = this._activeStepIndex;
            const newStep = this._getStepByIndex(index);
            const newStepIndex = this.steps
                .toArray()
                .findIndex((step) => step === newStep);
            if (this.linear && !this._isNewStepLinear(index)) {
                return;
            }
            if (newStepIndex < this._activeStepIndex && !newStep.editable) {
                return;
            }
            this._removeStepValidationClasses(newStep);
            if (this.linear && index > this.activeStepIndex) {
                if (this._isStepValid(this._activeStep) || currentStep.optional) {
                    this._markCurrentAsDone();
                    this._removeCurrentActiveStep();
                    this._setActiveStep(index);
                    this.stepChange.emit({
                        activeStep: newStep,
                        activeStepIndex: newStepIndex,
                        previousStep: currentStep,
                        previousStepIndex: currentStepIndex,
                    });
                }
                else {
                    this._markCurrentAsWrong();
                    this._markStepControlsAsDirty(this._activeStep);
                }
            }
            else {
                if (index < this.activeStepIndex) {
                    this._removeStepValidationClasses(this._activeStep);
                }
                this._removeCurrentActiveStep();
                this._markCurrentAsDone();
                this._setActiveStep(index);
                this.stepChange.emit({
                    activeStep: newStep,
                    activeStepIndex: newStepIndex,
                    previousStep: currentStep,
                    previousStepIndex: currentStepIndex,
                });
            }
        }, 0);
    }
    _markCurrentAsDone() {
        this._activeStep.isCompleted = true;
        this._activeStep.isInvalid = false;
    }
    _markCurrentAsWrong() {
        this._activeStep.isInvalid = true;
        this._activeStep.isCompleted = false;
    }
    _markStepControlsAsDirty(step) {
        const controls = step.stepForm.controls;
        if (step.stepForm.controls) {
            const keys = Object.keys(controls);
            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < keys.length; i++) {
                const control = controls[keys[i]];
                if (control instanceof FormControl) {
                    control.markAsTouched();
                }
            }
        }
    }
    _removeStepValidationClasses(step) {
        step.isCompleted = false;
        step.isInvalid = false;
    }
    _isNewStepLinear(newStepIndex) {
        return this.activeStepIndex - newStepIndex === 1 || this.activeStepIndex - newStepIndex === -1;
    }
    _setActiveStep(index) {
        this.steps.toArray()[index].isActive = true;
        this.activeStepIndex = index;
        this._activeStep = this._getStepByIndex(this.activeStepIndex);
        this._cdRef.markForCheck();
    }
    _removeCurrentActiveStep() {
        const currentActiveStep = this.steps.find((activeStep) => activeStep.isActive);
        if (currentActiveStep) {
            currentActiveStep.isActive = false;
        }
    }
    resetAll() {
        this.steps.forEach((step) => {
            step.reset();
            this._setActiveStep(0);
            this._cdRef.markForCheck();
        });
    }
    ngAfterContentInit() {
        this._setActiveStep(0);
        // tslint:disable-next-line: deprecation
        this.steps.changes.pipe(takeUntil(this._destroy)).subscribe(() => this._cdRef.markForCheck());
        merge(...this.steps.map((step) => step._onChanges))
            .pipe(takeUntil(this._destroy))
            // tslint:disable-next-line: deprecation
            .subscribe((_) => this._cdRef.markForCheck());
    }
    ngOnDestroy() {
        this._destroy.next();
        this._destroy.complete();
    }
}
MdbStepperComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbStepperComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MdbStepperComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbStepperComponent, selector: "mdb-stepper", inputs: { orientation: "orientation", linear: "linear", stepperHeadClick: "stepperHeadClick", mobile: "mobile", mobileBarBreakpoint: "mobileBarBreakpoint", stepperMobileStepTxt: "stepperMobileStepTxt", stepperMobileBackBtn: "stepperMobileBackBtn", stepperMobileNextBtn: "stepperMobileNextBtn", stepperMobileOfTxt: "stepperMobileOfTxt", markAsCompleted: "markAsCompleted" }, outputs: { stepChange: "stepChange" }, queries: [{ propertyName: "steps", predicate: MdbStepComponent }], viewQueries: [{ propertyName: "container", first: true, predicate: ["container"], descendants: true, static: true }, { propertyName: "stepTitles", predicate: ["stepTitle"], descendants: true }, { propertyName: "stepContents", predicate: ["stepContent"], descendants: true }], exportAs: ["mdbStepper"], ngImport: i0, template: "<ng-container [ngSwitch]=\"orientation\">\n  <ng-container *ngSwitchCase=\"'horizontal'\">\n    <div *ngIf=\"mobile\" class=\"stepper-mobile-head bg-light\">\n      {{ stepperMobileStepTxt }} {{ activeStepIndex + 1 }} {{ stepperMobileOfTxt }}\n      {{ allStepsNumber }}\n    </div>\n    <ul\n      class=\"stepper stepper-horizontal\"\n      [ngClass]=\"{\n        'stepper-mobile': mobile,\n        'stepper-progress-bar': mobile && steps.length > mobileBarBreakpoint\n      }\"\n    >\n      <li\n        [ngClass]=\"{\n          'stepper-active': step.isActive,\n          'stepper-completed': step.isCompleted,\n          'stepper-invalid': step.isInvalid\n        }\"\n        class=\"stepper-step\"\n        *ngFor=\"let step of steps; let i = index\"\n      >\n        <div class=\"stepper-head\" (click)=\"handleHeaderClick(i)\">\n          <span class=\"stepper-head-icon\">\n            <ng-container *ngIf=\"!step.icon\">{{ i + 1 }}</ng-container>\n            <ng-template [ngIf]=\"step.icon\">\n              <ng-template [cdkPortalOutlet]=\"step.icon\"></ng-template>\n            </ng-template>\n          </span>\n          <span class=\"stepper-head-text\">{{ step.name }}</span>\n        </div>\n      </li>\n    </ul>\n    <div class=\"stepper-horizontal-content-container\">\n      <ng-container *ngFor=\"let step of steps; let i = index\">\n        <div\n          class=\"stepper-content\"\n          [attr.aria-expanded]=\"activeStepIndex === i\"\n          [@horizontalAnimation]=\"getAnimationState(i)\"\n        >\n          <ng-container [ngTemplateOutlet]=\"step.content\"></ng-container>\n        </div>\n      </ng-container>\n    </div>\n    <div *ngIf=\"mobile\" class=\"stepper-mobile-footer bg-light\">\n      <div class=\"stepper-back-btn\">\n        <button (click)=\"previous()\" type=\"button\" class=\"btn btn-link\">\n          <i class=\"fas fa-chevron-left\"></i>{{ stepperMobileBackBtn }}\n        </button>\n      </div>\n      <div *ngIf=\"steps.length > mobileBarBreakpoint\" class=\"stepper-mobile-progress gray-500\">\n        <div\n          class=\"stepper-mobile-progress-bar bg-primary\"\n          [style.width.%]=\"getProgressBarWidth()\"\n        ></div>\n      </div>\n      <div class=\"stepper-next-btn\">\n        <button (click)=\"next()\" type=\"button\" class=\"btn btn-link\">\n          {{ stepperMobileNextBtn }}<i class=\"fas fa-chevron-right\"></i>\n        </button>\n      </div>\n    </div>\n  </ng-container>\n\n  <ng-container *ngSwitchCase=\"'vertical'\">\n    <ul class=\"stepper stepper-vertical\">\n      <li\n        [ngClass]=\"{\n          'stepper-active': step.isActive,\n          'stepper-completed': step.isCompleted,\n          'stepper-invalid': step.isInvalid\n        }\"\n        class=\"stepper-step\"\n        *ngFor=\"let step of steps; let i = index\"\n      >\n        <div class=\"stepper-head\" (click)=\"handleHeaderClick(i)\">\n          <span class=\"stepper-head-icon\">\n            <ng-container *ngIf=\"!step.icon\">{{ i + 1 }}</ng-container>\n            <ng-template [ngIf]=\"step.icon\">\n              <ng-template [cdkPortalOutlet]=\"step.icon\"></ng-template>\n            </ng-template>\n          </span>\n          <span class=\"stepper-head-text\">{{ step.name }}</span>\n        </div>\n        <div class=\"stepper-vertical-content-container\" [@verticalAnimation]=\"getAnimationState(i)\">\n          <div class=\"stepper-content\">\n            <ng-container [ngTemplateOutlet]=\"step.content\"></ng-container>\n          </div>\n        </div>\n      </li>\n    </ul>\n  </ng-container>\n</ng-container>\n", directives: [{ type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], animations: [horizontalAnimation, verticalAnimation], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbStepperComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-stepper', exportAs: 'mdbStepper', animations: [horizontalAnimation, verticalAnimation], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container [ngSwitch]=\"orientation\">\n  <ng-container *ngSwitchCase=\"'horizontal'\">\n    <div *ngIf=\"mobile\" class=\"stepper-mobile-head bg-light\">\n      {{ stepperMobileStepTxt }} {{ activeStepIndex + 1 }} {{ stepperMobileOfTxt }}\n      {{ allStepsNumber }}\n    </div>\n    <ul\n      class=\"stepper stepper-horizontal\"\n      [ngClass]=\"{\n        'stepper-mobile': mobile,\n        'stepper-progress-bar': mobile && steps.length > mobileBarBreakpoint\n      }\"\n    >\n      <li\n        [ngClass]=\"{\n          'stepper-active': step.isActive,\n          'stepper-completed': step.isCompleted,\n          'stepper-invalid': step.isInvalid\n        }\"\n        class=\"stepper-step\"\n        *ngFor=\"let step of steps; let i = index\"\n      >\n        <div class=\"stepper-head\" (click)=\"handleHeaderClick(i)\">\n          <span class=\"stepper-head-icon\">\n            <ng-container *ngIf=\"!step.icon\">{{ i + 1 }}</ng-container>\n            <ng-template [ngIf]=\"step.icon\">\n              <ng-template [cdkPortalOutlet]=\"step.icon\"></ng-template>\n            </ng-template>\n          </span>\n          <span class=\"stepper-head-text\">{{ step.name }}</span>\n        </div>\n      </li>\n    </ul>\n    <div class=\"stepper-horizontal-content-container\">\n      <ng-container *ngFor=\"let step of steps; let i = index\">\n        <div\n          class=\"stepper-content\"\n          [attr.aria-expanded]=\"activeStepIndex === i\"\n          [@horizontalAnimation]=\"getAnimationState(i)\"\n        >\n          <ng-container [ngTemplateOutlet]=\"step.content\"></ng-container>\n        </div>\n      </ng-container>\n    </div>\n    <div *ngIf=\"mobile\" class=\"stepper-mobile-footer bg-light\">\n      <div class=\"stepper-back-btn\">\n        <button (click)=\"previous()\" type=\"button\" class=\"btn btn-link\">\n          <i class=\"fas fa-chevron-left\"></i>{{ stepperMobileBackBtn }}\n        </button>\n      </div>\n      <div *ngIf=\"steps.length > mobileBarBreakpoint\" class=\"stepper-mobile-progress gray-500\">\n        <div\n          class=\"stepper-mobile-progress-bar bg-primary\"\n          [style.width.%]=\"getProgressBarWidth()\"\n        ></div>\n      </div>\n      <div class=\"stepper-next-btn\">\n        <button (click)=\"next()\" type=\"button\" class=\"btn btn-link\">\n          {{ stepperMobileNextBtn }}<i class=\"fas fa-chevron-right\"></i>\n        </button>\n      </div>\n    </div>\n  </ng-container>\n\n  <ng-container *ngSwitchCase=\"'vertical'\">\n    <ul class=\"stepper stepper-vertical\">\n      <li\n        [ngClass]=\"{\n          'stepper-active': step.isActive,\n          'stepper-completed': step.isCompleted,\n          'stepper-invalid': step.isInvalid\n        }\"\n        class=\"stepper-step\"\n        *ngFor=\"let step of steps; let i = index\"\n      >\n        <div class=\"stepper-head\" (click)=\"handleHeaderClick(i)\">\n          <span class=\"stepper-head-icon\">\n            <ng-container *ngIf=\"!step.icon\">{{ i + 1 }}</ng-container>\n            <ng-template [ngIf]=\"step.icon\">\n              <ng-template [cdkPortalOutlet]=\"step.icon\"></ng-template>\n            </ng-template>\n          </span>\n          <span class=\"stepper-head-text\">{{ step.name }}</span>\n        </div>\n        <div class=\"stepper-vertical-content-container\" [@verticalAnimation]=\"getAnimationState(i)\">\n          <div class=\"stepper-content\">\n            <ng-container [ngTemplateOutlet]=\"step.content\"></ng-container>\n          </div>\n        </div>\n      </li>\n    </ul>\n  </ng-container>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { steps: [{
                type: ContentChildren,
                args: [MdbStepComponent]
            }], stepTitles: [{
                type: ViewChildren,
                args: ['stepTitle']
            }], stepContents: [{
                type: ViewChildren,
                args: ['stepContent']
            }], container: [{
                type: ViewChild,
                args: ['container', { static: true }]
            }], orientation: [{
                type: Input
            }], linear: [{
                type: Input
            }], stepperHeadClick: [{
                type: Input
            }], mobile: [{
                type: Input
            }], mobileBarBreakpoint: [{
                type: Input
            }], stepperMobileStepTxt: [{
                type: Input
            }], stepperMobileBackBtn: [{
                type: Input
            }], stepperMobileNextBtn: [{
                type: Input
            }], stepperMobileOfTxt: [{
                type: Input
            }], markAsCompleted: [{
                type: Input
            }], stepChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvc3RlcHBlci9zdGVwcGVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9zdGVwcGVyL3N0ZXBwZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxlQUFlLEVBR2YsS0FBSyxFQUVMLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLFlBQVksRUFFWix1QkFBdUIsR0FFeEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5RSxPQUFPLEVBQWdCLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7Ozs7QUFtQjVFLE1BQU0sT0FBTyxtQkFBbUI7SUFtRjlCLFlBQW9CLE1BQXlCO1FBQXpCLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBN0VwQyxnQkFBVyxHQUEwQixZQUFZLENBQUM7UUFRbkQsWUFBTyxHQUFHLEtBQUssQ0FBQztRQVNoQixzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFTekIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUVmLHdCQUFtQixHQUFHLENBQUMsQ0FBQztRQVN6QiwwQkFBcUIsR0FBRyxNQUFNLENBQUM7UUFTL0IsMEJBQXFCLEdBQUcsTUFBTSxDQUFD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QUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNCLENBQUM7O2dIQS9SVSxtQkFBbUI7b0dBQW5CLG1CQUFtQixzZUFDYixnQkFBZ0IsMlVDeENuQywwaUhBNkZBLGdzQkR6RGMsQ0FBQyxtQkFBbUIsRUFBRSxpQkFBaUIsQ0FBQzsyRkFHekMsbUJBQW1CO2tCQVIvQixTQUFTOytCQUVFLGFBQWEsWUFDYixZQUFZLGNBRVYsQ0FBQyxtQkFBbUIsRUFBRSxpQkFBaUIsQ0FBQyxtQkFDbkMsdUJBQXVCLENBQUMsTUFBTTt3R0FHWixLQUFLO3NCQUF2QyxlQUFlO3VCQUFDLGdCQUFnQjtnQkFDTixVQUFVO3NCQUFwQyxZQUFZO3VCQUFDLFdBQVc7Z0JBQ0ksWUFBWTtzQkFBeEMsWUFBWTt1QkFBQyxhQUFhO2dCQUNlLFNBQVM7c0JBQWxELFNBQVM7dUJBQUMsV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFFL0IsV0FBVztzQkFBbkIsS0FBSztnQkFFRixNQUFNO3NCQURULEtBQUs7Z0JBVUYsZ0JBQWdCO3NCQURuQixLQUFLO2dCQVVGLE1BQU07c0JBRFQsS0FBSztnQkFTRyxtQkFBbUI7c0JBQTNCLEtBQUs7Z0JBR0Ysb0JBQW9CO3NCQUR2QixLQUFLO2dCQVVGLG9CQUFvQjtzQkFEdkIsS0FBSztnQkFVRixvQkFBb0I7c0JBRHZCLEtBQUs7Z0JBVUYsa0JBQWtCO3NCQURyQixLQUFLO2dCQVVGLGVBQWU7c0JBRGxCLEtBQUs7Z0JBU0ksVUFBVTtzQkFBbkIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBRdWVyeUxpc3QsXG4gIEFmdGVyQ29udGVudEluaXQsXG4gIElucHV0LFxuICBFbGVtZW50UmVmLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDaGlsZHJlbixcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIE9uRGVzdHJveSxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1kYlN0ZXBDb21wb25lbnQgfSBmcm9tICcuL3N0ZXAuY29tcG9uZW50JztcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgbWVyZ2UsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGhvcml6b250YWxBbmltYXRpb24sIHZlcnRpY2FsQW5pbWF0aW9uIH0gZnJvbSAnLi9zdGVwcGVyLWFuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuXG5leHBvcnQgdHlwZSBNZGJTdGVwcGVyT3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1kYlN0ZXBDaGFuZ2VFdmVudCB7XG4gIGFjdGl2ZVN0ZXA6IE1kYlN0ZXBDb21wb25lbnQ7XG4gIGFjdGl2ZVN0ZXBJbmRleDogbnVtYmVyO1xuICBwcmV2aW91c1N0ZXA6IE1kYlN0ZXBDb21wb25lbnQ7XG4gIHByZXZpb3VzU3RlcEluZGV4OiBudW1iZXI7XG59XG5cbkBDb21wb25lbnQoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGNvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ21kYi1zdGVwcGVyJyxcbiAgZXhwb3J0QXM6ICdtZGJTdGVwcGVyJyxcbiAgdGVtcGxhdGVVcmw6ICdzdGVwcGVyLmNvbXBvbmVudC5odG1sJyxcbiAgYW5pbWF0aW9uczogW2hvcml6b250YWxBbmltYXRpb24sIHZlcnRpY2FsQW5pbWF0aW9uXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1kYlN0ZXBwZXJDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICBAQ29udGVudENoaWxkcmVuKE1kYlN0ZXBDb21wb25lbnQpIHN0ZXBzOiBRdWVyeUxpc3Q8TWRiU3RlcENvbXBvbmVudD47XG4gIEBWaWV3Q2hpbGRyZW4oJ3N0ZXBUaXRsZScpIHN0ZXBUaXRsZXM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcbiAgQFZpZXdDaGlsZHJlbignc3RlcENvbnRlbnQnKSBzdGVwQ29udGVudHM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcbiAgQFZpZXdDaGlsZCgnY29udGFpbmVyJywgeyBzdGF0aWM6IHRydWUgfSkgY29udGFpbmVyOiBFbGVtZW50UmVmO1xuXG4gIEBJbnB1dCgpIG9yaWVudGF0aW9uOiBNZGJTdGVwcGVyT3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCc7XG4gIEBJbnB1dCgpXG4gIGdldCBsaW5lYXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2xpbmVhcjtcbiAgfVxuICBzZXQgbGluZWFyKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fbGluZWFyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9saW5lYXIgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBnZXQgc3RlcHBlckhlYWRDbGljaygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc3RlcHBlckhlYWRDbGljaztcbiAgfVxuICBzZXQgc3RlcHBlckhlYWRDbGljayh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3N0ZXBwZXJIZWFkQ2xpY2sgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX3N0ZXBwZXJIZWFkQ2xpY2sgPSB0cnVlO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBtb2JpbGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX21vYmlsZTtcbiAgfVxuICBzZXQgbW9iaWxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fbW9iaWxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9tb2JpbGUgPSBmYWxzZTtcblxuICBASW5wdXQoKSBtb2JpbGVCYXJCcmVha3BvaW50ID0gNDtcblxuICBASW5wdXQoKVxuICBnZXQgc3RlcHBlck1vYmlsZVN0ZXBUeHQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fc3RlcHBlck1vYmlsZVN0ZXBUeHQ7XG4gIH1cbiAgc2V0IHN0ZXBwZXJNb2JpbGVTdGVwVHh0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9zdGVwcGVyTW9iaWxlU3RlcFR4dCA9IHZhbHVlO1xuICB9XG4gIHByaXZhdGUgX3N0ZXBwZXJNb2JpbGVTdGVwVHh0ID0gJ1N0ZXAnO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBzdGVwcGVyTW9iaWxlQmFja0J0bigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9zdGVwcGVyTW9iaWxlQmFja0J0bjtcbiAgfVxuICBzZXQgc3RlcHBlck1vYmlsZUJhY2tCdG4odmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX3N0ZXBwZXJNb2JpbGVCYWNrQnRuID0gdmFsdWU7XG4gIH1cbiAgcHJpdmF0ZSBfc3RlcHBlck1vYmlsZUJhY2tCdG4gPSAnQmFjayc7XG5cbiAgQElucHV0KClcbiAgZ2V0IHN0ZXBwZXJNb2JpbGVOZXh0QnRuKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3N0ZXBwZXJNb2JpbGVOZXh0QnRuO1xuICB9XG4gIHNldCBzdGVwcGVyTW9iaWxlTmV4dEJ0bih2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fc3RlcHBlck1vYmlsZU5leHRCdG4gPSB2YWx1ZTtcbiAgfVxuICBwcml2YXRlIF9zdGVwcGVyTW9iaWxlTmV4dEJ0biA9ICdOZXh0JztcblxuICBASW5wdXQoKVxuICBnZXQgc3RlcHBlck1vYmlsZU9mVHh0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3N0ZXBwZXJNb2JpbGVPZlR4dDtcbiAgfVxuICBzZXQgc3RlcHBlck1vYmlsZU9mVHh0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9zdGVwcGVyTW9iaWxlT2ZUeHQgPSB2YWx1ZTtcbiAgfVxuICBwcml2YXRlIF9zdGVwcGVyTW9iaWxlT2ZUeHQgPSAnb2YnO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBtYXJrQXNDb21wbGV0ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX21hcmtBc0NvbXBsZXRlZDtcbiAgfVxuICBzZXQgbWFya0FzQ29tcGxldGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fbWFya0FzQ29tcGxldGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9tYXJrQXNDb21wbGV0ZWQgPSB0cnVlO1xuXG4gIEBPdXRwdXQoKSBzdGVwQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TWRiU3RlcENoYW5nZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8TWRiU3RlcENoYW5nZUV2ZW50PigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBwcml2YXRlIF9kZXN0cm95OiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3QoKTtcblxuICBwcml2YXRlIF9hY3RpdmVTdGVwSW5kZXg6IG51bWJlcjtcbiAgcHJpdmF0ZSBfYWN0aXZlU3RlcDogTWRiU3RlcENvbXBvbmVudDtcblxuICBnZXQgYWxsU3RlcHNOdW1iZXIoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5zdGVwcy5sZW5ndGg7XG4gIH1cblxuICBnZXRQcm9ncmVzc0JhcldpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuICgodGhpcy5hY3RpdmVTdGVwSW5kZXggKyAxKSAvIHRoaXMuc3RlcHMubGVuZ3RoKSAqIDEwMDtcbiAgfVxuXG4gIGdldCBhY3RpdmVTdGVwSW5kZXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlU3RlcEluZGV4O1xuICB9XG5cbiAgc2V0IGFjdGl2ZVN0ZXBJbmRleCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fYWN0aXZlU3RlcEluZGV4ID0gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIF9pc1N0ZXBWYWxpZChzdGVwOiBNZGJTdGVwQ29tcG9uZW50KTogYm9vbGVhbiB7XG4gICAgaWYgKCFzdGVwLnN0ZXBGb3JtKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoc3RlcC5zdGVwRm9ybSAmJiBzdGVwLnN0ZXBGb3JtLnZhbGlkKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXRBbmltYXRpb25TdGF0ZShpbmRleDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBjb25zdCBuZXh0RWxQb3NpdGlvbiA9IGluZGV4IC0gdGhpcy5hY3RpdmVTdGVwSW5kZXg7XG5cbiAgICBpZiAobmV4dEVsUG9zaXRpb24gPCAwKSB7XG4gICAgICByZXR1cm4gJ3ByZXZpb3VzJztcbiAgICB9IGVsc2UgaWYgKG5leHRFbFBvc2l0aW9uID4gMCkge1xuICAgICAgcmV0dXJuICduZXh0JztcbiAgICB9XG4gICAgcmV0dXJuICdjdXJyZW50JztcbiAgfVxuXG4gIHByaXZhdGUgX2dldFN0ZXBCeUluZGV4KGluZGV4OiBudW1iZXIpOiBNZGJTdGVwQ29tcG9uZW50IHtcbiAgICByZXR1cm4gdGhpcy5zdGVwcy50b0FycmF5KClbaW5kZXhdO1xuICB9XG5cbiAgbmV4dCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hY3RpdmVTdGVwSW5kZXggPCB0aGlzLnN0ZXBzLmxlbmd0aCAtIDEpIHtcbiAgICAgIHRoaXMuc2V0TmV3QWN0aXZlU3RlcCh0aGlzLmFjdGl2ZVN0ZXBJbmRleCArIDEpO1xuICAgICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgcHJldmlvdXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYWN0aXZlU3RlcEluZGV4ID4gMCkge1xuICAgICAgdGhpcy5zZXROZXdBY3RpdmVTdGVwKHRoaXMuYWN0aXZlU3RlcEluZGV4IC0gMSk7XG4gICAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBzdWJtaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubGluZWFyKSB7XG4gICAgICB0aGlzLl9tYXJrQ3VycmVudEFzRG9uZSgpO1xuICAgICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlSGVhZGVyQ2xpY2soaW5kZXg6IG51bWJlcikge1xuICAgIGlmICghdGhpcy5zdGVwcGVySGVhZENsaWNrKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zZXROZXdBY3RpdmVTdGVwKGluZGV4KTtcbiAgfVxuXG4gIHNldE5ld0FjdGl2ZVN0ZXAoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29uc3QgY3VycmVudFN0ZXAgPSB0aGlzLl9hY3RpdmVTdGVwO1xuICAgICAgY29uc3QgY3VycmVudFN0ZXBJbmRleCA9IHRoaXMuX2FjdGl2ZVN0ZXBJbmRleDtcbiAgICAgIGNvbnN0IG5ld1N0ZXAgPSB0aGlzLl9nZXRTdGVwQnlJbmRleChpbmRleCk7XG4gICAgICBjb25zdCBuZXdTdGVwSW5kZXggPSB0aGlzLnN0ZXBzXG4gICAgICAgIC50b0FycmF5KClcbiAgICAgICAgLmZpbmRJbmRleCgoc3RlcDogTWRiU3RlcENvbXBvbmVudCkgPT4gc3RlcCA9PT0gbmV3U3RlcCk7XG5cbiAgICAgIGlmICh0aGlzLmxpbmVhciAmJiAhdGhpcy5faXNOZXdTdGVwTGluZWFyKGluZGV4KSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChuZXdTdGVwSW5kZXggPCB0aGlzLl9hY3RpdmVTdGVwSW5kZXggJiYgIW5ld1N0ZXAuZWRpdGFibGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9yZW1vdmVTdGVwVmFsaWRhdGlvbkNsYXNzZXMobmV3U3RlcCk7XG5cbiAgICAgIGlmICh0aGlzLmxpbmVhciAmJiBpbmRleCA+IHRoaXMuYWN0aXZlU3RlcEluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLl9pc1N0ZXBWYWxpZCh0aGlzLl9hY3RpdmVTdGVwKSB8fCBjdXJyZW50U3RlcC5vcHRpb25hbCkge1xuICAgICAgICAgIHRoaXMuX21hcmtDdXJyZW50QXNEb25lKCk7XG4gICAgICAgICAgdGhpcy5fcmVtb3ZlQ3VycmVudEFjdGl2ZVN0ZXAoKTtcbiAgICAgICAgICB0aGlzLl9zZXRBY3RpdmVTdGVwKGluZGV4KTtcblxuICAgICAgICAgIHRoaXMuc3RlcENoYW5nZS5lbWl0KHtcbiAgICAgICAgICAgIGFjdGl2ZVN0ZXA6IG5ld1N0ZXAsXG4gICAgICAgICAgICBhY3RpdmVTdGVwSW5kZXg6IG5ld1N0ZXBJbmRleCxcbiAgICAgICAgICAgIHByZXZpb3VzU3RlcDogY3VycmVudFN0ZXAsXG4gICAgICAgICAgICBwcmV2aW91c1N0ZXBJbmRleDogY3VycmVudFN0ZXBJbmRleCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9tYXJrQ3VycmVudEFzV3JvbmcoKTtcbiAgICAgICAgICB0aGlzLl9tYXJrU3RlcENvbnRyb2xzQXNEaXJ0eSh0aGlzLl9hY3RpdmVTdGVwKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGluZGV4IDwgdGhpcy5hY3RpdmVTdGVwSW5kZXgpIHtcbiAgICAgICAgICB0aGlzLl9yZW1vdmVTdGVwVmFsaWRhdGlvbkNsYXNzZXModGhpcy5fYWN0aXZlU3RlcCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9yZW1vdmVDdXJyZW50QWN0aXZlU3RlcCgpO1xuICAgICAgICB0aGlzLl9tYXJrQ3VycmVudEFzRG9uZSgpO1xuICAgICAgICB0aGlzLl9zZXRBY3RpdmVTdGVwKGluZGV4KTtcblxuICAgICAgICB0aGlzLnN0ZXBDaGFuZ2UuZW1pdCh7XG4gICAgICAgICAgYWN0aXZlU3RlcDogbmV3U3RlcCxcbiAgICAgICAgICBhY3RpdmVTdGVwSW5kZXg6IG5ld1N0ZXBJbmRleCxcbiAgICAgICAgICBwcmV2aW91c1N0ZXA6IGN1cnJlbnRTdGVwLFxuICAgICAgICAgIHByZXZpb3VzU3RlcEluZGV4OiBjdXJyZW50U3RlcEluZGV4LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LCAwKTtcbiAgfVxuXG4gIHByaXZhdGUgX21hcmtDdXJyZW50QXNEb25lKCk6IHZvaWQge1xuICAgIHRoaXMuX2FjdGl2ZVN0ZXAuaXNDb21wbGV0ZWQgPSB0cnVlO1xuICAgIHRoaXMuX2FjdGl2ZVN0ZXAuaXNJbnZhbGlkID0gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIF9tYXJrQ3VycmVudEFzV3JvbmcoKTogdm9pZCB7XG4gICAgdGhpcy5fYWN0aXZlU3RlcC5pc0ludmFsaWQgPSB0cnVlO1xuICAgIHRoaXMuX2FjdGl2ZVN0ZXAuaXNDb21wbGV0ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgX21hcmtTdGVwQ29udHJvbHNBc0RpcnR5KHN0ZXA6IE1kYlN0ZXBDb21wb25lbnQpOiB2b2lkIHtcbiAgICBjb25zdCBjb250cm9scyA9IHN0ZXAuc3RlcEZvcm0uY29udHJvbHM7XG4gICAgaWYgKHN0ZXAuc3RlcEZvcm0uY29udHJvbHMpIHtcbiAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhjb250cm9scyk7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IHByZWZlci1mb3Itb2ZcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBjb250cm9sID0gY29udHJvbHNba2V5c1tpXV07XG5cbiAgICAgICAgaWYgKGNvbnRyb2wgaW5zdGFuY2VvZiBGb3JtQ29udHJvbCkge1xuICAgICAgICAgIGNvbnRyb2wubWFya0FzVG91Y2hlZCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlU3RlcFZhbGlkYXRpb25DbGFzc2VzKHN0ZXA6IE1kYlN0ZXBDb21wb25lbnQpOiB2b2lkIHtcbiAgICBzdGVwLmlzQ29tcGxldGVkID0gZmFsc2U7XG4gICAgc3RlcC5pc0ludmFsaWQgPSBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgX2lzTmV3U3RlcExpbmVhcihuZXdTdGVwSW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZVN0ZXBJbmRleCAtIG5ld1N0ZXBJbmRleCA9PT0gMSB8fCB0aGlzLmFjdGl2ZVN0ZXBJbmRleCAtIG5ld1N0ZXBJbmRleCA9PT0gLTE7XG4gIH1cblxuICBwcml2YXRlIF9zZXRBY3RpdmVTdGVwKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnN0ZXBzLnRvQXJyYXkoKVtpbmRleF0uaXNBY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMuYWN0aXZlU3RlcEluZGV4ID0gaW5kZXg7XG4gICAgdGhpcy5fYWN0aXZlU3RlcCA9IHRoaXMuX2dldFN0ZXBCeUluZGV4KHRoaXMuYWN0aXZlU3RlcEluZGV4KTtcbiAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUN1cnJlbnRBY3RpdmVTdGVwKCk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnRBY3RpdmVTdGVwID0gdGhpcy5zdGVwcy5maW5kKChhY3RpdmVTdGVwKSA9PiBhY3RpdmVTdGVwLmlzQWN0aXZlKTtcbiAgICBpZiAoY3VycmVudEFjdGl2ZVN0ZXApIHtcbiAgICAgIGN1cnJlbnRBY3RpdmVTdGVwLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmVzZXRBbGwoKTogdm9pZCB7XG4gICAgdGhpcy5zdGVwcy5mb3JFYWNoKChzdGVwOiBNZGJTdGVwQ29tcG9uZW50KSA9PiB7XG4gICAgICBzdGVwLnJlc2V0KCk7XG4gICAgICB0aGlzLl9zZXRBY3RpdmVTdGVwKDApO1xuICAgICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fc2V0QWN0aXZlU3RlcCgwKTtcblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICB0aGlzLnN0ZXBzLmNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveSkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKSk7XG5cbiAgICBtZXJnZSguLi50aGlzLnN0ZXBzLm1hcCgoc3RlcDogTWRiU3RlcENvbXBvbmVudCkgPT4gc3RlcC5fb25DaGFuZ2VzKSlcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95KSlcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGVwcmVjYXRpb25cbiAgICAgIC5zdWJzY3JpYmUoKF8pID0+IHRoaXMuX2NkUmVmLm1hcmtGb3JDaGVjaygpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX2Rlc3Ryb3kubmV4dCgpO1xuICAgIHRoaXMuX2Rlc3Ryb3kuY29tcGxldGUoKTtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9saW5lYXI6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX21vYmlsZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbWFya0FzQ29tcGxldGVkOiBCb29sZWFuSW5wdXQ7XG59XG4iLCI8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJvcmllbnRhdGlvblwiPlxuICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCInaG9yaXpvbnRhbCdcIj5cbiAgICA8ZGl2ICpuZ0lmPVwibW9iaWxlXCIgY2xhc3M9XCJzdGVwcGVyLW1vYmlsZS1oZWFkIGJnLWxpZ2h0XCI+XG4gICAgICB7eyBzdGVwcGVyTW9iaWxlU3RlcFR4dCB9fSB7eyBhY3RpdmVTdGVwSW5kZXggKyAxIH19IHt7IHN0ZXBwZXJNb2JpbGVPZlR4dCB9fVxuICAgICAge3sgYWxsU3RlcHNOdW1iZXIgfX1cbiAgICA8L2Rpdj5cbiAgICA8dWxcbiAgICAgIGNsYXNzPVwic3RlcHBlciBzdGVwcGVyLWhvcml6b250YWxcIlxuICAgICAgW25nQ2xhc3NdPVwie1xuICAgICAgICAnc3RlcHBlci1tb2JpbGUnOiBtb2JpbGUsXG4gICAgICAgICdzdGVwcGVyLXByb2dyZXNzLWJhcic6IG1vYmlsZSAmJiBzdGVwcy5sZW5ndGggPiBtb2JpbGVCYXJCcmVha3BvaW50XG4gICAgICB9XCJcbiAgICA+XG4gICAgICA8bGlcbiAgICAgICAgW25nQ2xhc3NdPVwie1xuICAgICAgICAgICdzdGVwcGVyLWFjdGl2ZSc6IHN0ZXAuaXNBY3RpdmUsXG4gICAgICAgICAgJ3N0ZXBwZXItY29tcGxldGVkJzogc3RlcC5pc0NvbXBsZXRlZCxcbiAgICAgICAgICAnc3RlcHBlci1pbnZhbGlkJzogc3RlcC5pc0ludmFsaWRcbiAgICAgICAgfVwiXG4gICAgICAgIGNsYXNzPVwic3RlcHBlci1zdGVwXCJcbiAgICAgICAgKm5nRm9yPVwibGV0IHN0ZXAgb2Ygc3RlcHM7IGxldCBpID0gaW5kZXhcIlxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3RlcHBlci1oZWFkXCIgKGNsaWNrKT1cImhhbmRsZUhlYWRlckNsaWNrKGkpXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJzdGVwcGVyLWhlYWQtaWNvblwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFzdGVwLmljb25cIj57eyBpICsgMSB9fTwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cInN0ZXAuaWNvblwiPlxuICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgW2Nka1BvcnRhbE91dGxldF09XCJzdGVwLmljb25cIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJzdGVwcGVyLWhlYWQtdGV4dFwiPnt7IHN0ZXAubmFtZSB9fTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2xpPlxuICAgIDwvdWw+XG4gICAgPGRpdiBjbGFzcz1cInN0ZXBwZXItaG9yaXpvbnRhbC1jb250ZW50LWNvbnRhaW5lclwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgc3RlcCBvZiBzdGVwczsgbGV0IGkgPSBpbmRleFwiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJzdGVwcGVyLWNvbnRlbnRcIlxuICAgICAgICAgIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwiYWN0aXZlU3RlcEluZGV4ID09PSBpXCJcbiAgICAgICAgICBbQGhvcml6b250YWxBbmltYXRpb25dPVwiZ2V0QW5pbWF0aW9uU3RhdGUoaSlcIlxuICAgICAgICA+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJzdGVwLmNvbnRlbnRcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2ICpuZ0lmPVwibW9iaWxlXCIgY2xhc3M9XCJzdGVwcGVyLW1vYmlsZS1mb290ZXIgYmctbGlnaHRcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzdGVwcGVyLWJhY2stYnRuXCI+XG4gICAgICAgIDxidXR0b24gKGNsaWNrKT1cInByZXZpb3VzKClcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWxpbmtcIj5cbiAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1jaGV2cm9uLWxlZnRcIj48L2k+e3sgc3RlcHBlck1vYmlsZUJhY2tCdG4gfX1cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgKm5nSWY9XCJzdGVwcy5sZW5ndGggPiBtb2JpbGVCYXJCcmVha3BvaW50XCIgY2xhc3M9XCJzdGVwcGVyLW1vYmlsZS1wcm9ncmVzcyBncmF5LTUwMFwiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJzdGVwcGVyLW1vYmlsZS1wcm9ncmVzcy1iYXIgYmctcHJpbWFyeVwiXG4gICAgICAgICAgW3N0eWxlLndpZHRoLiVdPVwiZ2V0UHJvZ3Jlc3NCYXJXaWR0aCgpXCJcbiAgICAgICAgPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwic3RlcHBlci1uZXh0LWJ0blwiPlxuICAgICAgICA8YnV0dG9uIChjbGljayk9XCJuZXh0KClcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWxpbmtcIj5cbiAgICAgICAgICB7eyBzdGVwcGVyTW9iaWxlTmV4dEJ0biB9fTxpIGNsYXNzPVwiZmFzIGZhLWNoZXZyb24tcmlnaHRcIj48L2k+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvbmctY29udGFpbmVyPlxuXG4gIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIid2ZXJ0aWNhbCdcIj5cbiAgICA8dWwgY2xhc3M9XCJzdGVwcGVyIHN0ZXBwZXItdmVydGljYWxcIj5cbiAgICAgIDxsaVxuICAgICAgICBbbmdDbGFzc109XCJ7XG4gICAgICAgICAgJ3N0ZXBwZXItYWN0aXZlJzogc3RlcC5pc0FjdGl2ZSxcbiAgICAgICAgICAnc3RlcHBlci1jb21wbGV0ZWQnOiBzdGVwLmlzQ29tcGxldGVkLFxuICAgICAgICAgICdzdGVwcGVyLWludmFsaWQnOiBzdGVwLmlzSW52YWxpZFxuICAgICAgICB9XCJcbiAgICAgICAgY2xhc3M9XCJzdGVwcGVyLXN0ZXBcIlxuICAgICAgICAqbmdGb3I9XCJsZXQgc3RlcCBvZiBzdGVwczsgbGV0IGkgPSBpbmRleFwiXG4gICAgICA+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzdGVwcGVyLWhlYWRcIiAoY2xpY2spPVwiaGFuZGxlSGVhZGVyQ2xpY2soaSlcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInN0ZXBwZXItaGVhZC1pY29uXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXN0ZXAuaWNvblwiPnt7IGkgKyAxIH19PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwic3RlcC5pY29uXCI+XG4gICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBbY2RrUG9ydGFsT3V0bGV0XT1cInN0ZXAuaWNvblwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInN0ZXBwZXItaGVhZC10ZXh0XCI+e3sgc3RlcC5uYW1lIH19PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInN0ZXBwZXItdmVydGljYWwtY29udGVudC1jb250YWluZXJcIiBbQHZlcnRpY2FsQW5pbWF0aW9uXT1cImdldEFuaW1hdGlvblN0YXRlKGkpXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInN0ZXBwZXItY29udGVudFwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJzdGVwLmNvbnRlbnRcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2xpPlxuICAgIDwvdWw+XG4gIDwvbmctY29udGFpbmVyPlxuPC9uZy1jb250YWluZXI+XG4iXX0=