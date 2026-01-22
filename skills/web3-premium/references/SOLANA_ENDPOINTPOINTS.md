# Solana Premium Endpoints

## Volume Stats
- **Endpoint:** `GET /volume/chains`
- **Description:** Get trading volume by chain (includes Solana)

## Timeseries Volume (Solana)
- **Endpoint:** `GET /volume/timeseries/solana`
- **Description:** Get Solana volume timeseries data
- **Params:** `timeframe`, `from`, `to`

## Token Stats (Solana)
- **Endpoint:** `GET /token/:network/:address/stats`
- **Description:** Get detailed token statistics
- **Networks:** mainnet, devnet

## Token Analytics (Solana)
- **Endpoint:** `GET /tokens/analytics/solana`
- **Description:** Get analytics for Solana tokens
- **Params:** `addresses`

## Market Data (Solana)
- **Endpoint:** `GET /market/data/solana`
- **Description:** Get Solana market data

## Top Tokens (Solana)
- **Endpoint:** `GET /tokens/top/solana`
- **Description:** Get top Solana tokens by volume/market cap
- **Params:** `limit`
