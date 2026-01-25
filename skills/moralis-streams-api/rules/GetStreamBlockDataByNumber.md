# Get webhook data returned on the block number with provided stream config

Get webhook data returned on the block number with provided stream config.

## Method

POST

## Base URL

`https://api.moralis-streams.com`

## Path

`/streams/evm/:chainId/block/:blockNumber`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chainId | string | Yes | - | - |
| blockNumber | number | Yes | - | - |

## Body


## Example (curl)

```bash
curl -X POST "https://api.moralis-streams.com/streams/evm/:chainId/block/:blockNumber" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{}'
```
