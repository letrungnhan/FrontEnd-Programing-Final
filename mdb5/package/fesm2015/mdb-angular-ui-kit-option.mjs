import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from '@angular/core';
import { InjectionToken, EventEmitter, Component, Optional, Inject, Input, HostBinding, Output, HostListener, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';

const MDB_OPTION_PARENT = new InjectionToken('MDB_OPTION_PARENT');
const MDB_OPTION_GROUP = new InjectionToken('MDB_OPTION_GROUP');
class MdbOptionComponent {
    constructor(_el, _cdRef, _parent, group) {
        this._el = _el;
        this._cdRef = _cdRef;
        this._parent = _parent;
        this.group = group;
        this.hidden = false;
        this._disabled = false;
        this.selectionChange = new EventEmitter();
        this._selected = false;
        this._active = false;
        this._multiple = false;
        this.clicked = false;
        this.clickSource = new Subject();
        this.click$ = this.clickSource.asObservable();
        this.option = true;
        this.clicked = false;
    }
    get label() {
        return this._label || this._el.nativeElement.textContent;
    }
    set label(newValue) {
        this._label = newValue;
    }
    get isHidden() {
        return this.hidden;
    }
    get disabled() {
        return this._disabled || (this.group && this.group.disabled);
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    get active() {
        return this._active;
    }
    get selected() {
        return this._selected;
    }
    get optionHeight() {
        return this._optionHeight;
    }
    get role() {
        return 'option';
    }
    get isDisabled() {
        return this.disabled ? true : false;
    }
    get isSelected() {
        return this.selected;
    }
    onClick() {
        this.clickSource.next(this);
    }
    getLabel() {
        return this._el.nativeElement.textContent;
    }
    get offsetHeight() {
        return this._el.nativeElement.offsetHeight;
    }
    ngOnInit() {
        if (this._parent && this._parent.optionHeight) {
            this._optionHeight = this._parent.optionHeight;
        }
        if (this._parent && this._parent.multiple) {
            this._multiple = true;
        }
    }
    select() {
        if (!this._selected) {
            this._selected = this._multiple ? !this._selected : true;
            this.selectionChange.emit(this);
            this._cdRef.markForCheck();
        }
    }
    deselect() {
        if (this._selected) {
            this._selected = false;
            this.selectionChange.emit(this);
            this._cdRef.markForCheck();
        }
    }
    setActiveStyles() {
        if (!this._active) {
            this._active = true;
            this._cdRef.markForCheck();
        }
    }
    setInactiveStyles() {
        if (this._active) {
            this._active = false;
            this._cdRef.markForCheck();
        }
    }
}
MdbOptionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbOptionComponent, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: MDB_OPTION_PARENT, optional: true }, { token: MDB_OPTION_GROUP, optional: true }], target: i0.ɵɵFactoryTarget.Component });
MdbOptionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbOptionComponent, selector: "mdb-option", inputs: { value: "value", label: "label", disabled: "disabled" }, outputs: { selectionChange: "selectionChange" }, host: { listeners: { "click": "onClick()" }, properties: { "class.hidden": "this.isHidden", "class.disabled": "this.disabled", "class.option": "this.option", "class.active": "this.active", "class.selected": "this.selected", "style.height.px": "this.optionHeight", "attr.role": "this.role", "attr.aria-disabled": "this.isDisabled", "attr.aria-selected": "this.isSelected" } }, ngImport: i0, template: "<span class=\"option-text\" ngClass=\"{'active', active}\">\n  <input *ngIf=\"_multiple\" class=\"form-check-input\" type=\"checkbox\" [checked]=\"selected\" [disabled]=\"disabled\" />\n  <ng-content></ng-content>\n</span>\n<ng-content select=\".option-icon-container\"></ng-content>\n", directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-option', template: "<span class=\"option-text\" ngClass=\"{'active', active}\">\n  <input *ngIf=\"_multiple\" class=\"form-check-input\" type=\"checkbox\" [checked]=\"selected\" [disabled]=\"disabled\" />\n  <ng-content></ng-content>\n</span>\n<ng-content select=\".option-icon-container\"></ng-content>\n" }]
        }], ctorParameters: function () {
        return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [MDB_OPTION_PARENT]
                    }] }, { type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [MDB_OPTION_GROUP]
                    }] }];
    }, propDecorators: { value: [{
                type: Input
            }], label: [{
                type: Input
            }], isHidden: [{
                type: HostBinding,
                args: ['class.hidden']
            }], disabled: [{
                type: HostBinding,
                args: ['class.disabled']
            }, {
                type: Input
            }], selectionChange: [{
                type: Output
            }], option: [{
                type: HostBinding,
                args: ['class.option']
            }], active: [{
                type: HostBinding,
                args: ['class.active']
            }], selected: [{
                type: HostBinding,
                args: ['class.selected']
            }], optionHeight: [{
                type: HostBinding,
                args: ['style.height.px']
            }], role: [{
                type: HostBinding,
                args: ['attr.role']
            }], isDisabled: [{
                type: HostBinding,
                args: ['attr.aria-disabled']
            }], isSelected: [{
                type: HostBinding,
                args: ['attr.aria-selected']
            }], onClick: [{
                type: HostListener,
                args: ['click']
            }] } });

class MdbOptionGroupComponent {
    constructor(_parent) {
        this._parent = _parent;
        this.optionGroup = true;
        this._optionHeight = 48;
        this._disabled = false;
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = value;
    }
    ngOnInit() {
        if (this._parent && this._parent.visibleOptions && this._parent.optionHeight) {
            this._optionHeight = this._parent.optionHeight;
        }
    }
}
MdbOptionGroupComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbOptionGroupComponent, deps: [{ token: MDB_OPTION_PARENT, optional: true }], target: i0.ɵɵFactoryTarget.Component });
MdbOptionGroupComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbOptionGroupComponent, selector: "mdb-option-group", inputs: { label: "label", disabled: "disabled" }, host: { properties: { "class.option-group": "this.optionGroup" } }, providers: [{ provide: MDB_OPTION_GROUP, useExisting: MdbOptionGroupComponent }], ngImport: i0, template: "<label\n  class=\"option-group-label\"\n  [style.height.px]=\"_optionHeight\"\n  [style.line-height.px]=\"_optionHeight\"\n  >{{ label }}</label\n>\n<ng-content select=\"mdb-option\"></ng-content>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbOptionGroupComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-option-group', changeDetection: ChangeDetectionStrategy.OnPush, providers: [{ provide: MDB_OPTION_GROUP, useExisting: MdbOptionGroupComponent }], template: "<label\n  class=\"option-group-label\"\n  [style.height.px]=\"_optionHeight\"\n  [style.line-height.px]=\"_optionHeight\"\n  >{{ label }}</label\n>\n<ng-content select=\"mdb-option\"></ng-content>\n" }]
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Optional
                    }, {
                        type: Inject,
                        args: [MDB_OPTION_PARENT]
                    }] }];
    }, propDecorators: { optionGroup: [{
                type: HostBinding,
                args: ['class.option-group']
            }], label: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });

class MdbOptionModule {
}
MdbOptionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbOptionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbOptionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbOptionModule, declarations: [MdbOptionComponent, MdbOptionGroupComponent], imports: [CommonModule], exports: [MdbOptionComponent, MdbOptionGroupComponent] });
MdbOptionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbOptionModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbOptionModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [MdbOptionComponent, MdbOptionGroupComponent],
                    imports: [CommonModule],
                    exports: [MdbOptionComponent, MdbOptionGroupComponent],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MDB_OPTION_GROUP, MDB_OPTION_PARENT, MdbOptionComponent, MdbOptionGroupComponent, MdbOptionModule };
//# sourceMappingURL=mdb-angular-ui-kit-option.mjs.map
