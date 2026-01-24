# Stream Event Types

Configure which events to track in streams.

## Event Types

- `tx` - Native transactions
- `log` - Contract event logs
- `erc20transfer` - ERC20 token transfers
- `erc20approval` - ERC20 approvals
- `nfttransfer` - NFT transfers
- `internalTx` - Internal transactions

## Query Examples

```bash
# Create stream with specific events
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/streams/evm', { method: 'PUT', body: { webhookUrl: 'https://...', chainIds: ['0x1'], topic0: ['Transfer'], events: ['erc20transfer'] } }).then(console.log)"

# Get stream history
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/history', { limit: 100 }).then(console.log)"

# Replay historical events
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/history/replay/:streamId/:id', { streamId: 'uuid', id: 'event-id' }).then(console.log)"
```

## API Reference

https://docs.moralis.io/streams
