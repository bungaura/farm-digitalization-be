const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const { getHomePage } = require("./middlewares/LandingPage.js");
const userRoutes = require("./routers/Users.router.js");
const livestockRoutes = require("./routers/Livestock.router.js");
const diseaseRoutes = require("./routers/Disease.router.js");
const medicationRoutes = require("./routers/Medication.router.js");

app.use(bodyParser.json());

app.get("/", getHomePage);
app.use("/user", userRoutes);
app.use("/livestock", livestockRoutes);
app.use("/disease", diseaseRoutes);
app.use("/medication", medicationRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:3000/`));
