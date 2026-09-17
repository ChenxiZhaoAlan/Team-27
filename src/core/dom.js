export const $ = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
export function createEventScope() {
  const controller = new AbortController();
  return {
    listen(target, event, callback, options = {}) {
      target?.addEventListener(event, callback, { ...options, signal: controller.signal });
    },
    dispose() {
      controller.abort();
    },
  };
}
// Templates contain trusted local copy only. Escape any future external data before use.
export function html(strings, ...values) {
  return strings.reduce((result, part, index) => result + part + (values[index] ?? ''), '');
}
