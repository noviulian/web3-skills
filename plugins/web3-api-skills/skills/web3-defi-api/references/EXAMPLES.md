# Web3 DeFi API - Usage Examples

## Example 1: Get All DeFi Positions

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/wallets/:address/defi/positions', { address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' })
  .then(data => {
    console.log('Total DeFi positions:', data.result?.length || 0);
    data.result?.forEach(pos => {
      console.log('-', pos.protocol, ':', pos.usd_value, 'USD');
    });
  })
  .catch(console.error);
"
```

## Example 2: Get Aave V3 Positions

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/wallets/:address/defi/aave-v3/positions', {
  address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
})
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(console.error);
"
```

## Example 3: Get DeFi Summary on Polygon

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/wallets/:address/defi/summary', {
  address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
  chain: 'polygon'
})
  .then(data => {
    console.log('Protocols on Polygon:', data.result?.length || 0);
  })
  .catch(console.error);
"
```
