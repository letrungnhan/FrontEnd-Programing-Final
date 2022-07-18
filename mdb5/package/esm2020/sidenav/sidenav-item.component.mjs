import { ChangeDetectionStrategy, Component, ContentChild, forwardRef, Inject, Optional, ViewChild, } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MdbCollapseDirective } from 'mdb-angular-ui-kit/collapse';
import { MdbSidenavComponent } from './sidenav.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "./sidenav.component";
export class MdbSidenavItemComponent {
    constructor(_renderer, _elRef, _router, _route, _cdRef, _sidenav) {
        this._renderer = _renderer;
        this._elRef = _elRef;
        this._router = _router;
        this._route = _route;
        this._cdRef = _cdRef;
        this._sidenav = _sidenav;
        this._tempSlim = false;
        this._isSlimTransitioning = false;
        this._destroy$ = new Subject();
    }
    ngAfterContentInit() {
        if (this.collapse) {
            this.collapse.collapseShow.pipe(takeUntil(this._destroy$)).subscribe(() => {
                this._toggleArrowIcon('up');
            });
            this.collapse.collapseHide.pipe(takeUntil(this._destroy$)).subscribe(() => {
                this._toggleArrowIcon('down');
            });
        }
    }
    ngAfterViewInit() {
        if (!this.collapse) {
            return;
        }
        const links = this._elRef.nativeElement.querySelectorAll('.sidenav-link');
        links[0].innerHTML += '<i class="fas fa-angle-down rotate-icon"></i>';
        if (!this.collapse.collapsed) {
            this._toggleArrowIcon('up');
        }
        this._sidenav.sidenavCollapsed.pipe(takeUntil(this._destroy$)).subscribe(() => {
            this._isSlimTransitioning = false;
        });
        this._sidenav.sidenavCollapse.pipe(takeUntil(this._destroy$)).subscribe(() => {
            this._isSlimTransitioning = true;
        });
        this._sidenav.sidenavExpand.pipe(takeUntil(this._destroy$)).subscribe(() => {
            this._isSlimTransitioning = true;
        });
        this._sidenav.sidenavExpanded.pipe(takeUntil(this._destroy$)).subscribe(() => {
            this._isSlimTransitioning = false;
        });
        this.collapse.collapseHide.pipe(takeUntil(this._destroy$)).subscribe(() => {
            if (!this._sidenav.slim) {
                return;
            }
            if (this._sidenav.isTheLastItemToBeCollapsed() &&
                !this._sidenav.slimCollapsed &&
                !this._isSlimTransitioning) {
                this._tempSlim = false;
                this._sidenav.setSlim(true);
            }
        });
        this.collapse.host.childNodes.forEach((child) => {
            fromEvent(child, 'click')
                .pipe(takeUntil(this._destroy$))
                .subscribe(() => this.setActiveElement(child));
        });
        fromEvent(this._sidenavLink.nativeElement, 'click')
            .pipe(takeUntil(this._destroy$))
            .subscribe(() => {
            if (this._sidenav.accordion) {
                this._sidenav.closeOtherCollapseItems(this.collapse);
            }
            this.collapse.toggle();
            if (this._sidenav.slimCollapsed && !this._isSlimTransitioning) {
                this._tempSlim = true;
                this._sidenav.setSlim(false);
            }
        });
    }
    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }
    markForCheck() {
        this._cdRef.markForCheck();
    }
    setActiveElement(el) {
        this.markForCheck();
        this.collapse.host.childNodes.forEach((child) => {
            if (child instanceof HTMLElement) {
                if (el === child) {
                    this._renderer.addClass(child.querySelector('.sidenav-link'), 'active');
                }
                else {
                    this._renderer.removeClass(child.querySelector('.sidenav-link'), 'active');
                }
            }
        });
    }
    setActiveCategory() {
        this.markForCheck();
        this._renderer.addClass(this._sidenavLink.nativeElement.querySelector('.sidenav-link'), 'active');
    }
    unsetActiveCategory() {
        this.markForCheck();
        this._renderer.removeClass(this._sidenavLink.nativeElement.querySelector('.sidenav-link'), 'active');
    }
    _toggleArrowIcon(direction) {
        const arrowIcon = this._sidenavLink.nativeElement.querySelector('.fa-angle-down');
        if (direction === 'down') {
            this._renderer.setStyle(arrowIcon, 'transform', 'rotate(0deg)');
        }
        else {
            this._renderer.setStyle(arrowIcon, 'transform', 'rotate(180deg)');
        }
    }
}
MdbSidenavItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbSidenavItemComponent, deps: [{ token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i1.Router, optional: true }, { token: i1.ActivatedRoute, optional: true }, { token: i0.ChangeDetectorRef }, { token: forwardRef(() => MdbSidenavComponent) }], target: i0.ɵɵFactoryTarget.Component });
MdbSidenavItemComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbSidenavItemComponent, selector: "mdb-sidenav-item", queries: [{ propertyName: "collapse", first: true, predicate: MdbCollapseDirective, descendants: true }], viewQueries: [{ propertyName: "_sidenavLink", first: true, predicate: ["linkWrapper"], descendants: true }], ngImport: i0, template: "<li class=\"sidenav-item\">\n  <div #linkWrapper>\n    <ng-content select=\".sidenav-link\"></ng-content>\n  </div>\n  <ng-content select=\".sidenav-collapse\"></ng-content>\n</li>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbSidenavItemComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-sidenav-item', changeDetection: ChangeDetectionStrategy.OnPush, template: "<li class=\"sidenav-item\">\n  <div #linkWrapper>\n    <ng-content select=\".sidenav-link\"></ng-content>\n  </div>\n  <ng-content select=\".sidenav-collapse\"></ng-content>\n</li>\n" }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i1.Router, decorators: [{
                    type: Optional
                }] }, { type: i1.ActivatedRoute, decorators: [{
                    type: Optional
                }] }, { type: i0.ChangeDetectorRef }, { type: i2.MdbSidenavComponent, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => MdbSidenavComponent)]
                }] }]; }, propDecorators: { _sidenavLink: [{
                type: ViewChild,
                args: ['linkWrapper']
            }], collapse: [{
                type: ContentChild,
                args: [MdbCollapseDirective]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZW5hdi1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9zaWRlbmF2L3NpZGVuYXYtaXRlbS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvc2lkZW5hdi9zaWRlbmF2LWl0ZW0uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUdMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsWUFBWSxFQUVaLFVBQVUsRUFDVixNQUFNLEVBRU4sUUFBUSxFQUVSLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMxQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFbkUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7QUFPMUQsTUFBTSxPQUFPLHVCQUF1QjtJQVdsQyxZQUNVLFNBQW9CLEVBQ3BCLE1BQWtCLEVBQ04sT0FBZSxFQUNmLE1BQXNCLEVBQ2xDLE1BQXlCLEVBQ3NCLFFBQTZCO1FBTDVFLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQUNOLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDZixXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUNsQyxXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUNzQixhQUFRLEdBQVIsUUFBUSxDQUFxQjtRQWI5RSxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLHlCQUFvQixHQUFHLEtBQUssQ0FBQztRQUk1QixjQUFTLEdBQWtCLElBQUksT0FBTyxFQUFRLENBQUM7SUFTckQsQ0FBQztJ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LENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixDQUFDLENBQUM7U0FDbkU7SUFDSCxDQUFDOztvSEEzSVUsdUJBQXVCLDBMQWlCeEIsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLG1CQUFtQixDQUFDO3dHQWpCcEMsdUJBQXVCLDhGQUVwQixvQkFBb0IsNkpDN0JwQyx3TEFNQTsyRkRxQmEsdUJBQXVCO2tCQUxuQyxTQUFTOytCQUNFLGtCQUFrQixtQkFFWCx1QkFBdUIsQ0FBQyxNQUFNOzswQkFnQjVDLFFBQVE7OzBCQUNSLFFBQVE7OzBCQUVSLE1BQU07MkJBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLG1CQUFtQixDQUFDOzRDQWhCckIsWUFBWTtzQkFBckMsU0FBUzt1QkFBQyxhQUFhO2dCQUNZLFFBQVE7c0JBQTNDLFlBQVk7dUJBQUMsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgZm9yd2FyZFJlZixcbiAgSW5qZWN0LFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IGZyb21FdmVudCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTWRiQ29sbGFwc2VEaXJlY3RpdmUgfSBmcm9tICdtZGItYW5ndWxhci11aS1raXQvY29sbGFwc2UnO1xuaW1wb3J0IHsgTWRiU2lkZW5hdkxheW91dENvbXBvbmVudCB9IGZyb20gJy4vc2lkZW5hdi1sb3lhdXQuY29tcG9uZW50JztcbmltcG9ydCB7IE1kYlNpZGVuYXZDb21wb25lbnQgfSBmcm9tICcuL3NpZGVuYXYuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLXNpZGVuYXYtaXRlbScsXG4gIHRlbXBsYXRlVXJsOiAnc2lkZW5hdi1pdGVtLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1kYlNpZGVuYXZJdGVtQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZCgnbGlua1dyYXBwZXInKSBfc2lkZW5hdkxpbms6IEVsZW1lbnRSZWY7XG4gIEBDb250ZW50Q2hpbGQoTWRiQ29sbGFwc2VEaXJlY3RpdmUpIGNvbGxhcHNlOiBNZGJDb2xsYXBzZURpcmVjdGl2ZTtcblxuICBwcml2YXRlIF90ZW1wU2xpbSA9IGZhbHNlO1xuICBwcml2YXRlIF9pc1NsaW1UcmFuc2l0aW9uaW5nID0gZmFsc2U7XG5cbiAgc2lkZW5hdkxheW91dDogTWRiU2lkZW5hdkxheW91dENvbXBvbmVudDtcblxuICByZWFkb25seSBfZGVzdHJveSQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBfZWxSZWY6IEVsZW1lbnRSZWYsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgIHByaXZhdGUgX2NkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTWRiU2lkZW5hdkNvbXBvbmVudCkpIHByaXZhdGUgX3NpZGVuYXY6IE1kYlNpZGVuYXZDb21wb25lbnRcbiAgKSB7fVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jb2xsYXBzZSkge1xuICAgICAgdGhpcy5jb2xsYXBzZS5jb2xsYXBzZVNob3cucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLl90b2dnbGVBcnJvd0ljb24oJ3VwJyk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuY29sbGFwc2UuY29sbGFwc2VIaWRlLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5fdG9nZ2xlQXJyb3dJY29uKCdkb3duJyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNvbGxhcHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbGlua3MgPSB0aGlzLl9lbFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaWRlbmF2LWxpbmsnKTtcbiAgICBsaW5rc1swXS5pbm5lckhUTUwgKz0gJzxpIGNsYXNzPVwiZmFzIGZhLWFuZ2xlLWRvd24gcm90YXRlLWljb25cIj48L2k+JztcblxuICAgIGlmICghdGhpcy5jb2xsYXBzZS5jb2xsYXBzZWQpIHtcbiAgICAgIHRoaXMuX3RvZ2dsZUFycm93SWNvbigndXAnKTtcbiAgICB9XG5cbiAgICB0aGlzLl9zaWRlbmF2LnNpZGVuYXZDb2xsYXBzZWQucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5faXNTbGltVHJhbnNpdGlvbmluZyA9IGZhbHNlO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fc2lkZW5hdi5zaWRlbmF2Q29sbGFwc2UucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5faXNTbGltVHJhbnNpdGlvbmluZyA9IHRydWU7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9zaWRlbmF2LnNpZGVuYXZFeHBhbmQucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5faXNTbGltVHJhbnNpdGlvbmluZyA9IHRydWU7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9zaWRlbmF2LnNpZGVuYXZFeHBhbmRlZC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95JCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLl9pc1NsaW1UcmFuc2l0aW9uaW5nID0gZmFsc2U7XG4gICAgfSk7XG5cbiAgICB0aGlzLmNvbGxhcHNlLmNvbGxhcHNlSGlkZS5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95JCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuX3NpZGVuYXYuc2xpbSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuX3NpZGVuYXYuaXNUaGVMYXN0SXRlbVRvQmVDb2xsYXBzZWQoKSAmJlxuICAgICAgICAhdGhpcy5fc2lkZW5hdi5zbGltQ29sbGFwc2VkICYmXG4gICAgICAgICF0aGlzLl9pc1NsaW1UcmFuc2l0aW9uaW5nXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5fdGVtcFNsaW0gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fc2lkZW5hdi5zZXRTbGltKHRydWUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5jb2xsYXBzZS5ob3N0LmNoaWxkTm9kZXMuZm9yRWFjaCgoY2hpbGQ6IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICBmcm9tRXZlbnQoY2hpbGQsICdjbGljaycpXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95JCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5zZXRBY3RpdmVFbGVtZW50KGNoaWxkKSk7XG4gICAgfSk7XG5cbiAgICBmcm9tRXZlbnQodGhpcy5fc2lkZW5hdkxpbmsubmF0aXZlRWxlbWVudCwgJ2NsaWNrJylcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuX3NpZGVuYXYuYWNjb3JkaW9uKSB7XG4gICAgICAgICAgdGhpcy5fc2lkZW5hdi5jbG9zZU90aGVyQ29sbGFwc2VJdGVtcyh0aGlzLmNvbGxhcHNlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbGxhcHNlLnRvZ2dsZSgpO1xuICAgICAgICBpZiAodGhpcy5fc2lkZW5hdi5zbGltQ29sbGFwc2VkICYmICF0aGlzLl9pc1NsaW1UcmFuc2l0aW9uaW5nKSB7XG4gICAgICAgICAgdGhpcy5fdGVtcFNsaW0gPSB0cnVlO1xuICAgICAgICAgIHRoaXMuX3NpZGVuYXYuc2V0U2xpbShmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuX2Rlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBtYXJrRm9yQ2hlY2soKTogdm9pZCB7XG4gICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0QWN0aXZlRWxlbWVudChlbDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICAgIHRoaXMuY29sbGFwc2UuaG9zdC5jaGlsZE5vZGVzLmZvckVhY2goKGNoaWxkOiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgaWYgKGVsID09PSBjaGlsZCkge1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKGNoaWxkLnF1ZXJ5U2VsZWN0b3IoJy5zaWRlbmF2LWxpbmsnKSwgJ2FjdGl2ZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKGNoaWxkLnF1ZXJ5U2VsZWN0b3IoJy5zaWRlbmF2LWxpbmsnKSwgJ2FjdGl2ZScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc2V0QWN0aXZlQ2F0ZWdvcnkoKTogdm9pZCB7XG4gICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyhcbiAgICAgIHRoaXMuX3NpZGVuYXZMaW5rLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGVuYXYtbGluaycpLFxuICAgICAgJ2FjdGl2ZSdcbiAgICApO1xuICB9XG5cbiAgcHVibGljIHVuc2V0QWN0aXZlQ2F0ZWdvcnkoKTogdm9pZCB7XG4gICAgdGhpcy5tYXJrRm9yQ2hlY2soKTtcbiAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyhcbiAgICAgIHRoaXMuX3NpZGVuYXZMaW5rLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGVuYXYtbGluaycpLFxuICAgICAgJ2FjdGl2ZSdcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfdG9nZ2xlQXJyb3dJY29uKGRpcmVjdGlvbik6IHZvaWQge1xuICAgIGNvbnN0IGFycm93SWNvbiA9IHRoaXMuX3NpZGVuYXZMaW5rLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmZhLWFuZ2xlLWRvd24nKTtcblxuICAgIGlmIChkaXJlY3Rpb24gPT09ICdkb3duJykge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoYXJyb3dJY29uLCAndHJhbnNmb3JtJywgJ3JvdGF0ZSgwZGVnKScpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShhcnJvd0ljb24sICd0cmFuc2Zvcm0nLCAncm90YXRlKDE4MGRlZyknKTtcbiAgICB9XG4gIH1cbn1cbiIsIjxsaSBjbGFzcz1cInNpZGVuYXYtaXRlbVwiPlxuICA8ZGl2ICNsaW5rV3JhcHBlcj5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCIuc2lkZW5hdi1saW5rXCI+PC9uZy1jb250ZW50PlxuICA8L2Rpdj5cbiAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiLnNpZGVuYXYtY29sbGFwc2VcIj48L25nLWNvbnRlbnQ+XG48L2xpPlxuIl19