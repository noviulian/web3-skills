---
name: moralis-data-api
description: Query Web3 blockchain data from Moralis API (wallet, token, NFT, DeFi, entity, price, blockchain endpoints). REST API with curl examples.
license: MIT
compatibility: Requires Node.js (built-in modules only)
metadata:
  version: "3.1.0"
  author: web3-skills
  tags: [web3, blockchain, evm, solana, wallet, token, nft, defi]
allowed-tools: Bash
---

# Moralis Data API

Query Web3 blockchain data via REST API. Auto-detects EVM vs Solana addresses and routes to appropriate API.

## Setup

Provide your Moralis API key before using this skill. You can provide it in any of these ways:

- "Set this as the Moralis API key: `<your_key>`"
- "Use this API key: `<your_key>`"
- "Here's my key: `<your_key>`"
- "Configure the API key"
- "Set up the credentials"

The key will be remembered for the current session only. If no key is set, you'll be prompted to provide one.

**I need your Moralis API key to proceed. You can paste it like: `Set this as the Moralis API key: <key>`**

### Session Memory Pattern

Claude stores the key in memory throughout the session:

```javascript
// When user provides the key
const MORALIS_API_KEY = "user_provided_key";

// Use in all curl commands
curl "https://deep-index.moralis.io/api/v2.2/..." \
  -H "X-API-Key: ${MORALIS_API_KEY}"
```

**Note:** The key set in this skill is also available to @moralis-streams-api within the same session (and vice versa). You only need to provide it once.

### Security Notes

- Key is stored in memory only
- Never written to disk
- Never included in git commits
- Session-isolated (forgotten when session ends)
- No risk of accidentally committing secrets to version control

### For Project Development

If you're building a project (dashboard, wallet, dApp, etc.) that needs persistent API key storage:

> "I recommend creating a `.env` file in your project root with:
>
> ```bash
> MORALIS_API_KEY=your_key_here
> ```
>
> **Important:** Add `.env` to your `.gitignore` file to prevent accidentally committing your key."

### Verify Your Key

After setting the key, you can verify it works:

```bash
curl "https://deep-index.moralis.io/api/v2.2/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/balance?chain=0x1" \
  -H "X-API-Key: YOUR_API_KEY"
```

## Authentication

All requests require the API key header:

```bash
X-API-Key: <your_api_key>
```

## Base URLs

| API        | Base URL                                 |
| ---------- | ---------------------------------------- |
| **EVM**    | `https://deep-index.moralis.io/api/v2.2` |
| **Solana** | `https://solana-gateway.moralis.io`      |

## Pagination

Many endpoints support cursor-based pagination. See [Pagination](rules/Pagination.md) for details.

## When to Use This Skill

Use this skill when the user asks about:

- **Wallet data:** balances, tokens, NFTs, transaction history, DeFi positions, profitability
- **Token data:** prices, metadata, pairs, DEX trades, analytics, security scores, sniper detection
- **NFT data:** metadata, transfers, traits, rarity, floor prices
- **DeFi data:** protocol positions, liquidity, exposure
- **Entity data:** labeled addresses (exchanges, funds, protocols, whales)
- **Price data:** token/NFT prices, OHLCV candlesticks
- **Blockchain data:** blocks, transactions, decoded data

⚠️ **NOT for:** Real-time event streaming → Use @moralis-streams-api

## Default Chain Behavior

**For EVM addresses:** When a user provides an EVM address (`0x...`) without specifying a chain, default to **Ethereum (`chain=0x1`)** unless the user specifies a different chain or multiple chains.

**Examples:**
- "Get the balance of `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`" → Use `chain=0x1` (default)
- "Get the balance of `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045` on Polygon" → Use `chain=0x89`
- "Get the balance of `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045` on Ethereum and Base" → Query both chains

**For Solana addresses:** The base58 format is auto-detected and routed to the Solana API. No chain defaulting applies.

## Endpoint Rules

Each endpoint has its own rule file with full documentation:

```bash
# EVM endpoints (112 rules - excludes 4 ignored endpoints)
rules/getWalletNFTs.md
rules/getTokenPrice__evm.md
rules/getWalletTokenBalances.md
# ... and 109 more

# Solana endpoints (41 rules total)
rules/getNFTMetadata__solana.md
rules/getTokenPrice__solana.md
rules/balance__solana.md
# ... and 38 more (including 17 EVM variants that support Solana chain)
```

**Note:**
- `__solana` suffix indicates a Solana-specific endpoint
- `__evm` suffix indicates EVM endpoint when same operationId exists in Solana
- Some EVM endpoints have `__solana` variants - these are EVM endpoints that support Solana via the `chain=solana` parameter

## Endpoint Catalog

Complete list of all 136 endpoints (102 EVM + 34 Solana) organized by category.

### Wallet

Balances, tokens, NFTs, transaction history, profitability, and net worth data.

> See [WalletHistory](rules/WalletHistory.md) for transaction categories and classifications

| Endpoint | Description |
|----------|-------------|
| [getNativeBalance](rules/getNativeBalance.md) | Get native balance by wallet |
| [getNativeBalancesForAddresses](rules/getNativeBalancesForAddresses.md) | Get native balance for a set of wallets |
| [getWalletActiveChains](rules/getWalletActiveChains.md) | Get active chains by wallet address |
| [getWalletApprovals](rules/getWalletApprovals.md) | Get ERC20 approvals by wallet |
| [getWalletHistory](rules/getWalletHistory.md) | Get the complete decoded transaction history of a wallet |
| [getWalletNetWorth](rules/getWalletNetWorth.md) | Get wallet net worth |
| [getWalletNFTCollections](rules/getWalletNFTCollections.md) | Get NFT collections by wallet address |
| [getWalletNFTs](rules/getWalletNFTs.md) | Get NFTs by wallet address |
| [getWalletNFTTransfers](rules/getWalletNFTTransfers.md) | Get NFT Transfers by wallet address |
| [getWalletProfitability](rules/getWalletProfitability.md) | Get detailed profit and loss by wallet address |
| [getWalletProfitabilitySummary](rules/getWalletProfitabilitySummary.md) | Get profit and loss summary by wallet address |
| [getWalletStats](rules/getWalletStats.md) | Get summary stats by wallet address |
| [getWalletTokenBalances](rules/getWalletTokenBalances.md) | Get ERC20 token balances by wallet |
| [getWalletTokenBalancesPrice](rules/getWalletTokenBalancesPrice.md) | Get token balances with prices by wallet address |
| [getWalletTokenTransfers](rules/getWalletTokenTransfers.md) | Get ERC20 token transfers by wallet address |
| [getWalletTransactions](rules/getWalletTransactions.md) | Get native transactions by wallet |
| [getWalletTransactionsVerbose](rules/getWalletTransactionsVerbose.md) | Get decoded transactions by wallet |

### Token

Token prices, metadata, pairs, DEX swaps, analytics, security scores, and sniper detection.

> See [SupportedDexs](rules/SupportedDexs.md) for supported DEXs per chain | [TokenSearch](rules/TokenSearch.md) for token search functionality | [TokenHoldersFaq](rules/TokenHoldersFaq.md) for token holders FAQ | [SpamDetection](rules/SpamDetection.md) for spam detection

| Endpoint | Description |
|----------|-------------|
| [getAggregatedTokenPairStats](rules/getAggregatedTokenPairStats__evm.md) | Get aggregated token pair statistics by address |
| [getHistoricalTokenScore](rules/getHistoricalTokenScore.md) | Get historical token score by token address |
| [getMultipleTokenAnalytics](rules/getMultipleTokenAnalytics.md) | Get token analytics for a list of token addresses |
| [getPairAddress](rules/getPairAddress.md) | Get DEX token pair address |
| [getPairReserves](rules/getPairReserves.md) | Get DEX token pair reserves |
| [getPairStats](rules/getPairStats__evm.md) | Get stats by pair address |
| [getSnipersByPairAddress](rules/getSnipersByPairAddress__evm.md) | Get snipers by pair address |
| [getSwapsByPairAddress](rules/getSwapsByPairAddress__evm.md) | Get swap transactions by pair address |
| [getSwapsByTokenAddress](rules/getSwapsByTokenAddress__evm.md) | Get swap transactions by token address |
| [getSwapsByWalletAddress](rules/getSwapsByWalletAddress__evm.md) | Get swap transactions by wallet address |
| [getTimeSeriesTokenAnalytics](rules/getTimeSeriesTokenAnalytics.md) | Retrieve timeseries trading stats by token addresses |
| [getTokenAnalytics](rules/getTokenAnalytics.md) | Get token analytics by token address |
| [getTokenBondingStatus](rules/getTokenBondingStatus__evm.md) | Get the token bonding status |
| [getTokenCategories](rules/getTokenCategories.md) | Get ERC20 token categories |
| [getTokenHolders](rules/getTokenHolders__evm.md) | Get a holders summary by token address |
| [getTokenMetadata](rules/getTokenMetadata__evm.md) | Get ERC20 token metadata by contract |
| [getTokenMetadataBySymbol](rules/getTokenMetadataBySymbol.md) | Get ERC20 token metadata by symbols |
| [getTokenOwners](rules/getTokenOwners.md) | Get ERC20 token owners by contract |
| [getTokenPairs](rules/getTokenPairs__evm.md) | Get token pairs by address |
| [getTokenScore](rules/getTokenScore.md) | Get token score by token address |
| [getTokenStats](rules/getTokenStats.md) | Get ERC20 token stats |
| [getTokenTransfers](rules/getTokenTransfers.md) | Get ERC20 token transfers by contract address |

### NFT

NFT metadata, transfers, traits, rarity, floor prices, and trades.

> See [NftMarketplaces](rules/NftMarketplaces.md) for supported NFT marketplaces per chain | [SpamDetection](rules/SpamDetection.md) for spam detection

| Endpoint | Description |
|----------|-------------|
| [getContractNFTs](rules/getContractNFTs.md) | Get NFTs by contract address |
| [getMultipleNFTs](rules/getMultipleNFTs.md) | Get Metadata for NFTs |
| [getNFTBulkContractMetadata](rules/getNFTBulkContractMetadata.md) | Get metadata for multiple NFT contracts |
| [getNFTByContractTraits](rules/getNFTByContractTraits.md) | Get NFTs by traits |
| [getNFTCollectionStats](rules/getNFTCollectionStats.md) | Get summary stats by NFT collection |
| [getNFTContractMetadata](rules/getNFTContractMetadata.md) | Get NFT collection metadata |
| [getNFTContractSalePrices](rules/getNFTContractSalePrices.md) | Get NFT sale prices by collection |
| [getNFTContractTransfers](rules/getNFTContractTransfers.md) | Get NFT transfers by contract address |
| [getNFTFloorPriceByContract](rules/getNFTFloorPriceByContract.md) | Get NFT floor price by contract |
| [getNFTFloorPriceByToken](rules/getNFTFloorPriceByToken.md) | Get NFT floor price by token |
| [getNFTHistoricalFloorPriceByContract](rules/getNFTHistoricalFloorPriceByContract.md) | Get historical NFT floor price by contract |
| [getNFTMetadata](rules/getNFTMetadata__evm.md) | Get NFT metadata |
| [getNFTOwners](rules/getNFTOwners.md) | Get NFT owners by contract address |
| [getNFTSalePrices](rules/getNFTSalePrices.md) | Get NFT sale prices by token |
| [getNFTTokenIdOwners](rules/getNFTTokenIdOwners.md) | Get NFT owners by token ID |
| [getNFTTrades](rules/getNFTTrades.md) | Get NFT trades by collection |
| [getNFTTradesByToken](rules/getNFTTradesByToken.md) | Get NFT trades by token |
| [getNFTTradesByWallet](rules/getNFTTradesByWallet.md) | Get NFT trades by wallet address |
| [getNFTTraitsByCollection](rules/getNFTTraitsByCollection.md) | Get NFT traits by collection |
| [getNFTTraitsByCollectionPaginate](rules/getNFTTraitsByCollectionPaginate.md) | Get NFT traits by collection paginate |
| [getNFTTransfers](rules/getNFTTransfers.md) | Get NFT transfers by token ID |
| [getTopNFTCollectionsByMarketCap](rules/getTopNFTCollectionsByMarketCap.md) | Get top NFT collections by market cap |

### DeFi

DeFi protocol positions, liquidity, and exposure data.

> See [DefiProtocols](rules/DefiProtocols.md) for supported DeFi protocols per chain

| Endpoint | Description |
|----------|-------------|
| [getDefiPositionsByProtocol](rules/getDefiPositionsByProtocol.md) | Get detailed DeFi positions by protocol for a wallet |
| [getDefiPositionsSummary](rules/getDefiPositionsSummary.md) | Get DeFi positions of a wallet |
| [getDefiSummary](rules/getDefiSummary.md) | Get the DeFi summary of a wallet |

### Entity

Labeled addresses including exchanges, funds, protocols, and whales.

| Endpoint | Description |
|----------|-------------|
| [getEntity](rules/getEntity.md) | Get Entity Details By Id |
| [getEntityCategories](rules/getEntityCategories.md) | Get Entity Categories |

### Price

Token and NFT prices, OHLCV candlestick data.

| Endpoint | Description |
|----------|-------------|
| [getMultipleTokenPrices](rules/getMultipleTokenPrices__evm.md) | Get Multiple ERC20 token prices |
| [getPairPrice](rules/getPairPrice.md) | Get DEX token pair price |
| [getTokenPrice](rules/getTokenPrice__evm.md) | Get ERC20 token price |

### Blockchain

Blocks, transactions, date-to-block conversion, and contract functions.

| Endpoint | Description |
|----------|-------------|
| [getBlock](rules/getBlock.md) | Get block by hash |
| [getDateToBlock](rules/getDateToBlock.md) | Get block by date |
| [getLatestBlockNumber](rules/getLatestBlockNumber.md) | Get latest block number |
| [getTransaction](rules/getTransaction.md) | Get transaction by hash |
| [getTransactionVerbose](rules/getTransactionVerbose.md) | Get decoded transaction by hash |

### Discovery

Trending tokens, blue chips, market movers, and token discovery.

| Endpoint | Description |
|----------|-------------|
| [getDiscoveryToken](rules/getDiscoveryToken.md) | Get token details |
| [getTimeSeriesVolume](rules/getTimeSeriesVolume.md) | Retrieve timeseries trading stats by chain |
| [getTimeSeriesVolumeByCategory](rules/getTimeSeriesVolumeByCategory.md) | Retrieve timeseries trading stats by category |
| [getTopCryptoCurrenciesByMarketCap](rules/getTopCryptoCurrenciesByMarketCap.md) | Get top crypto currencies by market cap |
| [getTopCryptoCurrenciesByTradingVolume](rules/getTopCryptoCurrenciesByTradingVolume.md) | Get top crypto currencies by trading volume |
| [getTopERC20TokensByMarketCap](rules/getTopERC20TokensByMarketCap.md) | Get top ERC20 tokens by market cap |
| [getTopERC20TokensByPriceMovers](rules/getTopERC20TokensByPriceMovers.md) | Get top ERC20 tokens by price movements (winners and losers) |
| [getTopGainersTokens](rules/getTopGainersTokens.md) | Get tokens with top gainers |
| [getTopLosersTokens](rules/getTopLosersTokens.md) | Get tokens with top losers |
| [getTopProfitableWalletPerToken](rules/getTopProfitableWalletPerToken.md) | Get top traders for a given ERC20 token |
| [getTrendingTokens](rules/getTrendingTokens.md) | Get trending tokens |
| [getVolumeStatsByCategory](rules/getVolumeStatsByCategory.md) | Get trading stats by categories |
| [getVolumeStatsByChain](rules/getVolumeStatsByChain.md) | Get trading stats by chain |

### Other

Utility endpoints including API version, endpoint weights, and address resolution.

| Endpoint | Description |
|----------|-------------|
| [getBondingTokensByExchange](rules/getBondingTokensByExchange__evm.md) | Get bonding tokens by exchange |
| [getCandleSticks](rules/getCandleSticks__evm.md) | Get OHLCV by pair address |
| [getEntitiesByCategory](rules/getEntitiesByCategory.md) | Get Entities By Category |
| [getFilteredTokens](rules/getFilteredTokens.md) | Returns a list of tokens that match the specified filters and criteria |
| [getGraduatedTokensByExchange](rules/getGraduatedTokensByExchange__evm.md) | Get graduated tokens by exchange |
| [getHistoricalTokenHolders](rules/getHistoricalTokenHolders__evm.md) | Get timeseries holders data |
| [getNewTokensByExchange](rules/getNewTokensByExchange__evm.md) | Get new tokens by exchange |
| [getUniqueOwnersByCollection](rules/getUniqueOwnersByCollection.md) | Get unique wallet addresses owning NFTs from a contract. |
| [resolveAddress](rules/resolveAddress.md) | ENS lookup by address |
| [resolveAddressToDomain](rules/resolveAddressToDomain.md) | Resolve Address to Unstoppable domain |
| [resolveDomain](rules/resolveDomain.md) | Resolve Unstoppable domain |
| [resolveENSDomain](rules/resolveENSDomain.md) | ENS lookup by domain |
| [reSyncMetadata](rules/reSyncMetadata.md) | Resync NFT metadata |
| [searchEntities](rules/searchEntities.md) | Search Entities, Organizations or Wallets |
| [searchTokens](rules/searchTokens.md) | Search for tokens based on contract address, pair address, token name or token s |

### Solana Endpoints

Solana-specific endpoints (24 native + 10 EVM variants that support Solana chain = 34 total).

| Endpoint | Description |
|----------|-------------|
| [balance](rules/balance__solana.md) | Gets native balance owned by the given address |
| [getAggregatedTokenPairStats](rules/getAggregatedTokenPairStats__solana.md) | Get aggregated token pair statistics by address |
| [getBondingTokensByExchange](rules/getBondingTokensByExchange__solana.md) | Get bonding tokens by exchange |
| [getCandleSticks](rules/getCandleSticks__solana.md) | Get candlesticks for a pair address |
| [getGraduatedTokensByExchange](rules/getGraduatedTokensByExchange__solana.md) | Get graduated tokens by exchange |
| [getHistoricalTokenHolders](rules/getHistoricalTokenHolders__solana.md) | Get token holders overtime for a given tokens |
| [getMultipleTokenMetadata](rules/getMultipleTokenMetadata__solana.md) | Get multiple token metadata |
| [getMultipleTokenPrices](rules/getMultipleTokenPrices__solana.md) | Get token price |
| [getNFTMetadata](rules/getNFTMetadata__solana.md) | Get the global metadata for a given contract |
| [getNFTs](rules/getNFTs__solana.md) | Gets NFTs owned by the given address |
| [getNewTokensByExchange](rules/getNewTokensByExchange__solana.md) | Get new tokens by exchange |
| [getPairStats](rules/getPairStats__solana.md) | Get stats for a pair address |
| [getPortfolio](rules/getPortfolio__solana.md) | Gets the portfolio of the given address |
| [getSPL](rules/getSPL__solana.md) | Gets token balances owned by the given address |
| [getSnipersByPairAddress](rules/getSnipersByPairAddress__solana.md) | Get snipers by pair address. |
| [getSwapsByPairAddress](rules/getSwapsByPairAddress__solana.md) | Get all swap related transactions (buy, sell, add liquidity & remove liquidity) |
| [getSwapsByTokenAddress](rules/getSwapsByTokenAddress__solana.md) | Get all swap related transactions (buy, sell) |
| [getSwapsByWalletAddress](rules/getSwapsByWalletAddress__solana.md) | Get all swap related transactions (buy, sell) for a specific wallet address. |
| [getTokenBondingStatus](rules/getTokenBondingStatus__solana.md) | Get Token Bonding Status |
| [getTokenHolders](rules/getTokenHolders__solana.md) | Get the summary of holders for a given token token. |
| [getTokenMetadata](rules/getTokenMetadata__solana.md) | Get Token metadata |
| [getTokenPairs](rules/getTokenPairs__solana.md) | Get token pairs by address |
| [getTokenPrice](rules/getTokenPrice__solana.md) | Get token price |
| [getTopHolders](rules/getTopHolders__solana.md) | Get paginated top holders for a given token. |
| [getDiscoveryToken](rules/getDiscoveryToken__solana.md) | **Solana variant:** Get token details |
| [getHistoricalTokenScore](rules/getHistoricalTokenScore__solana.md) | **Solana variant:** Get historical token score by token address |
| [getTimeSeriesVolume](rules/getTimeSeriesVolume__solana.md) | **Solana variant:** Retrieve timeseries trading stats by chain |
| [getTimeSeriesVolumeByCategory](rules/getTimeSeriesVolumeByCategory__solana.md) | **Solana variant:** Retrieve timeseries trading stats by category |
| [getTokenAnalytics](rules/getTokenAnalytics__solana.md) | **Solana variant:** Get token analytics by token address |
| [getTokenScore](rules/getTokenScore__solana.md) | **Solana variant:** Get token score by token address |
| [getTopGainersTokens](rules/getTopGainersTokens__solana.md) | **Solana variant:** Get tokens with top gainers |
| [getTopLosersTokens](rules/getTopLosersTokens__solana.md) | **Solana variant:** Get tokens with top losers |
| [getTrendingTokens](rules/getTrendingTokens__solana.md) | **Solana variant:** Get trending tokens |
| [getVolumeStatsByCategory](rules/getVolumeStatsByCategory__solana.md) | **Solana variant:** Get trading stats by categories |

## Common Pitfalls

- **Chain IDs:** Use hex (0x1, 0x89) to save API tokens, not names (eth, polygon)
- **Address format:** EVM addresses start with `0x`, Solana addresses are base58
- **Path parameters:** Replace `:address`, `:token_address` etc. with actual values
- **Streams API:** Streams uses `api.moralis-streams.com`, a different base URL

## Example Requests

```bash
# Get NFTs for an EVM wallet
curl "https://deep-index.moralis.io/api/v2.2/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/nft?chain=0x1" \
  -H "X-API-Key: YOUR_API_KEY"

# Get token price
curl "https://deep-index.moralis.io/api/v2.2/erc20/0x6B175474E89094C44Da98b954EedeAC495271d0F/price?chain=0x1" \
  -H "X-API-Key: YOUR_API_KEY"

# Get wallet token balances
curl "https://deep-index.moralis.io/api/v2.2/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/erc20?chain=0x1" \
  -H "X-API-Key: YOUR_API_KEY"
```

## Supported Chains

**EVM (40+ chains):** Ethereum (0x1), Polygon (0x89), BSC (0x38), Arbitrum (0xa4b1), Optimism (0xa), Base (0x2105), Avalanche (0xa86a), and more

**Solana:** Mainnet, Devnet

> See [SupportedApisAndChains](rules/SupportedApisAndChains.md) for complete list of supported APIs and chains

## Reference Documentation

- [ApiResponseCodes](rules/ApiResponseCodes.md) - Common response formats, status codes, and field descriptions

## See Also

- Endpoint reference: See individual `rules/*.md` files for detailed documentation
- Streams API: @moralis-streams-api for real-time events
