# EVM Entity API Endpoints

## Search Entities
- **Endpoint:** `GET /entities/search`
- **Description:** Search for labeled entities
- **Params:** `q` (search query), `chain`

## Get Entity Categories
- **Endpoint:** `GET /entities/categories`
- **Description:** Get all entity categories

## Get Entities by Category
- **Endpoint:** `GET /entities/categories/:categoryId/entities`
- **Description:** Get all entities in a category
- **Params:** `chain`, `limit`, `cursor`

## Get Entity by ID
- **Endpoint:** `GET /entities/:entityId`
- **Description:** Get detailed entity information
