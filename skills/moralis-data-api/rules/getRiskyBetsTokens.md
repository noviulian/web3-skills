# Get tokens with risky bets

List tokens with high-risk trading activity based on volatility or other factors.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/discovery/tokens/risky-bets`

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | No | The chain to query | \`eth\` |
| max_market_cap | number | No | The maximum market cap in usd of a token | \`10000000\` |
| one_week_holders_change | number | No | The minimum one week holders change of a token | \`25\` |
| one_week_net_volume_change_usd | number | No | The minimum one week net volume change in usd of a token | \`500\` |
| one_month_volume_change_usd | number | No | The minimum one month volume change in usd of a token | \`10000\` |
| security_score | number | No | The minimum security score of a token | \`70\` |
| one_month_price_percent_change_usd | number | No | The minimum one month price percent change of a token | \`-\` |

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/discovery/tokens/risky-bets?chain=eth&max_market_cap=10000000&one_week_holders_change=25&one_week_net_volume_change_usd=500&one_month_volume_change_usd=10000&security_score=70&one_month_price_percent_change_usd=0" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
