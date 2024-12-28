const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const { getHomePage } = require("./LandingPage.js");
const userRoutes = require("./routers/Users.router.js");
const livestockRoutes = require("./routers/Livestock.router.js");

app.use(bodyParser.json());

app.get("/", getHomePage);
app.use("/user", userRoutes);
app.use("/livestock", livestockRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:3000/`));
