---
name: web3-premium
description: Premium endpoints with advanced analytics including volume stats, timeseries data, filtered token search, and multiple token analytics for both EVM and Solana. Use for advanced market analysis and professional data.
license: MIT
compatibility: Requires Node.js (built-in modules only, no npm install needed)
metadata:
  version: "1.0.0"
  author: web3-skills
  tags: [web3, premium, analytics, volume, timeseries]
---

# Web3 Premium API

Premium endpoints with advanced analytics for both EVM and Solana.

## When to Use This Skill

Use this skill when the user asks about:

**Volume Analytics:**
- "Volume by chain", "Chain volume", "Trading volume"
- "Volume stats", "Volume analytics", "Volume data"

**Timeseries Data:**
- "Volume over time", "Historical volume", "Timeseries data"
- "Volume chart", "Volume history"

**Advanced Token Search:**
- "Search tokens with filters", "Filter tokens", "Token discovery"
- "Tokens by liquidity", "Tokens by market cap"
- "Filtered token search", "Advanced token search"

**Token Analytics:**
- "Multiple token analytics", "Batch analytics", "Token stats"
- "Token statistics", "Advanced token data"

**Wallet Analytics:**
- "Token allocation", "Portfolio allocation", "Wallet token distribution"
- "Wallet analytics", "Advanced wallet data"

**Solana Premium:**
- "Solana token stats", "Solana analytics", "Solana volume"
- "Solana timeseries", "Solana data"

**⚠️ NOT for:**
- Basic token prices → Use `web3-price-api` or `web3-token-api`
- Basic token search → Use `web3-token-api` with `/erc20/search`
- Wallet token holdings → Use `web3-wallet-api` with `/wallets/:address/tokens`
- Simple volume data → Use standard APIs first

## Common Pitfalls

### Confusion: Premium vs Standard Token Search
- **Advanced filtered search:** Use this skill (`web3-premium`) with `/tokens/search` or `/discovery/tokens`
- **Basic search:** Use `web3-token-api` with `/erc20/search`

### Confusion: Premium vs Standard Token Analytics
- **Multiple token analytics (batch):** Use this skill (`web3-premium`) with `/tokens/analytics`
- **Single token price/stats:** Use `web3-price-api` or `web3-token-api`

### Confusion: Premium vs Standard Wallet Data
- **Token allocation (portfolio view):** Use this skill (`web3-premium`) with `/wallets/:address/tokens/allocation`
- **Basic token holdings:** Use `web3-wallet-api` with `/wallets/:address/tokens`

### When to Use Premium Endpoints
- **Premium endpoints** have higher API costs (weights)
- Use standard endpoints first unless you need advanced filtering/analytics
- Premium is for professional use cases requiring advanced data

## Setup

```bash
/web3-api-key
```

## Common Queries

### Get Volume Stats by Chain

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/volume/chains')
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(console.error);
"
```

### Get Timeseries Volume

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/volume/timeseries', { params: { chain: 'eth', timeframe: '1d' }})
  .then(data => console.log('Data points:', data.result?.length || 0))
  .catch(console.error);
"
```

### Search Tokens

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/tokens/search', { params: { q: 'bitcoin', limit: 10 }})
  .then(data => console.log('Results:', data.result?.length || 0))
  .catch(console.error);
"
```

### Get Multiple Token Analytics

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/tokens/analytics', { params: { addresses: '0x...,0x...' }})
  .then(data => console.log('Analytics:', data.result?.length || 0))
  .catch(console.error);
"
```

### Get Filtered Tokens

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/discovery/tokens', { params: { minLiquidity: 100000 }})
  .then(data => console.log('Tokens:', data.result?.length || 0))
  .catch(console.error);
"
```

### Get Token Stats

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/token/:address/stats', {
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  params: { chain: 'eth' }
})
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(console.error);
"
```

### Get Token Allocation

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/wallets/:address/tokens/allocation', {
  address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
})
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(console.error);
"
```

## Solana Premium Endpoints

### Get Solana Token Stats

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/token/mainnet/:address/stats', {
  address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU'
})
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(console.error);
"
```

### Get Solana Timeseries

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/volume/timeseries/solana', { params: { timeframe: '1d' }})
  .then(data => console.log('Data points:', data.result?.length || 0))
  .catch(console.error);
"
```

## See Also

- [EVM Endpoints Reference](references/EVM_ENDPOINTPOINTS.md)
- [Solana Endpoints Reference](references/SOLANA_ENDPOINTPOINTS.md)
