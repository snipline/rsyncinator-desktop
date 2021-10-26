<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { writable } from "svelte/store";
  import TextField from "./Components/TextField.svelte";
  import { includeFiles, limitBandwidth, formattedCommand } from "./stores.js";
</script>

<main>
  <div class="grid grid-flow-row grid-cols-1 md:grid-cols-4 gap-4 text-left">
    {$formattedCommand}
    <TextField
      placeholder="e.g. 500"
      id="limitBandwidth"
      bind:value={$limitBandwidth}
      on:change={(event) => ($limitBandwidth = event.detail.value)}
      label="Limit bandwidth in KB/s"
      type="number"
      step="50"
    />
    <TextField
      id="includeFiles"
      bind:value={$includeFiles}
      on:change={(event) => ($includeFiles = event.detail.value)}
      label="Include Files"
      placeholder="e.g. .git/*"
    />
  </div>
</main>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>

