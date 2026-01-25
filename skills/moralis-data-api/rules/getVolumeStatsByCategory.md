# Get trading stats by categories

Access volume, buyers, sellers and transaction stats for a blockchain, grouped by category. Filter by `chain`.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/volume/categories`

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | No | The chain to query | \`eth\` |

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/volume/categories?chain=eth" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
