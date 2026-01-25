# Get candlesticks for a pair address

Gets the candlesticks for a specific pair address

## Method

GET

## Base URL

`https://solana-gateway.moralis.io`

## Path

`/token/:network/pairs/:address/ohlcv`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| network | string | Yes | The network to query | - |
| address | string | Yes | The address to query | \`So11111111111111111111111111111111111111112\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| cursor | string | No | The cursor to the next page | - |
| fromDate | string | Yes | The starting date (format in seconds or datestring accepted by momentjs) | - |
| toDate | string | Yes | The ending date (format in seconds or datestring accepted by momentjs) | - |
| timeframe | string | Yes | The interval of the candle stick | - |
| currency | string | Yes | The currency format | - |
| limit | number | No | The limit per page | - |

## Cursor/Pagination

- **limit**: The limit per page
- **cursor**: The cursor to the next page

The response includes a **cursor** field for pagination. Use this cursor in the next request to get the next page of results.

## Example (curl)

```bash
curl -X GET "https://solana-gateway.moralis.io/token/:network/pairs/So11111111111111111111111111111111111111112/ohlcv" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
