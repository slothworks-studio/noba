import { writable } from 'svelte/store';
import { produce } from 'immer';
import type { Deck } from './types';
import { access } from 'fs';

// Move to the card component
// async function buildCardHtml() {
//   card.text1 = '';
//   card.text2 = '';

//   deck.cards[deck.currentCard].content.forEach((item) => {
//     if (item.line === 1) {
//       card.text1 += `<span style="color: ${item.color}">${item.text}</span>`;
//     }
//     if (item.line === 2) {
//       card.text2 += `<span style="color: ${item.color}">${item.text}</span>`;
//     }
//   });
// }

async function init() {
  {
    if (storageAvailable) {
      if (window.localStorage.getItem('noba-deck')) {
        deck = await JSON.parse(window.localStorage.getItem('noba-deck'));
      } else {
        var d = await import('../../static/deck.json');
        deck = JSON.parse(JSON.stringify(d));
        shuffleDeck();
        saveDeck();
      }
    }
  }
}

// function getCard() {
//   deck.cards[deck.currentCard].viewed = true;
//   if (deck.currentCard > deck.cards.length) {
//     shuffleDeck();
//     deck.currentCard = 0;
//   } else {
//     deck.currentCard = ++deck.currentCard;
//   }
// }

function reset() {
  if (storageAvailable) {
    window.localStorage.clear();
  }
}

function deckStore() {
  let deck: Deck;

  const { subscribe, set, update } = writable(deck);

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

  function shuffleDeck() {
    deck.cards.sort(() => Math.random() - 0.5);
  }

  function saveDeck() {
    if (storageAvailable) {
      window.localStorage.setItem('noba-deck', JSON.stringify(deck));
    }
  }

  return {
    subscribe,
    init: async () => {
      await update((d) => {
        if (storageAvailable) {
          if (window.localStorage.getItem('noba-deck')) {
            d = JSON.parse(window.localStorage.getItem('noba-deck'));
          } else {
            import('../../static/deck.json').then((val) => {
              d = val;
              return d;
            });
          }
        }

        return d;
      });
      if (storageAvailable) {
        if (window.localStorage.getItem('noba-deck')) {
          deck = await JSON.parse(window.localStorage.getItem('noba-deck'));
        } else {
          var d = await import('../../static/deck.json');
          deck = JSON.parse(JSON.stringify(d));
          shuffleDeck();
          saveDeck();
        }
      }
    },
    getNextCard: () => {
      update((d) => {
        d.cards[d.currentCard].viewed = true;
        if (d.currentCard > d.cards.length) {
          shuffleDeck();
          d.currentCard = 0;
        } else {
          d.currentCard = ++d.currentCard;
        }

        return d;
      });
    },
    reset: () => {
      set(null);
      if (storageAvailable) {
        window.localStorage.clear();
      }
      init();
    },
  };
}

// const deckStore = (value, actions) => {
//   const store = writable(value);

//   const mappedActions = Object.keys(actions).reduce((acc, actionName) => {
//     acc[actionName] = (payload) =>
//       store.update((state) => produce(actions[actionName])(state, payload));
//     return acc;
//   }, {});

//   return {
//     mappedActions,
//     subscribe: store.subscribe,
//   };
// };

export const DeckStore = deckStore();
