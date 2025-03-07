const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false, // Ignorar certificados no válidos (solo para pruebas)
  },
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  end: () => pool.end()
};