import { ChangeDetectionStrategy, Component, ContentChild, ElementRef, ViewChild, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class MdbSidenavLayoutComponent {
    constructor(_cdRef) {
        this._cdRef = _cdRef;
        this.showBackdrop = false;
        this.backdropStyle = {
            transition: '',
            position: '',
            width: '',
            height: '',
            opacity: 0,
        };
    }
    markForCheck() {
        this._cdRef.markForCheck();
    }
    ngAfterViewInit() {
        this.backdropStyle.transition = `opacity ${this._sidenav.sidenavTransitionDuration} ease-out`;
        this.backdropStyle.position = this._sidenav.position;
        this.backdropStyle.width = this._sidenav.position === 'fixed' ? '100vw' : '100%';
        this.backdropStyle.height = this._sidenav.position === 'fixed' ? '100vh' : '100%';
        this.backdropStyle.opacity = 1;
        // Backdrop
        if (this._sidenav.backdrop && !this._sidenav.hidden && this._sidenav.mode === 'over') {
            this.showBackdrop = true;
        }
    }
    onBackdropClick() {
        this.markForCheck();
        this._sidenav.triggetVisibilityEvents(false);
        this._sidenav.updateSidenav(false);
    }
    toggleBackdrop(show) {
        this.markForCheck();
        if (show && this._sidenav.mode === 'over') {
            this.showBackdrop = true;
            this.backdropStyle.opacity = 1;
        }
        else {
            this.backdropStyle.opacity = 0;
            setTimeout(() => {
                this.showBackdrop = false;
                this.markForCheck();
            }, this._sidenav.transitionDuration);
        }
    }
}
MdbSidenavLayoutComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbSidenavLayoutComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MdbSidenavLayoutComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbSidenavLayoutComponent, selector: "mdb-sidenav-layout", queries: [{ propertyName: "_sidenav", first: true, predicate: ["sidenav"], descendants: true }, { propertyName: "_sidenavContent", first: true, predicate: ["sidenavContent"], descendants: true, read: ElementRef }], viewQueries: [{ propertyName: "_backdropEl", first: true, predicate: ["backdrop"], descendants: true }], ngImport: i0, template: "<ng-content></ng-content>\n<div\n  #backdrop\n  class=\"sidenav-backdrop\"\n  ngClass=\"{{ _sidenav.backdropClass }}\"\n  (click)=\"onBackdropClick()\"\n  [ngStyle]=\"backdropStyle\"\n  *ngIf=\"showBackdrop && _sidenav.backdrop\"\n></div>\n", directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbSidenavLayoutComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-sidenav-layout', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>\n<div\n  #backdrop\n  class=\"sidenav-backdrop\"\n  ngClass=\"{{ _sidenav.backdropClass }}\"\n  (click)=\"onBackdropClick()\"\n  [ngStyle]=\"backdropStyle\"\n  *ngIf=\"showBackdrop && _sidenav.backdrop\"\n></div>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { _sidenav: [{
                type: ContentChild,
                args: ['sidenav']
            }], _sidenavContent: [{
                type: ContentChild,
                args: ['sidenavContent', { read: ElementRef }]
            }], _backdropEl: [{
                type: ViewChild,
                args: ['backdrop']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZW5hdi1sb3lhdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L3NpZGVuYXYvc2lkZW5hdi1sb3lhdXQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L3NpZGVuYXYvc2lkZW5hdi1sYXlhdXQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7OztBQU92QixNQUFNLE9BQU8seUJBQXlCO0lBY3BDLFlBQW9CLE1BQXlCO1FBQXpCLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBVHRDLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLGtCQUFhLEdBQUc7WUFDckIsVUFBVSxFQUFFLEVBQUU7WUFDZCxRQUFRLEVBQUUsRUFBRTtZQUNaLEtBQUssRUFBRSxFQUFFO1lBQ1QsTUFBTSxFQUFFLEVBQUU7WUFDVixPQUFPLEVBQUUsQ0FBQztTQUNYLENBQUM7SUFFOEMsQ0FBQztJQUVqRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxHQUFHLFdBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyx5QkFBeUIsV0FBVyxDQUFDO1FBQzlGLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBQ3JELElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDakYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUNsRixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFFL0IsV0FBVztRQUNYLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7WUFDcEYsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7U0FDMUI7SUFDSCxDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVwQixJQUFJLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxjQUFjLENBQUMsSUFBYTtRQUMxQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFcEIsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO1lBQ3pDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztTQUNoQzthQUFNO1lBQ0wsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1lBRS9CLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN0QixDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQ3RDO0lBQ0gsQ0FBQzs7c0hBdERVLHlCQUF5QjswR0FBekIseUJBQXlCLDBPQUVJLFVBQVUsc0lDakJwRCxrUEFTQTsyRkRNYSx5QkFBeUI7a0JBTHJDLFNBQVM7K0JBQ0Usb0JBQW9CLG1CQUViLHVCQUF1QixDQUFDLE1BQU07d0dBR3RCLFFBQVE7c0JBQWhDLFlBQVk7dUJBQUMsU0FBUztnQkFDK0IsZUFBZTtzQkFBcEUsWUFBWTt1QkFBQyxnQkFBZ0IsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7Z0JBQzdCLFdBQVc7c0JBQWpDLFNBQVM7dUJBQUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZGJTaWRlbmF2Q29tcG9uZW50IH0gZnJvbSAnLi9zaWRlbmF2LmNvbXBvbmVudCc7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZGItc2lkZW5hdi1sYXlvdXQnLFxuICB0ZW1wbGF0ZVVybDogJ3NpZGVuYXYtbGF5YXV0LmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1kYlNpZGVuYXZMYXlvdXRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgQENvbnRlbnRDaGlsZCgnc2lkZW5hdicpIF9zaWRlbmF2OiBNZGJTaWRlbmF2Q29tcG9uZW50O1xuICBAQ29udGVudENoaWxkKCdzaWRlbmF2Q29udGVudCcsIHsgcmVhZDogRWxlbWVudFJlZiB9KSBfc2lkZW5hdkNvbnRlbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuICBAVmlld0NoaWxkKCdiYWNrZHJvcCcpIF9iYWNrZHJvcEVsOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcblxuICBwdWJsaWMgc2hvd0JhY2tkcm9wID0gZmFsc2U7XG4gIHB1YmxpYyBiYWNrZHJvcFN0eWxlID0ge1xuICAgIHRyYW5zaXRpb246ICcnLFxuICAgIHBvc2l0aW9uOiAnJyxcbiAgICB3aWR0aDogJycsXG4gICAgaGVpZ2h0OiAnJyxcbiAgICBvcGFjaXR5OiAwLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBtYXJrRm9yQ2hlY2soKTogdm9pZCB7XG4gICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5iYWNrZHJvcFN0eWxlLnRyYW5zaXRpb24gPSBgb3BhY2l0eSAke3RoaXMuX3NpZGVuYXYuc2lkZW5hdlRyYW5zaXRpb25EdXJhdGlvbn0gZWFzZS1vdXRgO1xuICAgIHRoaXMuYmFja2Ryb3BTdHlsZS5wb3NpdGlvbiA9IHRoaXMuX3NpZGVuYXYucG9zaXRpb247XG4gICAgdGhpcy5iYWNrZHJvcFN0eWxlLndpZHRoID0gdGhpcy5fc2lkZW5hdi5wb3NpdGlvbiA9PT0gJ2ZpeGVkJyA/ICcxMDB2dycgOiAnMTAwJSc7XG4gICAgdGhpcy5iYWNrZHJvcFN0eWxlLmhlaWdodCA9IHRoaXMuX3NpZGVuYXYucG9zaXRpb24gPT09ICdmaXhlZCcgPyAnMTAwdmgnIDogJzEwMCUnO1xuICAgIHRoaXMuYmFja2Ryb3BTdHlsZS5vcGFjaXR5ID0gMTtcblxuICAgIC8vIEJhY2tkcm9wXG4gICAgaWYgKHRoaXMuX3NpZGVuYXYuYmFja2Ryb3AgJiYgIXRoaXMuX3NpZGVuYXYuaGlkZGVuICYmIHRoaXMuX3NpZGVuYXYubW9kZSA9PT0gJ292ZXInKSB7XG4gICAgICB0aGlzLnNob3dCYWNrZHJvcCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgb25CYWNrZHJvcENsaWNrKCk6IHZvaWQge1xuICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG5cbiAgICB0aGlzLl9zaWRlbmF2LnRyaWdnZXRWaXNpYmlsaXR5RXZlbnRzKGZhbHNlKTtcbiAgICB0aGlzLl9zaWRlbmF2LnVwZGF0ZVNpZGVuYXYoZmFsc2UpO1xuICB9XG5cbiAgdG9nZ2xlQmFja2Ryb3Aoc2hvdzogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG5cbiAgICBpZiAoc2hvdyAmJiB0aGlzLl9zaWRlbmF2Lm1vZGUgPT09ICdvdmVyJykge1xuICAgICAgdGhpcy5zaG93QmFja2Ryb3AgPSB0cnVlO1xuICAgICAgdGhpcy5iYWNrZHJvcFN0eWxlLm9wYWNpdHkgPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJhY2tkcm9wU3R5bGUub3BhY2l0eSA9IDA7XG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnNob3dCYWNrZHJvcCA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSwgdGhpcy5fc2lkZW5hdi50cmFuc2l0aW9uRHVyYXRpb24pO1xuICAgIH1cbiAgfVxufVxuIiwiPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPGRpdlxuICAjYmFja2Ryb3BcbiAgY2xhc3M9XCJzaWRlbmF2LWJhY2tkcm9wXCJcbiAgbmdDbGFzcz1cInt7IF9zaWRlbmF2LmJhY2tkcm9wQ2xhc3MgfX1cIlxuICAoY2xpY2spPVwib25CYWNrZHJvcENsaWNrKClcIlxuICBbbmdTdHlsZV09XCJiYWNrZHJvcFN0eWxlXCJcbiAgKm5nSWY9XCJzaG93QmFja2Ryb3AgJiYgX3NpZGVuYXYuYmFja2Ryb3BcIlxuPjwvZGl2PlxuIl19