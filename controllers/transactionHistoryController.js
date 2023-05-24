const { Product, TransactionHistory, User, Category } = require("../models");
const currencyFormatter = require("currency-formatter");

class TransactionHistories {
  static async createTransaction(req, res) {
    try {
      const { productId, quantity } = req.body;
      const UserId = res.locals.user.id;

      // cek apakah produk ada di db
      const checkProduct = await Product.findOne({ where: { id: productId } });
      // jika tidak ada produk
      if (!checkProduct) {
        return res.status(401).json({
          name: "Error",
          devMessage: `Product with id ${productId} does not exist!`,
        });
      }
      // cek apakah quantity melebihi stock
      if (quantity > checkProduct.stock) {
        return res.status(401).json({
          name: "Error",
          devMessage: `Stock is only ${checkProduct.stock} pcs`,
        });
      }
      // Total belanja  user
      const total = checkProduct.price * quantity;

      // cek apakah balance user cukup atau tidak
      const userBalance = res.locals.user.balance;
      if (userBalance < total) {
        return res.status(401).json({
          name: "Error",
          devMessage: `Your balance is not enough for this transaction`,
        });
      }
      // stock di produk dikurangi dengan quantity yg dibeli
      const decreaseQuantity = checkProduct.stock - quantity;
      const updateStock = await Product.update(
        { stock: decreaseQuantity },
        {
          where: {
            id: checkProduct.id,
          },
        }
      );
      // balance dari user dikurangi
      const balanceDecrease = userBalance - total;
      const updateBalance = User.update(
        { balance: balanceDecrease },
        {
          where: {
            id: UserId,
          },
        }
      );
      // update sold_product_amount di tabel category
      const getPreviousSoldAmount = await Category.findOne({
        where: {
          id: checkProduct.CategoryId,
        },
      });
      const increasePreviousSoldAmount =
        getPreviousSoldAmount.sold_product_amount + quantity;
      const updateSoldProduct = await Category.update(
        {
          sold_product_amount: increasePreviousSoldAmount,
        },
        {
          where: {
            id: checkProduct.CategoryId,
          },
        }
      );
      // jika lolos semua validasi, maka data di input ke db
      let data = {
        ProductId: productId,
        UserId: UserId,
        quantity: quantity,
        total_price: total,
      };
      const newTransaction = await TransactionHistory.create(data);
      console.log(newTransaction);
      if (newTransaction) {
        newTransaction.total_price = currencyFormatter.format(
          newTransaction.total_price,
          {
            code: "IDR",
          }
        );
        return res.status(201).json({
          message: "You have succesfully purchase the product",
          transactionBill: {
            total_price: newTransaction.total_price,
            quantity: newTransaction.quantity,
            productName: checkProduct.title,
          },
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(401).json(err);
    }
  }

  static async getTransactionUser(req, res) {
    try {
      const UserId = res.locals.user.id;
      const userName = res.locals.user.full_name;

      const transactionHistories = await TransactionHistory.findAll({
        where: { UserId },
        include: Product,
      });

      const eachTransaction = transactionHistories.map((transaction) => {
        const transactionIDRFormat = currencyFormatter.format(
          transaction.total_price,
          {
            code: "IDR",
          }
        );
        const productIDRFormat = currencyFormatter.format(
          transaction.Product.price,
          {
            code: "IDR",
          }
        );
        return {
          ProductId: transaction.id,
          UserId: transaction.UserId,
          quantity: transaction.quantity,
          total_price: transactionIDRFormat,
          createdAt: transaction.createdAt,
          updatedAt: transaction.updatedAt,
          Product: {
            id: transaction.Product.id,
            title: transaction.Product.title,
            price: productIDRFormat,
            stock: transaction.Product.stock,
            CategoryId: transaction.Product.CategoryId,
          },
        };
      });
      if (transactionHistories) {
        return res.status(200).json({
          transactionHistories: eachTransaction,
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(401).json({
        err,
      });
    }
  }

  static async getTransactionAdmin(req, res) {
    try {
      const userName = res.locals.user.full_name;
      const transactionHistories = await TransactionHistory.findAll({
        include: [User, Product],
      });

      const eachTransaction = transactionHistories.map((transaction) => {
        const transactionIDRFormat = currencyFormatter.format(
          transaction.total_price,
          {
            code: "IDR",
          }
        );
        const productIDRFormat = currencyFormatter.format(
          transaction.Product.price,
          {
            code: "IDR",
          }
        );
        return {
          ProductId: transaction.ProductId,
          UserId: transaction.UserId,
          quantity: transaction.quantity,
          total_price: transactionIDRFormat,
          createdAt: transaction.createdAt,
          updatedAt: transaction.updatedAt,
          Product: {
            id: transaction.Product.id,
            title: transaction.Product.title,
            price: productIDRFormat,
            stock: transaction.Product.stock,
            CategoryId: transaction.Product.CategoryId,
          },
          User: {
            id: transaction.User.id,
            email: transaction.User.email,
            balance: transaction.User.balance,
            gender: transaction.User.gender,
            role: transaction.User.role,
          },
        };
      });

      if (transactionHistories) {
        return res.status(201).json({
          transactionHistories: eachTransaction,
        });
      } else {
        return res.status(401).json({
          message: `User with name ${userName} does not have transaction histories yet`,
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(401).json(err);
    }
  }

  static async getTransactionById(req, res) {
    try {
      const transactionId = req.params.id;
      const transaction = await TransactionHistory.findOne({
        where: { id: transactionId },
        include: Product,
      });

      if (transaction) {
        const transactionIDRFormat = currencyFormatter.format(
          transaction.total_price,
          {
            code: "IDR",
          }
        );
        const productIDRFormat = currencyFormatter.format(
          transaction.Product.price,
          {
            code: "IDR",
          }
        );
        return res.status(200).json({
          ProductId: transaction.ProductId,
          UserId: transaction.UserId,
          quantity: transaction.quantity,
          total_price: transactionIDRFormat,
          createdAt: transaction.createdAt,
          updatedAt: transaction.updatedAt,
          Product: {
            id: transaction.Product.id,
            title: transaction.Product.title,
            price: productIDRFormat,
            stock: transaction.Product.stock,
            CategoryId: transaction.Product.CategoryId,
          },
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(401).json(err);
    }
  }
}

module.exports = TransactionHistories;
