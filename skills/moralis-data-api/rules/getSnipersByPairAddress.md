# Get snipers by pair address

Identify sniper wallets that bought a token within a specified timeframe (`blocksAfterCreation`). Each wallet returned includes detailed information about how much was bought, sold as well as PnL stats and more.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/pairs/:address/snipers`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| address | string | Yes | The pair address token-transactions are to be retrieved for. | \`0xa3c2076eb97d573cc8842f1db1ecdf7b6f77ba27\` |

## Query Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| chain | string (eth, 0x1, sepolia, 0xaa36a7, polygon...) | No | The chain to query | \`eth\` |
| blocksAfterCreation | number | No | Number of blocks after the creation
 | - |

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/pairs/0xa3c2076eb97d573cc8842f1db1ecdf7b6f77ba27/snipers?chain=eth" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
