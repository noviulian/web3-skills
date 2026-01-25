# Get all swap related transactions (buy, sell)

Get all swap related transactions (buy, sell) for a specific token address.

## Method

GET

## Base URL

`https://solana-gateway.moralis.io`

## Path

`/token/:network/:address/swaps`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| network | string | Yes | The network to query | - |
| address | string | Yes | The address to query | \`So11111111111111111111111111111111111111112\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| limit | number | No | The limit per page | - |
| cursor | string | No | The cursor to the next page | - |
| fromDate | string | No | The starting date (format in seconds or datestring accepted by momentjs) | - |
| toDate | string | No | The ending date (format in seconds or datestring accepted by momentjs) | - |
| order | string | No | The order of the results, in ascending (ASC) or descending (DESC). | \`DESC\` |
| transactionTypes | string | No | Transaction types to fetch. Possible values: 'buy','sell' or both separated by comma | \`buy,sell\` |

## Cursor/Pagination

- **limit**: The limit per page
- **cursor**: The cursor to the next page

The response includes a **cursor** field for pagination. Use this cursor in the next request to get the next page of results.

## Example (curl)

```bash
curl -X GET "https://solana-gateway.moralis.io/token/:network/So11111111111111111111111111111111111111112/swaps?order=DESC&transactionTypes=buy%2Csell" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
