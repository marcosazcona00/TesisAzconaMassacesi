const fs = require('fs');
const path = require('node:path'); 
const express = require('express');
const cors = require('cors');


const tests = require('./tests/index')
const challenges = require('./constants/challenges');
const { 
  createContractsFiles, 
  generateRandomString,
  getAllDirContracts, 
  deleleteContractsFiles
} = require('../lib/utils');

const app = express();
const port = 3000;

app.use(cors())
app.use(express.json());


app.get('/challenges/list', (req, res) => {
  res.send(challenges);
})

app.get('/challenge/:id', async (req, res) => {
  // Validar el id
  const { id } = req.params;
  const contracts = await getAllDirContracts(id);
  res.json(contracts)
})

app.post('/run', async (req, res) => {
  const { editableContracts, contract } = req.body;
  if (!tests[contract]) {
    res.send({ worked: false });
    return;
  }
  // Escribo el test en el archivo para ejecutarlo, le agrego al contrato el nombre Test adelante
  const randomString = generateRandomString();
  const contractsNames = await createContractsFiles(editableContracts, randomString);

  try {
    const worked = await tests[contract](randomString);
    res.send(worked ? { worked: true, pass: true, description: 'El test funciono'} : { worked: true, pass: false, description: 'El test no funciono, revisar'})
  } catch(error) {
    console.error(error);
  }
  await deleleteContractsFiles(contractsNames);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
