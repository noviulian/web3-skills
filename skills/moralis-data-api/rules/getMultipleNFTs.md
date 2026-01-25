# Get Metadata for NFTs

Get NFT metadata for one or many NFTs. Accepts an array of up to 25 `tokens`, each requiring `token_address` and `token_id`. Each NFT returned includes on-chain metadata as well as off-chain metadata, floor prices, rarity and more where available.

## Method

POST

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/nft/getMultipleNFTs`

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | No | The chain to query | \`eth\` |

## Body


## Example (curl)

```bash
curl -X POST "https://deep-index.moralis.io/api/v2.2/nft/getMultipleNFTs?chain=eth" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{}'
```
