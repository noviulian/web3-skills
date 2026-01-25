import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RULES_DIR = path.join(__dirname, '../skills/moralis-data-api/rules');
const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../swagger/api-configs.json'), 'utf8'));

const evmOps = new Set(Object.keys(data.evm || {}));
const solanaOps = new Set(Object.keys(data.solana || {}));

const collisions = [];
for (const op of evmOps) {
  if (solanaOps.has(op)) {
    collisions.push(op);
  }
}

console.log('=== All EVM-Solana Collisions ===\n');

let issues = [];
for (const op of collisions.sort()) {
  const evmFile = path.join(RULES_DIR, op + '__evm.md');
  const solanaFile = path.join(RULES_DIR, op + '__solana.md');
  const evmExists = fs.existsSync(evmFile);
  const solanaExists = fs.existsSync(solanaFile);

  console.log(op);
  console.log('  EVM (__evm):', evmExists ? 'OK' : 'MISSING');
  console.log('  Solana (__solana):', solanaExists ? 'OK' : 'MISSING');

  if (!evmExists || !solanaExists) {
    issues.push({ op, evmExists, solanaExists });
  }
  console.log();
}

if (issues.length > 0) {
  console.log('=== ISSUES FOUND ===');
  for (const i of issues) {
    console.log('- ' + i.op);
  }
} else {
  console.log('=== All collisions have both files ===');
}
