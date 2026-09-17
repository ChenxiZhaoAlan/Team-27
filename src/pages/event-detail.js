import { html } from '../core/dom.js';

import { image, bottom } from '../ui/templates.js';
import { events } from '../data/events.js';
import { notFound } from './not-found.js';
export function eventDetail(id) {
  const e = events.find((x) => x.id === id);
  if (!e) return notFound();
  return html`<section class="section event-hero">
      <div>
        <a class="eyebrow" href="#/events">← The programme</a>
        <h1 data-title>${e.name}</h1>
        <p data-reveal>${e.copy}</p>
        <div class="event-facts" data-reveal>
          <div><span class="eyebrow">When</span><strong>Date to be announced</strong></div>
          <div><span class="eyebrow">Where</span><strong>Auckland · venue TBA</strong></div>
          <div><span class="eyebrow">Format</span><strong>${e.label}</strong></div>
        </div>
        <button class="button dark" data-dialog="event">I’m interested <span>↗</span></button>
        <p class="note">Concept programme · booking is not open.</p>
      </div>
      <div class="event-detail-photo image-reveal" data-reveal>
        ${image(id === 'learn' ? 'detail' : 'table', 'Illustrative poker event photography')}
      </div>
    </section>
    <section class="section rule schedule">
      <div>
        <span class="eyebrow red">The evening</span>
        <h2 data-reveal>A little structure.<br />Plenty of room.</h2>
      </div>
      <div>
        ${[
          [
            '01',
            'Meet the table.',
            'Settle in, meet the people around you and get comfortable with the format.',
          ],
          [
            '02',
            'Play a few hands.',
            'Enjoy a considered game in good company. There is always room for a question.',
          ],
          [
            '03',
            'Keep the conversation going.',
            'Talk through a memorable hand, swap perspectives and make plans for next time.',
          ],
        ]
          .map(
            (v) =>
              html`<div class="schedule-row" data-reveal>
                <span class="eyebrow red">${v[0]}</span>
                <div>
                  <h3>${v[1]}</h3>
                  <p>${v[2]}</p>
                </div>
              </div>`,
          )
          .join('')}
      </div>
    </section>
    ${bottom('There is more at the table.', 'events', 'All events')}`;
}
