#!/usr/bin/env node

import {existsSync, mkdirSync} from 'fs';
import {copyFile, readdir} from 'fs/promises';
import {join} from 'path';

const sourcePath = join(process.cwd(), 'node_modules', '@deckdeckgo', '/monaco-editor', 'workers');
const destPath = join(process.cwd(), 'static', 'workers');

if (!existsSync(destPath)) {
  mkdirSync(destPath, {recursive: true});
}

const copyMonacoWorkers = async () => {
  const entryPoints = await readdir(sourcePath);

  const promises = entryPoints.map((file) =>
    copyFile(join(sourcePath, file), join(destPath, file))
  );

  return Promise.all(promises);
};

await copyMonacoWorkers();
