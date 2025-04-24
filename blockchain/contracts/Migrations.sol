pragma solidity >=0.4.22 <0.7.0;

/**
 * @title Migrations
 * @dev Tracks deployment steps for Truffle migrations, allowing upgradeability and rollback support.
 */
contract Migrations {
    // Address that deploys and controls migration operations
    address public owner;
    // Identifier for the last successfully completed migration script
    uint256 public last_completed_migration;

    /**
     * @dev Restricts access to owner-only functions
     */
    modifier restricted() {
        // Only allow function execution if caller is the owner
        if (msg.sender == owner) _;
    }

    /**
     * @notice Sets the deployer as the owner
     */
    constructor() public {
        owner = msg.sender;
    }

    /**
     * @notice Record the completion of a migration script
     * @param completed Numeric ID of the migration that has just completed
     */
    function setCompleted(uint completed) public restricted {
        last_completed_migration = completed;
    }

    /**
     * @notice Upgrade to a new Migrations contract, preserving migration history
     * @param new_address Address of the new Migrations contract to transfer state to
     */
    function upgrade(address new_address) public restricted {
        // Cast the provided address to the Migrations type
        Migrations upgraded = Migrations(new_address);
        // Inform the new contract of the last completed migration
        upgraded.setCompleted(last_completed_migration);
    }
}
