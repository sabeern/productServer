const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  if (req.headers["x-custom-header"]) {
    try {
      token = req.headers["x-custom-header"];
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decode.loginedUser.id;
      next();
    } catch (err) {
      return res.status(401).send({ errMsg: "Authentication failed" });
    }
  } else {
    return res.status(401).send({ errMsg: "Authentication failed" });
  }
};

module.exports = { validateToken };
