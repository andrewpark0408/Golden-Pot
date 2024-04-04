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

async function loadUsers() {
  return new Promise((resolve, reject) => {
      const users = [];

      fs.createReadStream('./data/users.csv')
          .pipe(csv())
          .on('data', (row) => {
              users.push({
                  username: row.USERNAME,
                  email: row.EMAIL,
                  password: row.PASSWORD
              });
          })
          .on('end', async () => {
              try {
                  for (const user of users) {
                      // Check if the user already exists in the database
                      const existingUser = await pool.query('SELECT id FROM Users WHERE username = $1', [user.username]);
                      if (existingUser.rows.length === 0) {
                          // Insert the user if it doesn't exist
                          await pool.query(
                              'INSERT INTO Users(username, email, password) VALUES ($1, $2, $3)',
                              [user.username, user.email, user.password]
                          );
                      }
                  }
                  resolve();
              } catch (error) {
                  reject(error);
              }
          });
  });
}

module.exports = loadUsers;
