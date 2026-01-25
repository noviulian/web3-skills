import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RULES_DIR = path.join(__dirname, '../skills/moralis-data-api/rules');

const files = fs.readdirSync(RULES_DIR).filter((f) => f.endsWith('.md'));

const solanaNative = [];
const solanaVariants = [];
const evmCollisions = [];
const evmOnly = [];

for (const file of files) {
  if (file.endsWith('__solana.md')) {
    // Check if it's a native Solana endpoint or an EVM variant
    const opId = file.replace('__solana.md', '');
    const data = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, '../swagger/api-configs.json'),
        'utf8',
      ),
    );

    if (data.solana && data.solana[opId]) {
      solanaNative.push(opId);
    } else if (data.evm && data.evm[opId]) {
      solanaVariants.push(opId);
    }
  } else if (file.endsWith('__evm.md')) {
    evmCollisions.push(file.replace('__evm.md', ''));
  } else if (!file.includes('__')) {
    const opId = file.replace('.md', '');
    evmOnly.push(opId);
  }
}

console.log('=== Solana File Breakdown ===\n');
console.log('Native Solana endpoints: ' + solanaNative.length);
console.log(
  'EVM endpoints with Solana chain support (variants): ' +
    solanaVariants.length,
);
console.log(
  'Total __solana files: ' + (solanaNative.length + solanaVariants.length) +
    '\n',
);

console.log('=== EVM File Breakdown ===\n');
console.log('EVM endpoints with Solana collisions (__evm): ' + evmCollisions.length);
console.log('EVM-only endpoints (no suffix): ' + evmOnly.length + '\n');

if (solanaVariants.length > 0) {
  console.log('=== EVM Endpoints with Solana Chain Support ===\n');
  for (const op of solanaVariants.sort()) {
    console.log('  - ' + op);
  }
}
