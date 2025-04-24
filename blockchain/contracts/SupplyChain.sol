pragma solidity ^0.6.6;
pragma experimental ABIEncoderV2;

// Import modules for each participant in the supply chain
import './RawMaterial.sol';       // Raw material package creation and tracking
import './Supplier.sol';          // Supplier-specific functionality
import './Transporter.sol';       // Transporter-specific functionality
import './Medicine.sol';          // Medicine package definition and tracking
import './Manufacturer.sol';      // Manufacturer-specific functionality
import './MedicineW_D.sol';       // Wholesaler-to-Distributor sub-contract logic
import './Wholesaler.sol';        // Wholesaler-specific functionality
import './MedicineD_C.sol';       // Distributor-to-Customer sub-contract logic
import './Distributor.sol';       // Distributor-specific functionality
import './Customer.sol';          // Customer-specific functionality

/**
 * @title SupplyChain
 * @dev Coordinates interactions among all roles: supplier, transporter,
 *      manufacturer, wholesaler, distributor, and customer.
 */
contract SupplyChain is Supplier, Transporter, Manufacturer, Wholesaler, Distributor, Customer {
    // Address of contract owner (has admin privileges)
    address public Owner;

    /**
     * @dev Set the deployer as the owner
     */
    constructor() public {
        Owner = msg.sender;
    }

    /**
     * @dev Restrict access to owner only
     */
    modifier onlyOwner() {
        require(Owner == msg.sender, "Only owner can call this function");
        _;
    }

    /**
     * @dev Ensure that the caller matches a given address
     * @param addr Address to check against msg.sender
     */
    modifier checkUser(address addr) {
        require(addr == msg.sender, "Caller address mismatch");
        _;
    }

    // Define all possible roles in the supply chain
    enum roles {
        noRole,
        supplier,
        transporter,
        manufacturer,
        wholesaler,
        distributor,
        customer
    }

    //////////////// Events for logging actions ////////////////////

    event UserRegister(address indexed _address, bytes32 name);
    event buyEvent(address buyer, address seller, address packageAddr, bytes32 signature, uint indexed now);
    event respondEvent(address buyer, address seller, address packageAddr, bytes32 signature, uint indexed now);
    event sendEvent(address seller, address buyer, address packageAddr, bytes32 signature, uint indexed now);
    event receivedEvent(address buyer, address seller, address packageAddr, bytes32 signature, uint indexed now);

    /////////////// User Management (Owner Only) //////////////////////

    struct userData {
        bytes32 name;        // User's display name
        string[] userLoc;    // User's locations (e.g., warehouses)
        roles role;          // Role in the supply chain
        address userAddr;    // Blockchain address of the user
    }

    // Mapping from address to user data
    mapping(address => userData) public userInfo;

    /**
     * @dev Register a new user in the system (only owner)
     * @param name    Display name of the user
     * @param loc     Array of location identifiers
     * @param role    Numeric representation of their role
     * @param _userAddr Address of the user
     */
    function registerUser(
        bytes32 name,
        string[] memory loc,
        uint role,
        address _userAddr
    ) external onlyOwner {
        userInfo[_userAddr].name = name;
        userInfo[_userAddr].userLoc = loc;
        userInfo[_userAddr].role = roles(role);
        userInfo[_userAddr].userAddr = _userAddr;

        emit UserRegister(_userAddr, name);
    }

    /**
     * @dev Change the role of an existing user (only owner)
     * @param _role New role as an unsigned integer
     * @param _addr Address of the user
     */
    function changeUserRole(uint _role, address _addr) external onlyOwner returns (string memory) {
        userInfo[_addr].role = roles(_role);
        return "Role Updated!";
    }

    /**
     * @dev Retrieve stored user information (only owner)
     * @param _address Address of the user to query
     */
    function getUserInfo(address _address) external view onlyOwner returns (userData memory) {
        return userInfo[_address];
    }

    /////////////// Supplier Functions //////////////////////

    /**
     * @dev Supplier creates a new raw material package
     * @param _description Brief description of the package
     * @param _quantity    Quantity of raw material units
     * @param _transporterAddr Address of the transporter
     * @param _manufacturerAddr Address of the manufacturer to receive package
     */
    function supplierCreatesRawPackage(
        bytes32 _description,
        uint _quantity,
        address _transporterAddr,
        address _manufacturerAddr
    ) external {
        require(
            userInfo[msg.sender].role == roles.supplier,
            "Only suppliers may create raw material packages"
        );

        createRawMaterialPackage(
            _description,
            _quantity,
            _transporterAddr,
            _manufacturerAddr
        );
    }

    /**
     * @dev Get number of raw packages created by this supplier
     */
    function supplierGetPackageCount() external view returns (uint) {
        require(
            userInfo[msg.sender].role == roles.supplier,
            "Only suppliers may query their package count"
        );
        return getNoOfPackagesOfSupplier();
    }

    /**
     * @dev List all raw package addresses created by this supplier
     */
    function supplierGetRawMaterialAddresses() external view returns (address[] memory) {
        return getAllPackages();
    }

    /////////////// Transporter Functions ///////////////

    /**
     * @dev Transporter handles a package at a given step
     * @param _address     Package contract address
     * @param transporterType Type identifier for shipping step
     * @param cid          Identifier of next recipient
     */
    function transporterHandlePackage(
        address _address,
        uint transporterType,
        address cid
    ) external {
        require(
            userInfo[msg.sender].role == roles.transporter,
            "Only transporters may handle packages"
        );
        require(
            transporterType > 0,
            "Invalid transporter type"
        );

        handlePackage(_address, transporterType, cid);
    }

    /////////////// Manufacturer Functions ///////////////

    /**
     * @dev Manufacturer acknowledges receipt of raw materials
     * @param _addr Address of the raw material package
     */
    function manufacturerReceivedRawMaterials(address _addr) external {
        require(
            userInfo[msg.sender].role == roles.manufacturer,
            "Only manufacturers may receive raw materials"
        );
        manufacturerReceivedPackage(_addr, msg.sender);
    }

    /**
     * @dev Manufacturer creates a new medicine batch
     * @param _description Description of the medicine
     * @param _rawAddr     List of raw package addresses used
     * @param _quantity    Number of medicine units
     * @param _transporterAddr Array of transporter addresses
     * @param _receiverAddr       Final receiver address
     * @param RcvrType     Receiver role type identifier
     */
    function manufacturerCreatesNewMedicine(
        bytes32 _description,
        address[] memory _rawAddr,
        uint _quantity,
        address[] memory _transporterAddr,
        address _receiverAddr,
        uint RcvrType
    ) external returns (string memory) {
        require(
            userInfo[msg.sender].role == roles.manufacturer,
            "Only manufacturers may create medicines"
        );
        require(
            RcvrType != 0,
            "Receiver type must be specified"
        );

        manufacturerCreatesMedicine(
            msg.sender,
            _description,
            _rawAddr,
            _quantity,
            _transporterAddr,
            _receiverAddr,
            RcvrType
        );

        return "Medicine created!";
    }

    /////////////// Wholesaler Functions ///////////////

    /**
     * @dev Wholesaler or distributor acknowledges medicine receipt
     * @param _address Medicine package address
     */
    function wholesalerReceivedMedicine(address _address) external {
        require(
            userInfo[msg.sender].role == roles.wholesaler ||
            userInfo[msg.sender].role == roles.distributor,
            "Only wholesalers and distributors may receive medicine"
        );

        medicineRecievedAtWholesaler(_address);
    }

    /**
     * @dev Wholesaler transfers medicine to distributor
     * @param _address Package address
     * @param transporter Transporter address
     * @param receiver Receiver address (distributor)
     */
    function transferMedicineW_D(
        address _address,
        address transporter,
        address receiver
    ) external {
        require(
            userInfo[msg.sender].role == roles.wholesaler &&
            msg.sender == Medicine(_address).getWDC()[0],
            "Only current wholesaler owner may transfer"
        );

        transferMedicineWtoD(_address, transporter, receiver);
    }

    /**
     * @dev Get batch ID by index for wholesaler-to-distributor transfers
     */
    function getBatchIdByIndexWD(uint index) external view returns (address) {
        require(
            userInfo[msg.sender].role == roles.wholesaler,
            "Only wholesalers may query their batches"
        );
        return MedicineWtoD[msg.sender][index];
    }

    /**
     * @dev Get sub-contract address for a given package
     */
    function getSubContractWD(address _address) external view returns (address) {
        return MedicineWtoDTxContract[_address];
    }

    /////////////// Distributor Functions ///////////////

    /**
     * @dev Distributor acknowledges receipt of medicine
     */
    function distributorReceivedMedicine(
        address _address,
        address cid
    ) external {
        require(
            userInfo[msg.sender].role == roles.distributor &&
            msg.sender == Medicine(_address).getWDC()[1],
            "Only current distributor owner may receive"
        );

        medicineRecievedAtDistributor(_address, cid);
    }

    /**
     * @dev Distributor transfers medicine to customer
     */
    function distributorTransferMedicinetoCustomer(
        address _address,
        address transporter,
        address receiver
    ) external {
        require(
            userInfo[msg.sender].role == roles.distributor &&
            msg.sender == Medicine(_address).getWDC()[1],
            "Only current distributor owner may transfer"
        );

        transferMedicineDtoC(_address, transporter, receiver);
    }

    /**
     * @dev Get count of distributor-to-customer batches
     */
    function getBatchesCountDC() external view returns (uint) {
        require(
            userInfo[msg.sender].role == roles.distributor,
            "Only distributors may query batch count"
        );
        return MedicineDtoC[msg.sender].length;
    }

    /**
     * @dev Get batch ID by index for distributor-to-customer transfers
     */
    function getBatchIdByIndexDC(uint index) external view returns (address) {
        require(
            userInfo[msg.sender].role == roles.distributor,
            "Only distributors may query their batches"
        );
        return MedicineDtoC[msg.sender][index];
    }

    /**
     * @dev Get sub-contract address for a distributor-to-customer package
     */
    function getSubContractDC(address _address) external view returns (address) {
        return MedicineDtoCTxContract[_address];
    }

    /////////////// Customer Functions ///////////////

    /**
     * @dev Final customer acknowledges receipt of medicine
     */
    function customerReceivedMedicine(
        address _address,
        address cid
    ) external {
        require(
            userInfo[msg.sender].role == roles.customer,
            "Only customers may receive medicine"
        );
        medicineRecievedAtCustomer(_address, cid);
    }

    /**
     * @dev Customer updates sale status of their package
     */
    function updateStatus(
        address _address,
        uint Status
    ) external {
        require(
            userInfo[msg.sender].role == roles.customer &&
            msg.sender == Medicine(_address).getWDC()[2],
            "Only current customer owner may update status"
        );
        require(
            sale[_address] == salestatus(1),
            "Medicine must be at customer before updating status"
        );

        updateSaleStatus(_address, Status);
    }

    /**
     * @dev Retrieve sales status information for a package
     */
    function getSalesInfo(address _address) external view returns (uint) {
        return salesInfo(_address);
    }

    /**
     * @dev Get count of medicine batches held by customer
     */
    function getBatchesCountC() external view returns (uint) {
        require(
            userInfo[msg.sender].role == roles.customer,
            "Only customers may query batch count"
        );
        return MedicineBatchAtCustomer[msg.sender].length;
    }

    /**
     * @dev Get package ID by index for customer's batches
     */
    function getBatchIdByIndexC(uint index) external view returns (address) {
        require(
            userInfo[msg.sender].role == roles.customer,
            "Only customers may query their batches"
        );
        return MedicineBatchAtCustomer[msg.sender][index];
    }

    // Optional: Verify digital signature (commented out)
    // function verify(address p, bytes32 hash, uint8 v, bytes32 r, bytes32 s) external view returns(bool) {
    //     return ecrecover(hash, v, r, s) == p;
    // }
}
