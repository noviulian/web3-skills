# Review contracts

Classify contracts as spam or legitimate based on their characteristics.

## Method

POST

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/contracts-review`

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | No | The chain to query | \`eth\` |

## Body


## Example (curl)

```bash
curl -X POST "https://deep-index.moralis.io/api/v2.2/contracts-review?chain=eth" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{}'
```
