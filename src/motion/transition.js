import { gsap } from './runtime.js';
export function createPageTransition(element, preferences, suspended = () => false) {
  let tween,
    settle,
    sequence = 0;
  const hide = () => {
    element.style.visibility = 'hidden';
  };
  function cancel() {
    sequence++;
    tween?.kill();
    tween = null;
    settle?.();
    settle = null;
    hide();
  }
  function move(from, to, duration) {
    return new Promise((resolve) => {
      settle = resolve;
      tween = gsap.fromTo(
        element,
        { y: 0, yPercent: from },
        {
          y: 0,
          yPercent: to,
          duration,
          ease: 'power3.inOut',
          onComplete: () => {
            settle = null;
            resolve();
          },
        },
      );
    });
  }
  const unsubscribe = preferences.subscribe((enabled) => {
    if (!enabled) {
      tween?.progress(1);
      hide();
    }
  });
  hide();
  return {
    async swap(render) {
      cancel();
      const current = sequence;
      if (!preferences.enabled || suspended()) {
        render();
        return;
      }
      element.style.visibility = 'visible';
      await move(101, 0, 0.28);
      if (current !== sequence) return;
      render();
      if (!preferences.enabled) {
        hide();
        return;
      }
      await move(0, -101, 0.36);
      if (current === sequence) hide();
    },
    cancel,
    dispose() {
      unsubscribe();
      cancel();
    },
  };
}
