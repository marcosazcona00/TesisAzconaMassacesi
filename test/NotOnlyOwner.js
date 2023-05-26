const hre = require("hardhat");

describe('NotOnlyOwner', () => { 
  it('Test el no owner modifica el count', async () => {
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const myContract = await hre.ethers.getContractAt("NotOnlyOwner", contractAddress);
    // const res = await myContract.checkPass();
    // console.log(res);
  })
})