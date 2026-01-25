# Get the global metadata for a given contract

Gets the contract level metadata (mint, standard, name, symbol, metaplex) for the given contract

## Method

GET

## Base URL

`https://solana-gateway.moralis.io`

## Path

`/nft/:network/:address/metadata`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| network | string | Yes | The network to query | - |
| address | string | Yes | The address to query | \`So11111111111111111111111111111111111111112\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| mediaItems | boolean | No | Should return media items | - |

## Example (curl)

```bash
curl -X GET "https://solana-gateway.moralis.io/nft/:network/So11111111111111111111111111111111111111112/metadata" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
