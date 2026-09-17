import { $, createEventScope } from '../core/dom.js';
export function mountShare(dialogs) {
  const scope = createEventScope();
  let timeout;
  function toast(message) {
    const el = $('.toast');
    el.textContent = message;
    el.classList.add('visible');
    clearTimeout(timeout);
    timeout = setTimeout(() => el.classList.remove('visible'), 3000);
  }
  scope.listen($('#share'), 'click', async () => {
    if (location.protocol === 'file:') {
      dialogs.showShareHelp();
      return;
    }
    try {
      await navigator.clipboard.writeText(location.href);
      toast('Link copied.');
    } catch {
      toast('Copy the address from your browser to share.');
    }
  });
  return () => {
    scope.dispose();
    clearTimeout(timeout);
  };
}
