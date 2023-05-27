const hre = require("hardhat");

async function notOnlyOwner() {
  /* Deploy del contrato como Owner */
  const nowContract = await hre.ethers.getContractFactory("NotOnlyOwner");
  const contract = await nowContract.deploy();
  await contract.deployed();
  console.log(`Contrato deployado en ${contract.address}`)
  
  // Interactúa con el contrato utilizando la cuenta que no sea de owner
  const [owner, account1] = await hre.ethers.getSigners();
  console.log(`Address de la wallet test ${owner.address}, ${account1.address}`);
  const contratoTest = await contract.connect(account1);
  
  // Ejecutamos las cosas de test
  try {
    await contratoTest.test();
  } catch(error){
    /* */
  }
  const modified = await contract.getModified();
  if (!modified) {
    return true;
  } else {
    return false;
  }
}

module.exports = notOnlyOwner