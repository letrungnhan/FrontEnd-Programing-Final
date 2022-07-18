import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';
import { MdbTimepickerToggleComponent } from './timepicker-toggle.component';
import { MdbTimepickerDirective } from './timepicker.directive';
import { MdbTimepickerComponent } from './timepicker.component';
import { MdbTimepickerContentComponent } from './timepicker.content';
import * as i0 from "@angular/core";
export class MdbTimepickerModule {
}
MdbTimepickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTimepickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbTimepickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTimepickerModule, bootstrap: [MdbTimepickerContentComponent], declarations: [MdbTimepickerComponent,
        MdbTimepickerToggleComponent,
        MdbTimepickerDirective,
        MdbTimepickerContentComponent], imports: [CommonModule, OverlayModule, A11yModule], exports: [MdbTimepickerComponent, MdbTimepickerToggleComponent, MdbTimepickerDirective] });
MdbTimepickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTimepickerModule, imports: [[CommonModule, OverlayModule, A11yModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTimepickerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, OverlayModule, A11yModule],
                    declarations: [
                        MdbTimepickerComponent,
                        MdbTimepickerToggleComponent,
                        MdbTimepickerDirective,
                        MdbTimepickerContentComponent,
                    ],
                    exports: [MdbTimepickerComponent, MdbTimepickerToggleComponent, MdbTimepickerDirective],
                    bootstrap: [MdbTimepickerContentComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvdGltZXBpY2tlci90aW1lcGlja2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzdFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHNCQUFzQixDQUFDOztBQWFyRSxNQUFNLE9BQU8sbUJBQW1COztnSEFBbkIsbUJBQW1CO2lIQUFuQixtQkFBbUIsY0FGbEIsNkJBQTZCLGtCQU52QyxzQkFBc0I7UUFDdEIsNEJBQTRCO1FBQzVCLHNCQUFzQjtRQUN0Qiw2QkFBNkIsYUFMckIsWUFBWSxFQUFFLGFBQWEsRUFBRSxVQUFVLGFBT3ZDLHNCQUFzQixFQUFFLDRCQUE0QixFQUFFLHNCQUFzQjtpSEFHM0UsbUJBQW1CLFlBVnJCLENBQUMsWUFBWSxFQUFFLGFBQWEsRUFBRSxVQUFVLENBQUM7MkZBVXZDLG1CQUFtQjtrQkFYL0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQztvQkFDbEQsWUFBWSxFQUFFO3dCQUNaLHNCQUFzQjt3QkFDdEIsNEJBQTRCO3dCQUM1QixzQkFBc0I7d0JBQ3RCLDZCQUE2QjtxQkFDOUI7b0JBQ0QsT0FBTyxFQUFFLENBQUMsc0JBQXNCLEVBQUUsNEJBQTRCLEVBQUUsc0JBQXNCLENBQUM7b0JBQ3ZGLFNBQVMsRUFBRSxDQUFDLDZCQUE2QixDQUFDO2lCQUMzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEExMXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBNZGJUaW1lcGlja2VyVG9nZ2xlQ29tcG9uZW50IH0gZnJvbSAnLi90aW1lcGlja2VyLXRvZ2dsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWRiVGltZXBpY2tlckRpcmVjdGl2ZSB9IGZyb20gJy4vdGltZXBpY2tlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWRiVGltZXBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vdGltZXBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWRiVGltZXBpY2tlckNvbnRlbnRDb21wb25lbnQgfSBmcm9tICcuL3RpbWVwaWNrZXIuY29udGVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE92ZXJsYXlNb2R1bGUsIEExMXlNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBNZGJUaW1lcGlja2VyQ29tcG9uZW50LFxuICAgIE1kYlRpbWVwaWNrZXJUb2dnbGVDb21wb25lbnQsXG4gICAgTWRiVGltZXBpY2tlckRpcmVjdGl2ZSxcbiAgICBNZGJUaW1lcGlja2VyQ29udGVudENvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW01kYlRpbWVwaWNrZXJDb21wb25lbnQsIE1kYlRpbWVwaWNrZXJUb2dnbGVDb21wb25lbnQsIE1kYlRpbWVwaWNrZXJEaXJlY3RpdmVdLFxuICBib290c3RyYXA6IFtNZGJUaW1lcGlja2VyQ29udGVudENvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE1kYlRpbWVwaWNrZXJNb2R1bGUge31cbiJdfQ==