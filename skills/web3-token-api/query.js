const https = require("https");
const fs = require("fs");
const path = require("path");

/**
 * Simple API client using ONLY Node.js built-in modules
 * NO external dependencies - ZERO npm install required
 *
 * Supports both EVM and Solana blockchains with auto-detection
 */

// Read API key from .env file
function getAPIKey(skillDir = __dirname) {
  const envPath = path.join(skillDir, ".env");

  if (!fs.existsSync(envPath)) {
    throw new Error(
      "API key not found. Please set it by running:\n" +
        "  /web3-api-key\n\n" +
        "Or create the file manually:\n" +
        "  " +
        envPath +
        "\n" +
        "With content: MORALIS_API_KEY=your_key_here",
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
 * Detect blockchain from address format
 */
function detectBlockchain(address, context = {}) {
  // Solana addresses are base58 (32-44 chars, no 0x prefix)
  if (address && !address.startsWith("0x") && address.length >= 32) {
    return { type: "solana", network: context.network || "mainnet" };
  }

  // EVM addresses are 0x prefix, 42 chars
  if (address && address.startsWith("0x") && address.length === 42) {
    return { type: "evm", chain: context.chain || "eth" };
  }

  // Detect from context
  if (context.chain) {
    const solanaChains = ["sol", "solana", "mainnet", "devnet"];
    if (solanaChains.includes(context.chain.toLowerCase())) {
      return { type: "solana", network: context.network || "mainnet" };
    }
    return { type: "evm", chain: context.chain };
  }

  // Default to EVM
  return { type: "evm", chain: "eth" };
}

/**
 * Make HTTPS request using built-in https module
 */
function httpsRequest(fullUrl, headers) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(fullUrl);

    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || 443,
      path: parsedUrl.pathname + parsedUrl.search,
      method: "GET",
      headers: headers,
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
    req.end();
  });
}

/**
 * Query Moralis API (auto-detects EVM vs Solana)
 *
 * @param {string} endpoint - API endpoint path
 * @param {object} options - { address, chain, network, params, skillDir }
 * @returns {Promise<object>}
 */
async function query(endpoint, options = {}) {
  const {
    address,
    chain,
    network,
    params = {},
    skillDir = __dirname,
  } = options;

  // Detect blockchain
  const blockchain = detectBlockchain(address, { chain, network });

  // Build URL based on blockchain type
  let fullUrl;

  if (blockchain.type === "evm") {
    const baseURL = "https://deep-index.moralis.io/api/v2.2";
    // Replace :address and :walletAddress placeholders in endpoint
    let endpointPath = endpoint.replace(":address", address);
    endpointPath = endpointPath.replace(":walletAddress", address);
    // Remove chain from params to avoid duplication, we'll add it back
    const { chain: _chain, ...otherParams } = params;
    const searchParams = new URLSearchParams(otherParams);
    // Use chain from params if provided, otherwise use detected chain
    const chainParam = params.chain || blockchain.chain;
    searchParams.append("chain", chainParam);
    fullUrl = baseURL + endpointPath + "?" + searchParams.toString();
  } else {
    const baseURL = "https://solana-gateway.moralis.io";
    // Replace :network, :address, and :walletAddress placeholders in endpoint
    let endpointPath = endpoint.replace(":network", blockchain.network);
    endpointPath = endpointPath.replace(":address", address);
    endpointPath = endpointPath.replace(":walletAddress", address);
    const searchParams = new URLSearchParams(params);
    const queryString =
      Object.keys(params).length > 0 ? "?" + searchParams.toString() : "";
    fullUrl = baseURL + endpointPath + queryString;
  }

  // Make request
  const headers = {
    "x-api-key": getAPIKey(skillDir),
    Accept: "application/json",
  };

  return httpsRequest(fullUrl, headers);
}

/**
 * Search for tokens by name, symbol, or address
 * @param {string} queryParam - Token name, symbol, or address
 * @param {string|string[]} chains - Optional chain filter (chain name, hex ID, or array of hex IDs)
 * @param {string} skillDir - Skill directory for API key
 * @returns {Promise<object>} Token search results
 *
 * @example
 * // Search all chains
 * searchToken('pepe')
 *
 * @example
 * // Search specific chain
 * searchToken('pepe', '0x1')
 *
 * @example
 * // Search multiple chains
 * searchToken('pepe', ['0x1', '0x89'])
 */
async function searchToken(queryParam, chains, skillDir = __dirname) {
  const apiKey = getAPIKey(skillDir);
  let url = `https://deep-index.moralis.io/api/v2.2/tokens/search?query=${encodeURIComponent(queryParam)}`;

  // Add chains filter if specified
  if (chains) {
    if (Array.isArray(chains)) {
      url += `&chains=${chains.join(",")}`;
    } else {
      url += `&chains=${chains}`;
    }
  }

  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        { headers: { "x-api-key": apiKey, Accept: "application/json" } },
        (res) => {
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
              reject(e);
            }
          });
          res.on("error", reject);
        },
      )
      .on("error", reject);
  });
}

// Export with shorthand aliases for token efficiency
module.exports = {
  q: query, // Shorthand for query (token-efficient)
  query,
  searchToken, // Search tokens by name/symbol/address
  detectBlockchain,
  getAPIKey,
  httpsRequest,
};
