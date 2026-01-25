# Get Multiple ERC20 token prices

Retrieve the current or historical prices for multiple ERC20 tokens in the blockchain’s native currency and USD. Accepts an array of up to 100 `tokens`, each requiring `token_address` and optional fields such as `to_block` or `exchange`. Each token returned includes on-chain metadata, as well as off-chain metadata, logos, spam status and more. Additional options to exclude low-liquidity tokens and inactive tokens.

## Method

POST

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/erc20/prices`

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | No | The chain to query | \`eth\` |
| include | string | No | This parameter is now deprecated as percentage change are included by default | \`-\` |
| max_token_inactivity | number | No | Exclude tokens inactive for more than the given amount of days | - |
| min_pair_side_liquidity_usd | number | No | Exclude tokens with liquidity less than the specified amount in USD. This parameter refers to the liquidity on a single side of the pair. | - |

## Body


## Example (curl)

```bash
curl -X POST "https://deep-index.moralis.io/api/v2.2/erc20/prices?chain=eth&include=" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{}'
```
