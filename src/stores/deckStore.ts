import { writable, Writable } from 'svelte/store';

function init() {
  const { set, subscribe, update } = writable(null);

  return {
    set,
    subscribe,
    update,
    deck: [],
  };
}

export const DeckStore = init();
