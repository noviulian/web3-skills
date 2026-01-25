# Get timeseries holders data

Track changes in the holder base of an ERC20 token over time. Supports timeseries data for total holders as well as change metrics such as holder distribution and holder acquisition.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/erc20/:tokenAddress/holders/historical`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| tokenAddress | string | Yes | The token address | \`0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | No | The chain to query | \`eth\` |
| fromDate | string | Yes | The starting date (format in seconds or datestring accepted by momentjs)
 | \`2025-01-01T10:00:00\` |
| toDate | string | Yes | The ending date (format in seconds or datestring accepted by momentjs)
 | \`2025-02-01T11:00:00\` |
| limit | number | No | The number of results to return | - |
| cursor | string | No | The cursor returned in the previous response (used for getting the next page) | - |
| timeFrame | string | Yes | The time frame to group the data by | \`1d\` |

## Cursor/Pagination

- **limit**: The number of results to return
- **cursor**: The cursor returned in the previous response (used for getting the next page)

The response includes a **cursor** field for pagination. Use this cursor in the next request to get the next page of results.

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/erc20/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0/holders/historical?chain=eth&fromDate=2025-01-01T10%3A00%3A00&toDate=2025-02-01T11%3A00%3A00&timeFrame=1d" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
