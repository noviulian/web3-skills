# Get streams

Get all the evm streams for the current project based on the project api-key .

## Method

GET

## Base URL

`https://api.moralis-streams.com`

## Path

`/streams/evm`

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| limit | number | Yes | Limit response results max value 100 | - |
| cursor | string | No | Cursor for fetching next page | - |
| status | string | No | - | - |

## Cursor/Pagination

- **limit**: Limit response results max value 100
- **cursor**: Cursor for fetching next page

The response includes a **cursor** field for pagination. Use this cursor in the next request to get the next page of results.

## Example (curl)

```bash
curl -X GET "https://api.moralis-streams.com/streams/evm" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
