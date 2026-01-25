# Get decoded transaction by hash

Get the ABI-decoded contents of a transaction by the given transaction hash.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/transaction/:transaction_hash/verbose`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| transaction_hash | string | Yes | The transaction hash | \`0xfeda0e8f0d6e54112c28d319c0d303c065d1125c9197bd653682f5fcb0a6c81e\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | No | The chain to query | \`eth\` |
| include | string (internal_transactions) | No | If the result should contain the internal transactions. | \`-\` |

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/transaction/0xfeda0e8f0d6e54112c28d319c0d303c065d1125c9197bd653682f5fcb0a6c81e/verbose?chain=eth&include=" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
