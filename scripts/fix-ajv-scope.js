#!/usr/bin/env node
/**
 * Fixes missing scope.js in ajv package (can occur due to antivirus or corrupted install).
 * Downloads from unpkg if the file is missing.
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const scopePath = path.join(
  __dirname,
  '..',
  'node_modules',
  'ajv',
  'dist',
  'compile',
  'codegen',
  'scope.js'
);

if (fs.existsSync(scopePath)) {
  process.exit(0);
}

const dir = path.dirname(scopePath);
if (!fs.existsSync(dir)) {
  process.exit(0);
}

const url = 'https://unpkg.com/ajv@8.17.1/dist/compile/codegen/scope.js';
https
  .get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => (data += chunk));
    res.on('end', () => {
      fs.writeFileSync(scopePath, data);
      console.log('Fixed: Restored missing ajv scope.js');
    });
  })
  .on('error', () => process.exit(0));
