# Get metadata for multiple NFT contracts

Retrieve metadata (name, symbol) for up to 25 NFT contracts in one call. Also returns off-chain metadata, floor prices and more where available.

## Method

POST

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/nft/metadata`

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | No | The chain to query | \`eth\` |
| include_prices | boolean | No | Should NFT last sale prices be included in the result? | - |

## Body


## Example (curl)

```bash
curl -X POST "https://deep-index.moralis.io/api/v2.2/nft/metadata?chain=eth" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{}'
```
