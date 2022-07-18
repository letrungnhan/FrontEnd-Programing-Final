import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdbSelectComponent } from './select.component';
import { MdbSelectAllOptionComponent } from './select-all-option';
import { OverlayModule } from '@angular/cdk/overlay';
import { ReactiveFormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbOptionModule } from 'mdb-angular-ui-kit/option';
import * as i0 from "@angular/core";
export class MdbSelectModule {
}
MdbSelectModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbSelectModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbSelectModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbSelectModule, declarations: [MdbSelectComponent, MdbSelectAllOptionComponent], imports: [CommonModule, OverlayModule, ReactiveFormsModule], exports: [MdbSelectComponent, MdbSelectAllOptionComponent, MdbFormsModule, MdbOptionModule] });
MdbSelectModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbSelectModule, imports: [[CommonModule, OverlayModule, ReactiveFormsModule], MdbFormsModule, MdbOptionModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbSelectModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [MdbSelectComponent, MdbSelectAllOptionComponent],
                    imports: [CommonModule, OverlayModule, ReactiveFormsModule],
                    exports: [MdbSelectComponent, MdbSelectAllOptionComponent, MdbFormsModule, MdbOptionModule],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9zZWxlY3Qvc2VsZWN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7QUFPNUQsTUFBTSxPQUFPLGVBQWU7OzRHQUFmLGVBQWU7NkdBQWYsZUFBZSxpQkFKWCxrQkFBa0IsRUFBRSwyQkFBMkIsYUFDcEQsWUFBWSxFQUFFLGFBQWEsRUFBRSxtQkFBbUIsYUFDaEQsa0JBQWtCLEVBQUUsMkJBQTJCLEVBQUUsY0FBYyxFQUFFLGVBQWU7NkdBRS9FLGVBQWUsWUFIakIsQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLG1CQUFtQixDQUFDLEVBQ0EsY0FBYyxFQUFFLGVBQWU7MkZBRS9FLGVBQWU7a0JBTDNCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFLENBQUMsa0JBQWtCLEVBQUUsMkJBQTJCLENBQUM7b0JBQy9ELE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUUsbUJBQW1CLENBQUM7b0JBQzNELE9BQU8sRUFBRSxDQUFDLGtCQUFrQixFQUFFLDJCQUEyQixFQUFFLGNBQWMsRUFBRSxlQUFlLENBQUM7aUJBQzVGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IE1kYlNlbGVjdENvbXBvbmVudCB9IGZyb20gJy4vc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZGJTZWxlY3RBbGxPcHRpb25Db21wb25lbnQgfSBmcm9tICcuL3NlbGVjdC1hbGwtb3B0aW9uJztcbmltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWRiRm9ybXNNb2R1bGUgfSBmcm9tICdtZGItYW5ndWxhci11aS1raXQvZm9ybXMnO1xuaW1wb3J0IHsgTWRiT3B0aW9uTW9kdWxlIH0gZnJvbSAnbWRiLWFuZ3VsYXItdWkta2l0L29wdGlvbic7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW01kYlNlbGVjdENvbXBvbmVudCwgTWRiU2VsZWN0QWxsT3B0aW9uQ29tcG9uZW50XSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgT3ZlcmxheU1vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZV0sXG4gIGV4cG9ydHM6IFtNZGJTZWxlY3RDb21wb25lbnQsIE1kYlNlbGVjdEFsbE9wdGlvbkNvbXBvbmVudCwgTWRiRm9ybXNNb2R1bGUsIE1kYk9wdGlvbk1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIE1kYlNlbGVjdE1vZHVsZSB7fVxuIl19