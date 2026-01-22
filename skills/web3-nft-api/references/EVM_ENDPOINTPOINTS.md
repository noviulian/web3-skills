# EVM NFT API Endpoints

## Get NFTs by Contract
- **Endpoint:** `GET /nft/:address`
- **Description:** Get all NFTs in a contract
- **Params:** `limit`, `cursor`, `format`

## Get NFT Metadata
- **Endpoint:** `GET /nft/:address/:tokenId`
- **Description:** Get metadata for a specific NFT
- **Params:** `format`

## Get NFT Transfers by Contract
- **Endpoint:** `GET /nft/:address/transfers`
- **Description:** Get transfer history for a contract
- **Params:** `limit`, `cursor`, `from`, `to`

## Get NFT Transfers by Wallet
- **Endpoint:** `GET /:address/nft/transfers`
- **Description:** Get NFT transfers for a wallet
- **Params:** `limit`, `cursor`, `from`, `to`

## Get NFT Owners
- **Endpoint:** `GET /nft/:address/owners`
- **Description:** Get current owners of NFTs in a contract
- **Params:** `limit`, `cursor`

## Get NFT Traits
- **Endpoint:** `GET /nft/:address/traits`
- **Description:** Get all traits for an NFT collection

## Get NFT Trades
- **Endpoint:** `GET /nft/:address/trades`
- **Description:** Get trade history for an NFT
- **Params:** `limit`, `cursor`, `from`, `to`

## Get NFT Collections by Wallet
- **Endpoint:** `GET /:address/nft/collections`
- **Description:** Get NFT collections owned by wallet
- **Params:** `limit`, `cursor`

## Get NFT Lowest Price
- **Endpoint:** `GET /nft/:address/lowestprice`
- **Description:** Get lowest price/floor for an NFT collection

## Search NFTs
- **Endpoint:** `GET /nft/search`
- **Description:** Search for NFT collections
- **Params:** `q`, `chain`, `limit`

## Get Top NFT Collections
- **Endpoint:** `GET /nft/collections/trending`
- **Description:** Get trending NFT collections
- **Params:** `chain`

## Get NFT Metadata from URI
- **Endpoint:** `GET /nft/resolve`
- **Description:** Resolve and fetch NFT metadata from URI
- **Params:** `uri`

## Get NFTs by Wallet
- **Endpoint:** `GET /:address/nft`
- **Description:** Get all NFTs owned by a wallet
- **Params:** `limit`, `cursor`, `format`

## Get Multiple NFTs
- **Endpoint:** `GET /nft/getMultiple`
- **Description:** Get metadata for multiple NFTs
- **Params:** `tokens`, `format`

## Get Contract Metadata
- **Endpoint:** `GET /nft/:address/metadata`
- **Description:** Get collection-level metadata
