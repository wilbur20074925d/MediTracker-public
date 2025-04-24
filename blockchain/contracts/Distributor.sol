pragma solidity ^0.6.6;

// Import sub-contract logic for Wholesaler-to-Distributor and Distributor-to-Customer transfers
import './MedicineW_D.sol';
import './Medicine.sol';
import './MedicineD_C.sol';

/**
 * @title Distributor
 * @dev Manages receipt of medicine batches from wholesalers and transfers them to customers
 */
contract Distributor {
    // Mapping from distributor address to list of medicine batch addresses they've received
    mapping(address => address[]) public MedicinesAtDistributor;
    // Mapping from distributor address to list of Distributor-to-Customer sub-contract addresses
    mapping(address => address[]) public MedicineDtoC;
    // Mapping from batch address to its corresponding sub-contract address for transfers to customers
    mapping(address => address) public MedicineDtoCTxContract;

    /**
     * @notice Records the receipt of a medicine batch at the distributor
     * @param _address Address of the medicine batch contract
     * @param cid      Address of the Wholesaler-to-Distributor sub-contract
     */
    function medicineRecievedAtDistributor(
        address _address,
        address cid
    ) public {
        // Call the receivedMedicine function on the Medicine contract to verify role and step
        uint rtype = Medicine(_address).receivedMedicine(msg.sender);
        // If returned type code equals 2 (indicating distributor receipt)
        if (rtype == 2) {
            // Store this batch under the distributor's record
            MedicinesAtDistributor[msg.sender].push(_address);
            // If the Wholesaler-to-Distributor sub-contract exists, log receipt there as well
            if (Medicine(_address).getWDC()[0] != address(0)) {
                MedicineW_D(cid).receiveWD(_address, msg.sender);
            }
        }
    }

    /**
     * @notice Initiate a transfer of a medicine batch from distributor to customer
     * @param _address   Address of the medicine batch contract
     * @param transporter Address of the transporter handling shipment
     * @param receiver    Address of the final customer recipient
     */
    function transferMedicineDtoC(
        address _address,
        address transporter,
        address receiver
    ) public {
        // Deploy a new Distributor-to-Customer sub-contract to manage this transfer
        MedicineD_C dp = new MedicineD_C(
            _address,
            msg.sender,
            transporter,
            receiver
        );
        // Keep track of this sub-contract under the distributor's transfers
        MedicineDtoC[msg.sender].push(address(dp));
        // Map the batch address to its sub-contract for easy lookup
        MedicineDtoCTxContract[_address] = address(dp);
    }
}
