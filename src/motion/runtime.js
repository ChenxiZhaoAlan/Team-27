export const gsap = window.gsap;
export const ScrollTrigger = window.ScrollTrigger;
export const hasMotionRuntime = Boolean(gsap && ScrollTrigger);
if (hasMotionRuntime) gsap.registerPlugin(ScrollTrigger);
