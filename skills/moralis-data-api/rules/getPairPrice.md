# Get DEX token pair price

Fetch the current price of a token pair on Uniswap V2-based DEXs.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/:token0_address/:token1_address/price`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| token0_address | string | Yes | The token0 address | \`0xae7ab96520de3a18e5e111b5eaab095312d7fe84\` |
| token1_address | string | Yes | The token1 address | \`0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | No | The chain to query | \`eth\` |
| to_block | string | No | The block number to get the reserves from | - |
| to_date | string | No | Get the price up to this date (format in seconds or datestring accepted by momentjs)
* Provide the param 'to_block' or 'to_date'
* If 'to_date' and 'to_block' are provided, 'to_block' will be used.
 | - |
| exchange | string | No | The factory name or address of the token exchange | - |

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/0xae7ab96520de3a18e5e111b5eaab095312d7fe84/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2/price?chain=eth" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
