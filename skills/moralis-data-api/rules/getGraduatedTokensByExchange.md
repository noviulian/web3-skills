# Get graduated tokens by exchange

List tokens that have completed bonding on a specific exchange. Currently only supports tama.meme on Ronin.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/erc20/exchange/:exchangeName/graduated`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| exchangeName | string | Yes | The name of the exchange | \`tama.meme\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | Yes | The chain to query | \`eth\` |
| limit | number | No | The maximum number of items to return | - |
| cursor | string | No | The cursor to use for pagination | - |

## Cursor/Pagination

- **limit**: The maximum number of items to return
- **cursor**: The cursor to use for pagination

The response includes a **cursor** field for pagination. Use this cursor in the next request to get the next page of results.

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/erc20/exchange/tama.meme/graduated?chain=eth" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
