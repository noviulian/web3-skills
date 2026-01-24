# Get Token Security Score

Get security/trust score for a token.

## Endpoint

- **EVM:** `GET /tokens/:address/score`

## Query Examples

```bash
# Security score
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/tokens/:address/score', { address: '0x...' }).then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-token-price
