const fs = require('fs');
const csv = require('csv-parser');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'melting_pot',
    password: 'password',
    port: 5432
});

async function loadMlbGames() {
    const games = [];

    fs.createReadStream('./data/mlb_games.csv')
        .pipe(csv())
        .on('data', (row) => {
            games.push({
                home_team: row['Home Team'],
                away_team: row['Away Team'],
                game_date: new Date(row['Start Time']),
                location: row['Location']
            });
        })
        .on('end', async () => {
            const client = await pool.connect();
            try {
                await client.query('BEGIN');

                for (const game of games) {
                    await client.query('INSERT INTO MlbGames(home_team, away_team, game_date, location) VALUES ($1, $2, $3, $4)', [game.home_team, game.away_team, game.game_date, game.location]);
                }

                await client.query('COMMIT');
                console.log('MLB Games loaded successfully.');
            } catch (error) {
                await client.query('ROLLBACK');
                console.error('Error loading MLB Games:', error);
            } finally {
                client.release();
            }
        });
}

module.exports = loadMlbGames;
