import { $, createEventScope } from '../core/dom.js';
export function mountNavigation() {
  const header = $('.header'),
    button = $('.menu-toggle'),
    scope = createEventScope();
  const media = matchMedia('(max-width:900px)');
  function close() {
    header.classList.remove('open');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Open navigation');
  }
  scope.listen(button, 'click', () => {
    const open = header.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  scope.listen(header, 'keydown', (event) => {
    if (event.key === 'Escape') {
      close();
      button.focus();
    }
  });
  scope.listen(media, 'change', close);
  scope.listen($('.skip'), 'click', (event) => {
    event.preventDefault();
    $('#main').focus({ preventScroll: true });
    $('#main').scrollIntoView({ behavior: 'instant' });
  });
  return { close, dispose: () => scope.dispose() };
}
