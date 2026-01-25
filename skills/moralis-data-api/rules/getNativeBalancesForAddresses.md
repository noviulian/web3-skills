# Get native balance for a set of wallets

Retrieve native token balances (e.g. ETH) for one or many wallet addresses in single request.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/wallets/balances`

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | No | The chain to query | \`eth\` |
| to_block | number | No | The block number on which the balances should be checked | - |
| wallet_addresses | array | Yes | The addresses to get metadata for | - |

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/wallets/balances?chain=eth" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
