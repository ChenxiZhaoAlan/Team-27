import { home } from './home.js';
import { club } from './club.js';
import { members } from './members.js';
import { eventList } from './events.js';
import { eventDetail } from './event-detail.js';
import { partners } from './partners.js';
import { online } from './online.js';
import { notFound } from './not-found.js';
export function renderPage(route, state) {
  const views = {
    '': home,
    club,
    members,
    events: () => eventList(state.eventFilter),
    partners,
    online: () => online(state.practice),
  };
  if (route.startsWith('events/')) return eventDetail(route.split('/')[1]);
  return (views[route] || notFound)();
}
export function pageTitle(route) {
  const names = {
    club: 'The Club',
    members: 'Members',
    events: 'Events',
    partners: 'Partners',
    online: 'The Practice Room',
  };
  return `${names[route.split('/')[0]] || 'The Game Brings Us Together'} — TEAM27`;
}
