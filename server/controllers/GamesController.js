// controllers/GamesController.js
const pool = require('../../database/db.js');

const gamesController = {
  getAllMLBGames: async (req, res) => {
    try {
      const query = `
        SELECT * FROM mlbgames
        WHERE game_date > NOW() + INTERVAL '15 minutes'
      `; // Query to fetch all MLB games starting in more than 15 minutes
      const { rows } = await pool.query(query);
      res.json(rows);
      console.log('res.json(rows):', res.json(rows));
    } catch (error) {
      console.error('Error fetching MLB games:', error);
      res.status(500).send('Server Error');
    }
  },

  getAllMLBPicks: async (req, res) => {
    try {
      const query = `SELECT * FROM mlbpicks
      WHERE game_date > NOW() + INTERVAL '15 minutes'
    `; // Query to fetch all MLB picks
      const { rows } = await pool.query(query);
      res.json(rows);
    } catch (error) {
      console.error('Error fetching MLB picks:', error);
      res.status(500).send('Server Error');
    }
  }
};

module.exports = gamesController;
