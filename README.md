# Web3 Skills for Claude Code

Comprehensive Web3 data skills for Claude Code supporting both **EVM chains** (Ethereum, Polygon, BSC, etc.) and **Solana** using the Moralis API.

## Features

- **Zero Dependencies** - Pure Node.js built-in modules only
- **Dual Blockchain Support** - EVM and Solana with auto-detection
- **9 Modular Skills** - Wallet, Token, NFT, DeFi, Entity, Price, Blockchain, Utils, Premium
- **Plug and Play** - Install and use in under 30 seconds

## Quick Start

### Installation

```bash
# Add marketplace
/plugin marketplace add noviulian/web3-skills

# Install plugin
/plugin install web3-skills

# Set API key
/web3-api-key
```

### Usage

```bash
# EVM queries (auto-detected from 0x address)
"Get the balance of 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"

# Solana queries (auto-detected from base58 address)
"Get the balance of Solana wallet 742d35Cc6634C0532925a3b844Bc9e7595f0bEb"

# Specific chain
"Get my Polygon wallet balance"
```

## Skills

| Skill | EVM | Solana | Description |
|-------|-----|--------|-------------|
| **Wallet API** | ✅ 26 endpoints | ✅ 5 endpoints | Balances, history, NFTs, DeFi positions |
| **Token API** | ✅ 41 endpoints | ✅ 31 endpoints | Prices, metadata, swaps, pairs, Pump.fun |
| **NFT API** | ✅ 28 endpoints | ✅ 2 endpoints | Metadata, transfers, traits, rarity |
| **Price API** | ✅ 8 endpoints | ✅ 3 endpoints | Token/NFT prices, OHLCV |
| **DeFi API** | ✅ 3 endpoints | ❌ | Protocol positions and exposure |
| **Entity API** | ✅ 4 endpoints | ❌ | Labeled addresses/entities |
| **Blockchain API** | ✅ 7 endpoints | ❌ | Blocks and transactions |
| **Utils** | ✅ 2 endpoints | ❌ | API version, endpoint weights |
| **Premium** | ✅ 8 endpoints | ✅ 7 endpoints | Advanced analytics |

## Supported Chains

**EVM:** eth, polygon, bsc, arbitrum, optimism, avalanche, fantom, and more

**Solana:** mainnet, devnet

## Documentation

- [Implementation Plan](IMPLEMENTATION_PLAN.md)
- [Moralis EVM API](https://deep-index.moralis.io/api-docs-2.2/)
- [Moralis Solana API](https://solana-gateway.moralis.io/api/)

## License

MIT License - see [LICENSE](LICENSE) file for details.
