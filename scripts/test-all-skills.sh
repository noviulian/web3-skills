#!/bin/bash

# Test all skills for basic functionality

echo "Testing Moralis API Skills..."
echo ""

# Check API key (look in project root or .claude directory)
if [ -f ".env" ]; then
  echo "✓ API key found at project root (.env)"
elif [ -f ".claude/.env" ]; then
  echo "✓ API key found at .claude/.env"
else
  echo "✗ API key not found. Create .env file with MORALIS_API_KEY"
  exit 1
fi

echo ""

# Test each skill loads
# Updated to use new skill names from skills/ directory
SKILLS=("moralis-wallet-api" "moralis-nft-api" "moralis-token-api" "moralis-defi-api" "moralis-entity-api" "moralis-price-api" "moralis-blockchain-api" "moralis-utils" "moralis-premium" "moralis-analytics-api" "moralis-score-api" "moralis-sniper-api" "moralis-streams-api" "moralis-api-key")

for skill in "${SKILLS[@]}"; do
  if [ -d "skills/$skill" ]; then
    if [ -f "skills/$skill/query.js" ]; then
      echo "✓ $skill - query.js exists"
    else
      echo "✗ $skill - query.js missing"
    fi
    if [ -f "skills/$skill/SKILL.md" ]; then
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
