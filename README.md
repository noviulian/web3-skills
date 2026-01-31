# Moralis API Skills

Claude Code skills for [Moralis Web3 API](https://admin.moralis.com/register). Query blockchain data from EVM chains and Solana, plus real-time event streaming.

## Quick Start

```bash
# Install the skills
npx skills add novnski/moralis-api-skills

# Set your API key (when using either skill)
Set this as the Moralis API key: <paste your API key here>
```

## Skills

| Skill | Description |
|-------|-------------|
| **moralis-data-api** | EVM + Solana blockchain data (136 endpoints) |
| **moralis-streams-api** | Real-time event monitoring with webhooks (20 endpoints) |

## moralis-data-api

Unified skill for all blockchain data queries. Auto-detects EVM vs Solana from address format.

**Default Chain:** For EVM addresses without a specified chain, defaults to Ethereum (`0x1`).

**Categories:**
- Wallet (balances, tokens, NFTs, history)
- Token (prices, metadata, pairs, analytics, security scores)
- NFT (metadata, transfers, traits, rarity)
- DeFi (protocol positions, exposure)
- Entity (labeled addresses)
- Price (OHLCV, floor prices)
- Blockchain (blocks, transactions)

```bash
# EVM query - defaults to Ethereum if no chain specified
"Get the balance of 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"

# EVM query with specific chain
"Get the balance of 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 on Polygon"

# Solana query (auto-detected from base58 address)
"Get the balance of Solana wallet 742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
```

## moralis-streams-api

Real-time blockchain event monitoring with webhooks.

**Stream types:** tx, log, erc20transfer, erc20approval, nfttransfer, internalTx

```bash
# Create a stream
"Create a stream to monitor all ERC20 transfers on Ethereum"

# Manage streams
"Pause the stream with ID a1b2c3d4-e5f6-7890-abcd-ef1234567890"
```

## Supported Chains

**EVM:** eth, polygon, bsc, arbitrum, optimism, avalanche, fantom, base, and more

**Solana:** mainnet, devnet

## Documentation

- Get API key: [admin.moralis.com/register](https://admin.moralis.com/register)
- [EVM API Docs](https://deep-index.moralis.io/api-docs-2.2/)
- [Solana API Docs](https://solana-gateway.moralis.io/api/)
- [Streams API Docs](https://docs.moralis.io/streams)

## License

MIT
