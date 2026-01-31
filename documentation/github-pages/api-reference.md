---
layout: default
title: API Reference
---

# API Reference

The Moralis API Skills provide comprehensive access to Web3 blockchain data through REST APIs. All endpoints are documented in individual rule files within each skill.

## Skills Overview

| Skill                | Endpoints | EVM | Solana | Description                                                                                    |
| -------------------- | --------- | --- | ------ | ------------------------------------------------------------------------------------------------ |
| **Moralis Data API** | 136       | ✅  | ✅     | Wallets, tokens, NFTs, DeFi, entity, price, blockchain, discovery                                |
| **Moralis Streams API** | 20    | ✅  | ❌     | Real-time blockchain event monitoring with webhooks                                              |

## Data API Endpoints (136 total)

### Wallet (16 endpoints)

Balances, tokens, NFTs, transaction history, profitability, and net worth data.

| Endpoint                                                                | Description                                              |
| ----------------------------------------------------------------------- | -------------------------------------------------------- |
| [getNativeBalance](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getNativeBalance.md)                           | Get native balance by wallet                             |
| [getNativeBalancesForAddresses](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getNativeBalancesForAddresses.md) | Get native balance for a set of wallets                  |
| [getWalletActiveChains](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getWalletActiveChains.md)                 | Get active chains by wallet address                      |
| [getWalletApprovals](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getWalletApprovals.md)                       | Get ERC20 approvals by wallet                            |
| [getWalletHistory](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getWalletHistory.md)                           | Get the complete decoded transaction history of a wallet |
| [getWalletNetWorth](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getWalletNetWorth.md)                         | Get wallet net worth                                     |
| [getWalletNFTCollections](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getWalletNFTCollections.md)             | Get NFT collections by wallet address                    |
| [getWalletNFTs](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getWalletNFTs.md)                                 | Get NFTs by wallet address                               |
| [getWalletNFTTransfers](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getWalletNFTTransfers.md)                 | Get NFT Transfers by wallet address                      |
| [getWalletProfitability](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getWalletProfitability.md)               | Get detailed profit and loss by wallet address           |
| [getWalletProfitabilitySummary](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getWalletProfitabilitySummary.md) | Get profit and loss summary by wallet address            |
| [getWalletStats](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getWalletStats.md)                               | Get summary stats by wallet address                      |
| [getWalletTokenBalancesPrice](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getWalletTokenBalancesPrice.md)     | Get token balances with prices by wallet address         |
| [getWalletTokenTransfers](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getWalletTokenTransfers.md)             | Get ERC20 token transfers by wallet address              |
| [getWalletTransactions](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getWalletTransactions.md)                 | Get native transactions by wallet                        |
| [getWalletTransactionsVerbose](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getWalletTransactionsVerbose.md)   | Get decoded transactions by wallet                       |

### Token (24 endpoints)

Token prices, metadata, pairs, DEX swaps, analytics, security scores, and sniper detection.

| Endpoint                                                                 | Description                                          |
| ------------------------------------------------------------------------ | ---------------------------------------------------- |
| [getAggregatedTokenPairStats](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getAggregatedTokenPairStats__evm.md) | Get aggregated token pair statistics by address      |
| [getHistoricalTokenScore](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getHistoricalTokenScore.md)              | Get historical token score by token address          |
| [getMultipleTokenAnalytics](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getMultipleTokenAnalytics.md)          | Get token analytics for a list of token addresses    |
| [getPairAddress](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getPairAddress.md)                                | Get DEX token pair address                           |
| [getPairReserves](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getPairReserves.md)                              | Get DEX token pair reserves                          |
| [getPairStats](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getPairStats__evm.md)                               | Get stats by pair address                            |
| [getSnipersByPairAddress](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getSnipersByPairAddress__evm.md)         | Get snipers by pair address                          |
| [getSwapsByPairAddress](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getSwapsByPairAddress__evm.md)             | Get swap transactions by pair address                |
| [getSwapsByTokenAddress](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getSwapsByTokenAddress__evm.md)           | Get swap transactions by token address               |
| [getSwapsByWalletAddress](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getSwapsByWalletAddress__evm.md)         | Get swap transactions by wallet address              |
| [getTimeSeriesTokenAnalytics](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getTimeSeriesTokenAnalytics.md)      | Retrieve timeseries trading stats by token addresses |
| [getTokenAnalytics](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getTokenAnalytics.md)                          | Get token analytics by token address                 |
| [getTokenBondingStatus](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getTokenBondingStatus__evm.md)             | Get the token bonding status                         |
| [getTokenCategories](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getTokenCategories.md)                        | Get ERC20 token categories                           |
| [getTokenHolders](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getTokenHolders__evm.md)                         | Get a holders summary by token address               |
| [getTokenMetadata](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getTokenMetadata__evm.md)                       | Get ERC20 token metadata by contract                 |
| [getTokenMetadataBySymbol](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getTokenMetadataBySymbol.md)            | Get ERC20 token metadata by symbols                  |
| [getTokenOwners](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getTokenOwners.md)                                | Get ERC20 token owners by contract                   |
| [getTokenPairs](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getTokenPairs__evm.md)                             | Get token pairs by address                           |
| [getTokenScore](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getTokenScore.md)                                  | Get token score by token address                     |
| [getTokenStats](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getTokenStats.md)                                  | Get ERC20 token stats                                |
| [getTokenTransfers](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getTokenTransfers.md)                          | Get ERC20 token transfers by contract address        |

### NFT (21 endpoints)

NFT metadata, transfers, traits, rarity, floor prices, and trades.

| Endpoint                                                                                    | Description                                |
| ------------------------------------------------------------------------------------------- | ------------------------------------------ |
| [getContractNFTs](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getContractNFTs.md)                                                 | Get NFTs by contract address               |
| [getMultipleNFTs](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getMultipleNFTs.md)                                                 | Get Metadata for NFTs                      |
| [getNFTBulkContractMetadata](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getNFTBulkContractMetadata.md)                           | Get metadata for multiple NFT contracts    |
| [getNFTByContractTraits](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getNFTByContractTraits.md)                                   | Get NFTs by traits                         |
| [getNFTCollectionStats](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getNFTCollectionStats.md)                                     | Get summary stats by NFT collection        |
| [getNFTContractMetadata](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getNFTContractMetadata.md)                                   | Get NFT collection metadata                |
| [getNFTContractSalePrices](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getNFTContractSalePrices.md)                               | Get NFT sale prices by collection          |
| [getNFTContractTransfers](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getNFTContractTransfers.md)                                 | Get NFT transfers by contract address      |
| [getNFTFloorPriceByContract](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getNFTFloorPriceByContract.md)                           | Get NFT floor price by contract            |
| [getNFTFloorPriceByToken](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getNFTFloorPriceByToken.md)                                 | Get NFT floor price by token               |
| [getNFTHistoricalFloorPriceByContract](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getNFTHistoricalFloorPriceByContract.md)       | Get historical NFT floor price by contract |
| [getNFTMetadata](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getNFTMetadata__evm.md)                                              | Get NFT metadata                           |
| [getNFTOwners](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getNFTOwners.md)                                                       | Get NFT owners by contract address         |
| [getNFTSalePrices](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getNFTSalePrices.md)                                               | Get NFT sale prices by token               |
| [getNFTTokenIdOwners](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getNFTTokenIdOwners.md)                                         | Get NFT owners by token ID                 |
| [getNFTTrades](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getNFTTrades.md)                                                       | Get NFT trades by collection               |
| [getNFTTradesByToken](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getNFTTradesByToken.md)                                         | Get NFT trades by token                    |
| [getNFTTradesByWallet](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getNFTTradesByWallet.md)                                       | Get NFT trades by wallet address           |
| [getNFTTraitsByCollection](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getNFTTraitsByCollection.md)                               | Get NFT traits by collection               |
| [getNFTTraitsByCollectionPaginate](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getNFTTraitsByCollectionPaginate.md)               | Get NFT traits by collection paginate      |
| [getNFTTransfers](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getNFTTransfers.md)                                                 | Get NFT transfers by token ID              |
| [getTopNFTCollectionsByMarketCap](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getTopNFTCollectionsByMarketCap.md)                 | Get top NFT collections by market cap      |

### DeFi (3 endpoints)

DeFi protocol positions, liquidity, and exposure data.

| Endpoint                                                          | Description                                          |
| ----------------------------------------------------------------- | ---------------------------------------------------- |
| [getDefiPositionsByProtocol](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getDefiPositionsByProtocol.md) | Get detailed DeFi positions by protocol for a wallet |
| [getDefiPositionsSummary](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getDefiPositionsSummary.md)       | Get DeFi positions of a wallet                       |
| [getDefiSummary](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getDefiSummary.md)                         | Get the DeFi summary of a wallet                     |

### Entity (2 endpoints)

Labeled addresses including exchanges, funds, protocols, and whales.

| Endpoint                                            | Description              |
| --------------------------------------------------- | ------------------------ |
| [getEntity](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getEntity.md)                     | Get Entity Details By Id |
| [getEntityCategories](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getEntityCategories.md) | Get Entity Categories    |

### Price (3 endpoints)

Token and NFT prices, OHLCV candlestick data.

| Endpoint                                                       | Description                     |
| -------------------------------------------------------------- | ------------------------------- |
| [getMultipleTokenPrices](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getMultipleTokenPrices__evm.md) | Get Multiple ERC20 token prices |
| [getPairPrice](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getPairPrice.md)                          | Get DEX token pair price        |
| [getTokenPrice](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getTokenPrice__evm.md)                   | Get ERC20 token price           |

### Blockchain (5 endpoints)

Blocks, transactions, and date-to-block conversion.

| Endpoint                                                | Description                     |
| ------------------------------------------------------- | ------------------------------- |
| [getBlock](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getBlock.md)                           | Get block by hash               |
| [getDateToBlock](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getDateToBlock.md)               | Get block by date               |
| [getLatestBlockNumber](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getLatestBlockNumber.md)   | Get latest block number         |
| [getTransaction](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getTransaction.md)               | Get transaction by hash         |
| [getTransactionVerbose](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getTransactionVerbose.md) | Get decoded transaction by hash |

### Discovery (15 endpoints)

Trending tokens, market movers, and token discovery.

| Endpoint                                                                                | Description                                                  |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| [getDiscoveryToken](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getDiscoveryToken.md)                                         | Get token details                                            |
| [getTimeSeriesVolume](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getTimeSeriesVolume.md)                                     | Retrieve timeseries trading stats by chain                   |
| [getTimeSeriesVolumeByCategory](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getTimeSeriesVolumeByCategory.md)                 | Retrieve timeseries trading stats by category                |
| [getTopCryptoCurrenciesByMarketCap](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getTopCryptoCurrenciesByMarketCap.md)         | Get top crypto currencies by market cap                      |
| [getTopCryptoCurrenciesByTradingVolume](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getTopCryptoCurrenciesByTradingVolume.md) | Get top crypto currencies by trading volume                  |
| [getTopERC20TokensByMarketCap](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getTopERC20TokensByMarketCap.md)                   | Get top ERC20 tokens by market cap                           |
| [getTopERC20TokensByPriceMovers](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getTopERC20TokensByPriceMovers.md)               | Get top ERC20 tokens by price movements (winners and losers) |
| [getTopGainersTokens](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getTopGainersTokens.md)                                     | Get tokens with top gainers                                  |
| [getTopLosersTokens](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getTopLosersTokens.md)                                       | Get tokens with top losers                                   |
| [getTopProfitableWalletPerToken](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getTopProfitableWalletPerToken.md)               | Get top traders for a given ERC20 token                      |
| [getTrendingTokens](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getTrendingTokens.md)                                         | Get trending tokens                                          |
| [getVolumeStatsByCategory](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getVolumeStatsByCategory.md)                           | Get trading stats by categories                              |
| [getVolumeStatsByChain](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getVolumeStatsByChain.md)                                 | Get trading stats by chain                                   |

### Other (1 endpoint)

Utility endpoints for address resolution and token search.

| Endpoint                                                                   | Description                                                                      |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| [searchTokens](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/searchTokens.md)                                      | Search for tokens based on contract address, pair address, token name or symbol  |

### Solana Endpoints (34 total)

Solana-specific endpoints and EVM endpoints that support Solana via the `chain=solana` parameter.

| Endpoint                                                                      | Description                                                                     |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| [balance](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/balance__solana.md)                                           | Gets native balance owned by the given address                                  |
| [getSPL](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getSPL__solana.md)                                             | Gets token balances owned by the given address                                  |
| [getNFTs](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getNFTs__solana.md)                                           | Gets NFTs owned by the given address                                            |
| [getPortfolio](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-data-api/rules/getPortfolio__solana.md)                                 | Gets the portfolio of the given address                                         |

## Streams API Endpoints (20 total)

Real-time blockchain event monitoring with webhook delivery.

### Stream Management (18 endpoints)

Create, update, delete, and manage streams.

| Endpoint | Description |
|----------|-------------|
| [AddAddressToStream](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-streams-api/rules/AddAddressToStream.md) | Add address to stream |
| [CreateStream](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-streams-api/rules/CreateStream.md) | Create stream |
| [DeleteAddressFromStream](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-streams-api/rules/DeleteAddressFromStream.md) | Delete address from stream |
| [DeleteStream](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-streams-api/rules/DeleteStream.md) | Delete stream |
| [DuplicateStream](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-streams-api/rules/DuplicateStream.md) | Duplicate stream |
| [GetAddresses](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-streams-api/rules/GetAddresses.md) | Get addresses by stream |
| [GetHistory](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-streams-api/rules/GetHistory.md) | Get history |
| [GetLogs](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-streams-api/rules/GetLogs.md) | Get logs |
| [GetSettings](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-streams-api/rules/GetSettings.md) | Get project settings |
| [GetStats](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-streams-api/rules/GetStats.md) | Get project stats |
| [GetStatsByStreamId](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-streams-api/rules/GetStatsByStreamId.md) | Get project stats by Stream ID |
| [GetStream](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-streams-api/rules/GetStream.md) | Get a specific stream |
| [GetStreamBlockDataByNumber](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-streams-api/rules/GetStreamBlockDataByNumber.md) | Get webhook data returned on the block number with provided stream config |
| [GetStreamBlockDataToWebhookByNumber](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-streams-api/rules/GetStreamBlockDataToWebhookByNumber.md) | Send webhook based on a specific block number using stream config and addresses |
| [GetStreams](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-streams-api/rules/GetStreams.md) | Get streams |
| [ReplaceAddressFromStream](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-streams-api/rules/ReplaceAddressFromStream.md) | Replaces address from stream |
| [UpdateStream](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-streams-api/rules/UpdateStream.md) | Update stream |
| [UpdateStreamStatus](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-streams-api/rules/UpdateStreamStatus.md) | Update stream status |

### Status & Settings (1 endpoint)

Configure project-level settings.

| Endpoint | Description |
|----------|-------------|
| [SetSettings](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-streams-api/rules/SetSettings.md) | Set project settings |

### History & Analytics (1 endpoint)

Replay historical events.

| Endpoint | Description |
|----------|-------------|
| [ReplayHistory](https://github.com/novnski/moralis-api-skills/blob/main/skills/moralis-streams-api/rules/ReplayHistory.md) | Replay history |

### Stream Types

| Type | Description |
|------|-------------|
| `tx` | Native transactions |
| `log` | Contract event logs |
| `erc20transfer` | ERC20 token transfers |
| `erc20approval` | ERC20 approvals |
| `nfttransfer` | NFT transfers |
| `internalTx` | Internal transactions |

## Common Parameters

### Chain

**Default Behavior:** For EVM addresses without a specified chain, the API defaults to Ethereum (`chain=0x1`). Specify a different chain if needed.

For EVM endpoints, the `chain` parameter accepts both hex strings and common names:

- `0x1` or `eth` (Ethereum Mainnet) - **default**
- `0x89` or `polygon` (Polygon Mainnet)
- `0x38` or `bsc` (BNB Smart Chain)
- ... and many more.

> **Tip:** Using hex values (e.g., `0x1`) saves tokens as the skill doesn't need to normalize the chain name.

### Address

- **EVM:** `0x` prefixed hexadecimal string (42 characters).
- **Solana:** Base58 encoded string (32-44 characters).

## Full Documentation

See individual skill `rules/` directories for complete endpoint documentation:

- [Data API Rules](https://github.com/novnski/moralis-api-skills/tree/main/skills/moralis-data-api/rules)
- [Streams API Rules](https://github.com/novnski/moralis-api-skills/tree/main/skills/moralis-streams-api/rules)
