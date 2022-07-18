import * as i0 from '@angular/core';
import { EventEmitter, Component, ChangeDetectionStrategy, Input, Output, ContentChildren, NgModule } from '@angular/core';
import { Subject, merge } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';

class MdbRatingIconComponent {
    constructor(_cdRef) {
        this._cdRef = _cdRef;
        this.color = 'primary';
        this.activeIcon = new EventEmitter();
        this._active = false;
        this._icon = 'fa-star fa-sm';
        this._after = '';
        this._before = '';
        this.disabled = false;
    }
    set icon(value) {
        this._icon = value;
    }
    get icon() {
        return this._icon;
    }
    set active(value) {
        this._active = coerceBooleanProperty(value);
    }
    get active() {
        return this._active;
    }
    set after(value) {
        this._after = value;
    }
    get after() {
        return this._after;
    }
    set before(value) {
        this._before = value;
    }
    get before() {
        return this._before;
    }
    onMouseenter() {
        if (this.disabled) {
            return;
        }
        this.setActive(true);
        this.activeIcon.emit(this);
    }
    setActive(isActive, iconClass) {
        this.active = isActive;
        if (iconClass) {
            this.setDynamicIcon(iconClass);
        }
        else {
            this.resetIcon();
        }
        this._cdRef.markForCheck();
    }
    setDynamicIcon(iconClass) {
        if (!this._originalIconClass) {
            this._originalIconClass = this.icon;
        }
        this.icon = iconClass.replace('far', '');
    }
    resetIcon() {
        this.icon = this._originalIconClass || this.icon;
    }
}
MdbRatingIconComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbRatingIconComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MdbRatingIconComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbRatingIconComponent, selector: "mdb-rating-icon", inputs: { icon: "icon", color: "color", active: "active", after: "after", before: "before" }, outputs: { activeIcon: "activeIcon" }, ngImport: i0, template: "<span>\n  <span class=\"text-body\">{{ before }}</span>\n  <i\n    [ngClass]=\"active ? 'fas ' + icon + ' active' : 'far ' + icon\"\n    [ngStyle]=\"{ color: color }\"\n    (mouseenter)=\"onMouseenter()\"\n  ></i>\n  <span class=\"text-body\">{{ after }}</span>\n</span>\n", directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbRatingIconComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-rating-icon', changeDetection: ChangeDetectionStrategy.OnPush, template: "<span>\n  <span class=\"text-body\">{{ before }}</span>\n  <i\n    [ngClass]=\"active ? 'fas ' + icon + ' active' : 'far ' + icon\"\n    [ngStyle]=\"{ color: color }\"\n    (mouseenter)=\"onMouseenter()\"\n  ></i>\n  <span class=\"text-body\">{{ after }}</span>\n</span>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { icon: [{
                type: Input
            }], color: [{
                type: Input
            }], active: [{
                type: Input
            }], after: [{
                type: Input
            }], before: [{
                type: Input
            }], activeIcon: [{
                type: Output
            }] } });

class MdbRatingComponent {
    constructor() {
        this.readonly = false;
        // eslint-disable-next-line @angular-eslint/no-output-on-prefix
        this.onSelect = new EventEmitter();
        // eslint-disable-next-line @angular-eslint/no-output-on-prefix
        this.onHover = new EventEmitter();
        this._value = 0;
        this._destroy$ = new Subject();
    }
    set value(value) {
        this._value = value;
    }
    get value() {
        return this._value;
    }
    ngAfterViewInit() {
        if (this.readonly) {
            this.icons.forEach((icon) => {
                icon.disabled = true;
            });
            return;
        }
        this.icons.changes
            .pipe(startWith(this.icons), switchMap((icons) => {
            return merge(...icons.map((icon) => icon.activeIcon));
        }), takeUntil(this._destroy$))
            .subscribe((icon) => {
            const index = this.icons.toArray().findIndex((el) => {
                return el === icon;
            });
            this._iconIndex = index;
            this._icon = icon.icon;
            this.setActive(index + 1, this._icon);
            this.onHover.emit(this._iconIndex + 1);
        });
    }
    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.unsubscribe();
    }
    setActive(iconIndex, iconClass) {
        this.icons.forEach((icon, index) => {
            if (index >= iconIndex) {
                icon.setActive(false);
            }
            else {
                icon.setActive(true, iconClass);
            }
        });
    }
    onClick() {
        if (this.readonly) {
            return;
        }
        this.value = this._iconIndex + 1;
        this._selectedIcon = this._icon;
        this.onSelect.emit(this.value);
    }
    onMouseleave() {
        if (this.readonly) {
            return;
        }
        if (this.value) {
            this.setActive(this.value, this._selectedIcon);
        }
        else {
            this.setActive(-1);
        }
    }
}
MdbRatingComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbRatingComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MdbRatingComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbRatingComponent, selector: "mdb-rating", inputs: { readonly: "readonly", value: "value" }, outputs: { onSelect: "onSelect", onHover: "onHover" }, queries: [{ propertyName: "icons", predicate: MdbRatingIconComponent }], ngImport: i0, template: "<div class=\"rating\" (click)=\"onClick()\" (mouseleave)=\"onMouseleave()\">\n  <ng-content></ng-content>\n</div>\n" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbRatingComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-rating', template: "<div class=\"rating\" (click)=\"onClick()\" (mouseleave)=\"onMouseleave()\">\n  <ng-content></ng-content>\n</div>\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { icons: [{
                type: ContentChildren,
                args: [MdbRatingIconComponent]
            }], readonly: [{
                type: Input
            }], value: [{
                type: Input
            }], onSelect: [{
                type: Output
            }], onHover: [{
                type: Output
            }] } });

class MdbRatingModule {
}
MdbRatingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbRatingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbRatingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbRatingModule, declarations: [MdbRatingComponent, MdbRatingIconComponent], imports: [CommonModule], exports: [MdbRatingComponent, MdbRatingIconComponent] });
MdbRatingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbRatingModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbRatingModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [MdbRatingComponent, MdbRatingIconComponent],
                    imports: [CommonModule],
                    exports: [MdbRatingComponent, MdbRatingIconComponent],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MdbRatingComponent, MdbRatingIconComponent, MdbRatingModule };
//# sourceMappingURL=mdb-angular-ui-kit-rating.mjs.map
