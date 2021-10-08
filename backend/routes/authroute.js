const express = require("express");
const authRouter = express.Router();
const auth = require("../middleware/auth");

const {
  Register,
  Login,
  Logout,
  GetRefreshToken,
} = require("./authcontroller");

authRouter.post("/register", Register);
authRouter.post("/login", Login);
authRouter.get("/logout", Logout);
authRouter.get("/refresh", GetRefreshToken);

authRouter.get("/welcome", auth, (req, res) => {
  res.json({
    message: "done",
    user: req.user,
  });
});

module.exports = authRouter;
