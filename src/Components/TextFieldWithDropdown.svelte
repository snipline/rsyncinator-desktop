<script type="ts">
  import TextField from "./TextField.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  const change = (value) => dispatch("change", { value });
  export let dropDownOptions: string[];
  export let id: string;
  export let label: string;
  export let dropdownLabel: string;
  export let dropdownSelectedValue: string;
  export let value: string;
  export let type: string = "text";
  export let min: string = "0";
  export let step: string = "1";
  export let placeholder: string = "";
  const dropdownChanged = (value) => dispatch("dropdownChanged", { value });
</script>

<div>
  <div class="relative rounded-md shadow-sm">
    <TextField
      on:change={(event) => change(event.detail.value)}
      {value}
      {id}
      {label}
      {min}
      {step}
      {placeholder}
      {type}
    />
    <div class="absolute inset-y-0 right-0 flex items-center mt-6">
      <label for="" class="sr-only">{dropdownLabel}</label>
      <select
        id=""
        name=""
        class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
        value={dropdownSelectedValue}
        on:change={(e) => dropdownChanged(e.target.value)}
      >
        {#each dropDownOptions as option}
          <option value={option}>{option}</option>
        {/each}
      </select>
    </div>
  </div>
</div>
