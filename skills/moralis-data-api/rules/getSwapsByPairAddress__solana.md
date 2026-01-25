# Get all swap related transactions (buy, sell, add liquidity & remove liquidity)

Get all swap related transactions (buy, sell, add liquidity & remove liquidity) for a specific pair address.

## Method

GET

## Base URL

`https://solana-gateway.moralis.io`

## Path

`/token/:network/pairs/:pairAddress/swaps`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| network | string | Yes | The network to query | - |
| pairAddress | string | Yes | The address of the pair to query | \`Czfq3xZZDmsdGdUyrNLtRhGc47cXcZtLG4crryfu44zE\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| limit | number | No | The limit per page | - |
| cursor | string | No | The cursor to the next page | - |
| order | string | No | The order of items | - |
| fromDate | string | No | The starting date (format in seconds or datestring accepted by momentjs) | - |
| toDate | string | No | The ending date (format in seconds or datestring accepted by momentjs) | - |
| transactionTypes | string | No | Transaction types to fetch. Possible values: 'buy', 'sell', 'addLiquidity' or 'removeLiquidity' separated by comma | \`buy,sell,addLiquidity,removeLiquidity\` |

## Cursor/Pagination

- **limit**: The limit per page
- **cursor**: The cursor to the next page

The response includes a **cursor** field for pagination. Use this cursor in the next request to get the next page of results.

## Example (curl)

```bash
curl -X GET "https://solana-gateway.moralis.io/token/:network/pairs/Czfq3xZZDmsdGdUyrNLtRhGc47cXcZtLG4crryfu44zE/swaps?transactionTypes=buy%2Csell%2CaddLiquidity%2CremoveLiquidity" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
