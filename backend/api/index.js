const spawn = require('child_process').spawn;
const fs = require('fs');

const express = require('express');
const cors = require('cors');

const tests = require('./tests/index')

const { DEFAULT_CONTRACT } = require('./constants/index')

const app = express();
const port = 3000;

app.use(cors())
app.use(express.json());

app.post('/run', async (req, res) => {
  const { code, contract, solName } = req.body;
  await fs.writeFileSync(`contracts/${solName}.sol`, code);
  const worked = await tests[contract]();
  res.send(worked ? 'El test funciono' : 'El test no funciono, revisar')
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
