# Solana Token API Endpoints

## Quick Decision Guide

**User asks about...** → **Use this endpoint**

| User Question | Endpoint | Example |
|---------------|----------|---------|
| "Solana token price?" | `/token/:network/:address/price` | SPL token price |
| "Token metadata?" | `/token/:network/:address` | Token info |
| "Token balance?" | `/token/:network/:address/balance` | For wallet |
| "Token holders?" | `/token/:network/:address/owners` | SPL holders |
| "Token transfers?" | `/token/:network/:address/transfers` | Transfer history |
| "Search tokens?" | `/token/:network/search` | By name/symbol |
| "Token swaps?" | `/token/:network/:address/swaps` | Swap history |
| "Pump.fun tokens?" | `/token/:network/pumpfun/*` | Active/completed |
| "Bonding curve status?" | `/token/:network/:address/pumpfun/isBonding` | Check phase |
| "Wallet swaps?" | `/account/:network/:walletAddress/swaps` | All swaps |
| "Pair swaps?" | `/pairs/:network/:address/swaps` | DEX pair trades |

## Key Endpoint Patterns

- **Token-specific:** `/token/:network/:address/*`
- **Wallet-specific:** `/account/:network/:walletAddress/*`
- **Pair-specific:** `/pairs/:network/:address/*`
- **Pump.fun specific:** `/token/:network/pumpfun/*`
- **Network parameter:** `mainnet` or `devnet`

---

## Get Token Price
- **Endpoint:** `GET /token/:network/:address/price`
- **Description:** Get current token price
- **Use this endpoint when:** User asks "Solana token price", "SPL token price", "how much is this token worth"
- **Networks:** mainnet, devnet

## Get Token Metadata
- **Endpoint:** `GET /token/:network/:address`
- **Description:** Get token metadata
- **Use this endpoint when:** User asks "Solana token metadata", "token info", "token details", "SPL token info"
- **Networks:** mainnet, devnet

## Get Token Balance
- **Endpoint:** `GET /token/:network/:address/balance`
- **Description:** Get token balance for wallet
- **Use this endpoint when:** User asks "token balance", "how many tokens", "SPL token balance"
- **Networks:** mainnet, devnet
- **Params:** `walletAddress` or `toAddress`

## Get Token Holders
- **Endpoint:** `GET /token/:network/:address/owners`
- **Description:** Get token holders/owners
- **Use this endpoint when:** User asks "token holders", "who owns this SPL token", "Solana token holders"
- **Networks:** mainnet, devnet
- **Params:** `limit`, `cursor`

## Get Token Transfers
- **Endpoint:** `GET /token/:network/:address/transfers`
- **Description:** Get SPL token transfers
- **Use this endpoint when:** User asks "token transfers", "transfer history", "SPL token movement"
- **Networks:** mainnet, devnet
- **Params:** `limit`, `cursor`

## Search Tokens
- **Endpoint:** `GET /token/:network/search`
- **Description:** Search for tokens
- **Use this endpoint when:** User asks "search Solana tokens", "find SPL tokens", "token search"
- **Networks:** mainnet, devnet
- **Params:** `q`, `limit`

## Get Token Swaps
- **Endpoint:** `GET /token/:network/:address/swaps`
- **Description:** Get token swaps
- **Use this endpoint when:** User asks "token swaps", "swap history", "trading activity"
- **Networks:** mainnet, devnet
- **Params:** `limit`, `cursor`

## Get Swaps by Wallet
- **Endpoint:** `GET /account/:network/:walletAddress/swaps`
- **Description:** Get all swaps by a wallet
- **Use this endpoint when:** User asks "wallet swaps", "all swaps by this wallet", "trading history"
- **Networks:** mainnet, devnet
- **Params:** `limit`, `cursor`

## Get Swaps by Pair
- **Endpoint:** `GET /pairs/:network/:address/swaps`
- **Description:** Get swaps for a trading pair
- **Use this endpoint when:** User asks "pair swaps", "trades on this pair", "DEX pair activity"
- **Networks:** mainnet, devnet
- **Params:** `limit`, `cursor`

## Pump.fun - Get Active Tokens
- **Endpoint:** `GET /token/:network/pumpfun/active`
- **Description:** Get active Pump.fun tokens
- **Use this endpoint when:** User asks "Pump.fun active tokens", "new tokens", "currently bonding"
- **Networks:** mainnet, devnet

## Pump.fun - Get Completed Tokens
- **Endpoint:** `GET /token/:network/pumpfun/completed`
- **Description:** Get completed Pump.fun tokens
- **Use this endpoint when:** User asks "completed Pump.fun tokens", "graduated tokens", "bonding curve complete"
- **Networks:** mainnet, devnet

## Pump.fun - Check Bonding Status
- **Endpoint:** `GET /token/:network/:address/pumpfun/isBonding`
- **Description:** Check if token is in bonding curve phase
- **Use this endpoint when:** User asks "bonding curve status", "is it still bonding", "did it graduate"
- **Networks:** mainnet, devnet

## Get Token Account
- **Endpoint:** `GET /token/:network/:address/tokenAccount`
- **Description:** Get token account info
- **Use this endpoint when:** User asks "token account", "account info", "token account details"
- **Networks:** mainnet, devnet

## Get Mint Data
- **Endpoint:** `GET /token/:network/mint/:address`
- **Description:** Get mint data for token
- **Use this endpoint when:** User asks "mint data", "mint info", "mint authority", "mint details"
- **Networks:** mainnet, devnet
