pragma solidity ^0.6.6;

// Import transaction tracking logic for shipments
import './Transactions.sol';

/**
 * @title Medicine
 * @dev Represents a batch of medicine through its lifecycle in the supply chain
 */
contract Medicine {
    // Address of the batch owner (manufacturer)
    address public Owner;

    /**
     * @dev Possible shipment statuses for the medicine batch
     * @param atManufacturer  Batch created and held by manufacturer
     * @param pickedForW      Picked up by transporter for wholesaler delivery
     * @param pickedForD      Picked up by transporter for distributor delivery
     * @param deliveredAtW    Delivered to wholesaler
     * @param deliveredAtD    Delivered to distributor
     * @param pickedForC      Picked up for customer delivery
     * @param deliveredAtC    Delivered to customer
     */
    enum medicineStatus {
        atManufacturer,
        pickedForW,
        pickedForD,
        deliveredAtW,
        deliveredAtD,
        pickedForC,
        deliveredAtC
    }

    // Descriptive label for this medicine batch
    bytes32 public description;
    // List of raw material package addresses used to create this batch
    address[] public rawMaterials;
    // Array of transporter addresses for each shipping leg
    address[] public transporters;
    // Addresses of each role in the chain
    address public manufacturer;
    address public wholesaler;
    address public distributor;
    address public customer;
    // Quantity of medicine units in this batch
    uint public quantity;
    // Current shipment status
    medicineStatus public status;
    // Address of the Transactions contract instance tracking this batch
    address public txnContractAddress;

    /**
     * @dev Emitted whenever the shipment status is updated
     * @param BatchID         Address of this Medicine contract
     * @param Shipper         Address of the transporter
     * @param Receiver        Address of the receiver in this step
     * @param TransporterType Numeric code for shipment leg (1=W,2=D,3=C)
     * @param Status          New status code as uint
     */
    event ShippmentUpdate(
        address indexed BatchID,
        address indexed Shipper,
        address indexed Receiver,
        uint TransporterType,
        uint Status
    );

    /**
     * @notice Construct a new Medicine batch
     * @param _manufacturerAddr Address of the manufacturer creating the batch
     * @param _description      Description of the medicine
     * @param _rawAddr          Array of raw material package addresses
     * @param _quantity         Number of units produced
     * @param _transporterAddr  Array of initial transporter addresses
     * @param _receiverAddr     Address of the first receiver (wholesaler or distributor)
     * @param RcvrType          Role type code: 1 for wholesaler, 2 for distributor
     */
    constructor(
        address _manufacturerAddr,
        bytes32 _description,
        address[] memory _rawAddr,
        uint _quantity,
        address[] memory _transporterAddr,
        address _receiverAddr,
        uint RcvrType
    ) public {
        Owner = _manufacturerAddr;             // Set batch owner
        manufacturer = _manufacturerAddr;      // Track manufacturer
        description = _description;            // Store description
        rawMaterials = _rawAddr;               // Record raw materials used
        quantity = _quantity;                  // Record batch size
        transporters = _transporterAddr;        // Record designated transporters

        // Assign first receiver based on role type
        if (RcvrType == 1) {
            wholesaler = _receiverAddr;
        } else if (RcvrType == 2) {
            distributor = _receiverAddr;
        }

        // Deploy a Transactions contract to log all shipment events
        Transactions txnContract = new Transactions(_manufacturerAddr);
        txnContractAddress = address(txnContract);
    }

    /**
     * @notice Get detailed information about this batch
     * @return _manufacturerAddr Address of the manufacturer
     * @return _description      Description bytes32
     * @return _rawAddr          Raw material addresses
     * @return _quantity         Quantity produced
     * @return _transporterAddr  Transporter addresses
     * @return _distributor      Assigned distributor (if any)
     * @return _customer         Assigned customer (if any)
     */
    function getMedicineInfo()
        public
        view
        returns (
            address _manufacturerAddr,
            bytes32 _description,
            address[] memory _rawAddr,
            uint _quantity,
            address[] memory _transporterAddr,
            address _distributor,
            address _customer
        )
    {
        return (
            manufacturer,
            description,
            rawMaterials,
            quantity,
            transporters,
            distributor,
            customer
        );
    }

    /**
     * @notice Get the three role addresses for transfer checks
     * @return WDP Array [wholesaler, distributor, customer]
     */
    function getWDC() public view returns (address[3] memory WDP) {
        return [wholesaler, distributor, customer];
    }

    /**
     * @notice Get current numeric shipment status
     * @return Current status code
     */
    function getBatchIDStatus() public view returns (uint) {
        return uint(status);
    }

    /**
     * @notice Called by transporter to pick up batch
     * @param _transporterAddr Address of the transporter executing the pickup
     */
    function pickMedicine(address _transporterAddr) public {
        // Only the expected current transporter may call
        require(
            _transporterAddr == transporters[transporters.length - 1],
            "Only designated transporter may pick up"
        );
        // Batch must be at manufacturer to begin shipping
        require(
            status == medicineStatus.atManufacturer,
            "Batch must be at manufacturer"
        );

        if (wholesaler != address(0)) {
            // Mark as picked for wholesaler
            status = medicineStatus.pickedForW;
            emit ShippmentUpdate(address(this), _transporterAddr, wholesaler, 1, uint(status));
        } else {
            // Otherwise picked for distributor
            status = medicineStatus.pickedForD;
            emit ShippmentUpdate(address(this), _transporterAddr, distributor, 1, uint(status));
        }
    }

    /**
     * @notice Add a new transporter to the route array
     * @param _transporterAddr Address of the next transporter
     */
    function updateTransporterArray(address _transporterAddr) public {
        transporters.push(_transporterAddr);
    }

    /**
     * @notice Called when wholesaler or distributor receives the batch
     * @param _receiverAddr Address of the receiver (wholesaler or distributor)
     * @return Numeric role code: 1 for wholesaler, 2 for distributor
     */
    function receivedMedicine(address _receiverAddr) public returns (uint) {
        // Only current assigned wholesaler or distributor may acknowledge receipt
        require(
            _receiverAddr == wholesaler || _receiverAddr == distributor,
            "Only assigned wholesaler or distributor may receive"
        );
        // Must have been picked up first
        require(
            uint(status) >= uint(medicineStatus.pickedForW),
            "Batch not picked up yet"
        );

        if (_receiverAddr == wholesaler && status == medicineStatus.pickedForW) {
            // Mark delivered at wholesaler
            status = medicineStatus.deliveredAtW;
            emit ShippmentUpdate(address(this), transporters[transporters.length - 1], wholesaler, 2, uint(status));
            return 1;
        } else if (_receiverAddr == distributor && status == medicineStatus.pickedForD) {
            // Mark delivered at distributor
            status = medicineStatus.deliveredAtD;
            emit ShippmentUpdate(address(this), transporters[transporters.length - 1], distributor, 3, uint(status));
            return 2;
        }
    }

    /**
     * @notice Wholesaler assigns distributor and re-requests pickup
     * @param receiver Address of the distributor
     * @param sender   Address of the calling wholesaler
     */
    function sendWtoD(address receiver, address sender) public {
        require(
            wholesaler == sender,
            "Caller is not assigned wholesaler"
        );
        distributor = receiver;
        status = medicineStatus.pickedForD;
    }

    /**
     * @notice Distributor acknowledges receipt from wholesaler
     * @param receiver Address of the distributor
     */
    function receivedWtoD(address receiver) public {
        require(
            distributor == receiver,
            "Caller is not assigned distributor"
        );
        status = medicineStatus.deliveredAtD;
    }

    /**
     * @notice Distributor sends batch to customer
     * @param receiver Address of the customer
     * @param sender   Address of the calling distributor
     */
    function sendDtoC(address receiver, address sender) public {
        require(
            distributor == sender,
            "Caller is not assigned distributor"
        );
        customer = receiver;
        status = medicineStatus.pickedForC;
    }

    /**
     * @notice Customer acknowledges final delivery
     * @param receiver Address of the customer
     */
    function receivedDtoC(address receiver) public {
        require(
            customer == receiver,
            "Caller is not assigned customer"
        );
        status = medicineStatus.deliveredAtC;
    }
}
