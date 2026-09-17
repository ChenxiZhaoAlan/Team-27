import { $, createEventScope } from '../core/dom.js';
import { dialogCopy } from '../data/dialogs.js';
import { dialogTemplate } from '../ui/dialog-template.js';
import { gsap } from '../motion/runtime.js';
export function mountDialogs(preferences) {
  const dialog = $('#dialog'),
    content = $('#dialog-content'),
    scope = createEventScope();
  let context;
  function clearAnimation() {
    context?.revert();
    context = null;
  }
  function open(kind) {
    content.innerHTML = dialogTemplate(kind, dialogCopy[kind] || dialogCopy.contact);
    clearAnimation();
    if (!dialog.open) dialog.showModal();
    if (preferences.enabled)
      context = gsap.context(
        () => gsap.from(dialog, { y: 16, opacity: 0, duration: 0.25 }),
        dialog,
      );
  }
  scope.listen(document, 'click', (event) => {
    const trigger = event.target.closest('[data-dialog]');
    if (trigger) open(trigger.dataset.dialog);
    if (event.target.closest('#dialog a')) dialog.close();
  });
  scope.listen($('.close-dialog'), 'click', () => dialog.close());
  scope.listen(dialog, 'close', clearAnimation);
  scope.listen(dialog, 'click', (event) => {
    if (event.target === dialog) {
      const r = dialog.getBoundingClientRect();
      if (
        event.clientX < r.left ||
        event.clientX > r.right ||
        event.clientY < r.top ||
        event.clientY > r.bottom
      )
        dialog.close();
    }
  });
  scope.listen(dialog, 'submit', (event) => {
    event.preventDefault();
    const route = $('#interest').value;
    dialog.close();
    location.hash = '/' + route;
  });
  const unsubscribe = preferences.subscribe((enabled) => {
    if (!enabled) clearAnimation();
  });
  return {
    showShareHelp() {
      open('contact');
      content.innerHTML =
        '<span class="eyebrow red">Share the society</span><h2 id="dialog-title">One file.<br>The whole experience.</h2><p>Send the standalone HTML file to your friends. Download it and open it in a browser to view the complete experience.</p><p class="note">For reviewing or editing code, use the separate source package.</p>';
    },
    dispose() {
      unsubscribe();
      scope.dispose();
      clearAnimation();
      if (dialog.open) dialog.close();
    },
  };
}
