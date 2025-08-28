const { ethers, upgrades } = require('hardhat');

async function main () {
  const Box = await ethers.getContractFactory('Box');
 
  const proxyContract = await upgrades.deployProxy(Box, [768], {
    initializer: "setValue"
  });

  await proxyContract.waitForDeployment();

  const proxyContractAddress = await proxyContract.getAddress();
  const implementationAddress = await upgrades.erc1967.getImplementationAddress(proxyContractAddress);
  const adminAddress = await upgrades.erc1967.getAdminAddress(proxyContractAddress);

  console.log("Proxy contract address:",proxyContractAddress)
  console.log("Implementation contract address:", implementationAddress);
  console.log("Admin contract address:", adminAddress);
}

// Execute the main function and catch any errors
main().catch((error) => {
  console.error(error);
  process.exit(1);
});

// Proxy contract address: 0x63Dc58D469F9924969bf765063bC002d5f7151a1
// Implementation contract address: 0x3233cA4B0C7E5A7E37d8cC82d8Ac69278Fbe7aEA
// Admin contract address: 0x84Dc026081c167F4ceD14e71b2bc3C0009c1dC76