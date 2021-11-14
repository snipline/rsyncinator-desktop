<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let id: string;
  export let showServer: boolean = false;
  export let labelServer: string;
  export let idServer: string;
  export let valueServer: string;
  export let label: string;
  export let value: string;
  const dispatch = createEventDispatcher();

  const change = (value) => dispatch("change", { value });
  const changeServer = (value) => dispatch("changeServer", { value });
</script>

<div class="w-1/2 flex justify-center">
  {#if showServer}
    <div class="w-full">
      <label for={id} class="sr-only">{labelServer}</label>
      <input
        type="text"
        value={valueServer}
        on:input={(e) => changeServer(e.target.value)}
        id={idServer}
        class="bg-white dark:bg-gray-800 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-900 dark:text-white"
        placeholder={labelServer}
      />
    </div>
    <div class="p-1">:</div>
  {/if}
  <div class="w-full">
    <label for={id} class="sr-only">{label}</label>
    <input
      type="text"
      {value}
      on:input={(e) => change(e.target.value)}
      {id}
      class="bg-white dark:bg-gray-800 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:border-gray-600 dark:dark:text-gray-100"
      placeholder={label}
    />
  </div>
</div>
