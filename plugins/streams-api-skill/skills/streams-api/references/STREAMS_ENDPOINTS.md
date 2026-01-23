# Streams API Endpoints Reference

This reference lists the most common Streams API endpoints and request shapes.

## Get All Streams

```
GET /streams/evm
```

Query parameters:
- `limit` (required) - Max 100
- `cursor` (optional) - For pagination
- `status` (optional) - Filter by status

## Create a Stream

```
PUT /streams/evm
```

Request body:
```json
{
  "webhookUrl": "https://your-server.com/webhook",
  "description": "My stream",
  "tag": "production",
  "topic0": ["Transfer(address,address,uint256)"],
  "allAddresses": true,
  "includeNativeTxs": true,
  "includeContractLogs": true,
  "includeInternalTxs": false,
  "advancedOptions": [
    {
      "type": "tx",
      "selectors": ["0xa9059cbb"]
    }
  ],
  "chainIds": ["0x1", "0x89"],
  "demo": false,
  "filterSpamAddresses": true
}
```

## Get a Specific Stream

```
GET /streams/evm/{id}
```

## Update a Stream

```
POST /streams/evm/{id}
```

## Delete a Stream

```
DELETE /streams/evm/{id}
```

## Update Stream Status

```
POST /streams/evm/{id}/status
```

Request body:
```json
{
  "status": "paused"
}
```

## Get Stream Addresses

```
GET /streams/evm/{id}/address
```

Query parameters:
- `limit` (required) - Max 100
- `cursor` (optional) - For pagination

## Add Address to Stream

```
POST /streams/evm/{id}/address
```

Request body:
```json
{
  "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
}
```

## Delete Address from Stream

```
DELETE /streams/evm/{id}/address
```

Request body:
```json
{
  "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
}
```

## Duplicate Stream

```
POST /streams/evm/{id}/duplicate
```

## Get Stream History (Block Data)

```
GET /streams/evm/{chainId}/block/{blockNumber}
```
