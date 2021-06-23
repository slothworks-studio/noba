<script lang="ts">
  import Grid from '../components/Grid.svelte';
  import Splash from '../components/Splash.svelte';
  import Card from '../components/Card.svelte';

  import { beforeUpdate, onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import type { Deck, Card as CardType } from 'src/data/types';
  let deck: Deck;
  let card: CardType = {
    text1: '',
    text2: '',
  };

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

  function getCard() {
    deck.cards[deck.cardNumber].viewed = true;
    if (deck.cardNumber > deck.cards.length) {
      shuffleDeck();
      deck.cardNumber = 0;
    } else {
      deck.cardNumber = ++deck.cardNumber;
    }
    buildCardHtml().then(() => {
      saveDeck();
    });
  }

  async function buildCardHtml() {
    card.text1 = '';
    card.text2 = '';

    deck.cards[deck.cardNumber].content.forEach((item) => {
      if (item.line === 1) {
        card.text1 += `<span style="color: ${item.color}">${item.text}</span>`;
      }
      if (item.line === 2) {
        card.text2 += `<span style="color: ${item.color}">${item.text}</span>`;
      }
    });
  }

  function saveDeck() {
    window.localStorage.setItem('noba-deck', JSON.stringify(deck));
  }
  onMount(async () => {
    // getDeck();
    if (window.localStorage.getItem('noba-deck')) {
      deck = await JSON.parse(window.localStorage.getItem('noba-deck'));
    } else {
      var d = await import('../../static/deck.json');
      deck = JSON.parse(JSON.stringify(d));
      shuffleDeck();
      saveDeck();
    }
  });
</script>

<div class="main-container" style="height: {availHeight}px">
  {#if mode === 'grid'}
    <div class="item grid" transition:fade={{ duration: 1000 }}>
      <Grid on:gridUp={toggle} worldHeight={availHeight} worldWidth={availWidth} />
    </div>
  {/if}

  {#if mode === 'card'}
    <div class="item z-30 grid" transition:fade={{ delay: 0, duration: 10000 }}>
      <!-- <Card
        text1={deck.cards[deck.cardNumber].content[0].text}
        text2={deck.cards[deck.cardNumber].content[1].text}
      /> -->
      <Card text1={card.text1} text2={card.text2} />
    </div>
  {/if}
</div>

<style>
  .main-container {
    background-color: white;
    width: 100%;
    height: 100%;
    display: grid;
    font-size: 2rem;
    @apply font-mono;
    overflow: hidden;
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
