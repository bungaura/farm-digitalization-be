// const sequelize = require("../database/database.js");
// const User = require("../models/Entity/User.model");
// const Farm = require("../models/Entity/Farm.model");
// const UserFarm = require("../models/Entity/UserFarm.model");
// const Livestock = require("../models/Entity/Livestock.model");
// const Breed = require("../models/Entity/Breed.model");
// const Medication = require("../models/Entity/Medication.model");
// const Disease = require("../models/Entity/Disease.model");
// const Logs = require("../models/Entity/Logs.model");
// const MilkProduction = require("../models/Entity/MilkProduction.model");
// const LivestockMedication = require("../models/Entity/LivestockMedication.model");
// const LivestockDisease = require("../models/Entity/LivestockDisease.model");
// const PhasesConfiguration = require("../models/Entity/PhasesConfiguration.model");
// const Lactation = require("../models/Entity/Lactation.model");

const sequelize = require("./database/database");
const User = require("./models/Entity/User.model");

sequelize
  .sync({ alter: true }) // Updates database schema without data loss
  .then(() => console.log("All models synchronized successfully"))
  .catch((err) => console.error("Error syncing models:", err));
