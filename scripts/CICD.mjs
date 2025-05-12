import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../.env');
const envText = fs.readFileSync(envPath, 'utf-8');
const envObj = Object.fromEntries(
  envText.split(/\r?\n/)
    .filter(line => line.includes('='))
    .map(line => line.split('='))
);

const appCode = envObj['VITE_GLOB_APP_CODE'].replace(/["']/g, '');

const ciPath = path.resolve(__dirname, '../.gitlab-ci.yml');
const ciText = fs.readFileSync(ciPath, 'utf-8');
const ciLines = ciText.split(/\r?\n/);
const index = ciLines.findIndex(line => line.startsWith('variables:'));
if (index === -1) {
  throw new Error('not found `variables:` in .gitlab-ci.yml');
}
const newValue = `variables:\r  systemCode: '${appCode}'`;
if (ciLines[index] !== newValue) {
  ciLines[index] = newValue;
  const newCiText = ciLines.join('\r\n');
  fs.writeFileSync(ciPath, newCiText);
  execSync('git add .gitlab-ci.yml');
  execSync('git commit -m "chore: update appCode in .gitlab-ci.yml"');
}else{
  console.log('no need update');
}
