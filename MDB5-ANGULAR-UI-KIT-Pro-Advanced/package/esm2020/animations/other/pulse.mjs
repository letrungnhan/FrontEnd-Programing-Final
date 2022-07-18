import { animate, keyframes, style, transition, trigger, animation, useAnimation, } from '@angular/animations';
import { getOptions } from '../animations.utils';
const pulseOptions = {
    trigger: 'pulse',
    delay: 0,
    duration: 500,
};
const pulseEnterOptions = {
    trigger: 'pulseEnter',
    delay: 0,
    duration: 500,
};
const pulse = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({ transform: 'scale3d(1, 1, 1)', offset: 0 }),
            style({ transform: 'scale3d(1.05, 1.05, 1.05)', offset: 0.5 }),
            style({ transform: 'scale3d(1, 1, 1)', offset: 1 }),
        ])),
    ], { params });
};
export function pulseAnimation(options) {
    options = getOptions(options, pulseOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(pulse(options))])]);
}
export function pulseEnterAnimation(options) {
    options = getOptions(options, pulseEnterOptions);
    return trigger(options.trigger, [transition(':enter', [useAnimation(pulse(options))])]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVsc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvYW5pbWF0aW9ucy9vdGhlci9wdWxzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsT0FBTyxFQUVQLFNBQVMsRUFDVCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sRUFDUCxTQUFTLEVBQ1QsWUFBWSxHQUViLE1BQU0scUJBQXFCLENBQUM7QUFFN0IsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRWpELE1BQU0sWUFBWSxHQUF3QjtJQUN4QyxPQUFPLEVBQUUsT0FBTztJQUNoQixLQUFLLEVBQUUsQ0FBQztJQUNSLFFBQVEsRUFBRSxHQUFHO0NBQ2QsQ0FBQztBQUVGLE1BQU0saUJBQWlCLEdBQXdCO0lBQzdDLE9BQU8sRUFBRSxZQUFZO0lBQ3JCLEtBQUssRUFBRSxDQUFDO0lBQ1IsUUFBUSxFQUFFLEdBQUc7Q0FDZCxDQUFDO0FBRUYsTUFBTSxLQUFLLEdBQUcsQ0FBQyxPQUE0QixFQUE4QixFQUFFO0lBQ3pFLE1BQU0sTUFBTSxHQUFHO1FBQ2IsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO1FBQ3BCLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUTtLQUMzQixDQUFDO0lBRUYsT0FBTyxTQUFTLENBQ2Q7UUFDRSxPQUFPLENBQ0wsNEJBQTRCLEVBQzVCLFNBQVMsQ0FBQztZQUNSLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDbkQsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUM5RCxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO1NBQ3BELENBQUMsQ0FDSDtLQUNGLEVBQ0QsRUFBRSxNQUFNLEVBQUUsQ0FDWCxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsTUFBTSxVQUFVLGNBQWMsQ0FBQyxPQUE2QjtJQUMxRCxPQUFPLEdBQUcsVUFBVSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztJQUU1QyxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzFGLENBQUM7QUFFRCxNQUFNLFVBQVUsbUJBQW1CLENBQUMsT0FBNkI7SUFDL0QsT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUVqRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzFGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBhbmltYXRlLFxuICBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEsXG4gIGtleWZyYW1lcyxcbiAgc3R5bGUsXG4gIHRyYW5zaXRpb24sXG4gIHRyaWdnZXIsXG4gIGFuaW1hdGlvbixcbiAgdXNlQW5pbWF0aW9uLFxuICBBbmltYXRpb25SZWZlcmVuY2VNZXRhZGF0YSxcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBNZGJBbmltYXRpb25PcHRpb25zIH0gZnJvbSAnLi4vYW5pbWF0aW9uLm9wdGlvbnMnO1xuaW1wb3J0IHsgZ2V0T3B0aW9ucyB9IGZyb20gJy4uL2FuaW1hdGlvbnMudXRpbHMnO1xuXG5jb25zdCBwdWxzZU9wdGlvbnM6IE1kYkFuaW1hdGlvbk9wdGlvbnMgPSB7XG4gIHRyaWdnZXI6ICdwdWxzZScsXG4gIGRlbGF5OiAwLFxuICBkdXJhdGlvbjogNTAwLFxufTtcblxuY29uc3QgcHVsc2VFbnRlck9wdGlvbnM6IE1kYkFuaW1hdGlvbk9wdGlvbnMgPSB7XG4gIHRyaWdnZXI6ICdwdWxzZUVudGVyJyxcbiAgZGVsYXk6IDAsXG4gIGR1cmF0aW9uOiA1MDAsXG59O1xuXG5jb25zdCBwdWxzZSA9IChvcHRpb25zOiBNZGJBbmltYXRpb25PcHRpb25zKTogQW5pbWF0aW9uUmVmZXJlbmNlTWV0YWRhdGEgPT4ge1xuICBjb25zdCBwYXJhbXMgPSB7XG4gICAgZGVsYXk6IG9wdGlvbnMuZGVsYXksXG4gICAgZHVyYXRpb246IG9wdGlvbnMuZHVyYXRpb24sXG4gIH07XG5cbiAgcmV0dXJuIGFuaW1hdGlvbihcbiAgICBbXG4gICAgICBhbmltYXRlKFxuICAgICAgICAne3tkdXJhdGlvbn19bXMge3tkZWxheX19bXMnLFxuICAgICAgICBrZXlmcmFtZXMoW1xuICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAnc2NhbGUzZCgxLCAxLCAxKScsIG9mZnNldDogMCB9KSxcbiAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3NjYWxlM2QoMS4wNSwgMS4wNSwgMS4wNSknLCBvZmZzZXQ6IDAuNSB9KSxcbiAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3NjYWxlM2QoMSwgMSwgMSknLCBvZmZzZXQ6IDEgfSksXG4gICAgICAgIF0pXG4gICAgICApLFxuICAgIF0sXG4gICAgeyBwYXJhbXMgfVxuICApO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHB1bHNlQW5pbWF0aW9uKG9wdGlvbnM/OiBNZGJBbmltYXRpb25PcHRpb25zKTogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhIHtcbiAgb3B0aW9ucyA9IGdldE9wdGlvbnMob3B0aW9ucywgcHVsc2VPcHRpb25zKTtcblxuICByZXR1cm4gdHJpZ2dlcihvcHRpb25zLnRyaWdnZXIsIFt0cmFuc2l0aW9uKCcwID0+IDEnLCBbdXNlQW5pbWF0aW9uKHB1bHNlKG9wdGlvbnMpKV0pXSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwdWxzZUVudGVyQW5pbWF0aW9uKG9wdGlvbnM/OiBNZGJBbmltYXRpb25PcHRpb25zKTogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhIHtcbiAgb3B0aW9ucyA9IGdldE9wdGlvbnMob3B0aW9ucywgcHVsc2VFbnRlck9wdGlvbnMpO1xuXG4gIHJldHVybiB0cmlnZ2VyKG9wdGlvbnMudHJpZ2dlciwgW3RyYW5zaXRpb24oJzplbnRlcicsIFt1c2VBbmltYXRpb24ocHVsc2Uob3B0aW9ucykpXSldKTtcbn1cbiJdfQ==