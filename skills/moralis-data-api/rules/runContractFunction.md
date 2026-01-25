# Run contract function

Execute a read-only function from a contract’s ABI to retrieve data from the blockchain.

## Method

POST

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/:address/function`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| address | string | Yes | The address of the contract | \`0xdac17f958d2ee523a2206206994597c13d831ec7\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | No | The chain to query | \`eth\` |
| function_name | string | Yes | The function name of the contract | - |

## Body


## Example (curl)

```bash
curl -X POST "https://deep-index.moralis.io/api/v2.2/0xdac17f958d2ee523a2206206994597c13d831ec7/function?chain=eth" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{}'
```
