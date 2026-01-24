# Get Wallet Native Balance

Get the native cryptocurrency balance (ETH, BNB, MATIC, etc.) for an EVM or Solana address.

## Endpoint

- **EVM:** `GET /:address/balance`
- **Solana:** `GET /:address/balance`

## Auto-Detection

EVM addresses (0x prefix, 42 chars) → EVM API
Solana addresses (base58, 32-44 chars) → Solana API

## Query Examples

```bash
# EVM
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/:address/balance', { address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' }).then(r => console.log(r.balance))"

# Solana
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/:address/balance', { address: '742d35Cc6638C13C' }).then(r => console.log(r.balance))"
```

## Response

```json
{
  "balance": "1234567890000000000000",
  "address": "0x..."
}
```

## Common Pitfalls

- **Wrong endpoint:** Use `/:address/balance`, NOT `/wallets/:address/balance`
- **Wei format:** Balance is in wei (smallest unit), convert for display

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-wallet-balance
