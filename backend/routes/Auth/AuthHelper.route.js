const bcrypt = require("bcryptjs");
const { json } = require("express");
const { body, validationResult } = require("express-validator");

const UserModel = require("../../models/User.model");

const RegisterValidation = {
  email: body("email").isEmail(),
  password: body("password").isLength({ min: 8 }),
};

const Register = async (req, res) => {
  const { username, email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(200).json({ errors: errors.array(), ok: false });
  }

  const user = await UserModel.findOne({
    email: email,
  });

  if (user) {
    if (user.username == username) {
      return res.status(200).json({
        message: "Username already taken..",
        ok: false,
      });
    }
    return res.status(200).json({
      message: "Email already taken..",
      ok: false,
    });
  }

  try {
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);
    let newUser = new UserModel({
      username: username,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.json({
      message: "User Created",
      ok: true,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Something Went Wrong.....",
      ok: false,
    });
  }
};

// Sign up

const Login = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({
    email: email,
  });

  if (user) {
    let correctPassword = await bcrypt.compare(password, user.password);

    if (email != user.email || !correctPassword) {
      return res.status(200).json({
        message: "Email or password is wrong!",
        ok: false,
      });
    }

    return res.status(200).json({
      message: "Logged in..",
      ok: true,
      User: user,
    });
  }

  return res.status(200).json({
    message: "User Not Found",
    ok: false,
  });
};

const routes = {
  Register,
  RegisterValidation,
  Login,
};

module.exports = routes;
