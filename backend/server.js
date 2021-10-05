const express = require("express");
const app = express();

// * external modules
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
require("dotenv").config();

// * Databases
const db = require("./models/model.config");

// * Routes
const AuthRouter = require("./routes/Auth/Auth.route");

app.use(cors());
app.use(morgan("tiny"));
app.use(helmet());
app.use(express.json());

app.use("/api/auth", AuthRouter);

module.exports = app;
