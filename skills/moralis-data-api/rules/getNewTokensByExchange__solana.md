# Get new tokens by exchange

Get the list of new tokens by given exchange.

## Method

GET

## Base URL

`https://solana-gateway.moralis.io`

## Path

`/token/:network/exchange/:exchange/new`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| network | string | Yes | The network to query | - |
| exchange | string | Yes | - | - |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| cursor | string | No | The cursor to the next page | - |
| limit | number | No | The limit per page | - |

## Cursor/Pagination

- **limit**: The limit per page
- **cursor**: The cursor to the next page

The response includes a **cursor** field for pagination. Use this cursor in the next request to get the next page of results.

## Example (curl)

```bash
curl -X GET "https://solana-gateway.moralis.io/token/:network/exchange/:exchange/new" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
