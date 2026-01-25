# Get trending tokens

Discover tokens gaining popularity based on trading and social metrics.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/discovery/tokens/trending`

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | No | The chain to query | \`eth\` |
| min_market_cap | number | No | The minimum market cap in usd of a token | \`50000000\` |
| security_score | number | No | The minimum security score of a token | \`80\` |

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/discovery/tokens/trending?chain=eth&min_market_cap=50000000&security_score=80" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
