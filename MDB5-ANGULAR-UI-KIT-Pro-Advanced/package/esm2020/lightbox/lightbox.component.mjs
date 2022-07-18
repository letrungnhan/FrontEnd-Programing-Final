import { Component, ContentChildren, ChangeDetectionStrategy, ViewEncapsulation, Input, Output, EventEmitter, } from '@angular/core';
import { MdbLightboxItemDirective } from './lightbox-item.directive';
import { OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MdbLightboxModalComponent } from './lightbox-modal.component';
import { merge, Subject } from 'rxjs';
import { filter, startWith, switchMap, takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
export class MdbLightboxComponent {
    constructor(_overlay, _vcr) {
        this._overlay = _overlay;
        this._vcr = _vcr;
        this.zoomLevel = 1;
        this.fontAwesome = 'free';
        this.lightboxOpen = new EventEmitter();
        this.lightboxOpened = new EventEmitter();
        this.lightboxSlide = new EventEmitter();
        this.lightboxSlided = new EventEmitter();
        this.lightboxZoomIn = new EventEmitter();
        this.lightboxZoomedIn = new EventEmitter();
        this.lightboxZoomOut = new EventEmitter();
        this.lightboxZoomedOut = new EventEmitter();
        this.lightboxClose = new EventEmitter();
        this.lightboxClosed = new EventEmitter();
        this._destroy$ = new Subject();
    }
    ngAfterContentInit() {
        this.lightboxItems.changes
            .pipe(startWith(this.lightboxItems), switchMap((items) => {
            return merge(...items.map((item) => item.click$));
        }), takeUntil(this._destroy$))
            .subscribe((clickedItem) => {
            this.open(clickedItem);
        });
    }
    _patchInputValues(lightboxItem) {
        this._contentRef.instance.lightboxItems = this.lightboxItems;
        this._contentRef.instance.activeLightboxItem = lightboxItem;
        this._contentRef.instance.zoomLevel = this.zoomLevel;
    }
    open(lightboxItem) {
        let overlayRef = this._overlayRef;
        if (!overlayRef) {
            this.lightboxOpen.emit();
            this._portal = new ComponentPortal(MdbLightboxModalComponent, this._vcr);
            overlayRef = this._overlay.create(this._getOverlayConfig());
            this._overlayRef = overlayRef;
        }
        if (overlayRef && this._overlayRef && !overlayRef.hasAttached()) {
            this._contentRef = this._overlayRef.attach(this._portal);
            this._patchInputValues(lightboxItem);
            this._listenToOutsideClick();
            this.lightboxOpened.emit();
        }
    }
    close() {
        if (this._overlayRef && this._overlayRef.backdropElement) {
            this.lightboxClose.emit();
            const cssTransitionDuration = parseFloat(getComputedStyle(this._overlayRef.backdropElement).transitionDuration) * 1000;
            setTimeout(() => {
                this._destroyOverlay();
                this.lightboxClosed.emit();
            }, cssTransitionDuration);
        }
    }
    slide(direction) {
        this._contentRef.instance.slide(direction);
    }
    zoomIn() {
        this._contentRef.instance.zoomIn();
    }
    zoomOut() {
        this._contentRef.instance.zoomOut();
    }
    toggleFullscreen() {
        this._contentRef.instance.toggleFullscreen();
    }
    reset() {
        this._contentRef.instance.reset();
    }
    _getOverlayConfig() {
        const positionStrategy = this._overlay
            .position()
            .global()
            .centerHorizontally()
            .centerVertically();
        const overlayConfig = new OverlayConfig({
            hasBackdrop: true,
            scrollStrategy: this._overlay.scrollStrategies.noop(),
            positionStrategy,
            backdropClass: 'lightbox-gallery',
        });
        return overlayConfig;
    }
    _destroyOverlay() {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
        }
    }
    _listenToOutsideClick() {
        if (this._overlayRef) {
            merge(this._overlayRef.backdropClick(), this._overlayRef.detachments(), this._overlayRef.keydownEvents().pipe(filter((event) => {
                return event.key === 'escape';
            }))).subscribe((event) => {
                if (event) {
                    event.preventDefault();
                }
                this.close();
            });
        }
    }
    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
        this._destroyOverlay();
    }
}
MdbLightboxComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbLightboxComponent, deps: [{ token: i1.Overlay }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component });
MdbLightboxComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbLightboxComponent, selector: "mdb-lightbox", inputs: { zoomLevel: "zoomLevel", fontAwesome: "fontAwesome" }, outputs: { lightboxOpen: "lightboxOpen", lightboxOpened: "lightboxOpened", lightboxSlide: "lightboxSlide", lightboxSlided: "lightboxSlided", lightboxZoomIn: "lightboxZoomIn", lightboxZoomedIn: "lightboxZoomedIn", lightboxZoomOut: "lightboxZoomOut", lightboxZoomedOut: "lightboxZoomedOut", lightboxClose: "lightboxClose", lightboxClosed: "lightboxClosed" }, queries: [{ propertyName: "lightboxItems", predicate: MdbLightboxItemDirective, descendants: true }], ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbLightboxComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mdb-lightbox',
                    template: '<ng-content></ng-content>',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i0.ViewContainerRef }]; }, propDecorators: { zoomLevel: [{
                type: Input
            }], fontAwesome: [{
                type: Input
            }], lightboxOpen: [{
                type: Output
            }], lightboxOpened: [{
                type: Output
            }], lightboxSlide: [{
                type: Output
            }], lightboxSlided: [{
                type: Output
            }], lightboxZoomIn: [{
                type: Output
            }], lightboxZoomedIn: [{
                type: Output
            }], lightboxZoomOut: [{
                type: Output
            }], lightboxZoomedOut: [{
                type: Output
            }], lightboxClose: [{
                type: Output
            }], lightboxClosed: [{
                type: Output
            }], lightboxItems: [{
                type: ContentChildren,
                args: [MdbLightboxItemDirective, { descendants: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlnaHRib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L2xpZ2h0Ym94L2xpZ2h0Ym94LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULGVBQWUsRUFHZix1QkFBdUIsRUFHdkIsaUJBQWlCLEVBQ2pCLEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxHQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JFLE9BQU8sRUFBdUIsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDMUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBUXpFLE1BQU0sT0FBTyxvQkFBb0I7SUF3Qi9CLFlBQW9CLFFBQWlCLEVBQVUsSUFBc0I7UUFBakQsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUFVLFNBQUksR0FBSixJQUFJLENBQWtCO1FBdkI1RCxjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsZ0JBQVcsR0FBRyxNQUFNLENBQUM7UUFFcEIsaUJBQVksR0FBdUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN0RCxtQkFBYyxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3hELGtCQUFhLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdkQsbUJBQWMsR0FBdUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN4RCxtQkFBYyxH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QkFBdkIsTUFBTTtnQkFDRyxjQUFjO3NCQUF2QixNQUFNO2dCQUNHLGdCQUFnQjtzQkFBekIsTUFBTTtnQkFDRyxlQUFlO3NCQUF4QixNQUFNO2dCQUNHLGlCQUFpQjtzQkFBMUIsTUFBTTtnQkFDRyxhQUFhO3NCQUF0QixNQUFNO2dCQUNHLGNBQWM7c0JBQXZCLE1BQU07Z0JBR1AsYUFBYTtzQkFEWixlQUFlO3VCQUFDLHdCQUF3QixFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBRdWVyeUxpc3QsXG4gIENvbXBvbmVudFJlZixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIE9uRGVzdHJveSxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZGJMaWdodGJveEl0ZW1EaXJlY3RpdmUgfSBmcm9tICcuL2xpZ2h0Ym94LWl0ZW0uZGlyZWN0aXZlJztcbmltcG9ydCB7IE92ZXJsYXlSZWYsIE92ZXJsYXksIE92ZXJsYXlDb25maWcgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21wb25lbnRQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IE1kYkxpZ2h0Ym94TW9kYWxDb21wb25lbnQgfSBmcm9tICcuL2xpZ2h0Ym94LW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBtZXJnZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBzdGFydFdpdGgsIHN3aXRjaE1hcCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZGItbGlnaHRib3gnLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTWRiTGlnaHRib3hDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSB6b29tTGV2ZWwgPSAxO1xuICBASW5wdXQoKSBmb250QXdlc29tZSA9ICdmcmVlJztcblxuICBAT3V0cHV0KCkgbGlnaHRib3hPcGVuOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBsaWdodGJveE9wZW5lZDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgbGlnaHRib3hTbGlkZTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgbGlnaHRib3hTbGlkZWQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGxpZ2h0Ym94Wm9vbUluOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBsaWdodGJveFpvb21lZEluOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBsaWdodGJveFpvb21PdXQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGxpZ2h0Ym94Wm9vbWVkT3V0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBsaWdodGJveENsb3NlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBsaWdodGJveENsb3NlZDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oTWRiTGlnaHRib3hJdGVtRGlyZWN0aXZlLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pXG4gIGxpZ2h0Ym94SXRlbXM6IFF1ZXJ5TGlzdDxNZGJMaWdodGJveEl0ZW1EaXJlY3RpdmU+O1xuXG4gIHByaXZhdGUgX2Rlc3Ryb3kkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3QoKTtcblxuICBwcml2YXRlIF9jb250ZW50UmVmOiBDb21wb25lbnRSZWY8TWRiTGlnaHRib3hNb2RhbENvbXBvbmVudD47XG4gIHByaXZhdGUgX292ZXJsYXlSZWY6IE92ZXJsYXlSZWYgfCBudWxsO1xuICBwcml2YXRlIF9wb3J0YWw6IENvbXBvbmVudFBvcnRhbDxNZGJMaWdodGJveE1vZGFsQ29tcG9uZW50PjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9vdmVybGF5OiBPdmVybGF5LCBwcml2YXRlIF92Y3I6IFZpZXdDb250YWluZXJSZWYpIHt9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIHRoaXMubGlnaHRib3hJdGVtcy5jaGFuZ2VzXG4gICAgICAucGlwZShcbiAgICAgICAgc3RhcnRXaXRoKHRoaXMubGlnaHRib3hJdGVtcyksXG4gICAgICAgIHN3aXRjaE1hcCgoaXRlbXM6IFF1ZXJ5TGlzdDxNZGJMaWdodGJveEl0ZW1EaXJlY3RpdmU+KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIG1lcmdlKC4uLml0ZW1zLm1hcCgoaXRlbTogTWRiTGlnaHRib3hJdGVtRGlyZWN0aXZlKSA9PiBpdGVtLmNsaWNrJCkpO1xuICAgICAgICB9KSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kkKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoY2xpY2tlZEl0ZW06IE1kYkxpZ2h0Ym94SXRlbURpcmVjdGl2ZSkgPT4ge1xuICAgICAgICB0aGlzLm9wZW4oY2xpY2tlZEl0ZW0pO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9wYXRjaElucHV0VmFsdWVzKGxpZ2h0Ym94SXRlbTogTWRiTGlnaHRib3hJdGVtRGlyZWN0aXZlKSB7XG4gICAgdGhpcy5fY29udGVudFJlZi5pbnN0YW5jZS5saWdodGJveEl0ZW1zID0gdGhpcy5saWdodGJveEl0ZW1zO1xuICAgIHRoaXMuX2NvbnRlbnRSZWYuaW5zdGFuY2UuYWN0aXZlTGlnaHRib3hJdGVtID0gbGlnaHRib3hJdGVtO1xuICAgIHRoaXMuX2NvbnRlbnRSZWYuaW5zdGFuY2Uuem9vbUxldmVsID0gdGhpcy56b29tTGV2ZWw7XG4gIH1cblxuICBvcGVuKGxpZ2h0Ym94SXRlbTogTWRiTGlnaHRib3hJdGVtRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgbGV0IG92ZXJsYXlSZWYgPSB0aGlzLl9vdmVybGF5UmVmO1xuICAgIGlmICghb3ZlcmxheVJlZikge1xuICAgICAgdGhpcy5saWdodGJveE9wZW4uZW1pdCgpO1xuXG4gICAgICB0aGlzLl9wb3J0YWwgPSBuZXcgQ29tcG9uZW50UG9ydGFsKE1kYkxpZ2h0Ym94TW9kYWxDb21wb25lbnQsIHRoaXMuX3Zjcik7XG4gICAgICBvdmVybGF5UmVmID0gdGhpcy5fb3ZlcmxheS5jcmVhdGUodGhpcy5fZ2V0T3ZlcmxheUNvbmZpZygpKTtcblxuICAgICAgdGhpcy5fb3ZlcmxheVJlZiA9IG92ZXJsYXlSZWY7XG4gICAgfVxuXG4gICAgaWYgKG92ZXJsYXlSZWYgJiYgdGhpcy5fb3ZlcmxheVJlZiAmJiAhb3ZlcmxheVJlZi5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICB0aGlzLl9jb250ZW50UmVmID0gdGhpcy5fb3ZlcmxheVJlZi5hdHRhY2godGhpcy5fcG9ydGFsKTtcbiAgICAgIHRoaXMuX3BhdGNoSW5wdXRWYWx1ZXMobGlnaHRib3hJdGVtKTtcbiAgICAgIHRoaXMuX2xpc3RlblRvT3V0c2lkZUNsaWNrKCk7XG5cbiAgICAgIHRoaXMubGlnaHRib3hPcGVuZWQuZW1pdCgpO1xuICAgIH1cbiAgfVxuXG4gIGNsb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9vdmVybGF5UmVmICYmIHRoaXMuX292ZXJsYXlSZWYuYmFja2Ryb3BFbGVtZW50KSB7XG4gICAgICB0aGlzLmxpZ2h0Ym94Q2xvc2UuZW1pdCgpO1xuXG4gICAgICBjb25zdCBjc3NUcmFuc2l0aW9uRHVyYXRpb24gPVxuICAgICAgICBwYXJzZUZsb2F0KGdldENvbXB1dGVkU3R5bGUodGhpcy5fb3ZlcmxheVJlZi5iYWNrZHJvcEVsZW1lbnQpLnRyYW5zaXRpb25EdXJhdGlvbikgKiAxMDAwO1xuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5fZGVzdHJveU92ZXJsYXkoKTtcbiAgICAgICAgdGhpcy5saWdodGJveENsb3NlZC5lbWl0KCk7XG4gICAgICB9LCBjc3NUcmFuc2l0aW9uRHVyYXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIHNsaWRlKGRpcmVjdGlvbjogJ3JpZ2h0JyB8ICdsZWZ0JyB8ICdmaXJzdCcgfCAnbGFzdCcpOiB2b2lkIHtcbiAgICB0aGlzLl9jb250ZW50UmVmLmluc3RhbmNlLnNsaWRlKGRpcmVjdGlvbik7XG4gIH1cblxuICB6b29tSW4oKTogdm9pZCB7XG4gICAgdGhpcy5fY29udGVudFJlZi5pbnN0YW5jZS56b29tSW4oKTtcbiAgfVxuXG4gIHpvb21PdXQoKTogdm9pZCB7XG4gICAgdGhpcy5fY29udGVudFJlZi5pbnN0YW5jZS56b29tT3V0KCk7XG4gIH1cblxuICB0b2dnbGVGdWxsc2NyZWVuKCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbnRlbnRSZWYuaW5zdGFuY2UudG9nZ2xlRnVsbHNjcmVlbigpO1xuICB9XG5cbiAgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5fY29udGVudFJlZi5pbnN0YW5jZS5yZXNldCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0T3ZlcmxheUNvbmZpZygpOiBPdmVybGF5Q29uZmlnIHtcbiAgICBjb25zdCBwb3NpdGlvblN0cmF0ZWd5ID0gdGhpcy5fb3ZlcmxheVxuICAgICAgLnBvc2l0aW9uKClcbiAgICAgIC5nbG9iYWwoKVxuICAgICAgLmNlbnRlckhvcml6b250YWxseSgpXG4gICAgICAuY2VudGVyVmVydGljYWxseSgpO1xuICAgIGNvbnN0IG92ZXJsYXlDb25maWcgPSBuZXcgT3ZlcmxheUNvbmZpZyh7XG4gICAgICBoYXNCYWNrZHJvcDogdHJ1ZSxcbiAgICAgIHNjcm9sbFN0cmF0ZWd5OiB0aGlzLl9vdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMubm9vcCgpLFxuICAgICAgcG9zaXRpb25TdHJhdGVneSxcbiAgICAgIGJhY2tkcm9wQ2xhc3M6ICdsaWdodGJveC1nYWxsZXJ5JyxcbiAgICB9KTtcbiAgICByZXR1cm4gb3ZlcmxheUNvbmZpZztcbiAgfVxuXG4gIHByaXZhdGUgX2Rlc3Ryb3lPdmVybGF5KCkge1xuICAgIGlmICh0aGlzLl9vdmVybGF5UmVmKSB7XG4gICAgICB0aGlzLl9vdmVybGF5UmVmLmRpc3Bvc2UoKTtcbiAgICAgIHRoaXMuX292ZXJsYXlSZWYgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2xpc3RlblRvT3V0c2lkZUNsaWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9vdmVybGF5UmVmKSB7XG4gICAgICBtZXJnZShcbiAgICAgICAgdGhpcy5fb3ZlcmxheVJlZi5iYWNrZHJvcENsaWNrKCksXG4gICAgICAgIHRoaXMuX292ZXJsYXlSZWYuZGV0YWNobWVudHMoKSxcbiAgICAgICAgdGhpcy5fb3ZlcmxheVJlZi5rZXlkb3duRXZlbnRzKCkucGlwZShcbiAgICAgICAgICBmaWx0ZXIoKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZXZlbnQua2V5ID09PSAnZXNjYXBlJztcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICApLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5fZGVzdHJveSQuY29tcGxldGUoKTtcbiAgICB0aGlzLl9kZXN0cm95T3ZlcmxheSgpO1xuICB9XG59XG4iXX0=