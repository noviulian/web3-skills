#!/usr/bin/env node

/**
 * Generate REST endpoint rules from swagger/api-configs.json
 *
 * Creates one markdown file per operationId in flat rules/ folders
 */

const fs = require("fs");
const path = require("path");
const { ensureDir, writeFileIfChanged } = require("./utils/generate-utils");

// Configuration
const API_CONFIGS_PATH = path.join(__dirname, "../swagger/api-configs.json");
const SKILLS_DIR = path.join(__dirname, "../skills");

// Skill mappings
const SKILL_MAPPINGS = {
  "moralis-data-api": {
    sources: ["evm", "solana"],
    rulesDir: path.join(SKILLS_DIR, "moralis-data-api", "rules"),
  },
  "moralis-streams-api": {
    sources: ["streams"],
    rulesDir: path.join(SKILLS_DIR, "moralis-streams-api", "rules"),
  },
};

// Track operationId collisions
const operationRegistry = {};

/**
 * Register an operationId and detect collisions
 * Returns the filename to use (with suffix if collision)
 */
function registerOperation(operationId, source) {
  if (!operationRegistry[operationId]) {
    operationRegistry[operationId] = source;
    return operationId + ".md";
  }

  // Collision detected - add suffix
  const existingSource = operationRegistry[operationId];
  if (existingSource !== source) {
    return operationId + "__" + source + ".md";
  }

  return operationId + ".md";
}

/**
 * Escape backticks for markdown
 */
function escapeMd(str) {
  if (!str) return "-";
  return String(str).replace(/`/g, "\\`");
}

/**
 * Build curl example from endpoint config
 */
function buildCurlExample(endpoint) {
  const {
    method,
    apiHost,
    path: pathTemplate,
    pathParams = [],
    queryParams = [],
    bodyParam,
  } = endpoint;

  // Build URL with path params replaced by examples
  let urlPath = pathTemplate;
  for (const param of pathParams) {
    if (param.example) {
      urlPath = urlPath.replace(":" + param.name, param.example);
    }
  }

  // Build query string
  const queryParamsStr = queryParams
    .filter((p) => p.example !== undefined)
    .map((p) => p.name + "=" + encodeURIComponent(String(p.example)))
    .join("&");

  let fullUrl = apiHost + urlPath;
  if (queryParamsStr) {
    fullUrl += "?" + queryParamsStr;
  }

  // Build curl command
  let curl = "curl -X " + method + ' "' + fullUrl + '" \\\n';
  curl += '  -H "accept: application/json" \\\n';
  curl += '  -H "X-API-Key: $MORALIS_API_KEY"';

  // Add body if present
  if (bodyParam) {
    const bodyExample = buildBodyExample(bodyParam);
    curl += ' \\\n  -H "Content-Type: application/json" \\\n';
    curl += "  -d '" + bodyExample + "'";
  }

  return curl;
}

/**
 * Build JSON body example from bodyParam
 */
function buildBodyExample(bodyParam) {
  if (typeof bodyParam === "string") {
    return bodyParam;
  }

  // Simple object builder
  const obj = {};
  if (Array.isArray(bodyParam)) {
    for (const field of bodyParam) {
      if (field.example !== undefined) {
        obj[field.name] = field.example;
      }
    }
  }
  return JSON.stringify(obj, null, 2);
}

/**
 * Build pagination section if cursor/limit present
 */
function buildPaginationSection(endpoint) {
  const { queryParams = [], responses = [] } = endpoint;
  const hasCursorParam = queryParams.some((p) => p.name === "cursor");
  const hasLimitParam = queryParams.some((p) => p.name === "limit");

  // Check if response has cursor
  let responseHasCursor = false;
  for (const resp of responses) {
    if (resp.body && resp.body.fields) {
      const hasCursorField = resp.body.fields.some((f) => f.name === "cursor");
      if (hasCursorField) {
        responseHasCursor = true;
        break;
      }
    }
  }

  if (!hasCursorParam && !hasLimitParam && !responseHasCursor) {
    return null;
  }

  let section = "## Cursor/Pagination\n\n";

  if (hasLimitParam) {
    const limitParam = queryParams.find((p) => p.name === "limit");
    section +=
      "- **limit**: " +
      (limitParam.description || "Number of results per page") +
      "\n";
  }

  if (hasCursorParam) {
    const cursorParam = queryParams.find((p) => p.name === "cursor");
    section +=
      "- **cursor**: " +
      (cursorParam.description || "Cursor for next page") +
      "\n";
  }

  if (responseHasCursor) {
    section +=
      "\nThe response includes a **cursor** field for pagination. Use this cursor in the next request to get the next page of results.\n";
  }

  return section;
}

/**
 * Build path params section
 */
function buildPathParamsSection(pathParams = []) {
  if (pathParams.length === 0) {
    return null;
  }

  let section = "## Path Params\n\n";
  section += "| Name | Type | Required | Description | Example |\n";
  section += "|------|------|----------|-------------|----------|\n";

  for (const param of pathParams) {
    const name = param.name;
    const type = param.type || "string";
    const required = param.required ? "Yes" : "No";
    const desc = param.description || "-";
    const example = param.example
      ? "\\`" + escapeMd(param.example) + "\\`"
      : "-";
    section +=
      "| " +
      name +
      " | " +
      type +
      " | " +
      required +
      " | " +
      desc +
      " | " +
      example +
      " |\n";
  }

  return section;
}

/**
 * Build query params section
 */
function buildQueryParamsSection(queryParams = []) {
  if (queryParams.length === 0) {
    return null;
  }

  let section = "## Query Params\n\n";
  section += "| Name | Type | Required | Description | Example |\n";
  section += "|------|------|----------|-------------|----------|\n";

  for (const param of queryParams) {
    const name = param.name;
    const type =
      (param.type || "string") +
      (param.enum
        ? " (" +
          param.enum.slice(0, 5).join(", ") +
          (param.enum.length > 5 ? "..." : "") +
          ")"
        : "");
    const required = param.required ? "Yes" : "No";
    const desc = param.description || "-";
    const example =
      param.example !== undefined
        ? "\\`" + escapeMd(param.example) + "\\`"
        : "-";
    section +=
      "| " +
      name +
      " | " +
      type +
      " | " +
      required +
      " | " +
      desc +
      " | " +
      example +
      " |\n";
  }

  return section;
}

/**
 * Build body section
 */
function buildBodySection(endpoint) {
  const { bodyParam, bodySchema } = endpoint;

  if (!bodyParam && !bodySchema) {
    return null;
  }

  let section = "## Body\n\n";

  if (bodySchema && Array.isArray(bodySchema)) {
    section += "| Name | Type | Required | Description |\n";
    section += "|------|------|----------|-------------|\n";

    for (const field of bodySchema) {
      section +=
        "| " +
        field.name +
        " | " +
        (field.type || "-") +
        " | " +
        (field.required ? "Yes" : "No") +
        " | " +
        (field.description || "-") +
        " |\n";
    }
  } else if (typeof bodyParam === "object" && Array.isArray(bodyParam)) {
    section += "| Name | Type | Required | Description | Example |\n";
    section += "|------|------|----------|-------------|----------|\n";

    for (const field of bodyParam) {
      const example =
        field.example !== undefined
          ? "\\`" + escapeMd(field.example) + "\\`"
          : "-";
      section +=
        "| " +
        field.name +
        " | " +
        (field.type || "-") +
        " | " +
        (field.required ? "Yes" : "No") +
        " | " +
        (field.description || "-") +
        " | " +
        example +
        " |\n";
    }
  } else if (typeof bodyParam === "string") {
    section += "```json\n" + bodyParam + "\n```\n";
  }

  return section;
}

/**
 * Generate markdown content for a single endpoint
 */
function generateEndpointMarkdown(operationId, endpoint, source) {
  const {
    summary,
    description,
    method,
    apiHost,
    path: pathTemplate,
    pathParams = [],
    queryParams = [],
  } = endpoint;

  let md = "# " + summary + "\n\n";

  if (description) {
    md += description + "\n\n";
  }

  md += "## Method\n\n" + method + "\n\n";
  md += "## Base URL\n\n`" + apiHost + "`\n\n";
  md += "## Path\n\n`" + pathTemplate + "`\n\n";

  // Path params
  const pathParamsSection = buildPathParamsSection(pathParams);
  if (pathParamsSection) {
    md += pathParamsSection + "\n";
  }

  // Query params
  const queryParamsSection = buildQueryParamsSection(queryParams);
  if (queryParamsSection) {
    md += queryParamsSection + "\n";
  }

  // Body
  const bodySection = buildBodySection(endpoint);
  if (bodySection) {
    md += bodySection + "\n";
  }

  // Pagination
  const paginationSection = buildPaginationSection(endpoint);
  if (paginationSection) {
    md += paginationSection + "\n";
  }

  // Example
  md +=
    "## Example (curl)\n\n```bash\n" + buildCurlExample(endpoint) + "\n```\n";

  return md;
}

/**
 * Process a single source (evm, solana, streams)
 */
function processSource(sourceName, sourceData, rulesDir) {
  const operationIds = Object.keys(sourceData);
  console.log(
    "  Processing " + sourceName + ": " + operationIds.length + " endpoints",
  );

  for (const operationId of operationIds) {
    const endpoint = sourceData[operationId];
    const filename = registerOperation(operationId, sourceName);
    const filepath = path.join(rulesDir, filename);

    const markdown = generateEndpointMarkdown(
      operationId,
      endpoint,
      sourceName,
    );

    writeFileIfChanged(filepath, markdown);
  }
}

/**
 * Main entry point
 */
function main() {
  console.log("Generating REST endpoint rules...\n");

  // Load API configs
  const apiConfigs = JSON.parse(fs.readFileSync(API_CONFIGS_PATH, "utf8"));

  // Process each skill
  for (const [skillName, config] of Object.entries(SKILL_MAPPINGS)) {
    console.log("\n" + skillName + ":");
    ensureDir(config.rulesDir);

    for (const source of config.sources) {
      if (apiConfigs[source]) {
        processSource(source, apiConfigs[source], config.rulesDir);
      } else {
        console.warn(
          '  Warning: source "' + source + '" not found in api-configs.json',
        );
      }
    }
  }

  console.log("\nDone! Generated rules:");
  console.log("  - skills/moralis-data-api/rules/*.md");
  console.log("  - skills/moralis-streams-api/rules/*.md");
}

// Run
if (require.main === module) {
  main();
}

module.exports = { main };
