import { $, $$, createEventScope } from '../core/dom.js';
import { gsap, ScrollTrigger } from './runtime.js';
export function createPageMotion(root, preferences, suspended = () => false) {
  let context;
  let events;
  const clear = () => {
    events?.dispose();
    context?.revert();
    context = null;
  };
  function start(entrance = false) {
    clear();
    if (!preferences.enabled || suspended()) return;
    events = createEventScope();
    context = gsap.context(() => {
      const hero = $('.hero', root);
      if (hero) {
        if (entrance) {
          gsap
            .timeline({ defaults: { ease: 'power3.out' } })
            .from('.hero-copy .suit', { y: 18, rotationY: 180, opacity: 0, duration: 0.65 })
            .from(
              '.hero-line',
              {
                y: innerWidth <= 760 ? 0 : 24,
                opacity: 0,
                duration: 0.85,
                stagger: 0.12,
                clearProps: 'transform',
              },
              0.12,
            )
            .from(
              '.hero-copy p,.hero .actions,.hero .signoff',
              { y: 18, opacity: 0, duration: 0.65, stagger: 0.1 },
              0.45,
            )
            .from('.hero-photo', { rotationY: -20, opacity: 0, duration: 1.2 }, 0.12)
            .from('.hero-digit', { opacity: 0, duration: 1.1, stagger: 0.16 }, 0.12)
            .from(
              '.red-plane,.seal,.stage-caption',
              { scale: 0.85, opacity: 0, duration: 0.9, stagger: 0.12 },
              0.5,
            );
        }
        const artWidth = () => $('.hero-stage', root).clientWidth;
        const scroll = (scrub) => ({
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub,
          invalidateOnRefresh: true,
        });
        gsap.fromTo(
          '.digit-two',
          { y: 0, rotation: 0 },
          { y: () => -artWidth() * 0.09, rotation: -3, ease: 'none', scrollTrigger: scroll(0.7) },
        );
        gsap.fromTo(
          '.digit-seven',
          { y: 0, rotation: 0 },
          { y: () => artWidth() * 0.055, rotation: 3, ease: 'none', scrollTrigger: scroll(0.8) },
        );
        gsap.fromTo(
          '.hero-photo',
          { y: 0 },
          { y: () => -artWidth() * 0.04, ease: 'none', scrollTrigger: scroll(0.8) },
        );
      }
      if (entrance) {
        $$('[data-title]', root).forEach((el) =>
          gsap.from(el, { y: 28, opacity: 0, duration: 0.85, ease: 'power3.out' }),
        );
        $$('[data-reveal]', root).forEach((el) =>
          gsap.from(el, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 93%', once: true },
          }),
        );
      }
      $$('.image-reveal img', root).forEach((el) =>
        gsap.fromTo(
          el,
          { scale: 1.14 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: el.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          },
        ),
      );
      if ($('.city-photo', root))
        gsap.fromTo(
          '.city-photo',
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: {
              trigger: $('.city', root),
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          },
        );
      gsap.fromTo(
        $('.progress'),
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        },
      );
      // MatchMedia also disposes its pointer tweens when a device changes pointer capability.
      const pointerMedia = gsap.matchMedia();
      pointerMedia.add('(pointer: fine)', () => {
        const pointerEvents = createEventScope();
        const tilt = (trigger, target, xAmount, yAmount) => {
          if (!trigger || !target) return;
          const rx = gsap.quickTo(target, 'rotationX', { duration: 0.65, ease: 'power3.out' });
          const ry = gsap.quickTo(target, 'rotationY', { duration: 0.65, ease: 'power3.out' });
          pointerEvents.listen(trigger, 'pointermove', (e) => {
            const r = trigger.getBoundingClientRect();
            rx((-(e.clientY - r.top - r.height / 2) / r.height) * xAmount);
            ry(((e.clientX - r.left - r.width / 2) / r.width) * yAmount);
          });
          pointerEvents.listen(trigger, 'pointerleave', () => {
            rx(0);
            ry(0);
          });
        };
        tilt(hero, $('.sculpture', root), 10, 14);
        $$('[data-tilt]', root).forEach((el) => tilt(el, el, 8, 10));
        return () => pointerEvents.dispose();
      });
      return () => pointerMedia.revert();
    }, root);
    $$('img', root).forEach((img) => {
      if (!img.complete) events.listen(img, 'load', () => ScrollTrigger.refresh(), { once: true });
    });
    ScrollTrigger.refresh();
  }
  const unsubscribe = preferences.subscribe(() => start(false));
  return {
    start,
    animate(callback) {
      if (preferences.enabled && context) context.add(() => callback(gsap));
    },
    refresh() {
      if (preferences.enabled) ScrollTrigger.refresh();
    },
    dispose() {
      unsubscribe();
      clear();
    },
  };
}
