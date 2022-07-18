import { animate, style, transition, trigger, state, } from '@angular/animations';
import { getOptions } from '../animations.utils';
const slideUpOptions = {
    trigger: 'slideUp',
    delay: 0,
    duration: 500,
};
export function slideUpAnimation(options) {
    options = getOptions(options, slideUpOptions);
    return trigger(options.trigger, [
        state('1', style({
            transform: 'translate3d(0, -100%, 0)',
        })),
        state('0', style({
            transform: 'translate3d(0, 0, 0)',
        })),
        transition('0 => 1', [animate('{{duration}}ms {{delay}}ms ease')], {
            params: {
                delay: options.delay,
                duration: options.duration,
            },
        }),
        transition('1 => 0', []),
    ]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUtdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvYW5pbWF0aW9ucy9zbGlkZS9zbGlkZS11cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsT0FBTyxFQUVQLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxFQUNQLEtBQUssR0FDTixNQUFNLHFCQUFxQixDQUFDO0FBRTdCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVqRCxNQUFNLGNBQWMsR0FBd0I7SUFDMUMsT0FBTyxFQUFFLFNBQVM7SUFDbEIsS0FBSyxFQUFFLENBQUM7SUFDUixRQUFRLEVBQUUsR0FBRztDQUNkLENBQUM7QUFFRixNQUFNLFVBQVUsZ0JBQWdCLENBQUMsT0FBNkI7SUFDNUQsT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFFOUMsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtRQUM5QixLQUFLLENBQ0gsR0FBRyxFQUNILEtBQUssQ0FBQztZQUNKLFNBQVMsRUFBRSwwQkFBMEI7U0FDdEMsQ0FBQyxDQUNIO1FBQ0QsS0FBSyxDQUNILEdBQUcsRUFDSCxLQUFLLENBQUM7WUFDSixTQUFTLEVBQUUsc0JBQXNCO1NBQ2xDLENBQUMsQ0FDSDtRQUNELFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsaUNBQWlDLENBQUMsQ0FBQyxFQUFFO1lBQ2pFLE1BQU0sRUFBRTtnQkFDTixLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7Z0JBQ3BCLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUTthQUMzQjtTQUNGLENBQUM7UUFDRixVQUFVLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQztLQUN6QixDQUFDLENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgYW5pbWF0ZSxcbiAgQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhLFxuICBzdHlsZSxcbiAgdHJhbnNpdGlvbixcbiAgdHJpZ2dlcixcbiAgc3RhdGUsXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgTWRiQW5pbWF0aW9uT3B0aW9ucyB9IGZyb20gJy4uL2FuaW1hdGlvbi5vcHRpb25zJztcbmltcG9ydCB7IGdldE9wdGlvbnMgfSBmcm9tICcuLi9hbmltYXRpb25zLnV0aWxzJztcblxuY29uc3Qgc2xpZGVVcE9wdGlvbnM6IE1kYkFuaW1hdGlvbk9wdGlvbnMgPSB7XG4gIHRyaWdnZXI6ICdzbGlkZVVwJyxcbiAgZGVsYXk6IDAsXG4gIGR1cmF0aW9uOiA1MDAsXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gc2xpZGVVcEFuaW1hdGlvbihvcHRpb25zPzogTWRiQW5pbWF0aW9uT3B0aW9ucyk6IEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSB7XG4gIG9wdGlvbnMgPSBnZXRPcHRpb25zKG9wdGlvbnMsIHNsaWRlVXBPcHRpb25zKTtcblxuICByZXR1cm4gdHJpZ2dlcihvcHRpb25zLnRyaWdnZXIsIFtcbiAgICBzdGF0ZShcbiAgICAgICcxJyxcbiAgICAgIHN0eWxlKHtcbiAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMCwgLTEwMCUsIDApJyxcbiAgICAgIH0pXG4gICAgKSxcbiAgICBzdGF0ZShcbiAgICAgICcwJyxcbiAgICAgIHN0eWxlKHtcbiAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMCwgMCwgMCknLFxuICAgICAgfSlcbiAgICApLFxuICAgIHRyYW5zaXRpb24oJzAgPT4gMScsIFthbmltYXRlKCd7e2R1cmF0aW9ufX1tcyB7e2RlbGF5fX1tcyBlYXNlJyldLCB7XG4gICAgICBwYXJhbXM6IHtcbiAgICAgICAgZGVsYXk6IG9wdGlvbnMuZGVsYXksXG4gICAgICAgIGR1cmF0aW9uOiBvcHRpb25zLmR1cmF0aW9uLFxuICAgICAgfSxcbiAgICB9KSxcbiAgICB0cmFuc2l0aW9uKCcxID0+IDAnLCBbXSksXG4gIF0pO1xufVxuIl19