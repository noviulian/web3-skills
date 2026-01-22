# Solana NFT API Endpoints

## Get NFT by Address
- **Endpoint:** `GET /nft/:network/:address`
- **Description:** Get NFT metadata
- **Networks:** mainnet, devnet

## Get NFTs by Wallet
- **Endpoint:** `GET /account/:network/:address/nft`
- **Description:** Get all NFTs owned by wallet
- **Networks:** mainnet, devnet
- **Params:** `limit`, `cursor`

## Get NFT Metadata
- **Endpoint:** `GET /nft/:network/:address/metadata`
- **Description:** Get NFT metadata
- **Networks:** mainnet, devnet

## Get NFT Owners
- **Endpoint:** `GET /nft/:network/:address/owners`
- **Description:** Get owners of an NFT
- **Networks:** mainnet, devnet
- **Params:** `limit`, `cursor`

## Get NFT Transfers
- **Endpoint:** `GET /nft/:network/:address/transfers`
- **Description:** Get transfer history
- **Networks:** mainnet, devnet
- **Params:** `limit`, `cursor`

## Get NFT Collections
- **Endpoint:** `GET /nft/collections/:network`
- **Description:** Get NFT collections
- **Networks:** mainnet, devnet
- **Params:** `limit`, `cursor`

## Get NFT by Mint Address
- **Endpoint:** `GET /nft/:network/mint/:address`
- **Description:** Get NFT by mint address
- **Networks:** mainnet, devnet

## Get Metaplex Data
- **Endpoint:** `GET /nft/:network/:address/metaplex`
- **Description:** Get Metaplex metadata
- **Networks:** mainnet, devnet
