---
layout: default
title: Installation Guide
---

# Installation Guide

Follow these steps to install Web3 Skills for Claude Code.

## Prerequisites

- **Node.js** installed (for running queries)
- **[Moralis API key](https://admin.moralis.io/register)** - Get one free (no credit card required)

## Installation Methods

### Method 1: Install All Skills

```bash
# Clone to Claude skills directory
cd ~/.claude/skills
git clone https://github.com/noviulian/web3-skills.git

# The skills are now in ~/.claude/skills/web3-skills/skills/
```

### Method 2: Install Individual Skills

```bash
# Create skills directory if it doesn't exist
mkdir -p ~/.claude/skills

# Copy specific skills
git clone https://github.com/noviulian/web3-skills.git /tmp/web3-skills
cp -r /tmp/web3-skills/skills/web3-wallet-api ~/.claude/skills/
cp -r /tmp/web3-skills/skills/web3-token-api ~/.claude/skills/
# ... add more skills as needed
```

### Method 3: Manual Installation

1. Download the skill directory you want
2. Copy it to `~/.claude/skills/`
3. Ensure the directory contains `SKILL.md` and `query.js`

## Setting Your API Key

### For Individual Skills

```bash
# Replace YOUR_API_KEY from https://admin.moralis.io/register
echo "MORALIS_API_KEY=YOUR_API_KEY" > ~/.claude/skills/web3-wallet-api/.env
```

### For All Skills at Once

```bash
# Set API key for all Web3 skills
API_KEY="YOUR_API_KEY"
cd ~/.claude/skills/web3-skills/skills
for dir in web3-*; do
  echo "MORALIS_API_KEY=$API_KEY" > "$dir/.env"
done
echo "✅ API key set for all skills"
```

## Verification

Test that a skill is working:

```bash
cd ~/.claude/skills/web3-wallet-api
node -e "const { query } = require('./query'); query('/:address/balance', { address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' }).then(console.log).catch(console.error)"
```

Expected response:
```json
{
  "balance": "1000000000000000000"
}
```

## Supported Environments

| Environment | Skills Directory |
|-------------|-----------------|
| Claude Code (Desktop) | `~/.claude/skills/` |
| Claude Code (CLI) | `~/.claude/skills/` |
| Project-specific | `<project>/.claude/skills/` |

## Troubleshooting

### "API key not found" error

The `.env` file is missing. Create it:

```bash
echo "MORALIS_API_KEY=YOUR_KEY" > ~/.claude/skills/SKILL_NAME/.env
```

### "SKILL.md not found" error

Make sure you copied the entire skill directory, including the `SKILL.md` file.

### Query returns errors

1. Verify your API key is valid at [admin.moralis.io](https://admin.moralis.io/register)
2. Check the address format is correct
3. Ensure you have network access

## Uninstallation

```bash
# Remove individual skill
rm -rf ~/.claude/skills/web3-wallet-api

# Remove all Web3 skills
rm -rf ~/.claude/skills/web3-skills
```

## Next Steps

- See [Usage Examples](/web3-skills/examples) for common queries
- Check [API Reference](/web3-skills/api-reference) for endpoint details
