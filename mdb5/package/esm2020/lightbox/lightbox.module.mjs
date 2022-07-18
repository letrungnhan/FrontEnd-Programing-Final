import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { MdbLightboxItemDirective } from './lightbox-item.directive';
import { MdbLightboxComponent } from './lightbox.component';
import { MdbLightboxModalComponent } from './lightbox-modal.component';
import * as i0 from "@angular/core";
export class MdbLightboxModule {
}
MdbLightboxModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbLightboxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbLightboxModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbLightboxModule, declarations: [MdbLightboxComponent, MdbLightboxItemDirective, MdbLightboxModalComponent], imports: [CommonModule, OverlayModule], exports: [MdbLightboxComponent, MdbLightboxItemDirective, MdbLightboxModalComponent] });
MdbLightboxModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbLightboxModule, imports: [[CommonModule, OverlayModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbLightboxModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, OverlayModule],
                    declarations: [MdbLightboxComponent, MdbLightboxItemDirective, MdbLightboxModalComponent],
                    exports: [MdbLightboxComponent, MdbLightboxItemDirective, MdbLightboxModalComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlnaHRib3gubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L2xpZ2h0Ym94L2xpZ2h0Ym94Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDckUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sNEJBQTRCLENBQUM7O0FBT3ZFLE1BQU0sT0FBTyxpQkFBaUI7OzhHQUFqQixpQkFBaUI7K0dBQWpCLGlCQUFpQixpQkFIYixvQkFBb0IsRUFBRSx3QkFBd0IsRUFBRSx5QkFBeUIsYUFEOUUsWUFBWSxFQUFFLGFBQWEsYUFFM0Isb0JBQW9CLEVBQUUsd0JBQXdCLEVBQUUseUJBQXlCOytHQUV4RSxpQkFBaUIsWUFKbkIsQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDOzJGQUkzQixpQkFBaUI7a0JBTDdCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQztvQkFDdEMsWUFBWSxFQUFFLENBQUMsb0JBQW9CLEVBQUUsd0JBQXdCLEVBQUUseUJBQXlCLENBQUM7b0JBQ3pGLE9BQU8sRUFBRSxDQUFDLG9CQUFvQixFQUFFLHdCQUF3QixFQUFFLHlCQUF5QixDQUFDO2lCQUNyRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IE1kYkxpZ2h0Ym94SXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vbGlnaHRib3gtaXRlbS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWRiTGlnaHRib3hDb21wb25lbnQgfSBmcm9tICcuL2xpZ2h0Ym94LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZGJMaWdodGJveE1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi9saWdodGJveC1tb2RhbC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBPdmVybGF5TW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTWRiTGlnaHRib3hDb21wb25lbnQsIE1kYkxpZ2h0Ym94SXRlbURpcmVjdGl2ZSwgTWRiTGlnaHRib3hNb2RhbENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtNZGJMaWdodGJveENvbXBvbmVudCwgTWRiTGlnaHRib3hJdGVtRGlyZWN0aXZlLCBNZGJMaWdodGJveE1vZGFsQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgTWRiTGlnaHRib3hNb2R1bGUge31cbiJdfQ==