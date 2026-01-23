# Migration Guide: v1.0.1 → v1.1.0

This guide helps you upgrade from Moralis API Skills v1.0.x to v1.1.0.

## What's New in v1.1.0

### New Features

**Wallet API Enhancements:**
- ✨ Net worth tracking (`/wallets/:address/net-worth`)
- ✨ PnL/profitability tracking (`/wallets/:address/profitability`, `/wallets/:address/profitability/summary`)
- ✨ Wallet statistics (`/wallets/:address/stats`)
- ✨ Active chains detection (`/wallets/:address/chains`)
- ✨ ENS domain resolution (`/resolve/:domain`, `/resolve/:address/domain`)

**Token API Enhancements:**
- ✨ Token security scores (`/tokens/:tokenAddress/score`)
- ✨ DEX snipers detection (`/pairs/:address/snipers`)
- ✨ Token bonding status (`/erc20/:address/bondingStatus`)
- ✨ Token analytics (`/tokens/:address/analytics`, `/tokens/analytics/timeseries`)
- ✨ Volume timeseries (`/volume/timeseries`)
- ✨ Historical holder stats (`/erc20/:token_address/holders/historical`)
- ✨ Top profitable wallets (`/tokens/:tokenAddress/top-profitable-wallets`)

**NFT API Enhancements:**
- ✨ NFT floor price history (`/nft/:address/floor-price/historical`)

**Query Client Enhancements:**
- ✨ HTTP method support (POST, PUT, DELETE, PATCH) for Streams API
- ✨ Custom baseURL support for cross-API queries
- ✨ Auto-pagination helper (`paginate()`)
- ✨ Spam filtering helper (`createSpamFilter()`)
- ✨ Verified contract filtering (`createVerifiedFilter()`)

**New Chain Support (2025):**
- ✨ Flow (`0x54`)
- ✨ Ronin (`0x7e`)
- ✨ Lisk (`0x94`)
- ✨ Sei (`0x82`)
- ✨ Monad (`0x8f`)

**Streams API Enhancements:**
- ✨ Native balance streaming (`/streams/evm/{id}/balances`)
- ✨ Enhanced history replay capabilities

### Deprecated Endpoints (Dec 6, 2024)

The following endpoints are now deprecated:

**All Chains:**
- ❌ `/{address}/logs` - Use RPC nodes instead
- ❌ `/{address}/events` - Use RPC nodes instead
- ❌ `/block/{block_number_or_hash}/stats` - Use Streams API
- ❌ `/nft/{address}/{token_id}/stats` - Use Streams API
- ❌ `/transaction/{transaction_hash}/internal-transactions` - Use `include=internal_transactions` parameter

**Gnosis Chain Only:**
- ❌ All NFT API endpoints removed due to spam issues

## Breaking Changes

### None (Backward Compatible)

v1.1.0 is fully backward compatible with v1.0.x. All existing code will continue to work.

## Upgrading Your Code

### Update Plugin Version

If you installed via marketplace, update to v1.1.0:

```bash
# Reinstall the latest version
/plugin install web3-api-skills@moralis-skills
/plugin install streams-api-skills@moralis-skills
```

### Using New Features

#### Wallet Net Worth

```javascript
const { q } = require('./query');

// Get total portfolio value across all chains
q('/wallets/:address/net-worth', { address: '0x123...' })
  .then(r => console.log('Net Worth:', r.total_net_worth_usd, 'USD'));
```

#### Wallet PnL Tracking

```javascript
// Detailed PnL data
q('/wallets/:address/profitability', { address: '0x123...' })
  .then(r => console.log('PnL:', r.results));

// PnL summary
q('/wallets/:address/profitability/summary', { address: '0x123...' })
  .then(r => console.log('Total PnL:', r.total_profit_loss));
```

#### Token Security Score

```javascript
q('/tokens/:tokenAddress/score', { address: '0xabc...' })
  .then(r => console.log('Token Score:', r));
```

#### DEX Snipers Detection

```javascript
q('/pairs/:address/snipers', { address: '0xpair...' })
  .then(r => console.log('Snipers:', r.result));
```

#### Auto-Pagination Helper

```javascript
const { paginate } = require('./query');

// Get all NFTs automatically
const allNFTs = await paginate('/:address/nft', { address: '0x123...' });
```

#### Spam Filtering

```javascript
const { createSpamFilter } = require('./query');

q('/wallets/:address/tokens', {
  address: '0x123...',
  params: createSpamFilter({ excludeSpam: true, onlyVerified: true })
});
```

## New Chain Usage

```javascript
// Flow
q('/:address/balance', { address: '0x123...', chain: 'flow' })

// Ronin
q('/:address/balance', { address: '0x123...', chain: 'ronin' })

// Lisk
q('/:address/balance', { address: '0x123...', chain: 'lisk' })

// Sei
q('/:address/balance', { address: '0x123...', chain: 'sei' })

// Monad
q('/:address/balance', { address: '0x123...', chain: 'monad' })
```

## Deprecated Endpoint Replacements

### `/transaction/{hash}/internal-transactions` → `include=internal_transactions`

**Before (deprecated):**
```javascript
q('/transaction/:hash/internal-transactions', { address: '0xabc...' })
```

**After:**
```javascript
q('/transaction/:hash', {
  address: '0xabc...',
  params: { include: 'internal_transactions' }
})
```

### `/block/{block}/stats` → Use Streams API

**Before (deprecated):**
```javascript
q('/block/:block_number_or_hash/stats', { params: { chain: 'eth' } })
```

**After (create stream for real-time monitoring):**
```javascript
// Use Streams API instead
streamsApi.query('/streams/evm', {
  method: 'PUT',
  body: {
    webhookUrl: 'https://your-webhook.com',
    chainIds: ['0x1'],
    includeNativeTxs: true
  }
})
```

## Testing Your Upgrade

After upgrading, verify your installation:

```bash
# Test all skills load
./scripts/test-all-skills.sh

# Test query client with new features
cd plugins/web3-api-skills/skills/web3-wallet-api
node -e "const { paginate, createSpamFilter } = require('./query'); console.log('v1.1.0 features loaded:', typeof paginate, typeof createSpamFilter)"
```

## Rollback

If you need to rollback to v1.0.1:

```bash
# Install previous version
/plugin install web3-api-skills@moralis-skills@1.0.1
/plugin install streams-api-skills@moralis-skills@1.0.0
```

## Get Help

If you encounter issues during migration:
- Check the [GitHub Issues](https://github.com/noviulian/moralis-skills/issues)
- Review [CLAUDE.md](../CLAUDE.md) for detailed documentation
- Check individual skill SKILL.md files for usage examples

## Summary

v1.1.0 is a feature-rich update that adds powerful analytics, security features, and chain support while maintaining full backward compatibility. No code changes are required for existing functionality.
