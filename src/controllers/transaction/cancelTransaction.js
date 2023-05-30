const { ValidationError } = require("sequelize");
const { sequelize, Transaction, Brand, Substation } = require("../../models");

const cancelTransactionHandler = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const transactionId = req.params.id;
    const {
      userPayload: { brandId },
    } = req;

    //mengakses transaksi yang pernah dilakukan user yang masih pending
    const brand = await Brand.findOne({
      where: { id: brandId },
      include: [
        {
          model: Substation,
          include: [
            {
              model: Transaction,
              where: { id: transactionId, status: "Pending" },
            },
          ],
        },
      ],
      transaction: t,
    });

    // pengecekan dilakukan di substation, jika tidak ditemukan substation yang melakukan transaksi dengan kondisi sebelumnya
    // maka dapat dipastikan bahwa user/substation tidak pernah memiliki transaksi dengan id paramter
    if (brand.Substations.length === 0)
      return res.sendClientError(404, "Transaction not found");

    await Transaction.update(
      { status: "Cancelled" },
      {
        where: {
          id: transactionId,
        },
        transaction: t,
      }
    );
    const transaction = await Transaction.findByPk(transactionId, {
      attributes: ["id", "status", "updated_at"],
      transaction: t,
    });
    await t.commit();
    return res.sendSuccess(200, transaction);
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

module.exports = cancelTransactionHandler;
