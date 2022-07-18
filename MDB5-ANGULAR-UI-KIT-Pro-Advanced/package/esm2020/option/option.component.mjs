import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Input, HostListener, InjectionToken, Optional, Inject, HostBinding, EventEmitter, Output, } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export const MDB_OPTION_PARENT = new InjectionToken('MDB_OPTION_PARENT');
export const MDB_OPTION_GROUP = new InjectionToken('MDB_OPTION_GROUP');
export class MdbOptionComponent {
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
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MDB_OPTION_PARENT]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MDB_OPTION_GROUP]
                }] }]; }, propDecorators: { value: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9vcHRpb24vb3B0aW9uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9vcHRpb24vb3B0aW9uLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBZ0IscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RSxPQUFPLEVBQ0wsU0FBUyxFQUVULEtBQUssRUFDTCxZQUFZLEVBQ1osY0FBYyxFQUNkLFFBQVEsRUFDUixNQUFNLEVBRU4sV0FBVyxFQUVYLFlBQVksRUFDWixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBYyxNQUFNLE1BQU0sQ0FBQzs7O0FBYTNDLE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHLElBQUksY0FBYyxDQUFrQixtQkFBbUIsQ0FBQyxDQUFDO0FBRTFGLE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFHLElBQUksY0FBYyxDQUEwQixrQkFBa0IsQ0FBQyxDQUFDO0FBTWhHLE1BQU0sT0FBTyxrQkFBa0I7SUEwQzdCLFlBQ1UsR0FBZSxFQUNmLE1BQXlCLEVBQ2EsT0FBd0IsRUFDekIsS0FBcUI7UUFIMUQsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUNmLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQ2EsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFDekIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUEzQ3BFLFdBQU0sR0FBRyxLQUFLLENBQUM7UUF3QlAsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUVQLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQXNCLENBQUM7UUFJcEUsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3hC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VUFBVTtzQkFEYixXQUFXO3VCQUFDLG9CQUFvQjtnQkFNN0IsVUFBVTtzQkFEYixXQUFXO3VCQUFDLG9CQUFvQjtnQkFNakMsT0FBTztzQkFETixZQUFZO3VCQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdGlvblRva2VuLFxuICBPcHRpb25hbCxcbiAgSW5qZWN0LFxuICBPbkluaXQsXG4gIEhvc3RCaW5kaW5nLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBPdXRwdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTWRiT3B0aW9uR3JvdXBDb21wb25lbnQgfSBmcm9tICcuL29wdGlvbi1ncm91cC5jb21wb25lbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1kYk9wdGlvblBhcmVudCB7XG4gIG9wdGlvbkhlaWdodDogbnVtYmVyO1xuICB2aXNpYmxlT3B0aW9uczogbnVtYmVyO1xuICBtdWx0aXBsZTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNZGJPcHRpb25Hcm91cCB7XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IE1EQl9PUFRJT05fUEFSRU5UID0gbmV3IEluamVjdGlvblRva2VuPE1kYk9wdGlvblBhcmVudD4oJ01EQl9PUFRJT05fUEFSRU5UJyk7XG5cbmV4cG9ydCBjb25zdCBNREJfT1BUSU9OX0dST1VQID0gbmV3IEluamVjdGlvblRva2VuPE1kYk9wdGlvbkdyb3VwQ29tcG9uZW50PignTURCX09QVElPTl9HUk9VUCcpO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZGItb3B0aW9uJyxcbiAgdGVtcGxhdGVVcmw6ICdvcHRpb24uY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBNZGJPcHRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSB2YWx1ZTogYW55O1xuXG4gIGhpZGRlbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBsYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9sYWJlbCB8fCB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LnRleHRDb250ZW50O1xuICB9XG4gIHNldCBsYWJlbChuZXdWYWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fbGFiZWwgPSBuZXdWYWx1ZTtcbiAgfVxuICBwcml2YXRlIF9sYWJlbDogc3RyaW5nO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuaGlkZGVuJylcbiAgZ2V0IGlzSGlkZGVuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmhpZGRlbjtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZGlzYWJsZWQnKVxuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkIHx8ICh0aGlzLmdyb3VwICYmIHRoaXMuZ3JvdXAuZGlzYWJsZWQpO1xuICB9XG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSByZWFkb25seSBzZWxlY3Rpb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE1kYk9wdGlvbkNvbXBvbmVudD4oKTtcblxuICBfb3B0aW9uSGVpZ2h0OiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBfc2VsZWN0ZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfYWN0aXZlID0gZmFsc2U7XG4gIF9tdWx0aXBsZSA9IGZhbHNlO1xuXG4gIGNsaWNrZWQgPSBmYWxzZTtcblxuICBjbGlja1NvdXJjZTogU3ViamVjdDxNZGJPcHRpb25Db21wb25lbnQ+ID0gbmV3IFN1YmplY3Q8TWRiT3B0aW9uQ29tcG9uZW50PigpO1xuICBjbGljayQ6IE9ic2VydmFibGU8TWRiT3B0aW9uQ29tcG9uZW50PiA9IHRoaXMuY2xpY2tTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBfY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTURCX09QVElPTl9QQVJFTlQpIHB1YmxpYyBfcGFyZW50OiBNZGJPcHRpb25QYXJlbnQsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChNREJfT1BUSU9OX0dST1VQKSBwdWJsaWMgZ3JvdXA6IE1kYk9wdGlvbkdyb3VwXG4gICkge1xuICAgIHRoaXMuY2xpY2tlZCA9IGZhbHNlO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5vcHRpb24nKVxuICBvcHRpb24gPSB0cnVlO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYWN0aXZlJylcbiAgZ2V0IGFjdGl2ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zZWxlY3RlZCcpXG4gIGdldCBzZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmhlaWdodC5weCcpXG4gIGdldCBvcHRpb25IZWlnaHQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9uSGVpZ2h0O1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnJvbGUnKVxuICBnZXQgcm9sZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiAnb3B0aW9uJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWRpc2FibGVkJylcbiAgZ2V0IGlzRGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgPyB0cnVlIDogZmFsc2U7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1zZWxlY3RlZCcpXG4gIGdldCBpc1NlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCk6IHZvaWQge1xuICAgIHRoaXMuY2xpY2tTb3VyY2UubmV4dCh0aGlzKTtcbiAgfVxuXG4gIGdldExhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQudGV4dENvbnRlbnQ7XG4gIH1cblxuICBnZXQgb2Zmc2V0SGVpZ2h0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3BhcmVudCAmJiB0aGlzLl9wYXJlbnQub3B0aW9uSGVpZ2h0KSB7XG4gICAgICB0aGlzLl9vcHRpb25IZWlnaHQgPSB0aGlzLl9wYXJlbnQub3B0aW9uSGVpZ2h0O1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9wYXJlbnQgJiYgdGhpcy5fcGFyZW50Lm11bHRpcGxlKSB7XG4gICAgICB0aGlzLl9tdWx0aXBsZSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fc2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuX3NlbGVjdGVkID0gdGhpcy5fbXVsdGlwbGUgPyAhdGhpcy5fc2VsZWN0ZWQgOiB0cnVlO1xuICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzKTtcbiAgICAgIHRoaXMuX2NkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIGRlc2VsZWN0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9zZWxlY3RlZCkge1xuICAgICAgdGhpcy5fc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcyk7XG4gICAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBzZXRBY3RpdmVTdHlsZXMoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9hY3RpdmUpIHtcbiAgICAgIHRoaXMuX2FjdGl2ZSA9IHRydWU7XG4gICAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBzZXRJbmFjdGl2ZVN0eWxlcygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fYWN0aXZlKSB7XG4gICAgICB0aGlzLl9hY3RpdmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuX2NkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogQm9vbGVhbklucHV0O1xufVxuIiwiPHNwYW4gY2xhc3M9XCJvcHRpb24tdGV4dFwiIG5nQ2xhc3M9XCJ7J2FjdGl2ZScsIGFjdGl2ZX1cIj5cbiAgPGlucHV0ICpuZ0lmPVwiX211bHRpcGxlXCIgY2xhc3M9XCJmb3JtLWNoZWNrLWlucHV0XCIgdHlwZT1cImNoZWNrYm94XCIgW2NoZWNrZWRdPVwic2VsZWN0ZWRcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiAvPlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L3NwYW4+XG48bmctY29udGVudCBzZWxlY3Q9XCIub3B0aW9uLWljb24tY29udGFpbmVyXCI+PC9uZy1jb250ZW50PlxuIl19