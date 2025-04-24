pragma solidity ^0.6.6;

// Import sub-contract logic for Wholesaler-to-Distributor transfer and main Medicine contract
import './MedicineW_D.sol';
import './Medicine.sol';

/**
 * @title Wholesaler
 * @dev Manages receipt of medicine batches at the wholesaler and initiates transfers to distributors
 */
contract Wholesaler {
    /**
     * @dev Mapping from wholesaler address to array of medicine batch addresses they hold
     */
    mapping(address => address[]) public MedicinesAtWholesaler;
    /**
     * @dev Mapping from wholesaler address to array of deployed MedicineW_D sub-contract addresses
     */
    mapping(address => address[]) public MedicineWtoD;
    /**
     * @dev Mapping from medicine batch address to its corresponding transfer sub-contract address
     */
    mapping(address => address) public MedicineWtoDTxContract;

    /**
     * @notice Constructor placeholder
     */
    constructor() public {}

    /**
     * @notice Record receipt of a medicine batch by the wholesaler
     * @param _address Address of the Medicine batch contract
     */
    function medicineRecievedAtWholesaler(
        address _address
    ) public {
        // Call the receivedMedicine function on the Medicine contract to verify proper role and update status
        uint rtype = Medicine(_address).receivedMedicine(msg.sender);
        // If rtype == 1, the batch is confirmed delivered to the wholesaler
        if (rtype == 1) {
            // Track this batch under the wholesaler's holdings
            MedicinesAtWholesaler[msg.sender].push(_address);
        }
    }
    
    /**
     * @notice Initiate a transfer of a medicine batch from wholesaler to distributor
     * @param _address     Address of the Medicine batch contract
     * @param transporter  Address of the transporter assigned for this leg
     * @param receiver     Address of the distributor who will receive the batch
     */
    function transferMedicineWtoD(
        address _address,
        address transporter,
        address receiver
    ) public {
        // Deploy a new Wholesaler-to-Distributor sub-contract for this transfer
        MedicineW_D wd = new MedicineW_D(
            _address,
            msg.sender,
            transporter,
            receiver
        );
        // Store the sub-contract address in the wholesaler's transfer records
        MedicineWtoD[msg.sender].push(address(wd));
        // Map the original medicine batch to its transfer sub-contract for lookup
        MedicineWtoDTxContract[_address] = address(wd);
    }
}
