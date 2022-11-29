#!/usr/bin/env node

import {createHash} from 'crypto';
import {lstatSync, readdirSync} from 'fs';
import {readFile, writeFile} from 'fs/promises';
import {extname, join} from 'path';

export const findEntryPoints = (dir, files) => {
  readdirSync(dir).forEach((file) => {
    const fullPath = join(dir, file);
    if (lstatSync(fullPath).isDirectory()) {
      findEntryPoints(fullPath, files);
    } else {
      files.push(fullPath);
    }
  });
};

const entryPoints = [];
findEntryPoints('build', entryPoints);

const htmlEntryPoints = entryPoints.filter((entry) => ['.html'].includes(extname(entry)));

const computeHashes = (indexHtml) => {
  const sw = /<script[\s\S]*?>([\s\S]*?)<\/script>/gm;

  const scriptHashes = [];

  let m;
  while ((m = sw.exec(indexHtml))) {
    const content = m[1];

    scriptHashes.push(`'sha256-${createHash('sha256').update(content).digest('base64')}'`);
  }

  return scriptHashes;
};

const writeCSP = async ({scriptHashes, indexHtml, entry}) =>
  writeFile(
    entry,
    indexHtml.replace('{{EXTRA_SHAS}}', scriptHashes.map((sha256) => sha256).join(' ')),
    'utf-8'
  );

const updateCSP = async (entry) => {
  const indexHtml = await readFile(join(process.cwd(), entry), 'utf-8');
  const scriptHashes = await computeHashes(indexHtml);
  await writeCSP({scriptHashes, indexHtml, entry});
};

const promises = htmlEntryPoints.map(updateCSP);
await Promise.all(promises);
