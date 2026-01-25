# Get token price

Gets the token price (usd and native) for a given contract address and network.

## Method

POST

## Base URL

`https://solana-gateway.moralis.io`

## Path

`/token/:network/prices`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| network | string | Yes | The network to query | - |

## Body


## Example (curl)

```bash
curl -X POST "https://solana-gateway.moralis.io/token/:network/prices" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{}'
```
