# Get token holders overtime for a given tokens

## Method

GET

## Base URL

`https://solana-gateway.moralis.io`

## Path

`/token/:network/holders/:address/historical`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| network | string | Yes | The network to query | - |
| address | string | Yes | The address to query | \`6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| cursor | string | No | The cursor to the next page | - |
| timeFrame | string | Yes | The interval of the holders data | - |
| fromDate | string | Yes | The starting date (format in seconds or datestring accepted by momentjs) | - |
| toDate | string | Yes | The ending date (format in seconds or datestring accepted by momentjs) | - |
| limit | number | No | The limit per page depending on the plan | - |

## Cursor/Pagination

- **limit**: The limit per page depending on the plan
- **cursor**: The cursor to the next page

The response includes a **cursor** field for pagination. Use this cursor in the next request to get the next page of results.

## Example (curl)

```bash
curl -X GET "https://solana-gateway.moralis.io/token/:network/holders/6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN/historical" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
