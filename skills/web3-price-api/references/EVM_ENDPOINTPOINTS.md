# EVM Price API Endpoints

## Get Token Price
- **Endpoint:** `GET /erc20/:address/price`
- **Description:** Get current token price in USD
- **Auto-chain:** Yes

## Get Multiple Token Prices
- **Endpoint:** `GET /erc20/prices`
- **Description:** Get prices for multiple tokens
- **Params:** `addresses` (comma-separated)

## Get Native Token Price
- **Endpoint:** `GET /price/:network`
- **Description:** Get native token price (ETH, MATIC, BNB, etc.)
- **Networks:** eth, polygon, bsc, arbitrum, optimism, avalanche, fantom, etc.

## Get All Native Prices
- **Endpoint:** `GET /price`
- **Description:** Get prices for all supported native tokens

## Get Token Pair Price
- **Endpoint:** `GET /pairs/:address/price`
- **Description:** Get price for a DEX pair
- **Params:** `chain`

## Get OHLCV Candlesticks
- **Endpoint:** `GET /erc20/:address/price/candlesticks`
- **Description:** Get OHLCV candlestick data
- **Params:** `chain`, `timeframe`, `limit`, `from`, `to`
- **Timeframes:** 1m, 5m, 15m, 1h, 4h, 1d, 1w

## Get Token Price History
- **Endpoint:** `GET /erc20/:address/price/history`
- **Description:** Get historical price data
- **Params:** `chain`, `from`, `to`, `interval`
- **Intervals:** 1m, 5m, 15m, 1h, 4h, 1d, 1w

## Get NFT Floor Price
- **Endpoint:** `GET /nft/:address/lowestprice`
- **Description:** Get lowest price/floor for NFT collection
- **Params:** `chain`

## Get NFT Sale Prices
- **Endpoint:** `GET /nft/:address/sales`
- **Description:** Get recent NFT sales
- **Params:** `chain`, `limit`, `from`, `to`

## Get Historical NFT Floor Price
- **Endpoint:** `GET /nft/:address/price/history`
- **Description:** Get historical floor price data
- **Params:** `chain`, `from`, `to`

## Get Pair Price History
- **Endpoint:** `GET /pairs/:address/price/history`
- **Description:** Get historical price for DEX pair
- **Params:** `chain`, `from`, `to`, `interval`
