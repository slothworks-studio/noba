<script lang="ts">
  import Grid from '../components/Grid.svelte';
  import Card from '../components/Card.svelte';

  import { beforeUpdate, onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import type { Deck, Card as CardType } from 'src/data/types';
  let deck: Deck;
  let card: CardType;

  let mode: 'grid' | 'card' = 'grid';
  let availWidth = 1;
  let availHeight = 1;
  beforeUpdate(() => {
    availWidth = window.innerWidth;
    availHeight = window.innerHeight;
  });

  async function toggle() {
    await getCard();
    mode === 'card' ? (mode = 'grid') : (mode = 'card');
    setTimeout(() => {
      mode = 'grid';
    }, 20000);
  }

  function shuffleDeck() {
    deck.cards.sort(() => Math.random() - 0.5);
  }
  async function getDeck() {
    return await import('../data/deck.json');
  }

  function getCard() {
    console.log('getcard');
    console.log(deck.cardNumber);
    console.log(deck.cards[deck.cardNumber].content[0].text);
    // card.text1 = deck.cards[deck.cardNumber].content[0].text;
    // card.text2 = deck.cards[deck.cardNumber].content[1].text;
    deck.cards[deck.cardNumber].viewed = true;
    // console.log('text 1:  ', card.text1);
    // console.log('text 2:  ', card.text2);
    if (deck.cardNumber > deck.cards.length) {
      shuffleDeck();
      deck.cardNumber = 0;
    } else {
      deck.cardNumber++;
    }
    saveDeck();
  }

  function saveDeck() {
    window.localStorage.setItem('noba-deck', JSON.stringify(deck));
  }
  onMount(async () => {
    // read from local storage
    if (window.localStorage.getItem('noba-deck')) {
      deck = await JSON.parse(window.localStorage.getItem('noba-deck') as Deck);
      console.log('from local');
    } else {
      // Read from file
      getDeck().then((d) => {
        deck = d;
        console.log(deck);
        shuffleDeck();
        saveDeck();
      });
    }
  });

</script>

<div class="container" style="height: {availHeight}px">
  {#if mode === 'grid'}
    <div class="item grid" transition:fade={{ duration: 1000 }}>
      <Grid on:gridUp={toggle} worldHeight={availHeight} worldWidth={availWidth} />
    </div>
  {/if}

  {#if mode === 'card'}
    <div class="item z-30 grid" transition:fade={{ delay: 0, duration: 10000 }}>
      <Card
        text1={deck.cards[deck.cardNumber].content[0].text}
        text2={deck.cards[deck.cardNumber].content[1].text}
      />
    </div>
  {/if}

  <!-- <div class="grid z-10" transition:fade={{ duration: 1000 }}>
    <Grid on:gridUp={toggle} worldHeight={availHeight} worldWidth={availWidth} />
  </div>

  <div class="card z-20" transition:fade={{ delay: 0, duration: 1000 }}>
    <Card />
  </div> -->
</div>

<style>
  .container {
    background-color: white;
    width: 100%;
    height: 100%;
    display: grid;
  }

  .grid {
    /* visibility: hidden;  */
    grid-column: 1;
    grid-row: 1;
    /* opacity: 0.1; */
  }

  .card {
    display: none;
    grid-column: 1;
    grid-row: 1;
    /* opacity: 0.1; */
  }

</style>
