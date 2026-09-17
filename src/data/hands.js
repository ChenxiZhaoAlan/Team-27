export const hands = [
  {
    hole: [
      ['K', '♠'],
      ['K', '♥'],
    ],
    board: [
      ['K', '♦'],
      ['7', '♣'],
      ['2', '♦'],
    ],
    answer: 'Three of a kind',
    text: 'Three kings make three of a kind. The other two cards do not change that hand category.',
  },
  {
    hole: [
      ['A', '♠'],
      ['Q', '♥'],
    ],
    board: [
      ['A', '♦'],
      ['8', '♣'],
      ['3', '♦'],
    ],
    answer: 'One pair',
    text: 'The two aces make one pair. Your queen is a side card, often called a kicker.',
  },
  {
    hole: [
      ['J', '♠'],
      ['10', '♥'],
    ],
    board: [
      ['9', '♦'],
      ['8', '♣'],
      ['7', '♦'],
    ],
    answer: 'Straight',
    text: 'Jack, ten, nine, eight, seven: five consecutive ranks make a straight, regardless of suit.',
  },
];
export function checkHand(index, answer) {
  const hand = hands[index];
  if (!hand) throw new RangeError('Unknown practice hand');
  return answer === hand.answer;
}
