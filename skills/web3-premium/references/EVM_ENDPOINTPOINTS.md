# EVM Premium Endpoints

## Volume Stats
- **Endpoint:** `GET /volume/chains`
- **Description:** Get trading volume by chain

## Timeseries Volume
- **Endpoint:** `GET /volume/timeseries`
- **Description:** Get volume timeseries data
- **Params:** `chain`, `timeframe`, `from`, `to`

## Search Tokens
- **Endpoint:** `GET /tokens/search`
- **Description:** Advanced token search
- **Params:** `q`, `limit`, `filters`

## Multiple Token Analytics
- **Endpoint:** `GET /tokens/analytics`
- **Description:** Get analytics for multiple tokens
- **Params:** `addresses` (comma-separated)

## Filtered Tokens
- **Endpoint:** `GET /discovery/tokens`
- **Description:** Discover tokens with filters
- **Params:** `minLiquidity`, `minMarketCap`, etc.

## Token Stats
- **Endpoint:** `GET /token/:address/stats`
- **Description:** Get detailed token statistics
- **Params:** `chain`

## Token Allocation
- **Endpoint:** `GET /wallets/:address/tokens/allocation`
- **Description:** Get token allocation breakdown
- **Params:** `chain`

## Token Price History (Extended)
- **Endpoint:** `GET /token/:address/price/history`
- **Description:** Extended historical data
- **Params:** `chain`, `from`, `to`, `interval`

## NFT Collection Stats
- **Endpoint:** `GET /nft/:address/stats`
- **Description:** Get NFT collection statistics
- **Params:** `chain`

## Market Data
- **Endpoint:** `GET /market/data`
- **Description:** Get overall market data
