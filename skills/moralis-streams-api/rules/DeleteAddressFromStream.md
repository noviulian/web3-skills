# Delete address from stream

Deletes an address from a Stream.

## Method

DELETE

## Base URL

`https://api.moralis-streams.com`

## Path

`/streams/evm/:id/address`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| id | string | Yes | The id of the stream to delete the address from | - |

## Body


## Example (curl)

```bash
curl -X DELETE "https://api.moralis-streams.com/streams/evm/:id/address" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{}'
```
