# Get Token Metadata

Get token metadata (name, symbol, decimals, logo, etc.).

## Endpoint

- **EVM:** `GET /erc20/metadata`
- **Solana:** Use token search endpoint

## Query Examples

```bash
# By token address
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/erc20/metadata', { addresses: ['0x...'] }).then(console.log)"

# Token search
cd $SKILL_DIR
node -e "const { query, searchToken } = require('./query'); searchToken('USDC', 'eth').then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/erc20-get-metadata
