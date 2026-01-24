# Get Wallet NFT Holdings

Get all NFTs held by a wallet address.

## Endpoint

- **EVM:** `GET /:address/nft`
- **Solana:** Limited support, use token holdings endpoint

## Query Examples

```bash
# EVM with pagination
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/:address/nft', { address: '0x...', limit: 100, cursor: '...' }).then(console.log)"

# Get specific NFT
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/:address/nft/:tokenId', { address: '0x...', tokenId: '1', token_address: '0x...' }).then(console.log)"
```

## Collections

```bash
# Grouped by collection
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/:address/nft/collections', { address: '0x...' }).then(console.log)"
```

## Verified Filtering

```javascript
const { createVerifiedFilter } = require('./query');
params: createVerifiedFilter({ onlyVerified: true })
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-contract-nfts
