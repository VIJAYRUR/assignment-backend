// index.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use((req, res, next) => {
  const allowedOrigins = ["http://localhost:3000"];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  ); // Add 'Authorization'
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Add any other HTTP methods you need

  next();
});

app.use(cors());

// Updated API endpoint to accept pagination parameters
app.get("/api/characters", async (req, res) => {
  try {
    const { page } = req.query;
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/?page=${page}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/api/characters/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/${id}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.get("/api/characters/search", async (req, res) => {
  try {
    const { name } = req.query;
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/?name=${name}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
