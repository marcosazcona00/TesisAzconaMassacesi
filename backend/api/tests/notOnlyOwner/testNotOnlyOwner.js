const { run, ethers } = require('hardhat');

async function notOnlyOwner() {
  await run('compile');
  
  /* Deploy del contrato como Owner */  
  const nowContract = await ethers.getContractFactory(`${process.env.DEVELOP === 1 ? 'Test' : ''}NotOnlyOwner`);
  const contract = await nowContract.deploy();
  await contract.deployed();
  console.log(`Contrato deployado en ${contract.address}`)
  
  // Interactúa con el contrato utilizando la cuenta que no sea de owner
  const [owner, account1] = await ethers.getSigners();
  console.log(`Address de la wallet test ${owner.address}, ${account1.address}`);
  const contratoTest = await contract.connect(account1);
  
  // Ejecutamos las cosas de test
  try {
    await contratoTest.test();
  } catch(error){
    /* */
  }
  const modified = await contract.getModified();
  if (modified) {
    // Significa que alguien que no era el owner modifico la variable, test case da error
    return false;
  }
  // Significa que alguien que no era el owner no pudo modificar la variable
  return true;
}

module.exports = notOnlyOwner;