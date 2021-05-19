<script lang="ts">
  import Grid from '../components/Grid.svelte';
  import Card from '../components/Card.svelte';
  import { beforeUpdate, onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  let mode: 'grid' | 'card' = 'grid';
  let availWidth = 1;
  let availHeight = 1;
  beforeUpdate(() => {
    availWidth = window.innerWidth;
    availHeight = window.innerHeight;
  });

  function toggle() {
    mode === 'card' ? (mode = 'grid') : (mode = 'card');
    setTimeout(() => {
      mode = 'grid';
    }, 20000);
  }

</script>

<div class="container" style="height: {availHeight}px">
  <!-- {#if mode === 'grid'}
    <div class="item" transition:fade={{ duration: 1000 }}>
      <Grid on:gridUp={toggle} worldHeight={availHeight} worldWidth={availWidth} />
    </div>
  {/if}}

  {#if mode === 'card'}
    <div class="item z-30" transition:fade={{ delay: 0, duration: 10000 }}>
      <Card />
    </div>
  {/if} -->

  <div class="grid z-10" transition:fade={{ duration: 1000 }}>
    <Grid on:gridUp={toggle} worldHeight={availHeight} worldWidth={availWidth} />
  </div>

  <div class="card z-20" transition:fade={{ delay: 0, duration: 1000 }}>
    <Card />
  </div>
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
