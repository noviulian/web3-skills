# Get OHLCV by pair address

Retrieve OHLCV (Open, High, Low, Close, Volume) candlestick data for a token pair.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/pairs/:address/ohlcv`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| address | string | Yes | The pair address | \`0xa43fe16908251ee70ef74718545e4fe6c5ccec9f\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | No | The chain to query | \`eth\` |
| timeframe | string | Yes | The timeframe | \`1h\` |
| currency | string | Yes | The currency | \`usd\` |
| fromDate | string | Yes | The starting date (format in seconds or datestring accepted by momentjs)
* Provide the param 'fromBlock' or 'fromDate'
* If 'fromDate' and 'fromBlock' are provided, 'fromBlock' will be used.
 | \`2025-01-01T10:00:00.000\` |
| toDate | string | Yes | The ending date (format in seconds or datestring accepted by momentjs)
* Provide the param 'toBlock' or 'toDate'
* If 'toDate' and 'toBlock' are provided, 'toBlock' will be used.
 | \`2025-01-02T10:00:00.000\` |
| limit | number | No | The number of results to return | - |
| cursor | string | No | The cursor returned in the previous response (used for getting the next page) | - |

## Cursor/Pagination

- **limit**: The number of results to return
- **cursor**: The cursor returned in the previous response (used for getting the next page)

The response includes a **cursor** field for pagination. Use this cursor in the next request to get the next page of results.

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/pairs/0xa43fe16908251ee70ef74718545e4fe6c5ccec9f/ohlcv?chain=eth&timeframe=1h&currency=usd&fromDate=2025-01-01T10%3A00%3A00.000&toDate=2025-01-02T10%3A00%3A00.000" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
