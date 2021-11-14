<script type="ts">
  import { createEventDispatcher } from "svelte";
  export let id: string;
  export let label: string;
  export let value: string;
  export let type: string = "text";
  export let min: string = "0";
  export let step: string = "1";
  export let placeholder: string = "";

  const dispatch = createEventDispatcher();

  const change = (value) => dispatch("change", { value });
</script>

<div>
  <label for={id} class="block text-sm font-medium text-gray-700">{label}</label
  >
  <div class="mt-1">
    <input
      {id}
      {type}
      {min}
      {step}
      {value}
      on:input={(e) => change(e.target.value)}
      class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
      {placeholder}
    />
  </div>
</div>
