# Get DEX token pair address

Get the pair address for a token0/token1 combination on a DEX, interchangeable order.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/:token0_address/:token1_address/pairAddress`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| token0_address | string | Yes | The token0 address | \`0x2b591e99afe9f32eaa6214f7b7629768c40eeb39\` |
| token1_address | string | Yes | The token1 address | \`0xdac17f958d2ee523a2206206994597c13d831ec7\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | No | The chain to query | \`eth\` |
| to_block | string | No | The block number to get the reserves from | - |
| to_date | string | No | Get the reserves up to this date (format in seconds or datestring accepted by momentjs)
* Provide the param 'to_block' or 'to_date'
* If 'to_date' and 'to_block' are provided, 'to_block' will be used.
 | - |
| exchange | string | Yes | The factory name or address of the token exchange | \`uniswapv2\` |

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/0x2b591e99afe9f32eaa6214f7b7629768c40eeb39/0xdac17f958d2ee523a2206206994597c13d831ec7/pairAddress?chain=eth&exchange=uniswapv2" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
