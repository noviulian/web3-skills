# Get tokens with buying pressure

**Solana variant:** List tokens showing strong buying activity based on transaction data.

This EVM endpoint supports Solana via the `chain=solana` parameter.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/discovery/tokens/buying-pressure`

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon, 0x89, bsc, 0x38, bsc testnet, 0x61, avalanche, 0xa86a, fantom, 0xfa, cronos, 0x19, arbitrum, 0xa4b1, chiliz, 0x15b38, chiliz testnet, 0x15b32, gnosis, 0x64, gnosis testnet, 0x27d8, base, 0x2105, base sepolia, 0x14a34, optimism, 0xa, polygon amoy, 0x13882, linea, 0xe708, moonbeam, 0x504, moonriver, 0x505, moonbase, 0x507, linea sepolia, 0xe705, flow, 0x2eb, flow-testnet, 0x221, ronin, 0x7e4, ronin-testnet, 0x7e5, lisk, 0x46f, lisk-sepolia, 0x106a, pulse, 0x171, sei-testnet, 0x530, sei, 0x531, monad, 0x8f, solana) | No | The chain to query | \`solana\` |
| one_month_net_volume_change_usd | number | No | The minimum one month net volume change in usd of a token | \`1000000\` |
| min_market_cap | number | No | The minimum market cap in usd of a token | \`100000000\` |
| twitter_followers | number | No | The minimum twitter followers of a token | \`10000\` |
| one_month_volume_change_usd | number | No | The minimum one month volume change in usd of a token | \`10000\` |
| security_score | number | No | The minimum security score of a token | \`70\` |
| one_month_price_percent_change_usd | number | No | The minimum one month price percent change of a token | \`-\` |

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/discovery/tokens/buying-pressure?chain=solana&one_month_net_volume_change_usd=1000000&min_market_cap=100000000&twitter_followers=10000&one_month_volume_change_usd=10000&security_score=70&one_month_price_percent_change_usd=0" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
