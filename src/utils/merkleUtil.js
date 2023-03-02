// 1. Import libraries. Use `npm` package manager to install
import { MerkleTree } from 'merkletreejs'
import keccak256 from 'keccak256'
// import { arr } from '../artifacts/test';
import merkle from '../artifacts/WhiteListUsers.json'

const leafNodesPresale = merkle.whitelistAddressesPresale.map(addr => keccak256(addr));             

const merkleTreePresale = new MerkleTree(leafNodesPresale, keccak256, { sortPairs: true });

export const getRootPresale = () => {
  const rootHash = merkleTreePresale.getRoot();
  // console.log("Root Hash: ", '0x' + rootHash.toString('hex')); //root changed from buffer to hex
  return '0x'+ rootHash.toString('hex')
}

export const getProofPresale = (claimingAddress) => {
  const hexProof = merkleTreePresale.getHexProof(claimingAddress);

  // console.log(merkleTree.verify(hexProof, claimingAddress, merkleTree.getRoot()),merkleTree.getRoot().toString('hex'),'val');
  return hexProof
}

const leafNodesFreeMint = merkle.whitelistAddressesFreeMint.map(addr => keccak256(addr));             

const merkleTreeFreeMint = new MerkleTree(leafNodesFreeMint, keccak256, { sortPairs: true });

export const getRootFreeMint = () => {
  const rootHash = merkleTreeFreeMint.getRoot();
  return '0x'+ rootHash.toString('hex')
}

export const getProofFreeMint = (claimingAddress) => {
  const hexProof = merkleTreeFreeMint.getHexProof(claimingAddress);
  return hexProof
}
