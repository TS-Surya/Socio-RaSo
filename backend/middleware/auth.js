const jwt = require("jsonwebtoken");

const AccessToken = process.env.ACCESS_TOKEN;

const auth = (req, res, next) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.cookies.authcookie;

  if (!token)
    return res.json({
      message: "Access token needed",
    });

  try {
    const decode = jwt.verify(token, AccessToken);

    req.user = decode;
  } catch (e) {
    return res.json({
      message: "Invalid token",
    });
  }

  return next();
};

module.exports = auth;
