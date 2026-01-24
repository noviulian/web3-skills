# Consolidate Moralis API Skills Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Consolidate 9 Moralis API skills into 2 skills (moralis-data-api and moralis-streams-api) with rules/ folder structure to reduce token usage by 70-80%.

**Architecture:**
- Create `moralis-data-api` skill containing all Web3 query endpoints (wallet, token, NFT, DeFi, entity, price, blockchain)
- Create `moralis-streams-api` skill for real-time event monitoring (already separate, restructure with rules/)
- Each skill has single SKILL.md (navigation hub) + rules/ folder (endpoint details)
- Copy query.js directly into each skill (remove web3-shared dependency)

**Tech Stack:** Node.js built-in modules only (https, fs, path, url, crypto) - zero external dependencies

---

## Task 1: Backup Current Skills Directory

**Files:**
- Backup: Entire `skills/` directory

**Step 1: Create backup directory**

```bash
mkdir -p /Users/iulian/Code/moralis-api-skills/.backup/before-consolidation
```

**Step 2: Copy skills to backup**

```bash
cp -r /Users/iulian/Code/moralis-api-skills/skills /Users/iulian/Code/moralis-api-skills/.backup/before-consolidation/
```

**Step 3: Verify backup exists**

Run: `ls -la /Users/iulian/Code/moralis-api-skills/.backup/before-consolidation/skills/`
Expected: List of all 9 skill directories

**Step 4: Commit backup**

```bash
git add .backup/
git commit -m "backup: before consolidating 9 skills into 2"
```

---

## Task 2: Create New Skill Directories

**Files:**
- Create: `skills/moralis-data-api/`
- Create: `skills/moralis-streams-api/`

**Step 1: Create new directories**

```bash
mkdir -p /Users/iulian/Code/moralis-api-skills/skills/moralis-data-api/rules
mkdir -p /Users/iulian/Code/moralis-api-skills/skills/moralis-data-api/rules/{wallet,token,nft,defi,entity,price,blockchain}
mkdir -p /Users/iulian/Code/moralis-api-skills/skills/moralis-streams-api/rules
```

**Step 2: Verify directories created**

Run: `ls -la /Users/iulian/Code/moralis-api-skills/skills/ | grep moralis`
Expected: `moralis-data-api/` and `moralis-streams-api/`

**Step 3: Commit**

```bash
git add skills/
git commit -m "feat: create consolidated skill directories"
```

---

## Task 3: Copy Query.js Files

**Files:**
- Create: `skills/moralis-data-api/query.js`
- Create: `skills/moralis-streams-api/query.js`

**Step 1: Copy web3-shared/query.js to moralis-data-api**

```bash
cp /Users/iulian/Code/moralis-api-skills/skills/web3-shared/query.js /Users/iulian/Code/moralis-api-skills/skills/moralis-data-api/query.js
```

**Step 2: Copy streams-api/query.js to new location**

```bash
cp /Users/iulian/Code/moralis-api-skills/skills/moralis-streams-api/query.js /Users/iulian/Code/moralis-api-skills/skills/moralis-streams-api/query.js.new
mv /Users/iulian/Code/moralis-api-skills/skills/moralis-streams-api/query.js.new /Users/iulian/Code/moralis-api-skills/skills/moralis-streams-api/query.js.tmp
```

**Step 3: Verify files exist**

Run: `wc -l /Users/iulian/Code/moralis-api-skills/skills/moralis-data-api/query.js /Users/iulian/Code/moralis-api-skills/skills/moralis-streams-api/query.js`
Expected: moralis-data-api/query.js ~960 lines, moralis-streams-api/query.js ~380 lines

**Step 4: Commit**

```bash
git add skills/moralis-data-api/query.js skills/moralis-streams-api/query.js
git commit -m "feat: copy query.js files to consolidated skills"
```

---

## Task 4: Create moralis-data-api SKILL.md

**Files:**
- Create: `skills/moralis-data-api/SKILL.md`

**Step 1: Write SKILL.md**

```markdown
---
name: moralis-data-api
description: Query Web3 blockchain data from Moralis API (wallet, token, NFT, DeFi, entity, price, blockchain endpoints). Auto-detects EVM vs Solana addresses.
license: MIT
compatibility: Requires Node.js (built-in modules only)
metadata:
  version: "3.0.0"
  author: web3-skills
  tags: [web3, blockchain, evm, solana, wallet, token, nft, defi]
context:
  fork: noviulian/moralis-api-skills
  agent: claude-code
allowed-tools:
  - Bash
invocation:
  max-turns: 2
  disable-model: false
---

# Moralis Data API

Unified query client for all Moralis Web3 data endpoints. Auto-detects EVM vs Solana addresses and routes to appropriate API.

## Setup

Run `/moralis-api-key <your_api_key>` before using this skill.

## When to Use This Skill

Use this skill when the user asks about:
- **Wallet data:** balances, tokens, NFTs, transaction history, DeFi positions, profitability
- **Token data:** prices, metadata, pairs, DEX trades, analytics, security scores, sniper detection
- **NFT data:** metadata, transfers, traits, rarity, floor prices
- **DeFi data:** protocol positions, liquidity, exposure
- **Entity data:** labeled addresses (exchanges, funds, protocols, whales)
- **Price data:** token/NFT prices, OHLCV candlesticks
- **Blockchain data:** blocks, transactions, decoded data

⚠️ **NOT for:** Real-time event streaming → Use @moralis-streams-api

## Quick Reference

| Category | See Rules | Endpoints |
|----------|-----------|-----------|
| Wallet | `rules/wallet/` | Balance, tokens, NFTs, history, DeFi, PnL, net worth |
| Token | `rules/token/` | Price, metadata, pairs, swaps, analytics, scores, snipers |
| NFT | `rules/nft/` | Metadata, transfers, traits, rarity, trades, floor price |
| DeFi | `rules/defi/` | Protocol positions, summary |
| Entity | `rules/entity/` | Labeled addresses, categories |
| Price | `rules/price/` | Token/NFT prices, OHLCV data |
| Blockchain | `rules/blockchain/` | Blocks, transactions, decoded data |

## Common Pitfalls

- **Native balance:** Use `/:address/balance`, NOT `/wallets/:address/balance`
- **Chain IDs:** Use hex (0x1, 0x89) to save API tokens, not names (eth, polygon)
- **Path parameters:** `:address` in endpoint is auto-replaced by query client
- **EVM vs Solana:** Auto-detected from address format (0x vs base58)

## Query Examples

```bash
# EVM wallet balance
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/:address/balance', { address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' }).then(console.log)"

# Solana wallet balance
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/:address/balance', { address: '742d35Cc6638C13C' }).then(console.log)"
```

## Advanced Features

- **Date to block:** `dateToBlock(date, chain)` - Convert timestamp to block number
- **Token search:** `searchToken(query, chain)` - Find tokens by symbol
- **Pagination:** `paginate(endpoint, params)` - Cursor-based pagination
- **Spam filter:** `createSpamFilter(options)` - Exclude spam/unverified tokens
- **Verified filter:** `createVerifiedFilter(options)` - Verified contracts only

## Supported Chains

**EVM (40+ chains):** Ethereum, Polygon, BSC, Arbitrum, Optimism, Base, Avalanche, and more
**Solana:** Mainnet, Devnet

## See Also

- Endpoint reference: See `rules/` subdirectories for detailed endpoint documentation
- Streams API: @moralis-streams-api for real-time events
```

**Step 2: Verify file created**

Run: `wc -l /Users/iulian/Code/moralis-api-skills/skills/moralis-data-api/SKILL.md`
Expected: ~65 lines

**Step 3: Commit**

```bash
git add skills/moralis-data-api/SKILL.md
git commit -m "feat: create moralis-data-api SKILL.md"
```

---

## Task 5: Create moralis-streams-api SKILL.md

**Files:**
- Create: `skills/moralis-streams-api/SKILL.md`

**Step 1: Write SKILL.md**

```markdown
---
name: moralis-streams-api
description: Real-time blockchain event monitoring with webhooks. Create streams to monitor transactions, logs, token transfers, NFT transfers, and internal transactions.
license: MIT
compatibility: Requires Node.js (built-in modules only)
metadata:
  version: "3.0.0"
  author: web3-skills
  tags: [web3, blockchain, streaming, webhooks, events, realtime]
context:
  fork: noviulian/moralis-api-skills
  agent: claude-code
allowed-tools:
  - Bash
invocation:
  max-turns: 2
  disable-model: false
---

# Moralis Streams API

Real-time blockchain event monitoring with webhook delivery. Monitor transactions, logs, token transfers, NFT transfers, and internal transactions across EVM chains.

## Setup

Run `/moralis-api-key <your_api_key>` before using this skill.

## When to Use This Skill

Use this skill when the user asks about:
- **Real-time monitoring:** Track blockchain events as they happen
- **Webhooks:** Set up event streaming to your server
- **Stream management:** Create, update, delete, pause/resume streams
- **Address monitoring:** Add/remove addresses from streams
- **Historical delivery:** Replay past blockchain events
- **Stream analytics:** Get stream statistics and history

⚠️ **NOT for:** Querying current blockchain state → Use @moralis-data-api

## Quick Reference

| Category | See Rules | Endpoints |
|----------|-----------|-----------|
| Stream Management | `rules/stream_management.md` | Create, update, delete, get, duplicate streams |
| Address Management | `rules/address_management.md` | Add/remove addresses from streams |
| Event Types | `rules/event_types.md` | Tx, logs, ERC20, NFT, internal tx |

## Stream Types

- `tx` - Native transactions
- `log` - Contract event logs
- `erc20transfer` - ERC20 token transfers
- `erc20approval` - ERC20 approvals
- `nfttransfer` - NFT transfers
- `internalTx` - Internal transactions

## Common Pitfalls

- **Different API:** Streams uses `api.moralis-streams.com`, NOT `deep-index.moralis.io`
- **Limit required:** GET `/streams/evm` requires `limit` parameter (max 100)
- **Stream IDs:** UUIDs, not hex strings
- **HTTP methods:** PUT for create, POST for update, DELETE for delete

## Query Examples

```bash
# List all streams
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/streams/evm', { limit: 100 }).then(console.log)"

# Create a new stream
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/streams/evm', { method: 'PUT', body: { webhookUrl: 'https://...', chainIds: ['0x1'] } }).then(console.log)"
```

## See Also

- Endpoint reference: See `rules/` for detailed endpoint documentation
- Data API: @moralis-data-api for querying current blockchain state
```

**Step 2: Verify file created**

Run: `wc -l /Users/iulian/Code/moralis-api-skills/skills/moralis-streams-api/SKILL.md`
Expected: ~60 lines

**Step 3: Commit**

```bash
git add skills/moralis-streams-api/SKILL.md
git commit -m "feat: create moralis-streams-api SKILL.md"
```

---

## Task 6: Create Wallet Rules Files

**Files:**
- Create: `skills/moralis-data-api/rules/wallet/balance.md`
- Create: `skills/moralis-data-api/rules/wallet/tokens.md`
- Create: `skills/moralis-data-api/rules/wallet/nfts.md`
- Create: `skills/moralis-data-api/rules/wallet/history.md`
- Create: `skills/moralis-data-api/rules/wallet/defi.md`
- Create: `skills/moralis-data-api/rules/wallet/net_worth.md`
- Create: `skills/moralis-data-api/rules/wallet/profitability.md`

**Step 1: Create balance.md**

```markdown
# Get Wallet Native Balance

Get the native cryptocurrency balance (ETH, BNB, MATIC, etc.) for an EVM or Solana address.

## Endpoint

- **EVM:** `GET /:address/balance`
- **Solana:** `GET /:address/balance`

## Auto-Detection

EVM addresses (0x prefix, 42 chars) → EVM API
Solana addresses (base58, 32-44 chars) → Solana API

## Query Examples

```bash
# EVM
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/:address/balance', { address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' }).then(r => console.log(r.balance))"

# Solana
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/:address/balance', { address: '742d35Cc6638C13C' }).then(r => console.log(r.balance))"
```

## Response

```json
{
  "balance": "1234567890000000000000",
  "address": "0x..."
}
```

## Common Pitfalls

- **Wrong endpoint:** Use `/:address/balance`, NOT `/wallets/:address/balance`
- **Wei format:** Balance is in wei (smallest unit), convert for display

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-wallet-balance
```

**Step 2: Create tokens.md**

```markdown
# Get Wallet Token Holdings

Get all tokens (ERC20, SPL, etc.) held by a wallet address.

## Endpoint

- **EVM:** `GET /wallets/:address/tokens`
- **Solana:** `GET /:address/balance` (native) + `/wallet/:address/tokens` (SPL)

## Query Examples

```bash
# EVM with spam filtering
cd $SKILL_DIR
node -e "const { query, createSpamFilter } = require('./query'); query('/wallets/:address/tokens', { address: '0x...', params: createSpamFilter({ excludeSpam: true, onlyVerified: true }) }).then(console.log)"

# Solana
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/wallet/:address/tokens', { address: '742d35Cc6638C13C', network: 'mainnet' }).then(console.log)"
```

## Spam Filtering

```javascript
const { createSpamFilter } = require('./query');

// Exclude spam and unverified
params: createSpamFilter({ excludeSpam: true, onlyVerified: true })

// Only exclude spam
params: createSpamFilter({ excludeSpam: true })
```

## Pagination

```javascript
const { paginate } = require('./query');
const allTokens = await paginate('/wallets/:address/tokens', { address: '0x...' });
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-wallet-token-balances
```

**Step 3: Create nfts.md**

```markdown
# Get Wallet NFT Holdings

Get all NFTs held by a wallet address.

## Endpoint

- **EVM:** `GET /:address/nft`
- **Solana:** Limited support, use token holdings endpoint

## Query Examples

```bash
# EVM with pagination
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/:address/nft', { address: '0x...', limit: 100, cursor: '...' }).then(console.log)"

# Get specific NFT
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/:address/nft/:tokenId', { address: '0x...', tokenId: '1', token_address: '0x...' }).then(console.log)"
```

## Collections

```bash
# Grouped by collection
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/:address/nft/collections', { address: '0x...' }).then(console.log)"
```

## Verified Filtering

```javascript
const { createVerifiedFilter } = require('./query');
params: createVerifiedFilter({ onlyVerified: true })
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-contract-nfts
```

**Step 4: Create history.md**

```markdown
# Get Wallet Transaction History

Get complete transaction history for a wallet (native, token, NFT, internal transactions).

## Endpoint

- **EVM:** `GET /wallets/:address/history`

## Query Examples

```bash
# All history
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/wallets/:address/history', { address: '0x...', limit: 100 }).then(console.log)"

# Filtered by operation type
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/wallets/:address/history', { address: '0x...', operation_type: 'token_transfer' }).then(console.log)"
```

## Operation Types

- `token_transfer` - Token transfers
- `contract_interaction` - Contract calls
- `native` - Native transfers
- `nft_transfer` - NFT transfers

## Cursor Pagination

```javascript
const { paginate } = require('./query');
const allHistory = await paginate('/wallets/:address/history', { address: '0x...' });
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-wallet-history
```

**Step 5: Create defi.md**

```markdown
# Get Wallet DeFi Positions

Get DeFi protocol positions and exposure for a wallet.

## Endpoint

- **EVM:** `GET /wallets/:address/defi/summary` or `/wallets/:address/defi/positions`

## Query Examples

```bash
# DeFi summary
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/wallets/:address/defi/summary', { address: '0x...' }).then(console.log)"

# Detailed positions
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/wallets/:address/defi/positions', { address: '0x...' }).then(console.log)"

# Protocol-specific
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/wallets/:address/defi/:protocol/positions', { address: '0x...', protocol: 'uniswap_v3' }).then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-wallet-defi-summary
```

**Step 6: Create net_worth.md**

```markdown
# Get Wallet Net Worth

Get total net worth across all chains for a wallet.

## Endpoint

- **EVM:** `GET /wallets/:address/net-worth`

## Query Examples

```bash
# Net worth in USD
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/wallets/:address/net-worth', { address: '0x...' }).then(r => console.log(r.total_networth_usd))"

# Exclude specific chains
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/wallets/:address/net-worth', { address: '0x...', exclude_chains: ['0x38'] }).then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-wallet-net-worth
```

**Step 7: Create profitability.md**

```markdown
# Get Wallet Profitability

Get profit/loss data for a wallet.

## Endpoint

- **EVM:** `GET /wallets/:address/profitability`

## Query Examples

```bash
# Overall profitability
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/wallets/:address/profitability', { address: '0x...' }).then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-wallet-profitability
```

**Step 8: Verify files created**

Run: `ls -la /Users/iulian/Code/moralis-api-skills/skills/moralis-data-api/rules/wallet/`
Expected: 7 .md files

**Step 9: Commit**

```bash
git add skills/moralis-data-api/rules/wallet/
git commit -m "feat: add wallet rules files"
```

---

## Task 7: Create Token Rules Files

**Files:**
- Create: `skills/moralis-data-api/rules/token/price.md`
- Create: `skills/moralis-data-api/rules/token/metadata.md`
- Create: `skills/moralis-data-api/rules/token/pairs.md`
- Create: `skills/moralis-data-api/rules/token/swaps.md`
- Create: `skills/moralis-data-api/rules/token/analytics.md`
- Create: `skills/moralis-data-api/rules/token/security_score.md`
- Create: `skills/moralis-data-api/rules/token/sniper.md`

**Step 1: Create price.md**

```markdown
# Get Token Price

Get current price for a token (ERC20, SPL).

## Endpoint

- **EVM:** `GET /erc20/:address/price`
- **Solana:** `GET /token/:network/prices`

## Query Examples

```bash
# EVM token price
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/erc20/:address/price', { address: '0x...' }).then(r => console.log(r.usdPrice))"

# Multiple tokens
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/erc20/prices', { addresses: ['0x...', '0x...'] }).then(console.log)"

# Solana
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/token/mainnet/prices', { network: 'mainnet', include: 'usd' }).then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/erc20-get-price
```

**Step 2: Create metadata.md**

```markdown
# Get Token Metadata

Get token metadata (name, symbol, decimals, logo, etc.).

## Endpoint

- **EVM:** `GET /erc20/metadata`
- **Solana:** Use token search endpoint

## Query Examples

```bash
# By token address
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/erc20/metadata', { addresses: ['0x...'] }).then(console.log)"

# Token search
cd $SKILL_DIR
node -e "const { query, searchToken } = require('./query'); searchToken('USDC', 'eth').then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/erc20-get-metadata
```

**Step 3: Create pairs.md**

```markdown
# Get Token Pairs

Get DEX liquidity pairs for a token.

## Endpoint

- **EVM:** `GET /erc20/:address/pairs`

## Query Examples

```bash
# Get pairs
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/erc20/:address/pairs', { address: '0x...', exchange: 'uniswap_v2' }).then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/erc20-get-pairs
```

**Step 4: Create swaps.md**

```markdown
# Get Token Swaps

Get DEX swap trades for a token or wallet.

## Endpoint

- **By token:** `GET /erc20/:address/swaps`
- **By wallet:** `GET /wallets/:address/swaps`
- **By pair:** `GET /pairs/:address/swaps`

## Query Examples

```bash
# Token swaps
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/erc20/:address/swaps', { address: '0x...' }).then(console.log)"

# Wallet swaps
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/wallets/:address/swaps', { address: '0x...' }).then(console.log)"

# Pair swaps
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/pairs/:address/swaps', { address: '0x...' }).then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/erc20-get-token-swaps
```

**Step 5: Create analytics.md**

```markdown
# Get Token Analytics

Get token analytics data (volume, holders, timeseries).

## Endpoint

- **EVM:** `GET /tokens/:address/analytics`
- **Volume timeseries:** `GET /volume/timeseries`

## Query Examples

```bash
# Token analytics
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/tokens/:address/analytics', { address: '0x...' }).then(console.log)"

# Volume timeseries
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/volume/timeseries', { token_address: '0x...' }).then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-token-analytics
```

**Step 6: Create security_score.md**

```markdown
# Get Token Security Score

Get security/trust score for a token.

## Endpoint

- **EVM:** `GET /tokens/:address/score`

## Query Examples

```bash
# Security score
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/tokens/:address/score', { address: '0x...' }).then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-token-price
```

**Step 7: Create sniper.md**

```markdown
# Get Sniper Detection

Detect early buyers (snipers) for a token pair.

## Endpoint

- **EVM:** `GET /pairs/:address/snipers`

## Query Examples

```bash
# Get snipers
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/pairs/:address/snipers', { address: '0x...' }).then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-token-snipers
```

**Step 8: Verify files created**

Run: `ls -la /Users/iulian/Code/moralis-api-skills/skills/moralis-data-api/rules/token/`
Expected: 7 .md files

**Step 9: Commit**

```bash
git add skills/moralis-data-api/rules/token/
git commit -m "feat: add token rules files"
```

---

## Task 8: Create NFT Rules Files

**Files:**
- Create: `skills/moralis-data-api/rules/nft/metadata.md`
- Create: `skills/moralis-data-api/rules/nft/transfers.md`
- Create: `skills/moralis-data-api/rules/nft/traits.md`
- Create: `skills/moralis-data-api/rules/nft/rarity.md`

**Step 1: Create metadata.md**

```markdown
# Get NFT Metadata

Get NFT contract metadata and individual NFT data.

## Endpoint

- **Contract:** `GET /nft/:address`
- **Specific NFT:** `GET /nft/:address/:tokenId`
- **Owners:** `GET /nft/:address/owners`

## Query Examples

```bash
# Contract metadata
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/nft/:address', { address: '0x...' }).then(console.log)"

# Specific NFT
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/nft/:address/:tokenId', { address: '0x...', tokenId: '1' }).then(console.log)"

# NFT owners
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/nft/:address/owners', { address: '0x...' }).then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-nft-metadata
```

**Step 2: Create transfers.md**

```markdown
# Get NFT Transfers

Get NFT transfer events.

## Endpoint

- **Contract transfers:** `GET /nft/:address/transfers`
- **Wallet NFT transfers:** Use wallet history endpoint

## Query Examples

```bash
# Contract transfers
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/nft/:address/transfers', { address: '0x...' }).then(console.log)"

# With pagination
cd $SKILL_DIR
node -e "const { query, paginate } = require('./query'); paginate('/nft/:address/transfers', { address: '0x...' }).then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-nft-transfers
```

**Step 3: Create traits.md**

```markdown
# Get NFT Traits

Get trait distribution for an NFT collection.

## Endpoint

- **Traits:** `GET /nft/:address/traits`

## Query Examples

```bash
# Get traits
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/nft/:address/traits', { address: '0x...' }).then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-nft-traits
```

**Step 4: Create rarity.md**

```markdown
# Get NFT Rarity

Get rarity data for NFTs in a collection.

## Endpoint

- **Trades:** `GET /nft/:address/trades`

## Query Examples

```bash
# Get trades (for rarity calculation)
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/nft/:address/trades', { address: '0x...' }).then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-nft-trades
```

**Step 5: Verify files created**

Run: `ls -la /Users/iulian/Code/moralis-api-skills/skills/moralis-data-api/rules/nft/`
Expected: 4 .md files

**Step 6: Commit**

```bash
git add skills/moralis-data-api/rules/nft/
git commit -m "feat: add nft rules files"
```

---

## Task 9: Create DeFi, Entity, Price, Blockchain Rules Files

**Files:**
- Create: `skills/moralis-data-api/rules/defi/positions.md`
- Create: `skills/moralis-data-api/rules/entity/labels.md`
- Create: `skills/moralis-data-api/rules/price/token_price.md`
- Create: `skills/moralis-data-api/rules/price/nft_floor_price.md`
- Create: `skills/moralis-data-api/rules/blockchain/block.md`
- Create: `skills/moralis-data-api/rules/blockchain/transaction.md`

**Step 1: Create defi/positions.md**

```markdown
# Get DeFi Protocol Positions

Get detailed positions for specific DeFi protocols.

## Endpoint

- **Summary:** `GET /wallets/:address/defi/summary`
- **Positions:** `GET /wallets/:address/defi/positions`
- **Protocol-specific:** `GET /wallets/:address/defi/:protocol/positions`

## Query Examples

```bash
# All positions
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/wallets/:address/defi/positions', { address: '0x...' }).then(console.log)"

# Protocol-specific
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/wallets/:address/defi/:protocol/positions', { address: '0x...', protocol: 'uniswap_v3' }).then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-wallet-defi-positions
```

**Step 2: Create entity/labels.md**

```markdown
# Get Entity Labels

Get labeled entities (exchanges, funds, protocols, whales).

## Endpoint

- **Search:** `GET /entities/search`
- **Categories:** `GET /entities/categories`
- **By category:** `GET /entities/categories/:categoryId`
- **By ID:** `GET /entities/:entityId`

## Query Examples

```bash
# Search entities
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/entities/search', { query: 'binance' }).then(console.log)"

# Get categories
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/entities/categories').then(console.log)"

# Get entity by ID
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/entities/:entityId', { entityId: '...' }).then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-entity-labels
```

**Step 3: Create price/token_price.md**

```markdown
# Get Token Prices (Price API)

Get prices for multiple tokens, OHLCV data.

## Endpoint

- **Multiple prices:** `GET /erc20/prices`
- **OHLCV:** `GET /pairs/:address/ohlcv`

## Query Examples

```bash
# Multiple tokens
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/erc20/prices', { addresses: ['0x...', '0x...'] }).then(console.log)"

# OHLCV candlesticks
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/pairs/:address/ohlcv', { address: '0x...', timeframe: '1h', limit: 100 }).then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-token-price
```

**Step 4: Create price/nft_floor_price.md**

```markdown
# Get NFT Floor Price

Get floor price for NFT collections.

## Endpoint

- **Floor price:** `GET /nft/:address/floor-price`
- **Historical:** `GET /nft/:address/floor-price/historical`
- **Sale prices:** `GET /nft/:address/price`

## Query Examples

```bash
# Current floor price
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/nft/:address/floor-price', { address: '0x...' }).then(r => console.log(r.floor_price))"

# Historical floor price
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/nft/:address/floor-price/historical', { address: '0x...', limit: 100 }).then(console.log)"

# NFT sale prices
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/nft/:address/price', { address: '0x...' }).then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-nft-floor-price
```

**Step 5: Create blockchain/block.md**

```markdown
# Get Block Data

Get block information by number or hash.

## Endpoint

- **By number/hash:** `GET /block/:blockNumberOrHash`
- **Date to block:** `GET /dateToBlock`
- **Latest:** `GET /latestBlockNumber/:chain`

## Query Examples

```bash
# Get block
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/block/:blockNumberOrHash', { blockNumberOrHash: '0x...' }).then(console.log)"

# Date to block
cd $SKILL_DIR
node -e "const { query, dateToBlock } = require('./query'); dateToBlock('2024-01-01', 'eth').then(console.log)"

# Latest block
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/latestBlockNumber/:chain', { chain: 'eth' }).then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-block-by-date
```

**Step 6: Create blockchain/transaction.md**

```markdown
# Get Transaction Data

Get transaction details, decoded transactions.

## Endpoint

- **Transaction:** `GET /transaction/:transactionHash`
- **Decoded:** `GET /transaction/:transactionHash/verbose`

## Query Examples

```bash
# Get transaction
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/transaction/:transactionHash', { transactionHash: '0x...' }).then(console.log)"

# Decoded transaction
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/transaction/:transactionHash/verbose', { transactionHash: '0x...' }).then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-transaction-by-hash
```

**Step 7: Verify files created**

Run: `find /Users/iulian/Code/moralis-api-skills/skills/moralis-data-api/rules -name "*.md" | wc -l`
Expected: 17 .md files

**Step 8: Commit**

```bash
git add skills/moralis-data-api/rules/defi/ skills/moralis-data-api/rules/entity/ skills/moralis-data-api/rules/price/ skills/moralis-data-api/rules/blockchain/
git commit -m "feat: add defi, entity, price, blockchain rules files"
```

---

## Task 10: Create Streams Rules Files

**Files:**
- Create: `skills/moralis-streams-api/rules/stream_management.md`
- Create: `skills/moralis-streams-api/rules/address_management.md`
- Create: `skills/moralis-streams-api/rules/event_types.md`

**Step 1: Create stream_management.md**

```markdown
# Stream Management

Create, update, delete, and manage streams.

## Endpoints

- **List streams:** `GET /streams/evm`
- **Create stream:** `PUT /streams/evm`
- **Update stream:** `POST /streams/evm`
- **Get stream:** `GET /streams/evm/:id`
- **Delete stream:** `DELETE /streams/evm/:id`
- **Duplicate stream:** `POST /streams/evm/:id/duplicate`
- **Update status:** `POST /streams/evm/:id/status`

## Query Examples

```bash
# List streams
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/streams/evm', { limit: 100 }).then(console.log)"

# Create stream
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/streams/evm', { method: 'PUT', body: { webhookUrl: 'https://...', chainIds: ['0x1'], description: 'My stream' } }).then(console.log)"

# Get stream details
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/streams/evm/:id', { id: 'uuid-here' }).then(console.log)"

# Delete stream
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/streams/evm/:id', { method: 'DELETE', id: 'uuid-here' }).then(console.log)"

# Pause stream
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/streams/evm/:id/status', { method: 'POST', id: 'uuid-here', body: { status: 'paused' } }).then(console.log)"
```

## Common Pitfalls

- **limit required:** GET /streams/evm requires limit parameter (max 100)
- **Stream IDs:** UUIDs, not hex strings
- **PUT vs POST:** PUT for create, POST for update

## API Reference

https://docs.moralis.io/streams
```

**Step 2: Create address_management.md**

```markdown
# Address Management

Add and remove addresses from streams.

## Endpoints

- **Get addresses:** `GET /streams/evm/:id/address`
- **Add address:** `POST /streams/evm/:id/address`
- **Add addresses:** `PATCH /streams/evm/:id/address`
- **Delete address:** `DELETE /streams/evm/:id/address/:address`

## Query Examples

```bash
# Get all addresses
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/streams/evm/:id/address', { id: 'uuid-here' }).then(console.log)"

# Add single address
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/streams/evm/:id/address', { method: 'POST', id: 'uuid-here', body: { address: '0x...' } }).then(console.log)"

# Add multiple addresses
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/streams/evm/:id/address', { method: 'PATCH', id: 'uuid-here', body: { addresses: ['0x...', '0x...'] } }).then(console.log)"

# Delete address
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/streams/evm/:id/address/:address', { method: 'DELETE', id: 'uuid-here', address: '0x...' }).then(console.log)"
```

## API Reference

https://docs.moralis.io/streams
```

**Step 3: Create event_types.md**

```markdown
# Stream Event Types

Configure which events to track in streams.

## Event Types

- `tx` - Native transactions
- `log` - Contract event logs
- `erc20transfer` - ERC20 token transfers
- `erc20approval` - ERC20 approvals
- `nfttransfer` - NFT transfers
- `internalTx` - Internal transactions

## Query Examples

```bash
# Create stream with specific events
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/streams/evm', { method: 'PUT', body: { webhookUrl: 'https://...', chainIds: ['0x1'], topic0: ['Transfer'], events: ['erc20transfer'] } }).then(console.log)"

# Get stream history
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/history', { limit: 100 }).then(console.log)"

# Replay historical events
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/history/replay/:streamId/:id', { streamId: 'uuid', id: 'event-id' }).then(console.log)"
```

## API Reference

https://docs.moralis.io/streams
```

**Step 4: Verify files created**

Run: `ls -la /Users/iulian/Code/moralis-api-skills/skills/moralis-streams-api/rules/`
Expected: 3 .md files

**Step 5: Commit**

```bash
git add skills/moralis-streams-api/rules/
git commit -m "feat: add streams rules files"
```

---

## Task 11: Update CLAUDE.md Documentation

**Files:**
- Modify: `/Users/iulian/Code/moralis-api-skills/CLAUDE.md:1-150`

**Step 1: Update CLAUDE.md to reflect new structure**

Replace the "Skills included:" section with:

```markdown
**Skills included:**
- **moralis-data-api** - Unified query client for all Web3 data (wallet, token, NFT, DeFi, entity, price, blockchain)
- **moralis-streams-api** - Real-time blockchain event monitoring with webhooks

**v3.0.0:** Consolidated from 9 skills to 2 skills with rules/ folder structure for 70-80% token reduction.
```

Replace the architecture section with:

```markdown
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
```

**Step 2: Verify changes**

Run: `head -100 /Users/iulian/Code/moralis-api-skills/CLAUDE.md`
Expected: Updated v3.0.0 and consolidated structure

**Step 3: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md for v3.0.0 consolidated skills"
```

---

## Task 12: Remove Old Skills Directory

**Files:**
- Delete: All old skill directories (moralis-wallet-api, moralis-token-api, etc.)
- Delete: web3-shared/

**Step 1: Remove old skills (keeping api-key)**

```bash
cd /Users/iulian/Code/moralis-api-skills/skills
rm -rf moralis-wallet-api
rm -rf moralis-token-api
rm -rf moralis-nft-api
rm -rf moralis-defi-api
rm -rf moralis-entity-api
rm -rf moralis-price-api
rm -rf moralis-blockchain-api
rm -rf web3-shared
```

**Step 2: Move streams-api to old location cleanup**

```bash
# Remove old streams-api directory (already migrated)
rm -rf moralis-streams-api/query.js.tmp
```

**Step 3: Verify new structure**

Run: `ls -la /Users/iulian/Code/moralis-api-skills/skills/`
Expected: Only moralis-data-api, moralis-streams-api, moralis-api-key

**Step 4: Commit**

```bash
git add -A
git commit -m "refactor: remove old skills directories, migrate to v3.0.0 structure"
```

---

## Task 13: Update Test Scripts

**Files:**
- Modify: `scripts/test-all-skills.sh`
- Modify: `scripts/test-installation.sh` (if exists)

**Step 1: Update test-all-skills.sh**

Update the skills list:

```bash
#!/bin/bash

echo "Testing Moralis API Skills v3.0.0..."

SKILLS_DIR="./skills"
SKILLS=("moralis-data-api" "moralis-streams-api")

for skill in "${SKILLS[@]}"; do
  echo "Testing $skill..."
  if [ -f "$SKILLS_DIR/$skill/SKILL.md" ] && [ -f "$SKILLS_DIR/$skill/query.js" ]; then
    echo "✓ $skill OK"
  else
    echo "✗ $skill FAILED"
    exit 1
  fi
done

echo "All skills OK!"
```

**Step 2: Verify script works**

Run: `bash scripts/test-all-skills.sh`
Expected: "All skills OK!"

**Step 3: Commit**

```bash
git add scripts/test-all-skills.sh
git commit -m "test: update test scripts for v3.0.0"
```

---

## Task 14: Final Verification and Tagging

**Files:**
- Test: All skills load correctly
- Create: git tag v3.0.0

**Step 1: Run all tests**

```bash
bash scripts/test-all-skills.sh
```

Expected: All skills OK

**Step 2: Verify query.js files work**

```bash
# Test data-api query
cd /Users/iulian/Code/moralis-api-skills/skills/moralis-data-api
node -e "const { query } = require('./query'); console.log('Data API query loaded successfully')"

# Test streams-api query
cd /Users/iulian/Code/moralis-api-skills/skills/moralis-streams-api
node -e "const { query } = require('./query'); console.log('Streams API query loaded successfully')"
```

Expected: Success messages

**Step 3: Count lines (verify token reduction)**

```bash
echo "=== SKILL.md Line Counts ==="
wc -l /Users/iulian/Code/moralis-api-skills/skills/moralis-data-api/SKILL.md
wc -l /Users/iulian/Code/moralis-api-skills/skills/moralis-streams-api/SKILL.md

echo "=== Total Rules Files ==="
find /Users/iulian/Code/moralis-api-skills/skills/moralis-data-api/rules -name "*.md" | wc -l
find /Users/iulian/Code/moralis-api-skills/skills/moralis-streams-api/rules -name "*.md" | wc -l
```

Expected:
- moralis-data-api/SKILL.md: ~60-70 lines
- moralis-streams-api/SKILL.md: ~60 lines
- Total rules: 20 files

**Step 4: Create git tag**

```bash
git tag -a v3.0.0 -m "Consolidate 9 skills into 2 with rules/ folder structure - 70-80% token reduction"
git push origin v3.0.0
```

**Step 5: Final commit**

```bash
git commit --allow-empty -m "release: v3.0.0 - consolidated skills"
```

---

## Success Criteria

After completion, verify:

- [ ] Only 3 skills exist: moralis-data-api, moralis-streams-api, moralis-api-key
- [ ] Each skill has SKILL.md (~60 lines) + query.js + rules/ folder
- [ ] moralis-data-api has 7 rule subdirectories (wallet, token, nft, defi, entity, price, blockchain)
- [ ] moralis-streams-api has 3 rule files
- [ ] All tests pass
- [ ] Git tag v3.0.0 created
- [ ] Token reduction: ~70-80% compared to v2.0.0

## Rollback Plan

If something goes wrong:

```bash
# Restore from backup
rm -rf /Users/iulian/Code/moralis-api-skills/skills
cp -r /Users/iulian/Code/moralis-api-skills/.backup/before-consolidation/skills /Users/iulian/Code/moralis-api-skills/

# Reset to pre-consolidation commit
git reset --hard <commit-hash-before-consolidation>
```
