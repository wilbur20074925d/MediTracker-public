pragma solidity ^0.6.6;

// Import the RawMaterial contract for creating new raw material packages
import './RawMaterial.sol';

/**
 * @title Supplier
 * @dev Allows suppliers to create and track raw material packages
 */
contract Supplier {
    /**
     * @dev Mapping from supplier address to array of their created RawMaterial contract addresses
     */
    mapping(address => address[]) public supplierRawMaterials;

    /**
     * @notice Constructor placeholder
     */
    constructor() public {}

    /**
     * @notice Create a new raw material package
     * @param _description      Short description of the raw material
     * @param _quantity         Quantity of units in the package
     * @param _transporterAddr  Address of the transporter assigned to pick up this package
     * @param _manufacturerAddr Address of the manufacturer designated to receive this package
     */
    function createRawMaterialPackage(
        bytes32 _description,
        uint _quantity,
        address _transporterAddr,
        address _manufacturerAddr
    ) public {
        // Generate a unique package ID by hashing sender address with current timestamp
        address packageId = address(bytes20(sha256(abi.encodePacked(msg.sender, now))));
        // Deploy a new RawMaterial contract instance
        RawMaterial rawMaterial = new RawMaterial(
            msg.sender,        // Supplier address as owner
            packageId,         // Unique package identifier
            _description,      // Raw material description
            _quantity,         // Quantity of material
            _transporterAddr,  // Transporter for this package
            _manufacturerAddr  // Manufacturer recipient
        );
        // Store the new RawMaterial contract address under this supplier's record
        supplierRawMaterials[msg.sender].push(address(rawMaterial));
    }

    /**
     * @notice Get the total number of packages created by the calling supplier
     * @return Number of RawMaterial contracts deployed by this supplier
     */
    function getNoOfPackagesOfSupplier() public view returns (uint) {
        return supplierRawMaterials[msg.sender].length;
    }

    /**
     * @notice Retrieve all RawMaterial contract addresses created by the calling supplier
     * @return Array of package contract addresses
     */
    function getAllPackages() public view returns (address[] memory) {
        uint len = supplierRawMaterials[msg.sender].length;
        address[] memory ret = new address[](len);
        for (uint i = 0; i < len; i++) {
            ret[i] = supplierRawMaterials[msg.sender][i];
        }
        return ret;
    }
}
