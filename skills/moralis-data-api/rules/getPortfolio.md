# Gets the portfolio of the given address

Gets all the native and token balances of the given address

## Method

GET

## Base URL

`https://solana-gateway.moralis.io`

## Path

`/account/:network/:address/portfolio`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| network | string | Yes | The network to query | - |
| address | string | Yes | The address to query | \`kXB7FfzdrfZpAZEW3TZcp8a8CwQbsowa6BdfAHZ4gVs\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| nftMetadata | boolean | No | Should return the full NFT metadata | - |
| mediaItems | boolean | No | Should return media items | - |
| excludeSpam | boolean | No | Should exclude spam NFTs | - |

## Example (curl)

```bash
curl -X GET "https://solana-gateway.moralis.io/account/:network/kXB7FfzdrfZpAZEW3TZcp8a8CwQbsowa6BdfAHZ4gVs/portfolio" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
