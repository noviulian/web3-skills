# Get Token Pairs

Get DEX liquidity pairs for a token.

## Endpoint

- **EVM:** `GET /erc20/:address/pairs`

## Query Examples

```bash
# Get pairs
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/erc20/:address/pairs', { address: '0x...', exchange: 'uniswap_v2' }).then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/erc20-get-pairs
