import { html } from '../core/dom.js';

import { image, bottom, innerTitle } from '../ui/templates.js';
import { roles } from '../data/members.js';
export function members() {
  return html`${innerTitle('02 / Our People', 'Different people.<br>Same table.', 'It is the mix of perspectives that makes a table interesting. Turn a card to discover the spirit of our community.')}
    <section class="section section-tight">
      <div class="members-grid">
        ${roles
          .map(
            (r, i) =>
              html`<button
                class="member-card"
                aria-expanded="false"
                aria-label="Turn card: ${r[0]}"
                data-member
                data-reveal
              >
                <span class="member-card-inner"
                  ><span class="member-front"
                    >${image('table', 'Illustrative portrait, not an actual member', '', r[3])}<span
                      class="member-label"
                      ><span class="eyebrow">${r[1]}</span>
                      <h3>${r[0]}</h3>
                      <span class="eyebrow">Turn the card ↗</span></span
                    ></span
                  ><span class="member-back" aria-hidden="true"
                    ><span class="suit">${r[2]}</span>
                    <h3>${r[0]}</h3>
                    <p>${r[4]}</p>
                    <span class="eyebrow">Back to the table ↶</span></span
                  ></span
                >
              </button>`,
          )
          .join('')}
      </div>
      <p class="note">
        Community archetypes and illustrative photography. Real member profiles will be added with
        their permission.
      </p>
    </section>
    ${bottom('A place for your perspective.', 'events', 'Find a session')}`;
}
