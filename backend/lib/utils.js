const fs = require('fs');
const path = require('node:path'); 

function generateRandomString(length = 10) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  return randomString;
}


function addTestContractName(solCode, timestamp) {
  // Al nombre del contrato le agregamos Test adelante
  // Buscar el nombre original del contrato
  const originalName = /contract (\w+)/.exec(solCode)[1];

  // Reemplazar el nombre original con "Test" + nombre original
  const nuevoSolCode = solCode.replace(
      new RegExp(`contract ${originalName}`),
      `contract ${timestamp}Test${originalName}`
  );

  return nuevoSolCode;
}

function filterSolidityFiles(files) {
  return files.filter(fileName => /\.sol$/.test(fileName));
}

async function createContractsFiles(editableContracts, randomString) {
  const contractsNames = [];
  for (let i = 0; i < editableContracts.length; i += 1) {
    const contract = editableContracts[i];
    const modifiedCode = addTestContractName(contract.code, randomString);
    const contractName = `contracts/${randomString}Test${contract.name}`;
    contractsNames.push(contractName);
    await fs.writeFileSync(contractName, modifiedCode);
  }
  return contractsNames;
}

async function deleleteContractsFiles(contractsNames) {
  for (let i = 0; i < contractsNames.length; i += 1) {
    await fs.unlinkSync(contractsNames[i]);
  }
}

async function readDir(dirPath) {
  return new Promise((resolve) => {
    fs.readdir(dirPath, (err, files) => {
      resolve(files)
    })
  })
}

async function getAllDirContracts(idVuln) {
  const baseDirPath = path.join(__dirname, '..', 'contracts', idVuln, 'base');
  const readOnlyDirPath = path.join(__dirname, '..', 'contracts', idVuln, 'readonly');
  const baseDirFiles = await readDir(baseDirPath);
  const readOnlyDirFiles = await readDir(readOnlyDirPath);
  let files = []
  // Concateno los archivos base con los que no
  // Los base son los que edita el usuario
  // Los readonly son los que no se tocan
  files = files.concat(filterSolidityFiles(baseDirFiles).map((file) => ({ name: file, base: true, editable: true })));
  files = files.concat(filterSolidityFiles(readOnlyDirFiles).map((file) => ({ name: file, base: false, editable: false })));
  const contracts = [];
  for (let i = 0; i < files.length; i += 1) {
    const contract = files[i];
    const dir = contract.base ? 'base' : 'readonly'
    const filePath = path.join(__dirname, '..', 'contracts', idVuln, dir, contract.name);
    const contractSol = await fs.readFileSync(filePath, 'utf-8');
    contracts.push({ name: contract.name, code: contractSol, editable: contract.editable });
  }
  return contracts;
}

module.exports = {
  getAllDirContracts,
  generateRandomString,
  createContractsFiles,
  deleleteContractsFiles,
}