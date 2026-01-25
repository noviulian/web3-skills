# Get Token metadata

Get the global token metadata for a given network and contract (mint, standard, name, symbol, metaplex).

## Method

GET

## Base URL

`https://solana-gateway.moralis.io`

## Path

`/token/:network/:address/metadata`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| network | string | Yes | The network to query | - |
| address | string | Yes | The address to query | \`So11111111111111111111111111111111111111112\` |

## Example (curl)

```bash
curl -X GET "https://solana-gateway.moralis.io/token/:network/So11111111111111111111111111111111111111112/metadata" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
