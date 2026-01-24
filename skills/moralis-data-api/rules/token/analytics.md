# Get Token Analytics

Get token analytics data (volume, holders, timeseries).

## Endpoint

- **EVM:** `GET /tokens/:address/analytics`
- **Volume timeseries:** `GET /volume/timeseries`

## Query Examples

```bash
# Token analytics
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/tokens/:address/analytics', { address: '0x...' }).then(console.log)"

# Volume timeseries
cd $SKILL_DIR
node -e "const { query } = require('./query'); query('/volume/timeseries', { token_address: '0x...' }).then(console.log)"
```

## API Reference

https://docs.moralis.io/web3-data-api/evm/reference/get-token-analytics
