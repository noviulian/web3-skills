# Retrieve timeseries trading stats by category

Fetch timeseries buy volume, sell volume, liquidity and FDV for a specific category. Optionally filter by `chain`.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/volume/timeseries/:categoryId`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| categoryId | string | Yes | The category id | \`1\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | No | The chain to query | \`eth\` |
| timeframe | string | Yes | The timeframe to query | \`1d\` |

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/volume/timeseries/1?chain=eth&timeframe=1d" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
