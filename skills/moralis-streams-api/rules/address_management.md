# Address Management

Add and remove addresses from streams.

## Endpoints

- **Get addresses:** `GET /streams/evm/:id/address`
- **Add address:** `POST /streams/evm/:id/address`
- **Add addresses:** `PATCH /streams/evm/:id/address`
- **Delete address:** `DELETE /streams/evm/:id/address/:address`

## Query Examples

```bash
# Get all addresses
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/streams/evm/:id/address', { id: 'uuid-here' }).then(console.log)"

# Add single address
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/streams/evm/:id/address', { method: 'POST', id: 'uuid-here', body: { address: '0x...' } }).then(console.log)"

# Add multiple addresses
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/streams/evm/:id/address', { method: 'PATCH', id: 'uuid-here', body: { addresses: ['0x...', '0x...'] } }).then(console.log)"

# Delete address
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/streams/evm/:id/address/:address', { method: 'DELETE', id: 'uuid-here', address: '0x...' }).then(console.log)"
```

## API Reference

https://docs.moralis.io/streams
