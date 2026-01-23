# Solana NFT API Endpoints

## Quick Decision Guide

**User asks about...** → **Use this endpoint**

| User Question | Endpoint | Example |
|---------------|----------|---------|
| "Solana NFT metadata?" | `/nft/:network/:address` | NFT info |
| "Wallet NFTs?" | `/account/:network/:address/nft` | All wallet NFTs |
| "NFT metadata?" | `/nft/:network/:address/metadata` | Metadata only |
| "NFT owners?" | `/nft/:network/:address/owners` | Current holders |
| "NFT transfers?" | `/nft/:network/:address/transfers` | Transfer history |
| "NFT collections?" | `/nft/collections/:network` | All collections |
| "NFT by mint?" | `/nft/:network/mint/:address` | By mint address |
| "Metaplex metadata?" | `/nft/:network/:address/metaplex` | Metaplex data |

## Key Endpoint Patterns

- **NFT-specific:** `/nft/:network/:address/*` (NFT operations)
- **Wallet-specific:** `/account/:network/:address/*` (wallet operations)
- **Mint-specific:** `/nft/:network/mint/:address` (by mint address)
- **Network parameter:** `mainnet` or `devnet`
- **Metaplex integration:** Most NFTs use Metaplex standard

---

## Get NFT by Address
- **Endpoint:** `GET /nft/:network/:address`
- **Description:** Get NFT metadata
- **Use this endpoint when:** User asks "Solana NFT", "NFT metadata", "show me this NFT", "NFT info"
- **Networks:** mainnet, devnet

## Get NFTs by Wallet
- **Endpoint:** `GET /account/:network/:address/nft`
- **Description:** Get all NFTs owned by wallet
- **Use this endpoint when:** User asks "wallet NFTs", "what NFTs does this wallet own", "Solana NFT portfolio"
- **Networks:** mainnet, devnet
- **Params:** `limit`, `cursor`

## Get NFT Metadata
- **Endpoint:** `GET /nft/:network/:address/metadata`
- **Description:** Get NFT metadata
- **Use this endpoint when:** User asks "NFT metadata", "metadata only", "token metadata"
- **Networks:** mainnet, devnet

## Get NFT Owners
- **Endpoint:** `GET /nft/:network/:address/owners`
- **Description:** Get owners of an NFT
- **Use this endpoint when:** User asks "who owns this NFT", "NFT owners", "current holder"
- **Networks:** mainnet, devnet
- **Params:** `limit`, `cursor`

## Get NFT Transfers
- **Endpoint:** `GET /nft/:network/:address/transfers`
- **Description:** Get transfer history
- **Use this endpoint when:** User asks "NFT transfers", "transfer history", "who transferred this NFT"
- **Networks:** mainnet, devnet
- **Params:** `limit`, `cursor`

## Get NFT Collections
- **Endpoint:** `GET /nft/collections/:network`
- **Description:** Get NFT collections
- **Use this endpoint when:** User asks "NFT collections", "Solana collections", "list collections"
- **Networks:** mainnet, devnet
- **Params:** `limit`, `cursor`

## Get NFT by Mint Address
- **Endpoint:** `GET /nft/:network/mint/:address`
- **Description:** Get NFT by mint address
- **Use this endpoint when:** User asks "NFT by mint", "mint address", "get NFT from mint"
- **Networks:** mainnet, devnet

## Get Metaplex Data
- **Endpoint:** `GET /nft/:network/:address/metaplex`
- **Description:** Get Metaplex metadata
- **Use this endpoint when:** User asks "Metaplex metadata", "Metaplex data", "metadata standard"
- **Networks:** mainnet, devnet
