# Get ERC20 token metadata by contract

Retrieve metadata (name, symbol, decimals, logo) for an ERC20 token contract, as well as off-chain metadata, total supply, categories, logos, spam status and more.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/erc20/metadata`

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | No | The chain to query | \`eth\` |
| addresses | array | Yes | The addresses to get metadata for | - |

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/erc20/metadata?chain=eth" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
