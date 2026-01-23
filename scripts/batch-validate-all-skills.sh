#!/bin/bash

# Batch Validation Script for All Moralis API Skills
# Usage: ./scripts/batch-validate-all-skills.sh

set -e

echo "======================================"
echo "Moralis API Skills - Batch Audit"
echo "======================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Create output directory
mkdir -p documentation/audit-reports

# Initialize counters
TOTAL_FILES=0
VALID_FILES=0
INVALID_FILES=0
TOTAL_ENDPOINTS=0
VALID_ENDPOINTS=0
INVALID_ENDPOINTS=0

# Array to store files with issues
declare -a FILES_WITH_ISSUES

# Function to validate a single file
validate_file() {
  local file="$1"
  local filename=$(basename "$file")

  echo -e "${YELLOW}Validating:${NC} $file"

  # Run the validation script
  local output
  output=$(node documentation/extract-endpoints.js --validate "$file" 2>&1)
  local exit_code=$?

  # Parse output
  local valid_count=$(echo "$output" | grep "Valid:" | awk '{print $2}')
  local invalid_count=$(echo "$output" | grep "Invalid:" | awk '{print $2}')

  TOTAL_ENDPOINTS=$((TOTAL_ENDPOINTS + valid_count + invalid_count))
  VALID_ENDPOINTS=$((VALID_ENDPOINTS + valid_count))
  INVALID_ENDPOINTS=$((INVALID_ENDPOINTS + invalid_count))

  if [ $exit_code -eq 0 ] && [ "$invalid_count" = "0" ]; then
    echo -e "  ${GREEN}✓ PASS${NC} - All $valid_count endpoints valid"
    VALID_FILES=$((VALID_FILES + 1))
  else
    echo -e "  ${RED}✗ FAIL${NC} - $invalid_count invalid endpoints"
    echo "$output" > "documentation/audit-reports/$(basename $file .md)_report.txt"
    FILES_WITH_ISSUES+=("$file")
    INVALID_FILES=$((INVALID_FILES + 1))
  fi

  TOTAL_FILES=$((TOTAL_FILES + 1))
  echo ""
}

# Function to validate query.js files
validate_query_js() {
  local file="$1"

  echo -e "${YELLOW}Validating query.js:${NC} $file"

  # Check if it's the shared query or streams query
  if [[ "$file" == *"web3-shared/query.js" ]]; then
    echo -e "  ${GREEN}✓ SKIP${NC} - Core query.js (manual review required)"
  elif [[ "$file" == *"moralis-streams-api/query.js" ]]; then
    echo -e "  ${GREEN}✓ SKIP${NC} - Streams query.js (manual review required)"
  elif [[ "$file" == *"moralis-api-key/query.js" ]]; then
    echo -e "  ${GREEN}✓ SKIP${NC} - API key command (manual review required)"
  else
    # Check if it properly re-exports from web3-shared
    local content=$(cat "$file")
    if [[ "$content" == *"module.exports = require(\"../web3-shared/query\")"* ]] || \
       [[ "$content" == *"module.exports = require('../web3-shared/query')"* ]]; then
      echo -e "  ${GREEN}✓ PASS${NC} - Correctly re-exports from web3-shared"
      VALID_FILES=$((VALID_FILES + 1))
    else
      echo -e "  ${RED}✗ FAIL${NC} - Does not properly re-export from web3-shared"
      FILES_WITH_ISSUES+=("$file")
      INVALID_FILES=$((INVALID_FILES + 1))
    fi
    TOTAL_FILES=$((TOTAL_FILES + 1))
  fi
  echo ""
}

echo "Phase 1: Validating SKILL.md files"
echo "===================================="
echo ""

# Find and validate all SKILL.md files
for file in skills/*/SKILL.md; do
  if [ -f "$file" ]; then
    validate_file "$file"
  fi
done

echo ""
echo "Phase 2: Validating reference documentation"
echo "============================================"
echo ""

# Find and validate all ENDPOINTS.md files
for file in skills/*/references/*ENDPOINTS.md; do
  if [ -f "$file" ]; then
    validate_file "$file"
  fi
done

echo ""
echo "Phase 3: Validating query.js files"
echo "==================================="
echo ""

# Find and validate all query.js files
for file in skills/*/query.js; do
  if [ -f "$file" ]; then
    validate_query_js "$file"
  fi
done

echo ""
echo "======================================"
echo "Audit Summary"
echo "======================================"
echo ""
echo -e "Files validated: $TOTAL_FILES"
echo -e "  ${GREEN}Passed:${NC} $VALID_FILES"
echo -e "  ${RED}Failed:${NC} $INVALID_FILES"
echo ""
echo -e "Endpoints checked: $TOTAL_ENDPOINTS"
echo -e "  ${GREEN}Valid:${NC} $VALID_ENDPOINTS"
echo -e "  ${RED}Invalid:${NC} $INVALID_ENDPOINTS"
echo ""

if [ ${#FILES_WITH_ISSUES[@]} -gt 0 ]; then
  echo -e "${RED}Files with issues:${NC}"
  for file in "${FILES_WITH_ISSUES[@]}"; do
    echo -e "  ${RED}✗${NC} $file"
  done
  echo ""
  echo -e "${YELLOW}Detailed reports saved to:${NC} documentation/audit-reports/"
  exit 1
else
  echo -e "${GREEN}✓ All validations passed!${NC}"
  echo ""
  echo "Next steps:"
  echo "1. Review the endpoints report: node documentation/extract-endpoints.js --export-all > documentation/all_endpoints.txt"
  echo "2. Manually review web3-shared/query.js for coding issues"
  echo "3. Manually review streams-api/query.js for coding issues"
  echo "4. Add function names to each endpoint in SKILL.md files"
  exit 0
fi
