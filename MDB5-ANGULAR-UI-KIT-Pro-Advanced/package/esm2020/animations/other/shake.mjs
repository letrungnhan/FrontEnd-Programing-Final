import { animate, keyframes, style, transition, trigger, animation, useAnimation, } from '@angular/animations';
import { getOptions } from '../animations.utils';
const shakeOptions = {
    trigger: 'shake',
    delay: 0,
    duration: 500,
};
const shakeEnterOptions = {
    trigger: 'shakeEnter',
    delay: 0,
    duration: 500,
};
const shake = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({ transform: 'translateX(0)', easing: 'ease', offset: 0 }),
            style({ transform: 'translateX(-10px)', easing: 'ease', offset: 0.1 }),
            style({ transform: 'translateX(10px)', easing: 'ease', offset: 0.2 }),
            style({ transform: 'translateX(-10px)', easing: 'ease', offset: 0.3 }),
            style({ transform: 'translateX(10px)', easing: 'ease', offset: 0.4 }),
            style({ transform: 'translateX(-10px)', easing: 'ease', offset: 0.5 }),
            style({ transform: 'translateX(10px)', easing: 'ease', offset: 0.6 }),
            style({ transform: 'translateX(-10px)', easing: 'ease', offset: 0.7 }),
            style({ transform: 'translateX(10px)', easing: 'ease', offset: 0.8 }),
            style({ transform: 'translateX(-10px)', easing: 'ease', offset: 0.9 }),
            style({ transform: 'translateX(0)', easing: 'ease', offset: 1 }),
        ])),
    ], { params });
};
export function shakeAnimation(options) {
    options = getOptions(options, shakeOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(shake(options))])]);
}
export function shakeEnterAnimation(options) {
    options = getOptions(options, shakeEnterOptions);
    return trigger(options.trigger, [transition(':enter', [useAnimation(shake(options))])]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hha2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvYW5pbWF0aW9ucy9vdGhlci9zaGFrZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsT0FBTyxFQUVQLFNBQVMsRUFDVCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sRUFDUCxTQUFTLEVBQ1QsWUFBWSxHQUViLE1BQU0scUJBQXFCLENBQUM7QUFFN0IsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRWpELE1BQU0sWUFBWSxHQUF3QjtJQUN4QyxPQUFPLEVBQUUsT0FBTztJQUNoQixLQUFLLEVBQUUsQ0FBQztJQUNSLFFBQVEsRUFBRSxHQUFHO0NBQ2QsQ0FBQztBQUVGLE1BQU0saUJBQWlCLEdBQXdCO0lBQzdDLE9BQU8sRUFBRSxZQUFZO0lBQ3JCLEtBQUssRUFBRSxDQUFDO0lBQ1IsUUFBUSxFQUFFLEdBQUc7Q0FDZCxDQUFDO0FBRUYsTUFBTSxLQUFLLEdBQUcsQ0FBQyxPQUE0QixFQUE4QixFQUFFO0lBQ3pFLE1BQU0sTUFBTSxHQUFHO1FBQ2IsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO1FBQ3BCLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUTtLQUMzQixDQUFDO0lBRUYsT0FBTyxTQUFTLENBQ2Q7UUFDRSxPQUFPLENBQ0wsNEJBQTRCLEVBQzVCLFNBQVMsQ0FBQztZQUNSLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDaEUsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDO1lBQ3RFLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUNyRSxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFDdEUsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDO1lBQ3JFLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUN0RSxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFDckUsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDO1lBQ3RFLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUNyRSxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFDdEUsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztTQUNqRSxDQUFDLENBQ0g7S0FDRixFQUNELEVBQUUsTUFBTSxFQUFFLENBQ1gsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLE1BQU0sVUFBVSxjQUFjLENBQUMsT0FBNkI7SUFDMUQsT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFFNUMsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxRixDQUFDO0FBRUQsTUFBTSxVQUFVLG1CQUFtQixDQUFDLE9BQTZCO0lBQy9ELE9BQU8sR0FBRyxVQUFVLENBQUMsT0FBTyxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFFakQsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgYW5pbWF0ZSxcbiAgQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhLFxuICBrZXlmcmFtZXMsXG4gIHN0eWxlLFxuICB0cmFuc2l0aW9uLFxuICB0cmlnZ2VyLFxuICBhbmltYXRpb24sXG4gIHVzZUFuaW1hdGlvbixcbiAgQW5pbWF0aW9uUmVmZXJlbmNlTWV0YWRhdGEsXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgTWRiQW5pbWF0aW9uT3B0aW9ucyB9IGZyb20gJy4uL2FuaW1hdGlvbi5vcHRpb25zJztcbmltcG9ydCB7IGdldE9wdGlvbnMgfSBmcm9tICcuLi9hbmltYXRpb25zLnV0aWxzJztcblxuY29uc3Qgc2hha2VPcHRpb25zOiBNZGJBbmltYXRpb25PcHRpb25zID0ge1xuICB0cmlnZ2VyOiAnc2hha2UnLFxuICBkZWxheTogMCxcbiAgZHVyYXRpb246IDUwMCxcbn07XG5cbmNvbnN0IHNoYWtlRW50ZXJPcHRpb25zOiBNZGJBbmltYXRpb25PcHRpb25zID0ge1xuICB0cmlnZ2VyOiAnc2hha2VFbnRlcicsXG4gIGRlbGF5OiAwLFxuICBkdXJhdGlvbjogNTAwLFxufTtcblxuY29uc3Qgc2hha2UgPSAob3B0aW9uczogTWRiQW5pbWF0aW9uT3B0aW9ucyk6IEFuaW1hdGlvblJlZmVyZW5jZU1ldGFkYXRhID0+IHtcbiAgY29uc3QgcGFyYW1zID0ge1xuICAgIGRlbGF5OiBvcHRpb25zLmRlbGF5LFxuICAgIGR1cmF0aW9uOiBvcHRpb25zLmR1cmF0aW9uLFxuICB9O1xuXG4gIHJldHVybiBhbmltYXRpb24oXG4gICAgW1xuICAgICAgYW5pbWF0ZShcbiAgICAgICAgJ3t7ZHVyYXRpb259fW1zIHt7ZGVsYXl9fW1zJyxcbiAgICAgICAga2V5ZnJhbWVzKFtcbiAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCknLCBlYXNpbmc6ICdlYXNlJywgb2Zmc2V0OiAwIH0pLFxuICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtMTBweCknLCBlYXNpbmc6ICdlYXNlJywgb2Zmc2V0OiAwLjEgfSksXG4gICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDEwcHgpJywgZWFzaW5nOiAnZWFzZScsIG9mZnNldDogMC4yIH0pLFxuICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtMTBweCknLCBlYXNpbmc6ICdlYXNlJywgb2Zmc2V0OiAwLjMgfSksXG4gICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDEwcHgpJywgZWFzaW5nOiAnZWFzZScsIG9mZnNldDogMC40IH0pLFxuICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtMTBweCknLCBlYXNpbmc6ICdlYXNlJywgb2Zmc2V0OiAwLjUgfSksXG4gICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDEwcHgpJywgZWFzaW5nOiAnZWFzZScsIG9mZnNldDogMC42IH0pLFxuICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtMTBweCknLCBlYXNpbmc6ICdlYXNlJywgb2Zmc2V0OiAwLjcgfSksXG4gICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDEwcHgpJywgZWFzaW5nOiAnZWFzZScsIG9mZnNldDogMC44IH0pLFxuICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtMTBweCknLCBlYXNpbmc6ICdlYXNlJywgb2Zmc2V0OiAwLjkgfSksXG4gICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDApJywgZWFzaW5nOiAnZWFzZScsIG9mZnNldDogMSB9KSxcbiAgICAgICAgXSlcbiAgICAgICksXG4gICAgXSxcbiAgICB7IHBhcmFtcyB9XG4gICk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gc2hha2VBbmltYXRpb24ob3B0aW9ucz86IE1kYkFuaW1hdGlvbk9wdGlvbnMpOiBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEge1xuICBvcHRpb25zID0gZ2V0T3B0aW9ucyhvcHRpb25zLCBzaGFrZU9wdGlvbnMpO1xuXG4gIHJldHVybiB0cmlnZ2VyKG9wdGlvbnMudHJpZ2dlciwgW3RyYW5zaXRpb24oJzAgPT4gMScsIFt1c2VBbmltYXRpb24oc2hha2Uob3B0aW9ucykpXSldKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNoYWtlRW50ZXJBbmltYXRpb24ob3B0aW9ucz86IE1kYkFuaW1hdGlvbk9wdGlvbnMpOiBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEge1xuICBvcHRpb25zID0gZ2V0T3B0aW9ucyhvcHRpb25zLCBzaGFrZUVudGVyT3B0aW9ucyk7XG5cbiAgcmV0dXJuIHRyaWdnZXIob3B0aW9ucy50cmlnZ2VyLCBbdHJhbnNpdGlvbignOmVudGVyJywgW3VzZUFuaW1hdGlvbihzaGFrZShvcHRpb25zKSldKV0pO1xufVxuIl19