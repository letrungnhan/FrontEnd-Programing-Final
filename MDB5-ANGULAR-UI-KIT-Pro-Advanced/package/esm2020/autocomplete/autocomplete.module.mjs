import { NgModule } from '@angular/core';
import { MdbAutocompleteComponent } from './autocomplete.component';
import { MdbAutocompleteDirective } from './autocomplete.directive';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MdbOptionModule } from 'mdb-angular-ui-kit/option';
import { OverlayModule } from '@angular/cdk/overlay';
import * as i0 from "@angular/core";
export class MdbAutocompleteModule {
}
MdbAutocompleteModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbAutocompleteModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbAutocompleteModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbAutocompleteModule, declarations: [MdbAutocompleteComponent, MdbAutocompleteDirective], imports: [CommonModule, HttpClientModule, FormsModule, MdbOptionModule, OverlayModule], exports: [MdbAutocompleteComponent, MdbAutocompleteDirective, MdbOptionModule] });
MdbAutocompleteModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbAutocompleteModule, imports: [[CommonModule, HttpClientModule, FormsModule, MdbOptionModule, OverlayModule], MdbOptionModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbAutocompleteModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, HttpClientModule, FormsModule, MdbOptionModule, OverlayModule],
                    declarations: [MdbAutocompleteComponent, MdbAutocompleteDirective],
                    exports: [MdbAutocompleteComponent, MdbAutocompleteDirective, MdbOptionModule],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7QUFPckQsTUFBTSxPQUFPLHFCQUFxQjs7a0hBQXJCLHFCQUFxQjttSEFBckIscUJBQXFCLGlCQUhqQix3QkFBd0IsRUFBRSx3QkFBd0IsYUFEdkQsWUFBWSxFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsYUFBYSxhQUUzRSx3QkFBd0IsRUFBRSx3QkFBd0IsRUFBRSxlQUFlO21IQUVsRSxxQkFBcUIsWUFKdkIsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxhQUFhLENBQUMsRUFFeEIsZUFBZTsyRkFFbEUscUJBQXFCO2tCQUxqQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLGFBQWEsQ0FBQztvQkFDdEYsWUFBWSxFQUFFLENBQUMsd0JBQXdCLEVBQUUsd0JBQXdCLENBQUM7b0JBQ2xFLE9BQU8sRUFBRSxDQUFDLHdCQUF3QixFQUFFLHdCQUF3QixFQUFFLGVBQWUsQ0FBQztpQkFDL0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBNZGJBdXRvY29tcGxldGVDb21wb25lbnQgfSBmcm9tICcuL2F1dG9jb21wbGV0ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWRiQXV0b2NvbXBsZXRlRGlyZWN0aXZlIH0gZnJvbSAnLi9hdXRvY29tcGxldGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNZGJPcHRpb25Nb2R1bGUgfSBmcm9tICdtZGItYW5ndWxhci11aS1raXQvb3B0aW9uJztcbmltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEh0dHBDbGllbnRNb2R1bGUsIEZvcm1zTW9kdWxlLCBNZGJPcHRpb25Nb2R1bGUsIE92ZXJsYXlNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtNZGJBdXRvY29tcGxldGVDb21wb25lbnQsIE1kYkF1dG9jb21wbGV0ZURpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtNZGJBdXRvY29tcGxldGVDb21wb25lbnQsIE1kYkF1dG9jb21wbGV0ZURpcmVjdGl2ZSwgTWRiT3B0aW9uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgTWRiQXV0b2NvbXBsZXRlTW9kdWxlIHt9XG4iXX0=