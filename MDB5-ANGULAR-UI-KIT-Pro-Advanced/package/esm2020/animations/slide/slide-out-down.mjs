import { animate, keyframes, style, transition, trigger, animation, useAnimation, } from '@angular/animations';
import { getOptions } from '../animations.utils';
const slideOutDownOptions = {
    trigger: 'slideOutDown',
    delay: 0,
    duration: 500,
};
const slideOutDownLeaveOptions = {
    trigger: 'slideOutDownLeave',
    delay: 0,
    duration: 500,
};
const slideOutDown = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({ transform: 'translate3d(0, 0, 0)', easing: 'ease', offset: 0 }),
            style({
                visibility: 'hidden',
                transform: 'translate3d(0, 100%, 0)',
                easing: 'ease',
                offset: 1,
            }),
        ])),
    ], { params });
};
export function slideOutDownAnimation(options) {
    options = getOptions(options, slideOutDownOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(slideOutDown(options))])]);
}
export function slideOutDownLeaveAnimation(options) {
    options = getOptions(options, slideOutDownLeaveOptions);
    return trigger(options.trigger, [transition(':leave', [useAnimation(slideOutDown(options))])]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUtb3V0LWRvd24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvYW5pbWF0aW9ucy9zbGlkZS9zbGlkZS1vdXQtZG93bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsT0FBTyxFQUVQLFNBQVMsRUFDVCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE9BQU8sRUFDUCxTQUFTLEVBQ1QsWUFBWSxHQUViLE1BQU0scUJBQXFCLENBQUM7QUFFN0IsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRWpELE1BQU0sbUJBQW1CLEdBQXdCO0lBQy9DLE9BQU8sRUFBRSxjQUFjO0lBQ3ZCLEtBQUssRUFBRSxDQUFDO0lBQ1IsUUFBUSxFQUFFLEdBQUc7Q0FDZCxDQUFDO0FBRUYsTUFBTSx3QkFBd0IsR0FBd0I7SUFDcEQsT0FBTyxFQUFFLG1CQUFtQjtJQUM1QixLQUFLLEVBQUUsQ0FBQztJQUNSLFFBQVEsRUFBRSxHQUFHO0NBQ2QsQ0FBQztBQUVGLE1BQU0sWUFBWSxHQUFHLENBQUMsT0FBNEIsRUFBOEIsRUFBRTtJQUNoRixNQUFNLE1BQU0sR0FBRztRQUNiLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSztRQUNwQixRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7S0FDM0IsQ0FBQztJQUVGLE9BQU8sU0FBUyxDQUNkO1FBQ0UsT0FBTyxDQUNMLDRCQUE0QixFQUM1QixTQUFTLENBQUM7WUFDUixLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDdkUsS0FBSyxDQUFDO2dCQUNKLFVBQVUsRUFBRSxRQUFRO2dCQUNwQixTQUFTLEVBQUUseUJBQXlCO2dCQUNwQyxNQUFNLEVBQUUsTUFBTTtnQkFDZCxNQUFNLEVBQUUsQ0FBQzthQUNWLENBQUM7U0FDSCxDQUFDLENBQ0g7S0FDRixFQUNELEVBQUUsTUFBTSxFQUFFLENBQ1gsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLE1BQU0sVUFBVSxxQkFBcUIsQ0FBQyxPQUE2QjtJQUNqRSxPQUFPLEdBQUcsVUFBVSxDQUFDLE9BQU8sRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0lBRW5ELE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakcsQ0FBQztBQUVELE1BQU0sVUFBVSwwQkFBMEIsQ0FDeEMsT0FBNkI7SUFFN0IsT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztJQUV4RCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pHLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBhbmltYXRlLFxuICBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEsXG4gIGtleWZyYW1lcyxcbiAgc3R5bGUsXG4gIHRyYW5zaXRpb24sXG4gIHRyaWdnZXIsXG4gIGFuaW1hdGlvbixcbiAgdXNlQW5pbWF0aW9uLFxuICBBbmltYXRpb25SZWZlcmVuY2VNZXRhZGF0YSxcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBNZGJBbmltYXRpb25PcHRpb25zIH0gZnJvbSAnLi4vYW5pbWF0aW9uLm9wdGlvbnMnO1xuaW1wb3J0IHsgZ2V0T3B0aW9ucyB9IGZyb20gJy4uL2FuaW1hdGlvbnMudXRpbHMnO1xuXG5jb25zdCBzbGlkZU91dERvd25PcHRpb25zOiBNZGJBbmltYXRpb25PcHRpb25zID0ge1xuICB0cmlnZ2VyOiAnc2xpZGVPdXREb3duJyxcbiAgZGVsYXk6IDAsXG4gIGR1cmF0aW9uOiA1MDAsXG59O1xuXG5jb25zdCBzbGlkZU91dERvd25MZWF2ZU9wdGlvbnM6IE1kYkFuaW1hdGlvbk9wdGlvbnMgPSB7XG4gIHRyaWdnZXI6ICdzbGlkZU91dERvd25MZWF2ZScsXG4gIGRlbGF5OiAwLFxuICBkdXJhdGlvbjogNTAwLFxufTtcblxuY29uc3Qgc2xpZGVPdXREb3duID0gKG9wdGlvbnM6IE1kYkFuaW1hdGlvbk9wdGlvbnMpOiBBbmltYXRpb25SZWZlcmVuY2VNZXRhZGF0YSA9PiB7XG4gIGNvbnN0IHBhcmFtcyA9IHtcbiAgICBkZWxheTogb3B0aW9ucy5kZWxheSxcbiAgICBkdXJhdGlvbjogb3B0aW9ucy5kdXJhdGlvbixcbiAgfTtcblxuICByZXR1cm4gYW5pbWF0aW9uKFxuICAgIFtcbiAgICAgIGFuaW1hdGUoXG4gICAgICAgICd7e2R1cmF0aW9ufX1tcyB7e2RlbGF5fX1tcycsXG4gICAgICAgIGtleWZyYW1lcyhbXG4gICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgwLCAwLCAwKScsIGVhc2luZzogJ2Vhc2UnLCBvZmZzZXQ6IDAgfSksXG4gICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgdmlzaWJpbGl0eTogJ2hpZGRlbicsXG4gICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgwLCAxMDAlLCAwKScsXG4gICAgICAgICAgICBlYXNpbmc6ICdlYXNlJyxcbiAgICAgICAgICAgIG9mZnNldDogMSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgXSlcbiAgICAgICksXG4gICAgXSxcbiAgICB7IHBhcmFtcyB9XG4gICk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gc2xpZGVPdXREb3duQW5pbWF0aW9uKG9wdGlvbnM/OiBNZGJBbmltYXRpb25PcHRpb25zKTogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhIHtcbiAgb3B0aW9ucyA9IGdldE9wdGlvbnMob3B0aW9ucywgc2xpZGVPdXREb3duT3B0aW9ucyk7XG5cbiAgcmV0dXJuIHRyaWdnZXIob3B0aW9ucy50cmlnZ2VyLCBbdHJhbnNpdGlvbignMCA9PiAxJywgW3VzZUFuaW1hdGlvbihzbGlkZU91dERvd24ob3B0aW9ucykpXSldKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNsaWRlT3V0RG93bkxlYXZlQW5pbWF0aW9uKFxuICBvcHRpb25zPzogTWRiQW5pbWF0aW9uT3B0aW9uc1xuKTogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhIHtcbiAgb3B0aW9ucyA9IGdldE9wdGlvbnMob3B0aW9ucywgc2xpZGVPdXREb3duTGVhdmVPcHRpb25zKTtcblxuICByZXR1cm4gdHJpZ2dlcihvcHRpb25zLnRyaWdnZXIsIFt0cmFuc2l0aW9uKCc6bGVhdmUnLCBbdXNlQW5pbWF0aW9uKHNsaWRlT3V0RG93bihvcHRpb25zKSldKV0pO1xufVxuIl19