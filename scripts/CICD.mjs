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
const newCiText = ciText.replace(/variables:\s+systemCode: '.*'/, `variables:\r  systemCode: '${appCode}'`);

fs.writeFileSync(ciPath, newCiText);

execSync('git add .gitlab-ci.yml');
execSync('git commit -m "chore: update appCode in .gitlab-ci.yml"');
