# Get trending tokens

List top tokens trending based on trading activity, volume, liquidity and more. By default this returns cross-chain results, including Solana. Optionally filter by `chain` for single chain results.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/tokens/trending`

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | No | The chain to query | \`eth\` |
| limit | number | No | The desired page size of the result. | - |

## Cursor/Pagination

- **limit**: The desired page size of the result.

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/tokens/trending?chain=eth" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
