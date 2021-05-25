<script lang="ts">
  export let text1 = 'hi';
  export let text2 = 'hello';

</script>

<!-- <div id="container" /> -->

<div class="cardContainer font-mono text-5xl">
  <div>{@html text1}</div>
  <div>{@html text2}</div>
</div>

<style>
  .text1 {
    color: black;
    color: text-red-500;
  }
  .text2 {
    color: #cc1b21;
  }

  .cardContainer {
    height: 100%;
    width: 100%;
    background-color: white;
  }

</style>
