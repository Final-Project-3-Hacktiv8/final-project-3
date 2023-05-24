const {User, Product, TransactionHistory, Category} = require('../models')

class transactionHistoryController {
    //create transaction history
    static async createTransaction(req, res, next) {
        try {
            const UserId = res.locals.user.id
            const { ProductId, quantity } = req.body;
            const product = await Product.findByPk(ProductId)
            if (!product) {
                throw { name: 'ProductNotFound' }
            }
            if (quantity > product.stock) {
                throw { name: 'QuantityExceeded' }
            }
            if (quantity < 1) {
                throw { name: 'QuantityLessThanOne' }
            }
            const user = await User.findByPk(UserId)
            if (user.balance < product.price * quantity) {
                throw { name: 'BalanceNotEnough' }
            }
            //cari category product
            const category = await Category.findByPk(product.CategoryId)
            const stock = product.stock - quantity
            const balance = user.balance - product.price * quantity
            const transaction = await TransactionHistory.create({
                UserId,
                ProductId,
                quantity,
                total_price: product.price * quantity
            })
            await Product.update({stock,},
                 {where: {id: ProductId}})
            await User.update({ balance },
                 {where: {id: UserId}})
            const sold_product_amount = parseInt(category.sold_product_amount) + parseInt(quantity)
            await Category.update({ sold_product_amount },
                { where: {id: category.id}})

           const response = {
                total_price: `Rp ${transaction.total_price.toLocaleString()}`,
                quantity: transaction.quantity,
                product_name: product.title,
           }
           res.status(201).json({
            message : 'You have successfully purchase the product',
            transactionBill : response
           })

        }catch(error){
            res.status(500).json(error);
        }
    }

    //get transaction by user login
    static async getTransactionByUser(req, res, next) {
        try {
            const UserId = res.locals.user.id
            const transaction = await TransactionHistory.findAll({
                where: {
                    UserId
                },
                include: [User, Product]
            })
            const mapTransaction = transaction.map(el => { 
                return {
                    ProductId : el.ProductId,
                    UserId : el.UserId,
                    quantity : el.quantity,
                    total_price : `Rp ${el.total_price.toLocaleString()}`,
                    createdAt : el.createdAt,
                    updatedAt : el.updatedAt,
                    Product : {
                        id : el.Product.id,
                        title : el.Product.title,
                        // porice to rupiah
                        price : `Rp ${el.Product.price.toLocaleString()}`,
                        stock : el.Product.stock,
                        CategoryId : el.Product.CategoryId,
                    }
                }
            })
            res.status(200).json({
                TransactionHistories : mapTransaction
            })
        } catch (error) {
            next(error)
        }
    }

    //get all transaction
    static async getAllTransaction(req, res, next) {
        try {
            const transaction = await TransactionHistory.findAll({
                include: [User, Product]
            })
            const response = transaction.map(el => {
                return {
                    ProductId : el.ProductId,
                    UserId : el.UserId,
                    quantity : el.quantity,
                    total_price : `Rp ${el.total_price.toLocaleString()}`,
                    createdAt : el.createdAt,
                    updatedAt : el.updatedAt,
                    Product : {
                        id : el.Product.id,
                        title : el.Product.title,
                        // porice to rupiah
                        price : `Rp ${el.Product.price.toLocaleString()}`,
                        stock : el.Product.stock,
                        CategoryId : el.Product.CategoryId,
                    },
                    User : {
                        id : el.User.id,
                        email : el.User.email,
                        balance : `Rp ${el.User.balance.toLocaleString()}`,
                        gender : el.User.gender,
                        role : el.User.role
                    }
                }
            })
            res.status(200).json({
                TransactionHistories : response
            })
        } catch (error) {
            next(error)
        }
    }

    //get transaction by id
    static async getTransactionById(req, res, next) {
        try {
            const id = req.params.id
            const transaction = await TransactionHistory.findByPk(id, {
                include: [User, Product]
            })
            const response = {
                ProductId : transaction.ProductId,
                UserId : transaction.UserId,
                quantity : transaction.quantity,
                total_price : `Rp ${transaction.total_price.toLocaleString()}`,
                createdAt : transaction.createdAt,
                updatedAt : transaction.updatedAt,
                Product : {
                    id : transaction.Product.id,
                    title : transaction.Product.title,
                    price : `Rp ${transaction.Product.price.toLocaleString()}`,
                    stock : transaction.Product.stock,
                    CategoryId : transaction.Product.CategoryId,
                }
            }
            res.status(200).json({
                TransactionHistories : response
            })
        } catch (error) {
            
        }
    }
}

module.exports = transactionHistoryController