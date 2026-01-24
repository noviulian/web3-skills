# Get Wallet Token Holdings

Get all tokens (ERC20, SPL, etc.) held by a wallet address.

## Endpoint

- **EVM:** `GET /wallets/:address/tokens`
- **Solana:** `GET /:address/balance` (native) + `/wallet/:address/tokens` (SPL)

## Query Examples

```bash
# EVM with spam filtering
cd $SKILL_DIR
node -e "const { query, createSpamFilter } = require('./query'); query('/wallets/:address/tokens', { address: '0x...', params: createSpamFilter({ excludeSpam: true, onlyVerified: true }) }).then(console.log)"

# Solana
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/wallet/:address/tokens', { address: '742d35Cc6638C13C', network: 'mainnet' }).then(console.log)"
```

## Spam Filtering

```javascript
const { createSpamFilter } = require('./query');

// Exclude spam and unverified
params: createSpamFilter({ excludeSpam: true, onlyVerified: true })

// Only exclude spam
params: createSpamFilter({ excludeSpam: true })
```

## Pagination

```javascript
const { paginate } = require('./query');
const allTokens = await paginate('/wallets/:address/tokens', { address: '0x...' });
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-wallet-token-balances
