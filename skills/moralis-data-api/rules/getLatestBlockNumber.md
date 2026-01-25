# Get latest block number

Get the most recent block number for a specified blockchain.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/latestBlockNumber/:chain`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string | Yes | The chain to query | \`eth\` |

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/latestBlockNumber/eth" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
