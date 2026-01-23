# EVM Entity API Endpoints

## Quick Decision Guide

**User asks about...** → **Use this endpoint**

| User Question | Endpoint | Example |
|---------------|----------|---------|
| "Search entities?" | `/entities/search` | Find exchanges/funds |
| "Entity categories?" | `/entities/categories` | All categories |
| "Entities in category?" | `/entities/categories/:categoryId/entities` | Filter by type |
| "Entity details?" | `/entities/:entityId` | Specific entity |

## Key Endpoint Patterns

- **Search:** `/entities/search` (find entities by name)
- **Categories:** `/entities/categories*` (browse entity types)
- **Entity details:** `/entities/:entityId` (get full entity info)
- **Entity types:** Exchanges, funds, DeFi protocols, whales, DEX traders

---

## Search Entities
- **Endpoint:** `GET /entities/search`
- **Description:** Search for labeled entities
- **Use this endpoint when:** User asks "search entities", "find exchanges", "look up funds", "search for Binance", "find a16z"
- **Params:** `q` (search query), `chain`

## Get Entity Categories
- **Endpoint:** `GET /entities/categories`
- **Description:** Get all entity categories
- **Use this endpoint when:** User asks "entity categories", "what types of entities", "list categories", "entity types"
- **Params:** None

## Get Entities by Category
- **Endpoint:** `GET /entities/categories/:categoryId/entities`
- **Description:** Get all entities in a category
- **Use this endpoint when:** User asks "all exchanges", "all funds", "entities in category", "list [type] entities"
- **Params:** `chain`, `limit`, `cursor`

## Get Entity by ID
- **Endpoint:** `GET /entities/:entityId`
- **Description:** Get detailed entity information
- **Use this endpoint when:** User asks "entity details", "entity info", "show me this entity", "entity data"
- **Params:** None

## Supported Entity Categories

- **Exchanges:** Binance, Coinbase, Kraken, etc.
- **Funds:** a16z, Paradigm, Three Arrows, etc.
- **DeFi Protocols:** Uniswap, Aave, Compound, etc.
- **Whales:** Large wallet addresses
- **DEX Traders:** Active DEX traders
