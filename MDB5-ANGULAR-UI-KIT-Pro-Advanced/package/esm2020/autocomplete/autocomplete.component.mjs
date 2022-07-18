import { Component, ContentChildren, EventEmitter, Input, Output, ViewChild, ViewEncapsulation, ChangeDetectionStrategy, } from '@angular/core';
import { MdbOptionComponent, MDB_OPTION_PARENT } from 'mdb-angular-ui-kit/option';
import { Subject } from 'rxjs';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { dropdownAnimation, dropdownContainerAnimation } from './autocomplete.animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class MdbAutocompleteComponent {
    constructor(_cdRef) {
        this._cdRef = _cdRef;
        this._optionHeight = 38;
        // Equal to 5 * optionHeight (which is 38px by default)
        this._listHeight = 190;
        this.selected = new EventEmitter();
        this.opened = new EventEmitter();
        this.closed = new EventEmitter();
        this._destroy$ = new Subject();
        this._isOpen = false;
        this.showNoResultText = false;
    }
    get autoSelect() {
        return this._autoSelect;
    }
    set autoSelect(value) {
        this._autoSelect = coerceBooleanProperty(value);
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    get optionHeight() {
        return this._optionHeight;
    }
    set optionHeight(value) {
        if (value !== 0) {
            this._optionHeight = value;
        }
    }
    get listHeight() {
        return this._listHeight;
    }
    set listHeight(value) {
        if (value !== 0) {
            this._listHeight = value;
        }
    }
    _getOptionsArray() {
        return this.options.toArray();
    }
    get isOpen() {
        return this._isOpen;
    }
    _getScrollTop() {
        return this.dropdown ? this.dropdown.nativeElement.scrollTop : 0;
    }
    _setScrollTop(scrollPosition) {
        if (this.dropdown) {
            this.dropdown.nativeElement.scrollTop = scrollPosition;
        }
    }
    _markForCheck() {
        this._cdRef.markForCheck();
    }
    ngAfterContentInit() {
        this._keyManager = new ActiveDescendantKeyManager(this.options);
    }
    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }
}
MdbAutocompleteComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbAutocompleteComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MdbAutocompleteComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbAutocompleteComponent, selector: "mdb-autocomplete", inputs: { autoSelect: "autoSelect", disabled: "disabled", optionHeight: "optionHeight", listHeight: "listHeight", displayValue: "displayValue" }, outputs: { selected: "selected", opened: "opened", closed: "closed" }, providers: [{ provide: MDB_OPTION_PARENT, useExisting: MdbAutocompleteComponent }], queries: [{ propertyName: "options", predicate: MdbOptionComponent, descendants: true }], viewQueries: [{ propertyName: "dropdown", first: true, predicate: ["dropdown"], descendants: true }, { propertyName: "dropdownTemplate", first: true, predicate: ["dropdownTemplate"], descendants: true, static: true }], exportAs: ["mdbAutocomplete"], ngImport: i0, template: "<ng-template #dropdownTemplate>\n  <div [@dropdownContainerAnimation] class=\"autocomplete-dropdown-container\">\n    <div [@dropdownAnimation] role=\"listbox\" class=\"autocomplete-dropdown\">\n      <div\n        #dropdown\n        class=\"autocomplete-items-list\"\n        [ngStyle]=\"{\n          'max-height.px': listHeight\n        }\"\n      >\n        <ng-content></ng-content>\n      </div>\n      <ng-content select=\".autocomplete-no-results\"></ng-content>\n      <ng-content select=\".autocomplete-custom-content\"></ng-content>\n    </div>\n  </div>\n</ng-template>\n", directives: [{ type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], animations: [dropdownAnimation, dropdownContainerAnimation], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbAutocompleteComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-autocomplete', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, exportAs: 'mdbAutocomplete', animations: [dropdownAnimation, dropdownContainerAnimation], providers: [{ provide: MDB_OPTION_PARENT, useExisting: MdbAutocompleteComponent }], template: "<ng-template #dropdownTemplate>\n  <div [@dropdownContainerAnimation] class=\"autocomplete-dropdown-container\">\n    <div [@dropdownAnimation] role=\"listbox\" class=\"autocomplete-dropdown\">\n      <div\n        #dropdown\n        class=\"autocomplete-items-list\"\n        [ngStyle]=\"{\n          'max-height.px': listHeight\n        }\"\n      >\n        <ng-content></ng-content>\n      </div>\n      <ng-content select=\".autocomplete-no-results\"></ng-content>\n      <ng-content select=\".autocomplete-custom-content\"></ng-content>\n    </div>\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { options: [{
                type: ContentChildren,
                args: [MdbOptionComponent, { descendants: true }]
            }], dropdown: [{
                type: ViewChild,
                args: ['dropdown', { static: false }]
            }], dropdownTemplate: [{
                type: ViewChild,
                args: ['dropdownTemplate', { static: true }]
            }], autoSelect: [{
                type: Input
            }], disabled: [{
                type: Input
            }], optionHeight: [{
                type: Input
            }], listHeight: [{
                type: Input
            }], displayValue: [{
                type: Input
            }], selected: [{
                type: Output
            }], opened: [{
                type: Output
            }], closed: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCxTQUFTLEVBQ1QsZUFBZSxFQUVmLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxpQkFBaUIsRUFJakIsdUJBQXVCLEdBRXhCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xGLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLDBCQUEwQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDMUYsT0FBTyxFQUFnQixxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7QUFnQjVFLE1BQU0sT0FBTyx3QkFBd0I7SUFpRW5DLFlBQW9CLE1BQXlCO1FBQXpCLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBN0JyQyxrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQVkzQix1REFBdUQ7UUFDL0MsZ0JBQVcsR0FBRyxHQUFHLENBQUM7UUFJaEIsYUFBUSxHQUNoQixJQUFJLFlBQVksRUFBZ0MsQ0FBQztRQUN6QyxXQUFNLEdBQXVCLElBQUksWUFBWSxFQUFRLENBQUM7UUFDdEQsV0FBTSxHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBRXhELGNBQVMsR0FBRyxJQUFJLE9B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QUFFO2dCQUNTLGdCQUFnQjtzQkFBaEUsU0FBUzt1QkFBQyxrQkFBa0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBRzNDLFVBQVU7c0JBRGIsS0FBSztnQkFVRixRQUFRO3NCQURYLEtBQUs7Z0JBVUYsWUFBWTtzQkFEZixLQUFLO2dCQWNGLFVBQVU7c0JBRGIsS0FBSztnQkFhRyxZQUFZO3NCQUFwQixLQUFLO2dCQUVJLFFBQVE7c0JBQWpCLE1BQU07Z0JBRUcsTUFBTTtzQkFBZixNQUFNO2dCQUNHLE1BQU07c0JBQWYsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIFF1ZXJ5TGlzdCxcbiAgT25EZXN0cm95LFxuICBUZW1wbGF0ZVJlZixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1kYk9wdGlvbkNvbXBvbmVudCwgTURCX09QVElPTl9QQVJFTlQgfSBmcm9tICdtZGItYW5ndWxhci11aS1raXQvb3B0aW9uJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgZHJvcGRvd25BbmltYXRpb24sIGRyb3Bkb3duQ29udGFpbmVyQW5pbWF0aW9uIH0gZnJvbSAnLi9hdXRvY29tcGxldGUuYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWRiQXV0b2NvbXBsZXRlU2VsZWN0ZWRFdmVudCB7XG4gIGNvbXBvbmVudDogTWRiQXV0b2NvbXBsZXRlQ29tcG9uZW50O1xuICBvcHRpb246IE1kYk9wdGlvbkNvbXBvbmVudDtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLWF1dG9jb21wbGV0ZScsXG4gIHRlbXBsYXRlVXJsOiAnYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGV4cG9ydEFzOiAnbWRiQXV0b2NvbXBsZXRlJyxcbiAgYW5pbWF0aW9uczogW2Ryb3Bkb3duQW5pbWF0aW9uLCBkcm9wZG93bkNvbnRhaW5lckFuaW1hdGlvbl0sXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogTURCX09QVElPTl9QQVJFTlQsIHVzZUV4aXN0aW5nOiBNZGJBdXRvY29tcGxldGVDb21wb25lbnQgfV0sXG59KVxuZXhwb3J0IGNsYXNzIE1kYkF1dG9jb21wbGV0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gIEBDb250ZW50Q2hpbGRyZW4oTWRiT3B0aW9uQ29tcG9uZW50LCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pXG4gIG9wdGlvbnM6IFF1ZXJ5TGlzdDxNZGJPcHRpb25Db21wb25lbnQ+O1xuXG4gIEBWaWV3Q2hpbGQoJ2Ryb3Bkb3duJywgeyBzdGF0aWM6IGZhbHNlIH0pIGRyb3Bkb3duOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdkcm9wZG93blRlbXBsYXRlJywgeyBzdGF0aWM6IHRydWUgfSkgZHJvcGRvd25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBASW5wdXQoKVxuICBnZXQgYXV0b1NlbGVjdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fYXV0b1NlbGVjdDtcbiAgfVxuICBzZXQgYXV0b1NlbGVjdCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2F1dG9TZWxlY3QgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2F1dG9TZWxlY3Q6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgZ2V0IG9wdGlvbkhlaWdodCgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25IZWlnaHQ7XG4gIH1cblxuICBzZXQgb3B0aW9uSGVpZ2h0KHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgIT09IDApIHtcbiAgICAgIHRoaXMuX29wdGlvbkhlaWdodCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX29wdGlvbkhlaWdodCA9IDM4O1xuXG4gIEBJbnB1dCgpXG4gIGdldCBsaXN0SGVpZ2h0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2xpc3RIZWlnaHQ7XG4gIH1cblxuICBzZXQgbGlzdEhlaWdodCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHZhbHVlICE9PSAwKSB7XG4gICAgICB0aGlzLl9saXN0SGVpZ2h0ID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIC8vIEVxdWFsIHRvIDUgKiBvcHRpb25IZWlnaHQgKHdoaWNoIGlzIDM4cHggYnkgZGVmYXVsdClcbiAgcHJpdmF0ZSBfbGlzdEhlaWdodCA9IDE5MDtcblxuICBASW5wdXQoKSBkaXNwbGF5VmFsdWU6ICgodmFsdWU6IGFueSkgPT4gc3RyaW5nKSB8IG51bGw7XG5cbiAgQE91dHB1dCgpIHNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8TWRiQXV0b2NvbXBsZXRlU2VsZWN0ZWRFdmVudD4gPVxuICAgIG5ldyBFdmVudEVtaXR0ZXI8TWRiQXV0b2NvbXBsZXRlU2VsZWN0ZWRFdmVudD4oKTtcbiAgQE91dHB1dCgpIG9wZW5lZDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgY2xvc2VkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgcHJpdmF0ZSBfZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIF9rZXlNYW5hZ2VyOiBBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlcjxNZGJPcHRpb25Db21wb25lbnQ+O1xuXG4gIHByaXZhdGUgX2lzT3BlbiA9IGZhbHNlO1xuICBwcm90ZWN0ZWQgc2hvd05vUmVzdWx0VGV4dCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBfZ2V0T3B0aW9uc0FycmF5KCk6IE1kYk9wdGlvbkNvbXBvbmVudFtdIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnRvQXJyYXkoKTtcbiAgfVxuXG4gIGdldCBpc09wZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzT3BlbjtcbiAgfVxuXG4gIF9nZXRTY3JvbGxUb3AoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5kcm9wZG93biA/IHRoaXMuZHJvcGRvd24ubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgOiAwO1xuICB9XG5cbiAgX3NldFNjcm9sbFRvcChzY3JvbGxQb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuZHJvcGRvd24pIHtcbiAgICAgIHRoaXMuZHJvcGRvd24ubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSBzY3JvbGxQb3NpdGlvbjtcbiAgICB9XG4gIH1cblxuICBfbWFya0ZvckNoZWNrKCkge1xuICAgIHRoaXMuX2NkUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuX2tleU1hbmFnZXIgPSBuZXcgQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXI8TWRiT3B0aW9uQ29tcG9uZW50Pih0aGlzLm9wdGlvbnMpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuX2Rlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbn1cbiIsIjxuZy10ZW1wbGF0ZSAjZHJvcGRvd25UZW1wbGF0ZT5cbiAgPGRpdiBbQGRyb3Bkb3duQ29udGFpbmVyQW5pbWF0aW9uXSBjbGFzcz1cImF1dG9jb21wbGV0ZS1kcm9wZG93bi1jb250YWluZXJcIj5cbiAgICA8ZGl2IFtAZHJvcGRvd25BbmltYXRpb25dIHJvbGU9XCJsaXN0Ym94XCIgY2xhc3M9XCJhdXRvY29tcGxldGUtZHJvcGRvd25cIj5cbiAgICAgIDxkaXZcbiAgICAgICAgI2Ryb3Bkb3duXG4gICAgICAgIGNsYXNzPVwiYXV0b2NvbXBsZXRlLWl0ZW1zLWxpc3RcIlxuICAgICAgICBbbmdTdHlsZV09XCJ7XG4gICAgICAgICAgJ21heC1oZWlnaHQucHgnOiBsaXN0SGVpZ2h0XG4gICAgICAgIH1cIlxuICAgICAgPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIi5hdXRvY29tcGxldGUtbm8tcmVzdWx0c1wiPjwvbmctY29udGVudD5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIi5hdXRvY29tcGxldGUtY3VzdG9tLWNvbnRlbnRcIj48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cbiJdfQ==