# EVM Blockchain API Endpoints

## Get Block by Number/Hash
- **Endpoint:** `GET /block/:blockNumberOrHash`
- **Description:** Get block details by number or hash
- **Params:** `chain`

## Get Block by Date
- **Endpoint:** `GET /dateToBlock`
- **Description:** Convert date to block number
- **Params:** `date`, `chain`

## Get Transaction by Hash
- **Endpoint:** `GET /transaction/:transactionHash`
- **Description:** Get transaction details
- **Params:** `chain`

## Get Decoded Transaction
- **Endpoint:** `GET /transaction/:transactionHash/verbose`
- **Description:** Get decoded transaction with method calls
- **Params:** `chain`

## Get Latest Block Number
- **Endpoint:** `GET /latestBlockNumber/:chain`
- **Description:** Get current block number
- **Params:** `chain`

## Get Internal Transactions
- **Endpoint:** `GET /transaction/:transactionHash/internal-transactions`
- **Description:** Get internal transactions
- **Params:** `chain`

## Get Contract Events
- **Endpoint:** `GET /:address/events`
- **Description:** Get contract events/logs
- **Params:** `chain`, `from`, `to`, `limit`
