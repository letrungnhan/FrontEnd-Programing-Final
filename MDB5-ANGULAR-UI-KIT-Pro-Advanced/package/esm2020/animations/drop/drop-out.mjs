import { animate, keyframes, style, transition, trigger, animation, useAnimation, } from '@angular/animations';
import { getOptions } from '../animations.utils';
const dropOutOptions = {
    trigger: 'dropOut',
    delay: 0,
    duration: 500,
};
const dropOutLeaveOptions = {
    trigger: 'dropOutLeave',
    delay: 0,
    duration: 500,
};
const dropOut = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({
                opacity: 1,
                transformOrigin: 'top center',
                transform: 'scale(1)',
                easing: 'cubic-bezier(0.34, 1.61, 0.7, 1)',
                offset: 0,
            }),
            style({
                opacity: 0,
                transformOrigin: 'top center',
                transform: 'scale(0)',
                easing: 'cubic-bezier(0.34, 1.61, 0.7, 1)',
                offset: 1,
            }),
        ])),
    ], { params });
};
export function dropOutAnimation(options) {
    options = getOptions(options, dropOutOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(dropOut(options))])]);
}
export function dropOutLeaveAnimation(options) {
    options = getOptions(options, dropOutLeaveOptions);
    return trigger(options.trigger, [transition(':leave', [useAnimation(dropOut(options))])]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcC1vdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvYW5pbWF0aW9ucy9kcm9wL2Ryb3Atb3V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxPQUFPLEVBRVAsU0FBUyxFQUNULEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxFQUNQLFNBQVMsRUFDVCxZQUFZLEdBRWIsTUFBTSxxQkFBcUIsQ0FBQztBQUU3QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFakQsTUFBTSxjQUFjLEdBQXdCO0lBQzFDLE9BQU8sRUFBRSxTQUFTO0lBQ2xCLEtBQUssRUFBRSxDQUFDO0lBQ1IsUUFBUSxFQUFFLEdBQUc7Q0FDZCxDQUFDO0FBRUYsTUFBTSxtQkFBbUIsR0FBd0I7SUFDL0MsT0FBTyxFQUFFLGNBQWM7SUFDdkIsS0FBSyxFQUFFLENBQUM7SUFDUixRQUFRLEVBQUUsR0FBRztDQUNkLENBQUM7QUFFRixNQUFNLE9BQU8sR0FBRyxDQUFDLE9BQTRCLEVBQThCLEVBQUU7SUFDM0UsTUFBTSxNQUFNLEdBQUc7UUFDYixLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7UUFDcEIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRO0tBQzNCLENBQUM7SUFFRixPQUFPLFNBQVMsQ0FDZDtRQUNFLE9BQU8sQ0FDTCw0QkFBNEIsRUFDNUIsU0FBUyxDQUFDO1lBQ1IsS0FBSyxDQUFDO2dCQUNKLE9BQU8sRUFBRSxDQUFDO2dCQUNWLGVBQWUsRUFBRSxZQUFZO2dCQUM3QixTQUFTLEVBQUUsVUFBVTtnQkFDckIsTUFBTSxFQUFFLGtDQUFrQztnQkFDMUMsTUFBTSxFQUFFLENBQUM7YUFDVixDQUFDO1lBQ0YsS0FBSyxDQUFDO2dCQUNKLE9BQU8sRUFBRSxDQUFDO2dCQUNWLGVBQWUsRUFBRSxZQUFZO2dCQUM3QixTQUFTLEVBQUUsVUFBVTtnQkFDckIsTUFBTSxFQUFFLGtDQUFrQztnQkFDMUMsTUFBTSxFQUFFLENBQUM7YUFDVixDQUFDO1NBQ0gsQ0FBQyxDQUNIO0tBQ0YsRUFDRCxFQUFFLE1BQU0sRUFBRSxDQUNYLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixNQUFNLFVBQVUsZ0JBQWdCLENBQUMsT0FBNkI7SUFDNUQsT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFFOUMsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM1RixDQUFDO0FBRUQsTUFBTSxVQUFVLHFCQUFxQixDQUFDLE9BQTZCO0lBQ2pFLE9BQU8sR0FBRyxVQUFVLENBQUMsT0FBTyxFQUFFLG1CQUFtQixDQUFDLENBQUM7SUFFbkQsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM1RixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgYW5pbWF0ZSxcbiAgQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhLFxuICBrZXlmcmFtZXMsXG4gIHN0eWxlLFxuICB0cmFuc2l0aW9uLFxuICB0cmlnZ2VyLFxuICBhbmltYXRpb24sXG4gIHVzZUFuaW1hdGlvbixcbiAgQW5pbWF0aW9uUmVmZXJlbmNlTWV0YWRhdGEsXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgTWRiQW5pbWF0aW9uT3B0aW9ucyB9IGZyb20gJy4uL2FuaW1hdGlvbi5vcHRpb25zJztcbmltcG9ydCB7IGdldE9wdGlvbnMgfSBmcm9tICcuLi9hbmltYXRpb25zLnV0aWxzJztcblxuY29uc3QgZHJvcE91dE9wdGlvbnM6IE1kYkFuaW1hdGlvbk9wdGlvbnMgPSB7XG4gIHRyaWdnZXI6ICdkcm9wT3V0JyxcbiAgZGVsYXk6IDAsXG4gIGR1cmF0aW9uOiA1MDAsXG59O1xuXG5jb25zdCBkcm9wT3V0TGVhdmVPcHRpb25zOiBNZGJBbmltYXRpb25PcHRpb25zID0ge1xuICB0cmlnZ2VyOiAnZHJvcE91dExlYXZlJyxcbiAgZGVsYXk6IDAsXG4gIGR1cmF0aW9uOiA1MDAsXG59O1xuXG5jb25zdCBkcm9wT3V0ID0gKG9wdGlvbnM6IE1kYkFuaW1hdGlvbk9wdGlvbnMpOiBBbmltYXRpb25SZWZlcmVuY2VNZXRhZGF0YSA9PiB7XG4gIGNvbnN0IHBhcmFtcyA9IHtcbiAgICBkZWxheTogb3B0aW9ucy5kZWxheSxcbiAgICBkdXJhdGlvbjogb3B0aW9ucy5kdXJhdGlvbixcbiAgfTtcblxuICByZXR1cm4gYW5pbWF0aW9uKFxuICAgIFtcbiAgICAgIGFuaW1hdGUoXG4gICAgICAgICd7e2R1cmF0aW9ufX1tcyB7e2RlbGF5fX1tcycsXG4gICAgICAgIGtleWZyYW1lcyhbXG4gICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgIHRyYW5zZm9ybU9yaWdpbjogJ3RvcCBjZW50ZXInLFxuICAgICAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoMSknLFxuICAgICAgICAgICAgZWFzaW5nOiAnY3ViaWMtYmV6aWVyKDAuMzQsIDEuNjEsIDAuNywgMSknLFxuICAgICAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICAgIH0pLFxuICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgICB0cmFuc2Zvcm1PcmlnaW46ICd0b3AgY2VudGVyJyxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogJ3NjYWxlKDApJyxcbiAgICAgICAgICAgIGVhc2luZzogJ2N1YmljLWJlemllcigwLjM0LCAxLjYxLCAwLjcsIDEpJyxcbiAgICAgICAgICAgIG9mZnNldDogMSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgXSlcbiAgICAgICksXG4gICAgXSxcbiAgICB7IHBhcmFtcyB9XG4gICk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZHJvcE91dEFuaW1hdGlvbihvcHRpb25zPzogTWRiQW5pbWF0aW9uT3B0aW9ucyk6IEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSB7XG4gIG9wdGlvbnMgPSBnZXRPcHRpb25zKG9wdGlvbnMsIGRyb3BPdXRPcHRpb25zKTtcblxuICByZXR1cm4gdHJpZ2dlcihvcHRpb25zLnRyaWdnZXIsIFt0cmFuc2l0aW9uKCcwID0+IDEnLCBbdXNlQW5pbWF0aW9uKGRyb3BPdXQob3B0aW9ucykpXSldKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRyb3BPdXRMZWF2ZUFuaW1hdGlvbihvcHRpb25zPzogTWRiQW5pbWF0aW9uT3B0aW9ucyk6IEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSB7XG4gIG9wdGlvbnMgPSBnZXRPcHRpb25zKG9wdGlvbnMsIGRyb3BPdXRMZWF2ZU9wdGlvbnMpO1xuXG4gIHJldHVybiB0cmlnZ2VyKG9wdGlvbnMudHJpZ2dlciwgW3RyYW5zaXRpb24oJzpsZWF2ZScsIFt1c2VBbmltYXRpb24oZHJvcE91dChvcHRpb25zKSldKV0pO1xufVxuIl19