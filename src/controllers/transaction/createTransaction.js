const { ValidationError } = require("sequelize");
const {
  sequelize,
  Product,
  Transaction,
  TransactionItem,
  Substation,
} = require("../../models");

const createTransactionHandler = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { orders, substationId } = req.body;
    // mengambil product id dari request
    const productIds = orders.map((order) => order.productId);

    //mencari produk terkait untuk mengambil harga dan multiplier
    const products = await Product.findAll({
      where: { id: productIds },
      transaction: t,
    });

    // membuat data transaksi
    const transaction = await Transaction.create(
      {
        substation_id: substationId,
      },
      { transaction: t }
    );

    //mengubah response produk untuk menambahkan subtotal dan quantity untuk dimasukkan ke transaction item
    const productItems = products.map((product) => {
      const order = orders.find((order) => order.productId === product.id);
      const subtotal =
        order.quantity *
        parseFloat(product.multiplier) *
        parseInt(product.price);
      return {
        product_id: product.id,
        quantity: order.quantity,
        subtotal,
        transaction_id: transaction.id,
      };
    });

    //  membuat data transaction item secara bersamaan
    await TransactionItem.bulkCreate(productItems, {
      transaction: t,
    });

    // mengambil data transaksi
    const response = await Transaction.findByPk(transaction.id, {
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

    // menyesuaikan response endpoint
    const modifiedResponse = {
      id: response.id,
      brandName: response.Substation.name,
      status: response.status,
      orderDate: response.createdAt,
      product: response.Products.map((product) => {
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
    return res.sendSuccess(201, modifiedResponse);
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

module.exports = createTransactionHandler;
