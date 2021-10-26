import { writable, derived } from 'svelte/store';

export const includeFiles = writable('');
export const limitBandwidth = writable('');

export const formattedCommand = derived(
  [
    includeFiles,
    limitBandwidth
  ],
	([$includeFiles, $limitBandwidth]) => `--${$includeFiles} --${$limitBandwidth}`
);
