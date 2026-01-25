---
name: moralis-streams-api
description: Real-time blockchain event monitoring with webhooks. REST API for stream management (create, update, delete streams, add addresses).
license: MIT
compatibility: Requires Node.js (built-in modules only)
metadata:
  version: "3.0.0"
  author: web3-skills
  tags: [web3, blockchain, streaming, webhooks, events, realtime]
context:
  fork: noviulian/moralis-api-skills
  agent: claude-code
allowed-tools:
  - Bash
invocation:
  max-turns: 2
  disable-model: false
---

# Moralis Streams API

Real-time blockchain event monitoring with webhook delivery. Monitor transactions, logs, token transfers, NFT transfers, and internal transactions across EVM chains.

## Setup

Run `/moralis-api-key <your_api_key>` before using this skill.

## Authentication

All requests require the API key header:

```bash
X-API-Key: $MORALIS_API_KEY
```

## Base URL

```
https://api.moralis-streams.com
```

⚠️ **Important:** Streams API uses a different base URL than the Data API.

## When to Use This Skill

Use this skill when the user asks about:
- **Real-time monitoring:** Track blockchain events as they happen
- **Webhooks:** Set up event streaming to your server
- **Stream management:** Create, update, delete, pause/resume streams
- **Address monitoring:** Add/remove addresses from streams
- **Historical delivery:** Replay past blockchain events
- **Stream analytics:** Get stream statistics and history

⚠️ **NOT for:** Querying current blockchain state → Use @moralis-data-api

## Stream Types

| Type | Description |
|------|-------------|
| `tx` | Native transactions |
| `log` | Contract event logs |
| `erc20transfer` | ERC20 token transfers |
| `erc20approval` | ERC20 approvals |
| `nfttransfer` | NFT transfers |
| `internalTx` | Internal transactions |

## Endpoint Rules

Each endpoint has its own rule file with full documentation:

```bash
rules/GetStreams.md          # List all streams
rules/CreateStream.md        # Create a new stream
rules/GetStream.md           # Get stream details
rules/UpdateStream.md        # Update existing stream
rules/DeleteStream.md        # Delete a stream
rules/AddAddressToStream.md  # Add addresses to monitor
rules/DeleteAddressFromStream.md  # Remove addresses
# ... and 13 more
```

## Endpoint Catalog

### Stream Management

| Endpoint | Description |
|----------|-------------|
| [GetStreams](rules/GetStreams.md) | Get all evm streams for the current project |
| [CreateStream](rules/CreateStream.md) | Create a new evm stream |
| [GetStream](rules/GetStream.md) | Get a specific evm stream |
| [UpdateStream](rules/UpdateStream.md) | Update an existing evm stream |
| [DeleteStream](rules/DeleteStream.md) | Delete an existing evm stream |
| [DuplicateStream](rules/DuplicateStream.md) | Duplicate an existing evm stream |

### Address Management

| Endpoint | Description |
|----------|-------------|
| [GetAddresses](rules/GetAddresses.md) | Get all addresses that are being monitored by a stream |
| [AddAddressToStream](rules/AddAddressToStream.md) | Add an address to be monitored by a stream |
| [ReplaceAddressFromStream](rules/ReplaceAddressFromStream.md) | Replace an address that is being monitored by a stream |
| [DeleteAddressFromStream](rules/DeleteAddressFromStream.md) | Remove an address from being monitored by a stream |

### Status & Settings

| Endpoint | Description |
|----------|-------------|
| [UpdateStreamStatus](rules/UpdateStreamStatus.md) | Update the status (active/paused) of a stream |
| [SetSettings](rules/SetSettings.md) | Set settings for streams |
| [GetSettings](rules/GetSettings.md) | Get settings for streams |

### History & Analytics

| Endpoint | Description |
|----------|-------------|
| [GetHistory](rules/GetHistory.md) | Get the history of a stream |
| [ReplayHistory](rules/ReplayHistory.md) | Replay historical data for a stream |
| [GetStats](rules/GetStats.md) | Get statistics for all streams |
| [GetStatsByStreamId](rules/GetStatsByStreamId.md) | Get statistics for a specific stream |
| [GetLogs](rules/GetLogs.md) | Get logs for a stream |
| [GetStreamBlockDataByNumber](rules/GetStreamBlockDataByNumber.md) | Get the block data for a specific block number that was processed by a stream |
| [GetStreamBlockDataToWebhookByNumber](rules/GetStreamBlockDataToWebhookByNumber.md) | Get the block data that was sent to the webhook for a specific block number |

## HTTP Methods

| Action | HTTP Method |
|--------|-------------|
| Create stream | `PUT` |
| Update stream | `POST` |
| Delete stream | `DELETE` |
| Get streams | `GET` |

## Common Pitfalls

- **Different base URL:** Streams uses `api.moralis-streams.com`, NOT `deep-index.moralis.io`
- **Limit required:** `GET /streams/evm` requires `limit` parameter (max 100)
- **Stream IDs:** UUIDs, not hex strings (e.g., `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)
- **PUT vs POST:** Use `PUT` to create, `POST` to update

## Pagination

List endpoints use cursor-based pagination:

```bash
# First page
curl "https://api.moralis-streams.com/streams/evm?limit=100" \
  -H "X-API-Key: $MORALIS_API_KEY"

# Next page (use cursor from response)
curl "https://api.moralis-streams.com/streams/evm?limit=100&cursor=<cursor>" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

## Example Requests

```bash
# List all streams
curl "https://api.moralis-streams.com/streams/evm?limit=100" \
  -H "X-API-Key: $MORALIS_API_KEY"

# Create a new stream for monitoring ERC20 transfers
curl -X PUT "https://api.moralis-streams.com/streams/evm" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "webhookUrl": "https://your-server.com/webhook",
    "description": "Monitor ERC20 transfers",
    "tag": "erc20-monitors",
    "topic0": ["Transfer(address,address,uint256)"],
    "allAddresses": true,
    "chainIds": ["0x1", "0x89"],
    "advancedOptions": [
      {
        "topic0": "Transfer(address,address,uint256)",
        "includeNativeHash": true
      }
    ]
  }'

# Get stream details
curl "https://api.moralis-streams.com/streams/evm/<stream_id>" \
  -H "X-API-Key: $MORALIS_API_KEY"

# Delete a stream
curl -X DELETE "https://api.moralis-streams.com/streams/evm/<stream_id>" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

## Stream Status

Pause or resume a stream:

```bash
# Pause a stream
curl -X POST "https://api.moralis-streams.com/streams/evm/<stream_id>/status" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"status": "paused"}'

# Resume a stream
curl -X POST "https://api.moralis-streams.com/streams/evm/<stream_id>/status" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"status": "active"}'
```

## Address Management

Add or remove addresses from an existing stream:

```bash
# Add addresses
curl -X POST "https://api.moralis-streams.com/streams/evm/<stream_id>/address" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "addressToAdd": ["0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"]
  }'

# Remove address
curl -X DELETE "https://api.moralis-streams.com/streams/evm/<stream_id>/address/<address>" \
  -H "X-API-Key: $MORALIS_API_KEY"
```

## Supported Chains

**EVM chains supported:** All major EVM chains including Ethereum, Polygon, BSC, Arbitrum, Optimism, Base, Avalanche, and more (use hex chain IDs like `0x1`, `0x89`, etc.)

## See Also

- Endpoint reference: See individual `rules/*.md` files for detailed documentation
- Data API: @moralis-data-api for querying current blockchain state
