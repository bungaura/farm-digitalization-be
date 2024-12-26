const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
  process.env.LOCAL_DB_NAME, // Database name
  process.env.LOCAL_DB_USER, // Database username
  process.env.LOCAL_DB_PASS, // Database password
  {
    host: process.env.LOCAL_DB_HOST, // Hostname, e.g., 'localhost'
    dialect: "mysql", // Set to 'mysql' for MySQL databases
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Unable to connect to the database:", err));

module.exports = sequelize;
