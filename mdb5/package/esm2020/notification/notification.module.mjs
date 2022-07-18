import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { MdbNotificationContainerComponent } from './notification-container.component';
import { MdbNotificationService } from './notification.service';
import * as i0 from "@angular/core";
export class MdbNotificationModule {
}
MdbNotificationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbNotificationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbNotificationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbNotificationModule, declarations: [MdbNotificationContainerComponent], imports: [OverlayModule, PortalModule], exports: [MdbNotificationContainerComponent] });
MdbNotificationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbNotificationModule, providers: [MdbNotificationService], imports: [[OverlayModule, PortalModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbNotificationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [OverlayModule, PortalModule],
                    exports: [MdbNotificationContainerComponent],
                    declarations: [MdbNotificationContainerComponent],
                    providers: [MdbNotificationService],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDdkYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7O0FBUWhFLE1BQU0sT0FBTyxxQkFBcUI7O2tIQUFyQixxQkFBcUI7bUhBQXJCLHFCQUFxQixpQkFIakIsaUNBQWlDLGFBRnRDLGFBQWEsRUFBRSxZQUFZLGFBQzNCLGlDQUFpQzttSEFJaEMscUJBQXFCLGFBRnJCLENBQUMsc0JBQXNCLENBQUMsWUFIMUIsQ0FBQyxhQUFhLEVBQUUsWUFBWSxDQUFDOzJGQUszQixxQkFBcUI7a0JBTmpDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsYUFBYSxFQUFFLFlBQVksQ0FBQztvQkFDdEMsT0FBTyxFQUFFLENBQUMsaUNBQWlDLENBQUM7b0JBQzVDLFlBQVksRUFBRSxDQUFDLGlDQUFpQyxDQUFDO29CQUNqRCxTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztpQkFDcEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgUG9ydGFsTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWRiTm90aWZpY2F0aW9uQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9ub3RpZmljYXRpb24tY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZGJOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9ub3RpZmljYXRpb24uc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtPdmVybGF5TW9kdWxlLCBQb3J0YWxNb2R1bGVdLFxuICBleHBvcnRzOiBbTWRiTm90aWZpY2F0aW9uQ29udGFpbmVyQ29tcG9uZW50XSxcbiAgZGVjbGFyYXRpb25zOiBbTWRiTm90aWZpY2F0aW9uQ29udGFpbmVyQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbTWRiTm90aWZpY2F0aW9uU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIE1kYk5vdGlmaWNhdGlvbk1vZHVsZSB7fVxuIl19