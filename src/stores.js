import { writable, derived } from 'svelte/store';
import { partialProgressShortFlagPostSshText, partialProgressShortFlagText, longSsh, shortSsh, showHyphen, formattedIncludeFiles, formattedExcludeFiles, formattedSource, formattedDestination, formattedBandwidthLimit, formattedFileSizeLimit, longFormattedSshKey } from './helpers.js';

export const connectionType = {
  Local: "local",
  RemoteSource: "remoteSource",
  RemoteDestination: "remoteDestination",
}

export const model = writable({
  includeFiles: '',
  excludeFiles: '',
  limitBandwidth: '',
  fileSizeLimit: '',
  fileSizeLimitUnit: 'K',
  dryRun: true,
  archiveMode: true,
  compress: true,
  configureSsh: false,
  showProgress: true,
  partial: true,
  verbose: false,
  humanReadable: false,
  recursive: false,
  copySymlinks: false,
  removeSourceFiles: false,
  deleteFlag: false,
  preferShortFlags: false,
  update: false,
  destinationPath: '',
  destinationServer: '',
  sourcePath: '',
  sourceServer: '',
  sshPort: '',
  sshKey: '',
  sshUser: '',
  selectedConnection: connectionType.Local
})


// export const selectedConnection = writable(connectionType.Local)

export var formattedCommand;
$: formattedCommand = ($model) => {
  // return `${formattedBandwidthLimit($model)} ${formattedFileSizeLimit($model)} ${longFormattedSshKey($model)}`

  if ($model.preferShortFlags) {
    return `rsync ${showHyphen($model) ? '-' : ''}${$model.dryRun ? 'n' : ''}${$model.archiveMode ? 'a' : ''
      }${$model.recursive && !$model.archiveMode ? 'r' : ''}${$model.compress ? 'z' : ''
      }${$model.update ? 'u' : ''}${$model.copySymlinks && !$model.archiveMode ? 'l' : ''
      }${$model.verbose ? 'v' : ''}${$model.humanReadable ? 'h' : ''}${partialProgressShortFlagText($model)
      }${shortSsh($model)}${partialProgressShortFlagPostSshText($model)}${$model.removeSourceFiles ? ' --remove-source-files' : ''
      }${$model.deleteFlag ? ' --delete' : ''}${formattedFileSizeLimit($model)}${formattedBandwidthLimit($model)
      }${formattedIncludeFiles($model)}${formattedExcludeFiles($model)} ${formattedSource($model)
      } ${formattedDestination($model)}`;
  } else {
    return `rsync${$model.dryRun ? ' --dry-run' : ''}${$model.archiveMode ? ' --archive' : ''
      }${$model.removeSourceFiles ? ' --remove-source-files' : ''}${$model.recursive && !$model.archiveMode ? ' --recursive' : ''
      }${$model.deleteFlag ? ' --delete' : ''}${$model.compress ? ' --compress' : ''}${$model.showProgress ? ' --progress' : ''
      }${$model.partial ? ' --partial' : ''}${$model.update ? ' --update' : ''}${$model.verbose ? ' --verbose' : ''
      }${$model.humanReadable ? ' --human-readable' : ''}${$model.copySymlinks && !$model.archiveMode ? ' --links' : ''
      }${longFormattedSshKey($model)}${formattedFileSizeLimit($model)
      }${formattedBandwidthLimit($model)}${formattedIncludeFiles($model)}${formattedExcludeFiles($model)
      } ${formattedSource($model)} ${formattedDestination($model)}`;
  }
}

// export const formattedCommand = writable('bar');

// $: {
//   formattedCommand.update((val) => {
//   return 'test';
//   // var longSsh;
//   // $: longSsh = longSshFn(configureSsh, selectedConnection, sshPort, sshKey)
//   //   return 'test';
//   //   }
//   });
// }
