const fs = require('fs');
const path = require('node:path'); 

async function readDir(dirPath) {
  return new Promise((resolve) => {
    fs.readdir(dirPath, (err, files) => {
      resolve(files)
    })
  })
}

async function getAllDirContracts(idVuln, dirPath) {
  const dirFiles = await readDir(dirPath);
  const solidityFiles = dirFiles.filter(fileName => /\.sol$/.test(fileName));
  const contracts = [];
  for (let i = 0; i < solidityFiles.length; i += 1) {
    const contractName = solidityFiles[i];
    const filePath = path.join(__dirname, '..', 'contracts', idVuln, contractName);
    const contractSol = await fs.readFileSync(filePath, 'utf-8');
    contracts.push({ name: contractName, code: contractSol });
  }
  return contracts;
}

module.exports = {
  getAllDirContracts,
}