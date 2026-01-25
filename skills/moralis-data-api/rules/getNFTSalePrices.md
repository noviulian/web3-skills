# Get NFT sale prices by token

Fetch sale prices for a specific NFT over a specified number of days. Returns the last sale, lowest sale, highest sale, average sale and total trades within the specified period.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/nft/:address/:token_id/price`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| address | string | Yes | The address of the NFT collection | \`0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D\` |
| token_id | string | Yes | The token id of the NFT collection | \`1\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | No | The chain to query | \`eth\` |
| days | number | No | The number of days to look back to find the lowest price
If not provided 7 days will be the default and 365 is the maximum
 | - |

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/nft/0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D/1/price?chain=eth" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
