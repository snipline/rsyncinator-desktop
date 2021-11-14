<script lang="ts">
  import { formattedCommand } from "./../stores.js";
  import { isNotValid } from "./../temp.js";

  export let model;
  let successMessage = "Command successfully copied";
  $: buttonClass = `${
    isNotValid(model) ? "cursor-not-allowed" : ""
  } transition ease-in w-full bg-indigo-600 text-white rounded p-4 shadow-md disabled:text-gray-500 disabled:bg-gray-300 hover:bg-indigo-500 active:bg-indigo-700 focus:bg-indigo-700 dark:disabled:bg-gray-700 dark:disabled:text-gray-400 dark:bg-indigo-500 dark:text-indigo-100`;

  function copy() {
    navigator.clipboard.writeText(formattedCommand(model));
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var notification = new Notification(successMessage);
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification("successMessage");
        }
      });
    }
  }
</script>

<div class="opacity-0 h-12">
  <button class="p-4">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 inline"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
      <path
        d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"
      />
    </svg>
    {formattedCommand(model)}
  </button>
</div>
<div class="fixed bottom-0 mb-2 px-2 left-0 right-0 ">
  <button
    disabled={isNotValid(model)}
    class={buttonClass}
    alt="Click to copy"
    title="Click to copy"
    on:click={copy}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 inline"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
      <path
        d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"
      />
    </svg>
    {formattedCommand(model)}
  </button>
</div>
