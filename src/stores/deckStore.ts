import { writable } from 'svelte/store';
import * as cards from '../data/deck.json';

function init() {
  const { set, subscribe, update } = writable(null);

  return {
    set,
    subscribe,
    update,
    deck: cards,
  };
}

export const DeckStore = init();
