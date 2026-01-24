# Get Wallet Profitability

Get profit/loss data for a wallet.

## Endpoint

- **EVM:** `GET /wallets/:address/profitability`

## Query Examples

```bash
# Overall profitability
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/wallets/:address/profitability', { address: '0x...' }).then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-wallet-profitability
