# Get snipers by pair address.

Get all snipers.

## Method

GET

## Base URL

`https://solana-gateway.moralis.io`

## Path

`/token/:network/pairs/:pairAddress/snipers`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| network | string | Yes | The network to query | - |
| pairAddress | string | Yes | The address of the pair to query | \`Czfq3xZZDmsdGdUyrNLtRhGc47cXcZtLG4crryfu44zE\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| blocksAfterCreation | number | No | - | - |

## Example (curl)

```bash
curl -X GET "https://solana-gateway.moralis.io/token/:network/pairs/Czfq3xZZDmsdGdUyrNLtRhGc47cXcZtLG4crryfu44zE/snipers" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
