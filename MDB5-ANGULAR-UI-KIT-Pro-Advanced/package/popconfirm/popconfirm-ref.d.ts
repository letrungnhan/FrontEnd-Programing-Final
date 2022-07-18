import { OverlayRef } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';
export declare class MdbPopconfirmRef<T> {
    overlayRef: OverlayRef;
    constructor(overlayRef: OverlayRef);
    private readonly onClose$;
    private readonly onConfirm$;
    readonly onClose: Observable<any>;
    readonly onConfirm: Observable<any>;
    close(message?: any): void;
    confirm(message?: any): void;
    getPosition(): DOMRect;
}
