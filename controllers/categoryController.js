const {Product, Category} = require('../models')

class categoryController {
    //get all category
    static async getAllCategory (req, res, next) {
        try {
            const categories = await Category.findAll({include: Product})
            const mapCategories = categories.map(category => {
                return {
                    id: category.id,
                    type: category.type,
                    sold_product_amount: category.sold_product_amount,
                    createdAt: category.createdAt,
                    updatedAt: category.updatedAt,
                    Products: {
                        id: category.Products.id,
                        title: category.Products.title,
                        //rubah jadi format Rp
                        price: category.Products.price
                                ? `Rp. ${category.Products.price.toLocaleString()}`
                                : null,
                        stock: category.Products.stock,
                        CategoryId: category.Products.CategoryId,
                        createdAt: category.Products.createdAt,
                        updatedAt: category.Products.updatedAt
                    }
                }
                res.status(200).json({
                    Categories: mapCategories
                })
            })
            res.status(200).json(categories)
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
            next(error)
        }
    }

    //create category
    static async createCategory (req, res, next) {
        try {
            const {type} = req.body
            const newCategory = await Category.create({type})
            res.status(201).json(newCategory)
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
            next(error)
        }
    }
    //edit category
    static async editCategory (req, res, next) {
        try {
            const id = req.params.id
            const {type} = req.body
            const editCategory = await Category.update({type}, {where: {id}, returning: true})
            const mapEditCategory = editCategory[1].map(category => {
                return {
                    id: category.id,
                    type: category.type,
                    sold_product_amount: category.sold_product_amount,
                    createdAt: category.createdAt,
                    updatedAt: category.updatedAt
                }
            })
            
            res.status(200).json({Categories : mapEditCategory})
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
            next(error)
        }
    }

    //delete category
    static async deleteCategory (req, res, next) {
        try {
            const id = req.params.id
            const deleteCategory = await Category.destroy({where: {id}})
            res.status(200).json({message: 'category has been successfully deleted'})
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
            next(error)
        }
    }
}

module.exports = categoryController 