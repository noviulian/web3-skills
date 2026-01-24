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
