import { Directive, EventEmitter, Input, Output, } from '@angular/core';
import { fromEvent } from 'rxjs';
import { take } from 'rxjs/operators';
import { isImage, isVideo } from './lazy-loading.utils';
import * as i0 from "@angular/core";
export class MdbLazyLoadingDirective {
    constructor(_elementRef, _renderer, _ngZone) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._ngZone = _ngZone;
        this.offset = 0;
        this.delay = 0;
        this.loadingStart = new EventEmitter();
        this.loadingEnd = new EventEmitter();
        this.loadingError = new EventEmitter();
    }
    get host() {
        return this._elementRef.nativeElement;
    }
    ngOnInit() {
        this._initObserver();
        if (this.loadingPlaceholder) {
            this._setPlaceholder(this.host, this.loadingPlaceholder);
        }
    }
    ngOnDestroy() {
        if (this._scrollSubscription) {
            this._scrollSubscription.unsubscribe();
        }
    }
    _initObserver() {
        const target = this.container || window;
        this._ngZone.runOutsideAngular(() => {
            this._scrollSubscription = fromEvent(target, 'scroll').subscribe(() => {
                this._handleScroll();
            });
        });
    }
    _handleScroll() {
        if (this._isInViewport()) {
            this._ngZone.run(() => {
                this._lazyLoad(this.host);
            });
        }
    }
    _isInViewport() {
        const elementRect = this.host.getBoundingClientRect();
        if (this.container) {
            const containerRect = this.container.getBoundingClientRect();
            return (containerRect.y > 0 &&
                containerRect.y < window.innerHeight &&
                elementRect.y >= containerRect.y &&
                elementRect.y <= containerRect.y + containerRect.height &&
                elementRect.y <= window.innerHeight);
        }
        return elementRect.top + this.offset <= window.innerHeight && elementRect.bottom >= 0;
    }
    _lazyLoad(element) {
        this._scrollSubscription.unsubscribe();
        this.loadingStart.emit();
        setTimeout(() => {
            if (isImage(element)) {
                this._loadImage(element);
            }
            else if (isVideo(element)) {
                this._loadVideo(element);
            }
        }, this.delay);
    }
    _loadImage(element) {
        if (!element.dataset.src) {
            this.loadingError.emit();
            if (this.errorPlaceholder) {
                this._setPlaceholder(element, this.errorPlaceholder);
            }
            return;
        }
        this._handleLoadingEvents(element);
        this._renderer.setAttribute(element, 'src', element.dataset.src);
        this._renderer.removeAttribute(element, 'data-src');
    }
    _loadVideo(element) {
        if (!element.dataset.src) {
            this.loadingError.emit();
            if (this.errorPlaceholder) {
                this._setPlaceholder(element, this.errorPlaceholder);
            }
            return;
        }
        this._handleLoadingEvents(element);
        this._renderer.setAttribute(element, 'src', element.dataset.src);
        this._renderer.removeAttribute(element, 'data-src');
        this._renderer.removeAttribute(element, 'poster');
    }
    _handleLoadingEvents(element) {
        fromEvent(element, 'load')
            .pipe(take(1))
            .subscribe(() => {
            this.loadingEnd.emit();
        });
        fromEvent(element, 'error')
            .pipe(take(1))
            .subscribe(() => {
            this.loadingError.emit();
            if (this.errorPlaceholder) {
                this._setPlaceholder(element, this.errorPlaceholder);
            }
        });
    }
    _setPlaceholder(element, placeholder) {
        if (element.nodeName === 'IMG') {
            this._renderer.setAttribute(element, 'src', placeholder);
        }
        else if (element.nodeName === 'VIDEO') {
            this._renderer.setAttribute(element, 'poster', placeholder);
        }
    }
}
MdbLazyLoadingDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbLazyLoadingDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
MdbLazyLoadingDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.7", type: MdbLazyLoadingDirective, selector: "[mdbLazyLoading]", inputs: { offset: "offset", loadingPlaceholder: "loadingPlaceholder", errorPlaceholder: "errorPlaceholder", container: "container", delay: "delay" }, outputs: { loadingStart: "loadingStart", loadingEnd: "loadingEnd", loadingError: "loadingError" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbLazyLoadingDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mdbLazyLoading]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.NgZone }]; }, propDecorators: { offset: [{
                type: Input
            }], loadingPlaceholder: [{
                type: Input
            }], errorPlaceholder: [{
                type: Input
            }], container: [{
                type: Input
            }], delay: [{
                type: Input
            }], loadingStart: [{
                type: Output
            }], loadingEnd: [{
                type: Output
            }], loadingError: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1sb2FkaW5nLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9sYXp5LWxvYWRpbmcvbGF6eS1sb2FkaW5nLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULFlBQVksRUFDWixLQUFLLEVBSUwsTUFBTSxHQUVQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDOztBQUt4RCxNQUFNLE9BQU8sdUJBQXVCO0lBYWxDLFlBQ1UsV0FBdUIsRUFDdkIsU0FBb0IsRUFDcEIsT0FBZTtRQUZmLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3ZCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQWZoQixXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBSVgsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUVULGlCQUFZLEdBQXVCLElBQUksWUFBWSxFQUFRLENBQUM7UUFDNUQsZUFBVSxHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBQzFELGlCQUFZLEdBQXVCLElBQUksWUFBWSxFQUFRLENBQUM7SUFRbkUsQ0FBQztJQUVKLElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUM7SUFDeEMsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFckIsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDM0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxr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QztZQUV6QixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7YUFDdEQ7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyxlQUFlLENBQUMsT0FBWSxFQUFFLFdBQW1CO1FBQ3ZELElBQUksT0FBTyxDQUFDLFFBQVEsS0FBSyxLQUFLLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQztTQUMxRDthQUFNLElBQUksT0FBTyxDQUFDLFFBQVEsS0FBSyxPQUFPLEVBQUU7WUFDdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQztTQUM3RDtJQUNILENBQUM7O29IQWhKVSx1QkFBdUI7d0dBQXZCLHVCQUF1QjsyRkFBdkIsdUJBQXVCO2tCQUhuQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7aUJBQzdCOzhJQUVVLE1BQU07c0JBQWQsS0FBSztnQkFDRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBQ0csZ0JBQWdCO3NCQUF4QixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUVJLFlBQVk7c0JBQXJCLE1BQU07Z0JBQ0csVUFBVTtzQkFBbkIsTUFBTTtnQkFDRyxZQUFZO3NCQUFyQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGlzSW1hZ2UsIGlzVmlkZW8gfSBmcm9tICcuL2xhenktbG9hZGluZy51dGlscyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZGJMYXp5TG9hZGluZ10nLFxufSlcbmV4cG9ydCBjbGFzcyBNZGJMYXp5TG9hZGluZ0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgb2Zmc2V0ID0gMDtcbiAgQElucHV0KCkgbG9hZGluZ1BsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGVycm9yUGxhY2Vob2xkZXI6IHN0cmluZztcbiAgQElucHV0KCkgY29udGFpbmVyOiBIVE1MRWxlbWVudDtcbiAgQElucHV0KCkgZGVsYXkgPSAwO1xuXG4gIEBPdXRwdXQoKSBsb2FkaW5nU3RhcnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIGxvYWRpbmdFbmQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIGxvYWRpbmdFcnJvcjogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIHByaXZhdGUgX3Njcm9sbFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZVxuICApIHt9XG5cbiAgZ2V0IGhvc3QoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9pbml0T2JzZXJ2ZXIoKTtcblxuICAgIGlmICh0aGlzLmxvYWRpbmdQbGFjZWhvbGRlcikge1xuICAgICAgdGhpcy5fc2V0UGxhY2Vob2xkZXIodGhpcy5ob3N0LCB0aGlzLmxvYWRpbmdQbGFjZWhvbGRlcik7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3Njcm9sbFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5fc2Nyb2xsU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdE9ic2VydmVyKCk6IHZvaWQge1xuICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuY29udGFpbmVyIHx8IHdpbmRvdztcblxuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLl9zY3JvbGxTdWJzY3JpcHRpb24gPSBmcm9tRXZlbnQodGFyZ2V0LCAnc2Nyb2xsJykuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5faGFuZGxlU2Nyb2xsKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZVNjcm9sbCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5faXNJblZpZXdwb3J0KCkpIHtcbiAgICAgIHRoaXMuX25nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICB0aGlzLl9sYXp5TG9hZCh0aGlzLmhvc3QpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaXNJblZpZXdwb3J0KCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGVsZW1lbnRSZWN0ID0gdGhpcy5ob3N0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgaWYgKHRoaXMuY29udGFpbmVyKSB7XG4gICAgICBjb25zdCBjb250YWluZXJSZWN0ID0gdGhpcy5jb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBjb250YWluZXJSZWN0LnkgPiAwICYmXG4gICAgICAgIGNvbnRhaW5lclJlY3QueSA8IHdpbmRvdy5pbm5lckhlaWdodCAmJlxuICAgICAgICBlbGVtZW50UmVjdC55ID49IGNvbnRhaW5lclJlY3QueSAmJlxuICAgICAgICBlbGVtZW50UmVjdC55IDw9IGNvbnRhaW5lclJlY3QueSArIGNvbnRhaW5lclJlY3QuaGVpZ2h0ICYmXG4gICAgICAgIGVsZW1lbnRSZWN0LnkgPD0gd2luZG93LmlubmVySGVpZ2h0XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBlbGVtZW50UmVjdC50b3AgKyB0aGlzLm9mZnNldCA8PSB3aW5kb3cuaW5uZXJIZWlnaHQgJiYgZWxlbWVudFJlY3QuYm90dG9tID49IDA7XG4gIH1cblxuICBwcml2YXRlIF9sYXp5TG9hZChlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIHRoaXMuX3Njcm9sbFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMubG9hZGluZ1N0YXJ0LmVtaXQoKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKGlzSW1hZ2UoZWxlbWVudCkpIHtcbiAgICAgICAgdGhpcy5fbG9hZEltYWdlKGVsZW1lbnQgYXMgSFRNTEltYWdlRWxlbWVudCk7XG4gICAgICB9IGVsc2UgaWYgKGlzVmlkZW8oZWxlbWVudCkpIHtcbiAgICAgICAgdGhpcy5fbG9hZFZpZGVvKGVsZW1lbnQgYXMgSFRNTFZpZGVvRWxlbWVudCk7XG4gICAgICB9XG4gICAgfSwgdGhpcy5kZWxheSk7XG4gIH1cblxuICBwcml2YXRlIF9sb2FkSW1hZ2UoZWxlbWVudDogSFRNTEltYWdlRWxlbWVudCkge1xuICAgIGlmICghZWxlbWVudC5kYXRhc2V0LnNyYykge1xuICAgICAgdGhpcy5sb2FkaW5nRXJyb3IuZW1pdCgpO1xuXG4gICAgICBpZiAodGhpcy5lcnJvclBsYWNlaG9sZGVyKSB7XG4gICAgICAgIHRoaXMuX3NldFBsYWNlaG9sZGVyKGVsZW1lbnQsIHRoaXMuZXJyb3JQbGFjZWhvbGRlcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9oYW5kbGVMb2FkaW5nRXZlbnRzKGVsZW1lbnQpO1xuXG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKGVsZW1lbnQsICdzcmMnLCBlbGVtZW50LmRhdGFzZXQuc3JjKTtcbiAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVBdHRyaWJ1dGUoZWxlbWVudCwgJ2RhdGEtc3JjJyk7XG4gIH1cblxuICBwcml2YXRlIF9sb2FkVmlkZW8oZWxlbWVudDogSFRNTFZpZGVvRWxlbWVudCkge1xuICAgIGlmICghZWxlbWVudC5kYXRhc2V0LnNyYykge1xuICAgICAgdGhpcy5sb2FkaW5nRXJyb3IuZW1pdCgpO1xuXG4gICAgICBpZiAodGhpcy5lcnJvclBsYWNlaG9sZGVyKSB7XG4gICAgICAgIHRoaXMuX3NldFBsYWNlaG9sZGVyKGVsZW1lbnQsIHRoaXMuZXJyb3JQbGFjZWhvbGRlcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9oYW5kbGVMb2FkaW5nRXZlbnRzKGVsZW1lbnQpO1xuXG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKGVsZW1lbnQsICdzcmMnLCBlbGVtZW50LmRhdGFzZXQuc3JjKTtcbiAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVBdHRyaWJ1dGUoZWxlbWVudCwgJ2RhdGEtc3JjJyk7XG4gICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQXR0cmlidXRlKGVsZW1lbnQsICdwb3N0ZXInKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZUxvYWRpbmdFdmVudHMoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBmcm9tRXZlbnQoZWxlbWVudCwgJ2xvYWQnKVxuICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmxvYWRpbmdFbmQuZW1pdCgpO1xuICAgICAgfSk7XG5cbiAgICBmcm9tRXZlbnQoZWxlbWVudCwgJ2Vycm9yJylcbiAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5sb2FkaW5nRXJyb3IuZW1pdCgpO1xuXG4gICAgICAgIGlmICh0aGlzLmVycm9yUGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICB0aGlzLl9zZXRQbGFjZWhvbGRlcihlbGVtZW50LCB0aGlzLmVycm9yUGxhY2Vob2xkZXIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldFBsYWNlaG9sZGVyKGVsZW1lbnQ6IGFueSwgcGxhY2Vob2xkZXI6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChlbGVtZW50Lm5vZGVOYW1lID09PSAnSU1HJykge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKGVsZW1lbnQsICdzcmMnLCBwbGFjZWhvbGRlcik7XG4gICAgfSBlbHNlIGlmIChlbGVtZW50Lm5vZGVOYW1lID09PSAnVklERU8nKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUoZWxlbWVudCwgJ3Bvc3RlcicsIHBsYWNlaG9sZGVyKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==