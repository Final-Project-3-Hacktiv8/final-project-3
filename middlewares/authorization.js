
const {User, Product, TransactionHistory} = require('../models')

function userAuthorization (req, res, next) {
    const id = res.locals.user.id
    User.findByPk(id)
        .then(user => {
            if (!user) {
                throw {name: 'NotFound', message: 'User not found'}
            } else {
                if (user.id === req.loggedInUser.id) {
                    next()
                } else {
                    throw {name: 'Unauthorized', message: 'User not authorized'}
                }
            }
        })
        .catch(err => {
            next(err)
        })
}

//product authorization
function productAuthorization (req, res, next) {
    const id = req.params.id
    Product.findOne({
        where : {
            id : id
        }
    })
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: 'Product not found',
                    devMessge: `Product with id ${id} not found`
                })
            }
            return next()
        })
        .catch(err => {
            return res.status(500).json({
                message: 'Internal server error',
                devMessage: err.message
            })
        })
}

module.exports = {
    userAuthorization,
    productAuthorization
}

