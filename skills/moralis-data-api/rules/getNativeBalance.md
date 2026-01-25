# Get native balance by wallet

Check the native token balance (e.g. ETH) for a specific wallet.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/:address/balance`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| address | string | Yes | The address from which the native balance will be checked | \`0x057Ec652A4F150f7FF94f089A38008f49a0DF88e\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | No | The chain to query | \`eth\` |
| to_block | number | No | The block number up to which the balances will be checked. | - |

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/0x057Ec652A4F150f7FF94f089A38008f49a0DF88e/balance?chain=eth" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
