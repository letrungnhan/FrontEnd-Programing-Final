import { OverlayConfig, } from '@angular/cdk/overlay';
import { Injectable, Injector, TemplateRef, } from '@angular/core';
import { MdbPopconfirmConfig } from './popconfirm.config';
import { MdbPopconfirmRef } from './popconfirm-ref';
import { MdbPopconfirmContainerComponent } from './popconfirm-container.component';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { merge } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
export class MdbPopconfirmService {
    constructor(_overlay, _injector, _cfr, _overlayPositionBuilder) {
        this._overlay = _overlay;
        this._injector = _injector;
        this._cfr = _cfr;
        this._overlayPositionBuilder = _overlayPositionBuilder;
    }
    open(componentRef, element, config) {
        this._element = element;
        const defaultConfig = new MdbPopconfirmConfig();
        this._config = config ? Object.assign(defaultConfig, config) : defaultConfig;
        if (!element && this._config.popconfirmMode === 'inline') {
            throw Error('Target element is required in inline mode');
        }
        this._overlayRef = this._createOverlay();
        const container = this._createContainer();
        const popconfirmRef = this._createContent(componentRef, container);
        this._listenToOutsideClick(popconfirmRef);
        return popconfirmRef;
    }
    _createOverlay() {
        const overlayConfig = this._getOverlayConfig();
        return this._overlay.create(overlayConfig);
    }
    _getOverlayConfig() {
        const overlayConfig = new OverlayConfig({
            scrollStrategy: this._getScrollStrategy(),
            positionStrategy: this._getPositionStrategy(),
            hasBackdrop: this._getBackdropConfig(),
            backdropClass: this._getBackdropClass(),
        });
        return overlayConfig;
    }
    _getBackdropClass() {
        if (this._config.popconfirmMode === 'modal') {
            return 'mdb-backdrop';
        }
        else {
            return '';
        }
    }
    _getBackdropConfig() {
        if (this._config.popconfirmMode === 'modal') {
            return true;
        }
        else {
            return false;
        }
    }
    _getScrollStrategy() {
        if (this._config.popconfirmMode === 'modal') {
            return this._overlay.scrollStrategies.noop();
        }
        else {
            return this._overlay.scrollStrategies.reposition();
        }
    }
    _getPositionStrategy() {
        if (this._config.popconfirmMode === 'modal') {
            return this._overlay.position().global().centerVertically().centerHorizontally();
        }
        const positionStrategy = this._overlayPositionBuilder
            .flexibleConnectedTo(this._element)
            .withPositions(this._getPosition());
        return positionStrategy;
    }
    _getPosition() {
        let position;
        const positionTopLeft = {
            originX: 'end',
            originY: 'top',
            overlayX: 'end',
            overlayY: 'bottom',
            offsetY: 0,
        };
        const positionTop = {
            originX: 'center',
            originY: 'top',
            overlayX: 'center',
            overlayY: 'bottom',
            offsetY: 0,
        };
        const positionTopRight = {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'bottom',
            offsetY: 0,
        };
        const positionRightTop = {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'bottom',
            offsetX: 0,
        };
        const positionRight = {
            originX: 'end',
            originY: 'center',
            overlayX: 'start',
            overlayY: 'center',
            offsetX: 0,
        };
        const positionRightBottom = {
            originX: 'end',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'top',
            offsetX: 0,
        };
        const positionBottomRight = {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
            offsetY: 0,
        };
        const positionBottom = {
            originX: 'center',
            originY: 'bottom',
            overlayX: 'center',
            overlayY: 'top',
            offsetY: 0,
        };
        const positionBottomLeft = {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'top',
            offsetY: 0,
        };
        const positionLeftBottom = {
            originX: 'start',
            originY: 'top',
            overlayX: 'end',
            overlayY: 'top',
            offsetX: 0,
        };
        const positionLeft = {
            originX: 'start',
            originY: 'center',
            overlayX: 'end',
            overlayY: 'center',
            offsetX: 0,
        };
        const positionLeftTop = {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'bottom',
            offsetY: 0,
        };
        switch (this._config.position) {
            case 'top-left':
                position = [positionTopLeft, positionBottomLeft, positionTopRight, positionBottomRight];
                break;
            case 'top':
                position = [positionTop, positionBottom];
                break;
            case 'top-right':
                position = [positionTopRight, positionTopLeft, positionBottomRight, positionBottomLeft];
                break;
            case 'right-top':
                position = [positionRightTop, positionLeftTop, positionRightBottom, positionLeftBottom];
                break;
            case 'right':
                position = [positionRight, positionLeft];
                break;
            case 'right-bottom':
                position = [positionRightBottom, positionLeftBottom, positionRightTop, positionLeftTop];
                break;
            case 'bottom-right':
                position = [positionBottomRight, positionBottomLeft, positionTopRight, positionTopLeft];
                break;
            case 'bottom':
                position = [positionBottom, positionTop];
                break;
            case 'bottom-left':
                position = [positionBottomLeft, positionTopLeft, positionBottomRight, positionTopLeft];
                break;
            case 'left-bottom':
                position = [positionLeftBottom, positionRightBottom, positionLeftTop, positionRightTop];
                break;
            case 'left':
                position = [positionLeft, positionRight];
                break;
            case 'left-top':
                position = [positionLeftTop, positionLeftBottom, positionRightTop, positionRightBottom];
                break;
            default:
                break;
        }
        return position;
    }
    _createContainer() {
        const portal = new ComponentPortal(MdbPopconfirmContainerComponent, null, this._injector, this._cfr);
        const containerRef = this._overlayRef.attach(portal);
        containerRef.instance._config = this._config;
        return containerRef.instance;
    }
    _createContent(componentOrTemplate, container) {
        const popconfirmRef = new MdbPopconfirmRef(this._overlayRef);
        if (componentOrTemplate instanceof TemplateRef) {
            container.attachTemplatePortal(new TemplatePortal(componentOrTemplate, null, {
                $implicit: this._config.data,
                popconfirmRef,
            }));
        }
        else {
            const injector = this._createInjector(popconfirmRef, container);
            const contentRef = container.attachComponentPortal(new ComponentPortal(componentOrTemplate, this._config.viewContainerRef, injector));
            if (this._config.data) {
                Object.assign(contentRef.instance, { ...this._config.data });
            }
        }
        return popconfirmRef;
    }
    _createInjector(popconfirmRef, container) {
        const userInjector = this._config && this._config.viewContainerRef && this._config.viewContainerRef.injector;
        const providers = [
            { provide: MdbPopconfirmContainerComponent, useValue: container },
            { provide: MdbPopconfirmRef, useValue: popconfirmRef },
        ];
        return Injector.create({ parent: userInjector || this._injector, providers });
    }
    _listenToOutsideClick(popconfirmRef) {
        if (this._overlayRef) {
            merge(this._overlayRef.outsidePointerEvents(), this._overlayRef.detachments(), this._overlayRef.keydownEvents().pipe(filter((event) => {
                return event.key === 'Escape';
            }))).subscribe((event) => {
                if (!event) {
                    return;
                }
                else {
                    event.preventDefault();
                }
                popconfirmRef.close();
            });
        }
    }
}
MdbPopconfirmService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbPopconfirmService, deps: [{ token: i1.Overlay }, { token: i0.Injector }, { token: i0.ComponentFactoryResolver }, { token: i1.OverlayPositionBuilder }], target: i0.ɵɵFactoryTarget.Injectable });
MdbPopconfirmService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbPopconfirmService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbPopconfirmService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i0.Injector }, { type: i0.ComponentFactoryResolver }, { type: i1.OverlayPositionBuilder }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wY29uZmlybS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L3BvcGNvbmZpcm0vcG9wY29uZmlybS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFJTCxhQUFhLEdBS2QsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBRUwsVUFBVSxFQUNWLFFBQVEsRUFFUixXQUFXLEdBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDcEQsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDbkYsT0FBTyxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzdCLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBR3hDLE1BQU0sT0FBTyxvQkFBb0I7SUFLL0IsWUFDVSxRQUFpQixFQUNqQixTQUFtQixFQUNuQixJQUE4QixFQUM5Qix1QkFBK0M7UUFIL0MsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNqQixjQUFTLEdBQVQsU0FBUyxDQUFVO1FBQ25CLFNBQUksR0FBSixJQUFJLENBQTBCO1FBQzlCLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBd0I7SUFDdEQsQ0FBQztJQUVKLElBQUksQ0FDRixZQUE4QixFQUM5QixPQUFxQixFQUNyQixNQUErQjtRQUUvQixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUV4QixNQUFNLGFBQWEsR0FBRyxJQUFJLG1CQUFtQixFQUFFLENBQUM7UUFDaEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFN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IENvbXBvbmVudFR5cGUsXG4gIENvbm5lY3RlZFBvc2l0aW9uLFxuICBPdmVybGF5LFxuICBPdmVybGF5Q29uZmlnLFxuICBPdmVybGF5UG9zaXRpb25CdWlsZGVyLFxuICBPdmVybGF5UmVmLFxuICBQb3NpdGlvblN0cmF0ZWd5LFxuICBTY3JvbGxTdHJhdGVneSxcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBJbmplY3RhYmxlLFxuICBJbmplY3RvcixcbiAgU3RhdGljUHJvdmlkZXIsXG4gIFRlbXBsYXRlUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1kYlBvcGNvbmZpcm1Db25maWcgfSBmcm9tICcuL3BvcGNvbmZpcm0uY29uZmlnJztcbmltcG9ydCB7IE1kYlBvcGNvbmZpcm1SZWYgfSBmcm9tICcuL3BvcGNvbmZpcm0tcmVmJztcbmltcG9ydCB7IE1kYlBvcGNvbmZpcm1Db250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL3BvcGNvbmZpcm0tY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21wb25lbnRQb3J0YWwsIFRlbXBsYXRlUG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBtZXJnZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWRiUG9wY29uZmlybVNlcnZpY2Uge1xuICBwcml2YXRlIF9lbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfb3ZlcmxheVJlZjogT3ZlcmxheVJlZjtcbiAgcHJpdmF0ZSBfY29uZmlnOiBNZGJQb3Bjb25maXJtQ29uZmlnO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX292ZXJsYXk6IE92ZXJsYXksXG4gICAgcHJpdmF0ZSBfaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByaXZhdGUgX2NmcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUgX292ZXJsYXlQb3NpdGlvbkJ1aWxkZXI6IE92ZXJsYXlQb3NpdGlvbkJ1aWxkZXJcbiAgKSB7fVxuXG4gIG9wZW48VCwgRCA9IGFueT4oXG4gICAgY29tcG9uZW50UmVmOiBDb21wb25lbnRUeXBlPFQ+LFxuICAgIGVsZW1lbnQ/OiBIVE1MRWxlbWVudCxcbiAgICBjb25maWc/OiBNZGJQb3Bjb25maXJtQ29uZmlnPEQ+XG4gICk6IE1kYlBvcGNvbmZpcm1SZWY8VD4ge1xuICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgY29uc3QgZGVmYXVsdENvbmZpZyA9IG5ldyBNZGJQb3Bjb25maXJtQ29uZmlnKCk7XG4gICAgdGhpcy5fY29uZmlnID0gY29uZmlnID8gT2JqZWN0LmFzc2lnbihkZWZhdWx0Q29uZmlnLCBjb25maWcpIDogZGVmYXVsdENvbmZpZztcblxuICAgIGlmICghZWxlbWVudCAmJiB0aGlzLl9jb25maWcucG9wY29uZmlybU1vZGUgPT09ICdpbmxpbmUnKSB7XG4gICAgICB0aHJvdyBFcnJvcignVGFyZ2V0IGVsZW1lbnQgaXMgcmVxdWlyZWQgaW4gaW5saW5lIG1vZGUnKTtcbiAgICB9XG5cbiAgICB0aGlzLl9vdmVybGF5UmVmID0gdGhpcy5fY3JlYXRlT3ZlcmxheSgpO1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuX2NyZWF0ZUNvbnRhaW5lcigpO1xuICAgIGNvbnN0IHBvcGNvbmZpcm1SZWYgPSB0aGlzLl9jcmVhdGVDb250ZW50KGNvbXBvbmVudFJlZiwgY29udGFpbmVyKTtcblxuICAgIHRoaXMuX2xpc3RlblRvT3V0c2lkZUNsaWNrKHBvcGNvbmZpcm1SZWYpO1xuXG4gICAgcmV0dXJuIHBvcGNvbmZpcm1SZWY7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVPdmVybGF5KCk6IE92ZXJsYXlSZWYge1xuICAgIGNvbnN0IG92ZXJsYXlDb25maWcgPSB0aGlzLl9nZXRPdmVybGF5Q29uZmlnKCk7XG4gICAgcmV0dXJuIHRoaXMuX292ZXJsYXkuY3JlYXRlKG92ZXJsYXlDb25maWcpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0T3ZlcmxheUNvbmZpZygpOiBPdmVybGF5Q29uZmlnIHtcbiAgICBjb25zdCBvdmVybGF5Q29uZmlnID0gbmV3IE92ZXJsYXlDb25maWcoe1xuICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMuX2dldFNjcm9sbFN0cmF0ZWd5KCksXG4gICAgICBwb3NpdGlvblN0cmF0ZWd5OiB0aGlzLl9nZXRQb3NpdGlvblN0cmF0ZWd5KCksXG4gICAgICBoYXNCYWNrZHJvcDogdGhpcy5fZ2V0QmFja2Ryb3BDb25maWcoKSxcbiAgICAgIGJhY2tkcm9wQ2xhc3M6IHRoaXMuX2dldEJhY2tkcm9wQ2xhc3MoKSxcbiAgICB9KTtcblxuICAgIHJldHVybiBvdmVybGF5Q29uZmlnO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0QmFja2Ryb3BDbGFzcygpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLl9jb25maWcucG9wY29uZmlybU1vZGUgPT09ICdtb2RhbCcpIHtcbiAgICAgIHJldHVybiAnbWRiLWJhY2tkcm9wJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2dldEJhY2tkcm9wQ29uZmlnKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLl9jb25maWcucG9wY29uZmlybU1vZGUgPT09ICdtb2RhbCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0U2Nyb2xsU3RyYXRlZ3koKTogU2Nyb2xsU3RyYXRlZ3kge1xuICAgIGlmICh0aGlzLl9jb25maWcucG9wY29uZmlybU1vZGUgPT09ICdtb2RhbCcpIHtcbiAgICAgIHJldHVybiB0aGlzLl9vdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMubm9vcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5fb3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLnJlcG9zaXRpb24oKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9nZXRQb3NpdGlvblN0cmF0ZWd5KCk6IFBvc2l0aW9uU3RyYXRlZ3kge1xuICAgIGlmICh0aGlzLl9jb25maWcucG9wY29uZmlybU1vZGUgPT09ICdtb2RhbCcpIHtcbiAgICAgIHJldHVybiB0aGlzLl9vdmVybGF5LnBvc2l0aW9uKCkuZ2xvYmFsKCkuY2VudGVyVmVydGljYWxseSgpLmNlbnRlckhvcml6b250YWxseSgpO1xuICAgIH1cblxuICAgIGNvbnN0IHBvc2l0aW9uU3RyYXRlZ3kgPSB0aGlzLl9vdmVybGF5UG9zaXRpb25CdWlsZGVyXG4gICAgICAuZmxleGlibGVDb25uZWN0ZWRUbyh0aGlzLl9lbGVtZW50KVxuICAgICAgLndpdGhQb3NpdGlvbnModGhpcy5fZ2V0UG9zaXRpb24oKSk7XG5cbiAgICByZXR1cm4gcG9zaXRpb25TdHJhdGVneTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFBvc2l0aW9uKCk6IENvbm5lY3RlZFBvc2l0aW9uW10ge1xuICAgIGxldCBwb3NpdGlvbjtcblxuICAgIGNvbnN0IHBvc2l0aW9uVG9wTGVmdCA9IHtcbiAgICAgIG9yaWdpblg6ICdlbmQnLFxuICAgICAgb3JpZ2luWTogJ3RvcCcsXG4gICAgICBvdmVybGF5WDogJ2VuZCcsXG4gICAgICBvdmVybGF5WTogJ2JvdHRvbScsXG4gICAgICBvZmZzZXRZOiAwLFxuICAgIH07XG5cbiAgICBjb25zdCBwb3NpdGlvblRvcCA9IHtcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxuICAgICAgb3JpZ2luWTogJ3RvcCcsXG4gICAgICBvdmVybGF5WDogJ2NlbnRlcicsXG4gICAgICBvdmVybGF5WTogJ2JvdHRvbScsXG4gICAgICBvZmZzZXRZOiAwLFxuICAgIH07XG5cbiAgICBjb25zdCBwb3NpdGlvblRvcFJpZ2h0ID0ge1xuICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcbiAgICAgIG9yaWdpblk6ICd0b3AnLFxuICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXG4gICAgICBvdmVybGF5WTogJ2JvdHRvbScsXG4gICAgICBvZmZzZXRZOiAwLFxuICAgIH07XG5cbiAgICBjb25zdCBwb3NpdGlvblJpZ2h0VG9wID0ge1xuICAgICAgb3JpZ2luWDogJ2VuZCcsXG4gICAgICBvcmlnaW5ZOiAnYm90dG9tJyxcbiAgICAgIG92ZXJsYXlYOiAnc3RhcnQnLFxuICAgICAgb3ZlcmxheVk6ICdib3R0b20nLFxuICAgICAgb2Zmc2V0WDogMCxcbiAgICB9O1xuXG4gICAgY29uc3QgcG9zaXRpb25SaWdodCA9IHtcbiAgICAgIG9yaWdpblg6ICdlbmQnLFxuICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXG4gICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgIG92ZXJsYXlZOiAnY2VudGVyJyxcbiAgICAgIG9mZnNldFg6IDAsXG4gICAgfTtcblxuICAgIGNvbnN0IHBvc2l0aW9uUmlnaHRCb3R0b20gPSB7XG4gICAgICBvcmlnaW5YOiAnZW5kJyxcbiAgICAgIG9yaWdpblk6ICd0b3AnLFxuICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXG4gICAgICBvdmVybGF5WTogJ3RvcCcsXG4gICAgICBvZmZzZXRYOiAwLFxuICAgIH07XG5cbiAgICBjb25zdCBwb3NpdGlvbkJvdHRvbVJpZ2h0ID0ge1xuICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcbiAgICAgIG9yaWdpblk6ICdib3R0b20nLFxuICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXG4gICAgICBvdmVybGF5WTogJ3RvcCcsXG4gICAgICBvZmZzZXRZOiAwLFxuICAgIH07XG5cbiAgICBjb25zdCBwb3NpdGlvbkJvdHRvbSA9IHtcbiAgICAgIG9yaWdpblg6ICdjZW50ZXInLFxuICAgICAgb3JpZ2luWTogJ2JvdHRvbScsXG4gICAgICBvdmVybGF5WDogJ2NlbnRlcicsXG4gICAgICBvdmVybGF5WTogJ3RvcCcsXG4gICAgICBvZmZzZXRZOiAwLFxuICAgIH07XG5cbiAgICBjb25zdCBwb3NpdGlvbkJvdHRvbUxlZnQgPSB7XG4gICAgICBvcmlnaW5YOiAnZW5kJyxcbiAgICAgIG9yaWdpblk6ICdib3R0b20nLFxuICAgICAgb3ZlcmxheVg6ICdlbmQnLFxuICAgICAgb3ZlcmxheVk6ICd0b3AnLFxuICAgICAgb2Zmc2V0WTogMCxcbiAgICB9O1xuXG4gICAgY29uc3QgcG9zaXRpb25MZWZ0Qm90dG9tID0ge1xuICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcbiAgICAgIG9yaWdpblk6ICd0b3AnLFxuICAgICAgb3ZlcmxheVg6ICdlbmQnLFxuICAgICAgb3ZlcmxheVk6ICd0b3AnLFxuICAgICAgb2Zmc2V0WDogMCxcbiAgICB9O1xuXG4gICAgY29uc3QgcG9zaXRpb25MZWZ0ID0ge1xuICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxuICAgICAgb3ZlcmxheVg6ICdlbmQnLFxuICAgICAgb3ZlcmxheVk6ICdjZW50ZXInLFxuICAgICAgb2Zmc2V0WDogMCxcbiAgICB9O1xuXG4gICAgY29uc3QgcG9zaXRpb25MZWZ0VG9wID0ge1xuICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcbiAgICAgIG9yaWdpblk6ICdib3R0b20nLFxuICAgICAgb3ZlcmxheVg6ICdlbmQnLFxuICAgICAgb3ZlcmxheVk6ICdib3R0b20nLFxuICAgICAgb2Zmc2V0WTogMCxcbiAgICB9O1xuXG4gICAgc3dpdGNoICh0aGlzLl9jb25maWcucG9zaXRpb24pIHtcbiAgICAgIGNhc2UgJ3RvcC1sZWZ0JzpcbiAgICAgICAgcG9zaXRpb24gPSBbcG9zaXRpb25Ub3BMZWZ0LCBwb3NpdGlvbkJvdHRvbUxlZnQsIHBvc2l0aW9uVG9wUmlnaHQsIHBvc2l0aW9uQm90dG9tUmlnaHRdO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgIHBvc2l0aW9uID0gW3Bvc2l0aW9uVG9wLCBwb3NpdGlvbkJvdHRvbV07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndG9wLXJpZ2h0JzpcbiAgICAgICAgcG9zaXRpb24gPSBbcG9zaXRpb25Ub3BSaWdodCwgcG9zaXRpb25Ub3BMZWZ0LCBwb3NpdGlvbkJvdHRvbVJpZ2h0LCBwb3NpdGlvbkJvdHRvbUxlZnRdO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JpZ2h0LXRvcCc6XG4gICAgICAgIHBvc2l0aW9uID0gW3Bvc2l0aW9uUmlnaHRUb3AsIHBvc2l0aW9uTGVmdFRvcCwgcG9zaXRpb25SaWdodEJvdHRvbSwgcG9zaXRpb25MZWZ0Qm90dG9tXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgIHBvc2l0aW9uID0gW3Bvc2l0aW9uUmlnaHQsIHBvc2l0aW9uTGVmdF07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmlnaHQtYm90dG9tJzpcbiAgICAgICAgcG9zaXRpb24gPSBbcG9zaXRpb25SaWdodEJvdHRvbSwgcG9zaXRpb25MZWZ0Qm90dG9tLCBwb3NpdGlvblJpZ2h0VG9wLCBwb3NpdGlvbkxlZnRUb3BdO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2JvdHRvbS1yaWdodCc6XG4gICAgICAgIHBvc2l0aW9uID0gW3Bvc2l0aW9uQm90dG9tUmlnaHQsIHBvc2l0aW9uQm90dG9tTGVmdCwgcG9zaXRpb25Ub3BSaWdodCwgcG9zaXRpb25Ub3BMZWZ0XTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICBwb3NpdGlvbiA9IFtwb3NpdGlvbkJvdHRvbSwgcG9zaXRpb25Ub3BdO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2JvdHRvbS1sZWZ0JzpcbiAgICAgICAgcG9zaXRpb24gPSBbcG9zaXRpb25Cb3R0b21MZWZ0LCBwb3NpdGlvblRvcExlZnQsIHBvc2l0aW9uQm90dG9tUmlnaHQsIHBvc2l0aW9uVG9wTGVmdF07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbGVmdC1ib3R0b20nOlxuICAgICAgICBwb3NpdGlvbiA9IFtwb3NpdGlvbkxlZnRCb3R0b20sIHBvc2l0aW9uUmlnaHRCb3R0b20sIHBvc2l0aW9uTGVmdFRvcCwgcG9zaXRpb25SaWdodFRvcF07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgIHBvc2l0aW9uID0gW3Bvc2l0aW9uTGVmdCwgcG9zaXRpb25SaWdodF07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbGVmdC10b3AnOlxuICAgICAgICBwb3NpdGlvbiA9IFtwb3NpdGlvbkxlZnRUb3AsIHBvc2l0aW9uTGVmdEJvdHRvbSwgcG9zaXRpb25SaWdodFRvcCwgcG9zaXRpb25SaWdodEJvdHRvbV07XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBvc2l0aW9uO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlQ29udGFpbmVyKCk6IE1kYlBvcGNvbmZpcm1Db250YWluZXJDb21wb25lbnQge1xuICAgIGNvbnN0IHBvcnRhbCA9IG5ldyBDb21wb25lbnRQb3J0YWwoXG4gICAgICBNZGJQb3Bjb25maXJtQ29udGFpbmVyQ29tcG9uZW50LFxuICAgICAgbnVsbCxcbiAgICAgIHRoaXMuX2luamVjdG9yLFxuICAgICAgdGhpcy5fY2ZyXG4gICAgKTtcbiAgICBjb25zdCBjb250YWluZXJSZWYgPSB0aGlzLl9vdmVybGF5UmVmLmF0dGFjaChwb3J0YWwpO1xuICAgIGNvbnRhaW5lclJlZi5pbnN0YW5jZS5fY29uZmlnID0gdGhpcy5fY29uZmlnO1xuICAgIHJldHVybiBjb250YWluZXJSZWYuaW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVDb250ZW50PFQ+KFxuICAgIGNvbXBvbmVudE9yVGVtcGxhdGU6IENvbXBvbmVudFR5cGU8VD4gfCBUZW1wbGF0ZVJlZjxUPixcbiAgICBjb250YWluZXI6IE1kYlBvcGNvbmZpcm1Db250YWluZXJDb21wb25lbnRcbiAgKTogTWRiUG9wY29uZmlybVJlZjxUPiB7XG4gICAgY29uc3QgcG9wY29uZmlybVJlZiA9IG5ldyBNZGJQb3Bjb25maXJtUmVmKHRoaXMuX292ZXJsYXlSZWYpO1xuXG4gICAgaWYgKGNvbXBvbmVudE9yVGVtcGxhdGUgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZikge1xuICAgICAgY29udGFpbmVyLmF0dGFjaFRlbXBsYXRlUG9ydGFsKFxuICAgICAgICBuZXcgVGVtcGxhdGVQb3J0YWw8VD4oY29tcG9uZW50T3JUZW1wbGF0ZSwgbnVsbCwge1xuICAgICAgICAgICRpbXBsaWNpdDogdGhpcy5fY29uZmlnLmRhdGEsXG4gICAgICAgICAgcG9wY29uZmlybVJlZixcbiAgICAgICAgfSBhcyBhbnkpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpbmplY3RvciA9IHRoaXMuX2NyZWF0ZUluamVjdG9yPFQ+KHBvcGNvbmZpcm1SZWYsIGNvbnRhaW5lcik7XG4gICAgICBjb25zdCBjb250ZW50UmVmID0gY29udGFpbmVyLmF0dGFjaENvbXBvbmVudFBvcnRhbDxUPihcbiAgICAgICAgbmV3IENvbXBvbmVudFBvcnRhbChjb21wb25lbnRPclRlbXBsYXRlLCB0aGlzLl9jb25maWcudmlld0NvbnRhaW5lclJlZiwgaW5qZWN0b3IpXG4gICAgICApO1xuXG4gICAgICBpZiAodGhpcy5fY29uZmlnLmRhdGEpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihjb250ZW50UmVmLmluc3RhbmNlLCB7IC4uLnRoaXMuX2NvbmZpZy5kYXRhIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBwb3Bjb25maXJtUmVmO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlSW5qZWN0b3I8VD4oXG4gICAgcG9wY29uZmlybVJlZjogTWRiUG9wY29uZmlybVJlZjxUPixcbiAgICBjb250YWluZXI6IE1kYlBvcGNvbmZpcm1Db250YWluZXJDb21wb25lbnRcbiAgKTogSW5qZWN0b3Ige1xuICAgIGNvbnN0IHVzZXJJbmplY3RvciA9XG4gICAgICB0aGlzLl9jb25maWcgJiYgdGhpcy5fY29uZmlnLnZpZXdDb250YWluZXJSZWYgJiYgdGhpcy5fY29uZmlnLnZpZXdDb250YWluZXJSZWYuaW5qZWN0b3I7XG4gICAgY29uc3QgcHJvdmlkZXJzOiBTdGF0aWNQcm92aWRlcltdID0gW1xuICAgICAgeyBwcm92aWRlOiBNZGJQb3Bjb25maXJtQ29udGFpbmVyQ29tcG9uZW50LCB1c2VWYWx1ZTogY29udGFpbmVyIH0sXG4gICAgICB7IHByb3ZpZGU6IE1kYlBvcGNvbmZpcm1SZWYsIHVzZVZhbHVlOiBwb3Bjb25maXJtUmVmIH0sXG4gICAgXTtcblxuICAgIHJldHVybiBJbmplY3Rvci5jcmVhdGUoeyBwYXJlbnQ6IHVzZXJJbmplY3RvciB8fCB0aGlzLl9pbmplY3RvciwgcHJvdmlkZXJzIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfbGlzdGVuVG9PdXRzaWRlQ2xpY2socG9wY29uZmlybVJlZjogTWRiUG9wY29uZmlybVJlZjxhbnk+KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX292ZXJsYXlSZWYpIHtcbiAgICAgIG1lcmdlKFxuICAgICAgICB0aGlzLl9vdmVybGF5UmVmLm91dHNpZGVQb2ludGVyRXZlbnRzKCksXG4gICAgICAgIHRoaXMuX292ZXJsYXlSZWYuZGV0YWNobWVudHMoKSxcbiAgICAgICAgdGhpcy5fb3ZlcmxheVJlZi5rZXlkb3duRXZlbnRzKCkucGlwZShcbiAgICAgICAgICBmaWx0ZXIoKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZXZlbnQua2V5ID09PSAnRXNjYXBlJztcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICApLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKCFldmVudCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcG9wY29uZmlybVJlZi5jbG9zZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=