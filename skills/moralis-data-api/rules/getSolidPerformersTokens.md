# Get tokens with solid performance

Find tokens with consistent performance based on price and volume metrics.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/discovery/tokens/solid-performers`

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | No | The chain to query | \`eth\` |
| one_month_net_volume_change_usd | number | No | The minimum one month net volume change in usd of a token | \`100000\` |
| one_week_net_volume_change_usd | number | No | The minimum one week net volume change in usd of a token | \`10000\` |
| one_day_net_volume_change_usd | number | No | The minimum one day net volume change in usd of a token | \`-\` |
| one_month_volume_change_usd | number | No | The minimum one month volume change in usd of a token | \`10000\` |
| security_score | number | No | The minimum security score of a token | \`80\` |
| one_month_price_percent_change_usd | number | No | The minimum one month price percent change of a token | \`-\` |

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/discovery/tokens/solid-performers?chain=eth&one_month_net_volume_change_usd=100000&one_week_net_volume_change_usd=10000&one_day_net_volume_change_usd=0&one_month_volume_change_usd=10000&security_score=80&one_month_price_percent_change_usd=0" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
