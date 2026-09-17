import { hasMotionRuntime } from './runtime.js';
export function createMotionPreferences() {
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  const subscribers = new Set();
  let manualPause = false;
  const preferences = {
    get enabled() {
      return hasMotionRuntime && !manualPause && !media.matches;
    },
    toggle() {
      manualPause = !manualPause;
      notify();
    },
    subscribe(listener) {
      subscribers.add(listener);
      return () => subscribers.delete(listener);
    },
    dispose() {
      media.removeEventListener('change', notify);
      subscribers.clear();
    },
  };
  function notify() {
    for (const listener of subscribers) listener(preferences.enabled);
  }
  media.addEventListener('change', notify);
  return preferences;
}
