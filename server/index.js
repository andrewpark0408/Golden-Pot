const express = require('express');
const cors = require('cors');
const pool = require('../database/db');
const gamesRouter = require('./routes/games');
const { simulateResultsAndUpdateStatus } = require('./simulateEntry');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use('/games', gamesRouter);

app.get('/', (req, res) => {
  res.send('Hello from Melting Pot backend!');
});

app.get('/data', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM mlbgames;');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.get('/picks', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM mlbpicks;');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

const entry = {
  id: 1,
  lastStartTime: '2024-04-01T20:00:00', // Example last start time within the entry
  picks: [
      { type: 'over', result: null },
      { type: 'under', result: null },
      // Add more picks as needed
  ],
  status: 'pending' // Initial status is pending
};

// // Simulate results and update entry status
// simulateResultsAndUpdateStatus(entry);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});