import test from 'node:test';
import assert from 'node:assert/strict';
import { routeName } from '../src/core/router.js';
import { checkHand, hands } from '../src/data/hands.js';
import { createState } from '../src/core/state.js';
test('offline hash links preserve nested event routes', () => {
  assert.equal(routeName('#/'), '');
  assert.equal(routeName('#/events/monthly/'), 'events/monthly');
  assert.equal(routeName('#/unknown'), 'unknown');
});
test('practice handles correct, incorrect and invalid input', () => {
  assert.equal(checkHand(0, 'Three of a kind'), true);
  assert.equal(checkHand(0, 'One pair'), false);
  assert.equal(checkHand(1, 'One pair'), true);
  assert.equal(checkHand(2, 'Straight'), true);
  assert.throws(() => checkHand(hands.length, 'Straight'), RangeError);
});
test('independent app sessions never share mutable member state', () => {
  const a = createState(),
    b = createState();
  a.memberCards.add(1);
  a.practice.index = 2;
  assert.equal(b.memberCards.size, 0);
  assert.equal(b.practice.index, 0);
});
