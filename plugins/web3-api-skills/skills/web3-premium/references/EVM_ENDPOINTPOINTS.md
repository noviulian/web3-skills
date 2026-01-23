# EVM Premium Endpoints

## Quick Decision Guide

**User asks about...** → **Use this endpoint**

| User Question | Endpoint | Example |
|---------------|----------|---------|
| "Volume by chain?" | `/volume/chains` | Chain volume stats |
| "Volume over time?" | `/volume/timeseries` | Timeseries volume |
| "Advanced token search?" | `/tokens/search` | Filtered search |
| "Multiple token analytics?" | `/tokens/analytics` | Batch analytics |
| "Filter tokens?" | `/discovery/tokens` | By liquidity/market cap |
| "Token stats?" | `/token/:address/stats` | Detailed statistics |
| "Token allocation?" | `/wallets/:address/tokens/allocation` | Portfolio breakdown |
| "NFT collection stats?" | `/nft/:address/stats` | Collection analytics |
| "Market data?" | `/market/data` | Overall market |

## Key Endpoint Patterns

- **Volume analytics:** `/volume/*` (chain-level trading volume)
- **Advanced search:** `/tokens/search` and `/discovery/tokens` (filtered search)
- **Batch analytics:** `/tokens/analytics` (multiple tokens at once)
- **Token allocation:** `/wallets/:address/tokens/allocation` (portfolio view)
- **Premium endpoints:** Higher API cost, advanced analytics

---

## Volume Stats
- **Endpoint:** `GET /volume/chains`
- **Description:** Get trading volume by chain
- **Use this endpoint when:** User asks "volume by chain", "chain volume", "trading volume", "volume stats"
- **Params:** None

## Timeseries Volume
- **Endpoint:** `GET /volume/timeseries`
- **Description:** Get volume timeseries data
- **Use this endpoint when:** User asks "volume over time", "historical volume", "timeseries data", "volume chart"
- **Params:** `chain`, `timeframe`, `from`, `to`

## Search Tokens
- **Endpoint:** `GET /tokens/search`
- **Description:** Advanced token search
- **Use this endpoint when:** User asks "advanced token search", "filtered search", "search with filters"
- **Params:** `q`, `limit`, `filters`

## Multiple Token Analytics
- **Endpoint:** `GET /tokens/analytics`
- **Description:** Get analytics for multiple tokens
- **Use this endpoint when:** User asks "multiple token analytics", "batch analytics", "token stats for multiple tokens"
- **Params:** `addresses` (comma-separated)

## Filtered Tokens
- **Endpoint:** `GET /discovery/tokens`
- **Description:** Discover tokens with filters
- **Use this endpoint when:** User asks "filter tokens", "token discovery", "tokens by liquidity", "tokens by market cap"
- **Params:** `minLiquidity`, `minMarketCap`, etc.

## Token Stats
- **Endpoint:** `GET /token/:address/stats`
- **Description:** Get detailed token statistics
- **Use this endpoint when:** User asks "token stats", "detailed statistics", "advanced token data", "token analytics"
- **Params:** `chain`

## Token Allocation
- **Endpoint:** `GET /wallets/:address/tokens/allocation`
- **Description:** Get token allocation breakdown
- **Use this endpoint when:** User asks "token allocation", "portfolio allocation", "wallet token distribution"
- **Params:** `chain`

## Token Price History (Extended)
- **Endpoint:** `GET /token/:address/price/history`
- **Description:** Extended historical data
- **Use this endpoint when:** User asks "extended price history", "long-term price data", "historical analytics"
- **Params:** `chain`, `from`, `to`, `interval`

## NFT Collection Stats
- **Endpoint:** `GET /nft/:address/stats`
- **Description:** Get NFT collection statistics
- **Use this endpoint when:** User asks "NFT collection stats", "collection analytics", "NFT statistics"
- **Params:** `chain`

## Market Data
- **Endpoint:** `GET /market/data`
- **Description:** Get overall market data
- **Use this endpoint when:** User asks "market data", "overall market", "market statistics", "global market data"
- **Params:** None
