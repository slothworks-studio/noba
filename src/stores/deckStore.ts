import { writable } from 'svelte/store';
import * as cards from '../data/deck.json';

let deck;

getDeck();

function init() {
  getDeck();
  const { set, subscribe, update } = writable(null);

  return {
    set,
    subscribe,
    update,
    deck: cards,
  };
}

function getDeck() {
  deck = localStorage.getItem('noba-deck');
  if (deck === null) {
    deck = import('../data/deck.json');
  }
}

export const DeckStore = init();
