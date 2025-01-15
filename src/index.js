const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const { getHomePage } = require("./middlewares/LandingPage.js");
const userRoutes = require("./routers/Users.router.js");
const livestockRoutes = require("./routers/Livestock.router.js");
const milkProductionRoutes = require("./routers/MilkProduction.router.js");
const phasesConfigurationRoutes = require("./routers/PhasesConfiguration.router.js");
const settingsRoutes = require("./routers/Settings.router.js");
// const lactationRoutes = require("./routers/Lactation.router.js");
const farmStatisticRoutes = require("./routers/FarmStatistic.router.js");

app.use(bodyParser.json());

app.get("/", getHomePage);
app.use("/user", userRoutes);
app.use("/livestock", livestockRoutes);
app.use("/milkProduction", milkProductionRoutes);
app.use("/phasesConfiguration", phasesConfigurationRoutes);
app.use("/settings", settingsRoutes);

// app.use("/lactation", lactationRoutes);
app.use("/farm", farmStatisticRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:3000/`));
