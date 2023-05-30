const jwt = require("jsonwebtoken");
const { Token } = require("../models");
const isLogin = async (req, res, next) => {
  try {
    // checking bearer token
    if (!req.headers.authorization)
      return res.sendClientError(403, "You have to Login First");

    const token = req.headers.authorization
      .split(" ")
      .filter((value) => value !== "Bearer")[0];
    if (!token) return res.sendClientError(403, "You have to Login First");
    //   cheking token in database
    const checkToken = await Token.findOne({ where: { token } });
    if (!checkToken) return res.sendClientError(403, "You have to Login First");
    const { SECRET_KEY, ISSUER } = process.env;

    // verifying token
    jwt.verify(
      token,
      SECRET_KEY,
      {
        issuer: ISSUER,
      },
      (error, payload) => {
        if (error) {
          console.log(error);
          return res.sendClientError(403, "You need to login first");
        }
        const { userId, brandId, username, ...rest } = payload;
        req.userPayload = { userId, brandId, username };
        console.log(req.userPayload);
        next();
      }
    );
  } catch (error) {
    console.log(error);
    return res.sendServerError();
  }
};

module.exports = isLogin;
