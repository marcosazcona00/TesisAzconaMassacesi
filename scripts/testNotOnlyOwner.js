const hre = require("hardhat");

async function main() {
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
    console.log('Test completado correctamente!')
  } else {
    console.log('CUACK, Revisar el test que esta mal planteado')
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
