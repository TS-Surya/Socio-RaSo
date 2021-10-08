const UserModel = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Register = async (req, res) => {
  const { email, password, username } = req.body;

  const user = await UserModel.findOne({ email: email });

  if (user) return res.json({ message: "Email already taken" });

  let passwordHash = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(password, passwordHash);

  const newUser = new UserModel({
    username: username,
    email: email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json({ message: "User Created" });
  } catch (e) {
    console.log(e);
  }
};

// login

const GetRefreshToken = async (req, res) => {
  if (req.cookies.authcookie) {
    const decode = jwt.verify(req.cookies.authcookie, process.env.ACCESS_TOKEN);
    const AccessToken = process.env.ACCESS_TOKEN;

    const user = await UserModel.findOne({ email: decode.email });
    const email = user.email;
    const token = jwt.sign(
      {
        username: user.username,
        email,
      },
      AccessToken,
      {
        expiresIn: "15m",
      }
    );

    res.cookie("authcookie", token, {
      maxage: 800000,
      httpOnly: true,
      secure: true,
    });

    return res.json({
      ok: true,
      token: token,
      user: user,
    });
  }

  return res.json({
    ok: false,
    message: "Session Expired",
  });
};

const Login = async (req, res) => {
  const { email, password } = req.body;

  const AccessToken = process.env.ACCESS_TOKEN;

  const user = await UserModel.findOne({ email: email });

  if (!user) return res.json({ message: "User Not Found" });

  const allow = await bcrypt.compare(password, user.password);

  if (!allow) return res.json({ message: "invalid credentials" });

  if (allow) {
    const token = jwt.sign(
      {
        username: user.username,
        email,
      },
      AccessToken,
      {
        expiresIn: "15m",
      }
    );

    user.token = token;

    try {
      await user.save();

      res.cookie("authcookie", token, {
        maxage: 800000,
        httpOnly: true,
        secure: true,
      });

      res.json({ token: token, user: user });
    } catch (e) {
      console.log(e);
    }
  }
};

// logut

const Logout = (req, res) => {
  if (req.cookies.authcookie) {
    res.clearCookie("authcookie");
  }

  res.json({
    message: "Cookie deleted",
  });
};

const Routes = {
  Register,
  Login,
  Logout,
  GetRefreshToken,
};

module.exports = Routes;
