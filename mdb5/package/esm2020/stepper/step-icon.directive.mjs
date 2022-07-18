import { Directive, InjectionToken } from '@angular/core';
import * as i0 from "@angular/core";
export const MDB_STEP_ICON = new InjectionToken('MdbStepIconDirective');
export class MdbStepIconDirective {
    constructor(template) {
        this.template = template;
    }
}
MdbStepIconDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbStepIconDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
MdbStepIconDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.7", type: MdbStepIconDirective, selector: "[mdbStepIcon]", providers: [{ provide: MDB_STEP_ICON, useExisting: MdbStepIconDirective }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbStepIconDirective, decorators: [{
            type: Directive,
            args: [{
                    // tslint:disable-next-line: directive-selector
                    selector: '[mdbStepIcon]',
                    providers: [{ provide: MDB_STEP_ICON, useExisting: MdbStepIconDirective }],
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC1pY29uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9zdGVwcGVyL3N0ZXAtaWNvbi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQWUsTUFBTSxlQUFlLENBQUM7O0FBRXZFLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxJQUFJLGNBQWMsQ0FBdUIsc0JBQXNCLENBQUMsQ0FBQztBQU85RixNQUFNLE9BQU8sb0JBQW9CO0lBQy9CLFlBQW1CLFFBQTBCO1FBQTFCLGFBQVEsR0FBUixRQUFRLENBQWtCO0lBQUcsQ0FBQzs7aUhBRHRDLG9CQUFvQjtxR0FBcEIsb0JBQW9CLHdDQUZwQixDQUFDLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQzsyRkFFL0Qsb0JBQW9CO2tCQUxoQyxTQUFTO21CQUFDO29CQUNULCtDQUErQztvQkFDL0MsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLHNCQUFzQixFQUFFLENBQUM7aUJBQzNFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbmplY3Rpb25Ub2tlbiwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGNvbnN0IE1EQl9TVEVQX0lDT04gPSBuZXcgSW5qZWN0aW9uVG9rZW48TWRiU3RlcEljb25EaXJlY3RpdmU+KCdNZGJTdGVwSWNvbkRpcmVjdGl2ZScpO1xuXG5ARGlyZWN0aXZlKHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBkaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdbbWRiU3RlcEljb25dJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBNREJfU1RFUF9JQ09OLCB1c2VFeGlzdGluZzogTWRiU3RlcEljb25EaXJlY3RpdmUgfV0sXG59KVxuZXhwb3J0IGNsYXNzIE1kYlN0ZXBJY29uRGlyZWN0aXZlIHtcbiAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxufVxuIl19