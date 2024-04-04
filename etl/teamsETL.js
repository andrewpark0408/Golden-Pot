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

async function loadTeams() {
  const client = await pool.connect();
  try {
    const teams = [];
    fs.createReadStream('./data/mlb_teams.csv')
      .pipe(csv())
      .on('data', async (row) => {
        teams.push({ name: row.NAME });
      })
      .on('end', async () => {
        await client.query('BEGIN');

        for (const team of teams) {
          const insertQuery = {
            text: 'INSERT INTO Teams(name) VALUES ($1)',
            values: [team.name],
          };
          await client.query(insertQuery);
        }

        await client.query('COMMIT');
        console.log('Teams loaded successfully.');
      });
  } catch (error) {
    console.error('Error during database operation:', error);
  } finally {
    client.release();
  }
}

module.exports = loadTeams;