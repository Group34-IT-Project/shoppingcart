// server.js
const express = require('express');
const connectDB = require('./database');

const app = express();

console.log("Server is starting... 🚀");

app.listen(3000, () => {
  console.log("Server running on port 3000");
});