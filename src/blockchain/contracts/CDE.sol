// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.18;

contract CDE {
  string public name;
  int public fileCount = 0;
  mapping(int => File) public files;
  File f;

  struct File {
    string name;
    string hash;
    int version;
    string url;
    address author;
  }

  constructor() public {
    name = 'CDE';
  }

  function registerFile(
    string memory _name,
    string memory _hash,
    string memory _url
  ) public {
    // Make sure the file hash exists
    require(bytes(_hash).length > 0);
    // Make sure file name exists
    require(bytes(_name).length > 0);
    // Make sure uploader address exists
    require(msg.sender != address(0));

    // Increment file id
    fileCount++;
    // Set version number
    int version = 1;
    for (int i = 0; i < fileCount; i++) {
      if (keccak256(abi.encodePacked(files[i].name)) == keccak256(abi.encodePacked(_name))) {
        version = files[i].version + 1;
      }
    }
    // Add file to contract
    files[fileCount] = File(_name, _hash, version, _url, msg.sender);
  }

  function getFile(int _id)
    public
    view
    returns (
      string memory,
      string memory,
      int,
      string memory,
      address 
    )
  {
    File memory file = files[_id];
    return (file.name, file.hash, file.version, file.url, file.author);
  }

  // function to interact with OpenSea
  function tokenURI(uint256 _tokenId) public view returns (string memory) {
    int index = int(_tokenId);
    return files[index].url;
  }
}
