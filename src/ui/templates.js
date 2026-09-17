import { html } from '../core/dom.js';
import { photos } from '../core/assets.js';
export const navLink = (url, text, classes = 'text-link') =>
  html`<a href="#/${url}" class="${classes}">${text} <span aria-hidden="true">↗</span></a>`;
export const image = (type, alt, cls = '', position = '') =>
  html`<img
    src="${photos[type]}"
    alt="${alt}"
    class="${cls}"
    ${position ? `style="object-position:${position}"` : ''}
    loading="lazy"
    decoding="async"
  />`;
export function eventRow(e) {
  return html`<a class="event-row" href="#/events/${e.id}" data-reveal
    ><div class="date-block">
      <span>UP NEXT</span><strong>${e.suit}</strong><span>DATE TBA</span>
    </div>
    <div class="event-image">${image('table', 'An illustrative poker table scene')}</div>
    <div class="event-info">
      <h3>${e.name}</h3>
      <div class="metadata">
        <span>↗ Auckland</span><span>◷ Time to be announced</span><span>${e.label}</span>
      </div>
      <p>${e.copy}</p>
    </div>
    <div class="row-arrow" aria-hidden="true">↗</div></a
  >`;
}
export const bottom = (title, route, label) =>
  html`<section class="page-bottom-link">
    <h2 data-reveal>${title}</h2>
    ${navLink(route, label)}
  </section>`;
export const innerTitle = (label, title, copy, ghost = '27') =>
  html`<section class="inner-hero">
    <a class="back" href="#/">← Back to the society</a
    ><span class="eyebrow red" data-reveal>${label}</span>
    <h1 data-title>${title}</h1>
    <p data-reveal>${copy}</p>
    <span class="ghost" aria-hidden="true">${ghost}</span>
  </section>`;
