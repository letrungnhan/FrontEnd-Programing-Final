import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i1 from '@angular/cdk/overlay';
import { OverlayConfig, OverlayModule } from '@angular/cdk/overlay';
import { TemplatePortal, PortalModule } from '@angular/cdk/portal';
import * as i0 from '@angular/core';
import { Component, ViewChild, Input, NgModule } from '@angular/core';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';

class MdbLoadingComponent {
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

class MdbLoadingModule {
}
MdbLoadingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbLoadingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbLoadingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbLoadingModule, declarations: [MdbLoadingComponent], imports: [CommonModule, OverlayModule, PortalModule], exports: [MdbLoadingComponent] });
MdbLoadingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbLoadingModule, imports: [[CommonModule, OverlayModule, PortalModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbLoadingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, OverlayModule, PortalModule],
                    declarations: [MdbLoadingComponent],
                    exports: [MdbLoadingComponent],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MdbLoadingComponent, MdbLoadingModule };
//# sourceMappingURL=mdb-angular-ui-kit-loading.mjs.map
