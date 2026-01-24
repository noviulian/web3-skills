# Get Wallet DeFi Positions

Get DeFi protocol positions and exposure for a wallet.

## Endpoint

- **EVM:** `GET /wallets/:address/defi/summary` or `/wallets/:address/defi/positions`

## Query Examples

```bash
# DeFi summary
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/wallets/:address/defi/summary', { address: '0x...' }).then(console.log)"

# Detailed positions
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/wallets/:address/defi/positions', { address: '0x...' }).then(console.log)"

# Protocol-specific
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/wallets/:address/defi/:protocol/positions', { address: '0x...', protocol: 'uniswap_v3' }).then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-wallet-defi-summary
