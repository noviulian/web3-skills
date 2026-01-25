# Gets token balances owned by the given address

Gets token balances owned by the given address

## Method

GET

## Base URL

`https://solana-gateway.moralis.io`

## Path

`/account/:network/:address/tokens`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| network | string | Yes | The network to query | - |
| address | string | Yes | The address to query | \`kXB7FfzdrfZpAZEW3TZcp8a8CwQbsowa6BdfAHZ4gVs\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| excludeSpam | boolean | No | Should exclude spam tokens | - |

## Example (curl)

```bash
curl -X GET "https://solana-gateway.moralis.io/account/:network/kXB7FfzdrfZpAZEW3TZcp8a8CwQbsowa6BdfAHZ4gVs/tokens" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
