// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.20;
pragma experimental ABIEncoderV2;

contract CDE {
  /** files = list Files. Each file is the head of a linked list of all its previous versions.
                Indexed by the hash of the name, value is the id of the head
    e.g.    5689 -> file1_v2 --> file1_v1
            3674 -> file2_v3 --> file2_v2 --> file2_v1
   */
  mapping(bytes32 => bytes32) public file_by_name;    
  
  /** heads = list of all heads of linked lists. Indexed by a progressive integer id
    e.g.    001 -> 5689
            002 -> 3674
      */
  mapping(uint16 => bytes32) public heads;
  uint16 public fileCount = 0; // number of heads

  /** allFileVersions = mapping of all versions of all files. Indexed by id
    e.g.    25    -> file1_v1
            52745 -> file1_v2
            42577 -> file2_v1
            52475 -> file2_v2
      */
  mapping(bytes32 => File) public all_files; 
  File f;

  struct File {
    bytes32 name; // name is hashed to save gas (it can immediately be used as index)
    uint version;
    string url;
    address author;
    uint timestamp;
    bytes32 next;
    uint16 index;
  }

  constructor() public {
  }

  function registerFile(
    bytes32 _name,
    string memory _url
  ) public{
    // Make sure file name exists
    require(_name > 0, "name not valid");
    // Make sure uploader address exists
    require(msg.sender != address(0), "uploader address not valid");

    // check if there is a previous version
    bytes32 oldAlias = file_by_name[_name];
    uint version = 1;
    uint16 index = fileCount;
    if (oldAlias != 0x0) { // there is already a file with the same name
      version = all_files[oldAlias].version + 1;
      index = all_files[oldAlias].index;
    }

    File memory file = File(_name, version, _url, msg.sender, block.timestamp, oldAlias, index);

    // Add file to general list
    bytes32 id = keccak256(abi.encodePacked(file.name, file.version));
    all_files[id] = file;

    // Add file to linked list and head list
    file_by_name[_name] = id;
    heads[index] = id;
    if (oldAlias == 0x0) 
      fileCount++; // increase counter only if it is a new head
  }

  function getFileByName(bytes32 name)
    public
    view
    returns (
      uint,
      string memory,
      address,
      uint  
    )
  {
    File memory file = all_files[file_by_name[name]];
    return (file.version, file.url, file.author, file.timestamp);
  }

  function getAllFilesRecent() public view returns(File[] memory){
    File[] memory rv = new File[](fileCount);
    for (uint16 i=0; i < fileCount; i++){
      rv[i] = all_files[heads[i]];
    }
    return rv;
  }


  // function to interact with OpenSea
  /* TODO restore?
  function tokenURI(uint256 _tokenId) public view returns (string memory) {
    int index = int(_tokenId);
    return files[index].url;
  }
  */
}
