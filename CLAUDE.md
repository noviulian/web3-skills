# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a collection of Claude Code skills for integrating with the Moralis Web3 API. It provides modular skills for querying blockchain data from both EVM (Ethereum, Polygon, BSC, etc.) and Solana networks, plus real-time event streaming.

**Zero-dependency architecture:** All code uses only Node.js built-in modules (https, fs, path, url, crypto). No npm packages are installed.

## Skills Architecture

```
skills/
├── moralis-api-key/        # Shared API key management
├── moralis-data-api/       # Unified EVM + Solana data API (140+ endpoints)
└── moralis-streams-api/    # Real-time blockchain event streaming
```

### moralis-api-key
Manages the shared `MORALIS_API_KEY` environment variable. Skills auto-discover the `.env` file by searching upward from their installation directory.

### moralis-data-api
Primary skill for blockchain data queries. Auto-detects EVM vs Solana based on address format:
- EVM addresses: `0x...` → routes to `https://deep-index.moralis.io/api/v2.2`
- Solana addresses: base58 → routes to `https://solana-gateway.moralis.io`

### moralis-streams-api
Real-time event monitoring with webhooks. Uses separate base URL: `https://api.moralis-streams.com`

## Development Commands

```bash
# Generate endpoint markdown rules from swagger config
node scripts/generate-endpoint-rules.js

# Extract endpoints from swagger documentation
node scripts/extract-endpoints.js

# Check for endpoint naming collisions
node scripts/check-collisions.js

# Validate Solana suffix naming (all Solana endpoints must have __solana)
node scripts/check-solana-suffix.js
```

## Source of Truth

`swagger/api-configs.json` defines all endpoints. The `generate-endpoint-rules.js` script:
1. Reads `api-configs.json`
2. Creates per-endpoint markdown files in `skills/*/rules/`
3. Updates SKILL.md files with endpoint catalogs

**Never edit individual rule files directly.** Edit `api-configs.json` and regenerate.

## Endpoint Naming Convention

- **Solana endpoints:** Always suffixed with `__solana` (e.g., `getWalletBalance__solana.md`)
- **EVM endpoints:** No suffix unless collision exists (then `__evm`)
- This convention is strictly enforced by the generator script

## Skill Frontmatter Pattern

All SKILL.md files use YAML frontmatter:

```yaml
---
name: skill-name
description: Single-line description
license: MIT
compatibility: Requires Node.js (built-in modules only)
metadata:
    version: "x.y.z"
    author: web3-skills
    tags: [web3, blockchain, ...]
context:
    fork: noviulian/moralis-api-skills
    agent: claude-code
allowed-tools:
    - Bash
invocation:
    max-turns: 2
    disable-model: false
---
```

## Query Client Pattern

Query clients use REST APIs via Node.js `https` module. The pattern:

1. Read `$MORALIS_API_KEY` from `.env` file (search upward from skill directory)
2. Build URL with path/query params
3. Make HTTPS request with `X-API-Key` header
4. Handle pagination with `cursor` parameter
5. Return formatted results

## Pagination Pattern

Many endpoints support cursor-based pagination:

```bash
# First request
curl "...?limit=100"

# Next page (use cursor from response)
curl "...?limit=100&cursor=<cursor>"
```

## Environment Variable Discovery

Skills find the `.env` file by searching upward:

```javascript
// Priority 1: Project-level skills
<project>/.claude/skills/        → <project>/.claude/.env

// Priority 2: Global skills
~/.claude/skills/                → ~/.claude/.env

// Fallback
process.cwd()
```

## Adding New Endpoints

1. Add endpoint definition to `swagger/api-configs.json`
2. Run `node scripts/generate-endpoint-rules.js`
3. Verify rule file was created in `skills/*/rules/`
4. Test endpoint with curl before skill usage

## Testing

No automated test suite. Test via:
1. Direct curl commands with `$MORALIS_API_KEY`
2. Skill invocation with sample queries
3. Verify both EVM and Solana routing when applicable

## Supported Chains

**EVM:** eth, polygon, bsc, arbitrum, optimism, avalanche, fantom, base, and more (see `api-configs.json` for full enum)

**Solana:** mainnet, devnet
