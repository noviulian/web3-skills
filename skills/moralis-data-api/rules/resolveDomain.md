# Resolve Unstoppable domain

Map an Unstoppable domain to its corresponding blockchain address.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/resolve/:domain`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| domain | string | Yes | The domain to be resolved | \`brad.crypto\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| currency | string | No | The currency to query | \`eth\` |

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/resolve/brad.crypto?currency=eth" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
