# Resync NFT metadata

Update an NFT’s metadata, either from its current token URI or a new one. Choose sync for immediate results or async for background processing.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/nft/:address/:token_id/metadata/resync`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| address | string | Yes | The address of the NFT contract | \`0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB\` |
| token_id | string | Yes | The ID of the token | \`1\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | No | The chain to query | \`eth\` |
| flag | string | No | The type of resync to operate | \`uri\` |
| mode | string | No | To define the behaviour of the endpoint | \`sync\` |

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/nft/0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB/1/metadata/resync?chain=eth&flag=uri&mode=sync" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
