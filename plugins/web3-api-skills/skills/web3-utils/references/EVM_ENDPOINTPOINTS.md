# EVM Utils Endpoints

## Quick Decision Guide

**User asks about...** → **Use this endpoint**

| User Question | Endpoint | Example |
|---------------|----------|---------|
| "API version?" | `/web3/version` | Version info |
| "Endpoint weights?" | `/info/endpointWeights` | API costs |

## Key Endpoint Patterns

- **API metadata:** Endpoints return API configuration, not blockchain data
- **Rate limit info:** Use endpoint weights to understand API quota consumption
- **Debugging:** Use these endpoints to verify API status and configuration

---

## Get API Version
- **Endpoint:** `GET /web3/version`
- **Description:** Get current API version
- **Use this endpoint when:** User asks "API version", "what version", "API info", "system version"
- **Params:** None

## Get Endpoint Weights
- **Endpoint:** `GET /info/endpointWeights`
- **Description:** Get API endpoint weights for rate limiting
- **Use this endpoint when:** User asks "endpoint weights", "API costs", "rate limits", "query costs", "quota usage"
- **Params:** None
