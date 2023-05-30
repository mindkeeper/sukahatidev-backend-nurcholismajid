const { Op } = require("sequelize");
const { sequelize, Transaction, Substation, Product } = require("../../models");

const getTransactionHandler = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const transactionId = req.params.id;
    const transaction = await Transaction.findByPk(transactionId, {
      attributes: ["id", "status"],
      include: [
        {
          model: Substation,
          attributes: ["name"],
        },
        {
          model: Product,
          attributes: ["product_name", "classification", "price"],
        },
      ],
      transaction: t,
    });
    const modifiedResponse = {
      id: transaction.id,
      brandName: transaction.Substation.name,
      status: transaction.status,
      orderDate: transaction.createdAt,
      product: transaction.Products.map((product) => {
        const {
          product_name,
          classification,
          price,
          TransactionItem: { quantity, subtotal },
        } = product;
        return {
          product_name,
          classification,
          price,
          quantity,
          subtotal,
        };
      }),
    };
    await t.commit();
    return res.sendSuccess(200, modifiedResponse);
  } catch (error) {
    console.log(error);
    await t.rollback();
    return res.sendServerError();
  }
};

module.exports = getTransactionHandler;
