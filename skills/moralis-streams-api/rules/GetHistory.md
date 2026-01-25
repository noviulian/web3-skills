# Get history

Get all history

## Method

GET

## Base URL

`https://api.moralis-streams.com`

## Path

`/history`

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| limit | number | Yes | - | - |
| cursor | string | No | - | - |
| transactionHash | string | No | - | - |
| excludePayload | boolean | No | - | - |
| streamId | string | No | - | - |
| chainId | array | No | - | - |
| blockNumber | array | No | - | - |
| fromTimestamp | number | No | - | - |
| toTimestamp | number | No | - | - |

## Cursor/Pagination

- **limit**: Number of results per page
- **cursor**: Cursor for next page

The response includes a **cursor** field for pagination. Use this cursor in the next request to get the next page of results.

## Example (curl)

```bash
curl -X GET "https://api.moralis-streams.com/history" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
