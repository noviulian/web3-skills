# EVM DeFi API Endpoints

## Get DeFi Summary
- **Endpoint:** `GET /wallets/:address/defi/summary`
- **Description:** Get all DeFi protocols used by wallet with aggregated values
- **Auto-chain:** Yes

## Get DeFi Positions Summary
- **Endpoint:** `GET /wallets/:address/defi/positions`
- **Description:** Get all DeFi positions across all protocols
- **Auto-chain:** Yes
- **Params:** `cursor`, `limit`

## Get Positions by Protocol
- **Endpoint:** `GET /wallets/:address/defi/:protocol/positions`
- **Description:** Get detailed positions for specific protocol
- **Auto-chain:** Yes
- **Protocols:** aave-v2, aave-v3, compound-v2, compound-v3, uniswap-v2, uniswap-v3, sushiswap, curve, yearn-v2, yearn-v3, etc.

## Supported DeFi Protocols

### Lending
- Aave V2, Aave V3
- Compound V2, Compound V3

### DEX
- Uniswap V2, Uniswap V3
- SushiSwap
- PancakeSwap V2, PancakeSwap V3
- Curve

### Yield
- Yearn V2, Yearn V3
- Enzyme

### Staking
- Lido
- Rocket Pool
