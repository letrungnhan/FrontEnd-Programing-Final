import { animate, keyframes, style, transition, trigger, animation, useAnimation, } from '@angular/animations';
import { getOptions } from '../animations.utils';
const fadeInUpOptions = {
    trigger: 'fadeInUp',
    delay: 0,
    duration: 500,
};
const fadeInUpEnterOptions = {
    trigger: 'fadeInUpEnter',
    delay: 0,
    duration: 500,
};
const fadeInUp = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({ opacity: 0, transform: 'translate3d(0, 100%, 0)', easing: 'ease', offset: 0 }),
            style({ opacity: 1, transform: 'translate3d(0, 0, 0)', easing: 'ease', offset: 1 }),
        ])),
    ], { params });
};
export function fadeInUpAnimation(options) {
    options = getOptions(options, fadeInUpOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(fadeInUp(options))])]);
}
export function fadeInUpEnterAnimation(options) {
    options = getOptions(options, fadeInUpEnterOptions);
    return trigger(options.trigger, [transition(':enter', [useAnimation(fadeInUp(options))])]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFkZS1pbi11cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9hbmltYXRpb25zL2ZhZGUvZmFkZS1pbi11cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsT0FBTyxFQUVQLFNBQVMsRUFDVCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sRUFDUCxTQUFTLEVBQ1QsWUFBWSxHQUViLE1BQU0scUJBQXFCLENBQUM7QUFFN0IsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRWpELE1BQU0sZUFBZSxHQUF3QjtJQUMzQyxPQUFPLEVBQUUsVUFBVTtJQUNuQixLQUFLLEVBQUUsQ0FBQztJQUNSLFFBQVEsRUFBRSxHQUFHO0NBQ2QsQ0FBQztBQUVGLE1BQU0sb0JBQW9CLEdBQXdCO0lBQ2hELE9BQU8sRUFBRSxlQUFlO0lBQ3hCLEtBQUssRUFBRSxDQUFDO0lBQ1IsUUFBUSxFQUFFLEdBQUc7Q0FDZCxDQUFDO0FBRUYsTUFBTSxRQUFRLEdBQUcsQ0FBQyxPQUE0QixFQUE4QixFQUFFO0lBQzVFLE1BQU0sTUFBTSxHQUFHO1FBQ2IsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO1FBQ3BCLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUTtLQUMzQixDQUFDO0lBRUYsT0FBTyxTQUFTLENBQ2Q7UUFDRSxPQUFPLENBQ0wsNEJBQTRCLEVBQzVCLFNBQVMsQ0FBQztZQUNSLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQ3RGLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO1NBQ3BGLENBQUMsQ0FDSDtLQUNGLEVBQ0QsRUFBRSxNQUFNLEVBQUUsQ0FDWCxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsTUFBTSxVQUFVLGlCQUFpQixDQUFDLE9BQTZCO0lBQzdELE9BQU8sR0FBRyxVQUFVLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBRS9DLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDN0YsQ0FBQztBQUVELE1BQU0sVUFBVSxzQkFBc0IsQ0FBQyxPQUE2QjtJQUNsRSxPQUFPLEdBQUcsVUFBVSxDQUFDLE9BQU8sRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0lBRXBELE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDN0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIGFuaW1hdGUsXG4gIEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSxcbiAga2V5ZnJhbWVzLFxuICBzdHlsZSxcbiAgdHJhbnNpdGlvbixcbiAgdHJpZ2dlcixcbiAgYW5pbWF0aW9uLFxuICB1c2VBbmltYXRpb24sXG4gIEFuaW1hdGlvblJlZmVyZW5jZU1ldGFkYXRhLFxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IE1kYkFuaW1hdGlvbk9wdGlvbnMgfSBmcm9tICcuLi9hbmltYXRpb24ub3B0aW9ucyc7XG5pbXBvcnQgeyBnZXRPcHRpb25zIH0gZnJvbSAnLi4vYW5pbWF0aW9ucy51dGlscyc7XG5cbmNvbnN0IGZhZGVJblVwT3B0aW9uczogTWRiQW5pbWF0aW9uT3B0aW9ucyA9IHtcbiAgdHJpZ2dlcjogJ2ZhZGVJblVwJyxcbiAgZGVsYXk6IDAsXG4gIGR1cmF0aW9uOiA1MDAsXG59O1xuXG5jb25zdCBmYWRlSW5VcEVudGVyT3B0aW9uczogTWRiQW5pbWF0aW9uT3B0aW9ucyA9IHtcbiAgdHJpZ2dlcjogJ2ZhZGVJblVwRW50ZXInLFxuICBkZWxheTogMCxcbiAgZHVyYXRpb246IDUwMCxcbn07XG5cbmNvbnN0IGZhZGVJblVwID0gKG9wdGlvbnM6IE1kYkFuaW1hdGlvbk9wdGlvbnMpOiBBbmltYXRpb25SZWZlcmVuY2VNZXRhZGF0YSA9PiB7XG4gIGNvbnN0IHBhcmFtcyA9IHtcbiAgICBkZWxheTogb3B0aW9ucy5kZWxheSxcbiAgICBkdXJhdGlvbjogb3B0aW9ucy5kdXJhdGlvbixcbiAgfTtcblxuICByZXR1cm4gYW5pbWF0aW9uKFxuICAgIFtcbiAgICAgIGFuaW1hdGUoXG4gICAgICAgICd7e2R1cmF0aW9ufX1tcyB7e2RlbGF5fX1tcycsXG4gICAgICAgIGtleWZyYW1lcyhbXG4gICAgICAgICAgc3R5bGUoeyBvcGFjaXR5OiAwLCB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgwLCAxMDAlLCAwKScsIGVhc2luZzogJ2Vhc2UnLCBvZmZzZXQ6IDAgfSksXG4gICAgICAgICAgc3R5bGUoeyBvcGFjaXR5OiAxLCB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgwLCAwLCAwKScsIGVhc2luZzogJ2Vhc2UnLCBvZmZzZXQ6IDEgfSksXG4gICAgICAgIF0pXG4gICAgICApLFxuICAgIF0sXG4gICAgeyBwYXJhbXMgfVxuICApO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGZhZGVJblVwQW5pbWF0aW9uKG9wdGlvbnM/OiBNZGJBbmltYXRpb25PcHRpb25zKTogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhIHtcbiAgb3B0aW9ucyA9IGdldE9wdGlvbnMob3B0aW9ucywgZmFkZUluVXBPcHRpb25zKTtcblxuICByZXR1cm4gdHJpZ2dlcihvcHRpb25zLnRyaWdnZXIsIFt0cmFuc2l0aW9uKCcwID0+IDEnLCBbdXNlQW5pbWF0aW9uKGZhZGVJblVwKG9wdGlvbnMpKV0pXSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmYWRlSW5VcEVudGVyQW5pbWF0aW9uKG9wdGlvbnM/OiBNZGJBbmltYXRpb25PcHRpb25zKTogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhIHtcbiAgb3B0aW9ucyA9IGdldE9wdGlvbnMob3B0aW9ucywgZmFkZUluVXBFbnRlck9wdGlvbnMpO1xuXG4gIHJldHVybiB0cmlnZ2VyKG9wdGlvbnMudHJpZ2dlciwgW3RyYW5zaXRpb24oJzplbnRlcicsIFt1c2VBbmltYXRpb24oZmFkZUluVXAob3B0aW9ucykpXSldKTtcbn1cbiJdfQ==