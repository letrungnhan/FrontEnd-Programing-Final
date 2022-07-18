import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Component, Input, ViewChild, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
import * as i2 from "@angular/common";
export class MdbLoadingComponent {
    constructor(_renderer, _overlay, _vcr) {
        this._renderer = _renderer;
        this._overlay = _overlay;
        this._vcr = _vcr;
        this._show = false;
        this._backdrop = true;
        this._fullscreen = false;
    }
    get show() {
        return this._show;
    }
    set show(value) {
        this._show = coerceBooleanProperty(value);
    }
    get backdrop() {
        return this._backdrop;
    }
    set backdrop(value) {
        this._backdrop = coerceBooleanProperty(value);
    }
    get fullscreen() {
        return this._fullscreen;
    }
    set fullscreen(value) {
        this._fullscreen = coerceBooleanProperty(value);
    }
    ngOnInit() {
        if (this.container && !this.fullscreen) {
            this._renderer.addClass(this.container, 'position-relative');
        }
    }
    ngAfterViewInit() {
        if (this.show && this.fullscreen) {
            this.showFullscreen();
        }
    }
    ngOnChanges(changes) {
        if (changes.show &&
            changes.show.currentValue &&
            !changes.show.isFirstChange() &&
            this.fullscreen) {
            this.showFullscreen();
        }
        else if (changes.show &&
            !changes.show.currentValue &&
            !changes.show.isFirstChange() &&
            this.fullscreen) {
            this.hideFullscreen();
        }
    }
    showFullscreen() {
        this._overlayRef = this._createOverlay();
        const templatePortal = new TemplatePortal(this.template, this._vcr);
        this._overlayRef.attach(templatePortal);
    }
    hideFullscreen() {
        this._overlayRef.detach();
    }
    _createOverlay() {
        const config = this._getOverlayConfig();
        return this._overlay.create(config);
    }
    _getOverlayConfig() {
        const config = new OverlayConfig({
            positionStrategy: this._overlay.position().global(),
            scrollStrategy: this._overlay.scrollStrategies.noop(),
            hasBackdrop: this.backdrop,
            backdropClass: this._getBackdropClass(),
        });
        return config;
    }
    _getBackdropClass() {
        const classes = [];
        if (this.backdropClass) {
            this.backdropClass.split(' ').forEach((backdropClass) => {
                classes.push(backdropClass);
            });
        }
        return ['loading-backdrop-fullscreen', ...classes];
    }
    ngOnDestroy() {
        if (this._overlayRef) {
            this._overlayRef.detach();
            this._overlayRef.dispose();
        }
    }
}
MdbLoadingComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbLoadingComponent, deps: [{ token: i0.Renderer2 }, { token: i1.Overlay }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component });
MdbLoadingComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbLoadingComponent, selector: "mdb-loading", inputs: { show: "show", backdrop: "backdrop", backdropClass: "backdropClass", container: "container", fullscreen: "fullscreen" }, viewQueries: [{ propertyName: "template", first: true, predicate: ["template"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<ng-template #template><ng-content></ng-content></ng-template>\n\n<ng-container *ngIf=\"!fullscreen && show\" [ngTemplateOutlet]=\"template\"></ng-container>\n<div *ngIf=\"!fullscreen && show && backdrop\" class=\"loading-backdrop {{ backdropClass }}\"></div>\n", directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbLoadingComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-loading', template: "<ng-template #template><ng-content></ng-content></ng-template>\n\n<ng-container *ngIf=\"!fullscreen && show\" [ngTemplateOutlet]=\"template\"></ng-container>\n<div *ngIf=\"!fullscreen && show && backdrop\" class=\"loading-backdrop {{ backdropClass }}\"></div>\n" }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i1.Overlay }, { type: i0.ViewContainerRef }]; }, propDecorators: { template: [{
                type: ViewChild,
                args: ['template']
            }], show: [{
                type: Input
            }], backdrop: [{
                type: Input
            }], backdropClass: [{
                type: Input
            }], container: [{
                type: Input
            }], fullscreen: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvbG9hZGluZy9sb2FkaW5nLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9sb2FkaW5nL2xvYWRpbmcuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFnQixxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVFLE9BQU8sRUFBVyxhQUFhLEVBQWMsTUFBTSxzQkFBc0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDckQsT0FBTyxFQUVMLFNBQVMsRUFDVCxLQUFLLEVBT0wsU0FBUyxHQUVWLE1BQU0sZUFBZSxDQUFDOzs7O0FBTXZCLE1BQU0sT0FBTyxtQkFBbUI7SUFtQzlCLFlBQ1UsU0FBb0IsRUFDcEIsUUFBaUIsRUFDakIsSUFBc0I7UUFGdEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLFNBQUksR0FBSixJQUFJLENBQWtCO1FBNUJ4QixVQUFLLEdBQUcsS0FBSyxDQUFDO1FBU2QsY0FBUyxHQUFHLElBQUksQ0FBQztRQVlqQixnQkFBVyxHQUFHLEtBQUssQ0FBQztJQVF6QixDQUFDO0lBcENKLElBQ0ksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBQ0QsSUFBSSxJQUFJLENBQUMsS0FBYztRQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFHRCxJQUNJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUNELElBQUksUUFBUSxDQUFDLEtBQWM7UUFDekIs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QUMsV0FBVyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUM1QjtJQUNILENBQUM7O2dIQWpIVSxtQkFBbUI7b0dBQW5CLG1CQUFtQixnVENyQmhDLHVRQUlBOzJGRGlCYSxtQkFBbUI7a0JBSi9CLFNBQVM7K0JBQ0UsYUFBYTtxSkFJQSxRQUFRO3NCQUE5QixTQUFTO3VCQUFDLFVBQVU7Z0JBR2pCLElBQUk7c0JBRFAsS0FBSztnQkFVRixRQUFRO3NCQURYLEtBQUs7Z0JBU0csYUFBYTtzQkFBckIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUdGLFVBQVU7c0JBRGIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IE92ZXJsYXksIE92ZXJsYXlDb25maWcsIE92ZXJsYXlSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBUZW1wbGF0ZVBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLWxvYWRpbmcnLFxuICB0ZW1wbGF0ZVVybDogJy4vbG9hZGluZy5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIE1kYkxvYWRpbmdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZCgndGVtcGxhdGUnKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBASW5wdXQoKVxuICBnZXQgc2hvdygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2hvdztcbiAgfVxuICBzZXQgc2hvdyh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3Nob3cgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX3Nob3cgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBnZXQgYmFja2Ryb3AoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2JhY2tkcm9wO1xuICB9XG4gIHNldCBiYWNrZHJvcCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2JhY2tkcm9wID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9iYWNrZHJvcCA9IHRydWU7XG5cbiAgQElucHV0KCkgYmFja2Ryb3BDbGFzczogc3RyaW5nO1xuICBASW5wdXQoKSBjb250YWluZXI6IEhUTUxFbGVtZW50O1xuXG4gIEBJbnB1dCgpXG4gIGdldCBmdWxsc2NyZWVuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9mdWxsc2NyZWVuO1xuICB9XG4gIHNldCBmdWxsc2NyZWVuKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZnVsbHNjcmVlbiA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfZnVsbHNjcmVlbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX292ZXJsYXlSZWY6IE92ZXJsYXlSZWY7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIF9vdmVybGF5OiBPdmVybGF5LFxuICAgIHByaXZhdGUgX3ZjcjogVmlld0NvbnRhaW5lclJlZlxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY29udGFpbmVyICYmICF0aGlzLmZ1bGxzY3JlZW4pIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuY29udGFpbmVyLCAncG9zaXRpb24tcmVsYXRpdmUnKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc2hvdyAmJiB0aGlzLmZ1bGxzY3JlZW4pIHtcbiAgICAgIHRoaXMuc2hvd0Z1bGxzY3JlZW4oKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgY2hhbmdlcy5zaG93ICYmXG4gICAgICBjaGFuZ2VzLnNob3cuY3VycmVudFZhbHVlICYmXG4gICAgICAhY2hhbmdlcy5zaG93LmlzRmlyc3RDaGFuZ2UoKSAmJlxuICAgICAgdGhpcy5mdWxsc2NyZWVuXG4gICAgKSB7XG4gICAgICB0aGlzLnNob3dGdWxsc2NyZWVuKCk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIGNoYW5nZXMuc2hvdyAmJlxuICAgICAgIWNoYW5nZXMuc2hvdy5jdXJyZW50VmFsdWUgJiZcbiAgICAgICFjaGFuZ2VzLnNob3cuaXNGaXJzdENoYW5nZSgpICYmXG4gICAgICB0aGlzLmZ1bGxzY3JlZW5cbiAgICApIHtcbiAgICAgIHRoaXMuaGlkZUZ1bGxzY3JlZW4oKTtcbiAgICB9XG4gIH1cblxuICBzaG93RnVsbHNjcmVlbigpOiB2b2lkIHtcbiAgICB0aGlzLl9vdmVybGF5UmVmID0gdGhpcy5fY3JlYXRlT3ZlcmxheSgpO1xuICAgIGNvbnN0IHRlbXBsYXRlUG9ydGFsID0gbmV3IFRlbXBsYXRlUG9ydGFsKHRoaXMudGVtcGxhdGUsIHRoaXMuX3Zjcik7XG4gICAgdGhpcy5fb3ZlcmxheVJlZi5hdHRhY2godGVtcGxhdGVQb3J0YWwpO1xuICB9XG5cbiAgaGlkZUZ1bGxzY3JlZW4oKTogdm9pZCB7XG4gICAgdGhpcy5fb3ZlcmxheVJlZi5kZXRhY2goKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZU92ZXJsYXkoKTogT3ZlcmxheVJlZiB7XG4gICAgY29uc3QgY29uZmlnID0gdGhpcy5fZ2V0T3ZlcmxheUNvbmZpZygpO1xuICAgIHJldHVybiB0aGlzLl9vdmVybGF5LmNyZWF0ZShjb25maWcpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0T3ZlcmxheUNvbmZpZygpOiBPdmVybGF5Q29uZmlnIHtcbiAgICBjb25zdCBjb25maWcgPSBuZXcgT3ZlcmxheUNvbmZpZyh7XG4gICAgICBwb3NpdGlvblN0cmF0ZWd5OiB0aGlzLl9vdmVybGF5LnBvc2l0aW9uKCkuZ2xvYmFsKCksXG4gICAgICBzY3JvbGxTdHJhdGVneTogdGhpcy5fb3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLm5vb3AoKSxcbiAgICAgIGhhc0JhY2tkcm9wOiB0aGlzLmJhY2tkcm9wLFxuICAgICAgYmFja2Ryb3BDbGFzczogdGhpcy5fZ2V0QmFja2Ryb3BDbGFzcygpLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNvbmZpZztcbiAgfVxuXG4gIHByaXZhdGUgX2dldEJhY2tkcm9wQ2xhc3MoKTogc3RyaW5nW10ge1xuICAgIGNvbnN0IGNsYXNzZXMgPSBbXTtcblxuICAgIGlmICh0aGlzLmJhY2tkcm9wQ2xhc3MpIHtcbiAgICAgIHRoaXMuYmFja2Ryb3BDbGFzcy5zcGxpdCgnICcpLmZvckVhY2goKGJhY2tkcm9wQ2xhc3M6IHN0cmluZykgPT4ge1xuICAgICAgICBjbGFzc2VzLnB1c2goYmFja2Ryb3BDbGFzcyk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIFsnbG9hZGluZy1iYWNrZHJvcC1mdWxsc2NyZWVuJywgLi4uY2xhc3Nlc107XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fb3ZlcmxheVJlZikge1xuICAgICAgdGhpcy5fb3ZlcmxheVJlZi5kZXRhY2goKTtcbiAgICAgIHRoaXMuX292ZXJsYXlSZWYuZGlzcG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9iYWNrZHJvcDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZnVsbHNjcmVlbjogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc2hvdzogQm9vbGVhbklucHV0O1xufVxuIiwiPG5nLXRlbXBsYXRlICN0ZW1wbGF0ZT48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9uZy10ZW1wbGF0ZT5cblxuPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFmdWxsc2NyZWVuICYmIHNob3dcIiBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuPGRpdiAqbmdJZj1cIiFmdWxsc2NyZWVuICYmIHNob3cgJiYgYmFja2Ryb3BcIiBjbGFzcz1cImxvYWRpbmctYmFja2Ryb3Age3sgYmFja2Ryb3BDbGFzcyB9fVwiPjwvZGl2PlxuIl19