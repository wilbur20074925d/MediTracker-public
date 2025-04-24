pragma solidity ^0.6.6;

// Import raw material and medicine contract definitions
import './RawMaterial.sol';
import './Medicine.sol';

/**
 * @title Manufacturer
 * @dev Handles receipt of raw material packages and creation of medicine batches
 */
contract Manufacturer {
    // Mapping from manufacturer address to list of raw material package addresses received
    mapping(address => address[]) public manufacturerRawMaterials;
    // Mapping from manufacturer address to list of medicine batch addresses created
    mapping(address => address[]) public manufacturerMedicines;

    /**
     * @dev Constructor placeholder
     */
    constructor() public {}

    /**
     * @notice Record receipt of a raw material package
     * @param _addr Address of the raw material package contract
     * @param _manufacturerAddress Address of the manufacturer receiving the package
     */
    function manufacturerReceivedPackage(
        address _addr,
        address _manufacturerAddress
    ) public {
        // Call receivedPackage on the RawMaterial contract to log receipt
        RawMaterial(_addr).receivedPackage(_manufacturerAddress);
        // Track the package under the manufacturer's records
        manufacturerRawMaterials[_manufacturerAddress].push(_addr);
    }
    
    /**
     * @notice Create a new medicine batch contract
     * @param _manufacturerAddr Address of the manufacturer creating the medicine
     * @param _description      Description or name of the medicine
     * @param _rawAddr          Array of raw material package addresses to be used
     * @param _quantity         Quantity of medicine units to produce
     * @param _transporterAddr  Array of transporter addresses for each shipping leg
     * @param _recieverAddr     Address of the next recipient (e.g., wholesaler)
     * @param RcvrType          Numeric code indicating recipient role type
     */
    function manufacturerCreatesMedicine(
        address _manufacturerAddr,
        bytes32 _description,
        address[] memory _rawAddr,
        uint _quantity,
        address[] memory _transporterAddr,
        address _recieverAddr,
        uint RcvrType
    ) public {
        // Deploy a new Medicine contract instance with the given parameters
        Medicine _medicine = new Medicine(
            _manufacturerAddr,
            _description,
            _rawAddr,
            _quantity,
            _transporterAddr,
            _recieverAddr,
            RcvrType
        );
        // Store the new medicine batch address under the manufacturer
        manufacturerMedicines[_manufacturerAddr].push(address(_medicine));
    }
}
