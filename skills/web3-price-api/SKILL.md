---
name: web3-price-api
description: Query token and NFT prices including current prices, historical data, OHLCV candlesticks, floor prices, and sale prices for both EVM chains and Solana. Get native token prices, ERC20 prices, NFT floor prices, and price history. Use when user asks about prices, market data, or valuations.
license: MIT
compatibility: Requires Node.js (built-in modules only, no npm install needed)
metadata:
  version: "1.0.0"
  author: web3-skills
  tags: [web3, blockchain, price, market, trading, evm, solana]
---

# Web3 Price API

Query token and NFT prices for both EVM chains and Solana including current prices, historical data, and market statistics.

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
query('/token/mainnet/7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU/price', {})
  .then(data => console.log('Price:', data.usdPrice, 'USD'))
  .catch(console.error);
"
```

### Get Native Token Price

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/price/:network', {
  params: { network: 'eth' }
})
  .then(data => console.log('ETH Price:', data.usdPrice, 'USD'))
  .catch(console.error);
"
```

**Supported networks:** eth, polygon, bsc, arbitrum, optimism, avalanche, fantom, etc.

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

### Get Token Pair Price (DEX)

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/pairs/:address/price', {
  address: '0x1234...',
  params: { chain: 'eth' }
})
  .then(data => console.log('Pair Price:', JSON.stringify(data, null, 2)))
  .catch(console.error);
"
```

### Get OHLCV Candlesticks

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/erc20/:address/price/candlesticks', {
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  params: { chain: 'eth', timeframe: '1d', limit: 30 }
})
  .then(data => console.log('Candlesticks:', data.result?.length || 0))
  .catch(console.error);
"
```

**Timeframes:** `1m`, `5m`, `15m`, `1h`, `4h`, `1d`, `1w`

### Get NFT Floor Price

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/nft/:address/lowestprice', {
  address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
  params: { chain: 'eth' }
})
  .then(data => console.log('Floor Price:', JSON.stringify(data, null, 2)))
  .catch(console.error);
"
```

### Get NFT Sale Prices

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/nft/:address/sales', {
  address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
  params: { chain: 'eth', limit: 10 }
})
  .then(data => console.log('Sales:', data.result?.length || 0))
  .catch(console.error);
"
```

### Get Historical NFT Floor Price

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/nft/:address/price/history', {
  address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
  params: { chain: 'eth', from: '2024-01-01', to: '2024-01-31' }
})
  .then(data => console.log('History:', data.result?.length || 0))
  .catch(console.error);
"
```

### Get Token Price History

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/erc20/:address/price/history', {
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  params: { chain: 'eth', from: '2024-01-01', to: '2024-01-31', interval: '1d' }
})
  .then(data => console.log('History:', data.result?.length || 0))
  .catch(console.error);
"
```

**Intervals:** `1m`, `5m`, `15m`, `1h`, `4h`, `1d`, `1w`

### Get All Native Prices

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/price')
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(console.error);
"
```

## Response Format

```json
{
  "usdPrice": 1.00,
  "tokenName": "USD Coin",
  "tokenSymbol": "USDC",
  "tokenDecimals": 6,
  "exchangeAddress": "0x...",
  "exchangeName": "Uniswap v2"
}
```

## Supported Native Tokens

- **ETH** - Ethereum
- **MATIC** - Polygon
- **BNB** - Binance Smart Chain
- **ARB** - Arbitrum
- **OP** - Optimism
- **AVAX** - Avalanche
- **FTM** - Fantom
- And more...

## See Also

- [EVM Endpoints Reference](references/EVM_ENDPOINTPOINTS.md)
- [Solana Endpoints Reference](references/SOLANA_ENDPOINTPOINTS.md)
