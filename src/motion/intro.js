import { $, $$, createEventScope } from '../core/dom.js';
import { openingTemplate } from '../ui/intro-template.js';
import { gsap } from './runtime.js';
export function mountIntro(preferences, onFinish) {
  const element = document.createElement('section');
  element.className = 'opening';
  element.setAttribute('role', 'dialog');
  element.setAttribute('aria-modal', 'true');
  element.setAttribute('aria-label', 'Enter The 27 Society');
  element.innerHTML = openingTemplate();
  const background = [$('.header'), $('#main'), $('.footer'), $('.skip')];
  const previousInert = background.map((el) => el.inert);
  background.forEach((el) => {
    el.inert = true;
  });
  document.body.append(element);
  document.body.classList.add('intro-open');
  const events = createEventScope();
  let context,
    idle,
    pointerEvents,
    playing = false,
    disposed = false;
  function stopMotion() {
    pointerEvents?.dispose();
    context?.revert();
    context = null;
  }
  function finish() {
    if (disposed) return;
    disposed = true;
    unsubscribe();
    events.dispose();
    stopMotion();
    element.remove();
    background.forEach((el, index) => {
      el.inert = previousInert[index];
    });
    document.body.classList.remove('intro-open');
    onFinish();
  }
  function enter(skip = false) {
    if (playing || disposed) return;
    playing = true;
    idle?.kill();
    pointerEvents?.dispose();
    if (skip || !preferences.enabled) {
      finish();
      return;
    }
    context.add(() => {
      gsap
        .timeline({ onComplete: finish })
        .to('.opening-copy,.opening-top,.opening-bottom', { opacity: 0, y: -14, duration: 0.23 }, 0)
        .to('.entry-inner', { rotationY: 180, duration: 0.65, ease: 'power3.inOut' }, 0)
        .to(
          '.entry-left',
          { x: -300, rotation: -40, z: 240, duration: 0.72, ease: 'power3.inOut' },
          0.05,
        )
        .to(
          '.entry-right',
          { x: 300, rotation: 40, z: 240, duration: 0.72, ease: 'power3.inOut' },
          0.09,
        )
        .to(
          '.opening-deck',
          { rotationX: 0, rotationY: 0, rotationZ: 0, z: 150, duration: 0.7 },
          0.1,
        )
        .to('.opening-number', { scale: 1.35, opacity: 0.1, duration: 1 }, 0.1)
        .to('.opening-photo', { scale: 1.2, opacity: 0.45, duration: 0.8 }, 0.2)
        .to(
          '.entry-main',
          { z: 1100, rotationZ: 20, scale: 1.6, duration: 0.8, ease: 'power3.in' },
          0.66,
        )
        .to(
          '.entry-left',
          { x: -650, y: -180, rotation: -100, opacity: 0, duration: 0.65, ease: 'power3.in' },
          0.7,
        )
        .to(
          '.entry-right',
          { x: 650, y: 180, rotation: 100, opacity: 0, duration: 0.65, ease: 'power3.in' },
          0.7,
        )
        .to('.opening-flash', { scaleY: 1, duration: 0.36, ease: 'power3.inOut' }, 1.1)
        .to(element, { yPercent: -100, duration: 0.62, ease: 'power4.inOut' }, 1.38);
    });
  }
  function startMotion(entrance = false) {
    stopMotion();
    if (!preferences.enabled || disposed) return;
    pointerEvents = createEventScope();
    context = gsap.context(() => {
      if (entrance) {
        gsap.from('.entry-card', {
          y: 100,
          opacity: 0,
          rotation: 25,
          duration: 1,
          stagger: 0.11,
          ease: 'power3.out',
        });
        gsap.from('.opening-copy', { y: 20, opacity: 0, duration: 0.8, delay: 0.4 });
      }
      idle = gsap.to('.opening-deck', {
        y: -13,
        rotationZ: 2,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      if (matchMedia('(pointer:fine)').matches) {
        const rx = gsap.quickTo($('.opening-deck', element), 'rotationX', {
          duration: 0.8,
          ease: 'power3.out',
        });
        const ry = gsap.quickTo($('.opening-deck', element), 'rotationY', {
          duration: 0.8,
          ease: 'power3.out',
        });
        pointerEvents.listen(element, 'pointermove', (event) => {
          rx(8 - (event.clientY / innerHeight - 0.5) * 14);
          ry((event.clientX / innerWidth - 0.5) * 22);
        });
      }
    }, element);
  }
  const unsubscribe = preferences.subscribe(() => {
    if (playing) finish();
    else startMotion(false);
  });
  events.listen($('.entry-main', element), 'click', () => enter());
  events.listen($('.opening-enter', element), 'click', () => enter());
  events.listen($('.opening-skip', element), 'click', () => enter(true));
  events.listen(element, 'keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      enter(true);
    }
    if (event.key === 'Tab') {
      const buttons = $$('button', element),
        first = buttons[0],
        last = buttons.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
  startMotion(true);
  $('.entry-main', element).focus({ preventScroll: true });
  return { dispose: finish };
}
