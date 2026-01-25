# Get multiple token metadata

Get multiple global token metadata for a given network and contract (mint, standard, name, symbol, metaplex).

## Method

POST

## Base URL

`https://solana-gateway.moralis.io`

## Path

`/token/:network/metadata`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| network | string | Yes | The network to query | - |

## Body


## Example (curl)

```bash
curl -X POST "https://solana-gateway.moralis.io/token/:network/metadata" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{}'
```
