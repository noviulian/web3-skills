# Search for tokens based on contract address, pair address, token name or token symbol.

Search for tokens using their contract address, pair address, name, or symbol. Cross-chain by default with support to filter by `chains`. Additional options to `sortBy` various metrics, such as market cap, liquidity or volume.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/tokens/search`

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chains | string | No | The chains to query | - |
| query | string | Yes | The query to search | \`pepe\` |
| limit | number | No | The desired page size of the result. | - |
| isVerifiedContract | boolean | No | True to include only verified contracts | - |
| sortBy | string | No | Sort by volume1hDesc, volume24hDesc, liquidityDesc, marketCapDesc | \`volume1hDesc\` |
| boostVerifiedContracts | boolean | No | True to boost verified contracts | - |

## Cursor/Pagination

- **limit**: The desired page size of the result.

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/tokens/search?query=pepe&sortBy=volume1hDesc" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
