# Get token pairs by address

List supported trading pairs for a specific ERC20 token. Each pair returned includes price, liquidity, volume and more.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/erc20/:token_address/pairs`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| token_address | string | Yes | The address of the token | \`0x6982508145454ce325ddbe47a25d4ec3d2311933\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | Yes | The chain to query | \`eth\` |
| limit | number | No | The number of results to return | - |
| cursor | string | No | The cursor returned in the previous response (used for getting the next page) | - |

## Cursor/Pagination

- **limit**: The number of results to return
- **cursor**: The cursor returned in the previous response (used for getting the next page)

The response includes a **cursor** field for pagination. Use this cursor in the next request to get the next page of results.

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/erc20/0x6982508145454ce325ddbe47a25d4ec3d2311933/pairs?chain=eth" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
