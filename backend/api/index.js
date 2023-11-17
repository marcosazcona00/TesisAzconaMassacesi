const fs = require('fs');
const path = require('node:path'); 
const express = require('express');
const cors = require('cors');

const tests = require('./tests/index')
const challenges = require('./constants/challenges');
const { getAllDirContracts } = require('../lib/utils');

const app = express();
const port = 3000;

app.use(cors())
app.use(express.json());


app.get('/challenges/list', (req, res) => {
  res.send(challenges);
})

app.get('/challenge2/:id', async (req, res) => {
  // Validar el id
  const { id } = req.params;
  const filePath = path.join(__dirname, 'tests', id, `${id}.sol`);
  const vulnerableContract = await fs.readFileSync(filePath, 'utf-8');
  res.send({
    contract: vulnerableContract,
  })
})

app.get('/challenge/:id', async (req, res) => {
  // Validar el id
  const { id } = req.params;
  const filePath = path.join(__dirname, 'tests', id);
  const contracts = await getAllDirContracts(id, filePath);
  res.json(contracts)
})

app.post('/run', async (req, res) => {
  const { code, contract, solName } = req.body;
  if (!tests[contract]) {
    res.send({ worked: false });
    return;
  }
  // Escribo el test en el archivo para ejecutarlo
  await fs.writeFileSync(`contracts/${solName}/${solName}.sol`, code);
  try {
    const worked = await tests[contract]();
    res.send(worked ? { worked: true, pass: true, description: 'El test funciono'} : { worked: true, pass: false, description: 'El test no funciono, revisar'})
  } catch(error) {
    console.error(error);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
