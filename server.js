const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

const mountRoutes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json({ limit: "30mb" }));
dotenv.config({ path: ".env" });
app.use(express.json());
require("./db/conn");

mountRoutes(app)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is Running at port ${PORT}`);
});
