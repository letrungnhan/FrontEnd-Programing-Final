import { Component, ContentChildren, EventEmitter, Input, Output, } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';
import { MdbRatingIconComponent } from './rating-icon.component';
import * as i0 from "@angular/core";
export class MdbRatingComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0aW5nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9yYXRpbmcvcmF0aW5nLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9yYXRpbmcvcmF0aW5nLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCxTQUFTLEVBQ1QsZUFBZSxFQUNmLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxHQUdQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBTyxNQUFNLGdCQUFnQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDOztBQUtqRSxNQUFNLE9BQU8sa0JBQWtCO0lBd0I3QjtRQXJCUyxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBUzFCLCtEQUErRDtRQUNyRCxhQUFRLEdBQXlCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUQsK0RBQStEO1FBQ3JELFlBQU8sR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVyRCxXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBS1YsY0FBUyxHQUFrQixJQUFJLE9BQU8sRUFBUSxDQUFDO0lBRXpDLENBQUM7SUFwQmhCLElBQ0ksS0FBSyxDQUFDLEtBQUs7UUFDYixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBQ0QsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFnQkQsZUFBZTtRQUNiLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLE9B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S0FBSztnQkFTSSxRQUFRO3NCQUFqQixNQUFNO2dCQUVHLE9BQU87c0JBQWhCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIE9uRGVzdHJveSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBtZXJnZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3RhcnRXaXRoLCBzd2l0Y2hNYXAsIHRha2VVbnRpbCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTWRiUmF0aW5nSWNvbkNvbXBvbmVudCB9IGZyb20gJy4vcmF0aW5nLWljb24uY29tcG9uZW50JztcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21kYi1yYXRpbmcnLFxuICB0ZW1wbGF0ZVVybDogJ3JhdGluZy5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIE1kYlJhdGluZ0NvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBDb250ZW50Q2hpbGRyZW4oTWRiUmF0aW5nSWNvbkNvbXBvbmVudCkgaWNvbnM6IFF1ZXJ5TGlzdDxNZGJSYXRpbmdJY29uQ29tcG9uZW50PjtcblxuICBASW5wdXQoKSByZWFkb25seSA9IGZhbHNlO1xuICBASW5wdXQoKVxuICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICB9XG4gIGdldCB2YWx1ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8tb3V0cHV0LW9uLXByZWZpeFxuICBAT3V0cHV0KCkgb25TZWxlY3Q6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLW91dHB1dC1vbi1wcmVmaXhcbiAgQE91dHB1dCgpIG9uSG92ZXI6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgX3ZhbHVlID0gMDtcbiAgcHJpdmF0ZSBfaWNvbkluZGV4OiBudW1iZXI7XG4gIHByaXZhdGUgX2ljb246IHN0cmluZztcbiAgcHJpdmF0ZSBfc2VsZWN0ZWRJY29uOiBzdHJpbmc7XG5cbiAgcmVhZG9ubHkgX2Rlc3Ryb3kkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJlYWRvbmx5KSB7XG4gICAgICB0aGlzLmljb25zLmZvckVhY2goKGljb24pID0+IHtcbiAgICAgICAgaWNvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmljb25zLmNoYW5nZXNcbiAgICAgIC5waXBlKFxuICAgICAgICBzdGFydFdpdGgodGhpcy5pY29ucyksXG4gICAgICAgIHN3aXRjaE1hcCgoaWNvbnM6IFF1ZXJ5TGlzdDxNZGJSYXRpbmdJY29uQ29tcG9uZW50PikgPT4ge1xuICAgICAgICAgIHJldHVybiBtZXJnZSguLi5pY29ucy5tYXAoKGljb246IE1kYlJhdGluZ0ljb25Db21wb25lbnQpID0+IGljb24uYWN0aXZlSWNvbikpO1xuICAgICAgICB9KSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kkKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoaWNvbjogTWRiUmF0aW5nSWNvbkNvbXBvbmVudCkgPT4ge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuaWNvbnMudG9BcnJheSgpLmZpbmRJbmRleCgoZWwpID0+IHtcbiAgICAgICAgICByZXR1cm4gZWwgPT09IGljb247XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX2ljb25JbmRleCA9IGluZGV4O1xuICAgICAgICB0aGlzLl9pY29uID0gaWNvbi5pY29uO1xuICAgICAgICB0aGlzLnNldEFjdGl2ZShpbmRleCArIDEsIHRoaXMuX2ljb24pO1xuICAgICAgICB0aGlzLm9uSG92ZXIuZW1pdCh0aGlzLl9pY29uSW5kZXggKyAxKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuX2Rlc3Ryb3kkLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBzZXRBY3RpdmUoaWNvbkluZGV4OiBudW1iZXIsIGljb25DbGFzcz86IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuaWNvbnMuZm9yRWFjaCgoaWNvbiwgaW5kZXgpID0+IHtcbiAgICAgIGlmIChpbmRleCA+PSBpY29uSW5kZXgpIHtcbiAgICAgICAgaWNvbi5zZXRBY3RpdmUoZmFsc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWNvbi5zZXRBY3RpdmUodHJ1ZSwgaWNvbkNsYXNzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG9uQ2xpY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucmVhZG9ubHkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnZhbHVlID0gdGhpcy5faWNvbkluZGV4ICsgMTtcbiAgICB0aGlzLl9zZWxlY3RlZEljb24gPSB0aGlzLl9pY29uO1xuICAgIHRoaXMub25TZWxlY3QuZW1pdCh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIG9uTW91c2VsZWF2ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yZWFkb25seSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgICB0aGlzLnNldEFjdGl2ZSh0aGlzLnZhbHVlLCB0aGlzLl9zZWxlY3RlZEljb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldEFjdGl2ZSgtMSk7XG4gICAgfVxuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwicmF0aW5nXCIgKGNsaWNrKT1cIm9uQ2xpY2soKVwiIChtb3VzZWxlYXZlKT1cIm9uTW91c2VsZWF2ZSgpXCI+XG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjwvZGl2PlxuIl19