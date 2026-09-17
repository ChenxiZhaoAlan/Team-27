export function routeName(hash) {
  return hash.replace(/^#\/?/, '').replace(/\/$/, '');
}
export function createRouter({ render, transition, onError }) {
  let generation = 0;
  const current = () => routeName(location.hash);
  async function navigate() {
    const ticket = ++generation;
    try {
      await transition.swap(() => {
        if (ticket !== generation) return;
        window.scrollTo({ top: 0, behavior: 'instant' });
        render(current(), true);
      });
    } catch (error) {
      transition.cancel();
      onError(error);
    }
  }
  return {
    start() {
      render(current(), false);
      window.addEventListener('hashchange', navigate);
    },
    dispose() {
      generation++;
      window.removeEventListener('hashchange', navigate);
      transition.cancel();
    },
  };
}
