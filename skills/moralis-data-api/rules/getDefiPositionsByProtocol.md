# Get detailed DeFi positions by protocol for a wallet

Fetch detailed DeFi positions for a given wallet and protocol.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/wallets/:address/defi/:protocol/positions`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| address | string | Yes | Wallet address | \`0xd100d8b69c5ae23d6aa30c6c3874bf47539b95fd\` |
| protocol | string | Yes | The protocol to query | \`uniswap-v3\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | No | The chain to query | \`eth\` |

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/wallets/0xd100d8b69c5ae23d6aa30c6c3874bf47539b95fd/defi/uniswap-v3/positions?chain=eth" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
