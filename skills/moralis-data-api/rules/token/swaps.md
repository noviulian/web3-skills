# Get Token Swaps

Get DEX swap trades for a token or wallet.

## Endpoint

- **By token:** `GET /erc20/:address/swaps`
- **By wallet:** `GET /wallets/:address/swaps`
- **By pair:** `GET /pairs/:address/swaps`

## Query Examples

```bash
# Token swaps
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/erc20/:address/swaps', { address: '0x...' }).then(console.log)"

# Wallet swaps
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/wallets/:address/swaps', { address: '0x...' }).then(console.log)"

# Pair swaps
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/pairs/:address/swaps', { address: '0x...' }).then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/erc20-get-token-swaps
