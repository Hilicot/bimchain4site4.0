pragma solidity >=0.4.22 <0.8.18 ;

contract CDE {
    string public name;
    uint public fileCount = 0;
    mapping(uint => File) public files;

    struct File{
        string name;
        string hash;
        string description;
        uint version;
        string url;
        address uploader;
    }

    constructor() public {
        name = "CDE";
    }

    function registerFile(string memory _name, string memory _hash, string memory _description, string memory _url) public {
    // Make sure the file hash exists
    require(bytes(_hash).length > 0);
    // Make sure file name exists
    require(bytes(_name).length > 0);
    // Make sure uploader address exists
    require(msg.sender != address(0));
    // Make sure file description exists
    require(bytes(_description).length > 0);
    
    // Increment file id
    fileCount ++;
    // Set version number
    uint version = 1;
    for (uint i = 0; i < fileCount; i++) {
        if (keccak256(abi.encodePacked(files[i].name)) == keccak256(abi.encodePacked(_name))) {
            version = files[i].version + 1;
        }
    }
    // Add file to contract
    files[fileCount] = File(_name, _hash, _description, version, _url, msg.sender);
}
}

