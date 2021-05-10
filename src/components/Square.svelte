<script lang="ts">
  export let card;

  export let viewed: boolean = false;
</script>

<div class={viewed ? 'viewed' : 'default'} />

<style>
  .viewed {
    border: 2px solid red;
  }

  .default {
    border: 2px solid white;
  }
</style>
