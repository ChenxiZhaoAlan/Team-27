import { html } from '../core/dom.js';

import { eventRow, bottom, innerTitle } from '../ui/templates.js';
import { events } from '../data/events.js';
export function eventList(activeFilter = 'all') {
  const filtered = activeFilter === 'all' ? events : events.filter((e) => e.kind === activeFilter);
  return html`${innerTitle('03 / The Programme', 'Make an evening<br>of it.', 'A regular table. A new format. A chance to play, learn and connect. Explore our proposed programme.')}
    <section class="section section-tight">
      <div class="filters" role="group" aria-label="Filter events">
        ${[
          ['all', 'All events'],
          ['social', 'Club nights'],
          ['learn', 'Learn & play'],
          ['series', 'The series'],
        ]
          .map(
            ([id, label]) =>
              html`<button
                class="filter ${activeFilter === id ? 'active' : ''}"
                aria-pressed="${activeFilter === id}"
                data-filter="${id}"
              >
                ${label}
              </button>`,
          )
          .join('')}
      </div>
      <div class="events-list" aria-live="polite">${filtered.map(eventRow).join('')}</div>
      <p class="note">
        Programme preview. Dates, venues and booking details are not yet confirmed.
      </p>
    </section>
    ${bottom('New to the table?', 'club', 'Meet the club')}`;
}
