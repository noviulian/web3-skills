# Moralis API Skills Marketplace

Multi-plugin marketplace for [Moralis API](https://admin.moralis.io/register) integration with Claude Code. Contains two plugins:

1. **web3-api-skills** - EVM & Solana blockchain data APIs (9 modular skills)
2. **streams-api-skill** - Real-time blockchain event monitoring with webhooks

## Quick Start

**Step 1:** Add the marketplace
```bash
/plugin marketplace add noviulian/moralis-skills
```

**Step 2:** Install plugins
```bash
# Install web3-api-skills (EVM/Solana data APIs)
/plugin install web3-api-skills@moralis-api

# Install streams-api-skill (Real-time event monitoring)
/plugin install streams-api-skill@moralis-api
```

**Step 3:** Set your API key
```bash
/web3-api-key <paste your API key here>
```

## Features

- **Zero Dependencies** - Pure Node.js built-in modules only
- **Dual Blockchain Support** - EVM chains and Solana
- **Real-time Event Streaming** - Webhook-based monitoring
- **Plug and Play** - Install and use in under 30 seconds

## Plugin: web3-api-skills

9 modular skills for EVM and Solana blockchain data:

| Skill | EVM | Solana | Description |
|-------|-----|--------|-------------|
| **Wallet API** | ✅ 26 endpoints | ✅ 5 endpoints | Balances, history, NFTs, DeFi positions |
| **Token API** | ✅ 41 endpoints | ✅ 31 endpoints | Prices, metadata, swaps, pairs |
| **NFT API** | ✅ 28 endpoints | ✅ 2 endpoints | Metadata, transfers, traits, rarity |
| **Price API** | ✅ 8 endpoints | ✅ 3 endpoints | Token/NFT prices, OHLCV |
| **DeFi API** | ✅ 3 endpoints | ❌ | Protocol positions and exposure |
| **Entity API** | ✅ 4 endpoints | ❌ | Labeled addresses/entities |
| **Blockchain API** | ✅ 7 endpoints | ❌ | Blocks and transactions |
| **Utils** | ✅ 2 endpoints | ❌ | API version, endpoint weights |
| **Premium** | ✅ 8 endpoints | ✅ 7 endpoints | Advanced analytics |

## Plugin: streams-api-skill

Real-time blockchain event monitoring with webhooks:

**Stream Types:**
- `tx` - Native transactions
- `log` - Contract event logs
- `erc20transfer` - ERC20 token transfers
- `erc20approval` - ERC20 approvals
- `nfttransfer` - NFT transfers
- `internalTx` - Internal transactions

**Capabilities:**
- Create, update, delete, and get streams
- Add/remove addresses to streams
- Pause/resume streams
- Get stream history and block data
- Webhook event delivery

## Usage Examples

```bash
# EVM queries (auto-detected from 0x address)
"Get the balance of 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"

# Solana queries (auto-detected from base58 address)
"Get the balance of Solana wallet 742d35Cc6634C0532925a3b844Bc9e7595f0bEb"

# Create a stream for monitoring ETH transfers
"Create a stream to monitor all ERC20 transfers on Ethereum"

# Pause a stream
"Pause the stream with ID a1b2c3d4-e5f6-7890-abcd-ef1234567890"
```

## Supported Chains

**EVM:** eth, polygon, bsc, arbitrum, optimism, avalanche, fantom, base, and more

**Solana:** mainnet, devnet

## Documentation

- **Get API Key:** Register at [admin.moralis.io/register](https://admin.moralis.io/register), then get your key at [admin.moralis.com/api-keys](https://admin.moralis.com/api-keys)
- [Moralis EVM API Docs](https://deep-index.moralis.io/api-docs-2.2/)
- [Moralis Solana API Docs](https://solana-gateway.moralis.io/api/)
- [Moralis Streams API Docs](https://docs.moralis.io/streams)

## License

MIT License - see [LICENSE](LICENSE) file for details.
