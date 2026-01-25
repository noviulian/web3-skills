const fs = require("fs");
const path = require("path");

/**
 * @name camelToSnakeCase
 * @description Convert camelCase to kebab-case for file names
 */
const camelToSnakeCase = (str) => {
  return (str.charAt(0).toLowerCase() + str.slice(1))
    .replaceAll("NFT", "Nft")
    .replaceAll("SPL", "Spl")
    .replaceAll("IPFS", "Ipfs")
    .replaceAll("ERC", "Erc")
    .replace(/[A-Z]/g, (letter) => "-" + letter.toLowerCase());
};

/**
 * @name generateDefaultExample
 * @description Generate a default example value based on field type and name
 */
const generateDefaultExample = (field) => {
  const { type, name } = field;

  switch (type) {
    case "string":
      return "string";
    case "number":
    case "integer":
      return 0;
    case "boolean":
      return false;
    case "array":
      return [];
    case "object":
      return {};
    default:
      return "string";
  }
};

/**
 * @name addMissingExamples
 * @description Recursively add example values to fields that don't have them
 */
const addMissingExamples = (fields) => {
  if (!Array.isArray(fields)) return fields;

  return fields.map((field) => {
    const updatedField = { ...field };

    if (updatedField.example === undefined) {
      updatedField.example = generateDefaultExample(field);
    }

    if (updatedField.fields && Array.isArray(updatedField.fields)) {
      updatedField.fields = addMissingExamples(updatedField.fields);
    }

    return updatedField;
  });
};

/**
 * @name loadExistingConfigs
 * @description Load existing configs.json file if it exists
 */
const loadExistingConfigs = (configPath) => {
  try {
    if (fs.existsSync(configPath)) {
      const fileContent = fs.readFileSync(configPath, "utf8");
      return JSON.parse(fileContent);
    }
  } catch (error) {
    console.warn(
      "Could not load existing configs.json, starting fresh:",
      error.message,
    );
  }
  return {};
};

/**
 * @name ensureDir
 * @description Create directory if it doesn't exist
 */
const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

/**
 * @name writeFileIfChanged
 * @description Write file only if content has changed
 */
const writeFileIfChanged = (filepath, contents) => {
  let existing = null;
  if (fs.existsSync(filepath)) {
    existing = fs.readFileSync(filepath, "utf8");
  }

  if (existing !== contents) {
    ensureDir(path.dirname(filepath));
    fs.writeFileSync(filepath, contents, "utf8");
    console.log(`  Wrote: ${path.basename(filepath)}`);
  }
};

module.exports = {
  camelToSnakeCase,
  generateDefaultExample,
  addMissingExamples,
  loadExistingConfigs,
  ensureDir,
  writeFileIfChanged,
};
