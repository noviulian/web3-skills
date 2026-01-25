# Replay history

Replay a specific history.

## Method

POST

## Base URL

`https://api.moralis-streams.com`

## Path

`/history/replay/:streamId/:id`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| streamId | string | Yes | The id of the stream the history will be replayed | - |
| id | string | Yes | The id of the history to replay | - |

## Example (curl)

```bash
curl -X POST "https://api.moralis-streams.com/history/replay/:streamId/:id" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
