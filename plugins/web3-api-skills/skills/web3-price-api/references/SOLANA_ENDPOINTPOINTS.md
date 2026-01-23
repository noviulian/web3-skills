# Solana Price API Endpoints

## Quick Decision Guide

**User asks about...** → **Use this endpoint**

| User Question | Endpoint | Example |
|---------------|----------|---------|
| "Solana token price?" | `/token/:network/:address/price` | SPL token price |
| "SOL price?" | `/price/:network` | Native SOL |
| "Price chart/candlesticks?" | `/token/:network/:address/price/candlesticks` | OHLCV data |
| "Price history?" | `/token/:network/:address/price/history` | Historical prices |
| "DEX pair price?" | `/pairs/:network/:address/price` | Pool price |
| "Pair candlesticks?" | `/pairs/:network/:address/price/candlesticks` | Pool OHLCV |
| "NFT floor price?" | `/nft/:network/:address/lowestprice` | Collection floor |
| "NFT sales?" | `/nft/:network/:address/sales` | Recent sales |

## Key Endpoint Patterns

- **Token prices:** `/token/:network/:address/price*` (current + history)
- **Native SOL:** `/price/:network` (SOL price)
- **DEX pairs:** `/pairs/:network/:address/price*` (pool prices)
- **NFT prices:** `/nft/:network/:address/*price*` (floor + sales)
- **Network parameter:** `mainnet` or `devnet`

---

## Get Token Price
- **Endpoint:** `GET /token/:network/:address/price`
- **Description:** Get current token price
- **Use this endpoint when:** User asks "Solana token price", "SPL token price", "how much is this token"
- **Networks:** mainnet, devnet

## Get Native Token Price (SOL)
- **Endpoint:** `GET /price/:network`
- **Description:** Get SOL price
- **Use this endpoint when:** User asks "SOL price", "Solana price", "native token price"
- **Networks:** mainnet, devnet

## Get OHLCV Candlesticks
- **Endpoint:** `GET /token/:network/:address/price/candlesticks`
- **Description:** Get OHLCV candlestick data
- **Use this endpoint when:** User asks "candlesticks", "OHLCV", "price chart", "charting data", "open/high/low/close"
- **Networks:** mainnet, devnet
- **Params:** `timeframe`, `limit`, `from`, `to`

## Get Token Price History
- **Endpoint:** `GET /token/:network/:address/price/history`
- **Description:** Get historical price data
- **Use this endpoint when:** User asks "price history", "historical prices", "past prices", "price over time"
- **Networks:** mainnet, devnet
- **Params:** `from`, `to`, `interval`

## Get Pair Price
- **Endpoint:** `GET /pairs/:network/:address/price`
- **Description:** Get price for a DEX pair
- **Use this endpoint when:** User asks "pair price", "liquidity pool price", "DEX price", "pool price"
- **Networks:** mainnet, devnet

## Get Pair Candlesticks
- **Endpoint:** `GET /pairs/:network/:address/price/candlesticks`
- **Description:** Get OHLCV for DEX pair
- **Use this endpoint when:** User asks "pair candlesticks", "pool OHLCV", "liquidity pool chart"
- **Networks:** mainnet, devnet
- **Params:** `timeframe`, `limit`

## Get NFT Floor Price
- **Endpoint:** `GET /nft/:network/:address/lowestprice`
- **Description:** Get floor price for NFT collection
- **Use this endpoint when:** User asks "floor price", "NFT floor", "lowest price", "collection floor"
- **Networks:** mainnet, devnet

## Get NFT Sale Prices
- **Endpoint:** `GET /nft/:network/:address/sales`
- **Description:** Get recent NFT sales
- **Use this endpoint when:** User asks "NFT sales", "recent sales", "sale prices", "what did it sell for"
- **Networks:** mainnet, devnet
- **Params:** `limit`, `cursor`
