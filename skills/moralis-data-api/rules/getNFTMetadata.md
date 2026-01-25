# Get NFT metadata

Fetch metadata for a specific NFT. Includes on-chain metadata as well as off-chain metadata, floor prices, rarity and more where available.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/nft/:address/:token_id`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| address | string | Yes | The address of the NFT contract | \`0x524cab2ec69124574082676e6f654a18df49a048\` |
| token_id | string | Yes | The ID of the token | \`1\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | No | The chain to query | \`eth\` |
| format | string | No | The format of the token ID | \`decimal\` |
| normalizeMetadata | boolean | No | Should normalized metadata be returned? | - |
| media_items | boolean | No | Should preview media data be returned? | - |
| include_prices | boolean | No | Should NFT last sale prices be included in the result? | - |

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/nft/0x524cab2ec69124574082676e6f654a18df49a048/1?chain=eth&format=decimal" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
