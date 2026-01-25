# Get token price

Gets the token price (usd and native) for a given contract address and network.

## Method

GET

## Base URL

`https://solana-gateway.moralis.io`

## Path

`/token/:network/:address/price`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| network | string | Yes | The network to query | - |
| address | string | Yes | The address to query | \`So11111111111111111111111111111111111111112\` |

## Example (curl)

```bash
curl -X GET "https://solana-gateway.moralis.io/token/:network/So11111111111111111111111111111111111111112/price" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
