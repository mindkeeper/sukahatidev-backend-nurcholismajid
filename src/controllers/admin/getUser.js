const { Op } = require("sequelize");
const {
  sequelize,
  TransactionItem,
  Transaction,
  Brand,
  Substation,
  Product,
} = require("../../models");

const getUserHandler = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const brandId = req.params.id;
    const brand = await Brand.findByPk(brandId, {
      include: [{ model: Substation }],
      transaction: t,
    });
    const transactions = await TransactionItem.findAll({
      include: [
        {
          model: Transaction,
          where: {
            substation_id: {
              [Op.in]: brand.Substations.map((substation) => substation.id),
            },
          },
        },
        {
          model: Product,
        },
      ],
    });
    const productQuantities = transactions.reduce((result, transaction) => {
      const { Product, quantity } = transaction;

      if (!result[Product.id]) {
        result[Product.id] = {
          product: Product,
          totalQuantity: 0,
          transactionCount: 0,
        };
      }

      result[Product.id].totalQuantity += quantity;
      result[Product.id].transactionCount += 1;

      return result;
    }, {});
    const averageQuantities = Object.values(productQuantities).map(
      ({ product, totalQuantity, transactionCount }) => ({
        product,
        averageQuantity: totalQuantity / transactionCount,
      })
    );
    await t.commit();
    return res.sendSuccess(200, averageQuantities);
  } catch (error) {
    console.log(error);
    await t.rollback();
    return res.sendServerError();
  }
};

module.exports = getUserHandler;
