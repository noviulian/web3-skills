# Solana Token API Endpoints

## Get Token Price
- **Endpoint:** `GET /token/:network/:address/price`
- **Description:** Get current token price
- **Networks:** mainnet, devnet

## Get Token Metadata
- **Endpoint:** `GET /token/:network/:address`
- **Description:** Get token metadata
- **Networks:** mainnet, devnet

## Get Token Balance
- **Endpoint:** `GET /token/:network/:address/balance`
- **Description:** Get token balance for wallet
- **Networks:** mainnet, devnet
- **Params:** `walletAddress` or `toAddress`

## Get Token Holders
- **Endpoint:** `GET /token/:network/:address/owners`
- **Description:** Get token holders/owners
- **Networks:** mainnet, devnet
- **Params:** `limit`, `cursor`

## Get Token Transfers
- **Endpoint:** `GET /token/:network/:address/transfers`
- **Description:** Get SPL token transfers
- **Networks:** mainnet, devnet
- **Params:** `limit`, `cursor`

## Search Tokens
- **Endpoint:** `GET /token/:network/search`
- **Description:** Search for tokens
- **Networks:** mainnet, devnet
- **Params:** `q`, `limit`

## Get Token Swaps
- **Endpoint:** `GET /token/:network/:address/swaps`
- **Description:** Get token swaps
- **Networks:** mainnet, devnet
- **Params:** `limit`, `cursor`

## Get Swaps by Wallet
- **Endpoint:** `GET /account/:network/:walletAddress/swaps`
- **Description:** Get all swaps by a wallet
- **Networks:** mainnet, devnet
- **Params:** `limit`, `cursor`

## Get Swaps by Pair
- **Endpoint:** `GET /pairs/:network/:address/swaps`
- **Description:** Get swaps for a trading pair
- **Networks:** mainnet, devnet
- **Params:** `limit`, `cursor`

## Pump.fun - Get Active Tokens
- **Endpoint:** `GET /token/:network/pumpfun/active`
- **Description:** Get active Pump.fun tokens
- **Networks:** mainnet, devnet

## Pump.fun - Get Completed Tokens
- **Endpoint:** `GET /token/:network/pumpfun/completed`
- **Description:** Get completed Pump.fun tokens
- **Networks:** mainnet, devnet

## Pump.fun - Check Bonding Status
- **Endpoint:** `GET /token/:network/:address/pumpfun/isBonding`
- **Description:** Check if token is in bonding curve phase
- **Networks:** mainnet, devnet

## Get Token Account
- **Endpoint:** `GET /token/:network/:address/tokenAccount`
- **Description:** Get token account info
- **Networks:** mainnet, devnet

## Get Mint Data
- **Endpoint:** `GET /token/:network/mint/:address`
- **Description:** Get mint data for token
- **Networks:** mainnet, devnet
