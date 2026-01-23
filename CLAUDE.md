# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Moralis API Skills Marketplace** is a multi-plugin marketplace for Moralis API integration with Claude Code. It contains two separate plugins:

1. **web3-api-skills** - 9 modular skills for Web3 blockchain data (EVM chains + Solana)
2. **streams-api-skill** - Real-time blockchain event monitoring with webhooks

**Key Design Principle: ZERO external dependencies - uses only Node.js built-in modules (https, fs, path, url, crypto).**

## Commands

### API Key Setup (Required before use)

```bash
/web3-api-key <your_api_key_here>
```

This command sets the Moralis API key for all 9 skills at once by updating the `.env` file in the project root.

Get your API key:
1. Register at https://admin.moralis.io/register (free)
2. Get your key at https://admin.moralis.com/api-keys

### Testing

```bash
# Test all skills load correctly
./scripts/test-all-skills.sh

# Test plugin installation flow
./scripts/test-installation.sh

# Test individual skill queries (requires API key)
cd skills/web3-wallet-api
node -e "const { query } = require('./query'); query('/:address/balance', { address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' }).then(console.log)"
```

### Plugin Installation

```bash
# Add marketplace
/plugin marketplace add noviulian/moralis-skills

# Install web3-api-skills (EVM/Solana data APIs)
/plugin install web3-api-skills@moralis-api

# Install streams-api-skill (Real-time event monitoring)
/plugin install streams-api-skill@moralis-api

# Local development testing
/plugin marketplace add ./
```

## Architecture

### Marketplace Structure

```
moralis-skills/
├── .claude-plugin/
│   └── marketplace.json     # Marketplace manifest with both plugins
│
├── plugins/
│   ├── web3-api-skills/     # Plugin 1: EVM/Solana data APIs (self-contained)
│   │   ├── .claude-plugin/
│   │   │   └── plugin.json  # Plugin manifest
│   │   ├── skills/          # 9 modular skills
│   │   │   ├── web3-shared/         # ⭐ Unified query client
│   │   │   ├── web3-wallet-api/     # Wallet balances, tokens, NFTs
│   │   │   ├── web3-token-api/      # Token prices, metadata, DEX
│   │   │   ├── web3-nft-api/        # NFT metadata, transfers
│   │   │   ├── web3-defi-api/       # Protocol positions
│   │   │   ├── web3-entity-api/     # Labeled addresses
│   │   │   ├── web3-price-api/      # Token/NFT prices, OHLCV
│   │   │   ├── web3-blockchain-api/ # Blocks and transactions
│   │   │   ├── web3-utils/          # API version, weights
│   │   │   └── web3-premium/        # Advanced analytics
│   │   ├── agents/
│   │   │   └── web3-developer.md    # Expert Web3 development agent
│   │   └── commands/
│   │       └── web3-api-key.md      # API key setup command
│   │
│   └── streams-api-skill/   # Plugin 2: Streams API (self-contained)
│       ├── .claude-plugin/
│       │   └── plugin.json  # Plugin manifest
│       └── skills/
│           └── streams-api/
│               ├── SKILL.md
│               └── query.js
│
├── documentation/           # Anthropic docs, guides
├── scripts/                 # Testing scripts
└── swagger/                 # API swagger files
```

### Unified Query Client (`plugins/web3-api-skills/skills/web3-shared/query.js`)

All web3-api-skills share a single query client that provides:

**Key Features:**
- **Auto blockchain detection:** EVM (0x addresses) vs Solana (base58 addresses)
- **Chain name to hex conversion:** Saves API tokens by converting "eth" → "0x1", "polygon" → "0x89"
- **Path parameter replacement:** `/:address` becomes actual address in URL
- **Date/time to block conversion:** Convert timestamps to block numbers
- **Token search:** Find tokens by symbol
- **Pagination support:** Handle large result sets
- **Zero dependencies:** Pure Node.js built-in modules

**Chain Detection:**
```javascript
// EVM address (0x prefix, 42 chars)
query('/:address/balance', { address: '0x1234...' })  // → EVM API

// Solana address (base58, 32-44 chars, no 0x)
query('/:address/balance', { address: '742d35Cc66...' })  // → Solana API
```

**Each skill's `query.js` simply re-exports:**
```javascript
module.exports = require("../web3-shared/query");
```

### Skill Structure

Each skill follows the Agent Skills standard:

```
web3-wallet-api/
├── SKILL.md             # Skill metadata + usage documentation
├── query.js             # Re-exports from web3-shared
└── references/          # Detailed endpoint documentation
    ├── EVM_ENDPOINTPOINTS.md
    └── SOLANA_ENDPOINTPOINTS.md
```

**SKILL.md Frontmatter (required):**
```yaml
---
name: web3-wallet-api
description: Query wallet data...
license: MIT
compatibility: Requires Node.js (built-in modules only)
metadata:
  version: "1.0.0"
  author: web3-skills
  tags: [web3, blockchain, wallet, crypto]
---
```

### API Endpoint Patterns

**EVM API (web3-api-skills):**
- Base URL: `https://deep-index.moralis.io/api/v2.2/`
- Chain parameter: `?chain=eth`, `?chain=0x1`, `?chain=polygon`
- Addresses: `0x...` format (42 characters)

**Solana API (web3-api-skills):**
- Base URL: `https://solana-gateway.moralis.io/`
- Network: `/mainnet/` or `/devnet/` in path
- Addresses: Base58 encoded (32-44 characters)

**Streams API (streams-api-skill):**
- Base URL: `https://streams.moralis.io/api/v2.2/`
- Uses PUT for create, POST for update, DELETE for delete
- Webhook-based event streaming

**Common Pitfalls:**
- Native balance uses `/:address/balance`, NOT `/wallets/:address/balance`
- Use hex chain IDs to save tokens: `0x1` instead of `eth`, `0x89` instead of `polygon`
- Path parameters like `:address` are automatically replaced by the query client
- Streams API requires `limit` parameter on GET endpoints (max 100)
- Stream IDs are UUIDs, not hex strings

## Plugin: web3-api-skills

Contains 9 modular skills for EVM and Solana blockchain data queries:

- `web3-wallet-api` - Wallet balances, tokens, NFTs, DeFi positions
- `web3-token-api` - Token prices, metadata, DEX pairs, swaps
- `web3-nft-api` - NFT metadata, transfers, traits, rarity
- `web3-defi-api` - Protocol positions and exposure
- `web3-entity-api` - Labeled addresses/entities
- `web3-price-api` - Token/NFT prices, OHLCV data
- `web3-blockchain-api` - Blocks and transactions
- `web3-utils` - API version, endpoint weights
- `web3-premium` - Advanced analytics endpoints

## Plugin: streams-api-skill

Real-time blockchain event monitoring with webhooks:

**Key Capabilities:**
- Create and manage streams (create, update, delete, get)
- Add/remove addresses to streams
- Update stream status (pause/resume)
- Monitor transactions, logs, token transfers, NFT transfers, internal transactions
- Get stream history and block data
- Webhook event delivery

**Stream Types:**
- `tx` - Native transactions
- `log` - Contract event logs
- `erc20transfer` - ERC20 token transfers
- `erc20approval` - ERC20 approvals
- `nfttransfer` - NFT transfers
- `internalTx` - Internal transactions

## Adding a New Skill

### Adding to web3-api-skills

1. Create skill directory: `mkdir plugins/web3-api-skills/skills/web3-your-skill`
2. Create `SKILL.md` with proper frontmatter
3. Create `query.js` that re-exports from web3-shared
4. Add reference documentation in `references/`
5. Test with real API calls

### Adding a New Plugin

1. Create plugin directory: `mkdir plugins/your-plugin/.claude-plugin`
2. Create `plugin.json` with plugin metadata
3. Add skills directory: `mkdir -p plugins/your-plugin/skills/your-skill`
4. Create `SKILL.md` and `query.js` in the skills directory
5. Update `.claude-plugin/marketplace.json` to include the plugin

**SKILL.md guidelines:**
- Keep under 500 lines (token efficiency)
- Include "When to Use This Skill" section
- Include "Common Pitfalls" section
- Show practical query examples
- Use `$SKILL_DIR` for path references

## Zero Dependencies Policy

**CRITICAL:** This plugin MUST NOT add external npm dependencies.

**✅ Allowed (Node.js built-in):**
- `https`, `http` - API requests
- `fs` - File system operations
- `path` - Path manipulation
- `url` - URL parsing
- `crypto` - Cryptographic operations

**❌ NOT allowed:**
- `axios`, `node-fetch` - Use `https` module instead
- `dotenv` - Use custom `.env` reading in query.js
- `express`, `commander` - Not needed for plugin

## Important Files

- **`.env`** - Contains `MORALIS_API_KEY` (created by `/web3-api-key` command, in .gitignore)
- **`.claude-plugin/marketplace.json`** - Marketplace manifest with both plugins
- **`plugins/web3-api-skills/skills/web3-shared/query.js`** - Unified query client for web3-api-skills
- **`plugins/web3-api-skills/.claude-plugin/plugin.json`** - web3-api-skills manifest
- **`plugins/web3-api-skills/commands/web3-api-key.md`** - API key setup command
- **`plugins/web3-api-skills/agents/web3-developer.md`** - Expert Web3 development agent
- **`plugins/streams-api-skill/skills/streams-api/query.js`** - Streams API query client
- **`scripts/test-all-skills.sh`** - Validates all skills load correctly
- **`CONTRIBUTING.md`** - Guidelines for contributors

## API Key Management

The `/web3-api-key` command updates `.env` file intelligently:
- Preserves existing environment variables
- Adds or updates `MORALIS_API_KEY` line
- Works across all installation methods (marketplace, manual, global)

The query client searches upward from skill directory to find `.env` file, allowing flexible installation locations.
