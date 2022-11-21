require("dotenv").config();

const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// // Connect to database.
// mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true });
// const db = mongoose.connection;

// db.on("error", () => {
//   console.error("Couldn't connect to mongo");
// });

const app = express();

app.use(express.json());
app.use(cors());

// PUT THIS IN DATABASE
let refreshTokens = [];

app.post("/token", (req, res) => {
  const refreshToken = req.body.token;

  if (refreshToken == null) {
    res.sendStatus(401);
  }

  if (!refreshTokens.includes(refreshToken)) {
    return res.sendStatus(403);
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ username: user.username });
    res.json({ accessToken });
  });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
  } catch {
    res.sendStatus(500);
  }
  const user = { username };

  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);

  refreshTokens.push(refreshToken);

  res.json({ accessToken, refreshToken });
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
}

app.listen(8081);
