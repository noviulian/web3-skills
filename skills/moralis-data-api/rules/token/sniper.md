# Get Sniper Detection

Detect early buyers (snipers) for a token pair.

## Endpoint

- **EVM:** `GET /pairs/:address/snipers`

## Query Examples

```bash
# Get snipers
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/pairs/:address/snipers', { address: '0x...' }).then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-token-snipers
