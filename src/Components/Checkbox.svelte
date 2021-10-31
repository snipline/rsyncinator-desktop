<script type="ts">
  import { createEventDispatcher } from "svelte";
  export let id: string;
  export let label: string;
  export let value: boolean;
  export let disabled: boolean = false;
  export let info: string | null = null;

  const dispatch = createEventDispatcher();

  const change = (value) => dispatch("change", { value });
</script>

<div class="relative flex items-start">
  <div class="flex items-center h-5">
    <input
      {id}
      bind:checked={value}
      on:change={(e) => change(e.target.checked)}
      type="checkbox"
      class="bg-gray-100 disabled:bg-gray-200 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 dark:bg-gray-900 rounded disabled:opacity-25 disabled:cursor-not-allowed"
      {disabled}
    />
  </div>
  <div class="ml-3 text-sm">
    <label for={id} class="font-medium text-gray-700 dark:text-gray-300"
      >{label}</label
    >
    {#if info}
      <p class="text-gray-500 text-xs">{info}</p>
    {/if}
  </div>
</div>
