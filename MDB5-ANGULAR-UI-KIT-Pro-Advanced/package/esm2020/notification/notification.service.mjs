import { OverlayConfig, } from '@angular/cdk/overlay';
import { Injectable, Injector, TemplateRef, } from '@angular/core';
import { MdbNotificationConfig } from './notification.config';
import { MdbNotificationRef } from './notification-ref';
import { MdbNotificationContainerComponent } from './notification-container.component';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { first } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
export class MdbNotificationService {
    constructor(_overlay, _injector, _cfr) {
        this._overlay = _overlay;
        this._injector = _injector;
        this._cfr = _cfr;
        this.toasts = [];
    }
    open(componentOrTemplateRef, newConfig) {
        const defaultConfig = new MdbNotificationConfig();
        this.config = newConfig ? Object.assign(defaultConfig, newConfig) : defaultConfig;
        const overlayRef = this._createOverlay(this.config);
        const container = this._createContainer(overlayRef, this.config);
        const toastRef = this._createContent(componentOrTemplateRef, container, overlayRef, this.config);
        if (this.config.stacking) {
            this.toasts.push(toastRef);
        }
        if (this.config.autohide) {
            this.timeout = setTimeout(() => {
                container._hidden.pipe(first()).subscribe(() => {
                    if (this.config.stacking) {
                        this.updateToast(toastRef);
                    }
                    overlayRef.detach();
                    overlayRef.dispose();
                });
                container.animationState = 'hidden';
                container.detectChanges();
            }, this.config.delay);
        }
        return toastRef;
    }
    updateToast(toastRef) {
        const toastIndex = this.toasts.indexOf(toastRef);
        this.toasts.splice(toastIndex, 1);
        this.toasts.forEach((toast, index) => {
            toast.overlayRef.updatePositionStrategy(this._getPositionStrategy(this.config, index - 1));
        });
    }
    _createOverlay(config) {
        const overlayConfig = this._getOverlayConfig(config);
        return this._overlay.create(overlayConfig);
    }
    _setOffset(config, index) {
        const verticalDirection = config.position.startsWith('top') ? 'bottom' : 'top';
        const shouldCalculateFromTop = verticalDirection === 'top' ? false : true;
        const calculationAdjustment = shouldCalculateFromTop ? 0 : window.innerHeight;
        if (this.toasts.length === 0 || index <= -1) {
            return config.offset;
        }
        else if (index || index === 0) {
            return Math.abs(calculationAdjustment - this.toasts[index].getPosition()[verticalDirection]);
        }
        else {
            return Math.abs(calculationAdjustment - this.toasts[this.toasts.length - 1].getPosition()[verticalDirection]);
        }
    }
    _getOverlayConfig(notificationConfig) {
        const width = notificationConfig.width;
        const config = new OverlayConfig({
            positionStrategy: this._getPositionStrategy(notificationConfig),
            scrollStrategy: this._overlay.scrollStrategies.reposition(),
            hasBackdrop: false,
            height: 'fit-content',
            width,
        });
        return config;
    }
    _getPositionStrategy(notificationConfig, index) {
        const offset = `${this._setOffset(notificationConfig, index)}px`;
        let positionStrategy;
        switch (notificationConfig.position) {
            case 'top-left':
                positionStrategy = this._overlay
                    .position()
                    .global()
                    .top(offset)
                    .left(`${notificationConfig.offset}px`);
                break;
            case 'bottom-left':
                positionStrategy = this._overlay
                    .position()
                    .global()
                    .bottom(offset)
                    .left(`${notificationConfig.offset}px`);
                break;
            case 'bottom-right':
                positionStrategy = this._overlay
                    .position()
                    .global()
                    .bottom(offset)
                    .right(`${notificationConfig.offset}px`);
                break;
            case 'bottom-center':
                positionStrategy = this._overlay.position().global().bottom(offset).centerHorizontally();
                break;
            case 'top-center':
                positionStrategy = this._overlay.position().global().top(offset).centerHorizontally();
                break;
            default:
                positionStrategy = this._overlay
                    .position()
                    .global()
                    .top(offset)
                    .right(`${notificationConfig.offset}px`);
                break;
        }
        return positionStrategy;
    }
    _createContainer(overlayRef, config) {
        const portal = new ComponentPortal(MdbNotificationContainerComponent, null, this._injector, this._cfr);
        const containerRef = overlayRef.attach(portal);
        containerRef.instance._config = config;
        return containerRef.instance;
    }
    _createContent(componentOrTemplate, container, overlayRef, config) {
        const notificationRef = new MdbNotificationRef(overlayRef, this, container);
        if (componentOrTemplate instanceof TemplateRef) {
            container.attachTemplatePortal(new TemplatePortal(componentOrTemplate, null, {
                $implicit: config.data,
                notificationRef,
            }));
        }
        else {
            const injector = this._createInjector(config, notificationRef, container);
            const contentRef = container.attachComponentPortal(new ComponentPortal(componentOrTemplate, config.viewContainerRef, injector));
            if (config.data) {
                Object.assign(contentRef.instance, { ...config.data });
            }
        }
        return notificationRef;
    }
    _createInjector(config, notificationRef, container) {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        const providers = [
            { provide: MdbNotificationContainerComponent, useValue: container },
            { provide: MdbNotificationRef, useValue: notificationRef },
        ];
        return Injector.create({ parent: userInjector || this._injector, providers });
    }
}
MdbNotificationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbNotificationService, deps: [{ token: i1.Overlay }, { token: i0.Injector }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.Injectable });
MdbNotificationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbNotificationService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbNotificationService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i0.Injector }, { type: i0.ComponentFactoryResolver }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFHTCxhQUFhLEdBR2QsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBRUwsVUFBVSxFQUNWLFFBQVEsRUFFUixXQUFXLEdBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDeEQsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDdkYsT0FBTyxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQUd2QyxNQUFNLE9BQU8sc0JBQXNCO0lBS2pDLFlBQ1UsUUFBaUIsRUFDakIsU0FBbUIsRUFDbkIsSUFBOEI7UUFGOUIsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNqQixjQUFTLEdBQVQsU0FBUyxDQUFVO1FBQ25CLFNBQUksR0FBSixJQUFJLENBQTBCO1FBTnhDLFdBQU0sR0FBNkIsRUFBRSxDQUFDO0lBT25DLENBQUM7SUFFSixJQUFJLENBQ0Ysc0JBQXlELEVBQ3pELFNBQW9DO1FBRXBDLE1BQU0sYUFBYSxHQUFHLElBQUkscUJBQXFCLEVBQUUsQ0FBQztRQUNsRCxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztRQUVsRixNQUFNLFVBQVUsR0FB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QzdCLGVBQXNDLEVBQ3RDLFNBQTRDO1FBRTVDLE1BQU0sWUFBWSxHQUFHLE1BQU0sSUFBSSxNQUFNLENBQUMsZ0JBQWdCLElBQUksTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQztRQUMzRixNQUFNLFNBQVMsR0FBcUI7WUFDbEMsRUFBRSxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRTtZQUNuRSxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFO1NBQzNELENBQUM7UUFFRixPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsWUFBWSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUNoRixDQUFDOzttSEFuTVUsc0JBQXNCO3VIQUF0QixzQkFBc0I7MkZBQXRCLHNCQUFzQjtrQkFEbEMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudFR5cGUsXG4gIE92ZXJsYXksXG4gIE92ZXJsYXlDb25maWcsXG4gIE92ZXJsYXlSZWYsXG4gIFBvc2l0aW9uU3RyYXRlZ3ksXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7XG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgSW5qZWN0YWJsZSxcbiAgSW5qZWN0b3IsXG4gIFN0YXRpY1Byb3ZpZGVyLFxuICBUZW1wbGF0ZVJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZGJOb3RpZmljYXRpb25Db25maWcgfSBmcm9tICcuL25vdGlmaWNhdGlvbi5jb25maWcnO1xuaW1wb3J0IHsgTWRiTm90aWZpY2F0aW9uUmVmIH0gZnJvbSAnLi9ub3RpZmljYXRpb24tcmVmJztcbmltcG9ydCB7IE1kYk5vdGlmaWNhdGlvbkNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vbm90aWZpY2F0aW9uLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29tcG9uZW50UG9ydGFsLCBUZW1wbGF0ZVBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgZmlyc3QgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNZGJOb3RpZmljYXRpb25TZXJ2aWNlIHtcbiAgdGltZW91dDogYW55O1xuICB0b2FzdHM6IE1kYk5vdGlmaWNhdGlvblJlZjxbXT5bXSA9IFtdO1xuICBjb25maWc6IE1kYk5vdGlmaWNhdGlvbkNvbmZpZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9vdmVybGF5OiBPdmVybGF5LFxuICAgIHByaXZhdGUgX2luamVjdG9yOiBJbmplY3RvcixcbiAgICBwcml2YXRlIF9jZnI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlclxuICApIHt9XG5cbiAgb3BlbjxULCBEID0gYW55PihcbiAgICBjb21wb25lbnRPclRlbXBsYXRlUmVmOiBDb21wb25lbnRUeXBlPFQ+IHwgVGVtcGxhdGVSZWY8VD4sXG4gICAgbmV3Q29uZmlnPzogTWRiTm90aWZpY2F0aW9uQ29uZmlnPEQ+XG4gICk6IE1kYk5vdGlmaWNhdGlvblJlZjxUPiB7XG4gICAgY29uc3QgZGVmYXVsdENvbmZpZyA9IG5ldyBNZGJOb3RpZmljYXRpb25Db25maWcoKTtcbiAgICB0aGlzLmNvbmZpZyA9IG5ld0NvbmZpZyA/IE9iamVjdC5hc3NpZ24oZGVmYXVsdENvbmZpZywgbmV3Q29uZmlnKSA6IGRlZmF1bHRDb25maWc7XG5cbiAgICBjb25zdCBvdmVybGF5UmVmID0gdGhpcy5fY3JlYXRlT3ZlcmxheSh0aGlzLmNvbmZpZyk7XG4gICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5fY3JlYXRlQ29udGFpbmVyKG92ZXJsYXlSZWYsIHRoaXMuY29uZmlnKTtcbiAgICBjb25zdCB0b2FzdFJlZiA9IHRoaXMuX2NyZWF0ZUNvbnRlbnQoXG4gICAgICBjb21wb25lbnRPclRlbXBsYXRlUmVmLFxuICAgICAgY29udGFpbmVyLFxuICAgICAgb3ZlcmxheVJlZixcbiAgICAgIHRoaXMuY29uZmlnXG4gICAgKTtcblxuICAgIGlmICh0aGlzLmNvbmZpZy5zdGFja2luZykge1xuICAgICAgdGhpcy50b2FzdHMucHVzaCh0b2FzdFJlZik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29uZmlnLmF1dG9oaWRlKSB7XG4gICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29udGFpbmVyLl9oaWRkZW4ucGlwZShmaXJzdCgpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5zdGFja2luZykge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVUb2FzdCh0b2FzdFJlZik7XG4gICAgICAgICAgfVxuICAgICAgICAgIG92ZXJsYXlSZWYuZGV0YWNoKCk7XG4gICAgICAgICAgb3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnRhaW5lci5hbmltYXRpb25TdGF0ZSA9ICdoaWRkZW4nO1xuICAgICAgICBjb250YWluZXIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSwgdGhpcy5jb25maWcuZGVsYXkpO1xuICAgIH1cblxuICAgIHJldHVybiB0b2FzdFJlZjtcbiAgfVxuXG4gIHVwZGF0ZVRvYXN0KHRvYXN0UmVmKTogdm9pZCB7XG4gICAgY29uc3QgdG9hc3RJbmRleCA9IHRoaXMudG9hc3RzLmluZGV4T2YodG9hc3RSZWYpO1xuICAgIHRoaXMudG9hc3RzLnNwbGljZSh0b2FzdEluZGV4LCAxKTtcblxuICAgIHRoaXMudG9hc3RzLmZvckVhY2goKHRvYXN0LCBpbmRleCkgPT4ge1xuICAgICAgdG9hc3Qub3ZlcmxheVJlZi51cGRhdGVQb3NpdGlvblN0cmF0ZWd5KHRoaXMuX2dldFBvc2l0aW9uU3RyYXRlZ3kodGhpcy5jb25maWcsIGluZGV4IC0gMSkpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlT3ZlcmxheShjb25maWc6IE1kYk5vdGlmaWNhdGlvbkNvbmZpZyk6IE92ZXJsYXlSZWYge1xuICAgIGNvbnN0IG92ZXJsYXlDb25maWcgPSB0aGlzLl9nZXRPdmVybGF5Q29uZmlnKGNvbmZpZyk7XG4gICAgcmV0dXJuIHRoaXMuX292ZXJsYXkuY3JlYXRlKG92ZXJsYXlDb25maWcpO1xuICB9XG4gIHByaXZhdGUgX3NldE9mZnNldChjb25maWc6IE1kYk5vdGlmaWNhdGlvbkNvbmZpZywgaW5kZXg/OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IHZlcnRpY2FsRGlyZWN0aW9uID0gY29uZmlnLnBvc2l0aW9uLnN0YXJ0c1dpdGgoJ3RvcCcpID8gJ2JvdHRvbScgOiAndG9wJztcbiAgICBjb25zdCBzaG91bGRDYWxjdWxhdGVGcm9tVG9wID0gdmVydGljYWxEaXJlY3Rpb24gPT09ICd0b3AnID8gZmFsc2UgOiB0cnVlO1xuICAgIGNvbnN0IGNhbGN1bGF0aW9uQWRqdXN0bWVudCA9IHNob3VsZENhbGN1bGF0ZUZyb21Ub3AgPyAwIDogd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgaWYgKHRoaXMudG9hc3RzLmxlbmd0aCA9PT0gMCB8fCBpbmRleCA8PSAtMSkge1xuICAgICAgcmV0dXJuIGNvbmZpZy5vZmZzZXQ7XG4gICAgfSBlbHNlIGlmIChpbmRleCB8fCBpbmRleCA9PT0gMCkge1xuICAgICAgcmV0dXJuIE1hdGguYWJzKGNhbGN1bGF0aW9uQWRqdXN0bWVudCAtIHRoaXMudG9hc3RzW2luZGV4XS5nZXRQb3NpdGlvbigpW3ZlcnRpY2FsRGlyZWN0aW9uXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBNYXRoLmFicyhcbiAgICAgICAgY2FsY3VsYXRpb25BZGp1c3RtZW50IC0gdGhpcy50b2FzdHNbdGhpcy50b2FzdHMubGVuZ3RoIC0gMV0uZ2V0UG9zaXRpb24oKVt2ZXJ0aWNhbERpcmVjdGlvbl1cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0T3ZlcmxheUNvbmZpZyhub3RpZmljYXRpb25Db25maWc6IE1kYk5vdGlmaWNhdGlvbkNvbmZpZyk6IE92ZXJsYXlDb25maWcge1xuICAgIGNvbnN0IHdpZHRoID0gbm90aWZpY2F0aW9uQ29uZmlnLndpZHRoO1xuXG4gICAgY29uc3QgY29uZmlnID0gbmV3IE92ZXJsYXlDb25maWcoe1xuICAgICAgcG9zaXRpb25TdHJhdGVneTogdGhpcy5fZ2V0UG9zaXRpb25TdHJhdGVneShub3RpZmljYXRpb25Db25maWcpLFxuICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMuX292ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5yZXBvc2l0aW9uKCksXG4gICAgICBoYXNCYWNrZHJvcDogZmFsc2UsXG4gICAgICBoZWlnaHQ6ICdmaXQtY29udGVudCcsXG4gICAgICB3aWR0aCxcbiAgICB9KTtcblxuICAgIHJldHVybiBjb25maWc7XG4gIH1cblxuICBwcml2YXRlIF9nZXRQb3NpdGlvblN0cmF0ZWd5KFxuICAgIG5vdGlmaWNhdGlvbkNvbmZpZzogTWRiTm90aWZpY2F0aW9uQ29uZmlnLFxuICAgIGluZGV4PzogbnVtYmVyXG4gICk6IFBvc2l0aW9uU3RyYXRlZ3kge1xuICAgIGNvbnN0IG9mZnNldCA9IGAke3RoaXMuX3NldE9mZnNldChub3RpZmljYXRpb25Db25maWcsIGluZGV4KX1weGA7XG4gICAgbGV0IHBvc2l0aW9uU3RyYXRlZ3k7XG5cbiAgICBzd2l0Y2ggKG5vdGlmaWNhdGlvbkNvbmZpZy5wb3NpdGlvbikge1xuICAgICAgY2FzZSAndG9wLWxlZnQnOlxuICAgICAgICBwb3NpdGlvblN0cmF0ZWd5ID0gdGhpcy5fb3ZlcmxheVxuICAgICAgICAgIC5wb3NpdGlvbigpXG4gICAgICAgICAgLmdsb2JhbCgpXG4gICAgICAgICAgLnRvcChvZmZzZXQpXG4gICAgICAgICAgLmxlZnQoYCR7bm90aWZpY2F0aW9uQ29uZmlnLm9mZnNldH1weGApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2JvdHRvbS1sZWZ0JzpcbiAgICAgICAgcG9zaXRpb25TdHJhdGVneSA9IHRoaXMuX292ZXJsYXlcbiAgICAgICAgICAucG9zaXRpb24oKVxuICAgICAgICAgIC5nbG9iYWwoKVxuICAgICAgICAgIC5ib3R0b20ob2Zmc2V0KVxuICAgICAgICAgIC5sZWZ0KGAke25vdGlmaWNhdGlvbkNvbmZpZy5vZmZzZXR9cHhgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdib3R0b20tcmlnaHQnOlxuICAgICAgICBwb3NpdGlvblN0cmF0ZWd5ID0gdGhpcy5fb3ZlcmxheVxuICAgICAgICAgIC5wb3NpdGlvbigpXG4gICAgICAgICAgLmdsb2JhbCgpXG4gICAgICAgICAgLmJvdHRvbShvZmZzZXQpXG4gICAgICAgICAgLnJpZ2h0KGAke25vdGlmaWNhdGlvbkNvbmZpZy5vZmZzZXR9cHhgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdib3R0b20tY2VudGVyJzpcbiAgICAgICAgcG9zaXRpb25TdHJhdGVneSA9IHRoaXMuX292ZXJsYXkucG9zaXRpb24oKS5nbG9iYWwoKS5ib3R0b20ob2Zmc2V0KS5jZW50ZXJIb3Jpem9udGFsbHkoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0b3AtY2VudGVyJzpcbiAgICAgICAgcG9zaXRpb25TdHJhdGVneSA9IHRoaXMuX292ZXJsYXkucG9zaXRpb24oKS5nbG9iYWwoKS50b3Aob2Zmc2V0KS5jZW50ZXJIb3Jpem9udGFsbHkoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBwb3NpdGlvblN0cmF0ZWd5ID0gdGhpcy5fb3ZlcmxheVxuICAgICAgICAgIC5wb3NpdGlvbigpXG4gICAgICAgICAgLmdsb2JhbCgpXG4gICAgICAgICAgLnRvcChvZmZzZXQpXG4gICAgICAgICAgLnJpZ2h0KGAke25vdGlmaWNhdGlvbkNvbmZpZy5vZmZzZXR9cHhgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBvc2l0aW9uU3RyYXRlZ3k7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVDb250YWluZXIoXG4gICAgb3ZlcmxheVJlZjogT3ZlcmxheVJlZixcbiAgICBjb25maWc6IE1kYk5vdGlmaWNhdGlvbkNvbmZpZ1xuICApOiBNZGJOb3RpZmljYXRpb25Db250YWluZXJDb21wb25lbnQge1xuICAgIGNvbnN0IHBvcnRhbCA9IG5ldyBDb21wb25lbnRQb3J0YWwoXG4gICAgICBNZGJOb3RpZmljYXRpb25Db250YWluZXJDb21wb25lbnQsXG4gICAgICBudWxsLFxuICAgICAgdGhpcy5faW5qZWN0b3IsXG4gICAgICB0aGlzLl9jZnJcbiAgICApO1xuICAgIGNvbnN0IGNvbnRhaW5lclJlZiA9IG92ZXJsYXlSZWYuYXR0YWNoKHBvcnRhbCk7XG4gICAgY29udGFpbmVyUmVmLmluc3RhbmNlLl9jb25maWcgPSBjb25maWc7XG4gICAgcmV0dXJuIGNvbnRhaW5lclJlZi5pbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUNvbnRlbnQ8VD4oXG4gICAgY29tcG9uZW50T3JUZW1wbGF0ZTogQ29tcG9uZW50VHlwZTxUPiB8IFRlbXBsYXRlUmVmPFQ+LFxuICAgIGNvbnRhaW5lcjogTWRiTm90aWZpY2F0aW9uQ29udGFpbmVyQ29tcG9uZW50LFxuICAgIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYsXG4gICAgY29uZmlnOiBNZGJOb3RpZmljYXRpb25Db25maWdcbiAgKTogTWRiTm90aWZpY2F0aW9uUmVmPFQ+IHtcbiAgICBjb25zdCBub3RpZmljYXRpb25SZWYgPSBuZXcgTWRiTm90aWZpY2F0aW9uUmVmKG92ZXJsYXlSZWYsIHRoaXMsIGNvbnRhaW5lcik7XG5cbiAgICBpZiAoY29tcG9uZW50T3JUZW1wbGF0ZSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKSB7XG4gICAgICBjb250YWluZXIuYXR0YWNoVGVtcGxhdGVQb3J0YWwoXG4gICAgICAgIG5ldyBUZW1wbGF0ZVBvcnRhbDxUPihjb21wb25lbnRPclRlbXBsYXRlLCBudWxsLCB7XG4gICAgICAgICAgJGltcGxpY2l0OiBjb25maWcuZGF0YSxcbiAgICAgICAgICBub3RpZmljYXRpb25SZWYsXG4gICAgICAgIH0gYXMgYW55KVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaW5qZWN0b3IgPSB0aGlzLl9jcmVhdGVJbmplY3RvcjxUPihjb25maWcsIG5vdGlmaWNhdGlvblJlZiwgY29udGFpbmVyKTtcbiAgICAgIGNvbnN0IGNvbnRlbnRSZWYgPSBjb250YWluZXIuYXR0YWNoQ29tcG9uZW50UG9ydGFsPFQ+KFxuICAgICAgICBuZXcgQ29tcG9uZW50UG9ydGFsKGNvbXBvbmVudE9yVGVtcGxhdGUsIGNvbmZpZy52aWV3Q29udGFpbmVyUmVmLCBpbmplY3RvcilcbiAgICAgICk7XG5cbiAgICAgIGlmIChjb25maWcuZGF0YSkge1xuICAgICAgICBPYmplY3QuYXNzaWduKGNvbnRlbnRSZWYuaW5zdGFuY2UsIHsgLi4uY29uZmlnLmRhdGEgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vdGlmaWNhdGlvblJlZjtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUluamVjdG9yPFQ+KFxuICAgIGNvbmZpZzogTWRiTm90aWZpY2F0aW9uQ29uZmlnLFxuICAgIG5vdGlmaWNhdGlvblJlZjogTWRiTm90aWZpY2F0aW9uUmVmPFQ+LFxuICAgIGNvbnRhaW5lcjogTWRiTm90aWZpY2F0aW9uQ29udGFpbmVyQ29tcG9uZW50XG4gICk6IEluamVjdG9yIHtcbiAgICBjb25zdCB1c2VySW5qZWN0b3IgPSBjb25maWcgJiYgY29uZmlnLnZpZXdDb250YWluZXJSZWYgJiYgY29uZmlnLnZpZXdDb250YWluZXJSZWYuaW5qZWN0b3I7XG4gICAgY29uc3QgcHJvdmlkZXJzOiBTdGF0aWNQcm92aWRlcltdID0gW1xuICAgICAgeyBwcm92aWRlOiBNZGJOb3RpZmljYXRpb25Db250YWluZXJDb21wb25lbnQsIHVzZVZhbHVlOiBjb250YWluZXIgfSxcbiAgICAgIHsgcHJvdmlkZTogTWRiTm90aWZpY2F0aW9uUmVmLCB1c2VWYWx1ZTogbm90aWZpY2F0aW9uUmVmIH0sXG4gICAgXTtcblxuICAgIHJldHVybiBJbmplY3Rvci5jcmVhdGUoeyBwYXJlbnQ6IHVzZXJJbmplY3RvciB8fCB0aGlzLl9pbmplY3RvciwgcHJvdmlkZXJzIH0pO1xuICB9XG59XG4iXX0=