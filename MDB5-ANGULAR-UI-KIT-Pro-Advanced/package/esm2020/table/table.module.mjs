import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdbTableDirective } from './table.directive';
import { MdbTableSortDirective } from './table-sort.directive';
import { MdbTableSortHeaderDirective } from './table-sort-header.component';
import { MdbTablePaginationComponent } from './table-pagination.component';
import { MdbSelectModule } from 'mdb-angular-ui-kit/select';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
export class MdbTableModule {
}
MdbTableModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbTableModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTableModule, declarations: [MdbTablePaginationComponent,
        MdbTableSortDirective,
        MdbTableSortHeaderDirective,
        MdbTableDirective], imports: [CommonModule, MdbSelectModule, MdbFormsModule, FormsModule], exports: [MdbTablePaginationComponent,
        MdbTableSortDirective,
        MdbTableSortHeaderDirective,
        MdbTableDirective] });
MdbTableModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTableModule, imports: [[CommonModule, MdbSelectModule, MdbFormsModule, FormsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbTableModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, MdbSelectModule, MdbFormsModule, FormsModule],
                    declarations: [
                        MdbTablePaginationComponent,
                        MdbTableSortDirective,
                        MdbTableSortHeaderDirective,
                        MdbTableDirective,
                    ],
                    exports: [
                        MdbTablePaginationComponent,
                        MdbTableSortDirective,
                        MdbTableSortHeaderDirective,
                        MdbTableDirective,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L3RhYmxlL3RhYmxlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFpQjdDLE1BQU0sT0FBTyxjQUFjOzsyR0FBZCxjQUFjOzRHQUFkLGNBQWMsaUJBWnZCLDJCQUEyQjtRQUMzQixxQkFBcUI7UUFDckIsMkJBQTJCO1FBQzNCLGlCQUFpQixhQUxULFlBQVksRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLFdBQVcsYUFRbEUsMkJBQTJCO1FBQzNCLHFCQUFxQjtRQUNyQiwyQkFBMkI7UUFDM0IsaUJBQWlCOzRHQUdSLGNBQWMsWUFkaEIsQ0FBQyxZQUFZLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxXQUFXLENBQUM7MkZBYzFELGNBQWM7a0JBZjFCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsV0FBVyxDQUFDO29CQUNyRSxZQUFZLEVBQUU7d0JBQ1osMkJBQTJCO3dCQUMzQixxQkFBcUI7d0JBQ3JCLDJCQUEyQjt3QkFDM0IsaUJBQWlCO3FCQUNsQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsMkJBQTJCO3dCQUMzQixxQkFBcUI7d0JBQ3JCLDJCQUEyQjt3QkFDM0IsaUJBQWlCO3FCQUNsQjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTWRiVGFibGVEaXJlY3RpdmUgfSBmcm9tICcuL3RhYmxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNZGJUYWJsZVNvcnREaXJlY3RpdmUgfSBmcm9tICcuL3RhYmxlLXNvcnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IE1kYlRhYmxlU29ydEhlYWRlckRpcmVjdGl2ZSB9IGZyb20gJy4vdGFibGUtc29ydC1oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE1kYlRhYmxlUGFnaW5hdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vdGFibGUtcGFnaW5hdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWRiU2VsZWN0TW9kdWxlIH0gZnJvbSAnbWRiLWFuZ3VsYXItdWkta2l0L3NlbGVjdCc7XG5pbXBvcnQgeyBNZGJGb3Jtc01vZHVsZSB9IGZyb20gJ21kYi1hbmd1bGFyLXVpLWtpdC9mb3Jtcyc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTWRiU2VsZWN0TW9kdWxlLCBNZGJGb3Jtc01vZHVsZSwgRm9ybXNNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBNZGJUYWJsZVBhZ2luYXRpb25Db21wb25lbnQsXG4gICAgTWRiVGFibGVTb3J0RGlyZWN0aXZlLFxuICAgIE1kYlRhYmxlU29ydEhlYWRlckRpcmVjdGl2ZSxcbiAgICBNZGJUYWJsZURpcmVjdGl2ZSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE1kYlRhYmxlUGFnaW5hdGlvbkNvbXBvbmVudCxcbiAgICBNZGJUYWJsZVNvcnREaXJlY3RpdmUsXG4gICAgTWRiVGFibGVTb3J0SGVhZGVyRGlyZWN0aXZlLFxuICAgIE1kYlRhYmxlRGlyZWN0aXZlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBNZGJUYWJsZU1vZHVsZSB7fVxuIl19