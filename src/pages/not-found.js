import { html } from '../core/dom.js';

import { navLink, innerTitle } from '../ui/templates.js';
export function notFound() {
  return html`${innerTitle('Lost at the table?', 'A different hand.', 'That page is not in this deck. Head back to the society to continue.')}
    <section class="section">${navLink('', 'Back to home', 'button dark')}</section>`;
}
