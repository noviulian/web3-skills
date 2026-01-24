const https = require("https");
const fs = require("fs");
const path = require("path");

/**
 * Streams API Query Client
 * Optimized for Moralis Streams API endpoints
 *
 * Features:
 * - Stream management (create, update, delete, get)
 * - Address management for streams
 * - Status updates (pause/resume)
 * - History, replay, and block data retrieval
 * - Settings and stats management
 * - Webhook event monitoring
 *
 * NO external dependencies - uses only Node.js built-in modules
 */

// Chain name to hex ID mapping (swagger-aligned)
const CHAIN_HEX_MAP = {
  eth: "0x1",
  sepolia: "0xaa36a7",
  holesky: "0x4268",
  polygon: "0x89",
  amoy: "0x13882",
  bsc: "0x38",
  "bsc testnet": "0x61",
  bsc_testnet: "0x61",
  "bsc-testnet": "0x61",
  arbitrum: "0xa4b1",
  "arbitrum sepolia": "0x66eee",
  "arbitrum-sepolia": "0x66eee",
  base: "0x2105",
  "base sepolia": "0x14a34",
  base_sepolia: "0x14a34",
  "base-sepolia": "0x14a34",
  optimism: "0xa",
  "optimism sepolia": "0xaa37dc",
  "optimism-sepolia": "0xaa37dc",
  linea: "0xe708",
  "linea sepolia": "0xe705",
  linea_sepolia: "0xe705",
  "linea-sepolia": "0xe705",
  avalanche: "0xa86a",
  fantom: "0xfa",
  "fantom testnet": "0xfa2",
  "fantom-testnet": "0xfa2",
  cronos: "0x19",
  gnosis: "0x64",
  "gnosis testnet": "0x27d8",
  gnosis_testnet: "0x27d8",
  "gnosis-testnet": "0x27d8",
  chiliz: "0x15b38",
  "chiliz testnet": "0x15b32",
  chiliz_testnet: "0x15b32",
  "chiliz-testnet": "0x15b32",
  moonbeam: "0x504",
  moonriver: "0x505",
  moonbase: "0x507",
  flow: "0x2eb",
  "flow testnet": "0x221",
  "flow-testnet": "0x221",
  ronin: "0x7e4",
  "ronin testnet": "0x7e5",
  "ronin-testnet": "0x7e5",
  lisk: "0x46f",
  "lisk sepolia": "0x106a",
  "lisk-sepolia": "0x106a",
  pulse: "0x171",
  hyperevm: "0x3e7",
  monad: "0x8f",
};

const STREAMS_SUPPORTED_CHAIN_IDS = new Set([
  "0x1",
  "0xaa36a7",
  "0x4268",
  "0x89",
  "0x13882",
  "0x38",
  "0x61",
  "0xa4b1",
  "0x66eee",
  "0x2105",
  "0x14a34",
  "0xa",
  "0xaa37dc",
  "0xe708",
  "0xe705",
  "0xa86a",
  "0xfa",
  "0xfa2",
  "0x19",
  "0x64",
  "0x27d8",
  "0x15b38",
  "0x15b32",
  "0x504",
  "0x505",
  "0x507",
  "0x2eb",
  "0x221",
  "0x7e4",
  "0x7e5",
  "0x46f",
  "0x106a",
  "0x171",
  "0x3e7",
  "0x8f",
]);

/**
 * Convert chain name to hex ID
 * @param {string} chain - Chain name (e.g., "eth", "polygon", "0x1")
 * @returns {string} Hex chain ID or original value if already hex/unknown
 */
function chainToHex(chain) {
  if (!chain) return "0x1"; // Default to Ethereum
  const normalized = String(chain).toLowerCase().trim();
  if (normalized.startsWith("0x")) return normalized;
  const compact = normalized.replace(/\s+/g, " ");
  const mapped =
    CHAIN_HEX_MAP[compact] ||
    CHAIN_HEX_MAP[compact.replace(/\s+/g, "_")] ||
    CHAIN_HEX_MAP[compact.replace(/\s+/g, "-")];
  return mapped || chain;
}

function assertStreamsChainSupported(chainHex, endpoint) {
  if (STREAMS_SUPPORTED_CHAIN_IDS.has(chainHex)) return;
  throw new Error(
    `Unsupported chain for ${endpoint}. Supported chain IDs: ${[...STREAMS_SUPPORTED_CHAIN_IDS].join(", ")}`,
  );
}

/**
 * Find .env file by searching upward from a directory
 * @param {string} startDir - Starting directory
 * @returns {string} Path to .env file or null
 */
function findEnvFile(startDir) {
  let currentDir = startDir;
  const root = path.parse(currentDir).root;

  while (currentDir !== root && currentDir !== path.join(currentDir, "..")) {
    const envPath = path.join(currentDir, ".env");
    // Symlink protection: Only accept regular files, not symlinks
    if (fs.existsSync(envPath) && !fs.lstatSync(envPath).isSymbolicLink()) {
      return envPath;
    }
    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) break;
    currentDir = parentDir;
  }

  return null;
}

/**
 * Read API key from .env file
 * Searches upward from skillDir to find .env file
 * @param {string} skillDir - Starting directory path (defaults to streams-api)
 * @returns {string} API key
 */
function getAPIKey(skillDir = __dirname) {
  const envPath = findEnvFile(skillDir);

  if (!envPath) {
    throw new Error(
      "API key not found. Create a .env file with:\n" +
        "  MORALIS_API_KEY=your_key_here\n\n" +
        "If you installed web3-api-skills, you can also run:\n" +
        "  /web3-api-key\n" +
        "Searched from: " +
        skillDir,
    );
  }

  const content = fs.readFileSync(envPath, "utf8");
  const match = content.match(/MORALIS_API_KEY=(.+)/);

  if (!match) {
    throw new Error("Invalid .env file. Format: MORALIS_API_KEY=your_key_here");
  }

  return match[1].trim();
}

/**
 * Make HTTPS request with method support (GET, POST, PUT, PATCH, DELETE)
 * @param {string} fullUrl - Complete URL with query params
 * @param {object} headers - Request headers
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @param {object} body - Request body (for POST, PUT)
 * @returns {Promise<object>} Parsed JSON response
 */
function httpsRequest(fullUrl, headers, method = "GET", body = null) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(fullUrl);

    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || 443,
      path: parsedUrl.pathname + parsedUrl.search,
      method: method,
      headers: headers,
      timeout: 30000, // 30 second timeout
    };

    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode >= 400) {
            reject(
              new Error(
                `API Error ${res.statusCode}: ${JSON.stringify(parsed)}`,
              ),
            );
          } else {
            resolve(parsed);
          }
        } catch (e) {
          resolve(data); // Return raw if not JSON
        }
      });
    });

    req.on("error", reject);

    // Handle timeout event
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Request timeout after 30 seconds"));
    });

    // Write body if provided
    if (body) {
      req.write(JSON.stringify(body));
    }

    req.end();
  });
}

/**
 * Query Moralis Streams API
 *
 * @param {string} endpoint - API endpoint path (e.g., "/streams/evm", "/streams/evm/{id}")
 * @param {object} options - { method, params, body, skillDir }
 * @returns {Promise<object>}
 *
 * @example
 * // Get all streams
 * query('/streams/evm', { params: { limit: 10 } })
 *
 * @example
 * // Create a stream
 * query('/streams/evm', {
 *   method: 'PUT',
 *   body: {
 *     webhookUrl: 'https://example.com/webhook',
 *     chainIds: ['0x1'],
 *     topic0: ['Transfer(address,address,uint256)']
 *   }
 * })
 *
 * @example
 * // Update stream status
 * query('/streams/evm/{id}/status', {
 *   pathParams: { id: 'uuid-here' },
 *   method: 'POST',
 *   body: { status: 'paused' }
 * })
 */
async function query(endpoint, options = {}) {
  const {
    method = "GET",
    params = {},
    body = null,
    pathParams = {},
    skillDir = __dirname,
  } = options;

  const baseURL = "https://api.moralis-streams.com";

  const normalizeChainParam = (value) => {
    if (Array.isArray(value)) {
      return value.map((item) => {
        if (typeof item !== "string") return item;
        const chainHex = chainToHex(item);
        assertStreamsChainSupported(chainHex, endpoint);
        return chainHex;
      });
    }
    if (typeof value === "string") {
      const chainHex = chainToHex(value);
      assertStreamsChainSupported(chainHex, endpoint);
      return chainHex;
    }
    return value;
  };

  const normalizedParams = { ...params };
  if (Object.prototype.hasOwnProperty.call(normalizedParams, "chainId")) {
    normalizedParams.chainId = normalizeChainParam(normalizedParams.chainId);
  }
  if (Object.prototype.hasOwnProperty.call(normalizedParams, "chainIds")) {
    normalizedParams.chainIds = normalizeChainParam(normalizedParams.chainIds);
  }

  let normalizedBody = body;
  if (body && typeof body === "object") {
    if (
      Object.prototype.hasOwnProperty.call(body, "chainId") ||
      Object.prototype.hasOwnProperty.call(body, "chainIds")
    ) {
      normalizedBody = { ...body };
      if (Object.prototype.hasOwnProperty.call(body, "chainId")) {
        normalizedBody.chainId = normalizeChainParam(body.chainId);
      }
      if (Object.prototype.hasOwnProperty.call(body, "chainIds")) {
        normalizedBody.chainIds = normalizeChainParam(body.chainIds);
      }
    }
  }

  // Replace path parameters (e.g., {id} becomes actual ID)
  let endpointPath = endpoint;
  for (const [key, value] of Object.entries(pathParams)) {
    const normalizedValue =
      key === "chainId" ? normalizeChainParam(value) : value;
    endpointPath = endpointPath.replace(`{${key}}`, normalizedValue);
    endpointPath = endpointPath.replace(`:${key}`, normalizedValue);
  }

  // Build query parameters
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(normalizedParams)) {
    if (Array.isArray(value)) {
      value.forEach((v) => searchParams.append(key, v));
    } else {
      searchParams.append(key, value);
    }
  }

  const queryString = searchParams.toString()
    ? "?" + searchParams.toString()
    : "";
  const fullUrl = baseURL + endpointPath + queryString;

  // Make request
  const headers = {
    "x-api-key": getAPIKey(skillDir),
    Accept: "application/json",
  };

  if (normalizedBody) {
    headers["Content-Type"] = "application/json";
  }

  return httpsRequest(fullUrl, headers, method, normalizedBody);
}

// Export
module.exports = {
  q: query, // Shorthand for query (token-efficient)
  query,
  chainToHex,
  getAPIKey,
  httpsRequest,
};
