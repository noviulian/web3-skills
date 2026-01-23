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

## When to Use This Skill

Use this skill when the user asks about:

**Token Prices:**
- "What's the price of ETH/BNB/MATIC?", "Native token price", "Gas token price"
- "Token price", "How much is this token worth", "Current price"
- "Multiple token prices", "Batch prices", "Price of these tokens"

**Price History & Charts:**
- "Price history", "Historical prices", "Past prices", "Price over time"
- "Price chart", "Candlesticks", "OHLCV data", "Trading data"
- "Price at specific date", "Historical price data"

**NFT Prices:**
- "Floor price", "NFT floor price", "Lowest price", "Collection floor"
- "NFT sales prices", "Recent sales", "Sale history"
- "NFT price history", "Historical floor prices"

**DEX Prices:**
- "Pair price", "DEX price", "Liquidity pool price"
- "Trading pair price", "Pool price"

**Market Data:**
- "All native prices", "Network prices", "Chain prices"
- "Price statistics", "Market data", "Price analytics"

**⚠️ NOT for:**
- Token metadata/contract info → Use `web3-token-api`
- Wallet token holdings with prices → Use `web3-wallet-api` with `/wallets/:address/tokens`
- NFT metadata with price → Use `web3-nft-api`
- Token swaps/trades → Use `web3-token-api`

## Common Pitfalls

### Confusion: Token Price vs Token Metadata
- **Price only:** Use this skill (`web3-price-api`) with `/erc20/:address/price`
- **Metadata + price:** Use `web3-token-api` with `/erc20/metadata` (includes price)

### Confusion: NFT Floor Price vs NFT Metadata
- **Floor price only:** Use this skill (`web3-price-api`) with `/nft/:address/lowestprice`
- **NFT metadata + traits:** Use `web3-nft-api` with `/nft/:address`

### Confusion: Price History vs Token Swaps
- **Historical price data:** Use this skill (`web3-price-api`) with `/erc20/:address/price/history`
- **Swap/trade history:** Use `web3-token-api` with `/erc20/:address/swaps`

### Confusion: OHLCV Candlesticks vs Price History
- **OHLCV candlesticks (charting):** Use this skill (`web3-price-api`) with `/erc20/:address/price/candlesticks`
- **Simple price history:** Use this skill (`web3-price-api`) with `/erc20/:address/price/history`

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
