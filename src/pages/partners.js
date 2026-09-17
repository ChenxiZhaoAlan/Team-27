import { html } from '../core/dom.js';

import { bottom, innerTitle } from '../ui/templates.js';
export function partners() {
  return html`${innerTitle('04 / Partnerships', 'Good company.<br>Shared ambition.', 'Bring something meaningful to the table. We are exploring partnerships with people and brands who share our approach to community.')}
    <section class="section section-tight partner-types">
      ${[
        [
          '01',
          'Host the evening.',
          'Thoughtful spaces for great conversations. Help create the right setting for the community.',
        ],
        [
          '02',
          'Support the game.',
          'Quality equipment, useful expertise and details that make the playing experience better.',
        ],
        [
          '03',
          'Build together.',
          'Collaborative events, shared stories and ideas that connect people beyond the table.',
        ],
      ]
        .map(
          (v) =>
            html`<article class="partner-type" data-tilt data-reveal>
              <span class="eyebrow red">${v[0]} / Possibilities</span>
              <div>
                <h3>${v[1]}</h3>
                <p>${v[2]}</p>
              </div>
              <button class="text-button" style="text-align:left" data-dialog="partner">
                Start a conversation ↗
              </button>
            </article>`,
        )
        .join('')}
    </section>
    <section class="section manifesto rule">
      <span class="eyebrow red">Our approach</span>
      <p data-reveal>
        More than a logo on a page. A partnership should add something to the experience.
      </p>
    </section>
    ${bottom('Get to know the society.', 'club', 'Our story')}`;
}
