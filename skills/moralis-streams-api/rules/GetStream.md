# Get a specific evm stream.

Get a specific evm stream.

## Method

GET

## Base URL

`https://api.moralis-streams.com`

## Path

`/streams/evm/:id`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| id | string | Yes | The id of the stream to get | - |

## Example (curl)

```bash
curl -X GET "https://api.moralis-streams.com/streams/evm/:id" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
