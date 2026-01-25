# Get Entity Details By Id

Retrieve details for a specific entity using its unique ID. Returns name, logo, description, external links and related addresses.

## Method

GET

## Base URL

`https://deep-index.moralis.io/api/v2.2`

## Path

`/entities/:entityId`

## Path Params

| Name | Type | Required | Description | Example |
|------|------|----------|-------------|----------|
| entityId | string | Yes | - | \`1\` |

## Example (curl)

```bash
curl -X GET "https://deep-index.moralis.io/api/v2.2/entities/1" \
  -H "accept: application/json" \
  -H "X-API-Key: $MORALIS_API_KEY"
```
