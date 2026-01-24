# Get Token Price

Get current price for a token (ERC20, SPL).

## Endpoint

- **EVM:** `GET /erc20/:address/price`
- **Solana:** `GET /token/:network/prices`

## Query Examples

```bash
# EVM token price
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/erc20/:address/price', { address: '0x...' }).then(r => console.log(r.usdPrice))"

# Multiple tokens
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/erc20/prices', { addresses: ['0x...', '0x...'] }).then(console.log)"

# Solana
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/token/mainnet/prices', { network: 'mainnet', include: 'usd' }).then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/erc20-get-price
