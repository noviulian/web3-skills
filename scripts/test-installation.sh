#!/bin/bash

# Test installation flow

echo "Testing Installation Flow"
echo "============================="
echo ""

# Test 1: Check plugin structure
echo "Test 1: Plugin Structure"
if [ -f ".claude-plugin/plugin.json" ] && [ -f ".claude-plugin/marketplace.json" ]; then
  echo "✓ Plugin metadata exists"
else
  echo "✗ Plugin metadata missing"
  exit 1
fi
echo ""

# Test 2: Check all skill directories
echo "Test 2: Skill Directories"
SKILL_COUNT=$(find skills -maxdepth 1 -type d -name "web3-*" | wc -l)
echo "Found $SKILL_COUNT skill directories"
if [ "$SKILL_COUNT" -eq 9 ]; then
  echo "✓ All 9 skills present"
else
  echo "✗ Expected 9 skills, found $SKILL_COUNT"
fi
echo ""

# Test 3: Check shared utilities
echo "Test 3: Shared Utilities"
if [ -f "skills/shared/query.js" ]; then
  echo "✓ Shared query.js exists"
  if node -e "require('./skills/shared/query.js')" 2>/dev/null; then
    echo "✓ query.js loads without errors"
  else
    echo "✗ query.js has syntax errors"
  fi
else
  echo "✗ Shared query.js missing"
fi
echo ""

# Test 4: Check command
echo "Test 4: Commands"
if [ -f "commands/web3-api-key.md" ]; then
  echo "✓ API key command exists"
else
  echo "✗ API key command missing"
fi
echo ""

# Test 5: Validate JSON files
echo "Test 5: JSON Validation"
if command -v python3 &> /dev/null; then
  python3 -m json.tool .claude-plugin/plugin.json > /dev/null 2>&1
  if [ $? -eq 0 ]; then
    echo "✓ plugin.json is valid JSON"
  else
    echo "✗ plugin.json has invalid JSON"
  fi

  python3 -m json.tool .claude-plugin/marketplace.json > /dev/null 2>&1
  if [ $? -eq 0 ]; then
    echo "✓ marketplace.json is valid JSON"
  else
    echo "✗ marketplace.json has invalid JSON"
  fi
else
  echo "⚠ python3 not found, skipping JSON validation"
fi
echo ""

echo "============================="
echo "Installation test complete!"
