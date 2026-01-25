# Resync NFT Contract

Initiate indexing for a non-synced NFT contract to make its data available.

## Method

PUT

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/nft/:address/sync`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| address | string | Yes | The address of the NFT contract | \`0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | No | The chain to query | \`eth\` |

## Example (curl)

```bash
curl -X PUT "https://deep-index.moralis.io/api/v2.2/nft/0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB/sync?chain=eth" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
