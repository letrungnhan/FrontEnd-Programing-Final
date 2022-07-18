import { OverlayRef } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';
import { MdbNotificationContainerComponent } from '.';
import { MdbNotificationService } from './notification.service';
export declare class MdbNotificationRef<T> {
    overlayRef: OverlayRef;
    private _notificationService;
    private _container;
    constructor(overlayRef: OverlayRef, _notificationService: MdbNotificationService, _container: MdbNotificationContainerComponent);
    private readonly onClose$;
    readonly onClose: Observable<any>;
    close(message?: any): void;
    getPosition(): DOMRect;
}
