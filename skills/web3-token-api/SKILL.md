---
name: web3-token-api
description: Query token data including prices, metadata, DEX pairs, swaps, and transfers for both EVM chains and Solana. Get token prices, search tokens, view trading pairs, track Pump.fun tokens on Solana, and analyze token activity. Use when user asks about token prices, metadata, swaps, or DEX data.
license: MIT
compatibility: Requires Node.js (built-in modules only, no npm install needed)
metadata:
  version: "1.0.0"
  author: web3-skills
  tags: [web3, blockchain, token, price, dex, swap, evm, solana]
---

# Web3 Token API

Query token data for both EVM chains and Solana including prices, metadata, DEX pairs, swaps, and transfers.

## Setup

```bash
/web3-api-key
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

### Get Multiple Token Prices

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/erc20/prices', {
  params: {
    addresses: '0x6B175474E89094C44Da98b954EedeAC495271d0F,0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
  }
})
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(console.error);
"
```

### Get Token Metadata

**EVM:**
```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/erc20/metadata', {
  params: { addresses: '0x6B175474E89094C44Da98b954EedeAC495271d0F' }
})
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(console.error);
"
```

**Solana:**
```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/token/:network/:address', {
  address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
  network: 'mainnet'
})
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(console.error);
"
```

### Get Token Pairs (DEX)

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

### Get Token Swaps by Address

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

### Get Swaps by Pair Address

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/pairs/:address/swaps', {
  address: '0x1234...',
  params: { limit: 10 }
})
  .then(data => console.log('Swaps:', data.result?.length || 0))
  .catch(console.error);
"
```

### Get Token Owners

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/erc20/:address/owners', {
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  params: { limit: 10 }
})
  .then(data => console.log('Owners:', data.result?.length || 0))
  .catch(console.error);
"
```

### Search Tokens

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/erc20/search', {
  params: { q: 'bitcoin', chain: 'eth' }
})
  .then(data => console.log('Results:', data.result?.length || 0))
  .catch(console.error);
"
```

### Get Trending Tokens

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/trending/tokens', {
  params: { chain: 'eth' }
})
  .then(data => console.log('Trending:', data.result?.length || 0))
  .catch(console.error);
"
```

### Solana Pump.fun Tokens

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/token/:network/pumpfun/active', { network: 'mainnet' })
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(console.error);
"
```

### Check Pump.fun Bonding Status

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/token/:network/:address/pumpfun/isBonding', {
  address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
  network: 'mainnet'
})
  .then(data => console.log('Is Bonding:', data.isBonding))
  .catch(console.error);
"
```

## Solana-Specific Features

### Get SPL Token Holders

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/token/:network/:address/owners', {
  address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
  network: 'mainnet',
  params: { limit: 10 }
})
  .then(data => console.log('Holders:', data.result?.length || 0))
  .catch(console.error);
"
```

### Get Token Transfers (Solana)

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/token/:network/:address/transfers', {
  address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
  network: 'mainnet',
  params: { limit: 10 }
})
  .then(data => console.log('Transfers:', data.result?.length || 0))
  .catch(console.error);
"
```

## Pagination

Many endpoints return paginated results. Use `cursor` and `limit` parameters:

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');

// First page
query('/erc20/:address/transfers', {
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  params: { limit: 100 }
})
  .then(data => {
    console.log('Page 1:', data.result.length, 'transfers');
    console.log('Cursor for next page:', data.cursor);

    // Fetch next page using cursor
    if (data.cursor) {
      return query('/erc20/:address/transfers', {
        address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        params: { limit: 100, cursor: data.cursor }
      });
    }
  })
  .then(data => {
    if (data) console.log('Page 2:', data.result.length, 'transfers');
  })
  .catch(console.error);
"
```

### Automatic Pagination Loop

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');

async function getAllTransfers() {
  let allTransfers = [];
  let cursor = null;

  do {
    const result = await query('/erc20/:address/transfers', {
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      params: { limit: 100, cursor }
    });
    allTransfers.push(...result.result);
    cursor = result.cursor;
  } while (cursor);

  console.log('Total transfers:', allTransfers.length);
  return allTransfers;
}

getAllTransfers().catch(console.error);
"
```

## Response Format

```json
{
  "usdPrice": 1.00,
  "tokenName": "USD Coin",
  "tokenSymbol": "USDC",
  "tokenDecimals": 6
}
```

## See Also

- [EVM Endpoints Reference](references/EVM_ENDPOINTPOINTS.md)
- [Solana Endpoints Reference](references/SOLANA_ENDPOINTPOINTS.md)
