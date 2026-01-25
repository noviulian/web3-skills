# Get DEX token pair reserves

Retrieve liquidity reserves for a token pair on Uniswap V2-based DEXs.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/:pair_address/reserves`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| pair_address | string | Yes | The liquidity pair address | \`0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | No | The chain to query | \`eth\` |
| to_block | string | No | The block number to get the reserves from | - |
| to_date | string | No | Get the reserves up to this date (format in seconds or datestring accepted by momentjs)
* Provide the param 'to_block' or 'to_date'
* If 'to_date' and 'to_block' are provided, 'to_block' will be used.
 | - |

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974/reserves?chain=eth" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
