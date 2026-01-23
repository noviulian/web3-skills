#!/bin/bash

# Test all skills for basic functionality

echo "Testing Web3 Skills..."
echo ""

# Check API key
if [ ! -f "plugins/web3-api-skills/skills/web3-wallet-api/.env" ]; then
  echo "API key not found. Run: /web3-api-key"
  exit 1
fi

echo "API key found"
echo ""

# Test each skill loads
SKILLS=("web3-wallet-api" "web3-nft-api" "web3-token-api" "web3-defi-api" "web3-entity-api" "web3-price-api" "web3-blockchain-api" "web3-utils" "web3-premium")

for skill in "${SKILLS[@]}"; do
  if [ -d "plugins/web3-api-skills/skills/$skill" ]; then
    if [ -f "plugins/web3-api-skills/skills/$skill/query.js" ]; then
      echo "✓ $skill - query.js exists"
    else
      echo "✗ $skill - query.js missing"
    fi
    if [ -f "plugins/web3-api-skills/skills/$skill/SKILL.md" ]; then
      echo "✓ $skill - SKILL.md exists"
    else
      echo "✗ $skill - SKILL.md missing"
    fi
  else
    echo "✗ $skill - directory missing"
  fi
done

echo ""
echo "Test complete!"
