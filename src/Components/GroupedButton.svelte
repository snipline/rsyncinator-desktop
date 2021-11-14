<script type="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let varient: string = "middle";
  export let active: boolean = false;

  let buttonSideClass = function (varient) {
    switch (varient) {
      case "start":
        return "rounded-l-md";
      case "end":
        return "rounded-r-md";
      default:
        return "";
    }
  };

  let buttonStateClass = function (active) {
    if (active) {
      return "transition ease-in bg-indigo-600 text-indigo-100 hover:bg-indigo-500 dark:border-gray-600 ";
    } else {
      return "transition ease-in border-gray-300 bg-white dark:hover:bg-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 text-gray-700 ";
    }
  };

  let buttonClass = function (active, varient) {
    return `transition ease-in active:bg-indigo-700 flex-grow justify-center ${buttonSideClass(
      varient
    )} ${buttonStateClass(
      active
    )} -ml-px relative inline-flex items-center px-4 py-2 border text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`;
  };

  $: formattedClass = buttonClass(active, varient);

  const update = () => dispatch("update");
</script>

<button on:click={update} type="button" class={formattedClass}>
  <slot />
</button>
