// routes/games.js
const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/GamesController');

// Route to fetch all MLB games
router.get('/data', gamesController.getAllMLBGames);
// Other routes as needed
router.get('/picks', gamesController.getAllMLBPicks);
module.exports = router;
