import { connectionType } from './stores.js';
import { derived } from 'svelte/store';

export function formattedBandwidthLimit(model) {
  console.log('test', model.limitBandwidth)
  return model.limitBandwidth.trim().length !== 0
    ? ` --bwlimit=${model.limitBandwidth}`
    : '';
};

export function formattedFileSizeLimit(model) {
  return model.fileSizeLimit.length !== 0
    ? ` --max-size=${model.fileSizeLimit}${model.fileSizeLimitUnit}`
    : '';
}

export function longFormattedSshKey(model) {
  if (
    model.configureSsh &&
    (model.selectedConnection !== connectionType.Local)
  ) {
    let formattedSshKey =
      model.sshKey.length !== 0 ? ` -i ${model.sshKey}` : '';
    return ` --rsh 'ssh${model.sshPort ? ` -oPort=${model.sshPort}` : ''}${formattedSshKey}'`;
  } else {
    return '';
  }
}

export function shortSsh(model) {
  if (model.configureSsh && model.selectedConnection !== connectionType.Local) {
    return `e 'ssh${model.sshPort ? ` -oPort=${model.sshPort}` : ''}${model.sshKey.trim().length !== 0 ? ` -i ${model.sshKey}` : ''
      }'`;
  }
  return '';
}
export function longSsh(model) {
  if (model.configureSsh && model.selectedConnection !== connectionType.Local) {
    return ` --rsh 'ssh ${model.sshPort ? `-oPort=${model.sshPort}` : ''}${model.sshKey.trim().length !== 0 ? ` -i ${model.sshKey}` : ''
      }'`;
  }
  return '';
}

export function showHyphen(model) {
  return (
    model.dryRun ||
    model.archiveMode ||
    model.recursive ||
    model.compress ||
    model.update ||
    model.copySymlinks ||
    model.verbose ||
    model.humanReadable ||
    model.configureSsh
  );
}

export function formattedIncludeFiles(model) {
  if (model.includeFiles.trim().length === 0) {
    return '';
  }
  return model.includeFiles
    .replace(`\\,`, '_COMMABACKSLASH_')
    .split(',')
    .filter((x) => x !== '')
    .map((x) => ` --include="${x.trim()}"`)
    .join('')
    .replace('_COMMABACKSLASH_', ',');
}

export function formattedExcludeFiles(model) {
  if (model.excludeFiles.trim().length === 0) {
    return '';
  }
  return model.excludeFiles
    .replace(`\\,`, '_COMMABACKSLASH_')
    .split(',')
    .filter((x) => x !== '')
    .map((x) => ` --exclude="${x.trim()}"`)
    .join('')
    .replace('_COMMABACKSLASH_', ',');
}

export function formattedSource(model) {
  let sshUser = (model.configureSsh && model.sshUser.length > 0) ? `${model.sshUser}@` : ''
  return model.selectedConnection == connectionType.RemoteSource
    ? `${sshUser}${model.sourceServer}:${model.sourcePath}`
    : model.sourcePath;
}
export function formattedDestination(model) {
  let sshUser = (model.configureSsh && model.sshUser.length > 0) ? `${model.sshUser}@` : ''
  return model.selectedConnection == connectionType.RemoteDestination
    ? `${sshUser}${model.destinationServer}:${model.destinationPath}`
    : model.destinationPath;
}

export function partialProgressShortFlagText(model) {
  if (model.showProgress && model.partial) {
    return 'P';
  } else if (model.showProgress && !model.partial && !model.configureSsh) {
    return ' --progress';
  } else if (!model.showProgress && model.partial && !model.configureSsh) {
    return ' --partial';
  } else {
    return '';
  }
}
export function partialProgressShortFlagPostSshText(model) {
  if (model.showProgress && !model.partial && model.configureSsh) {
    return ' --progress';
  } else if (!model.showProgress && model.partial && model.configureSsh) {
    return ' --partial';
  } else {
    return '';
  }
}

export function isNotValid(model) {
  return !isValid(model);
}
export function isValid(model) {
  console.log('isvalid', model.sourceServer.trim())
  if (model.sourcePath.trim() == '' || model.destinationPath.trim() == '') {
    return false;
  }
  if (model.selectedConnection === connectionType.RemoteSource && model.sourceServer.trim() === '') {
    return false;
  }
  if (
    model.selectedConnection === connectionType.RemoteDestination &&
    model.destinationServer.trim() === ''
  ) {
    return false;
  }
  return true;
}
