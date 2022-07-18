import { animation, animate, keyframes, style, trigger, transition, useAnimation, state } from '@angular/animations';

function getOptions(options, defaultOptions) {
    return options ? Object.assign(defaultOptions, options) : defaultOptions;
}

const browseInOptions = {
    trigger: 'browseIn',
    delay: 0,
    duration: 500,
};
const browseInEnterOptions = {
    trigger: 'browseInEnter',
    delay: 0,
    duration: 500,
};
const browseIn = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({
                opacity: 0,
                transform: 'scale(0.8) translateZ(0px)',
                zIndex: -1,
                easing: 'ease',
                offset: 0,
            }),
            style({
                transform: 'scale(0.8) translateZ(0px)',
                zIndex: -1,
                opacity: 0.7,
                easing: 'ease',
                offset: 0.1,
            }),
            style({
                transform: 'scale(1.05) translateZ(0px)',
                zIndex: 999,
                opacity: 1,
                easing: 'ease',
                offset: 0.8,
            }),
            style({
                transform: 'scale(1) translateZ(0px)',
                zIndex: 999,
                opacity: 1,
                easing: 'ease',
                offset: 1,
            }),
        ])),
    ], { params });
};
function browseInAnimation(options) {
    options = getOptions(options, browseInOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(browseIn(options))])]);
}
function browseInEnterAnimation(options) {
    options = getOptions(options, browseInEnterOptions);
    return trigger(options.trigger, [transition(':enter', [useAnimation(browseIn(options))])]);
}

const browseOutOptions = {
    trigger: 'browseOut',
    delay: 0,
    duration: 500,
};
const browseOutLeaveOptions = {
    trigger: 'browseOutLeave',
    delay: 0,
    duration: 500,
};
const browseOut = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({
                opacity: 0,
                transform: 'translateX(0%) rotateY(0deg) rotateX(0deg)',
                zIndex: 999,
                easing: 'ease',
                offset: 0,
            }),
            style({
                transform: 'translateX(-105%) rotateY(35deg) rotateX(10deg) translateZ(-10px)',
                zIndex: -1,
                easing: 'ease',
                offset: 0.5,
            }),
            style({
                opacity: 1,
                offset: 0.8,
            }),
            style({
                transform: 'translateX(0%) rotateY(0deg) rotateX(0deg) translateZ(-10px)',
                zIndex: -1,
                opacity: 0,
                easing: 'ease',
                offset: 1,
            }),
        ])),
    ], { params });
};
function browseOutAnimation(options) {
    options = getOptions(options, browseOutOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(browseOut(options))])]);
}
function browseOutLeaveAnimation(options) {
    options = getOptions(options, browseOutLeaveOptions);
    return trigger(options.trigger, [transition(':leave', [useAnimation(browseOut(options))])]);
}

const browseOutLeftOptions = {
    trigger: 'browseOutLeft',
    delay: 0,
    duration: 500,
};
const browseOutLeftLeaveOptions = {
    trigger: 'browseOutLeftLeave',
    delay: 0,
    duration: 500,
};
const browseOutLeft = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({
                transform: 'translateX(0%) rotateY(0deg) rotateX(0deg)',
                zIndex: 999,
                easing: 'ease',
                offset: 0,
            }),
            style({
                transform: 'translateX(-105%) rotateY(35deg) rotateX(10deg) translateZ(-10px)',
                zIndex: -1,
                easing: 'ease',
                offset: 0.5,
            }),
            style({
                opacity: 1,
                offset: 0.8,
            }),
            style({
                transform: 'translateX(0%) rotateY(0deg) rotateX(0deg) translateZ(-10px)',
                zIndex: -1,
                opacity: 0,
                easing: 'ease',
                offset: 1,
            }),
        ])),
    ], { params });
};
function browseOutLeftAnimation(options) {
    options = getOptions(options, browseOutLeftOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(browseOutLeft(options))])]);
}
function browseOutLeftLeaveAnimation(options) {
    options = getOptions(options, browseOutLeftLeaveOptions);
    return trigger(options.trigger, [transition(':leave', [useAnimation(browseOutLeft(options))])]);
}

const browseOutRightOptions = {
    trigger: 'browseOutRight',
    delay: 0,
    duration: 500,
};
const browseOutRightLeaveOptions = {
    trigger: 'browseOutRightLeave',
    delay: 0,
    duration: 500,
};
const browseOutRight = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({
                transform: 'transform: translateX(0%) rotateY(0deg) rotateX(0deg)',
                zIndex: 999,
                easing: 'ease',
                offset: 0,
            }),
            style({
                transform: 'transform: translateX(-105%) rotateY(35deg) rotateX(10deg) translateZ(-10px)',
                zIndex: -1,
                easing: 'ease',
                offset: 0.5,
            }),
            style({
                opacity: 1,
                offset: 0.8,
            }),
            style({
                transform: 'translateX(0%) rotateY(0deg) rotateX(0deg) translateZ(-10px);',
                zIndex: -1,
                opacity: 0,
                easing: 'ease',
                offset: 1,
            }),
        ])),
    ], { params });
};
function browseOutRightAnimation(options) {
    options = getOptions(options, browseOutRightOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(browseOutRight(options))])]);
}
function browseOutRightLeaveAnimation(options) {
    options = getOptions(options, browseOutRightLeaveOptions);
    return trigger(options.trigger, [transition(':leave', [useAnimation(browseOutRight(options))])]);
}

const dropInOptions = {
    trigger: 'dropIn',
    delay: 0,
    duration: 500,
};
const dropInEnterOptions = {
    trigger: 'dropInEnter',
    delay: 0,
    duration: 500,
};
const dropIn = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({
                opacity: 0,
                transformOrigin: 'top center',
                transform: 'scale(0)',
                easing: 'cubic-bezier(0.34, 1.61, 0.7, 1)',
                offset: 0,
            }),
            style({
                opacity: 1,
                transformOrigin: 'top center',
                transform: 'scale(1)',
                easing: 'cubic-bezier(0.34, 1.61, 0.7, 1)',
                offset: 1,
            }),
        ])),
    ], { params });
};
function dropInAnimation(options) {
    options = getOptions(options, dropInOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(dropIn(options))])]);
}
function dropInEnterAnimation(options) {
    options = getOptions(options, dropInEnterOptions);
    return trigger(options.trigger, [transition(':enter', [useAnimation(dropIn(options))])]);
}

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
function dropOutAnimation(options) {
    options = getOptions(options, dropOutOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(dropOut(options))])]);
}
function dropOutLeaveAnimation(options) {
    options = getOptions(options, dropOutLeaveOptions);
    return trigger(options.trigger, [transition(':leave', [useAnimation(dropOut(options))])]);
}

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
function fadeInAnimation(options) {
    options = getOptions(options, fadeInOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(fadeIn(options))])]);
}
function fadeInEnterAnimation(options) {
    options = getOptions(options, fadeInEnterOptions);
    return trigger(options.trigger, [transition(':enter', [useAnimation(fadeIn(options))])]);
}

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
function fadeInUpAnimation(options) {
    options = getOptions(options, fadeInUpOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(fadeInUp(options))])]);
}
function fadeInUpEnterAnimation(options) {
    options = getOptions(options, fadeInUpEnterOptions);
    return trigger(options.trigger, [transition(':enter', [useAnimation(fadeInUp(options))])]);
}

const fadeInRightOptions = {
    trigger: 'fadeInRight',
    delay: 0,
    duration: 500,
};
const fadeInRightEnterOptions = {
    trigger: 'fadeInRightEnter',
    delay: 0,
    duration: 500,
};
const fadeInRight = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({ opacity: 0, transform: 'translate3d(100%, 0, 0)', easing: 'ease', offset: 0 }),
            style({ opacity: 1, transform: 'translate3d(0, 0, 0)', easing: 'ease', offset: 1 }),
        ])),
    ], { params });
};
function fadeInRightAnimation(options) {
    options = getOptions(options, fadeInRightOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(fadeInRight(options))])]);
}
function fadeInRightEnterAnimation(options) {
    options = getOptions(options, fadeInRightEnterOptions);
    return trigger(options.trigger, [transition(':enter', [useAnimation(fadeInRight(options))])]);
}

const fadeInDownOptions = {
    trigger: 'fadeInDown',
    delay: 0,
    duration: 500,
};
const fadeInDownEnterOptions = {
    trigger: 'fadeInDownEnter',
    delay: 0,
    duration: 500,
};
const fadeInDown = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({ opacity: 0, transform: 'translate3d(0, -100%, 0)', easing: 'ease', offset: 0 }),
            style({ opacity: 1, transform: 'translate3d(0, 0, 0)', easing: 'ease', offset: 1 }),
        ])),
    ], { params });
};
function fadeInDownAnimation(options) {
    options = getOptions(options, fadeInDownOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(fadeInDown(options))])]);
}
function fadeInDownEnterAnimation(options) {
    options = getOptions(options, fadeInDownEnterOptions);
    return trigger(options.trigger, [transition(':enter', [useAnimation(fadeInDown(options))])]);
}

const fadeInLeftOptions = {
    trigger: 'fadeInLeft',
    delay: 0,
    duration: 500,
};
const fadeInLeftEnterOptions = {
    trigger: 'fadeInLeftEnter',
    delay: 0,
    duration: 500,
};
const fadeInLeft = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({ opacity: 0, transform: 'translate3d(-100%, 0, 0)', easing: 'ease', offset: 0 }),
            style({ opacity: 1, transform: 'translate3d(0, 0, 0)', easing: 'ease', offset: 1 }),
        ])),
    ], { params });
};
function fadeInLeftAnimation(options) {
    options = getOptions(options, fadeInLeftOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(fadeInLeft(options))])]);
}
function fadeInLeftEnterAnimation(options) {
    options = getOptions(options, fadeInLeftEnterOptions);
    return trigger(options.trigger, [transition(':enter', [useAnimation(fadeInLeft(options))])]);
}

const fadeOutOptions = {
    trigger: 'fadeOut',
    delay: 0,
    duration: 500,
};
const fadeOutLeaveOptions = {
    trigger: 'fadeOutLeave',
    delay: 0,
    duration: 500,
};
const fadeOut = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([style({ opacity: 1, offset: 0 }), style({ opacity: 0, offset: 1 })])),
    ], { params });
};
function fadeOutAnimation(options) {
    options = getOptions(options, fadeOutOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(fadeOut(options))])]);
}
function fadeOutLeaveAnimation(options) {
    options = getOptions(options, fadeOutLeaveOptions);
    return trigger(options.trigger, [transition(':leave', [useAnimation(fadeOut(options))])]);
}

const fadeOutUpOptions = {
    trigger: 'fadeOutUp',
    delay: 0,
    duration: 500,
};
const fadeOutUpLeaveOptions = {
    trigger: 'fadeOutUpLeave',
    delay: 0,
    duration: 500,
};
const fadeOutUp = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({ opacity: 1, transform: 'translate3d(0, 0, 0)', easing: 'ease', offset: 0 }),
            style({ opacity: 0, transform: 'translate3d(0, -100%, 0)', easing: 'ease', offset: 1 }),
        ])),
    ], { params });
};
function fadeOutUpAnimation(options) {
    options = getOptions(options, fadeOutUpOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(fadeOutUp(options))])]);
}
function fadeOutUpLeaveAnimation(options) {
    options = getOptions(options, fadeOutUpLeaveOptions);
    return trigger(options.trigger, [transition(':leave', [useAnimation(fadeOutUp(options))])]);
}

const fadeOutRightOptions = {
    trigger: 'fadeOutRight',
    delay: 0,
    duration: 500,
};
const fadeOutRightLeaveOptions = {
    trigger: 'fadeOutRightLeave',
    delay: 0,
    duration: 500,
};
const fadeOutRight = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({ opacity: 1, transform: 'translate3d(0, 0, 0)', easing: 'ease', offset: 0 }),
            style({ opacity: 0, transform: 'translate3d(100%, 0, 0)', easing: 'ease', offset: 1 }),
        ])),
    ], { params });
};
function fadeOutRightAnimation(options) {
    options = getOptions(options, fadeOutRightOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(fadeOutRight(options))])]);
}
function fadeOutRightLeaveAnimation(options) {
    options = getOptions(options, fadeOutRightLeaveOptions);
    return trigger(options.trigger, [transition(':leave', [useAnimation(fadeOutRight(options))])]);
}

const fadeOutDownOptions = {
    trigger: 'fadeOutDown',
    delay: 0,
    duration: 500,
};
const fadeOutDownLeaveOptions = {
    trigger: 'fadeOutDownLeave',
    delay: 0,
    duration: 500,
};
const fadeOutDown = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({ opacity: 1, transform: 'translate3d(0, 0, 0)', easing: 'ease', offset: 0 }),
            style({ opacity: 0, transform: 'translate3d(0, 100%, 0)', easing: 'ease', offset: 1 }),
        ])),
    ], { params });
};
function fadeOutDownAnimation(options) {
    options = getOptions(options, fadeOutDownOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(fadeOutDown(options))])]);
}
function fadeOutDownLeaveAnimation(options) {
    options = getOptions(options, fadeOutDownLeaveOptions);
    return trigger(options.trigger, [transition(':leave', [useAnimation(fadeOutDown(options))])]);
}

const fadeOutLeftOptions = {
    trigger: 'fadeOutLeft',
    delay: 0,
    duration: 500,
};
const fadeOutLeftLeaveOptions = {
    trigger: 'fadeOutLeftLeave',
    delay: 0,
    duration: 500,
};
const fadeOutLeft = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({ opacity: 1, transform: 'translate3d(0, 0, 0)', easing: 'ease', offset: 0 }),
            style({ opacity: 0, transform: 'translate3d(-100%, 0, 0)', easing: 'ease', offset: 1 }),
        ])),
    ], { params });
};
function fadeOutLeftAnimation(options) {
    options = getOptions(options, fadeOutLeftOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(fadeOutLeft(options))])]);
}
function fadeOutLeftLeaveAnimation(options) {
    options = getOptions(options, fadeOutLeftLeaveOptions);
    return trigger(options.trigger, [transition(':leave', [useAnimation(fadeOutLeft(options))])]);
}

const flyInOptions = {
    trigger: 'flyIn',
    delay: 0,
    duration: 500,
};
const flyInEnterOptions = {
    trigger: 'flyInEnter',
    delay: 0,
    duration: 500,
};
const flyIn = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({
                opacity: 0,
                transform: 'scale3d(1, 1, 1)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 0,
            }),
            style({
                transform: 'scale3d(1.1, 1.1, 1.1)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 0.2,
            }),
            style({
                transform: 'scale3d(0.9, 0.9, 0.9)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 0.4,
            }),
            style({
                opacity: 1,
                transform: 'scale3d(1.03, 1.03, 1.03)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 0.6,
            }),
            style({
                opacity: 1,
                transform: 'scale3d(0.97, 0.97, 0.97)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 0.8,
            }),
            style({
                opacity: 1,
                transform: 'scale3d(1, 1, 1)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 1,
            }),
        ])),
    ], { params });
};
function flyInAnimation(options) {
    options = getOptions(options, flyInOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(flyIn(options))])]);
}
function flyInEnterAnimation(options) {
    options = getOptions(options, flyInEnterOptions);
    return trigger(options.trigger, [transition(':enter', [useAnimation(flyIn(options))])]);
}

const flyInUpOptions = {
    trigger: 'flyInUp',
    delay: 0,
    duration: 500,
};
const flyInUpEnterOptions = {
    trigger: 'flyInUpEnter',
    delay: 0,
    duration: 500,
};
const flyInUp = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({
                opacity: 0,
                transform: 'translate3d(0, 1500px, 0)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 0,
            }),
            style({
                opacity: 1,
                transform: 'translate3d(0, -20px, 0)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 0.6,
            }),
            style({
                transform: 'transform: translate3d(0, 10px, 0)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 0.75,
            }),
            style({
                transform: 'transform: translate3d(0, -5px, 0)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 0.9,
            }),
            style({
                transform: 'transform: translate3d(0, 0, 0)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 1,
            }),
        ])),
    ], { params });
};
function flyInUpAnimation(options) {
    options = getOptions(options, flyInUpOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(flyInUp(options))])]);
}
function flyInUpEnterAnimation(options) {
    options = getOptions(options, flyInUpEnterOptions);
    return trigger(options.trigger, [transition(':enter', [useAnimation(flyInUp(options))])]);
}

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
function flyInRightAnimation(options) {
    options = getOptions(options, flyInRightOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(flyInRight(options))])]);
}
function flyInRightEnterAnimation(options) {
    options = getOptions(options, flyInRightEnterOptions);
    return trigger(options.trigger, [transition(':enter', [useAnimation(flyInRight(options))])]);
}

const flyInLeftOptions = {
    trigger: 'flyInLeft',
    delay: 0,
    duration: 500,
};
const flyInLeftEnterOptions = {
    trigger: 'flyInLeftEnter',
    delay: 0,
    duration: 500,
};
const flyInLeft = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({
                opacity: 0,
                transform: 'translate3d(1500px, 0, 0)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 0,
            }),
            style({
                opacity: 1,
                transform: 'translate3d(-25px, 0, 0)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 0.6,
            }),
            style({
                transform: 'transform: translate3d(10px, 0, 0)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 0.75,
            }),
            style({
                opacity: 1,
                transform: 'transform: translate3d(-5px, 0, 0)',
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
function flyInLeftAnimation(options) {
    options = getOptions(options, flyInLeftOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(flyInLeft(options))])]);
}
function flyInLeftEnterAnimation(options) {
    options = getOptions(options, flyInLeftEnterOptions);
    return trigger(options.trigger, [transition(':enter', [useAnimation(flyInLeft(options))])]);
}

const flyInDownOptions = {
    trigger: 'flyInDown',
    delay: 0,
    duration: 500,
};
const flyInDownEnterOptions = {
    trigger: 'flyInDownEnter',
    delay: 0,
    duration: 500,
};
const flyInDown = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({
                opacity: 0,
                transform: 'translate3d(0, -1500px, 0)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 0,
            }),
            style({
                opacity: 1,
                transform: 'translate3d(0, 25px, 0)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 0.6,
            }),
            style({
                transform: 'transform: translate3d(0, -10px, 0)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 0.75,
            }),
            style({
                transform: 'transform: translate3d(0, 5px, 0)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 0.9,
            }),
            style({
                transform: 'transform: translate3d(0, 0, 0)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 1,
            }),
        ])),
    ], { params });
};
function flyInDownAnimation(options) {
    options = getOptions(options, flyInDownOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(flyInDown(options))])]);
}
function flyInDownEnterAnimation(options) {
    options = getOptions(options, flyInDownEnterOptions);
    return trigger(options.trigger, [transition(':enter', [useAnimation(flyInDown(options))])]);
}

const flyOutOptions = {
    trigger: 'flyOut',
    delay: 0,
    duration: 500,
};
const flyOutLeaveOptions = {
    trigger: 'flyOutLeave',
    delay: 0,
    duration: 500,
};
const flyOut = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({
                transform: 'scale3d(0.9, 0.9, 0.9)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 0.2,
            }),
            style({
                transform: 'scale3d(1.1, 1.1, 1.1)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 0.5,
            }),
            style({
                transform: 'scale3d(1.1, 1.1, 1.1)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 0.55,
            }),
            style({
                opacity: 1,
                transform: 'scale3d(0.3, 0.3, 0.3)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 1,
            }),
        ])),
    ], { params });
};
function flyOutAnimation(options) {
    options = getOptions(options, flyOutOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(flyOut(options))])]);
}
function flyOutLeaveAnimation(options) {
    options = getOptions(options, flyOutLeaveOptions);
    return trigger(options.trigger, [transition(':leave', [useAnimation(flyOut(options))])]);
}

const flyOutUpOptions = {
    trigger: 'flyOutUp',
    delay: 0,
    duration: 500,
};
const flyOutUpLeaveOptions = {
    trigger: 'flyOutUpLeave',
    delay: 0,
    duration: 500,
};
const flyOutUp = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({
                transform: 'translate3d(0, 10px, 0)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 0.2,
            }),
            style({
                transform: 'transform: translate3d(0, -20px, 0)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 0.4,
            }),
            style({
                transform: 'transform: translate3d(0, -20px, 0)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 0.45,
            }),
            style({
                opacity: 1,
                transform: 'transform: translate3d(0, 2000px, 0)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 1,
            }),
        ])),
    ], { params });
};
function flyOutUpAnimation(options) {
    options = getOptions(options, flyOutUpOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(flyOutUp(options))])]);
}
function flyOutUpLeaveAnimation(options) {
    options = getOptions(options, flyOutUpLeaveOptions);
    return trigger(options.trigger, [transition(':leave', [useAnimation(flyOutUp(options))])]);
}

const flyOutRightOptions = {
    trigger: 'flyOutRight',
    delay: 0,
    duration: 500,
};
const flyOutRightLeaveOptions = {
    trigger: 'flyOutRightLeave',
    delay: 0,
    duration: 500,
};
const flyOutRight = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({
                opacity: 1,
                transform: 'translate3d(-20px, 0, 0)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 0.2,
            }),
            style({
                opacity: 0,
                transform: 'transform: translate3d(2000px, 0, 0)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 1,
            }),
        ])),
    ], { params });
};
function flyOutRightAnimation(options) {
    options = getOptions(options, flyOutRightOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(flyOutRight(options))])]);
}
function flyOutRightLeaveAnimation(options) {
    options = getOptions(options, flyOutRightLeaveOptions);
    return trigger(options.trigger, [transition(':leave', [useAnimation(flyOutRight(options))])]);
}

const flyOutLeftOptions = {
    trigger: 'flyOutLeft',
    delay: 0,
    duration: 500,
};
const flyOutLeftLeaveOptions = {
    trigger: 'flyOutLeftLeave',
    delay: 0,
    duration: 500,
};
const flyOutLeft = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({
                opacity: 1,
                transform: 'translate3d(-20px, 0, 0)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 0.2,
            }),
            style({
                opacity: 0,
                transform: 'transform: translate3d(2000px, 0, 0)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 1,
            }),
        ])),
    ], { params });
};
function flyOutLeftAnimation(options) {
    options = getOptions(options, flyOutLeftOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(flyOutLeft(options))])]);
}
function flyOutLeftLeaveAnimation(options) {
    options = getOptions(options, flyOutLeftLeaveOptions);
    return trigger(options.trigger, [transition(':leave', [useAnimation(flyOutLeft(options))])]);
}

const flyOutDownOptions = {
    trigger: 'flyOutDown',
    delay: 0,
    duration: 500,
};
const flyOutDownLeaveOptions = {
    trigger: 'flyOutDownLeave',
    delay: 0,
    duration: 500,
};
const flyOutDown = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({
                transform: 'translate3d(0, -10px, 0)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 0.2,
            }),
            style({
                transform: 'transform: translate3d(0, 20px, 0)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 0.4,
            }),
            style({
                transform: 'transform: translate3d(0, 20px, 0)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 0.45,
            }),
            style({
                opacity: 1,
                transform: 'transform: translate3d(0, -2000px, 0)',
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                offset: 1,
            }),
        ])),
    ], { params });
};
function flyOutDownAnimation(options) {
    options = getOptions(options, flyOutDownOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(flyOutDown(options))])]);
}
function flyOutDownLeaveAnimation(options) {
    options = getOptions(options, flyOutDownLeaveOptions);
    return trigger(options.trigger, [transition(':leave', [useAnimation(flyOutDown(options))])]);
}

const flashOptions = {
    trigger: 'flash',
    delay: 0,
    duration: 500,
};
const flashEnterOptions = {
    trigger: 'flashEnter',
    delay: 0,
    duration: 500,
};
const flash = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({ opacity: 1, easing: 'ease', offset: 0 }),
            style({ opacity: 0, easing: 'ease', offset: 0.25 }),
            style({ opacity: 1, easing: 'ease', offset: 0.5 }),
            style({ opacity: 0, easing: 'ease', offset: 0.75 }),
            style({ opacity: 1, easing: 'ease', offset: 1 }),
        ])),
    ], { params });
};
function flashAnimation(options) {
    options = getOptions(options, flashOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(flash(options))])]);
}
function flashEnterAnimation(options) {
    options = getOptions(options, flashEnterOptions);
    return trigger(options.trigger, [transition(':enter', [useAnimation(flash(options))])]);
}

const glowOptions = {
    trigger: 'glow',
    delay: 0,
    duration: 500,
};
const glowEnterOptions = {
    trigger: 'glowEnter',
    delay: 0,
    duration: 500,
};
const glow = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({ backgroundColor: '#fcfcfd', easing: 'ease', offset: 0 }),
            style({ backgroundColor: '#fff6cd', easing: 'ease', offset: 0.3 }),
            style({ backgroundColor: '#fcfcfd', easing: 'ease', offset: 1 }),
        ])),
    ], { params });
};
function glowAnimation(options) {
    options = getOptions(options, glowOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(glow(options))])]);
}
function glowEnterAnimation(options) {
    options = getOptions(options, glowEnterOptions);
    return trigger(options.trigger, [transition(':enter', [useAnimation(glow(options))])]);
}

const jiggleOptions = {
    trigger: 'jiggle',
    delay: 0,
    duration: 500,
};
const jiggleEnterOptions = {
    trigger: 'jiggleEnter',
    delay: 0,
    duration: 500,
};
const jiggle = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({ transform: 'scale3d(1, 1, 1)', easing: 'ease', offset: 0 }),
            style({ transform: 'scale3d(1.25, 0.75, 1)', easing: 'ease', offset: 0.3 }),
            style({ transform: 'scale3d(0.75, 1.25, 1)', easing: 'ease', offset: 0.4 }),
            style({ transform: 'scale3d(1.15, 0.85, 1)', easing: 'ease', offset: 0.5 }),
            style({ transform: 'scale3d(0.95, 1.05, 1)', easing: 'ease', offset: 0.65 }),
            style({ transform: 'scale3d(0.95, 1.05, 1)', easing: 'ease', offset: 0.75 }),
            style({ transform: 'scale3d(1, 1, 1)', easing: 'ease', offset: 1 }),
        ])),
    ], { params });
};
function jiggleAnimation(options) {
    options = getOptions(options, jiggleOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(jiggle(options))])]);
}
function jiggleEnterAnimation(options) {
    options = getOptions(options, jiggleEnterOptions);
    return trigger(options.trigger, [transition(':enter', [useAnimation(jiggle(options))])]);
}

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
function pulseAnimation(options) {
    options = getOptions(options, pulseOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(pulse(options))])]);
}
function pulseEnterAnimation(options) {
    options = getOptions(options, pulseEnterOptions);
    return trigger(options.trigger, [transition(':enter', [useAnimation(pulse(options))])]);
}

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
function shakeAnimation(options) {
    options = getOptions(options, shakeOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(shake(options))])]);
}
function shakeEnterAnimation(options) {
    options = getOptions(options, shakeEnterOptions);
    return trigger(options.trigger, [transition(':enter', [useAnimation(shake(options))])]);
}

const tadaOptions = {
    trigger: 'tada',
    delay: 0,
    duration: 500,
};
const tadaEnterOptions = {
    trigger: 'tadaEnter',
    delay: 0,
    duration: 500,
};
const tada = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({ transform: 'scale3d(1, 1, 1)', offset: 0 }),
            style({ transform: 'scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)', offset: 0.1 }),
            style({ transform: 'scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)', offset: 0.2 }),
            style({
                transform: 'transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)',
                offset: 0.3,
            }),
            style({
                transform: 'transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)',
                offset: 0.4,
            }),
            style({
                transform: 'transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)',
                offset: 0.5,
            }),
            style({
                transform: 'transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)',
                offset: 0.6,
            }),
            style({
                transform: 'transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)',
                offset: 0.7,
            }),
            style({
                transform: 'transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)',
                offset: 0.8,
            }),
            style({
                transform: 'transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)',
                offset: 0.9,
            }),
            style({ transform: 'scale3d(1, 1, 1)', offset: 1 }),
        ])),
    ], { params });
};
function tadaAnimation(options) {
    options = getOptions(options, tadaOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(tada(options))])]);
}
function tadaEnterAnimation(options) {
    options = getOptions(options, tadaEnterOptions);
    return trigger(options.trigger, [transition(':enter', [useAnimation(tada(options))])]);
}

const slideUpOptions = {
    trigger: 'slideUp',
    delay: 0,
    duration: 500,
};
function slideUpAnimation(options) {
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

const slideRightOptions = {
    trigger: 'slideRight',
    delay: 0,
    duration: 500,
};
function slideRightAnimation(options) {
    options = getOptions(options, slideRightOptions);
    return trigger(options.trigger, [
        state('1', style({
            transform: 'translate3d(100%, 0, 0)',
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

const slideDownOptions = {
    trigger: 'slideDown',
    delay: 0,
    duration: 500,
};
function slideDownAnimation(options) {
    options = getOptions(options, slideDownOptions);
    return trigger(options.trigger, [
        state('1', style({
            transform: 'translate3d(0, 100%, 0)',
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

const slideLeftOptions = {
    trigger: 'slideLeft',
    delay: 0,
    duration: 500,
};
function slideLeftAnimation(options) {
    options = getOptions(options, slideLeftOptions);
    return trigger(options.trigger, [
        state('1', style({
            transform: 'translate3d(-100%, 0, 0)',
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

const slideInUpOptions = {
    trigger: 'slideInUp',
    delay: 0,
    duration: 500,
};
const slideInUpEnterOptions = {
    trigger: 'slideInUpEnter',
    delay: 0,
    duration: 500,
};
const slideInUp = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({
                visibility: 'visible',
                transform: 'translate3d(0, 100%, 0)',
                easing: 'ease',
                offset: 0,
            }),
            style({ transform: 'translate3d(0, 0, 0)', easing: 'ease', offset: 1 }),
        ])),
    ], { params });
};
function slideInUpAnimation(options) {
    options = getOptions(options, slideInUpOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(slideInUp(options))])]);
}
function slideInUpEnterAnimation(options) {
    options = getOptions(options, slideInUpEnterOptions);
    return trigger(options.trigger, [transition(':enter', [useAnimation(slideInUp(options))])]);
}

const slideInRightOptions = {
    trigger: 'slideInRight',
    delay: 0,
    duration: 500,
};
const slideInRightEnterOptions = {
    trigger: 'slideInRightEnter',
    delay: 0,
    duration: 500,
};
const slideInRight = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({
                visibility: 'visible',
                transform: 'translate3d(100%, 0, 0)',
                easing: 'ease',
                offset: 0,
            }),
            style({ transform: 'translate3d(0, 0, 0)', easing: 'ease', offset: 1 }),
        ])),
    ], { params });
};
function slideInRightAnimation(options) {
    options = getOptions(options, slideInRightOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(slideInRight(options))])]);
}
function slideInRightEnterAnimation(options) {
    options = getOptions(options, slideInRightEnterOptions);
    return trigger(options.trigger, [transition(':enter', [useAnimation(slideInRight(options))])]);
}

const slideInDownOptions = {
    trigger: 'slideInDown',
    delay: 0,
    duration: 500,
};
const slideInDownEnterOptions = {
    trigger: 'slideInDownEnter',
    delay: 0,
    duration: 500,
};
const slideInDown = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({
                visibility: 'visible',
                transform: 'translate3d(0, -100%, 0)',
                easing: 'ease',
                offset: 0,
            }),
            style({ transform: 'translate3d(0, 0, 0)', easing: 'ease', offset: 1 }),
        ])),
    ], { params });
};
function slideInDownAnimation(options) {
    options = getOptions(options, slideInDownOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(slideInDown(options))])]);
}
function slideInDownEnterAnimation(options) {
    options = getOptions(options, slideInDownEnterOptions);
    return trigger(options.trigger, [transition(':enter', [useAnimation(slideInDown(options))])]);
}

const slideInLeftOptions = {
    trigger: 'slideInLeft',
    delay: 0,
    duration: 500,
};
const slideInLeftEnterOptions = {
    trigger: 'slideInLeftEnter',
    delay: 0,
    duration: 500,
};
const slideInLeft = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({
                visibility: 'visible',
                transform: 'translate3d(-100%, 0, 0)',
                easing: 'ease',
                offset: 0,
            }),
            style({ transform: 'translate3d(0, 0, 0)', easing: 'ease', offset: 1 }),
        ])),
    ], { params });
};
function slideInLeftAnimation(options) {
    options = getOptions(options, slideInLeftOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(slideInLeft(options))])]);
}
function slideInLeftEnterAnimation(options) {
    options = getOptions(options, slideInLeftEnterOptions);
    return trigger(options.trigger, [transition(':enter', [useAnimation(slideInLeft(options))])]);
}

const slideOutUpOptions = {
    trigger: 'slideOutUp',
    delay: 0,
    duration: 500,
};
const slideOutUpLeaveOptions = {
    trigger: 'slideOutUpLeave',
    delay: 0,
    duration: 500,
};
const slideOutUp = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({ transform: 'translate3d(0, 0, 0)', easing: 'ease', offset: 0 }),
            style({
                visibility: 'hidden',
                transform: 'translate3d(0, -100%, 0)',
                easing: 'ease',
                offset: 1,
            }),
        ])),
    ], { params });
};
function slideOutUpAnimation(options) {
    options = getOptions(options, slideOutUpOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(slideOutUp(options))])]);
}
function slideOutUpLeaveAnimation(options) {
    options = getOptions(options, slideOutUpLeaveOptions);
    return trigger(options.trigger, [transition(':leave', [useAnimation(slideOutUp(options))])]);
}

const slideOutRightOptions = {
    trigger: 'slideOutRight',
    delay: 0,
    duration: 500,
};
const slideOutRightLeaveOptions = {
    trigger: 'slideOutRightLeave',
    delay: 0,
    duration: 500,
};
const slideOutRight = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({ transform: 'translate3d(0, 0, 0)', easing: 'ease', offset: 0 }),
            style({
                visibility: 'hidden',
                transform: 'translate3d(100%, 0, 0)',
                easing: 'ease',
                offset: 1,
            }),
        ])),
    ], { params });
};
function slideOutRightAnimation(options) {
    options = getOptions(options, slideOutRightOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(slideOutRight(options))])]);
}
function slideOutRightLeaveAnimation(options) {
    options = getOptions(options, slideOutRightLeaveOptions);
    return trigger(options.trigger, [transition(':leave', [useAnimation(slideOutRight(options))])]);
}

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
function slideOutDownAnimation(options) {
    options = getOptions(options, slideOutDownOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(slideOutDown(options))])]);
}
function slideOutDownLeaveAnimation(options) {
    options = getOptions(options, slideOutDownLeaveOptions);
    return trigger(options.trigger, [transition(':leave', [useAnimation(slideOutDown(options))])]);
}

const slideOutLeftOptions = {
    trigger: 'slideOutLeft',
    delay: 0,
    duration: 500,
};
const slideOutLeftLeaveOptions = {
    trigger: 'slideOutLeftLeave',
    delay: 0,
    duration: 500,
};
const slideOutLeft = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({ transform: 'translate3d(0, 0, 0)', easing: 'ease', offset: 0 }),
            style({
                visibility: 'hidden',
                transform: 'translate3d(-100%, 0, 0)',
                easing: 'ease',
                offset: 1,
            }),
        ])),
    ], { params });
};
function slideOutLeftAnimation(options) {
    options = getOptions(options, slideOutLeftOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(slideOutLeft(options))])]);
}
function slideOutLeftLeaveAnimation(options) {
    options = getOptions(options, slideOutLeftLeaveOptions);
    return trigger(options.trigger, [transition(':leave', [useAnimation(slideOutLeft(options))])]);
}

const zoomInOptions = {
    trigger: 'zoomIn',
    delay: 0,
    duration: 500,
};
const zoomInEnterOptions = {
    trigger: 'zoomInEnter',
    delay: 0,
    duration: 500,
};
const zoomIn = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({ opacity: 0, transform: 'scale3d(0.3, 0.3, 0.3)', offset: 0, easing: 'ease' }),
            style({ opacity: 1, transform: 'scale3d(1, 1, 1)', offset: 0.5, easing: 'ease' }),
        ])),
    ], { params });
};
function zoomInAnimation(options) {
    options = getOptions(options, zoomInOptions);
    return trigger(options.trigger, [
        transition('0 => 1', [style({ opacity: 0 }), useAnimation(zoomIn(options))]),
    ]);
}
function zoomInEnterAnimation(options) {
    options = getOptions(options, zoomInEnterOptions);
    return trigger(options.trigger, [
        transition(':enter', [style({ opacity: 0 }), useAnimation(zoomIn(options))]),
    ]);
}

const zoomOutOptions = {
    trigger: 'zoomOut',
    delay: 0,
    duration: 500,
};
const zoomOutLeaveOptions = {
    trigger: 'zoomOutLeave',
    delay: 0,
    duration: 500,
};
const zoomOut = (options) => {
    const params = {
        delay: options.delay,
        duration: options.duration,
    };
    return animation([
        animate('{{duration}}ms {{delay}}ms', keyframes([
            style({ opacity: 1, offset: 0 }),
            style({ opacity: 0, transform: 'scale3d(0.3, 0.3, 0.3)', offset: 0.5 }),
            style({ opacity: 0, offset: 1 }),
        ])),
    ], { params });
};
function zoomOutAnimation(options) {
    options = getOptions(options, zoomOutOptions);
    return trigger(options.trigger, [transition('0 => 1', [useAnimation(zoomOut(options))])]);
}
function zoomOutLeaveAnimation(options) {
    options = getOptions(options, zoomOutLeaveOptions);
    return trigger(options.trigger, [transition(':leave', [useAnimation(zoomOut(options))])]);
}

/**
 * Generated bundle index. Do not edit.
 */

export { browseInAnimation, browseInEnterAnimation, browseOutAnimation, browseOutLeaveAnimation, browseOutLeftAnimation, browseOutLeftLeaveAnimation, browseOutRightAnimation, browseOutRightLeaveAnimation, dropInAnimation, dropInEnterAnimation, dropOutAnimation, dropOutLeaveAnimation, fadeInAnimation, fadeInDownAnimation, fadeInDownEnterAnimation, fadeInEnterAnimation, fadeInLeftAnimation, fadeInLeftEnterAnimation, fadeInRightAnimation, fadeInRightEnterAnimation, fadeInUpAnimation, fadeInUpEnterAnimation, fadeOutAnimation, fadeOutDownAnimation, fadeOutDownLeaveAnimation, fadeOutLeaveAnimation, fadeOutLeftAnimation, fadeOutLeftLeaveAnimation, fadeOutRightAnimation, fadeOutRightLeaveAnimation, fadeOutUpAnimation, fadeOutUpLeaveAnimation, flashAnimation, flashEnterAnimation, flyInAnimation, flyInDownAnimation, flyInDownEnterAnimation, flyInEnterAnimation, flyInLeftAnimation, flyInLeftEnterAnimation, flyInRightAnimation, flyInRightEnterAnimation, flyInUpAnimation, flyInUpEnterAnimation, flyOutAnimation, flyOutDownAnimation, flyOutDownLeaveAnimation, flyOutLeaveAnimation, flyOutRightAnimation, flyOutRightLeaveAnimation, flyOutUpAnimation, flyOutUpLeaveAnimation, glowAnimation, glowEnterAnimation, jiggleAnimation, jiggleEnterAnimation, pulseAnimation, pulseEnterAnimation, shakeAnimation, shakeEnterAnimation, slideDownAnimation, slideInDownAnimation, slideInDownEnterAnimation, slideInLeftAnimation, slideInLeftEnterAnimation, slideInRightAnimation, slideInRightEnterAnimation, slideInUpAnimation, slideInUpEnterAnimation, slideLeftAnimation, slideOutDownAnimation, slideOutDownLeaveAnimation, slideOutLeftAnimation, slideOutLeftLeaveAnimation, slideOutRightAnimation, slideOutRightLeaveAnimation, slideOutUpAnimation, slideOutUpLeaveAnimation, slideRightAnimation, slideUpAnimation, tadaAnimation, tadaEnterAnimation, zoomInAnimation, zoomInEnterAnimation, zoomOutAnimation, zoomOutLeaveAnimation };
//# sourceMappingURL=mdb-angular-ui-kit-animations.mjs.map
