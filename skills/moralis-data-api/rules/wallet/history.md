# Get Wallet Transaction History

Get complete transaction history for a wallet (native, token, NFT, internal transactions).

## Endpoint

- **EVM:** `GET /wallets/:address/history`

## Query Examples

```bash
# All history
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/wallets/:address/history', { address: '0x...', limit: 100 }).then(console.log)"

# Filtered by operation type
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/wallets/:address/history', { address: '0x...', operation_type: 'token_transfer' }).then(console.log)"
```

## Operation Types

- `token_transfer` - Token transfers
- `contract_interaction` - Contract calls
- `native` - Native transfers
- `nft_transfer` - NFT transfers

## Cursor Pagination

```javascript
const { paginate } = require('./query');
const allHistory = await paginate('/wallets/:address/history', { address: '0x...' });
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-wallet-history
