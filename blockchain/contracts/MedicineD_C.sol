pragma solidity ^0.6.6;

// Import the main Medicine contract to invoke its transfer callbacks
import './Medicine.sol';

/**
 * @title MedicineD_C
 * @dev Distributor-to-Customer sub-contract for managing a single medicine batch's final delivery
 */
contract MedicineD_C {
    // Address of the contract deployer (initial sender/distributor)
    address public Owner;

    /**
     * @dev Possible stages of the package in this sub-contract
     * @param atcreator Package created but not yet picked up
     * @param picked    Transporter has picked up the package
     * @param delivered Transporter delivered package to receiver
     */
    enum packageStatus { atcreator, picked, delivered }

    // Address of the Medicine batch contract being transferred
    address public medAddr;
    // Address of the distributor initiating the transfer
    address public sender;
    // Address of the transporter responsible for this leg
    address public transporter;
    // Address of the final customer receiver
    address public receiver;
    // Current status of this package transfer
    packageStatus public status;

    /**
     * @notice Initialize the Distributor-to-Customer transfer sub-contract
     * @param _address        Address of the Medicine contract
     * @param Sender          Distributor address (initial sender)
     * @param Transporter     Address authorized to pick up the package
     * @param Receiver        Customer address authorized to receive the package
     */
    constructor(
        address _address,
        address Sender,
        address Transporter,
        address Receiver
    ) public {
        Owner = Sender;
        medAddr = _address;
        sender = Sender;
        transporter = Transporter;
        receiver = Receiver;
        // Initial status: created but not picked up
        status = packageStatus.atcreator;
    }

    /**
     * @notice Called by the transporter to pick up the package for customer delivery
     * @param _address        Medicine batch contract address (medAddr)
     * @param transporterAddr Address of the transporter invoking this function
     */
    function pickDC(
        address _address,
        address transporterAddr
    ) public {
        // Only the pre-authorized transporter may pick up
        require(
            transporter == transporterAddr,
            "Only authorized transporter can call this function"
        );
        // Update status to picked
        status = packageStatus.picked;

        // Trigger the Medicine contract to record this shipping leg
        Medicine(_address).sendDtoC(
            receiver,
            sender
        );
    }

    /**
     * @notice Called by the customer to confirm receipt of the package
     * @param _address Address of the Medicine batch contract (medAddr)
     * @param Receiver Address of the customer invoking this function
     */
    function receiveDC(
        address _address,
        address Receiver
    ) public {
        // Only the intended customer may confirm delivery
        require(
            Receiver == receiver,
            "Only authorized receiver can call this function"
        );
        // Update status to delivered
        status = packageStatus.delivered;

        // Notify the Medicine contract of final delivery
        Medicine(_address).receivedDtoC(
            Receiver
        );
    }

    /**
     * @notice Retrieve the numeric representation of the current package status
     * @return Numeric status code corresponding to the packageStatus enum
     */
    function get_addressStatus() public view returns (uint) {
        return uint(status);
    }
}
