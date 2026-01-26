# Update stream status

Updates the status of specific evm stream.

## Method

POST

## Base URL

`https://api.moralis-streams.com`

## Path

`/streams/evm/:id/status`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| id | string | Yes | The id of the stream to update | - |

## Body

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| status | string (active, paused, error, terminated) | No | The stream status:
[active] The Stream is healthy and processing blocks
[paused] The Stream is paused and is not processing blocks
[error] The Stream has encountered an error and is not processing blocks | \`[object Object]\` |

## Response Example

Status: 200

Ok

```json
{
  "webhookUrl": "webhookUrl_example",
  "description": "description_example",
  "tag": "tag_example",
  "topic0": [],
  "allAddresses": true,
  "includeNativeTxs": true,
  "includeContractLogs": true,
  "includeInternalTxs": true,
  "includeAllTxLogs": true,
  "getNativeBalances": [
    {
      "selectors": [],
      "type": "type_example"
    }
  ],
  "chainIds": [],
  "filterPossibleSpamAddresses": true,
  "demo": true,
  "triggers": [
    {
      "type": "type_example",
      "contractAddress": "contractAddress_example",
      "inputs": [],
      "functionAbi": {},
      "topic0": "topic0_example",
      "callFrom": "callFrom_example"
    }
  ],
  "id": "id_example",
  "status": {},
  "statusMessage": "statusMessage_example",
  "updatedAt": "updatedAt_example",
  "amountOfAddresses": 0
}
```

## Example (curl)

```bash
curl -X POST "https://api.moralis-streams.com/streams/evm/:id/status" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "status": {}
}'
```
