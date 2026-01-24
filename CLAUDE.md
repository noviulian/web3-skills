# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Moralis API Skills** is a collection of modular skills for Moralis API integration with Claude Code. It provides 2 consolidated skills for Web3 blockchain data (EVM chains + Solana) plus real-time event monitoring.

**Skills included:**
- **moralis-data-api** - Unified query client for all Web3 data (wallet, token, NFT, DeFi, entity, price, blockchain)
- **moralis-streams-api** - Real-time blockchain event monitoring with webhooks

**Key Design Principle: ZERO external dependencies - uses only Node.js built-in modules (https, fs, path, url, crypto).**

**v3.0.0:** Consolidated from 9 skills to 2 skills with rules/ folder structure for 70-80% token reduction.

## Commands

### API Key Setup (Required before use)

```bash
/moralis-api-key <your_api_key_here>
```

This command sets the Moralis API key for all skills at once by updating the `.env` file in the skills directory.

Get your API key:
1. Register at https://admin.moralis.io/register (free)
2. Get your key at https://admin.moralis.com/api-keys

### Testing

```bash
# Test all skills load correctly
./scripts/test-all-skills.sh

# Test installation flow
./scripts/test-installation.sh

# Test individual skill queries (requires API key)
cd skills/moralis-data-api
node -e "const { query } = require('./query'); query('/:address/balance', { address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' }).then(console.log)"
```

### Skills Installation

```bash
# Add skills from repository
npx skills add noviulian/moralis-api-skills

# List available skills
npx skills add noviulian/moralis-api-skills --list
```

Skills are installed to:
- Project level: `<project>/.claude/skills/`
- Global: `~/.claude/skills/`

## Architecture

### Consolidated Skills Structure

```
moralis-api-skills/
├── skills/
│   ├── moralis-data-api/         # ⭐ All Web3 query endpoints
│   │   ├── SKILL.md              # Navigation hub (~60 lines)
│   │   ├── query.js              # Unified query client (~960 lines)
│   │   └── rules/                # ⭐ Endpoint documentation
│   │       ├── wallet/           # Balance, tokens, NFTs, history, DeFi, PnL
│   │       ├── token/            # Price, metadata, pairs, swaps, analytics
│   │       ├── nft/              # Metadata, transfers, traits, rarity
│   │       ├── defi/             # Protocol positions
│   │       ├── entity/           # Labeled addresses
│   │       ├── price/            # Token/NFT prices, OHLCV
│   │       └── blockchain/       # Blocks, transactions
│   │
│   └── moralis-streams-api/      # Real-time event monitoring
│       ├── SKILL.md              # Navigation hub (~60 lines)
│       ├── query.js              # Streams-specific client (~380 lines)
│       └── rules/                # Stream management docs
│           ├── stream_management.md
│           ├── address_management.md
│           └── event_types.md
│
├── documentation/                 # Anthropic docs, guides
└── scripts/                       # Testing scripts
```

### Unified Query Client

Each skill contains its own `query.js` file with full functionality:

**moralis-data-api/query.js** (~960 lines):
- Auto blockchain detection (EVM vs Solana)
- Chain name to hex conversion (40+ chains)
- HTTP method support (GET, POST, PUT, DELETE, PATCH)
- Date/time to block conversion
- Token search functionality
- Pagination support (`paginate()`)
- Spam filtering (`createSpamFilter()`)
- Verified contract filtering (`createVerifiedFilter()`)
- Batch request helper
- Zero dependencies

**moralis-streams-api/query.js** (~380 lines):
- Stream management (create, update, delete)
- Address management
- Status updates (pause/resume)
- Historical data delivery
- Custom baseURL (api.moralis-streams.com)

### Skill Structure

Each skill follows the Agent Skills standard:

```
moralis-data-api/
├── SKILL.md              # Skill metadata + usage documentation
├── query.js              # Unified query client
└── rules/                # Endpoint documentation
    ├── wallet/           # Per-category endpoint docs
    ├── token/
    ├── nft/
    └── ...
```

**SKILL.md Frontmatter (required):**
```yaml
---
name: moralis-data-api
description: Query Web3 blockchain data...
license: MIT
compatibility: Requires Node.js (built-in modules only)
metadata:
  version: "3.0.0"
  author: web3-skills
  tags: [web3, blockchain, evm, solana, wallet, token, nft, defi]
---
```

### API Endpoint Patterns

**EVM API:**
- Base URL: `https://deep-index.moralis.io/api/v2.2/`
- Chain parameter: `?chain=eth`, `?chain=0x1`, `?chain=polygon`
- Addresses: `0x...` format (42 characters)

**Solana API:**
- Base URL: `https://solana-gateway.moralis.io/`
- Network: `/mainnet/` or `/devnet/` in path
- Addresses: Base58 encoded (32-44 characters)

**Streams API:**
- Base URL: `https://api.moralis-streams.com/`
- Uses PUT for create, POST for update, DELETE for delete
- Webhook-based event streaming

**Common Pitfalls:**
- Native balance uses `/:address/balance`, NOT `/wallets/:address/balance`
- Use hex chain IDs to save tokens: `0x1` instead of `eth`, `0x89` instead of `polygon`
- Path parameters like `:address` are automatically replaced by the query client
- Streams API requires `limit` parameter on GET endpoints (max 100)
- Stream IDs are UUIDs, not hex strings

## Available Skills

### Core Web3 Skills

- **moralis-data-api** - Unified query client for all Web3 data
  - **Wallet data:** balances, tokens, NFTs, transaction history, DeFi positions, profitability, net worth
  - **Token data:** prices, metadata, pairs, DEX trades, analytics, security scores, sniper detection
  - **NFT data:** metadata, transfers, traits, rarity, floor prices
  - **DeFi data:** protocol positions, liquidity, exposure
  - **Entity data:** labeled addresses (exchanges, funds, protocols, whales)
  - **Price data:** token/NFT prices, OHLCV candlesticks
  - **Blockchain data:** blocks, transactions, decoded data

### Streaming

- **moralis-streams-api** - Real-time blockchain event monitoring

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

1. Create skill directory: `mkdir skills/moralis-your-skill`
2. Create `SKILL.md` with proper frontmatter
3. Create `query.js` with full functionality
4. Add reference documentation in `rules/`
5. Test with real API calls

**SKILL.md guidelines:**
- Keep under 500 lines (token efficiency)
- Include "When to Use This Skill" section
- Include "Common Pitfalls" section
- Show practical query examples
- Use `$SKILL_DIR` for path references

## Zero Dependencies Policy

**CRITICAL:** This skills collection MUST NOT add external npm dependencies.

**✅ Allowed (Node.js built-in):**
- `https`, `http` - API requests
- `fs` - File system operations
- `path` - Path manipulation
- `url` - URL parsing
- `crypto` - Cryptographic operations

**❌ NOT allowed:**
- `axios`, `node-fetch` - Use `https` module instead
- `dotenv` - Use custom `.env` reading in query.js
- `express`, `commander` - Not needed for skills

## Important Files

- **`.env`** - Contains `MORALIS_API_KEY` (created by `/moralis-api-key` skill, in .gitignore)
- **`skills/moralis-data-api/query.js`** - Unified query client for all Web3 data
- **`skills/moralis-streams-api/query.js`** - Streams-specific query client
- **`skills/moralis-api-key/SKILL.md`** - API key setup skill
- **`scripts/test-all-skills.sh`** - Validates all skills load correctly
- **`CONTRIBUTING.md`** - Guidelines for contributors

## API Key Management

The `/moralis-api-key` skill updates `.env` file intelligently:
- Preserves existing environment variables
- Adds or updates `MORALIS_API_KEY` line
- Works across all installation methods (npx skills add, manual, global)

The query client searches upward from skill directory to find `.env` file, allowing flexible installation locations.
