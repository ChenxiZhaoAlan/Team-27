import { $, $$, createEventScope } from './core/dom.js';
import { createState } from './core/state.js';
import { createRouter } from './core/router.js';
import { renderPage, pageTitle } from './pages/index.js';
import { createMotionPreferences } from './motion/preferences.js';
import { createPageMotion } from './motion/page.js';
import { createPageTransition } from './motion/transition.js';
import { mountIntro } from './motion/intro.js';
import { mountMembers } from './features/members.js';
import { mountEvents } from './features/events.js';
import { mountPractice } from './features/practice.js';
import { mountDialogs } from './features/dialogs.js';
import { mountNavigation } from './features/navigation.js';
import { mountShare } from './features/share.js';

const root = $('#main');
const state = createState();
const preferences = createMotionPreferences();
const appEvents = createEventScope();
const navigation = mountNavigation();
const dialogs = mountDialogs(preferences);
const disposeShare = mountShare(dialogs);
let introActive = true,
  pageMotion,
  disposeFeature = () => {};
function render(route, focus = false) {
  disposeFeature();
  pageMotion?.dispose();
  root.innerHTML = renderPage(route, state);
  document.title = pageTitle(route);
  navigation.close();
  $$('.header nav a').forEach((link) => {
    if (link.getAttribute('href') === `#/${route.split('/')[0]}`)
      link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  pageMotion = createPageMotion(root, preferences, () => introActive);
  const mount = { members: mountMembers, events: mountEvents, online: mountPractice }[route];
  disposeFeature = mount ? mount(root, state, pageMotion) : () => {};
  pageMotion.start(true);
  if (focus) root.focus({ preventScroll: true });
}
const transition = createPageTransition($('.page-curtain'), preferences, () => introActive);
const router = createRouter({
  render,
  transition,
  onError(error) {
    console.error('Navigation failed', error);
    root.textContent = 'This page could not be displayed. Please reload to try again.';
  },
});
function syncMotion() {
  const paused = !preferences.enabled;
  document.body.classList.toggle('motion-paused', paused);
  document.documentElement.classList.toggle('motion-paused', paused);
  const button = $('#motion-toggle');
  button.setAttribute('aria-pressed', String(paused));
  button.setAttribute('aria-label', paused ? 'Enable motion' : 'Pause motion');
  button.title = paused ? 'Enable motion' : 'Pause motion';
  button.textContent = paused ? '▷' : 'Ⅱ';
}
const unsubscribeMotion = preferences.subscribe(syncMotion);
appEvents.listen($('#motion-toggle'), 'click', () => preferences.toggle());
syncMotion();
router.start();
const intro = mountIntro(preferences, () => {
  introActive = false;
  pageMotion.start(true);
  root.focus({ preventScroll: true });
});
document.fonts?.ready.then(() => pageMotion.refresh());
// Page-scoped effects are disposed on each navigation. Full app cleanup is explicit as well.
appEvents.listen(window, 'pagehide', (event) => {
  if (event.persisted) return;
  router.dispose();
  transition.dispose();
  intro.dispose();
  pageMotion.dispose();
  disposeFeature();
  disposeShare();
  dialogs.dispose();
  navigation.dispose();
  unsubscribeMotion();
  preferences.dispose();
  appEvents.dispose();
});
