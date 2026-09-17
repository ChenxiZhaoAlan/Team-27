import { html } from '../core/dom.js';

import { navLink, innerTitle } from '../ui/templates.js';
import { hands } from '../data/hands.js';
function playingCard(c, i, open = false) {
  return html`<button
    class="playing-card ${open ? 'revealed' : ''}"
    aria-label="${open ? `${c[0]} of ${{ '♠': 'spades', '♥': 'hearts', '♦': 'diamonds', '♣': 'clubs' }[c[1]]}` : 'Reveal hole cards'}"
    data-card
  >
    <span class="card-inner"
      ><span class="card-back">27</span
      ><span class="card-face ${'♥♦'.includes(c[1]) ? 'red-suit' : ''}"
        ><small>${c[0]}</small>${c[1]}</span
      ></span
    >
  </button>`;
}
export function online({ index: handIndex = 0, revealed: handOpen = false } = {}) {
  const h = hands[handIndex];
  return html`${innerTitle('05 / The Practice Room', 'A better read.<br>One hand at a time.', 'Try a short hand-reading exercise. Turn over your cards, read the flop and identify the hand. No stakes. Just a little practice.')}
    <section class="practice-wrap">
      <div class="practice-table">
        <span class="eyebrow practice-label">Your hole cards</span>
        <div class="playing-hand">
          ${h.hole.map((c, i) => playingCard(c, i, handOpen)).join('')}
        </div>
        <div class="board" aria-label="The flop">
          ${h.board.map((c) => html`<span class="board-card ${'♥♦'.includes(c[1]) ? 'red-suit' : ''}">${c[0]}${c[1]}</span>`).join('')}
        </div>
        <p class="practice-status">
          ${handOpen ? 'READ THE FLOP. MAKE YOUR CALL.' : 'TAP A CARD TO REVEAL YOUR HAND'}
        </p>
      </div>
      <div class="practice-text">
        <span class="eyebrow red">Hand ${String(handIndex + 1).padStart(2, '0')} / 03</span>
        <h2>What do you see?</h2>
        <p>Use your two hole cards and the three cards on the flop. Which hand do they make?</p>
        <div class="practice-actions">
          ${['One pair', 'Three of a kind', 'Straight'].map((label) => html`<button data-answer="${label}" ${handOpen ? '' : 'disabled'}>${label}</button>`).join('')}
        </div>
        <div class="practice-feedback" aria-live="polite">
          <p>${handOpen ? 'Choose a hand category.' : 'Reveal your cards to begin.'}</p>
        </div>
        <button class="text-button" style="color:var(--paper)" id="next-hand">
          Deal the next hand ↗
        </button>
      </div>
    </section>
    <section class="section manifesto">
      <span class="eyebrow red">Always something to learn</span>
      <div>
        <p data-reveal>Take the conversation<br />back to the table.</p>
        <div style="margin-top:30px">${navLink('events', 'Find a session')}</div>
        <p class="note" style="font:12px/1.6 var(--sans);letter-spacing:0;margin-top:24px">
          This is a local, scripted practice demo. It is not an AI opponent or a connected poker
          platform.
        </p>
      </div>
    </section>`;
}
