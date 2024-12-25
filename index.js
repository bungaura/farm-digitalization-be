require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database/database.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => res.send("API is running!"));

app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1"); //simple query to test connection
    res
      .status(200)
      .json({ message: "Database connected successfully!", data: rows });
  } catch (err) {
    console.error("Database connection failed:", err.message);
    res
      .status(500)
      .json({ message: "Database connection failed", error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:3000/`));
