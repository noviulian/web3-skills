---
name: web3-api-key
description: Set your Moralis API key for Web3 skills. Usage: /web3-api-key <your_api_key_here>
---

# Web3 API Key Setup

Set your Moralis API key to start using Web3 skills.

## Usage

Simply run:
```
/web3-api-key <paste your API key here>
```

For example:
```
/web3-api-key eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

I'll automatically configure the API key for all 9 Web3 skills at once.

## Quick Setup

### Method 1: Set API Key for All Skills (Recommended)

```bash
# Set API key for all skills at once
API_KEY="paste_your_actual_key_here"

# Set in plugin source directory (for development)
MARKETPLACE_DIR=$(ls -d ~/.claude/plugins/marketplaces/web3-skills* 2>/dev/null | head -1)
if [ -d "$MARKETPLACE_DIR/skills" ]; then
  cd "$MARKETPLACE_DIR/skills"
  for dir in web3-*; do
    echo "MORALIS_API_KEY=$API_KEY" > "$dir/.env"
  done
fi

# Set in cache directory (where installed plugins actually run)
CACHE_DIR=$(ls -d ~/.claude/plugins/cache/web3-skills-marketplace/web3-skills/*/skills 2>/dev/null | head -1)
if [ -n "$CACHE_DIR" ]; then
  for dir in "$CACHE_DIR"/web3-*; do
    echo "MORALIS_API_KEY=$API_KEY" > "$dir/.env"
  done
fi

echo "✅ API key set for all 9 skills"
```

### Method 2: Set Individual Skills

```bash
# For each skill you want to use
MARKETPLACE_DIR=$(ls -d ~/.claude/plugins/marketplaces/web3-skills* 2>/dev/null | head -1)
CACHE_DIR=$(ls -d ~/.claude/plugins/cache/web3-skills-marketplace/web3-skills/*/skills 2>/dev/null | head -1)

# Set in both plugin and cache directories
echo "MORALIS_API_KEY=paste_your_actual_key_here" > "$MARKETPLACE_DIR/skills/web3-wallet-api/.env"
[ -n "$CACHE_DIR" ] && echo "MORALIS_API_KEY=paste_your_actual_key_here" > "$CACHE_DIR/web3-wallet-api/.env"

echo "MORALIS_API_KEY=paste_your_actual_key_here" > "$MARKETPLACE_DIR/skills/web3-token-api/.env"
[ -n "$CACHE_DIR" ] && echo "MORALIS_API_KEY=paste_your_actual_key_here" > "$CACHE_DIR/web3-token-api/.env"

echo "MORALIS_API_KEY=paste_your_actual_key_here" > "$MARKETPLACE_DIR/skills/web3-nft-api/.env"
[ -n "$CACHE_DIR" ] && echo "MORALIS_API_KEY=paste_your_actual_key_here" > "$CACHE_DIR/web3-nft-api/.env"
# ... repeat for other skills
```

## Get Your API Key

1. **Register:** [admin.moralis.io/register](https://admin.moralis.io/register) (free, no credit card required)
2. **Get API Key:** [admin.moralis.com/api-keys](https://admin.moralis.com/api-keys)

**Note:** A single Moralis API key provides access to both EVM and Solana APIs.

## Verify It's Working

```bash
# Test wallet balance query
# Note: Skills run from the cache directory when installed
CACHE_DIR=$(ls -d ~/.claude/plugins/cache/web3-skills-marketplace/web3-skills/*/skills 2>/dev/null | head -1)
cd "$CACHE_DIR/web3-wallet-api"
node query.js /0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/balance
```

Expected response:
```json
{
  "balance": "1000000000000000000",
  "balance_formatted": "1.0 ETH"
}
```

## Troubleshooting

**"API key not found" error:**
- The API key must be set in BOTH the plugin source directory AND the cache directory
- Use Method 1 above to automatically set it in both locations
- Verify `.env` files exist in both:
  - `~/.claude/plugins/marketplaces/web3-skills/skills/web3-*/.env`
  - `~/.claude/plugins/cache/web3-skills-marketplace/web3-skills/*/skills/web3-*/.env`

**"Invalid .env file" error:**
- Ensure the file format is exactly: `MORALIS_API_KEY=your_key_here`
- No extra spaces or quotes around the key

**API authentication error:**
- Verify you registered at [admin.moralis.io/register](https://admin.moralis.io/register)
- Check your API key at [admin.moralis.com/api-keys](https://admin.moralis.com/api-keys)
