const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database/database.js");
const sequelize = require("./database/database");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const { getHomePage } = require("./LandingPage.js");
const userRoutes = require("./routers/Users.router.js");

app.use(bodyParser.json());

app.get("/", getHomePage);
app.use("/user", userRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:3000/`));
