# Get tokens with buying pressure

List tokens showing strong buying activity based on transaction data.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/discovery/tokens/buying-pressure`

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | No | The chain to query | \`eth\` |
| one_month_net_volume_change_usd | number | No | The minimum one month net volume change in usd of a token | \`1000000\` |
| min_market_cap | number | No | The minimum market cap in usd of a token | \`100000000\` |
| twitter_followers | number | No | The minimum twitter followers of a token | \`10000\` |
| one_month_volume_change_usd | number | No | The minimum one month volume change in usd of a token | \`10000\` |
| security_score | number | No | The minimum security score of a token | \`70\` |
| one_month_price_percent_change_usd | number | No | The minimum one month price percent change of a token | \`-\` |

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/discovery/tokens/buying-pressure?chain=eth&one_month_net_volume_change_usd=1000000&min_market_cap=100000000&twitter_followers=10000&one_month_volume_change_usd=10000&security_score=70&one_month_price_percent_change_usd=0" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
