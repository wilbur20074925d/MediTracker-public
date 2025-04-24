pragma solidity ^0.6.6;
pragma experimental ABIEncoderV2;

/**
 * @title Transactions
 * @dev Logs and retrieves shipment transaction details (hash chaining) for supply chain tracking
 */
contract Transactions {
    // Address of the contract deployer (e.g., manufacturer or raw material creator)
    address public Creator;

    /**
     * @dev Struct representing a single transaction entry
     * @param txnHash   Unique hash/ID of this transaction
     * @param fromAddr  Address sending the package
     * @param toAddr    Address receiving the package
     * @param prevTxn   Hash of the previous linked transaction (for chaining)
     * @param latitude  Geolocation latitude of the event
     * @param longitude Geolocation longitude of the event
     * @param timestamp UNIX timestamp when this entry was created
     */
    struct txns {
        bytes32 txnHash;
        address fromAddr;
        address toAddr;
        bytes32 prevTxn;
        string latitude;
        string longitude;
        uint timestamp;
    }

    // Mapping of transaction index to transaction data
    mapping(uint => txns) public transactions;
    // Counter tracking total number of transactions
    uint public txnCount = 0;

    /**
     * @notice Constructor sets the creator (initial authorized caller)
     * @param _creator Address of the entity that can initialize transaction logging
     */
    constructor(address _creator) public {
        Creator = _creator;
    }

    /**
     * @dev Emitted when a new transaction entry is created
     * @param _txnHash   Hash/ID of the new transaction
     * @param _from      Sender address
     * @param _to        Receiver address
     * @param _prev      Previous transaction hash for chaining
     * @param _timestamp Timestamp of creation
     * @param _latitude  Latitude of event
     * @param _longitude Longitude of event
     */
    event txnCreated(
        bytes32 indexed _txnHash,
        address indexed _from,
        address indexed _to,
        bytes32 _prev,
        uint _timestamp,
        string _latitude,
        string _longitude
    );

    /**
     * @notice Create a new transaction log entry
     * @param _txnHash   Unique hash/ID of this transaction
     * @param _from      Sender address
     * @param _to        Receiver address
     * @param _prev      Expected hash of the previous transaction (for integrity check)
     * @param _latitude  Latitude where the transaction occurred
     * @param _longitude Longitude where the transaction occurred
     */
    function createTxnEntry(
        bytes32 _txnHash,
        address _from,
        address _to,
        bytes32 _prev,
        string memory _latitude,
        string memory _longitude
    ) public {
        uint _timestamp = now; // Capture current block timestamp

        if (txnCount == 0) {
            // First transaction, no previous hash check
            transactions[txnCount] = txns(
                _txnHash,
                _from,
                _to,
                _prev,
                _latitude,
                _longitude,
                _timestamp
            );
        } else {
            // For subsequent entries, ensure last entry matches provided prev hash
            require(
                transactions[txnCount - 1].txnHash == _prev,
                "Transaction error: previous hash mismatch"
            );
            transactions[txnCount] = txns(
                _txnHash,
                _from,
                _to,
                _prev,
                _latitude,
                _longitude,
                _timestamp
            );
        }

        txnCount += 1; // Increment the transaction counter

        // Emit event for off-chain listeners
        emit txnCreated(
            _txnHash,
            _from,
            _to,
            _prev,
            _timestamp,
            _latitude,
            _longitude
        );
    }

    /**
     * @notice Retrieve all logged transactions as an array
     * @return Array of txns structs containing all entries
     */
    function getAllTransactions() public view returns (txns[] memory) {
        uint len = txnCount;
        txns[] memory ret = new txns[](len);

        // Copy each transaction into a memory array
        for (uint i = 0; i < len; i++) {
            ret[i] = transactions[i];
        }
        return ret;
    }
}
