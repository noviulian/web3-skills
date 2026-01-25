# Moralis API Skills

A comprehensive collection of Claude Code skills for [Moralis API](https://admin.moralis.io/register) integration with Web3 blockchain data.

**Skills collection:**
- **Web3 API Skills** (10 skills) - EVM & Solana blockchain data APIs
- **Streams API Skills** (1 skill) - Real-time blockchain event monitoring with webhooks

## Quick Start

**Step 1:** Install the skills
```bash
npx skills add noviulian/moralis-api-skills
```

Optional: List all available skills
```bash
npx skills add noviulian/moralis-api-skills --list
```

**Step 2:** Set your API key
```bash
/moralis-api-key <paste your API key here>
```

## Features

- **Zero Dependencies** - Pure Node.js built-in modules only
- **Dual Blockchain Support** - EVM chains and Solana
- **Real-time Event Streaming** - Webhook-based monitoring
- **Skills-Based Architecture** - Install via `npx skills add`

## Web3 API Skills

10 modular skills for EVM and Solana blockchain data:

| Skill | EVM | Solana | Description |
|-------|-----|--------|-------------|
| **Wallet API** | ✅ 26 endpoints | ✅ 5 endpoints | Balances, history, NFTs, DeFi positions |
| **Token API** | ✅ 50+ endpoints | ✅ 33 endpoints | Prices, metadata, swaps, pairs, analytics, scores, snipers |
| **NFT API** | ✅ 28 endpoints | ✅ 2 endpoints | Metadata, transfers, traits, rarity |
| **Price API** | ✅ 8 endpoints | ✅ 3 endpoints | Token/NFT prices, OHLCV |
| **DeFi API** | ✅ 3 endpoints | ❌ | Protocol positions and exposure |
| **Entity API** | ✅ 4 endpoints | ❌ | Labeled addresses/entities |
| **Blockchain API** | ✅ 7 endpoints | ❌ | Blocks and transactions |
| **Streams API** | ✅ All stream types | ❌ | Real-time event monitoring |

**v2.0.0 Note:** The Token API now includes advanced analytics, security scores, sniper detection, and volume timeseries (previously separate analytics/score/sniper/premium skills).

## Streams API Skills

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

# Token analytics (now in Token API)
"Get analytics for token 0x6B175474E89094C44Da98b954EedeAC495271d0F"

# Token security score (now in Token API)
"Check security score for token 0x..."

# DEX sniper detection (now in Token API)
"Get snipers for DEX pair 0x..."

# Create a stream for monitoring ETH transfers
"Create a stream to monitor all ERC20 transfers on Ethereum"

# Pause a stream
"Pause the stream with ID a1b2c3d4-e5f6-7890-abcd-ef1234567890"
```

## Installation Paths

Skills can be installed in different locations:

- **Global:** `~/.claude/skills/<skill-name>/`
- **Project-specific:** `<project>/.claude/skills/<skill-name>/`

The query clients automatically discover the `.env` file from the skill directory or its parent directories.

## Supported Chains

**EVM:** eth, polygon, bsc, arbitrum, optimism, avalanche, fantom, base, and more

**Solana:** mainnet, devnet

## Development

### Regenerating REST Rules

The skill rules are generated from the swagger documentation:

```bash
node scripts/generate-endpoint-rules.js
```

This reads `swagger/api-configs.json` and creates per-endpoint markdown files in `skills/*/rules/`.

## Documentation

- **Get API Key:** Register at [admin.moralis.io/register](https://admin.moralis.io/register), then get your key at [admin.moralis.com/api-keys](https://admin.moralis.com/api-keys)
- [Moralis EVM API Docs](https://deep-index.moralis.io/api-docs-2.2/)
- [Moralis Solana API Docs](https://solana-gateway.moralis.io/api/)
- [Moralis Streams API Docs](https://docs.moralis.io/streams)

## License

MIT License - see [LICENSE](LICENSE) file for details.
