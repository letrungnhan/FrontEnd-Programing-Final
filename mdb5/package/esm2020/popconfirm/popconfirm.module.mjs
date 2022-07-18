import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { MdbPopconfirmContainerComponent } from './popconfirm-container.component';
import { MdbPopconfirmService } from './popconfirm.service';
import * as i0 from "@angular/core";
export class MdbPopconfirmModule {
}
MdbPopconfirmModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbPopconfirmModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbPopconfirmModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbPopconfirmModule, declarations: [MdbPopconfirmContainerComponent], imports: [OverlayModule, PortalModule], exports: [MdbPopconfirmContainerComponent] });
MdbPopconfirmModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbPopconfirmModule, providers: [MdbPopconfirmService], imports: [[OverlayModule, PortalModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbPopconfirmModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [OverlayModule, PortalModule],
                    exports: [MdbPopconfirmContainerComponent],
                    declarations: [MdbPopconfirmContainerComponent],
                    providers: [MdbPopconfirmService],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wY29uZmlybS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvcG9wY29uZmlybS9wb3Bjb25maXJtLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDbkYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7O0FBUTVELE1BQU0sT0FBTyxtQkFBbUI7O2dIQUFuQixtQkFBbUI7aUhBQW5CLG1CQUFtQixpQkFIZiwrQkFBK0IsYUFGcEMsYUFBYSxFQUFFLFlBQVksYUFDM0IsK0JBQStCO2lIQUk5QixtQkFBbUIsYUFGbkIsQ0FBQyxvQkFBb0IsQ0FBQyxZQUh4QixDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUM7MkZBSzNCLG1CQUFtQjtrQkFOL0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxhQUFhLEVBQUUsWUFBWSxDQUFDO29CQUN0QyxPQUFPLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztvQkFDMUMsWUFBWSxFQUFFLENBQUMsK0JBQStCLENBQUM7b0JBQy9DLFNBQVMsRUFBRSxDQUFDLG9CQUFvQixDQUFDO2lCQUNsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBQb3J0YWxNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZGJQb3Bjb25maXJtQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9wb3Bjb25maXJtLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWRiUG9wY29uZmlybVNlcnZpY2UgfSBmcm9tICcuL3BvcGNvbmZpcm0uc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtPdmVybGF5TW9kdWxlLCBQb3J0YWxNb2R1bGVdLFxuICBleHBvcnRzOiBbTWRiUG9wY29uZmlybUNvbnRhaW5lckNvbXBvbmVudF0sXG4gIGRlY2xhcmF0aW9uczogW01kYlBvcGNvbmZpcm1Db250YWluZXJDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtNZGJQb3Bjb25maXJtU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIE1kYlBvcGNvbmZpcm1Nb2R1bGUge31cbiJdfQ==