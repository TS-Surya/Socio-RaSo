const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Db connected successfully");
  })
  .catch((e) => console.log(e));

module.exports = mongoose.connection;
