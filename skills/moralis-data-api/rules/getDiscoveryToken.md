# Get token details

Retrieve comprehensive details for a specific token, including metadata and stats. For more detailed tokens stats we recommended to use `getTokenAnalytics` or `getMultipleTokenAnalytics`. For pair stats, we recommend to use `getPairStats`.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/discovery/token`

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | Yes | The chain to query | \`eth\` |
| token_address | string | Yes | The address of the token | \`0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2\` |

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/discovery/token?chain=eth&token_address=0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
