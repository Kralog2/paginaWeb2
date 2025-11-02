const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

async function createConnection() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });
  return connection;
}

let db = null;
createConnection()
  .then(connection => {
    db = connection;
    console.log('Database connected successfully');
  })
  .catch(err => {
    console.error('Error connecting to database:', err);
  });

module.exports = db;