# Get trading stats by chain

Retrieve volume, active wallets and transaction stats for a blockchain over various time periods. Returns data for all chains in a single request.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/volume/chains`

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/volume/chains" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
