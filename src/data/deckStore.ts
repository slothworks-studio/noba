import { writable } from 'svelte/store';
import type { Deck } from './types';

let initialDeck: Deck = {
  cards: [],
  currentCard: 0,
  default: {},
  settings: {
    onboarded: false,
    isPersisted: false,
    mode: 'initializing',
  },
};

// Check for local storage

function storageAvailable() {
  try {
    var storage = window['localStorage'],
      x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

async function getDeck(): Promise<Deck> {
  // Check if local storage is available
  // Check if the deck is persisted in local storage
  // If it is, return it.
  // if it is not, get it from json
  if (storageAvailable) {
    if (window.localStorage.getItem('noba-deck')) {
      return await JSON.parse(window.localStorage.getItem('noba-deck'));
    } else {
      let d: Deck = await import('../../static/deck.json');
      d = JSON.parse(JSON.stringify(d));
      if (d.default) {
        delete d.default;
      }
      d = shuffleDeck(d);
      saveDeck(d);
      return d;
    }
  }
}

function shuffleDeck(deck: Deck): Deck {
  deck.cards.sort(() => Math.random() - 0.5);
  deck.currentCard = 0;
  return deck;
}

function saveDeck(deck) {
  if (storageAvailable) {
    window.localStorage.setItem('noba-deck', JSON.stringify(deck));
  }
}

function reset() {
  if (storageAvailable) {
    window.localStorage.clear();
  }
}

// Store
function createDeckStore() {
  const { subscribe, set, update } = writable(initialDeck);

  return {
    init: () => {
      if (initialDeck.settings.mode === 'initializing') {
        // const d = await getDeck();
        getDeck().then((d) => {
          setTimeout(() => {
            if (d.settings.onboarded === true) {
              d.settings.mode = 'grid';
            } else {
              d.settings.mode = 'onboarding';
            }
            set(d);
          }, 5000);
        });
      }
    },
    subscribe,
    onBoardingComplete: () => {
      update((d) => {
        d.settings.onboarded = true;
        d.settings.mode = 'grid';
        saveDeck(d);
        return d;
      });
    },
    getNextCard: () =>
      update((d) => {
        if (d.currentCard < d.cards.length - 1) {
          d.cards[d.currentCard].viewed = true;
          d.currentCard = ++d.currentCard;
        } else {
          // Shuffle deck.
          d = shuffleDeck(d);
        }
        saveDeck(d);
        return d;
      }),
    reset: () => {
      reset();
      set(null);
    },
  };
}

export const DeckStore = createDeckStore();
