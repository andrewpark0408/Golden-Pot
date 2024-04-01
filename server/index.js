const express = require('express');
const pool = require('../database/db');
const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Hello from Melting Pot backend!');
});

app.get('/data', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM entries');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});