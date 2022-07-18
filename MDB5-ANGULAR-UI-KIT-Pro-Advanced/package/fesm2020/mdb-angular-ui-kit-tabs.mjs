import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i2 from '@angular/cdk/portal';
import { TemplatePortal, CdkPortalOutlet, PortalModule } from '@angular/cdk/portal';
import * as i0 from '@angular/core';
import { InjectionToken, Directive, TemplateRef, Component, ContentChild, ViewChild, Input, Inject, EventEmitter, ContentChildren, HostBinding, Output, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i1 from '@angular/common';
import { DOCUMENT, CommonModule } from '@angular/common';

const MDB_TAB_CONTENT = new InjectionToken('MdbTabContentDirective');
class MdbTabContentDirective {
    constructor(template) {
        this.template = template;
    }
}
MdbTabContentDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTabContentDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
MdbTabContentDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.7", type: MdbTabContentDirective, selector: "[mdbTabContent]", providers: [{ provide: MDB_TAB_CONTENT, useExisting: MdbTabContentDirective }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTabContentDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: '[mdbTabContent]',
                    providers: [{ provide: MDB_TAB_CONTENT, useExisting: MdbTabContentDirective }],
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });

const MDB_TAB_TITLE = new InjectionToken('MdbTabTitleDirective');
class MdbTabTitleDirective {
    constructor(template) {
        this.template = template;
    }
}
MdbTabTitleDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTabTitleDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
MdbTabTitleDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.7", type: MdbTabTitleDirective, selector: "[mdbTabTitle]", providers: [{ provide: MDB_TAB_TITLE, useExisting: MdbTabTitleDirective }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTabTitleDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: '[mdbTabTitle]',
                    providers: [{ provide: MDB_TAB_TITLE, useExisting: MdbTabTitleDirective }],
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });

class MdbTabComponent {
    constructor(_elementRef, _renderer, _vcr) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._vcr = _vcr;
        this.activeStateChange$ = new Subject();
        this._disabled = false;
        this._contentPortal = null;
        this._titlePortal = null;
        this._active = false;
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    get active() {
        return this._active;
    }
    get content() {
        return this._contentPortal;
    }
    get titleContent() {
        return this._titlePortal;
    }
    get shouldAttach() {
        return this._lazyContent === undefined;
    }
    // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
    set active(value) {
        if (value) {
            this._renderer.addClass(this._elementRef.nativeElement, 'show');
            this._renderer.addClass(this._elementRef.nativeElement, 'active');
        }
        else {
            this._renderer.removeClass(this._elementRef.nativeElement, 'show');
            this._renderer.removeClass(this._elementRef.nativeElement, 'active');
        }
        this._active = value;
        this.activeStateChange$.next(value);
    }
    ngOnInit() {
        this._createContentPortal();
        if (this._titleContent) {
            this._createTitlePortal();
        }
    }
    _createContentPortal() {
        const content = this._lazyContent || this._content;
        this._contentPortal = new TemplatePortal(content, this._vcr);
    }
    _createTitlePortal() {
        this._titlePortal = new TemplatePortal(this._titleContent, this._vcr);
    }
}
MdbTabComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTabComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component });
MdbTabComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbTabComponent, selector: "mdb-tab", inputs: { disabled: "disabled", title: "title" }, queries: [{ propertyName: "_lazyContent", first: true, predicate: MDB_TAB_CONTENT, descendants: true, read: TemplateRef, static: true }, { propertyName: "_titleContent", first: true, predicate: MDB_TAB_TITLE, descendants: true, read: TemplateRef, static: true }], viewQueries: [{ propertyName: "_content", first: true, predicate: TemplateRef, descendants: true, static: true }], ngImport: i0, template: "<ng-template><ng-content></ng-content></ng-template>\n" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTabComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-tab', template: "<ng-template><ng-content></ng-content></ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }]; }, propDecorators: { _lazyContent: [{
                type: ContentChild,
                args: [MDB_TAB_CONTENT, { read: TemplateRef, static: true }]
            }], _titleContent: [{
                type: ContentChild,
                args: [MDB_TAB_TITLE, { read: TemplateRef, static: true }]
            }], _content: [{
                type: ViewChild,
                args: [TemplateRef, { static: true }]
            }], disabled: [{
                type: Input
            }], title: [{
                type: Input
            }] } });

// eslint-disable-next-line @angular-eslint/directive-class-suffix
class MdbTabPortalOutlet extends CdkPortalOutlet {
    constructor(_cfr, _vcr, _document) {
        super(_cfr, _vcr, _document);
        this._destroy$ = new Subject();
    }
    ngOnInit() {
        super.ngOnInit();
        if ((this.tab.shouldAttach || this.tab.active) && !this.hasAttached()) {
            this.attach(this.tab.content);
        }
        else {
            this.tab.activeStateChange$.pipe(takeUntil(this._destroy$)).subscribe((isActive) => {
                if (isActive && !this.hasAttached()) {
                    this.attach(this.tab.content);
                }
            });
        }
    }
    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
        super.ngOnDestroy();
    }
}
MdbTabPortalOutlet.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTabPortalOutlet, deps: [{ token: i0.ComponentFactoryResolver }, { token: i0.ViewContainerRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
MdbTabPortalOutlet.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.7", type: MdbTabPortalOutlet, selector: "[mdbTabPortalOutlet]", inputs: { tab: "tab" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTabPortalOutlet, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: '[mdbTabPortalOutlet]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.ViewContainerRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { tab: [{
                type: Input
            }] } });

class MdbTabChange {
}
class MdbTabsComponent {
    constructor() {
        this._destroy$ = new Subject();
        this._fill = false;
        this._justified = false;
        this._pills = false;
        this._vertical = false;
        this.navColumnClass = 'col-3';
        this.contentColumnClass = 'col-9';
        this.activeTabChange = new EventEmitter();
    }
    get fill() {
        return this._fill;
    }
    set fill(value) {
        this._fill = coerceBooleanProperty(value);
    }
    get justified() {
        return this._justified;
    }
    set justified(value) {
        this._justified = coerceBooleanProperty(value);
    }
    get pills() {
        return this._pills;
    }
    set pills(value) {
        this._pills = coerceBooleanProperty(value);
    }
    get vertical() {
        return this._vertical;
    }
    set vertical(value) {
        this._vertical = coerceBooleanProperty(value);
    }
    get navColClass() {
        return this.vertical ? this.navColumnClass : '';
    }
    get contentColClass() {
        return this.vertical ? this.contentColumnClass : '';
    }
    ngAfterContentInit() {
        const firstActiveTabIndex = this.tabs.toArray().findIndex((tab) => !tab.disabled);
        this.setActiveTab(firstActiveTabIndex);
        this.tabs.changes.pipe(takeUntil(this._destroy$)).subscribe(() => {
            const hasActiveTab = this.tabs.find((tab) => tab.active);
            if (!hasActiveTab) {
                const closestTabIndex = this._getClosestTabIndex(this._selectedIndex);
                if (closestTabIndex !== -1) {
                    this.setActiveTab(closestTabIndex);
                }
            }
        });
    }
    setActiveTab(index) {
        const activeTab = this.tabs.toArray()[index];
        if (!activeTab || (activeTab && activeTab.disabled)) {
            return;
        }
        this.tabs.forEach((tab) => (tab.active = tab === activeTab));
        this._selectedIndex = index;
        const tabChangeEvent = this._getTabChangeEvent(index, activeTab);
        this.activeTabChange.emit(tabChangeEvent);
    }
    _getTabChangeEvent(index, tab) {
        const event = new MdbTabChange();
        event.index = index;
        event.tab = tab;
        return event;
    }
    _getClosestTabIndex(index) {
        const tabs = this.tabs.toArray();
        const tabsLength = tabs.length;
        if (!tabsLength) {
            return -1;
        }
        for (let i = 1; i <= tabsLength; i += 1) {
            const prevIndex = index - i;
            const nextIndex = index + i;
            if (tabs[prevIndex] && !tabs[prevIndex].disabled) {
                return prevIndex;
            }
            if (tabs[nextIndex] && !tabs[nextIndex].disabled) {
                return nextIndex;
            }
        }
        return -1;
    }
    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }
}
MdbTabsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTabsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MdbTabsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.7", type: MdbTabsComponent, selector: "mdb-tabs", inputs: { fill: "fill", justified: "justified", pills: "pills", vertical: "vertical", navColumnClass: "navColumnClass", contentColumnClass: "contentColumnClass" }, outputs: { activeTabChange: "activeTabChange" }, host: { properties: { "class.row": "this.vertical" } }, queries: [{ propertyName: "tabs", predicate: MdbTabComponent }], ngImport: i0, template: "<ul\n  class=\"nav mb-3 flex-column {{ navColClass }}\"\n  [ngClass]=\"{\n    'nav-pills': pills,\n    'nav-tabs': !pills,\n    'nav-fill': fill,\n    'nav-justified': justified,\n    'flex-column': vertical,\n    'text-center': vertical\n  }\"\n  role=\"tablist\"\n>\n  <li\n    *ngFor=\"let tab of tabs; let i = index\"\n    (click)=\"setActiveTab(i)\"\n    class=\"nav-item\"\n    role=\"presentation\"\n  >\n    <a\n      href=\"javascript:void(0)\"\n      class=\"nav-link\"\n      [class.active]=\"tab.active\"\n      [class.disabled]=\"tab.disabled\"\n      role=\"tab\"\n    >\n      <ng-template [ngIf]=\"tab.titleContent\">\n        <ng-template [cdkPortalOutlet]=\"tab.titleContent\"></ng-template>\n      </ng-template>\n\n      <ng-template [ngIf]=\"!tab.titleContent\">{{ tab.title }}</ng-template>\n    </a>\n  </li>\n</ul>\n\n<div\n  class=\"tab-content {{ contentColClass }}\"\n>\n  <!-- <ng-content select=\"mdb-tab\"></ng-content> -->\n  <ng-container *ngFor=\"let tab of tabs\">\n    <div\n      class=\"tab-pane fade\"\n      [ngClass]=\"{\n        show: tab.active,\n        active: tab.active\n      }\"\n    >\n      <ng-template mdbTabPortalOutlet [tab]=\"tab\"></ng-template>\n    </div>\n  </ng-container>\n</div>\n", directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }, { type: MdbTabPortalOutlet, selector: "[mdbTabPortalOutlet]", inputs: ["tab"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTabsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-tabs', template: "<ul\n  class=\"nav mb-3 flex-column {{ navColClass }}\"\n  [ngClass]=\"{\n    'nav-pills': pills,\n    'nav-tabs': !pills,\n    'nav-fill': fill,\n    'nav-justified': justified,\n    'flex-column': vertical,\n    'text-center': vertical\n  }\"\n  role=\"tablist\"\n>\n  <li\n    *ngFor=\"let tab of tabs; let i = index\"\n    (click)=\"setActiveTab(i)\"\n    class=\"nav-item\"\n    role=\"presentation\"\n  >\n    <a\n      href=\"javascript:void(0)\"\n      class=\"nav-link\"\n      [class.active]=\"tab.active\"\n      [class.disabled]=\"tab.disabled\"\n      role=\"tab\"\n    >\n      <ng-template [ngIf]=\"tab.titleContent\">\n        <ng-template [cdkPortalOutlet]=\"tab.titleContent\"></ng-template>\n      </ng-template>\n\n      <ng-template [ngIf]=\"!tab.titleContent\">{{ tab.title }}</ng-template>\n    </a>\n  </li>\n</ul>\n\n<div\n  class=\"tab-content {{ contentColClass }}\"\n>\n  <!-- <ng-content select=\"mdb-tab\"></ng-content> -->\n  <ng-container *ngFor=\"let tab of tabs\">\n    <div\n      class=\"tab-pane fade\"\n      [ngClass]=\"{\n        show: tab.active,\n        active: tab.active\n      }\"\n    >\n      <ng-template mdbTabPortalOutlet [tab]=\"tab\"></ng-template>\n    </div>\n  </ng-container>\n</div>\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { tabs: [{
                type: ContentChildren,
                args: [MdbTabComponent]
            }], fill: [{
                type: Input
            }], justified: [{
                type: Input
            }], pills: [{
                type: Input
            }], vertical: [{
                type: HostBinding,
                args: ['class.row']
            }, {
                type: Input
            }], navColumnClass: [{
                type: Input
            }], contentColumnClass: [{
                type: Input
            }], activeTabChange: [{
                type: Output
            }] } });

class MdbTabsModule {
}
MdbTabsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTabsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbTabsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTabsModule, declarations: [MdbTabComponent,
        MdbTabContentDirective,
        MdbTabTitleDirective,
        MdbTabPortalOutlet,
        MdbTabsComponent], imports: [CommonModule, PortalModule], exports: [MdbTabComponent,
        MdbTabContentDirective,
        MdbTabTitleDirective,
        MdbTabPortalOutlet,
        MdbTabsComponent] });
MdbTabsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTabsModule, imports: [[CommonModule, PortalModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTabsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        MdbTabComponent,
                        MdbTabContentDirective,
                        MdbTabTitleDirective,
                        MdbTabPortalOutlet,
                        MdbTabsComponent,
                    ],
                    imports: [CommonModule, PortalModule],
                    exports: [
                        MdbTabComponent,
                        MdbTabContentDirective,
                        MdbTabTitleDirective,
                        MdbTabPortalOutlet,
                        MdbTabsComponent,
                    ],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MdbTabComponent, MdbTabContentDirective, MdbTabPortalOutlet, MdbTabTitleDirective, MdbTabsComponent, MdbTabsModule };
//# sourceMappingURL=mdb-angular-ui-kit-tabs.mjs.map
