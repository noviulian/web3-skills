# Get block by date

Find the closest block to a specific date on a blockchain.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/dateToBlock`

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | No | The chain to query | \`eth\` |
| date | string | No | Unix date in milliseconds or a datestring (format in seconds or datestring accepted by momentjs) | - |

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/dateToBlock?chain=eth" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
