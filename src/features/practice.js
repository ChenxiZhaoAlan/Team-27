import { $, $$, createEventScope } from '../core/dom.js';
import { hands, checkHand } from '../data/hands.js';
import { online } from '../pages/online.js';
export function mountPractice(root, state, motion) {
  const scope = createEventScope();
  scope.listen(root, 'click', (event) => {
    const card = event.target.closest('[data-card]');
    if (card) {
      if (state.practice.revealed) return;
      state.practice.revealed = true;
      $$('[data-card]', root).forEach((item, index) => {
        item.classList.add('revealed');
        item.setAttribute('aria-label', hands[state.practice.index].hole[index].join(' '));
      });
      $$('[data-answer]', root).forEach((button) => {
        button.disabled = false;
      });
      $('.practice-status', root).textContent = 'READ THE FLOP. MAKE YOUR CALL.';
      $('.practice-feedback', root).innerHTML = '<p>Choose a hand category.</p>';
    }
    const answer = event.target.closest('[data-answer]');
    if (answer && !answer.disabled) {
      const correct = checkHand(state.practice.index, answer.dataset.answer);
      const text = correct
        ? hands[state.practice.index].text
        : 'Look at the ranks on your hole cards and the flop together. You can try again.';
      $('.practice-feedback', root).innerHTML =
        `<h3>${correct ? 'A good read.' : 'Take another look.'}</h3><p>${text}</p>`;
      motion.animate((gsap) =>
        gsap.from($('.practice-feedback', root), { y: 8, opacity: 0, duration: 0.25 }),
      );
    }
    if (event.target.closest('#next-hand')) {
      state.practice.index = (state.practice.index + 1) % hands.length;
      state.practice.revealed = false;
      const fragment = document.createElement('template');
      fragment.innerHTML = online(state.practice);
      const next = fragment.content.querySelector('.practice-wrap');
      $('.practice-wrap', root).replaceWith(next);
      motion.start(false);
      motion.animate((gsap) =>
        gsap.from($$('[data-card]', root), {
          x: 100,
          y: -65,
          rotation: 35,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
        }),
      );
      $('#next-hand', root).focus({ preventScroll: true });
    }
  });
  return () => scope.dispose();
}
