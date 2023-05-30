const { ValidationError, Op } = require("sequelize");
const { sequelize, User, Token } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginHandler = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { email, username, password } = req.body;
    if (!email && !password)
      return res.sendClientError(400, "email/username is required");

    //searching user by email/username
    const user = await User.findOne({
      where: { [Op.or]: [email ? { email } : { username }] },
      transaction: t,
    });
    //checking if user exist
    if (!user)
      return res.sendClientError(401, "email/username/password is wrong");

    // comparing password
    const checkPassword = await bcrypt.compare(password, user.password);
    // checking if password is correct
    if (!checkPassword)
      return res.sendClientError(401, "email/username/password is wrong");

    const existingToken = await user.getToken({ transaction: t });
    if (existingToken) {
      console.log("destroying token");
      await Token.destroy({
        where: { token: existingToken.token },
        transaction: t,
      });
    }
    const payload = {
      userId: user.id,
      username: user.username,
      brandId: user.brand_id,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      issuer: process.env.ISSUER,
      expiresIn: "1h",
    });
    await user.createToken({ token }, { transaction: t });
    await t.commit();
    return res.sendSuccess(200, token);
  } catch (error) {
    console.log(error);
    if (error instanceof ValidationError) {
      const [errorMessage] = error.errors.map((err) => err.message);
      await t.rollback();
      return res.sendClientError(400, errorMessage);
    }
    await t.rollback();
    return res.sendServerError();
  }
};
module.exports = loginHandler;
