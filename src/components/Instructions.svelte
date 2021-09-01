<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  function instructionsUp() {
    dispatch('instructionsUp');
  }
</script>

<div class="card-container" on:mouseup={instructionsUp}>
  <p class="text1">drag your finger across the grid</p>
  <p class="text2">release to reveal your action</p>
</div>

<style>
  .text1 {
    color: black;
  }

  .text2 {
    color: #cc1b21;
  }

  .card-container {
    height: 100%;
    width: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    justify-items: center;
    padding: 25px;
    cursor: none;
    user-select: none;
  }
</style>
