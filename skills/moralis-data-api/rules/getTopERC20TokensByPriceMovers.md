# Get top ERC20 tokens by price movements (winners and losers)

Get top ERC20 tokens by price movements (winners and losers). Currently only supports Ethereum. For more flexibility, we recommend to use getFilteredTokens or getTopGainersTokens and getTopLosersTokens.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/market-data/erc20s/top-movers`

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/market-data/erc20s/top-movers" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
