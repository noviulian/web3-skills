#!/bin/bash

# Test installation flow

echo "Testing Installation Flow"
echo "============================="
echo ""

# Test 1: Check marketplace manifest
echo "Test 1: Marketplace Manifest"
if [ -f ".claude-plugin/marketplace.json" ]; then
  echo "✓ Marketplace metadata exists"
else
  echo "✗ Marketplace metadata missing"
  exit 1
fi
echo ""

# Test 2: Check plugin manifests
echo "Test 2: Plugin Manifests"
if [ -f "plugins/web3-api-skills/.claude-plugin/plugin.json" ]; then
  echo "✓ web3-api-skills plugin.json exists"
else
  echo "✗ web3-api-skills plugin.json missing"
fi
if [ -f "plugins/streams-api-skill/.claude-plugin/plugin.json" ]; then
  echo "✓ streams-api-skill plugin.json exists"
else
  echo "✗ streams-api-skill plugin.json missing"
fi
echo ""

# Test 3: Check all skill directories
echo "Test 3: Skill Directories"
SKILL_COUNT=$(find plugins/web3-api-skills/skills -maxdepth 1 -type d -name "web3-*" | wc -l)
echo "Found $SKILL_COUNT skill directories"
if [ "$SKILL_COUNT" -eq 9 ]; then
  echo "✓ All 9 skills present"
else
  echo "✗ Expected 9 skills, found $SKILL_COUNT"
fi
echo ""

# Test 4: Check shared utilities
echo "Test 4: Shared Utilities"
if [ -f "plugins/web3-api-skills/skills/web3-shared/query.js" ]; then
  echo "✓ Shared query.js exists"
  if node -e "require('./plugins/web3-api-skills/skills/web3-shared/query.js')" 2>/dev/null; then
    echo "✓ query.js loads without errors"
  else
    echo "✗ query.js has syntax errors"
  fi
else
  echo "✗ Shared query.js missing"
fi
echo ""

# Test 5: Check command
echo "Test 5: Commands"
if [ -f "plugins/web3-api-skills/commands/web3-api-key.md" ]; then
  echo "✓ API key command exists"
else
  echo "✗ API key command missing"
fi
echo ""

# Test 6: Validate JSON files
echo "Test 6: JSON Validation"
if command -v python3 &> /dev/null; then
  python3 -m json.tool .claude-plugin/marketplace.json > /dev/null 2>&1
  if [ $? -eq 0 ]; then
    echo "✓ marketplace.json is valid JSON"
  else
    echo "✗ marketplace.json has invalid JSON"
  fi

  python3 -m json.tool plugins/web3-api-skills/.claude-plugin/plugin.json > /dev/null 2>&1
  if [ $? -eq 0 ]; then
    echo "✓ web3-api-skills plugin.json is valid JSON"
  else
    echo "✗ web3-api-skills plugin.json has invalid JSON"
  fi

  python3 -m json.tool plugins/streams-api-skill/.claude-plugin/plugin.json > /dev/null 2>&1
  if [ $? -eq 0 ]; then
    echo "✓ streams-api-skill plugin.json is valid JSON"
  else
    echo "✗ streams-api-skill plugin.json has invalid JSON"
  fi
else
  echo "⚠ python3 not found, skipping JSON validation"
fi
echo ""

echo "============================="
echo "Installation test complete!"
