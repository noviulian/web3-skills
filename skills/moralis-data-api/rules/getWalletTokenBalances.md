# Get ERC20 token balances by wallet

Get an unpaginated list of token balances, without token prices, for a specific wallet address. Maximum of 2,000 tokens. Each token returned includes on-chain metadata, as well as off-chain metadata, logos, spam status and more.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/:address/erc20`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| address | string | Yes | The address from which token balances will be checked | \`0xcB1C1FdE09f811B294172696404e88E658659905\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | No | The chain to query | \`eth\` |
| to_block | number | No | The block number up to which the balances will be checked. | - |
| token_addresses | array | No | The addresses to get balances for (optional) | - |
| exclude_spam | boolean | No | Exclude spam tokens from the result | - |

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/0xcB1C1FdE09f811B294172696404e88E658659905/erc20?chain=eth" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
