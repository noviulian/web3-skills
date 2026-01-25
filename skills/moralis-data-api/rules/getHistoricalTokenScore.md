# Get historical token score by token address

Retrieve historical score data for a specific token over time.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/tokens/:tokenAddress/score/historical`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| tokenAddress | string | Yes | The token address to query | \`0x6982508145454ce325ddbe47a25d4ec3d2311933\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | No | The chain to query | \`eth\` |
| timeframe | string | Yes | The timeframe to query | \`1d\` |

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/tokens/0x6982508145454ce325ddbe47a25d4ec3d2311933/score/historical?chain=eth&timeframe=1d" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
