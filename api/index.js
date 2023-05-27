const express = require('express');

const tests = require('./tests/index')

const { DEFAULT_CONTRACT } = require('./constants/index')

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  const contractName = req.body?.contract || DEFAULT_CONTRACT;
  const worked = await tests[contractName]();
  res.send(worked ? 'El test funciono' : 'El test no funciono, revisar');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});