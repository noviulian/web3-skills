# Get NFTs by wallet address

Fetch all NFTs held by a specified wallet address. Use `token_addresses` to filter by one or many specific contract(s). Each NFT returned includes on-chain metadata as well as off-chain metadata, floor prices, rarity and more where available.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/:address/nft`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| address | string | Yes | The address of the wallet | \`0xcB1C1FdE09f811B294172696404e88E658659905\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | No | The chain to query | \`eth\` |
| format | string | No | The format of the token ID | \`decimal\` |
| limit | number | No | The desired page size of the result. | - |
| exclude_spam | boolean | No | Should spam NFTs be excluded from the result? | - |
| token_addresses | array | No | The addresses to get balances for (optional) | - |
| cursor | string | No | The cursor returned in the previous response (used for getting the next page). | - |
| normalizeMetadata | boolean | No | Should normalized metadata be returned? | - |
| media_items | boolean | No | Should preview media data be returned? | - |
| include_prices | boolean | No | Should NFT last sale prices be included in the result? | - |

## Cursor/Pagination

- **limit**: The desired page size of the result.
- **cursor**: The cursor returned in the previous response (used for getting the next page).

The response includes a **cursor** field for pagination. Use this cursor in the next request to get the next page of results.

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/0xcB1C1FdE09f811B294172696404e88E658659905/nft?chain=eth&format=decimal" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
