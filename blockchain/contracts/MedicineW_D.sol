pragma solidity ^0.6.6;

// Import the main Medicine contract to invoke its transfer callbacks
import './Medicine.sol';

/**
 * @title MedicineW_D
 * @dev Wholesaler-to-Distributor sub-contract for managing a single medicine batch's transfer
 */
contract MedicineW_D {
    // Address of the contract deployer (initial sender/wholesaler)
    address public Owner;

    /**
     * @dev Possible stages of the package in this sub-contract
     * @param atcreator Package created but not yet picked up
     * @param picked    Transporter has picked up the package
     * @param delivered Transporter delivered package to receiver
     */
    enum packageStatus { atcreator, picked, delivered }

    // Address of the Medicine batch contract being transferred
    address public medId;
    // Address of the wholesaler initiating the transfer
    address public sender;
    // Address of the transporter responsible for this leg
    address public transporter;
    // Address of the distributor receiver
    address public receiver;
    // Current status of this package transfer
    packageStatus public status;

    /**
     * @notice Initialize the Wholesaler-to-Distributor transfer sub-contract
     * @param _address    Address of the Medicine contract batch
     * @param Sender      Wholesaler address (initial sender)
     * @param Transporter Address authorized to pick up the package
     * @param Receiver    Distributor address authorized to receive the package
     */
    constructor(
        address _address,
        address Sender,
        address Transporter,
        address Receiver
    ) public {
        Owner = Sender;
        medId = _address;
        sender = Sender;
        transporter = Transporter;
        receiver = Receiver;
        // Initial status: created but not picked up
        status = packageStatus.atcreator;
    }

    /**
     * @notice Called by the transporter to pick up the package for distributor delivery
     * @param _address      Medicine batch contract address (medId)
     * @param _transporter  Address of the transporter invoking this function
     */
    function pickWD(
        address _address,
        address _transporter
    ) public {
        // Only the pre-authorized transporter may pick up
        require(
            transporter == _transporter,
            "Only authorized shipper can call this function."
        );
        // Update status to picked
        status = packageStatus.picked;

        // Trigger the Medicine contract to record this shipping leg
        Medicine(_address).sendWtoD(
            receiver,
            sender
        );
    }

    /**
     * @notice Called by the distributor to confirm receipt of the package
     * @param _address Address of the Medicine batch contract (medId)
     * @param Receiver Distributor address invoking this function
     */
    function receiveWD(
        address _address,
        address Receiver
    ) public {
        // Only the intended distributor may confirm delivery
        require(
            Receiver == receiver,
            "Only authorized receiver can call this function."
        );
        // Update status to delivered
        status = packageStatus.delivered;

        // Notify the Medicine contract of distributor receipt
        Medicine(_address).receivedWtoD(
            Receiver
        );
    }

    /**
     * @notice Retrieve the numeric representation of the current package status
     * @return Numeric status code corresponding to the packageStatus enum
     */
    function getBatchIDStatus() public view returns (uint) {
        return uint(status);
    }
}
