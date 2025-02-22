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
// sequelize
//   .query("SELECT * FROM Livestock")
//   .then(([results, metadata]) => {
//     console.log("Livestock:", results);
//   })
//   .catch((error) => console.error("Error fetching livestock:", error));

sequelize
  .query("SELECT * FROM Breeds")
  .then(([results, metadata]) => {
    console.log("Breed:", results);
  })
  .catch((error) => console.error("Error fetching breed:", error));

sequelize
  .query("SELECT * FROM Diseases")
  .then(([results, metadata]) => {
    console.log("Diseases:", results);
  })
  .catch((error) => console.error("Error fetching disease:", error));

sequelize
  .query("SELECT * FROM MilkProduction")
  .then(([results, metadata]) => {
    console.log("MilkProduction:", results);
  })
  .catch((error) => console.error("Error fetching disease:", error));

sequelize
  .query("SELECT * FROM LivestockTypes")
  .then(([results, metadata]) => {
    console.log("LivestockType:", results);
  })
  .catch((error) => console.error("Error fetching LivestockType:", error));

sequelize
  .query("SELECT * FROM LivestockCustomIds")
  .then(([results, metadata]) => {
    console.log("LivestockCustomIds:", results);
  })
  .catch((error) => console.error("Error fetching LivestockCustomIds:", error));

sequelize
  .query("SELECT * FROM Farms")
  .then(([results, metadata]) => {
    console.log("Farm:", results);
  })
  .catch((error) => console.error("Error fetching Farm:", error));

sequelize
  .query("SELECT * FROM Lactation")
  .then(([results, metadata]) => {
    console.log("Lactation:", results);
  })
  .catch((error) => console.error("Error fetching Lactation:", error));

// sequelize
//   .query("SELECT * FROM Farm")
//   .then(([results, metadata]) => {
//     console.log("MilkProduction:", results);
//   })
//   .catch((error) => console.error("Error fetching disease:", error));

module.exports = sequelize;
