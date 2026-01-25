# Get all swap related transactions (buy, sell) for a specific wallet address.

Get all swap related transactions (buy, sell) for a specific wallet address.

## Method

GET

## Base URL

`https://solana-gateway.moralis.io`

## Path

`/account/:network/:address/swaps`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| network | string | Yes | The network to query | - |
| address | string | Yes | The address to query | \`kXB7FfzdrfZpAZEW3TZcp8a8CwQbsowa6BdfAHZ4gVs\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| limit | number | No | The limit per page | - |
| cursor | string | No | The cursor to the next page | - |
| order | string | No | The order of items | - |
| fromDate | string | No | The starting date (format in seconds or datestring accepted by momentjs) | - |
| toDate | string | No | The ending date (format in seconds or datestring accepted by momentjs) | - |
| transactionTypes | string | No | Transaction types to fetch. Possible values: 'buy','sell' or both separated by comma | \`buy,sell\` |
| tokenAddress | string | No | Token address to get transactions for | - |

## Cursor/Pagination

- **limit**: The limit per page
- **cursor**: The cursor to the next page

The response includes a **cursor** field for pagination. Use this cursor in the next request to get the next page of results.

## Example (curl)

```bash
curl -X GET "https://solana-gateway.moralis.io/account/:network/kXB7FfzdrfZpAZEW3TZcp8a8CwQbsowa6BdfAHZ4gVs/swaps?transactionTypes=buy%2Csell" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
