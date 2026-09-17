import { html } from '../core/dom.js';

import { image, bottom, innerTitle } from '../ui/templates.js';
export function club() {
  return html`${innerTitle('01 / The Club', 'A good game.<br>A better circle.', 'We bring people together around a shared fascination with poker. The decisions, the conversations and the unexpected connections.')}
    <div class="full-photo image-reveal" data-reveal>
      ${image('table', 'Illustrative poker club gathering')}
    </div>
    <section class="section manifesto">
      <span class="eyebrow red" data-reveal>Our point of view</span>
      <p data-reveal>
        Some of the best things happen across a table. A different perspective. A new friendship. A
        little more confidence in your next move.
      </p>
    </section>
    <section class="section section-tight values">
      ${[
        [
          '01',
          'Play with purpose.',
          'Pay attention, respect the table and enjoy the challenge. A good game leaves everyone wanting to come back.',
        ],
        [
          '02',
          'Stay curious.',
          'There is always another question to ask, another decision to unpack and another way to see a hand.',
        ],
        [
          '03',
          'Make room.',
          'Experience is welcome. So is a fresh pair of eyes. A stronger community begins with an open seat.',
        ],
      ]
        .map(
          (v) =>
            html`<article class="value" data-reveal>
              <span class="number">${v[0]}</span>
              <h3>${v[1]}</h3>
              <p>${v[2]}</p>
            </article>`,
        )
        .join('')}
    </section>
    <section class="section club-end">
      <div>
        <span class="eyebrow" data-reveal>Your seat is waiting</span>
        <h2 data-reveal>Come for the game.<br />Stay for the people.</h2>
      </div>
      <button
        class="button"
        style="border-color:var(--paper);color:var(--paper)"
        data-dialog="join"
      >
        Find your place ↗
      </button>
    </section>
    ${bottom('See what’s next.', 'events', 'Explore events')}`;
}
