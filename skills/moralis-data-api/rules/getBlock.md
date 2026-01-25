# Get block by hash

Get the contents of a block given the block hash.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/block/:block_number_or_hash`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| block_number_or_hash | string | Yes | The block number or block hash | \`15863321\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | No | The chain to query | \`eth\` |
| include | string (internal_transactions) | No | If the result should contain the internal transactions. | \`-\` |

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/block/15863321?chain=eth&include=" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
