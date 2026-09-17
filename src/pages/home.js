import { html } from '../core/dom.js';
import { photos } from '../core/assets.js';
import { navLink, image, eventRow } from '../ui/templates.js';
import { events } from '../data/events.js';
export function home() {
  return html`<section class="hero">
      <div class="hero-copy">
        <span class="suit" aria-hidden="true">♠</span>
        <h1 aria-label="The Game Brings Us Together.">
          <span class="hero-line">The Game</span>
          <span class="hero-line">Brings Us</span>
          <span class="hero-line">Together.</span>
        </h1>
        <p>Auckland’s independent poker club.<br />People. Strategy. Community.</p>
        <div class="actions">
          ${navLink('club', 'Discover the Club', 'button dark')}${navLink('events', 'Upcoming Events', 'button')}
        </div>
        <div class="signoff">POKER · FRIENDSHIP · A BETTER YOU</div>
      </div>
      <div class="hero-stage" aria-hidden="true">
        <div class="sculpture">
          <div class="red-plane"></div>
          <div class="hero-digit digit-two">2</div>
          <img class="hero-photo" src="${photos.detail}" alt="" fetchpriority="high" />
          <div class="hero-digit digit-seven">7</div>
          <div class="stage-caption">PLAY<br />LEARN<br />CONNECT</div>
          <div class="seal">
            <span>THE SOCIETY</span><strong>TEAM27</strong><span>AUCKLAND<br />POKER CLUB</span>
          </div>
        </div>
      </div>
      <div class="hero-meta">
        <span>01 / THE 27 SOCIETY</span
        ><span class="motion-tip"><i></i>Move to explore · Scroll to discover ↓</span>
      </div>
    </section>
    <section class="section section-tight">
      <div class="section-heading">
        <span class="eyebrow">Next Event</span>${navLink('events', 'View all events')}
      </div>
      ${eventRow(events[0])}
    </section>
    <section class="section section-tight">
      <div class="stories">
        <div class="story-photo image-reveal" data-reveal>
          ${image('table', 'Illustrative members around a poker table', '', '23% center')}
        </div>
        <div class="story-copy">
          <span class="eyebrow" data-reveal>Our Story</span>
          <h2 data-reveal>A Community<br />Built Differently.</h2>
          <p data-reveal>
            A place for people who love poker to connect, improve and belong. The hand matters. So
            do the people on either side of you.
          </p>
          ${navLink('club', 'Read our story')}
        </div>
        <a class="member-teaser" href="#/members" data-tilt data-reveal
          ><span class="eyebrow red">Members</span>
          <h3>Different People.<br />Same Table.</h3>
          <div class="portrait-crop">
            ${image('table', 'A candid conversation at the table', '', '68% center')}
          </div>
          <span class="text-link">Meet the members <span>↗</span></span></a
        >
      </div>
    </section>
    <section class="section section-tight">
      <span class="eyebrow">Our Partners</span>
      <div class="partner-strip" data-reveal>
        <p>Good company.<br />Shared ambition.</p>
        <span class="eyebrow red">Partnerships open</span>${navLink('partners', 'Become a partner')}
      </div>
    </section>
    <section class="city">
      ${image('city', 'Auckland skyline at night by Alan Levine, CC0', 'city-photo')}
      <div>
        <h2 data-reveal>MORE THAN POKER.<br />A STRONGER COMMUNITY.</h2>
        <a class="round-link" href="#/club" aria-label="Discover the club">↗</a>
      </div>
      <span class="eyebrow location">Auckland<br />New Zealand</span>
    </section>`;
}
