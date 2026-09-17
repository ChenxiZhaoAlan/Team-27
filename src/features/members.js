import { $, $$, createEventScope } from '../core/dom.js';
export function mountMembers(root, state) {
  const scope = createEventScope();
  function reflect(button, index) {
    const expanded = state.memberCards.has(index);
    button.setAttribute('aria-expanded', String(expanded));
    $('.member-front', button).setAttribute('aria-hidden', String(expanded));
    $('.member-back', button).setAttribute('aria-hidden', String(!expanded));
  }
  $$('[data-member]', root).forEach((button, index) => {
    reflect(button, index);
    scope.listen(button, 'click', () => {
      if (state.memberCards.has(index)) state.memberCards.delete(index);
      else state.memberCards.add(index);
      reflect(button, index);
    });
  });
  return () => scope.dispose();
}
