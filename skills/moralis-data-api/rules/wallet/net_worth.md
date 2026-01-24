# Get Wallet Net Worth

Get total net worth across all chains for a wallet.

## Endpoint

- **EVM:** `GET /wallets/:address/net-worth`

## Query Examples

```bash
# Net worth in USD
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/wallets/:address/net-worth', { address: '0x...' }).then(r => console.log(r.total_networth_usd))"

# Exclude specific chains
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/wallets/:address/net-worth', { address: '0x...', exclude_chains: ['0x38'] }).then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-wallet-net-worth
