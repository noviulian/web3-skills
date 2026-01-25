# Get tokens with top losers

List tokens with the largest price decreases over a period.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/discovery/tokens/top-losers`

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | No | The chain to query | \`eth\` |
| min_market_cap | number | No | The minimum market cap in usd of a token | \`50000000\` |
| security_score | number | No | The minimum security score of a token | \`80\` |
| time_frame | string (1h, 1d, 1w, 1M) | No | The time frame used for price percent change ordering in response | \`1d\` |

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/discovery/tokens/top-losers?chain=eth&min_market_cap=50000000&security_score=80&time_frame=1d" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
