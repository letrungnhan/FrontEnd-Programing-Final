import * as i0 from '@angular/core';
import { InjectionToken, Directive, TemplateRef, Component, ChangeDetectionStrategy, ContentChild, ViewChild, Input, EventEmitter, ContentChildren, ViewChildren, Output, NgModule } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i2 from '@angular/cdk/portal';
import { TemplatePortal, PortalModule } from '@angular/cdk/portal';
import { Subject, merge } from 'rxjs';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';

const MDB_STEP_ICON = new InjectionToken('MdbStepIconDirective');
class MdbStepIconDirective {
    constructor(template) {
        this.template = template;
    }
}
MdbStepIconDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbStepIconDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
MdbStepIconDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.7", type: MdbStepIconDirective, selector: "[mdbStepIcon]", providers: [{ provide: MDB_STEP_ICON, useExisting: MdbStepIconDirective }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbStepIconDirective, decorators: [{
            type: Directive,
            args: [{
                    // tslint:disable-next-line: directive-selector
                    selector: '[mdbStepIcon]',
                    providers: [{ provide: MDB_STEP_ICON, useExisting: MdbStepIconDirective }],
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });

class MdbStepComponent {
    constructor(el, _vcr) {
        this.el = el;
        this._vcr = _vcr;
        this._editable = true;
        this._optional = false;
        this._onChanges = new Subject();
        this._isActive = false;
        this._iconPortal = null;
    }
    get editable() {
        return this._editable;
    }
    set editable(value) {
        this._editable = coerceBooleanProperty(value);
    }
    get optional() {
        return this._optional;
    }
    set optional(value) {
        this._optional = coerceBooleanProperty(value);
    }
    get isCompleted() {
        return this._isCompleted;
    }
    set isCompleted(value) {
        this._isCompleted = value;
    }
    get isInvalid() {
        return this._isInvalid;
    }
    set isInvalid(value) {
        this._isInvalid = value;
        this._onChanges.next();
    }
    get isActive() {
        return this._isActive;
    }
    set isActive(value) {
        this._isActive = value;
    }
    get icon() {
        return this._iconPortal;
    }
    _removeClasses() {
        this.isActive = false;
        this.isCompleted = false;
        this.isInvalid = false;
    }
    reset() {
        if (this.stepForm) {
            this.stepForm.reset();
        }
        this._removeClasses();
    }
    ngAfterContentInit() {
        if (this._icon) {
            this._createIconPortal();
        }
    }
    ngOnChanges(changes) {
        if (changes.name && !changes.name.isFirstChange()) {
            this._onChanges.next();
        }
        if (changes.label && !changes.label.isFirstChange()) {
            this._onChanges.next();
        }
        if (changes.editable && !changes.editable.isFirstChange()) {
            this._onChanges.next();
        }
        if (changes.optional && !changes.optional.isFirstChange()) {
            this._onChanges.next();
        }
        if (changes.stepForm && !changes.stepForm.isFirstChange()) {
            this._onChanges.next();
        }
    }
    _createIconPortal() {
        this._iconPortal = new TemplatePortal(this._icon, this._vcr);
    }
}
MdbStepComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbStepComponent, deps: [{ token: i0.ElementRef }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component });
MdbStepComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbStepComponent, selector: "mdb-step", inputs: { editable: "editable", name: "name", label: "label", optional: "optional", stepForm: "stepForm" }, queries: [{ propertyName: "_icon", first: true, predicate: MDB_STEP_ICON, descendants: true, read: TemplateRef, static: true }], viewQueries: [{ propertyName: "content", first: true, predicate: TemplateRef, descendants: true, static: true }], exportAs: ["mdbStep"], usesOnChanges: true, ngImport: i0, template: '<ng-template><ng-content></ng-content></ng-template>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbStepComponent, decorators: [{
            type: Component,
            args: [{
                    // tslint:disable-next-line: component-selector
                    selector: 'mdb-step',
                    exportAs: 'mdbStep',
                    template: '<ng-template><ng-content></ng-content></ng-template>',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ViewContainerRef }]; }, propDecorators: { _icon: [{
                type: ContentChild,
                args: [MDB_STEP_ICON, { read: TemplateRef, static: true }]
            }], content: [{
                type: ViewChild,
                args: [TemplateRef, { static: true }]
            }], editable: [{
                type: Input
            }], name: [{
                type: Input
            }], label: [{
                type: Input
            }], optional: [{
                type: Input
            }], stepForm: [{
                type: Input
            }] } });

const horizontalAnimation = trigger('horizontalAnimation', [
    state('previous', style({ transform: 'translateX(-100%)', visibility: 'hidden' })),
    state('next', style({ transform: 'translateX(100%)', visibility: 'hidden' })),
    state('current', style({ transform: 'none', visibility: 'visible' })),
    transition('* => *', animate('600ms ease')),
]);
const verticalAnimation = trigger('verticalAnimation', [
    state('previous', style({ height: '0px', visibility: 'hidden' })),
    state('next', style({ height: '0px', visibility: 'hidden' })),
    state('current', style({ height: '*', visibility: 'visible' })),
    transition('* => *', animate('300ms ease')),
]);

class MdbStepperComponent {
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

class MdbStepperModule {
}
MdbStepperModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbStepperModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbStepperModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbStepperModule, declarations: [MdbStepperComponent, MdbStepComponent, MdbStepIconDirective], imports: [CommonModule, PortalModule], exports: [MdbStepperComponent, MdbStepComponent, MdbStepIconDirective] });
MdbStepperModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbStepperModule, imports: [[CommonModule, PortalModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbStepperModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [MdbStepperComponent, MdbStepComponent, MdbStepIconDirective],
                    exports: [MdbStepperComponent, MdbStepComponent, MdbStepIconDirective],
                    imports: [CommonModule, PortalModule],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MdbStepComponent, MdbStepIconDirective, MdbStepperComponent, MdbStepperModule };
//# sourceMappingURL=mdb-angular-ui-kit-stepper.mjs.map
