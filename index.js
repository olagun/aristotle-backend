require("dotenv").config();

const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const jwt = require("jsonwebtoken");

// // Connect to database.
// mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true });
// const db = mongoose.connection;

// db.on("error", () => {
//   console.error("Couldn't connect to mongo");
// });

const app = express();

app.use(express.json());
app.use(cors());

app.post("/login", (req, res) => {
  const { username } = req.body;
  const user = { username };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken });
});

app.post("/", authenticateToken, (req, res) => {
  res.json({ nice: true });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == undefined) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(8080);
