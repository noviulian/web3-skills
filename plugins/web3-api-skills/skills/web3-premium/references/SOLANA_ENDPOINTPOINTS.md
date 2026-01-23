# Solana Premium Endpoints

## Quick Decision Guide

**User asks about...** → **Use this endpoint**

| User Question | Endpoint | Example |
|---------------|----------|---------|
| "Volume by chain?" | `/volume/chains` | Includes Solana |
| "Solana volume over time?" | `/volume/timeseries/solana` | Solana timeseries |
| "Solana token stats?" | `/token/:network/:address/stats` | Token analytics |
| "Multiple Solana analytics?" | `/tokens/analytics/solana` | Batch analytics |
| "Solana market data?" | `/market/data/solana` | Market statistics |
| "Top Solana tokens?" | `/tokens/top/solana` | By volume/market cap |

## Key Endpoint Patterns

- **Volume analytics:** `/volume/*` (includes Solana)
- **Solana-specific:** `/volume/timeseries/solana`, `/tokens/analytics/solana`
- **Token stats:** `/token/:network/:address/stats` (detailed analytics)
- **Network parameter:** `mainnet` or `devnet`
- **Premium endpoints:** Higher API cost, advanced analytics

---

## Volume Stats
- **Endpoint:** `GET /volume/chains`
- **Description:** Get trading volume by chain (includes Solana)
- **Use this endpoint when:** User asks "volume by chain", "Solana volume", "chain volume stats"
- **Params:** None

## Timeseries Volume (Solana)
- **Endpoint:** `GET /volume/timeseries/solana`
- **Description:** Get Solana volume timeseries data
- **Use this endpoint when:** User asks "Solana volume over time", "Solana historical volume", "Solana timeseries"
- **Params:** `timeframe`, `from`, `to`

## Token Stats (Solana)
- **Endpoint:** `GET /token/:network/:address/stats`
- **Description:** Get detailed token statistics
- **Use this endpoint when:** User asks "Solana token stats", "SPL token analytics", "token statistics"
- **Networks:** mainnet, devnet

## Token Analytics (Solana)
- **Endpoint:** `GET /tokens/analytics/solana`
- **Description:** Get analytics for Solana tokens
- **Use this endpoint when:** User asks "multiple Solana token analytics", "batch Solana analytics"
- **Params:** `addresses`

## Market Data (Solana)
- **Endpoint:** `GET /market/data/solana`
- **Description:** Get Solana market data
- **Use this endpoint when:** User asks "Solana market data", "Solana market statistics", "Solana market overview"
- **Params:** None

## Top Tokens (Solana)
- **Endpoint:** `GET /tokens/top/solana`
- **Description:** Get top Solana tokens by volume/market cap
- **Use this endpoint when:** User asks "top Solana tokens", "best Solana tokens", "Solana tokens by volume"
- **Params:** `limit`
