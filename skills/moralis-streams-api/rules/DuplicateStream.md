# Duplicate stream

Duplicate a specific evm stream.

## Method

POST

## Base URL

`https://api.moralis-streams.com`

## Path

`/streams/evm/:id/duplicate`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| id | string | Yes | The id of the stream to duplicate | - |

## Example (curl)

```bash
curl -X POST "https://api.moralis-streams.com/streams/evm/:id/duplicate" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
