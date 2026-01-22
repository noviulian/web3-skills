# EVM Token API Endpoints

## Get Token Price
- **Endpoint:** `GET /erc20/:address/price`
- **Description:** Get current token price in USD
- **Auto-chain:** Yes

## Get Multiple Token Prices
- **Endpoint:** `GET /erc20/prices`
- **Description:** Get prices for multiple tokens at once
- **Params:** `addresses` (comma-separated)

## Get Token Metadata
- **Endpoint:** `GET /erc20/metadata`
- **Description:** Get token metadata (name, symbol, decimals, logo)
- **Params:** `addresses` (comma-separated)

## Get Token Pairs
- **Endpoint:** `GET /erc20/:address/pairs`
- **Description:** Get DEX pairs for a token
- **Params:** `limit`, `cursor`

## Get Token Swaps by Address
- **Endpoint:** `GET /erc20/:address/swaps`
- **Description:** Get swaps for a specific token
- **Params:** `limit`, `from`, `to`

## Get Swaps by Pair Address
- **Endpoint:** `GET /pairs/:address/swaps`
- **Description:** Get swaps for a DEX pair
- **Params:** `limit`, `from`, `to`

## Get Token Owners
- **Endpoint:** `GET /erc20/:address/owners`
- **Description:** Get token holders/owners
- **Params:** `limit`, `cursor`

## Get Token Transfers
- **Endpoint:** `GET /erc20/:address/transfers`
- **Description:** Get ERC20 transfer events
- **Params:** `limit`, `cursor`, `from`, `to`

## Search Tokens
- **Endpoint:** `GET /erc20/search`
- **Description:** Search for tokens by name/symbol
- **Params:** `q`, `chain`, `limit`

## Get Trending Tokens
- **Endpoint:** `GET /trending/tokens`
- **Description:** Get trending tokens on social media
- **Params:** `chain`, `limit`

## Get Allowance
- **Endpoint:** `GET /erc20/:address/allowance`
- **Description:** Check token allowance
- **Params:** `ownerAddress`, `spenderAddress`

## Get Total Supply
- **Endpoint:** `GET /erc20/:address/totalSupply`
- **Description:** Get token total supply

## Get Token Balance
- **Endpoint:** `GET /erc20/:address/balanceOf`
- **Description:** Get token balance for an address
- **Params:** `address`

## Get Token Stats
- **Endpoint:** `GET /erc20/:address/stats`
- **Description:** Get token statistics
- **Params:** `chain`

## Get Token Price History
- **Endpoint:** `GET /erc20/:address/price/history`
- **Description:** Get historical price data
- **Params:** `chain`, `from`, `to`, `interval`
