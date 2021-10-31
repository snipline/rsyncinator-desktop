<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { writable } from "svelte/store";
  import TextField from "./Components/TextField.svelte";
  import InputPath from "./Components/InputPath.svelte";
  import GroupedButton from "./Components/GroupedButton.svelte";
  import TextFieldWithDropdown from "./Components/TextFieldWithDropdown.svelte";
  import Hr from "./Components/Hr.svelte";
  import Checkbox from "./Components/Checkbox.svelte";
  import Preview from "./Components/Preview.svelte";
  import { model, formattedCommand, connectionType } from "./stores.js";
  let fileSizeLimitDropdownOptions = ["B", "K", "M", "G"];
</script>

<main>
  <span
    class="my-4 mx-auto text-center w-full items-stretc relative z-0 inline-flex shadow-sm rounded-md"
  >
    <GroupedButton
      on:update={() => ($model.selectedConnection = connectionType.Local)}
      varient="start"
      active={$model.selectedConnection == connectionType.Local}
    >
      Both Local
    </GroupedButton>
    <GroupedButton
      on:update={() =>
        ($model.selectedConnection = connectionType.RemoteSource)}
      varient="middle"
      active={$model.selectedConnection == connectionType.RemoteSource}
    >
      Remote Source
    </GroupedButton>
    <GroupedButton
      on:update={() =>
        ($model.selectedConnection = connectionType.RemoteDestination)}
      varient="end"
      active={$model.selectedConnection == connectionType.RemoteDestination}
    >
      Remote Destination
    </GroupedButton>
  </span>
  <div class="flex items-center w-full gap-4 justify-center">
    <InputPath
      bind:value={$model.sourcePath}
      on:change={(event) => ($model.sourcePath = event.detail.value)}
      label="Source Path"
      id="sourcePath"
      bind:valueServer={$model.sourceServer}
      on:changeServer={(event) => ($model.sourceServer = event.detail.value)}
      labelServer="Source Server"
      idServer="sourceServer"
      showServer={$model.selectedConnection == connectionType.RemoteSource}
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
    <InputPath
      bind:value={$model.destinationPath}
      on:change={(event) => ($model.destinationPath = event.detail.value)}
      label="Destination Path"
      id="destinationPath"
      bind:valueServer={$model.destinationServer}
      on:changeServer={(event) =>
        ($model.destinationServer = event.detail.value)}
      labelServer="Destination Server"
      idServer="destinationServer"
      showServer={$model.selectedConnection == connectionType.RemoteDestination}
    />
  </div>
  <Hr />
  <div class="grid grid-flow-row grid-cols-2 md:grid-cols-4 gap-4 text-left">
    <Checkbox
      label="Dry Run"
      id="dryRun"
      value={$model.dryRun}
      on:change={(event) => ($model.dryRun = event.detail.value)}
      info="Show what would have been transferred"
    />
    <Checkbox
      label="Archive mode"
      id="archiveMode"
      value={$model.archiveMode}
      on:change={(event) => ($model.archiveMode = event.detail.value)}
      info="Same as -rlptgoD"
    />
    <Checkbox
      label="Compress"
      id="compress"
      value={$model.compress}
      on:change={(event) => ($model.compress = event.detail.value)}
      info="Compress file data during the transfer"
    />
    <Checkbox
      label="Configure SSH"
      id="configureSsh"
      value={$model.configureSsh}
      on:change={(event) => ($model.configureSsh = event.detail.value)}
      info="Specify the remote shell to use"
      disabled={$model.selectedConnection == connectionType.Local}
    />
    <Checkbox
      label="Show Progress"
      id="showProgress"
      value={$model.showProgress}
      on:change={(event) => ($model.showProgress = event.detail.value)}
      info="Show progress during transfer"
    />
    <Checkbox
      label="Partial"
      id="partial"
      value={$model.partial}
      on:change={(event) => ($model.partial = event.detail.value)}
      info="Keep partially transferred files"
    />
    <Checkbox
      label="Verbose"
      id="verbose"
      value={$model.verbose}
      on:change={(event) => ($model.verbose = event.detail.value)}
      info="Increase verbosity"
    />
    <Checkbox
      label="Human Readable"
      id="humanReadable"
      value={$model.humanReadable}
      on:change={(event) => ($model.humanReadable = event.detail.value)}
      info="Output numbers in a human-readable format"
    />
    <Checkbox
      label="Recursive"
      id="recursive"
      value={$model.recursive}
      on:change={(event) => ($model.recursive = event.detail.value)}
      disabled={$model.archiveMode}
      info="Recurse into directories"
    />
    <Checkbox
      label="Copy Symlinks"
      id="copySymlinks"
      value={$model.copySymlinks}
      on:change={(event) => ($model.copySymlinks = event.detail.value)}
      disabled={$model.archiveMode}
      info="Copy symlinks as symlinks"
    />
    <Checkbox
      label="Remove Source"
      id="removeSourceFiles"
      value={$model.removeSourceFiles}
      on:change={(event) => ($model.removeSourceFiles = event.detail.value)}
      info="Sender removes synchronized files (non-dirs)"
    />
    <Checkbox
      label="Delete"
      id="delete"
      value={$model.deleteFlag}
      on:change={(event) => ($model.deleteFlag = event.detail.value)}
      info="Delete extraneous files from destination dirs"
    />
    <Checkbox
      label="Update"
      id="update"
      value={$model.update}
      on:change={(event) => ($model.update = event.detail.value)}
      info="Skip files that are newer on the receiver"
    />
    <Checkbox
      label="Prefer Short Flags"
      id="preferShortFlags"
      value={$model.preferShortFlags}
      on:change={(event) => ($model.preferShortFlags = event.detail.value)}
      info="Use short flags where possible"
    />
  </div>
  <div class="grid grid-flow-row grid-cols-1 md:grid-cols-4 gap-4 text-left">
    <TextField
      placeholder="e.g. 500"
      id="limitBandwidth"
      bind:value={$model.limitBandwidth}
      on:change={(event) => ($model.limitBandwidth = event.detail.value)}
      label="Limit bandwidth in KB/s"
      type="number"
      step="50"
    />
    <TextField
      id="includeFiles"
      bind:value={$model.includeFiles}
      on:change={(event) => ($model.includeFiles = event.detail.value)}
      label="Include Files"
      placeholder="e.g. .git/*"
    />
    <TextField
      id="excludeFiles"
      bind:value={$model.excludeFiles}
      on:change={(event) => ($model.excludeFiles = event.detail.value)}
      label="Exclude Files"
      placeholder="e.g. .vendor/*"
    />
    <TextFieldWithDropdown
      id="fileSizeLimit"
      bind:value={$model.fileSizeLimit}
      on:change={(event) => ($model.fileSizeLimit = event.detail.value)}
      label="File size limit"
      dropdownLabel="File size limit options"
      min="0"
      step="50"
      placeholder="e.g. 500"
      dropDownOptions={fileSizeLimitDropdownOptions}
      bind:dropdownSelectedValue={$model.fileSizeLimitUnit}
      on:dropdownChanged={(event) =>
        ($model.fileSizeLimitUnit = event.detail.value)}
    />
  </div>
  <Hr />
  <Preview model={$model} />
</main>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  button:not(:disabled):active {
    @apply bg-indigo-700;
  }
</style>

