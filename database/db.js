const { Pool } = require('pg');

const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'melting_pot',
  password: 'password',
  port: 5432
});

module.exports = pool;
