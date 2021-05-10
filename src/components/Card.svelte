<script lang="ts">
  export let text1 = 'hi';
  export let text2 = 'hello';
</script>

<div />

<div id="container" />

<div class="p-6 max-w-sm mx-auto bg-grey rounded-xl shadow-md flex items-center space-x-4">
  <div class="flex-shrink-0" />
  <div>
    <div>{text1}</div>
    <div class="text-red-500">{text2}</div>
  </div>
</div>
