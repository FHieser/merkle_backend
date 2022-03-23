// Special Thanks to Raz
//https://github.com/davidrazmadzeExtra/Merkle_Tree_Whitelist_NFT.git

// https://medium.com/@ItsCuzzo/using-merkle-trees-for-nft-whitelists-523b58ada3f9
//
// 1. Import libraries. Use `npm` package manager to install
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

// 2. Collect list of wallet addresses from competition, raffle, etc.
// Store list of addresses in some data sheeet (Google Sheets or Excel)
const whitelistAddresses = [
  "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",//original
  "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",//test
  "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
  "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB",
  "0XDCAB482177A592E424D1C8318A464FC922E8DE40",
  "0X6E21D37E07A6F7E53C7ACE372CEC63D4AE4B6BD0",
  "0X09BAAB19FC77C19898140DADD30C4685C597620B",
  "0XCC4C29997177253376528C05D3DF91CF2D69061A",
  "0x1aE0EA34a72D944a8C7603FfB3eC30a6669E454C" // The address in remix
];
//0xd93440932f1cc344a0f16cd9ec40eae6970f39c923f2343981a4446da0a280b0


// 3. Create a new array of `leafNodes` by hashing all indexes of the `whitelistAddresses`
// using `keccak256`. Then creates a Merkle Tree object using keccak256 as the algorithm.
//
// The leaves, merkleTree, and rootHas are all PRE-DETERMINED prior to whitelist claim
const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
console.log(merkleTree.toString());
// 4. Get root hash of the `merkleeTree` in hexadecimal format (0x)
const rootHash = merkleTree.getRoot();
console.log("Root Hash: ", rootHash);

function getProof(claimingAddress) {

  //the claiming address needs to be hashed with keccak256 to work properly
  claimingAddress = keccak256(claimingAddress);

  const hexProof = merkleTree.getHexProof(claimingAddress);

  const isVerified = merkleTree.verify(hexProof, claimingAddress, rootHash);

  return { isVerified, hexProof };
}

function getRoot() {
  //Using a hex-encoding
  return rootHash.toString('hex');
}

//Allows the usage of the function outside of the .js file
exports.getProof = getProof;
exports.getRoot = getRoot;
