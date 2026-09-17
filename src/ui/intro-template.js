import { html } from '../core/dom.js';
import { photos } from '../core/assets.js';
export const openingTemplate = () =>
  html`<div class="opening-top">
      <span class="opening-brand">TEAM27</span><span class="eyebrow">AUCKLAND / NEW ZEALAND</span
      ><button class="opening-skip">Skip intro ↗</button>
    </div>
    <div class="opening-photo" style="background-image:url('${photos.detail}')"></div>
    <div class="opening-number" aria-hidden="true">27</div>
    <div class="opening-stage">
      <div class="opening-deck">
        <div class="entry-card entry-left" aria-hidden="true">
          <span class="entry-corner">A<br />♠</span><span class="entry-suit">♠</span
          ><span class="entry-corner bottom">A<br />♠</span>
        </div>
        <div class="entry-card entry-right" aria-hidden="true">
          <span class="entry-corner">A<br />♥</span><span class="entry-suit">♥</span
          ><span class="entry-corner bottom">A<br />♥</span>
        </div>
        <button class="entry-card entry-main" aria-label="Deal me in — enter the website">
          <span class="entry-inner"
            ><span class="entry-back"
              ><span class="eyebrow">THE SOCIETY</span><strong>27</strong
              ><span class="eyebrow">DEAL ME IN ↗</span></span
            ><span class="entry-face"
              ><span class="entry-corner">A<br />♣</span><span class="entry-suit">♣</span
              ><span class="entry-corner bottom">A<br />♣</span></span
            ></span
          >
        </button>
      </div>
    </div>
    <div class="opening-copy">
      <span class="eyebrow">EVERY HAND STARTS WITH A CHOICE.</span>
      <h2>Take your seat.</h2>
      <button class="opening-enter">CLICK TO DEAL <span>↗</span></button>
    </div>
    <div class="opening-bottom">
      <span>PEOPLE. STRATEGY. COMMUNITY.</span><span>ONE TABLE. A DIFFERENT PERSPECTIVE.</span>
    </div>
    <div class="opening-flash" aria-hidden="true"></div>`;
