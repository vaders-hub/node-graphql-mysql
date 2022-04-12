require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const queryResult = (query) => {
  const result = new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if (error) {
        reject(error);
      }

      const rows = result;
      resolve(rows);
    });
  });

  return result;
};

app.get("/read", async (req, res) => {
  const queryString = `SELECT * FROM mybbs`;
  console.log("read bbs");
  try {
    const result = await queryResult(queryString);
    res.json({ data: result });
  } catch (e) {
    console.log("error", e);
  }
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Node server is running on port ${PORT}.`);
});
