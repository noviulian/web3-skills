# Stream Management

Create, update, delete, and manage streams.

## Endpoints

- **List streams:** `GET /streams/evm`
- **Create stream:** `PUT /streams/evm`
- **Update stream:** `POST /streams/evm`
- **Get stream:** `GET /streams/evm/:id`
- **Delete stream:** `DELETE /streams/evm/:id`
- **Duplicate stream:** `POST /streams/evm/:id/duplicate`
- **Update status:** `POST /streams/evm/:id/status`

## Query Examples

```bash
# List streams
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/streams/evm', { limit: 100 }).then(console.log)"

# Create stream
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/streams/evm', { method: 'PUT', body: { webhookUrl: 'https://...', chainIds: ['0x1'], description: 'My stream' } }).then(console.log)"

# Get stream details
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/streams/evm/:id', { id: 'uuid-here' }).then(console.log)"

# Delete stream
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/streams/evm/:id', { method: 'DELETE', id: 'uuid-here' }).then(console.log)"

# Pause stream
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/streams/evm/:id/status', { method: 'POST', id: 'uuid-here', body: { status: 'paused' } }).then(console.log)"
```

## Common Pitfalls

- **limit required:** GET /streams/evm requires limit parameter (max 100)
- **Stream IDs:** UUIDs, not hex strings
- **PUT vs POST:** PUT for create, POST for update

## API Reference

https://docs.moralis.io/streams
