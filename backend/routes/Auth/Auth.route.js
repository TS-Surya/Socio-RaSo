const express = require("express");
const AuthRouter = express.Router();

const { Register, RegisterValidation, Login } = require("./AuthHelper.route");

AuthRouter.post(
  "/register",
  RegisterValidation.email,
  RegisterValidation.password,
  Register
);

AuthRouter.post("/login", Login);

AuthRouter.post("/signup");

module.exports = AuthRouter;

/*

{
  "username" : "Sorna", 
  "email" : "programmer.sorna@gmail.com",
   "password" : "12345678"
}

*/
