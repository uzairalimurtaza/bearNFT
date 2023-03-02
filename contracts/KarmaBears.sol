// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/utils/Strings.sol";
// import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "./ERC721A.sol";
contract KarmaBears is ERC721A, Ownable {
    using Strings for uint256;

    mapping(address => uint256) public mintCountByAddress;
    mapping(address => uint256) public mintCountByAddressFreeMint;

    bytes32 public merkleTreeRootPresale;
    bytes32 public merkleTreeRootFreeMint;

    uint256 public preSaleCost = 0.05 ether;
    uint256 public publicSaleCost = 0.08 ether;
    uint256 public maxMintPerWallet = 4;

    uint256 private publicSaleMinted = 0;
    uint256 private preSaleMinted = 0;
    uint256 private freeSaleMinted = 0;

    uint256 public TOTAL_SUPPLY = 4444;
    uint256 public FREE_SUPPLY = 2000;
    uint256 public WL_SUPPLY = 444;

    bool public isPaused = true;
    bool public isRevealed = false;
    bool public isPresaleActive = false;
    bool public isFreeMintActive = false;
    bool public isPublicMintActive = false;
    string public baseURI = "";
    string public notRevealedUri;

    constructor() ERC721A("KarmaBear", "KBR") {}

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function totalMinted() public view returns (uint256) {
        return _totalMinted();
    }

    function preSaleMint(uint256 quantity, bytes32[] memory proof)
        public
        payable
    {
        require(!isPaused, "Minting is Paused!");
        require(isPresaleActive, "Presale is not active");
        require(mintCountByAddress[msg.sender]+quantity<=maxMintPerWallet, "Max Mint Per Wallet Reached");
        require(isValidPresale(proof, msg.sender), "You Are Not Whitelisted");
        require(
            totalMinted() + quantity <= TOTAL_SUPPLY,
            "Exceeds TOTAL Mint supply"
        );
        require(
            preSaleMinted + quantity <= WL_SUPPLY,
            "Exceeds WL Mint supply"
        );
        require(msg.value == preSaleCost * quantity, "Value is Not Correct");
        _safeMint(msg.sender, quantity);
        preSaleMinted += quantity;
        mintCountByAddress[msg.sender] += quantity;
    }

    function freeSaleMint(bytes32[] memory proof) public {
        require(!isPaused, "Minting is Paused!");
        require(isFreeMintActive, "Freesale is not active");
        require(mintCountByAddressFreeMint[msg.sender] <1 ,"You Have Already Used Free Mint");
        require(isValidFreeMint(proof, msg.sender), "You Are Not Allowed For Free Sale Mint");
        require(
            freeSaleMinted + 1 <= FREE_SUPPLY,
            "Exceeds FREE Mint supply"
        );
        _safeMint(msg.sender, 1);
        freeSaleMinted += 1;
        mintCountByAddressFreeMint[msg.sender] += 1;
    }

    function publicSaleMint(uint256 quantity) public payable {
        require(!isPaused, "Minting is Paused!");
        require(isPublicMintActive, "Public sale is not active");
        require(mintCountByAddress[msg.sender]+quantity<=maxMintPerWallet, "Max Mint Per Wallet Reached");
        require(msg.value == publicSaleCost * quantity, "Value is Not Correct");
        require(
            totalMinted() + quantity <= TOTAL_SUPPLY,
            "Exceeds TOTAL Mint supply"
        );
        _safeMint(msg.sender, quantity);
        publicSaleMinted += quantity;
        mintCountByAddress[msg.sender] += quantity;
    }

    function adminMint(uint256 quantity) public onlyOwner {
        require(
            totalMinted() + quantity <= TOTAL_SUPPLY,
            "Exceeds TOTAL Mint supply"
        );
        _safeMint(msg.sender, quantity);
        publicSaleMinted += quantity;
    }

    function giveAway(address winnerAddress) public onlyOwner {
        require(
            totalMinted() + 1 <= TOTAL_SUPPLY,
            "Exceeds TOTAL Mint supply"
        );
        require(
            freeSaleMinted + 1 <= FREE_SUPPLY,
            "Exceeds FREE Mint supply"
        );
        _safeMint(winnerAddress, 1);
        freeSaleMinted += 1;
    }

    function isValidPresale(bytes32[] memory proof, address sender) internal view returns (bool) {
        bytes32 leaf = keccak256(abi.encodePacked(sender));
        return MerkleProof.verify(proof, merkleTreeRootPresale, leaf);
    }

    function isValidFreeMint(bytes32[] memory proof, address sender) internal view returns (bool) {
        bytes32 leaf = keccak256(abi.encodePacked(sender));
        return MerkleProof.verify(proof, merkleTreeRootFreeMint, leaf);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        if (!isRevealed) {
            return notRevealedUri;
        }
        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        tokenId.toString(),
                        ".json"
                    )
                )
                : "";
    }

    function withdraw() external onlyOwner {
        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        require(os, "Withdraw failed!");
    }

    function setMerkleTreeRootPresale(bytes32 _merkleTreeRoot) public onlyOwner {
        merkleTreeRootPresale = _merkleTreeRoot;
    }

    function setMerkleTreeRootFreeMint(bytes32 _merkleTreeRoot) public onlyOwner {
        merkleTreeRootFreeMint = _merkleTreeRoot;
    }

    function setPaused(bool _state) public onlyOwner {
        isPaused = _state;
    }

    function setMaxMintPerWallet(uint256 _maxMintPerWallet) public onlyOwner {
        maxMintPerWallet = _maxMintPerWallet;
    }
    
    function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
        notRevealedUri = _notRevealedURI;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function setRevealed(bool _state) public onlyOwner {
        isRevealed = _state;
    }

    function setPresaleCost(uint256 _newCost) public onlyOwner {
        preSaleCost = _newCost;
    }

    function setPublicSaleCost(uint256 _newCost) public onlyOwner {
        publicSaleCost = _newCost;
    }

    function setFreeSaleMint(bool _status) public onlyOwner {
        isFreeMintActive = _status;
        isPresaleActive = false;
        isPublicMintActive = false;
    }

    function setPresaleMint(bool _status) public onlyOwner {
        isPresaleActive = _status;
        isFreeMintActive = false;
        isPublicMintActive = false;
    }

    function setPublicSaleMint(bool _status) public onlyOwner {
        isPublicMintActive = _status;
        isFreeMintActive = false;
        isPresaleActive = false;
    }
}