# Solana Price API Endpoints

## Get Token Price
- **Endpoint:** `GET /token/:network/:address/price`
- **Description:** Get current token price
- **Networks:** mainnet, devnet

## Get Native Token Price (SOL)
- **Endpoint:** `GET /price/:network`
- **Description:** Get SOL price
- **Networks:** mainnet, devnet

## Get OHLCV Candlesticks
- **Endpoint:** `GET /token/:network/:address/price/candlesticks`
- **Description:** Get OHLCV candlestick data
- **Networks:** mainnet, devnet
- **Params:** `timeframe`, `limit`, `from`, `to`

## Get Token Price History
- **Endpoint:** `GET /token/:network/:address/price/history`
- **Description:** Get historical price data
- **Networks:** mainnet, devnet
- **Params:** `from`, `to`, `interval`

## Get Pair Price
- **Endpoint:** `GET /pairs/:network/:address/price`
- **Description:** Get price for a DEX pair
- **Networks:** mainnet, devnet

## Get Pair Candlesticks
- **Endpoint:** `GET /pairs/:network/:address/price/candlesticks`
- **Description:** Get OHLCV for DEX pair
- **Networks:** mainnet, devnet
- **Params:** `timeframe`, `limit`

## Get NFT Floor Price
- **Endpoint:** `GET /nft/:network/:address/lowestprice`
- **Description:** Get floor price for NFT collection
- **Networks:** mainnet, devnet

## Get NFT Sale Prices
- **Endpoint:** `GET /nft/:network/:address/sales`
- **Description:** Get recent NFT sales
- **Networks:** mainnet, devnet
- **Params:** `limit`, `cursor`
