# Get NFT floor price by token

Get the floor price for a specific NFT, defined by its contract and token ID. Refreshes every 30 minutes.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/nft/:address/:token_id/floor-price`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| address | string | Yes | The address of the NFT contract | \`0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d\` |
| token_id | string | Yes | The token ID of the NFT | \`2441\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | No | The chain to query | \`eth\` |

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/nft/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/2441/floor-price?chain=eth" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
