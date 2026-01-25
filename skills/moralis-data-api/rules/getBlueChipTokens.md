# Get tokens with blue chip

Fetch established, high-value tokens considered stable investments.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/discovery/tokens/blue-chip`

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | No | The chain to query | \`eth\` |
| min_market_cap | number | No | The minimum market cap in usd of a token | \`150000000\` |
| security_score | number | No | The minimum security score of a token | \`80\` |
| min_token_age_in_days | number | No | The minimum age of token in days | \`180\` |
| time_frame | string (1h, 1d, 1w, 1M) | No | The time frame used for price percent change ordering in response | \`1d\` |

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/discovery/tokens/blue-chip?chain=eth&min_market_cap=150000000&security_score=80&min_token_age_in_days=180&time_frame=1d" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
