pragma solidity ^0.6.6;

// Import the distributor-to-customer transfer logic
import './MedicineD_C.sol';

/**
 * @title Customer
 * @dev Handles receipt and status tracking of medicine batches for end customers
 */
contract Customer {
    // Mapping from customer address to list of medicine batch contract addresses they hold
    mapping(address => address[]) public MedicineBatchAtCustomer;
    // Mapping from medicine batch address to its current sale status
    mapping(address => salestatus) public sale;

    /**
     * @dev Possible statuses for a medicine batch
     * @param notfound   Batch not found for this customer
     * @param atcustomer Batch is currently held by customer
     * @param sold       Batch has been sold
     * @param expired    Batch has expired
     * @param damaged    Batch has been marked as damaged
     */
    enum salestatus {
        notfound,
        atcustomer,
        sold,
        expired,
        damaged
    }

    /**
     * @dev Event emitted when a customer updates the status of a medicine batch
     * @param _address Address of the medicine batch contract
     * @param Customer Address of the customer updating the status
     * @param status   New status code as uint
     */
    event MedicineStatus(
        address _address,
        address indexed Customer,
        uint status
    );

    /**
     * @notice Records receipt of a medicine batch by a customer
     * @param _address Address of the medicine batch contract
     * @param cid      Address of the Distributor-to-Customer sub-contract
     */
    function medicineRecievedAtCustomer(
        address _address,
        address cid
    ) public {
        // Call the receiveDC function on the sub-contract to log receipt
        MedicineD_C(cid).receiveDC(_address, msg.sender);
        // Add this batch to the customer's held batches
        MedicineBatchAtCustomer[msg.sender].push(_address);
        // Update sale status to "atcustomer"
        sale[_address] = salestatus.atcustomer;
    }

    /**
     * @notice Update the sale status of a specific medicine batch
     * @param _address Address of the medicine batch contract
     * @param Status   New status code (uint) matching salestatus enum
     */
    function updateSaleStatus(
        address _address,
        uint Status
    ) public {
        // Set the new sale status
        sale[_address] = salestatus(Status);
        // Emit event to signal the status change
        emit MedicineStatus(_address, msg.sender, Status);
    }

    /**
     * @notice Retrieve the current sale status of a medicine batch
     * @param _address Address of the medicine batch contract
     * @return Status Current status code as uint
     */
    function salesInfo(
        address _address
    ) public view returns (uint Status) {
        // Return numeric representation of the sale status
        return uint(sale[_address]);
    }
}
