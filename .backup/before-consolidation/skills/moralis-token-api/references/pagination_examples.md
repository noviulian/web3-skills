# Pagination Examples

Many token API endpoints return paginated results. Use `cursor` and `limit` parameters to navigate through large datasets.

## Manual Pagination

Fetch pages one at a time using the cursor from the previous response:

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');

// First page
query('/erc20/:address/transfers', {
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  params: { limit: 100 }
})
  .then(data => {
    console.log('Page 1:', data.result.length, 'transfers');
    console.log('Cursor for next page:', data.cursor);

    // Fetch next page using cursor
    if (data.cursor) {
      return query('/erc20/:address/transfers', {
        address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        params: { limit: 100, cursor: data.cursor }
      });
    }
  })
  .then(data => {
    if (data) console.log('Page 2:', data.result.length, 'transfers');
  })
  .catch(console.error);
"
```

## Automatic Pagination Loop

Automatically fetch all pages using a loop:

```bash
cd $SKILL_DIR
node -e "
const { query } = require('./query');

async function getAllTransfers() {
  let allTransfers = [];
  let cursor = null;

  do {
    const result = await query('/erc20/:address/transfers', {
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      params: { limit: 100, cursor }
    });
    allTransfers.push(...result.result);
    cursor = result.cursor;
  } while (cursor);

  console.log('Total transfers:', allTransfers.length);
  return allTransfers;
}

getAllTransfers().catch(console.error);
"
```

## Using the Built-in paginate() Helper

The query client exports a `paginate()` helper for cursor-based pagination:

```bash
cd $SKILL_DIR
node -e "
const { paginate } = require('./query');

async function getAllTokenHolders() {
  const allOwners = await paginate('/erc20/:address/owners', {
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F'
  });

  console.log('Total owners:', allOwners.length);
  return allOwners;
}

getAllTokenHolders().catch(console.error);
"
```

## Parameters

- `limit` - Number of results per page (typically max 100)
- `cursor` - Pointer to the next page (from previous response)
- Both parameters are optional on the first request

## Endpoints Supporting Pagination

Common endpoints that support pagination:

- `/erc20/:address/transfers` - Token transfers
- `/erc20/:address/owners` - Token owners
- `/erc20/:address/swaps` - Token swaps
- `/erc20/:address/pairs` - DEX pairs
- `/token/:network/holders/:address` - Solana token holders
- `/pairs/:address/swaps` - Pair swaps

Check individual endpoint documentation for pagination support.
