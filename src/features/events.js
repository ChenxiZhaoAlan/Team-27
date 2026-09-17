import { $, $$, createEventScope } from '../core/dom.js';
import { events } from '../data/events.js';
import { eventRow } from '../ui/templates.js';
export function mountEvents(root, state, motion) {
  const scope = createEventScope();
  $$('[data-filter]', root).forEach((button) =>
    scope.listen(button, 'click', () => {
      state.eventFilter = button.dataset.filter;
      $$('[data-filter]', root).forEach((control) => {
        const selected = control === button;
        control.classList.toggle('active', selected);
        control.setAttribute('aria-pressed', String(selected));
      });
      const selected = events.filter(
        (event) => state.eventFilter === 'all' || event.kind === state.eventFilter,
      );
      // Keep the controls and their keyboard focus; only replace the results.
      $('.events-list', root).innerHTML = selected.map(eventRow).join('');
      motion.start(false);
    }),
  );
  return () => scope.dispose();
}
