import { html } from '../core/dom.js';
import { navLink } from './templates.js';

export function dialogTemplate(kind, [label, title, copy]) {
  const action =
    kind === 'join'
      ? html`
          <form class="dialog-form">
            <label for="interest">What brings you to the table?</label>
            <select id="interest">
              <option value="events">Playing with good company</option>
              <option value="online">Learning the game</option>
              <option value="members">Meeting the people</option>
            </select>
            <button class="button dark" type="submit">Explore my interest ↗</button>
          </form>
        `
      : navLink(
          kind === 'partner' ? 'club' : 'events',
          kind === 'partner' ? 'Discover the club' : 'Explore the programme',
          'button dark',
        );
  return html`
    <span class="eyebrow red">${label}</span>
    <h2 id="dialog-title">${title}</h2>
    <p>${copy}</p>
    ${action}
  `;
}
