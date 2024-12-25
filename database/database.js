const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql.createPool({
  host: process.env.LOCAL_DB_HOST,
  user: process.env.LOCAL_DB_USER,
  database: process.env.LOCAL_DB_NAME,
  port: process.env.LOCAL_DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const db = pool.promise();

(async () => {
  try {
    const [rows] = await db.query("SELECT 1");
    console.log(
      "Database connected successfully on http://localhost/phpmyadmin/"
    );
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
  }
})();

module.exports = db;
