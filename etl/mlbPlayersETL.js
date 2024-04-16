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

async function loadMlbPlayers() {
    const players = [];

    fs.createReadStream('./data/mlb_players.csv')
        .pipe(csv())
        .on('data', async (row) => {
            const client = await pool.connect();
            try {
                const teamIdResult = await client.query('SELECT id FROM Teams WHERE name = $1', [row.Team]);
                const teamId = teamIdResult.rows[0]?.id;
                if (teamId) {
                    players.push({ name: row['Player Name'], team_id: teamId });
                } else {
                    console.log(`Team ID not found for ${row.Team}. Skipping insertion.`);
                }
            } catch (error) {
                console.error('Error fetching Team ID:', error);
            } finally {
                client.release();
            }
        })
        .on('end', async () => {
            const client = await pool.connect();
            try {
                await client.query('BEGIN');

                for (const player of players) {
                    await client.query('INSERT INTO MlbPlayers(name, team_id) VALUES ($1, $2)', [player.name, player.team_id]);
                }

                await client.query('COMMIT');
                console.log('MLB Players loaded successfully.');
            } catch (error) {
                await client.query('ROLLBACK');
                console.error('Error loading MLB Players:', error);
            } finally {
                client.release();
            }
        });
}

module.exports = loadMlbPlayers;
