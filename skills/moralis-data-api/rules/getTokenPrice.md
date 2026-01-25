# Get ERC20 token price

Retrieve the current or historical price of an ERC20 token in the blockchain’s native currency and USD. Each token returned includes on-chain metadata, as well as off-chain metadata, logos, spam status and more. Additional options to exclude low-liquidity tokens and inactive tokens.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/erc20/:address/price`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| address | string | Yes | The address of the token contract | \`0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | No | The chain to query | \`eth\` |
| exchange | string | No | The factory name or address of the token exchange | - |
| to_block | number | No | The block number from which the token price should be checked | - |
| include | string | No | This parameter is now deprecated as percentage change are included by default | \`-\` |
| max_token_inactivity | number | No | Exclude tokens inactive for more than the given amount of days | - |
| min_pair_side_liquidity_usd | number | No | Exclude tokens with liquidity less than the specified amount in USD. This parameter refers to the liquidity on a single side of the pair. | - |

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/erc20/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0/price?chain=eth&include=" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
