#!/usr/bin/env node

/**
 * Helper script to extract endpoints from configs.json efficiently
 * Usage: node documentation/extract-endpoints.js <search_pattern>
 * Example: node documentation/extract-endpoints.js "/wallets/:address"
 *          node documentation/extract-endpoints.js "wallet"
 */

const fs = require("fs");
const path = require("path");

const CONFIGS_PATH = path.join(
  __dirname,
  "moralis-docs",
  "configs",
  "api-reference",
  "configs.json",
);

// Load configs
const configs = JSON.parse(fs.readFileSync(CONFIGS_PATH, "utf8"));

// Build endpoint lookup map
const endpointMap = new Map();
const functionNameMap = new Map();

for (const [category, functions] of Object.entries(configs)) {
  if (typeof functions !== "object") continue;

  for (const [functionName, details] of Object.entries(functions)) {
    if (!details || typeof details !== "object") continue;

    const fullPath = details.path;
    const method = details.method || "GET";
    const key = `${method}:${fullPath}`;

    // Store by path
    if (!endpointMap.has(fullPath)) {
      endpointMap.set(fullPath, []);
    }
    endpointMap.get(fullPath).push({
      functionName,
      category,
      method,
      apiHost: details.apiHost,
    });

    // Store by function name
    functionNameMap.set(functionName, {
      path: fullPath,
      category,
      method,
      apiHost: details.apiHost,
      queryParams: details.queryParams || [],
      pathParams: details.pathParams || [],
    });
  }
}

// CLI interface
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log("Usage: node extract-endpoints.js <search_pattern>");
  console.log("Examples:");
  console.log('  node extract-endpoints.js "/wallets/:address"');
  console.log('  node extract-endpoints.js "getWallet"');
  console.log("  node extract-endpoints.js --stats");
  console.log("  node extract-endpoints.js --export-all > endpoints_list.txt");
  process.exit(0);
}

if (args[0] === "--stats") {
  console.log("=== Endpoint Statistics ===");
  console.log(`Total endpoints: ${endpointMap.size}`);
  console.log(`Total function names: ${functionNameMap.size}`);

  const categoryCounts = {};
  for (const [category, functions] of Object.entries(configs)) {
    if (typeof functions === "object") {
      categoryCounts[category] = Object.keys(functions).length;
    }
  }
  console.log("\nEndpoints by category:");
  for (const [cat, count] of Object.entries(categoryCounts).sort(
    (a, b) => b[1] - a[1],
  )) {
    console.log(`  ${cat}: ${count}`);
  }
  process.exit(0);
}

if (args[0] === "--export-all") {
  console.log("# All Endpoints with Function Names\n");
  const sorted = Array.from(endpointMap.entries()).sort((a, b) =>
    a[0].localeCompare(b[0]),
  );
  for (const [path, funcs] of sorted) {
    console.log(`## ${path}`);
    for (const func of funcs) {
      console.log(
        `  - ${func.functionName} (${func.method}) [${func.category}]`,
      );
    }
    console.log("");
  }
  process.exit(0);
}

if (args[0] === "--validate") {
  const filePath = args[1];
  if (!filePath) {
    console.error(
      "Usage: node extract-endpoints.js --validate <file_to_check.md>",
    );
    process.exit(1);
  }

  const content = fs.readFileSync(filePath, "utf8");
  const endpointsInDoc = content.match(/`\/[^`]+`/g) || [];

  console.log(`=== Validating ${filePath} ===`);
  console.log(`Found ${endpointsInDoc.length} endpoint references\n`);

  let valid = 0;
  let invalid = [];
  const seen = new Set();

  for (const ref of endpointsInDoc) {
    const path = ref.replace(/`/g, "").trim();
    if (seen.has(path)) continue;
    seen.add(path);

    // Remove path parameters for matching
    const pattern = path.replace(/:[a-z_]+/g, ":param");
    const found = Array.from(endpointMap.keys()).some((key) => {
      const keyPattern = key.replace(/:[a-z_]+/g, ":param");
      return keyPattern === pattern || key === path;
    });

    if (found) {
      valid++;
      const matches = Array.from(endpointMap.entries()).filter(([key]) => {
        const keyPattern = key.replace(/:[a-z_]+/g, ":param");
        return keyPattern === pattern || key === path;
      });
      for (const [p, funcs] of matches) {
        console.log(`✓ ${path}`);
        for (const func of funcs) {
          console.log(`    → ${func.functionName} [${func.category}]`);
        }
      }
    } else {
      invalid.push(path);
      console.log(`✗ ${path} - NOT FOUND`);
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`Valid: ${valid}`);
  console.log(`Invalid: ${invalid.length}`);

  if (invalid.length > 0) {
    console.log("\nInvalid endpoints:");
    for (const path of invalid) {
      console.log(`  - ${path}`);
    }
    process.exit(1);
  }
  process.exit(0);
}

// Search by pattern
const pattern = args[0].toLowerCase();
console.log(`=== Searching for: ${pattern} ===\n`);

// Check if it's a function name search
if (
  pattern.startsWith("get") ||
  pattern.includes("wallet") ||
  pattern.includes("nft")
) {
  console.log("Matching function names:");
  for (const [name, details] of functionNameMap.entries()) {
    if (name.toLowerCase().includes(pattern)) {
      console.log(`  ${name}`);
      console.log(`    Path: ${details.path}`);
      console.log(`    Method: ${details.method}`);
      console.log(`    Category: ${details.category}`);
      if (details.queryParams.length > 0) {
        console.log(
          `    Query params: ${details.queryParams.map((p) => p.name).join(", ")}`,
        );
      }
      console.log("");
    }
  }
}

// Check if it's a path search
console.log("Matching paths:");
for (const [path, funcs] of endpointMap.entries()) {
  if (path.toLowerCase().includes(pattern)) {
    console.log(`  ${path}`);
    for (const func of funcs) {
      console.log(
        `    → ${func.functionName} (${func.method}) [${func.category}]`,
      );
    }
    console.log("");
  }
}
