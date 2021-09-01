<script lang="ts">
  import type { Card as CardType } from 'src/components/data/types';
  import { beforeUpdate, onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import Card from '../components/Card.svelte';
  import Grid from '../components/Grid.svelte';
  import Splash from '../components/Splash.svelte';
  import Instructions from '../components/Instructions.svelte';
  import { DeckStore } from '../components/data/deckStore';
  // let deck: Deck;
  let card: CardType = {
    text1: '',
    text2: '',
  };
  // $: viewedCardCount = 0;

  $: mode = $DeckStore.settings.mode;
  let availWidth = 1;
  let availHeight = 1;

  beforeUpdate(() => {
    availWidth = window.innerWidth;
    availHeight = window.innerHeight;
    // viewedCardCount = deck.cardNumber;
  });

  async function toggle() {
    DeckStore.getNextCard();
    await buildCardHtml();
    mode === 'card' ? (mode = 'grid') : (mode = 'card');
    setTimeout(() => {
      mode = 'grid';
    }, 20000);
  }

  function onboarded() {
    DeckStore.onBoardingComplete();
  }

  async function buildCardHtml() {
    card.text1 = '';
    card.text2 = '';

    $DeckStore.cards[$DeckStore.currentCard].content.forEach((item) => {
      if (item.line === 1) {
        card.text1 += `<span style="color: ${item.color}">${item.text}</span>`;
      }
      if (item.line === 2) {
        card.text2 += `<span style="color: ${item.color}">${item.text}</span>`;
      }
    });
  }

  onMount(async () => {
    DeckStore.init();
  });
</script>

<div class="main-container" style="height: {availHeight}px">
  {#if mode === 'initializing'}
    <div class="item grid" transition:fade={{ duration: 10000 }}>
      <Splash />
    </div>{/if}
  {#if mode === 'onboarding'}
    <div class="grid" transition:fade={{ duration: 10000 }}>
      <Instructions on:instructionsUp={onboarded} />
    </div>
  {/if}
  {#if mode === 'grid'}
    <div class="item grid" transition:fade={{ duration: 1000 }}>
      <Grid
        on:gridUp={toggle}
        worldHeight={availHeight}
        worldWidth={availWidth}
        viewedCards={$DeckStore.currentCard}
        cardCount={$DeckStore.cards.length}
      />
    </div>
  {/if}

  {#if mode === 'card'}
    <div class="item z-30 grid" transition:fade={{ delay: 0, duration: 10000 }}>
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

  .splash {
    grid-column: 1;
    grid-row: 1;
  }
</style>
