const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
  process.env.AWS_CLOUD_DATABASE,
  process.env.AWS_CLOUD_USER,
  process.env.AWS_CLOUD_PASSWORD,
  {
    host: process.env.AWS_CLOUD_HOST,
    port: process.env.AWS_CLOUD_PORT,
    dialect: "mysql",
    define: {
      timestamps: false, // Disable timestamps globally
    },
    dialectOptions: {
      ssl: {
        require: true,
        ca: require("fs").readFileSync("./src/database/rds-ca-cert.pem"),
      },
    },
    logging: console.log,
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Connected to AWS RDS successfully"))
  .catch((err) => console.error("Unable to connect to AWS RDS:", err));

// nyoba query
sequelize.query("SHOW TABLES").then(([results, metadata]) => {
  console.log("Tables in the database:", results);
});
sequelize
  .query("SELECT * FROM Livestock")
  .then(([results, metadata]) => {
    console.log("Livestock:", results);
  })
  .catch((error) => console.error("Error fetching users:", error));

module.exports = sequelize;
