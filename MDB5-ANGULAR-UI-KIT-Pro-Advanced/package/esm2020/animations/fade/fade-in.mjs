import { animate, keyframes, style, transition, trigger, animation, useAnimation, } from '@angular/animations';
import { getOptions } from '../animations.utils';
const fadeInOptions = {
    trigger: 'fadeIn',
    delay: 0,
    duration: 500,
};
const fadeInEnterOptions = {
    trigger: 'fadeInEnter',
    delay: 0,
    duration: 500,
};
const fadeIn = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([style({ opacity: 0, offset: 0 }), style({ opacity: 1, offset: 1 })])),
    ], { params });
};
export function fadeInAnimation(options) {
    options = getOptions(options, fadeInOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(fadeIn(options))])]);
}
export function fadeInEnterAnimation(options) {
    options = getOptions(options, fadeInEnterOptions);
    return trigger(options.trigger, [transition(':enter', [useAnimation(fadeIn(options))])]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFkZS1pbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9hbmltYXRpb25zL2ZhZGUvZmFkZS1pbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsT0FBTyxFQUVQLFNBQVMsRUFDVCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sRUFDUCxTQUFTLEVBQ1QsWUFBWSxHQUViLE1BQU0scUJBQXFCLENBQUM7QUFFN0IsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRWpELE1BQU0sYUFBYSxHQUF3QjtJQUN6QyxPQUFPLEVBQUUsUUFBUTtJQUNqQixLQUFLLEVBQUUsQ0FBQztJQUNSLFFBQVEsRUFBRSxHQUFHO0NBQ2QsQ0FBQztBQUVGLE1BQU0sa0JBQWtCLEdBQXdCO0lBQzlDLE9BQU8sRUFBRSxhQUFhO0lBQ3RCLEtBQUssRUFBRSxDQUFDO0lBQ1IsUUFBUSxFQUFFLEdBQUc7Q0FDZCxDQUFDO0FBRUYsTUFBTSxNQUFNLEdBQUcsQ0FBQyxPQUE0QixFQUE4QixFQUFFO0lBQzFFLE1BQU0sTUFBTSxHQUFHO1FBQ2IsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO1FBQ3BCLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUTtLQUMzQixDQUFDO0lBRUYsT0FBTyxTQUFTLENBQ2Q7UUFDRSxPQUFPLENBQ0wsNEJBQTRCLEVBQzVCLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQ2hGO0tBQ0YsRUFDRCxFQUFFLE1BQU0sRUFBRSxDQUNYLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixNQUFNLFVBQVUsZUFBZSxDQUFDLE9BQTZCO0lBQzNELE9BQU8sR0FBRyxVQUFVLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBRTdDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDM0YsQ0FBQztBQUVELE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxPQUE2QjtJQUNoRSxPQUFPLEdBQUcsVUFBVSxDQUFDLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0lBRWxELE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDM0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIGFuaW1hdGUsXG4gIEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSxcbiAga2V5ZnJhbWVzLFxuICBzdHlsZSxcbiAgdHJhbnNpdGlvbixcbiAgdHJpZ2dlcixcbiAgYW5pbWF0aW9uLFxuICB1c2VBbmltYXRpb24sXG4gIEFuaW1hdGlvblJlZmVyZW5jZU1ldGFkYXRhLFxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IE1kYkFuaW1hdGlvbk9wdGlvbnMgfSBmcm9tICcuLi9hbmltYXRpb24ub3B0aW9ucyc7XG5pbXBvcnQgeyBnZXRPcHRpb25zIH0gZnJvbSAnLi4vYW5pbWF0aW9ucy51dGlscyc7XG5cbmNvbnN0IGZhZGVJbk9wdGlvbnM6IE1kYkFuaW1hdGlvbk9wdGlvbnMgPSB7XG4gIHRyaWdnZXI6ICdmYWRlSW4nLFxuICBkZWxheTogMCxcbiAgZHVyYXRpb246IDUwMCxcbn07XG5cbmNvbnN0IGZhZGVJbkVudGVyT3B0aW9uczogTWRiQW5pbWF0aW9uT3B0aW9ucyA9IHtcbiAgdHJpZ2dlcjogJ2ZhZGVJbkVudGVyJyxcbiAgZGVsYXk6IDAsXG4gIGR1cmF0aW9uOiA1MDAsXG59O1xuXG5jb25zdCBmYWRlSW4gPSAob3B0aW9uczogTWRiQW5pbWF0aW9uT3B0aW9ucyk6IEFuaW1hdGlvblJlZmVyZW5jZU1ldGFkYXRhID0+IHtcbiAgY29uc3QgcGFyYW1zID0ge1xuICAgIGRlbGF5OiBvcHRpb25zLmRlbGF5LFxuICAgIGR1cmF0aW9uOiBvcHRpb25zLmR1cmF0aW9uLFxuICB9O1xuXG4gIHJldHVybiBhbmltYXRpb24oXG4gICAgW1xuICAgICAgYW5pbWF0ZShcbiAgICAgICAgJ3t7ZHVyYXRpb259fW1zIHt7ZGVsYXl9fW1zJyxcbiAgICAgICAga2V5ZnJhbWVzKFtzdHlsZSh7IG9wYWNpdHk6IDAsIG9mZnNldDogMCB9KSwgc3R5bGUoeyBvcGFjaXR5OiAxLCBvZmZzZXQ6IDEgfSldKVxuICAgICAgKSxcbiAgICBdLFxuICAgIHsgcGFyYW1zIH1cbiAgKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBmYWRlSW5BbmltYXRpb24ob3B0aW9ucz86IE1kYkFuaW1hdGlvbk9wdGlvbnMpOiBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEge1xuICBvcHRpb25zID0gZ2V0T3B0aW9ucyhvcHRpb25zLCBmYWRlSW5PcHRpb25zKTtcblxuICByZXR1cm4gdHJpZ2dlcihvcHRpb25zLnRyaWdnZXIsIFt0cmFuc2l0aW9uKCcwID0+IDEnLCBbdXNlQW5pbWF0aW9uKGZhZGVJbihvcHRpb25zKSldKV0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmFkZUluRW50ZXJBbmltYXRpb24ob3B0aW9ucz86IE1kYkFuaW1hdGlvbk9wdGlvbnMpOiBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEge1xuICBvcHRpb25zID0gZ2V0T3B0aW9ucyhvcHRpb25zLCBmYWRlSW5FbnRlck9wdGlvbnMpO1xuXG4gIHJldHVybiB0cmlnZ2VyKG9wdGlvbnMudHJpZ2dlciwgW3RyYW5zaXRpb24oJzplbnRlcicsIFt1c2VBbmltYXRpb24oZmFkZUluKG9wdGlvbnMpKV0pXSk7XG59XG4iXX0=