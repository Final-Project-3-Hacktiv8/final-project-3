const {Product, Category} = require('../models')

class productController {
    //create product
    static async createProduct (req, res, next) {
        try {
            const {title, price, stock, CategoryId} = req.body
            const category = await Category.findByPk(CategoryId);
            if (!category) {
                return res.status(400).json({ message:  `Category with id ${CategoryId} not found` });
            }
            const newProduct = await Product.create({title, price, stock, CategoryId})
            
            const response = {
                id: newProduct.id,
                title: newProduct.title,
                price: newProduct.price
                        ? `Rp. ${newProduct.price.toLocaleString()}`
                        : null,
                stock: newProduct.stock,
                CategoryId: newProduct.CategoryId,
                createdAt: newProduct.createdAt,
                updatedAt: newProduct.updatedAt
            }
            res.status(201).json({Product : response})
        } catch (error) {
            res.status(500).json(error)
            next(error)
        }
    }
    //get all  product
    static async getAllProduct (req, res, next) {
        try {
            const products = await Product.findAll({include: Category})
            const mapProducts = products.map(product => {
                return {
                    id: product.id,
                    title: product.title,
                    price: product.price
                            ? `Rp. ${product.price.toLocaleString()}`
                            : null,
                    stock: product.stock,
                    CategoryId: product.CategoryId,
                    createdAt: product.createdAt,
                    updatedAt: product.updatedAt,
                    Category: {
                        id: product.Category.id,
                        type: product.Category.type,
                        sold_product_amount: product.Category.sold_product_amount,
                        createdAt: product.Category.createdAt,
                        updatedAt: product.Category.updatedAt
                    }
                }
            })
            res.status(200).json({
                Products: mapProducts
            })
        } catch (error) {
            res.status(500).json(error)
            next(error)
        }
    }

    //edit product
    static async editProduct (req, res, next) {
        try {
            const id = req.params.id
            const {title, price, stock} = req.body
            const editProduct = await Product.update({title, price, stock}, {where: {id}, returning: true})
            const mapEditProduct = editProduct[1].map(product => {
                return {
                    id: product.id,
                    title: product.title,
                    price: product.price
                            ? `Rp. ${product.price.toLocaleString()}`
                            : null,
                    stock: product.stock,
                    CategoryId: product.CategoryId,
                    createdAt: product.createdAt,
                    updatedAt: product.updatedAt
                }
            })
            res.status(200).json({Product : mapEditProduct[0]})
        } catch (error) {
            res.status(500).json(error)
            next(error)
        }
    }

    //delete product
    static async deleteProduct (req, res, next) {
        try {
            const id = req.params.id
            const deleteProduct = await Product.destroy({where: {id}})
            res.status(200).json({message: 'Product has been successfully deleted'})
        } catch (error) {
            res.status(500).json(error)
            next(error)
        }
    }

    //patch CategoryId
    static async patchCategoryId (req, res, next) {
        try {
            const id = req.params.id
            const {CategoryId} = req.body
            const editCategoryId = await Product.update({CategoryId}, {where: {id}, returning: true})
            const  response = {
                id: editCategoryId[1][0].id,
                title: editCategoryId[1][0].title,
                price: editCategoryId[1][0].price
                        ? `Rp. ${editCategoryId[1][0].price.toLocaleString()}`
                        : null,
                stock: editCategoryId[1][0].stock,
                CategoryId: editCategoryId[1][0].CategoryId,
                createdAt: editCategoryId[1][0].createdAt,
                updatedAt: editCategoryId[1][0].updatedAt
            }

            res.status(200).json({product : response})
        } catch (error) {
            res.status(500).json(error)
            next(error)
        }
    }
}


module.exports = productController