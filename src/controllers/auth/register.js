const { sequelize, Brand, Substation } = require("../../models");
const { ValidationError, DatabaseError } = require("sequelize");
const bcrypt = require("bcrypt");
const checkPasswordPattern = require("../../helpers/checkPasswordPattern");
const registerHandler = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { username, email, phone, password, brandName, substationData } =
      req.body;
    const [validPassword, message] = checkPasswordPattern(password);
    if (!validPassword) return res.sendClientError(400, message);
    const hashedPassword = await bcrypt.hash(password, 10);
    const brand = await Brand.create({ name: brandName }, { transaction: t });
    const user = await brand.createUser(
      { username, phone, password: hashedPassword, email },
      { transaction: t }
    );
    const substationInstances = substationData.map((substation) => ({
      ...substation,
      brand_id: brand.id,
    }));

    await Substation.bulkCreate(substationInstances, {
      transaction: t,
    });
    await t.commit();
    return res.sendSuccess(200, { message: "Register Success" });
  } catch (error) {
    console.log(error);
    // Check if the error is a Sequelize validation error
    if (error instanceof ValidationError) {
      const [errorMessages] = error.errors.map((err) => err.message);
      await t.rollback();
      return res.sendClientError(400, errorMessages);
    }
    await t.rollback();
    return res.sendServerError();
  }
};

module.exports = registerHandler;
