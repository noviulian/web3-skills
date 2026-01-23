#!/bin/bash

# Test installation flow for skills-only layout

echo "Testing Installation Flow (Skills-Only Layout)"
echo "============================="
echo ""

# Test 1: Check skills directory exists
echo "Test 1: Skills Directory"
if [ -d "skills" ]; then
  echo "✓ Skills directory exists"
else
  echo "✗ Skills directory missing"
  exit 1
fi
echo ""

# Test 2: Count all skill directories
echo "Test 2: Skill Directories"
SKILL_COUNT=$(find skills -maxdepth 1 -type d ! -name "skills" ! -name "web3-shared" | wc -l)
echo "Found $SKILL_COUNT skill directories"
if [ "$SKILL_COUNT" -ge 9 ]; then
  echo "✓ At least 9 skills present (found $SKILL_COUNT)"
else
  echo "✗ Expected at least 9 skills, found $SKILL_COUNT"
fi
echo ""

# Test 3: Check shared utilities
echo "Test 3: Shared Utilities"
if [ -f "skills/web3-shared/query.js" ]; then
  echo "✓ Shared query.js exists"
  if node -e "require('./skills/web3-shared/query.js')" 2>/dev/null; then
    echo "✓ query.js loads without errors"
  else
    echo "✗ query.js has syntax errors"
  fi
else
  echo "✗ Shared query.js missing"
fi
echo ""

# Test 4: Check API key command
echo "Test 4: API Key Command"
if [ -f "skills/moralis-api-key/SKILL.md" ]; then
  echo "✓ API key command skill exists"
else
  echo "✗ API key command skill missing"
fi
echo ""

# Test 5: Sample skill validation
echo "Test 5: Sample Skill Validation"
SAMPLE_SKILL="skills/moralis-wallet-api"
if [ -d "$SAMPLE_SKILL" ]; then
  if [ -f "$SAMPLE_SKILL/SKILL.md" ] && [ -f "$SAMPLE_SKILL/query.js" ]; then
    echo "✓ Sample skill has SKILL.md and query.js"
  else
    echo "✗ Sample skill missing required files"
  fi
else
  echo "✗ Sample skill directory not found"
fi
echo ""

echo "============================="
echo "Installation test complete!"
echo ""
echo "Note: Skills-only layout does not use plugin manifests or marketplace.json"
echo "Skills are located at: skills/<skill-name>/"
