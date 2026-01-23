# EVM Price API Endpoints

## Quick Decision Guide

**User asks about...** → **Use this endpoint**

| User Question | Endpoint | Example |
|---------------|----------|---------|
| "Token price?" | `/erc20/:address/price` | ERC20 price |
| "Multiple token prices?" | `/erc20/prices` | Batch prices |
| "ETH/BNB/MATIC price?" | `/price/:network` | Native token |
| "All native prices?" | `/price` | All networks |
| "DEX pair price?" | `/pairs/:address/price` | Liquidity pool |
| "Price chart/candlesticks?" | `/erc20/:address/price/candlesticks` | OHLCV data |
| "Price history?" | `/erc20/:address/price/history` | Historical prices |
| "NFT floor price?" | `/nft/:address/lowestprice` | Collection floor |
| "NFT sales?" | `/nft/:address/sales` | Recent sales |
| "NFT price history?" | `/nft/:address/price/history` | Floor history |

## Key Endpoint Patterns

- **Token prices:** `/erc20/:address/price*` (current + history)
- **Native tokens:** `/price*` (ETH, BNB, MATIC, etc.)
- **DEX pairs:** `/pairs/:address/price*` (pool prices)
- **NFT prices:** `/nft/:address/*price*` (floor + sales)
- **Charting data:** Use `candlesticks` endpoint for OHLCV, `history` for simple time series

---

## Get Token Price
- **Endpoint:** `GET /erc20/:address/price`
- **Description:** Get current token price in USD
- **Use this endpoint when:** User asks "token price", "how much is this token", "current price", "USD price"
- **Auto-chain:** Yes

## Get Multiple Token Prices
- **Endpoint:** `GET /erc20/prices`
- **Description:** Get prices for multiple tokens
- **Use this endpoint when:** User asks "multiple token prices", "batch prices", "check these tokens", "price list"
- **Params:** `addresses` (comma-separated)

## Get Native Token Price
- **Endpoint:** `GET /price/:network`
- **Description:** Get native token price (ETH, MATIC, BNB, etc.)
- **Use this endpoint when:** User asks "ETH price", "BNB price", "MATIC price", "gas token price", "native token price"
- **Networks:** eth, polygon, bsc, arbitrum, optimism, avalanche, fantom, etc.

## Get All Native Prices
- **Endpoint:** `GET /price`
- **Description:** Get prices for all supported native tokens
- **Use this endpoint when:** User asks "all native prices", "network prices", "all chain prices", "ETH/BNB/MATIC prices"

## Get Token Pair Price
- **Endpoint:** `GET /pairs/:address/price`
- **Description:** Get price for a DEX pair
- **Use this endpoint when:** User asks "pair price", "liquidity pool price", "DEX price", "pool price"
- **Params:** `chain`

## Get OHLCV Candlesticks
- **Endpoint:** `GET /erc20/:address/price/candlesticks`
- **Description:** Get OHLCV candlestick data
- **Use this endpoint when:** User asks "candlesticks", "OHLCV", "price chart", "charting data", "open/high/low/close"
- **Params:** `chain`, `timeframe`, `limit`, `from`, `to`
- **Timeframes:** 1m, 5m, 15m, 1h, 4h, 1d, 1w

## Get Token Price History
- **Endpoint:** `GET /erc20/:address/price/history`
- **Description:** Get historical price data
- **Use this endpoint when:** User asks "price history", "historical prices", "past prices", "price over time"
- **Params:** `chain`, `from`, `to`, `interval`
- **Intervals:** 1m, 5m, 15m, 1h, 4h, 1d, 1w

## Get NFT Floor Price
- **Endpoint:** `GET /nft/:address/lowestprice`
- **Description:** Get lowest price/floor for NFT collection
- **Use this endpoint when:** User asks "floor price", "NFT floor", "lowest price", "collection floor"
- **Params:** `chain`

## Get NFT Sale Prices
- **Endpoint:** `GET /nft/:address/sales`
- **Description:** Get recent NFT sales
- **Use this endpoint when:** User asks "NFT sales", "recent sales", "sale prices", "what did it sell for"
- **Params:** `chain`, `limit`, `from`, `to`

## Get Historical NFT Floor Price
- **Endpoint:** `GET /nft/:address/price/history`
- **Description:** Get historical floor price data
- **Use this endpoint when:** User asks "NFT price history", "historical floor", "floor over time"
- **Params:** `chain`, `from`, `to`

## Get Pair Price History
- **Endpoint:** `GET /pairs/:address/price/history`
- **Description:** Get historical price for DEX pair
- **Use this endpoint when:** User asks "pair price history", "pool price history", "DEX historical price"
- **Params:** `chain`, `from`, `to`, `interval`
