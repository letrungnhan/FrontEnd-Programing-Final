import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MdbDatepickerComponent } from './datepicker.component';
import { MdbDatepickerContentComponent } from './datepicker-content.component';
import { MdbDatepickerInputDirective } from './datepicker-input.directive';
import { MdbDatepickerDayViewComponent } from './datepicker-day-view.component';
import { MdbDatepickerMonthViewComponent } from './datepicker-month-view.component';
import { MdbDatepickerYearViewComponent } from './datepicker-year-view.component';
import { MdbDatepickerToggleComponent } from './datepicker-toggle.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import * as i0 from "@angular/core";
export class MdbDatepickerModule {
}
MdbDatepickerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbDatepickerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbDatepickerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbDatepickerModule, declarations: [MdbDatepickerComponent,
        MdbDatepickerContentComponent,
        MdbDatepickerInputDirective,
        MdbDatepickerToggleComponent,
        MdbDatepickerDayViewComponent,
        MdbDatepickerMonthViewComponent,
        MdbDatepickerYearViewComponent], imports: [CommonModule, OverlayModule, A11yModule], exports: [MdbDatepickerComponent,
        MdbDatepickerContentComponent,
        MdbDatepickerInputDirective,
        MdbDatepickerToggleComponent,
        MdbDatepickerDayViewComponent,
        MdbDatepickerMonthViewComponent,
        MdbDatepickerYearViewComponent] });
MdbDatepickerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbDatepickerModule, imports: [[CommonModule, OverlayModule, A11yModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbDatepickerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, OverlayModule, A11yModule],
                    declarations: [
                        MdbDatepickerComponent,
                        MdbDatepickerContentComponent,
                        MdbDatepickerInputDirective,
                        MdbDatepickerToggleComponent,
                        MdbDatepickerDayViewComponent,
                        MdbDatepickerMonthViewComponent,
                        MdbDatepickerYearViewComponent,
                    ],
                    exports: [
                        MdbDatepickerComponent,
                        MdbDatepickerContentComponent,
                        MdbDatepickerInputDirective,
                        MdbDatepickerToggleComponent,
                        MdbDatepickerDayViewComponent,
                        MdbDatepickerMonthViewComponent,
                        MdbDatepickerYearViewComponent,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvZGF0ZXBpY2tlci9kYXRlcGlja2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNwRixPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNsRixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM3RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDOztBQXVCL0MsTUFBTSxPQUFPLG1CQUFtQjs7Z0hBQW5CLG1CQUFtQjtpSEFBbkIsbUJBQW1CLGlCQWxCNUIsc0JBQXNCO1FBQ3RCLDZCQUE2QjtRQUM3QiwyQkFBMkI7UUFDM0IsNEJBQTRCO1FBQzVCLDZCQUE2QjtRQUM3QiwrQkFBK0I7UUFDL0IsOEJBQThCLGFBUnRCLFlBQVksRUFBRSxhQUFhLEVBQUUsVUFBVSxhQVcvQyxzQkFBc0I7UUFDdEIsNkJBQTZCO1FBQzdCLDJCQUEyQjtRQUMzQiw0QkFBNEI7UUFDNUIsNkJBQTZCO1FBQzdCLCtCQUErQjtRQUMvQiw4QkFBOEI7aUhBR3JCLG1CQUFtQixZQXBCckIsQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQzsyRkFvQnZDLG1CQUFtQjtrQkFyQi9CLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGFBQWEsRUFBRSxVQUFVLENBQUM7b0JBQ2xELFlBQVksRUFBRTt3QkFDWixzQkFBc0I7d0JBQ3RCLDZCQUE2Qjt3QkFDN0IsMkJBQTJCO3dCQUMzQiw0QkFBNEI7d0JBQzVCLDZCQUE2Qjt3QkFDN0IsK0JBQStCO3dCQUMvQiw4QkFBOEI7cUJBQy9CO29CQUNELE9BQU8sRUFBRTt3QkFDUCxzQkFBc0I7d0JBQ3RCLDZCQUE2Qjt3QkFDN0IsMkJBQTJCO3dCQUMzQiw0QkFBNEI7d0JBQzVCLDZCQUE2Qjt3QkFDN0IsK0JBQStCO3dCQUMvQiw4QkFBOEI7cUJBQy9CO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZGJEYXRlcGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9kYXRlcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZGJEYXRlcGlja2VyQ29udGVudENvbXBvbmVudCB9IGZyb20gJy4vZGF0ZXBpY2tlci1jb250ZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZGJEYXRlcGlja2VySW5wdXREaXJlY3RpdmUgfSBmcm9tICcuL2RhdGVwaWNrZXItaW5wdXQuZGlyZWN0aXZlJztcbmltcG9ydCB7IE1kYkRhdGVwaWNrZXJEYXlWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi9kYXRlcGlja2VyLWRheS12aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZGJEYXRlcGlja2VyTW9udGhWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi9kYXRlcGlja2VyLW1vbnRoLXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IE1kYkRhdGVwaWNrZXJZZWFyVmlld0NvbXBvbmVudCB9IGZyb20gJy4vZGF0ZXBpY2tlci15ZWFyLXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IE1kYkRhdGVwaWNrZXJUb2dnbGVDb21wb25lbnQgfSBmcm9tICcuL2RhdGVwaWNrZXItdG9nZ2xlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQTExeU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgT3ZlcmxheU1vZHVsZSwgQTExeU1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE1kYkRhdGVwaWNrZXJDb21wb25lbnQsXG4gICAgTWRiRGF0ZXBpY2tlckNvbnRlbnRDb21wb25lbnQsXG4gICAgTWRiRGF0ZXBpY2tlcklucHV0RGlyZWN0aXZlLFxuICAgIE1kYkRhdGVwaWNrZXJUb2dnbGVDb21wb25lbnQsXG4gICAgTWRiRGF0ZXBpY2tlckRheVZpZXdDb21wb25lbnQsXG4gICAgTWRiRGF0ZXBpY2tlck1vbnRoVmlld0NvbXBvbmVudCxcbiAgICBNZGJEYXRlcGlja2VyWWVhclZpZXdDb21wb25lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBNZGJEYXRlcGlja2VyQ29tcG9uZW50LFxuICAgIE1kYkRhdGVwaWNrZXJDb250ZW50Q29tcG9uZW50LFxuICAgIE1kYkRhdGVwaWNrZXJJbnB1dERpcmVjdGl2ZSxcbiAgICBNZGJEYXRlcGlja2VyVG9nZ2xlQ29tcG9uZW50LFxuICAgIE1kYkRhdGVwaWNrZXJEYXlWaWV3Q29tcG9uZW50LFxuICAgIE1kYkRhdGVwaWNrZXJNb250aFZpZXdDb21wb25lbnQsXG4gICAgTWRiRGF0ZXBpY2tlclllYXJWaWV3Q29tcG9uZW50LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBNZGJEYXRlcGlja2VyTW9kdWxlIHt9XG4iXX0=