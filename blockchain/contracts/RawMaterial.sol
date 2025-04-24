pragma solidity ^0.6.6;
pragma experimental ABIEncoderV2;

// Import the Transactions contract for logging shipment events
import './Transactions.sol';

/**
 * @title RawMaterial
 * @dev Represents a raw material package created by a supplier and tracks its shipment to a manufacturer
 */
contract RawMaterial {
    // Address of the supplier who created this package
    address public Owner;

    /**
     * @dev Possible stages of the raw material package
     * @param atCreator  Package still at supplier
     * @param picked     Package picked up by transporter
     * @param delivered  Package delivered to manufacturer
     */
    enum packageStatus { atCreator, picked, delivered }
    
    /**
     * @dev Emitted when the shipment status is updated
     * @param ProductID            Unique identifier of this raw material package
     * @param Transporter          Address of the transporter handling this leg
     * @param Manufacturer         Manufacturer address receiving the package
     * @param TransporterType      Numeric code for shipment leg (always 1 for raw materials)
     * @param Status               New status code as uint
     */
    event ShippmentUpdate(
        address indexed ProductID,
        address indexed Transporter,
        address indexed Manufacturer,
        uint TransporterType,
        uint Status
    );

    // Unique ID for this raw material package (could be a UUID or hash)
    address public productid;
    // Brief description or name of the raw material
    bytes32 public description;
    // Quantity of raw material units in this package
    uint public quantity;
    // Address of the transporter assigned to this package
    address public transporter;
    // Address of the manufacturer designated to receive this package
    address public manufacturer;
    // Address of the supplier who created the package
    address public supplier;
    // Current shipment status of the package
    packageStatus public status;
    // Optional text description of package receiver's details (not used currently)
    bytes32 public packageReceiverDescription;
    // Address of the Transactions contract tracking this package's events
    address public txnContractAddress;
    
    /**
     * @notice Construct a new RawMaterial package instance
     * @param _creatorAddr      Address of the supplier creating the package
     * @param _productid        Unique identifier for this package
     * @param _description      Brief description of the raw material
     * @param _quantity         Quantity of units
     * @param _transporterAddr  Address of the transporter for this package
     * @param _manufacturerAddr Address of the manufacturer receiving the package
     */
    constructor(
        address _creatorAddr,
        address _productid,
        bytes32 _description,
        uint _quantity,
        address _transporterAddr,
        address _manufacturerAddr
    ) public {
        Owner = _creatorAddr;
        productid = _productid;
        description = _description;
        quantity = _quantity;
        transporter = _transporterAddr;
        manufacturer = _manufacturerAddr;
        supplier = _creatorAddr;
        // Initial status: at supplier
        status = packageStatus.atCreator;
        // Deploy Transactions contract to log all shipment updates
        Transactions txnContract = new Transactions(_manufacturerAddr);
        txnContractAddress = address(txnContract);
    }

    /**
     * @notice Retrieve all basic package details
     * @return productid             Unique ID of the package
     * @return description           Raw material description bytes32
     * @return quantity              Quantity of units
     * @return supplier              Supplier address
     * @return transporter           Transporter address
     * @return manufacturer          Manufacturer address
     * @return txnContractAddress    Address of Transactions contract
     */
    function getSuppliedRawMaterials() public view returns (
        address,
        bytes32,
        uint,
        address,
        address,
        address,
        address
    ) {
        return (
            productid,
            description,
            quantity,
            supplier,
            transporter,
            manufacturer,
            txnContractAddress
        );
    }

    /**
     * @notice Get the current shipment status as a numeric code
     * @return Numeric status code corresponding to the packageStatus enum
     */
    function getRawMaterialStatus() public view returns (uint) {
        return uint(status);
    }

    /**
     * @notice Called by the transporter to pick up the package from the supplier
     * @param _transporterAddr Address of the transporter calling this function
     */
    function pickPackage(address _transporterAddr) public {
        require(
            _transporterAddr == transporter,
            "Only the assigned transporter may pick this package"
        );
        require(
            status == packageStatus.atCreator,
            "Package must be at supplier before pickup"
        );
        // Update status to "picked"
        status = packageStatus.picked;
        emit ShippmentUpdate(productid, transporter, manufacturer, 1, uint(status));
    }

    /**
     * @notice Called by the manufacturer to confirm receipt of the package
     * @param _manufacturerAddr Address of the manufacturer confirming delivery
     */
    function receivedPackage(address _manufacturerAddr) public {
        require(
            _manufacturerAddr == manufacturer,
            "Only the designated manufacturer may receive this package"
        );
        require(
            status == packageStatus.picked,
            "Product must be picked up by transporter before delivery"
        );
        // Update status to "delivered"
        status = packageStatus.delivered;
        emit ShippmentUpdate(productid, transporter, manufacturer, 1, uint(status));
    }
}
