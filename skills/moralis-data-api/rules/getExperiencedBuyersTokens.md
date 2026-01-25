# Get tokens with experienced buyers

Identify tokens being purchased by experienced or high-volume traders.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/discovery/tokens/experienced-buyers`

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | No | The chain to query | \`eth\` |
| one_week_experienced_net_buyers_change | number | No | The minimum one week experienced buyers change of a token | \`150\` |
| min_market_cap | number | No | The minimum market cap in usd of a token | \`10000000\` |
| security_score | number | No | The minimum security score of a token | \`80\` |

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/discovery/tokens/experienced-buyers?chain=eth&one_week_experienced_net_buyers_change=150&min_market_cap=10000000&security_score=80" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
