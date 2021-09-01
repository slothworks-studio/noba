<script lang="ts">
  import { onMount } from 'svelte';

  import '../app.css';
  onMount(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').catch(function (err) {
        console.info('Service workers are not supported.');
      });
    }
  });
</script>

<slot />
