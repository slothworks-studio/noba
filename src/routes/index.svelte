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

<div transition:fade={{ duration: 7000 }} class="container" style="height: {availHeight}px">
  {#if mode === 'grid'}
    <div class="item" transition:fade={{ duration: 1000 }}>
      <Grid on:gridUp={toggle} worldHeight={availHeight} worldWidth={availWidth} />
    </div>
  {/if}}

  {#if mode === 'card'}
    <div class="item z-30" transition:fade={{ delay: 0, duration: 1000 }}>
      <Card on:mouseup={toggle} />
    </div>
  {/if}
</div>

<style>
  .container {
    background-color: black;
    width: 100%;
    height: 100%;
    display: grid;
  }

  .item {
    grid-column: 1;
    grid-row: 1;
  }

</style>
