---
name: moralis-token-api
description: Query token data including prices, metadata, DEX pairs, swaps, analytics, security scores, sniper detection, volume timeseries, and advanced analytics for both EVM chains and Solana. Get token prices, search tokens, view trading pairs, track Pump.fun tokens, assess token security, detect snipers, and analyze token activity. Use when user asks about token prices, metadata, swaps, DEX data, analytics, or security.
license: MIT
compatibility: Requires Node.js (built-in modules only, no npm install needed)
metadata:
  version: "2.0.0"
  author: noviulian
  tags: [web3, blockchain, token, price, dex, swap, analytics, security, sniper, evm, solana]
  context:
    fork: false
    agent: ""
  allowed-tools:
    - Bash
    - Read
  invocation:
    disable-model-invocation: false
    user-invocable: true
---

# Web3 Token API

Query token data for both EVM chains and Solana including prices, metadata, DEX pairs, swaps, analytics, security scores, sniper detection, and volume timeseries.

## When to Use This Skill

Use this skill when the user asks about:

**Token Prices & Metadata:**
- "What's the price of this token?", "Token price", "How much is this worth?"
- "Token metadata", "Token info", "Token details", "Token symbol/decimals"
- "Multiple token prices", "Price of these tokens"

**DEX & Trading Data:**
- "Trading pairs", "DEX pairs", "Where is this token traded?"
- "Token swaps", "Swap history", "Trading activity"
- "Liquidity pairs", "Available pairs"

**Token Security & Safety:**
- "Token score", "Token trust score", "Is this token safe?"
- "Spam tokens", "Filter spam", "Exclude spam tokens"
- "Verified token", "Is this token verified?"
- "Honeypot tokens", "Scam tokens", "Rug pull detection"
- "Risk assessment", "Token trustworthiness"

**Token Analytics:**
- "Token analytics", "Token statistics", "Historical data"
- "Historical token data", "Token performance over time"
- "Time series analytics", "Volume trends", "Holder analytics"
- "Multiple token analytics", "Batch analytics"

**Sniper Detection:**
- "Token snipers", "Early buyers", "Who bought first?"
- "Sniping activity", "Front-running detection"
- "DEX pair snipers", "Early buyer list"

**Volume & Premium Analytics:**
- "Volume by chain", "Chain volume", "Trading volume"
- "Volume timeseries", "Historical volume data"
- "Advanced token search", "Filter tokens", "Token discovery"

**Solana-Specific:**
- "Pump.fun tokens", "Bonding curve status", "New Solana tokens"

**⚠️ NOT for:**
- Wallet token holdings (portfolio view) → Use `web3-wallet-api`
- NFT prices/metadata → Use `web3-nft-api` or `web3-price-api`
- Native token prices (ETH, BNB) → Use `web3-price-api`
- Historical price charts/candlesticks → Use `web3-price-api`
- Real-time event monitoring → Use `web3-streams-api`

## Common Pitfalls

### Token Price vs Wallet Token Holdings
- **Individual token price:** Use this skill with `/erc20/:address/price`
- **All tokens in a wallet:** Use `web3-wallet-api` with `/wallets/:address/tokens`

### Analytics vs Basic Token Data
- **Advanced analytics (timeseries, volume, holder stats):** Use analytics endpoints
- **Basic price/metadata:** Use standard token endpoints

### Score vs Price
- **Token security score:** Use `/tokens/:tokenAddress/score`
- **Token price:** Use `/erc20/:address/price`

### Sniper Detection vs Price Data
- **Sniper detection:** Use `/pairs/:address/snipers` (DEX pair address required)
- **Price data:** Use `/erc20/:address/price` (token address)

### Premium vs Standard Search
- **Advanced filtered search:** Use `/tokens/search` or `/discovery/tokens`
- **Basic search:** Use `/erc20/search`

### Sniper Window
- **Default:** 3 blocks after pair creation (very early buyers)
- **Wider window:** Increase `blocksAfterCreation` (up to 1000 blocks)

### When to Use Premium Endpoints
- **Premium endpoints** have higher API costs
- Use standard endpoints first unless you need advanced filtering/analytics

## Setup

```bash
/moralis-api-key
```

## Common Queries

### Get Token Price

**EVM:**
```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/erc20/:address/price', { address: '0x6B175474E89094C44Da98b954EedeAC495271d0F' })
  .then(data => console.log('Price:', data.usdPrice, 'USD'))
  .catch(console.error);
"
```

**Solana:**
```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/token/:network/:address/price', {
  address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
  network: 'mainnet'
})
  .then(data => console.log('Price:', data.usdPrice, 'USD'))
  .catch(console.error);
"
```

### Get Token Security Score

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/tokens/:tokenAddress/score', {
  tokenAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F'
})
  .then(data => console.log('Score:', data.score, 'Risk:', data.risk))
  .catch(console.error);
"
```

**Score interpretation:** High = safer/established, Low = potential spam/scam.

### Get Token Snipers

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/pairs/:address/snipers', {
  address: '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc', // DEX pair address
  params: { limit: 10, blocksAfterCreation: 3 }
})
  .then(data => console.log('Snipers:', data.result?.length || 0))
  .catch(console.error);
"
```

**Use for:** Detecting early buyers/sniping activity on new token launches.

### Get Token Analytics

**Single token:**
```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/tokens/:address/analytics', {
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F'
})
  .then(data => console.log('Analytics:', data))
  .catch(console.error);
"
```

**Timeseries:**
```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/tokens/analytics/timeseries', {
  params: { timeframe: '7d' },
  body: { tokens: [{ chain: 'eth', tokenAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F' }] }
})
  .then(data => console.log('Time Series:', data.result))
  .catch(console.error);
"
```

**Multiple tokens (batch):**
```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/tokens/analytics', {
  method: 'POST',
  body: {
    tokens: [
      { chain: 'eth', tokenAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F' },
      { chain: 'eth', tokenAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' }
    ]
  }
})
  .then(data => console.log('Batch:', data.result?.length || 0))
  .catch(console.error);
"
```

### Get Volume Timeseries

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/volume/timeseries', {
  params: { chain: '0x1', from_date: '2024-01-01', to_date: '2024-12-31' }
})
  .then(data => console.log('Volume History:', data.result?.length || 0))
  .catch(console.error);
"
```

### Search Tokens (Advanced)

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/tokens/search', { params: { q: 'bitcoin', limit: 10 }})
  .then(data => console.log('Results:', data.result?.length || 0))
  .catch(console.error);
"
```

### Filter Tokens by Criteria

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/discovery/tokens', { params: { minLiquidity: 100000, limit: 10 }})
  .then(data => console.log('Tokens:', data.result?.length || 0))
  .catch(console.error);
"
```

### Spam Filtering

```bash
cd $SKILL_DIR
node -e "
const { query, createSpamFilter } = require('./query');
query('/wallets/:address/tokens', {
  address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
  params: createSpamFilter({ excludeSpam: true, onlyVerified: true })
})
  .then(data => console.log('Verified:', data.result?.length || 0))
  .catch(console.error);
"
```

### Get Token Pairs

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/erc20/:address/pairs', {
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  params: { chain: 'eth', limit: 10 }
})
  .then(data => console.log('Pairs:', data.result?.length || 0))
  .catch(console.error);
"
```

### Get Token Swaps

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/erc20/:address/swaps', {
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  params: { limit: 10 }
})
  .then(data => console.log('Swaps:', data.result?.length || 0))
  .catch(console.error);
"
```

### Solana Pump.fun Tokens

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/token/:network/exchange/pump/new', { network: 'mainnet' })
  .then(data => console.log('New tokens:', data.result?.length || 0))
  .catch(console.error);
"
```

### Check Bonding Status (EVM)

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/erc20/:address/bondingStatus', {
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F'
})
  .then(data => console.log('Bonding:', data))
  .catch(console.error);
"
```

### Check Pump.fun Bonding Status (Solana)

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/token/:network/:address/bonding-status', {
  address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
  network: 'mainnet'
})
  .then(data => console.log('Is Bonding:', data.bonding))
  .catch(console.error);
"
```

## Best Practices

1. **Always check security scores** before interacting with new tokens
2. **Use spam filters** when querying wallet tokens or NFTs
3. **Combine multiple indicators:** Price, volume, holder count, score
4. **Verify contracts:** Use `onlyVerified` flag for important queries
5. **Check snipers** before buying new tokens on DEX
6. **Use standard endpoints first** - Premium endpoints have higher API costs
7. **Monitor volume trends** for market sentiment analysis
8. **Cross-reference data:** Don't rely on a single metric

## Pagination

Many endpoints support cursor-based pagination. See [Pagination Examples](references/pagination_examples.md) for details.

## Response Format

**Token Price:**
```json
{ "usdPrice": 1.00, "tokenName": "USD Coin", "tokenSymbol": "USDC", "tokenDecimals": 6 }
```

**Token Score:**
```json
{ "token": {"address": "0x...", "name": "Token", "symbol": "SYM"}, "score": 85, "risk": "low" }
```

**Analytics:**
```json
{ "result": [{ "date": "2024-01-01", "value": 12345 }] }
```

## See Also

- [EVM Endpoints Reference](references/evm_endpoints.md)
- [Solana Endpoints Reference](references/solana_endpoints.md)
- [Pagination Examples](references/pagination_examples.md)
