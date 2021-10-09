const express = require("express");
require("dotenv").config();

const authRouter = require("./routes/authroute");
const postRouter = require("./routes/blog/blogroute");

const connection = require("./model/config");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(cookieParser());
authRouter.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.use("/auth", authRouter);
app.use("/blog", postRouter);

app.listen(4000, () => console.log("Server started successfully"));
