---
name: web3-utils
description: Get API information including version, endpoint weights, and usage stats. Use for debugging and API management.
license: MIT
compatibility: Requires Node.js (built-in modules only, no npm install needed). EVM chains only.
metadata:
  version: "1.0.0"
  author: web3-skills
  tags: [web3, utils, api, debug]
---

# Web3 Utils

API utilities and information.

## Setup

```bash
/web3-api-key
```

## Common Queries

### Get API Version

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/web3/version')
  .then(data => console.log('API Version:', data.version))
  .catch(console.error);
"
```

### Get Endpoint Weights

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');
query('/info/endpointWeights')
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(console.error);
"
```

## See Also

- [EVM Endpoints Reference](references/EVM_ENDPOINTPOINTS.md)
