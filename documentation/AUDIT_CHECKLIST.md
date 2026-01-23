# Moralis API Skills - 25-Point Extensive Audit Checklist

## Overview
This checklist provides a systematic, line-by-line audit of all files in `/plugins/` directory for:
- Coding mistakes
- AI hallucinations
- Endpoint validation against `configs.json`
- Function name inclusion
- Documentation consistency

---

## Phase 1: Preparation & Tooling (Tasks 1-3)

### Task 1: Generate Endpoint Reference Document
**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

**Action:**
```bash
node documentation/extract-endpoints.js --export-all > documentation/all_endpoints_reference.txt
```

**Deliverables:**
- [ ] Complete list of all 212 function names with their paths
- [ ] Categorized by API group (wallet, nft, token, defi, etc.)
- [ ] Mark which endpoints are documented in which skills

**Validation:**
- [ ] File created successfully with 212 function entries
- [ ] Each entry shows: function name, HTTP path, method, category

---

### Task 2: Inventory All Plugin Files
**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

**Action:**
```bash
find plugins/ -type f \( -name "*.md" -o -name "*.js" -o -name "*.json" \) | sort > documentation/plugin_files_inventory.txt
```

**Files to Audit:**
- [ ] **web3-api-skills** (13 skills):
  - [ ] web3-wallet-api (SKILL.md, query.js, EVM_ENDPOINTPOINTS.md, SOLANA_ENDPOINTPOINTS.md)
  - [ ] web3-token-api (SKILL.md, query.js, EVM_ENDPOINTPOINTS.md, SOLANA_ENDPOINTPOINTS.md)
  - [ ] web3-nft-api (SKILL.md, query.js, EVM_ENDPOINTPOINTS.md, SOLANA_ENDPOINTPOINTS.md)
  - [ ] web3-defi-api (SKILL.md, query.js, EVM_ENDPOINTPOINTS.md)
  - [ ] web3-entity-api (SKILL.md, query.js, EVM_ENDPOINTPOINTS.md)
  - [ ] web3-price-api (SKILL.md, query.js, EVM_ENDPOINTPOINTS.md, SOLANA_ENDPOINTPOINTS.md)
  - [ ] web3-blockchain-api (SKILL.md, query.js, EVM_ENDPOINTPOINTS.md)
  - [ ] web3-utils (SKILL.md, query.js, EVM_ENDPOINTPOINTS.md)
  - [ ] web3-premium (SKILL.md, query.js, EVM_ENDPOINTPOINTS.md, SOLANA_ENDPOINTPOINTS.md)
  - [ ] web3-analytics-api (SKILL.md, query.js)
  - [ ] web3-score-api (SKILL.md, query.js)
  - [ ] web3-sniper-api (SKILL.md, query.js)
  - [ ] web3-shared/query.js (unified client)
- [ ] **streams-api-skills** (1 skill):
  - [ ] streams-api (SKILL.md, query.js, STREAMS_ENDPOINTS.md)
- [ ] **Agent files:** web3-developer.md
- [ ] **Command files:** web3-api-key.md

**Validation:**
- [ ] All 28+ files inventoried
- [ ] File sizes recorded
- [ ] Last modified dates noted

---

### Task 3: Create Validation Script
**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

**Action:** The `extract-endpoints.js` script is already created with `--validate` flag.

**Usage:**
```bash
# Validate a single skill file
node documentation/extract-endpoints.js --validate plugins/web3-api-skills/skills/web3-wallet-api/SKILL.md

# Batch validate all SKILL.md files
for file in plugins/*/skills/*/SKILL.md; do
  echo "=== Validating $file ==="
  node documentation/extract-endpoints.js --validate "$file"
done
```

**Validation:**
- [ ] Script handles endpoint extraction correctly
- [ ] Can detect invalid endpoints
- [ ] Reports function names for each endpoint

---

## Phase 2: web3-wallet-api Skill Audit (Tasks 4-7)

### Task 4: Audit web3-wallet-api SKILL.md
**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

**File:** `plugins/web3-api-skills/skills/web3-wallet-api/SKILL.md`

**Checklist:**
- [ ] **Frontmatter validation:**
  - [ ] name: web3-wallet-api
  - [ ] description matches actual functionality
  - [ ] version is current
  - [ ] tags are accurate

- [ ] **Endpoint validation (each endpoint listed):**
  - [ ] `/:address/balance` → Check if exists in configs.json
  - [ ] `/wallets/:address/chains` → Validate, find function name
  - [ ] `/wallets/:address/stats` → Validate, find function name
  - [ ] `/wallets/:address/net-worth` → Validate, find function name
  - [ ] `/wallets/:address/tokens` → Validate, find function name
  - [ ] `/wallets/:address/nfts` → Validate, find function name
  - [ ] All other endpoints in the file

- [ ] **Line-by-line checks:**
  - [ ] No contradictory statements
  - [ ] Parameter descriptions match configs.json
  - [ ] Response examples are accurate
  - [ ] Code examples use correct syntax

- [ ] **Function name addition:**
  - For each validated endpoint, add: `Also known as: \`getWalletActiveChains\``

**Deliverables:**
- [ ] List of invalid endpoints found (if any)
- [ ] List of missing function names to add
- [ ] List of inconsistencies with configs.json

---

### Task 5: Audit web3-wallet-api EVM_ENDPOINTPOINTS.md
**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

**File:** `plugins/web3-api-skills/skills/web3-wallet-api/references/EVM_ENDPOINTPOINTS.md`

**Checklist:**
- [ ] **Each endpoint section:**
  - [ ] Path is correct
  - [ ] HTTP method is correct
  - [ ] Path parameters match configs.json
  - [ ] Query parameters match configs.json (names, types, required/optional)
  - [ ] Response structure is accurate

- [ ] **Validation:**
  ```bash
  node documentation/extract-endpoints.js --validate \
    plugins/web3-api-skills/skills/web3-wallet-api/references/EVM_ENDPOINTPOINTS.md
  ```

**Deliverables:**
- [ ] All parameters validated against configs.json
- [ ] Any parameter type mismatches documented
- [ ] Any missing parameters identified

---

### Task 6: Audit web3-wallet-api SOLANA_ENDPOINTPOINTS.md
**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

**File:** `plugins/web3-api-skills/skills/web3-wallet-api/references/SOLANA_ENDPOINTPOINTS.md`

**Checklist:**
- [ ] **Solana-specific validation:**
  - [ ] Base URL is correct (`https://solana-gateway.moralis.io/`)
  - [ ] Network paths use `/mainnet/` or `/devnet/`
  - [ ] Address format is base58 (not 0x)
  - [ ] All endpoints exist in `solana` category of configs.json

- [ ] **Parameter validation:**
  - [ ] Path parameters match Solana requirements
  - [ ] Query parameters match configs.json

**Deliverables:**
- [ ] Solana-specific endpoints validated
- [ ] Any EVM-specific patterns mistakenly used documented

---

### Task 7: Audit web3-wallet-api query.js
**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

**File:** `plugins/web3-api-skills/skills/web3-wallet-api/query.js`

**Checklist:**
- [ ] **Code validation:**
  - [ ] Correctly re-exports from web3-shared
  - [ ] No syntax errors
  - [ ] No extra dependencies imported
  - [ ] File follows same pattern as other skills

**Code to verify:**
```javascript
module.exports = require("../web3-shared/query");
```

**Deliverables:**
- [ ] Code is correct and consistent with other skills

---

## Phase 3: web3-token-api Skill Audit (Tasks 8-10)

### Task 8: Audit web3-token-api SKILL.md & Reference Files
**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

**Files:**
- `plugins/web3-api-skills/skills/web3-token-api/SKILL.md`
- `plugins/web3-api-skills/skills/web3-token-api/references/EVM_ENDPOINTPOINTS.md`
- `plugins/web3-api-skills/skills/web3-token-api/references/SOLANA_ENDPOINTPOINTS.md`

**Checklist:**
- [ ] **Token endpoints to validate:**
  - [ ] `/erc20/prices` → Find function name in configs.json
  - [ ] `/erc20/:address/price` → Validate
  - [ ] `/erc20/:address` → Validate
  - [ ] `/erc20/:address/approvals` → Validate
  - [ ] `/token/:address/price` → Validate
  - [ ] All token-related endpoints

- [ ] **Token-specific checks:**
  - [ ] DEX endpoints (pairs, swaps) are correct
  - [ ] Token metadata endpoints are accurate
  - [ ] Spam/verified filters mentioned if available
  - [ ] v1.1.0 features documented (security scores, snipers, analytics)

**Validation:**
```bash
node documentation/extract-endpoints.js --validate \
  plugins/web3-api-skills/skills/web3-token-api/SKILL.md
```

**Deliverables:**
- [ ] All endpoints validated
- [ ] Function names identified for each endpoint
- [ ] New v1.1.0 endpoints verified to exist

---

### Task 9: Audit web3-token-api query.js
**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

**File:** `plugins/web3-api-skills/skills/web3-token-api/query.js`

**Checklist:**
- [ ] Re-exports from web3-shared correctly
- [ ] No custom code that breaks the pattern

---

### Task 10: Cross-Reference Token Endpoints
**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

**Action:**
```bash
# Search for token-related endpoints in configs.json
node documentation/extract-endpoints.js "token"
node documentation/extract-endpoints.js "erc20"
node documentation/extract-endpoints.js "dex"
```

**Deliverables:**
- [ ] List of all token endpoints in configs.json
- [ ] Comparison with what's documented in SKILL.md
- [ ] Missing endpoints identified

---

## Phase 4: web3-nft-api Skill Audit (Tasks 11-13)

### Task 11: Audit web3-nft-api SKILL.md & Reference Files
**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

**Files:**
- `plugins/web3-api-skills/skills/web3-nft-api/SKILL.md`
- `plugins/web3-api-skills/skills/web3-nft-api/references/EVM_ENDPOINTPOINTS.md`
- `plugins/web3-api-skills/skills/web3-nft-api/references/SOLANA_ENDPOINTPOINTS.md`

**NFT Endpoints to Validate:**
- [ ] `/:address/nft` → Find function name
- [ ] `/:address/nft/transfers` → Validate
- [ ] `/nft/:address` → Validate
- [ ] `/nft/:address/metadata` → Validate
- [ ] `/nft/:address/:token_id` → Validate
- [ ] `/nft/:address/owners` → Validate
- [ ] `/nft/:address/transfers` → Validate
- [ ] `/nft/:address/traits` → Validate
- [ ] `/nft/:address/sync` → Validate
- [ ] `/nft/:address/price` → Validate (v1.1.0)
- [ ] `/nft/:address/floor-price` → Validate
- [ ] `/nft/:address/floor-price/historical` → Validate (v1.1.0)
- [ ] All other NFT endpoints

**NFT-Specific Checks:**
- [ ] Token ID parameter handling is correct
- [ ] Sync/resync endpoints documented accurately
- [ ] Trait/attribute endpoints are valid
- [ ] Floor price endpoints exist (v1.1.0 feature)

**Deliverables:**
- [ ] All NFT endpoints validated
- [ ] Function names mapped to each endpoint
- [ ] v1.1.0 features verified

---

### Task 12: Audit web3-nft-api query.js
**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

Same checklist as previous query.js files.

---

### Task 13: Cross-Reference NFT Endpoints
**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

```bash
node documentation/extract-endpoints.js "nft"
```

**Deliverables:**
- [ ] All 31 nft-category endpoints listed
- [ ] Comparison with documented endpoints
- [ ] Missing endpoints identified

---

## Phase 5: web3-defi-api Skill Audit (Tasks 14-15)

### Task 14: Audit web3-defi-api SKILL.md & Reference Files
**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

**Files:**
- `plugins/web3-api-skills/skills/web3-defi-api/SKILL.md`
- `plugins/web3-api-skills/skills/web3-defi-api/references/EVM_ENDPOINTPOINTS.md`
- `plugins/web3-api-skills/skills/web3-defi-api/references/EXAMPLES.md`

**DeFi Endpoints to Validate:**
- [ ] All `/defi/` endpoints
- [ ] Protocol position endpoints
- [ ] Exposure endpoints

**DeFi-Specific Checks:**
- [ ] Protocols mentioned are accurate
- [ ] Position parameters are correct
- [ ] Examples are realistic and valid

**Deliverables:**
- [ ] All DeFi endpoints validated against configs.json (defi category)
- [ ] Function names identified
- [ ] Examples verified

---

### Task 15: Audit web3-defi-api query.js
**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

Standard query.js validation.

---

## Phase 6: web3-entity-api Skill Audit (Tasks 16-17)

### Task 16: Audit web3-entity-api SKILL.md & Reference Files
**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

**Files:**
- `plugins/web3-api-skills/skills/web3-entity-api/SKILL.md`
- `plugins/web3-api-skills/skills/web3-entity-api/references/EVM_ENDPOINTPOINTS.md`

**Entity Endpoints to Validate:**
- [ ] `/entities/:entityId` → Find function name
- [ ] `/entities/categories/:categoryId` → Validate
- [ ] `/entities/categories` → Validate
- [ ] `/entities/search` → Validate
- [ ] All entity-related endpoints

**Entity-Specific Checks:**
- [ ] Entity ID format is correct
- [ ] Categories are accurately described
- [ ] Search functionality is correct

**Deliverables:**
- [ ] All entity endpoints validated (entities category has 4 endpoints)
- [ ] Function names mapped
- [ ] No hallucinated entity types

---

### Task 17: Audit web3-entity-api query.js
**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

Standard query.js validation.

---

## Phase 7: web3-price-api Skill Audit (Tasks 18-19)

### Task 18: Audit web3-price-api SKILL.md & Reference Files
**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

**Files:**
- `plugins/web3-api-skills/skills/web3-price-api/SKILL.md`
- `plugins/web3-api-skills/skills/web3-price-api/references/EVM_ENDPOINTPOINTS.md`
- `plugins/web3-api-skills/skills/web3-price-api/references/SOLANA_ENDPOINTPOINTS.md`

**Price Endpoints to Validate:**
- [ ] `/erc20/prices` → Already in token-api, check consistency
- [ ] `/erc20/:address/price` → Validate
- [ ] `/nft/:address/price` → Validate (v1.1.0)
- [ ] `/nft/:address/:token_id/price` → Validate
- [ ] OHLCV endpoints → Validate
- [ ] All price-related endpoints

**Price-Specific Checks:**
- [ ] Token vs NFT price endpoints are distinguished
- [ ] OHLCV parameters are correct
- [ ] Native price endpoints exist

**Deliverables:**
- [ ] All price endpoints validated
- [ ] Check overlap with token-api endpoints
- [ ] v1.1.0 NFT price features verified

---

### Task 19: Audit web3-price-api query.js
**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

Standard query.js validation.

---

## Phase 8: Remaining Core Skills (Tasks 20-22)

### Task 20: Audit web3-blockchain-api Skill
**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

**Files:**
- `plugins/web3-api-skills/skills/web3-blockchain-api/SKILL.md`
- `plugins/web3-api-skills/skills/web3-blockchain-api/references/EVM_ENDPOINTPOINTS.md`
- `plugins/web3-api-skills/skills/web3-blockchain-api/query.js`

**Blockchain Endpoints to Validate:**
- [ ] `/block/:block_number_or_hash` → Find function names
- [ ] `/block/:block_number_or_hash/nft/transfers` → Validate
- [ ] `/transaction/:transaction_hash` → Validate
- [ ] All block and transaction endpoints

**Deliverables:**
- [ ] Block endpoints validated (block category has 4 endpoints)
- [ ] Transaction endpoints validated (transaction category has 5 endpoints)
- [ ] Function names mapped

---

### Task 21: Audit web3-utils and web3-premium Skills
**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

**Files:**
- `plugins/web3-api-skills/skills/web3-utils/SKILL.md`
- `plugins/web3-api-skills/skills/web3-utils/references/EVM_ENDPOINTPOINTS.md`
- `plugins/web3-api-skills/skills/web3-utils/query.js`
- `plugins/web3-api-skills/skills/web3-premium/SKILL.md`
- `plugins/web3-api-skills/skills/web3-premium/references/EVM_ENDPOINTPOINTS.md`
- `plugins/web3-api-skills/skills/web3-premium/references/SOLANA_ENDPOINTPOINTS.md`
- `plugins/web3-api-skills/skills/web3-premium/query.js`

**Utils Endpoints:**
- [ ] `/info` endpoints
- [ ] `/weights` endpoint
- [ ] Any utility endpoints (utils category has 4 endpoints)

**Premium Endpoints:**
- [ ] Analytics endpoints
- [ ] Cortex endpoints (if any)
- [ ] All advanced/analytical endpoints

**Deliverables:**
- [ ] All utility endpoints validated
- [ ] All premium endpoints validated
- [ ] Function names identified

---

### Task 22: Audit New v1.1.0 Skills (analytics, score, sniper)
**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

**Files:**
- `plugins/web3-api-skills/skills/web3-analytics-api/SKILL.md`
- `plugins/web3-api-skills/skills/web3-analytics-api/query.js`
- `plugins/web3-api-skills/skills/web3-score-api/SKILL.md`
- `plugins/web3-api-skills/skills/web3-score-api/query.js`
- `plugins/web3-api-skills/skills/web3-sniper-api/SKILL.md`
- `plugins/web3-api-skills/skills/web3-sniper-api/query.js`

**New Skills Validation:**
- [ ] **web3-analytics-api:**
  - [ ] All analytics endpoints exist in configs.json
  - [ ] Volume timeseries endpoints validated
  - [ ] Historical holder stats validated

- [ ] **web3-score-api:**
  - [ ] Security score endpoints exist
  - [ ] Wallet scoring endpoints validated
  - [ ] Token scoring validated

- [ ] **web3-sniper-api:**
  - [ ] DEX sniper endpoints exist
  - [ ] Bonding status endpoints validated
  - [ ] Trading pattern endpoints validated

**Critical Check:**
These are NEW skills - verify endpoints aren't hallucinated!

**Deliverables:**
- [ ] All new skill endpoints validated
- [ ] Any hallucinated endpoints documented
- [ ] Function names identified

---

## Phase 9: web3-shared query.js & Streams API (Tasks 23-24)

### Task 23: Audit web3-shared/query.js (Unified Client)
**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

**File:** `plugins/web3-api-skills/skills/web3-shared/query.js`

**Critical - This is the CORE of all web3-api-skills!**

**Checklist:**
- [ ] **Auto blockchain detection:**
  - [ ] EVM address detection (0x prefix, 42 chars) works
  - [ ] Solana address detection (base58, 32-44 chars) works
  - [ ] Base URLs are correct:
    - EVM: `https://deep-index.moralis.io/api/v2.2/`
    - Solana: `https://solana-gateway.moralis.io/`

- [ ] **Chain conversion:**
  - [ ] Chain name to hex works (eth → 0x1, polygon → 0x89)
  - [ ] All supported chains are mapped correctly
  - [ ] No missing chain IDs

- [ ] **HTTP method support:**
  - [ ] GET works (default)
  - [ ] POST works
  - [ ] PUT works
  - [ ] DELETE works
  - [ ] PATCH works

- [ ] **Helper functions:**
  - [ ] `createSpamFilter()` works
  - [ ] `createVerifiedFilter()` works
  - [ ] `paginate()` works for cursor-based pagination
  - [ ] `dateToBlock()` works if present
  - [ ] `tokenSearch()` works if present

- [ ] **Error handling:**
  - [ ] API errors are handled gracefully
  - [ ] Validation errors are clear
  - [ ] Network errors don't crash

- [ ] **No dependencies:**
  - [ ] Uses only Node.js built-in modules
  - [ ] No axios, node-fetch, dotenv, etc.

- [ ] **Coding standards:**
  - [ ] No syntax errors
  - [ ] Consistent code style
  - [ ] Clear comments where needed

**Deliverables:**
- [ ] Full code review completed
- [ ] All functions tested mentally for logic errors
- [ ] Any bugs or issues documented

---

### Task 24: Audit streams-api-skills Plugin
**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

**Files:**
- `plugins/streams-api-skills/skills/streams-api/SKILL.md`
- `plugins/streams-api-skills/skills/streams-api/query.js`
- `plugins/streams-api-skills/skills/streams-api/references/STREAMS_ENDPOINTS.md`
- `plugins/streams-api-skills/.claude-plugin/plugin.json`
- `plugins/streams-api-skills/README.md`

**Streams Endpoints to Validate:**
- [ ] All streams endpoints exist in configs.json (streams category has 30 endpoints)
- [ ] POST/PUT/DELETE endpoints are correctly documented
- [ ] Webhook handling is accurate
- [ ] Stream types (tx, log, erc20transfer, etc.) are correct

**Streams-Specific Checks:**
- [ ] Stream ID format is UUID (not hex)
- [ ] Limit parameter is documented (max 100)
- [ ] Replay history is correct
- [ ] v1.1.0 features: native balance streaming, enhanced history

**Validation:**
```bash
node documentation/extract-endpoints.js "streams"
```

**Deliverables:**
- [ ] All 30 streams endpoints validated
- [ ] Function names identified
- [ ] HTTP methods verified (GET, POST, PUT, DELETE)

---

## Phase 10: Configuration Files & Final Validation (Task 25)

### Task 25: Final Cross-Reference & Documentation Update
**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

**Action Items:**

**25.1: Batch Validate All SKILL.md Files**
```bash
#!/bin/bash
# Run this to validate all skills at once

for file in plugins/*/skills/*/SKILL.md; do
  echo "=== $file ==="
  node documentation/extract-endpoints.js --validate "$file"
  echo ""
done > documentation/validation_report.txt
```

- [ ] All SKILL.md files validated
- [ ] Invalid endpoints documented
- [ ] Missing function names listed

**25.2: Update SKILL.md Files with Function Names**

For each validated endpoint, update documentation to include:
```markdown
## Get Wallet Active Chains

**Endpoint:** `GET /wallets/:address/chains`
**Function Name:** `getWalletActiveChains`
**Description:** Get all chains where the wallet has activity...
```

- [ ] Each endpoint updated with function name
- [ ] Format is consistent across all skills
- [ ] Both endpoint path AND function name are clearly shown

**25.3: Cross-Check Parameter Documentation**

For each endpoint, verify:
- [ ] Parameter names match configs.json exactly
- [ ] Parameter types match (string, number, boolean, array)
- [ ] Required vs optional is correct
- [ ] Parameter descriptions are accurate

**25.4: Verify Chain Support**

- [ ] All chains mentioned are actually supported
- [ ] New 2025 chains are included (Flow, Ronin, Lisk, Sei, Monad)
- [ ] Chain IDs (hex format) are correct

**25.5: Check for AI Hallucinations**

- [ ] No imaginary endpoints
- [ ] No fake parameters
- [ ] No fabricated response fields
- [ ] No contradictory documentation

**25.6: Validate Plugin Manifests**

- [ ] `.claude-plugin/marketplace.json` - Both plugins listed correctly
- [ ] `plugins/web3-api-skills/.claude-plugin/plugin.json` - All 9 skills listed
- [ ] `plugins/streams-api-skills/.claude-plugin/plugin.json` - Streams skill listed
- [ ] Versions are consistent

**25.7: Verify Query.js Consistency**

- [ ] Every skill's query.js re-exports from web3-shared correctly
- [ ] No skill has custom query logic (except streams-api)
- [ ] streams-api/query.js is self-contained (doesn't depend on web3-shared)

**25.8: Final Documentation Review**

- [ ] All v1.1.0 features are documented
- [ ] Migration guide (if exists) is accurate
- [ ] Examples are realistic and tested
- [ ] No broken links or references

**25.9: Create Summary Report**

Generate final report:
```markdown
# Audit Summary Report

## Validated Endpoints
- Total endpoints checked: X
- Valid: Y
- Invalid: Z

## Function Names Added
- List of endpoints that received function name documentation

## Issues Found
1. Invalid endpoints (hallucinations): [list]
2. Parameter mismatches: [list]
3. Code issues: [list]
4. Documentation inconsistencies: [list]

## Actions Taken
- [ ] Fixed invalid endpoints
- [ ] Added function names
- [ ] Corrected parameters
- [ ] Fixed code bugs
- [ ] Updated documentation
```

**Deliverables:**
- [ ] Complete validation report
- [ ] All SKILL.md files updated with function names
- [ ] Summary of findings and fixes
- [ ] Clean bill of health (or list of remaining issues)

---

## Completion Criteria

The audit is complete when:
- ✅ All 25 tasks are marked as complete
- ✅ Every endpoint in every SKILL.md is validated against configs.json
- ✅ Every endpoint has its function name documented
- ✅ All parameters match configs.json exactly
- ✅ No AI hallucinations remain
- ✅ No coding mistakes exist
- ✅ All query.js files follow the zero-dependency pattern
- ✅ Final summary report is generated

---

## Quick Reference Commands

```bash
# Get stats on all endpoints
node documentation/extract-endpoints.js --stats

# Search for specific endpoints
node documentation/extract-endpoints.js "wallet"
node documentation/extract-endpoints.js "nft"
node documentation/extract-endpoints.js "getWallet"

# Validate a specific file
node documentation/extract-endpoints.js --validate <path_to_file>

# Export all endpoints for reference
node documentation/extract-endpoints.js --export-all > documentation/all_endpoints.txt

# Batch validate all skills
for file in plugins/*/skills/*/SKILL.md; do
  node documentation/extract-endpoints.js --validate "$file"
done

# Check a specific category
node documentation/extract-endpoints.js "/defi"
node documentation/extract-endpoints.js "/token"
```

---

## Notes

- configs.json has **212 function names** across **188 unique endpoints**
- Some endpoints have multiple function names (aliases)
- Categories with most endpoints: evm-docs (115), token (39), nft (31)
- The configs.json file is **69,437 lines** - always use the extraction script!
- Each function in configs.json has: path, method, apiHost, queryParams, pathParams, responses
- Always validate that the HTTP method matches (GET vs POST vs PUT vs DELETE)
