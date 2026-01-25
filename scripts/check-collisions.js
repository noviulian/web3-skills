#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const API_CONFIGS_PATH = path.join(__dirname, "../swagger/api-configs.json");
const RULES_DIR = path.join(__dirname, "../skills/moralis-data-api/rules");

const data = JSON.parse(fs.readFileSync(API_CONFIGS_PATH, "utf8"));

// Get all operationIds from each source
const evmOps = new Set(Object.keys(data.evm || {}));
const solanaOps = new Set(Object.keys(data.solana || {}));
const streamsOps = new Set(Object.keys(data.streams || {}));

// Find collisions between EVM and Solana
const collisions = [];
for (const op of evmOps) {
  if (solanaOps.has(op)) {
    collisions.push(op);
  }
}

console.log("=== EVM-Solana OperationID Collisions ===");
console.log("Found " + collisions.length + " collisions:\n");

const missingSuffix = [];
const missingFiles = [];

for (const op of collisions) {
  // For collisions, EVM gets __evm suffix, Solana gets __solana suffix
  const evmFile = path.join(RULES_DIR, op + "__evm.md");
  const solanaFile = path.join(RULES_DIR, op + "__solana.md");

  const evmExists = fs.existsSync(evmFile);
  const solanaExists = fs.existsSync(solanaFile);

  console.log("- " + op);
  console.log("  EVM file exists: " + evmExists + " (" + op + "__evm.md)");
  console.log(
    "  Solana file exists: " + solanaExists + " (" + op + "__solana.md)",
  );

  if (!evmExists && !solanaExists) {
    console.log("  ⚠️  MISSING BOTH FILES!");
    missingFiles.push(op);
  } else if (!solanaExists) {
    console.log(
      "  ⚠️  MISSING SOLANA SUFFIX! (EVM exists but Solana doesn't have __solana suffix)",
    );
    missingSuffix.push(op);
  } else if (!evmExists) {
    console.log("  ⚠️  MISSING EVM FILE! (Solana exists but EVM file missing)");
    missingFiles.push(op);
  }
  console.log();
}

if (missingSuffix.length > 0) {
  console.log("=== NEEDS FIXING: Missing __solana suffix ===");
  console.log(missingSuffix.join(", "));
}

if (missingFiles.length > 0) {
  console.log("=== NEEDS FIXING: Missing files ===");
  console.log(missingFiles.join(", "));
}

if (missingSuffix.length === 0 && missingFiles.length === 0) {
  console.log("✅ All collision handling is correct!");
}
