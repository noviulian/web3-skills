# Get ERC20 token metadata by symbols

Fetch metadata (name, symbol, decimals, logo) for a list of ERC20 token symbols.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/erc20/metadata/symbols`

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | No | The chain to query | \`eth\` |
| symbols | array | Yes | The symbols to get metadata for | - |

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/erc20/metadata/symbols?chain=eth" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
