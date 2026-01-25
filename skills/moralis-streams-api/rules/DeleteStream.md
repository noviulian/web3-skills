# Delete stream

Delete a specific evm stream.

## Method

DELETE

## Base URL

`https://api.moralis-streams.com`

## Path

`/streams/evm/:id`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| id | string | Yes | The id of the stream to delete | - |

## Example (curl)

```bash
curl -X DELETE "https://api.moralis-streams.com/streams/evm/:id" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
