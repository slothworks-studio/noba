<script lang="ts">
  export let text1 = '';
  export let text2 = '';
</script>

<!-- <div id="container" /> -->

<div class="card-container">
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
  }
</style>
