const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/authpractice")
  .then(() => console.log("Conenction established...."))
  .catch((e) => console.log(e));

module.exports = mongoose.connection;
