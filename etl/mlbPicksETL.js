const fs = require('fs');
const csv = require('csv-parser');
const { Pool } = require('pg');
const pool = require('../database/db'); // Assuming this imports the database connection correctly

async function loadMLBPicks() {
    const picks = [];

    fs.createReadStream('./data/mlb_picks.csv')
        .pipe(csv())
        .on('data', (row) => {
            const strikeouts = row['Strikeouts'] !== '' ? parseInt(row['Strikeouts']) : null;
            const walks = row['Walks'] !== '' ? parseInt(row['Walks']) : null;
            const strikes = row['Strikes'] !== '' ? parseInt(row['Strikes']) : null;
            const single = row['Single'] !== '' ? parseInt(row['Single']) : null;
            const double = row['Double'] !== '' ? parseInt(row['Double']) : null;
            const triple = row['Triple'] !== '' ? parseInt(row['Triple']) : null;
            const homeRuns = row['Home Runs'] !== '' ? parseInt(row['Home Runs']) : null;

            picks.push({
                home_team: row['Home Team'],
                away_team: row['Away Team'],
                game_date: new Date(row['Start Time']),
                player_type: row['Player Type'],
                player_name: row['Player Name'],
                strikeouts: strikeouts,
                walks: walks,
                strikes: strikes,
                single: single,
                double: double,
                triple: triple,
                home_runs: homeRuns
            });
        })
        .on('end', async () => {
            const query = 'INSERT INTO mlbpicks(home_team, away_team, game_date, player_type, player_name, strikeouts, walks, strikes, single, double, triple, home_runs) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)';
            const client = await pool.connect();
            try {
                await client.query('BEGIN');

                for (const pick of picks) {
                    await client.query(query, [
                        pick.home_team,
                        pick.away_team,
                        pick.game_date,
                        pick.player_type,
                        pick.player_name,
                        pick.strikeouts !== null ? pick.strikeouts : undefined,
                        pick.walks !== null ? pick.walks : undefined,
                        pick.strikes !== null ? pick.strikes : undefined,
                        pick.single !== null ? pick.single : undefined,
                        pick.double !== null ? pick.double : undefined,
                        pick.triple !== null ? pick.triple : undefined,
                        pick.home_runs !== null ? pick.home_runs : undefined
                    ]);
                }

                await client.query('COMMIT');
                console.log('MLB Picks loaded successfully.');
            } catch (error) {
                await client.query('ROLLBACK');
                console.error('Error loading MLB Picks:', error);
            } finally {
                client.release();
            }
        });
}

module.exports = loadMLBPicks;
