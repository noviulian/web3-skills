---
name: web3-premium
description: Premium endpoints with advanced analytics including volume stats, timeseries data, filtered token search, and multiple token analytics for both EVM and Solana. Use for advanced market analysis and professional data.
tags: [web3, premium, analytics, volume, timeseries]
version: 1.0.0
author: web3-skills
compatibility: Requires Node.js (built-in modules only, no npm install needed)
---

# Web3 Premium API

Premium endpoints with advanced analytics for both EVM and Solana.

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
