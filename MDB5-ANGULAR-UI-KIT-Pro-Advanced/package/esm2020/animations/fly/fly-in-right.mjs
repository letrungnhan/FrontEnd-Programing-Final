import { animate, keyframes, style, transition, trigger, animation, useAnimation, } from '@angular/animations';
import { getOptions } from '../animations.utils';
const flyInRightOptions = {
    trigger: 'flyInRight',
    delay: 0,
    duration: 500,
};
const flyInRightEnterOptions = {
    trigger: 'flyInRightEnter',
    delay: 0,
    duration: 500,
};
const flyInRight = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({
                opacity: 0,
                transform: 'translate3d(-1500px, 0, 0)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 0,
            }),
            style({
                opacity: 1,
                transform: 'translate3d(25px, 0, 0)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 0.6,
            }),
            style({
                transform: 'transform: translate3d(-10px, 0, 0)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 0.75,
            }),
            style({
                opacity: 1,
                transform: 'transform: translate3d(5px, 0, 0)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 0.9,
            }),
            style({
                opacity: 1,
                transform: 'transform: translate3d(0, 0, 0)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 1,
            }),
        ])),
    ], { params });
};
export function flyInRightAnimation(options) {
    options = getOptions(options, flyInRightOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(flyInRight(options))])]);
}
export function flyInRightEnterAnimation(options) {
    options = getOptions(options, flyInRightEnterOptions);
    return trigger(options.trigger, [transition(':enter', [useAnimation(flyInRight(options))])]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmx5LWluLXJpZ2h0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L2FuaW1hdGlvbnMvZmx5L2ZseS1pbi1yaWdodC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsT0FBTyxFQUVQLFNBQVMsRUFDVCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sRUFDUCxTQUFTLEVBQ1QsWUFBWSxHQUViLE1BQU0scUJBQXFCLENBQUM7QUFFN0IsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRWpELE1BQU0saUJBQWlCLEdBQXdCO0lBQzdDLE9BQU8sRUFBRSxZQUFZO0lBQ3JCLEtBQUssRUFBRSxDQUFDO0lBQ1IsUUFBUSxFQUFFLEdBQUc7Q0FDZCxDQUFDO0FBRUYsTUFBTSxzQkFBc0IsR0FBd0I7SUFDbEQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixLQUFLLEVBQUUsQ0FBQztJQUNSLFFBQVEsRUFBRSxHQUFHO0NBQ2QsQ0FBQztBQUVGLE1BQU0sVUFBVSxHQUFHLENBQUMsT0FBNEIsRUFBOEIsRUFBRTtJQUM5RSxNQUFNLE1BQU0sR0FBRztRQUNiLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSztRQUNwQixRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7S0FDM0IsQ0FBQztJQUVGLE9BQU8sU0FBUyxDQUNkO1FBQ0UsT0FBTyxDQUNMLDRCQUE0QixFQUM1QixTQUFTLENBQUM7WUFDUixLQUFLLENBQUM7Z0JBQ0osT0FBTyxFQUFFLENBQUM7Z0JBQ1YsU0FBUyxFQUFFLDRCQUE0QjtnQkFDdkMsTUFBTSxFQUFFLHFDQUFxQztnQkFDN0MsTUFBTSxFQUFFLENBQUM7YUFDVixDQUFDO1lBQ0YsS0FBSyxDQUFDO2dCQUNKLE9BQU8sRUFBRSxDQUFDO2dCQUNWLFNBQVMsRUFBRSx5QkFBeUI7Z0JBQ3BDLE1BQU0sRUFBRSxxQ0FBcUM7Z0JBQzdDLE1BQU0sRUFBRSxHQUFHO2FBQ1osQ0FBQztZQUNGLEtBQUssQ0FBQztnQkFDSixTQUFTLEVBQUUscUNBQXFDO2dCQUNoRCxNQUFNLEVBQUUscUNBQXFDO2dCQUM3QyxNQUFNLEVBQUUsSUFBSTthQUNiLENBQUM7WUFDRixLQUFLLENBQUM7Z0JBQ0osT0FBTyxFQUFFLENBQUM7Z0JBQ1YsU0FBUyxFQUFFLG1DQUFtQztnQkFDOUMsTUFBTSxFQUFFLHFDQUFxQztnQkFDN0MsTUFBTSxFQUFFLEdBQUc7YUFDWixDQUFDO1lBQ0YsS0FBSyxDQUFDO2dCQUNKLE9BQU8sRUFBRSxDQUFDO2dCQUNWLFNBQVMsRUFBRSxpQ0FBaUM7Z0JBQzVDLE1BQU0sRUFBRSxxQ0FBcUM7Z0JBQzdDLE1BQU0sRUFBRSxDQUFDO2FBQ1YsQ0FBQztTQUNILENBQUMsQ0FDSDtLQUNGLEVBQ0QsRUFBRSxNQUFNLEVBQUUsQ0FDWCxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsTUFBTSxVQUFVLG1CQUFtQixDQUFDLE9BQTZCO0lBQy9ELE9BQU8sR0FBRyxVQUFVLENBQUMsT0FBTyxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFFakQsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvRixDQUFDO0FBRUQsTUFBTSxVQUFVLHdCQUF3QixDQUFDLE9BQTZCO0lBQ3BFLE9BQU8sR0FBRyxVQUFVLENBQUMsT0FBTyxFQUFFLHNCQUFzQixDQUFDLENBQUM7SUFFdEQsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgYW5pbWF0ZSxcbiAgQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhLFxuICBrZXlmcmFtZXMsXG4gIHN0eWxlLFxuICB0cmFuc2l0aW9uLFxuICB0cmlnZ2VyLFxuICBhbmltYXRpb24sXG4gIHVzZUFuaW1hdGlvbixcbiAgQW5pbWF0aW9uUmVmZXJlbmNlTWV0YWRhdGEsXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgTWRiQW5pbWF0aW9uT3B0aW9ucyB9IGZyb20gJy4uL2FuaW1hdGlvbi5vcHRpb25zJztcbmltcG9ydCB7IGdldE9wdGlvbnMgfSBmcm9tICcuLi9hbmltYXRpb25zLnV0aWxzJztcblxuY29uc3QgZmx5SW5SaWdodE9wdGlvbnM6IE1kYkFuaW1hdGlvbk9wdGlvbnMgPSB7XG4gIHRyaWdnZXI6ICdmbHlJblJpZ2h0JyxcbiAgZGVsYXk6IDAsXG4gIGR1cmF0aW9uOiA1MDAsXG59O1xuXG5jb25zdCBmbHlJblJpZ2h0RW50ZXJPcHRpb25zOiBNZGJBbmltYXRpb25PcHRpb25zID0ge1xuICB0cmlnZ2VyOiAnZmx5SW5SaWdodEVudGVyJyxcbiAgZGVsYXk6IDAsXG4gIGR1cmF0aW9uOiA1MDAsXG59O1xuXG5jb25zdCBmbHlJblJpZ2h0ID0gKG9wdGlvbnM6IE1kYkFuaW1hdGlvbk9wdGlvbnMpOiBBbmltYXRpb25SZWZlcmVuY2VNZXRhZGF0YSA9PiB7XG4gIGNvbnN0IHBhcmFtcyA9IHtcbiAgICBkZWxheTogb3B0aW9ucy5kZWxheSxcbiAgICBkdXJhdGlvbjogb3B0aW9ucy5kdXJhdGlvbixcbiAgfTtcblxuICByZXR1cm4gYW5pbWF0aW9uKFxuICAgIFtcbiAgICAgIGFuaW1hdGUoXG4gICAgICAgICd7e2R1cmF0aW9ufX1tcyB7e2RlbGF5fX1tcycsXG4gICAgICAgIGtleWZyYW1lcyhbXG4gICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKC0xNTAwcHgsIDAsIDApJyxcbiAgICAgICAgICAgIGVhc2luZzogJ2N1YmljLWJlemllcigwLjIxNSwgMC42MSwgMC4zNTUsIDEpJyxcbiAgICAgICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMjVweCwgMCwgMCknLFxuICAgICAgICAgICAgZWFzaW5nOiAnY3ViaWMtYmV6aWVyKDAuMjE1LCAwLjYxLCAwLjM1NSwgMSknLFxuICAgICAgICAgICAgb2Zmc2V0OiAwLjYsXG4gICAgICAgICAgfSksXG4gICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgtMTBweCwgMCwgMCknLFxuICAgICAgICAgICAgZWFzaW5nOiAnY3ViaWMtYmV6aWVyKDAuMjE1LCAwLjYxLCAwLjM1NSwgMSknLFxuICAgICAgICAgICAgb2Zmc2V0OiAwLjc1LFxuICAgICAgICAgIH0pLFxuICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDVweCwgMCwgMCknLFxuICAgICAgICAgICAgZWFzaW5nOiAnY3ViaWMtYmV6aWVyKDAuMjE1LCAwLjYxLCAwLjM1NSwgMSknLFxuICAgICAgICAgICAgb2Zmc2V0OiAwLjksXG4gICAgICAgICAgfSksXG4gICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCknLFxuICAgICAgICAgICAgZWFzaW5nOiAnY3ViaWMtYmV6aWVyKDAuMjE1LCAwLjYxLCAwLjM1NSwgMSknLFxuICAgICAgICAgICAgb2Zmc2V0OiAxLFxuICAgICAgICAgIH0pLFxuICAgICAgICBdKVxuICAgICAgKSxcbiAgICBdLFxuICAgIHsgcGFyYW1zIH1cbiAgKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBmbHlJblJpZ2h0QW5pbWF0aW9uKG9wdGlvbnM/OiBNZGJBbmltYXRpb25PcHRpb25zKTogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhIHtcbiAgb3B0aW9ucyA9IGdldE9wdGlvbnMob3B0aW9ucywgZmx5SW5SaWdodE9wdGlvbnMpO1xuXG4gIHJldHVybiB0cmlnZ2VyKG9wdGlvbnMudHJpZ2dlciwgW3RyYW5zaXRpb24oJzAgPT4gMScsIFt1c2VBbmltYXRpb24oZmx5SW5SaWdodChvcHRpb25zKSldKV0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmx5SW5SaWdodEVudGVyQW5pbWF0aW9uKG9wdGlvbnM/OiBNZGJBbmltYXRpb25PcHRpb25zKTogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhIHtcbiAgb3B0aW9ucyA9IGdldE9wdGlvbnMob3B0aW9ucywgZmx5SW5SaWdodEVudGVyT3B0aW9ucyk7XG5cbiAgcmV0dXJuIHRyaWdnZXIob3B0aW9ucy50cmlnZ2VyLCBbdHJhbnNpdGlvbignOmVudGVyJywgW3VzZUFuaW1hdGlvbihmbHlJblJpZ2h0KG9wdGlvbnMpKV0pXSk7XG59XG4iXX0=