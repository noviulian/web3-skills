# Get the summary of holders for a given token token.

## Method

GET

## Base URL

`https://solana-gateway.moralis.io`

## Path

`/token/:network/holders/:address`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| network | string | Yes | The network to query | - |
| address | string | Yes | The address to query | \`6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN\` |

## Example (curl)

```bash
curl -X GET "https://solana-gateway.moralis.io/token/:network/holders/6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
