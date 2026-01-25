---
name: moralis-data-api
description: Query Web3 blockchain data from Moralis API (wallet, token, NFT, DeFi, entity, price, blockchain endpoints). REST API with curl examples.
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

Query Web3 blockchain data via REST API. Auto-detects EVM vs Solana addresses and routes to appropriate API.

## Setup

Run `/moralis-api-key <your_api_key>` before using this skill.

## Authentication

All requests require the API key header:

```bash
X-API-Key: $MORALIS_API_KEY
```

## Base URLs

| API | Base URL |
|-----|----------|
| **EVM** | `https://deep-index.moralis.io/api/v2.2` |
| **Solana** | `https://solana-gateway.moralis.io` |

## Pagination

Many endpoints support cursor-based pagination:

- **limit**: Number of results per page
- **cursor**: Use the cursor from the previous response to get the next page

Example pagination pattern:
```bash
# First request
curl "https://deep-index.moralis.io/api/v2.2/0x.../nft?limit=100" \
  -H "X-API-Key: $MORALIS_API_KEY"

# Next page (use cursor from response)
curl "https://deep-index.moralis.io/api/v2.2/0x.../nft?limit=100&cursor=<cursor_from_response>" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

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

## Endpoint Rules

Each endpoint has its own rule file with full documentation:

```bash
# EVM endpoints (116 rules)
rules/getWalletNFTs.md
rules/getTokenPrice.md
rules/getWalletTokenBalances.md
# ... and 113 more

# Solana endpoints (24 rules)
rules/getNFTMetadata__solana.md
rules/getTokenPrice__solana.md
rules/balance.md
# ... and 21 more
```

**Note:** `__solana` suffix indicates a Solana-specific endpoint when the same operationId exists in EVM.

## Common Pitfalls

- **Chain IDs:** Use hex (0x1, 0x89) to save API tokens, not names (eth, polygon)
- **Address format:** EVM addresses start with `0x`, Solana addresses are base58
- **Path parameters:** Replace `:address`, `:token_address` etc. with actual values
- **Streams API:** Streams uses `api.moralis-streams.com`, a different base URL

## Example Requests

```bash
# Get NFTs for an EVM wallet
curl "https://deep-index.moralis.io/api/v2.2/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/nft?chain=0x1" \
  -H "X-API-Key: $MORALIS_API_KEY"

# Get token price
curl "https://deep-index.moralis.io/api/v2.2/erc20/0x6B175474E89094C44Da98b954EedeAC495271d0F/price?chain=0x1" \
  -H "X-API-Key: $MORALIS_API_KEY"

# Get wallet token balances
curl "https://deep-index.moralis.io/api/v2.2/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/erc20?chain=0x1" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

## Supported Chains

**EVM (40+ chains):** Ethereum (0x1), Polygon (0x89), BSC (0x38), Arbitrum (0xa4b1), Optimism (0xa), Base (0x2105), Avalanche (0xa86a), and more

**Solana:** Mainnet, Devnet

## See Also

- Endpoint reference: See individual `rules/*.md` files for detailed documentation
- Streams API: @moralis-streams-api for real-time events
