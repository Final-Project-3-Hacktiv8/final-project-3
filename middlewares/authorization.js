
const {User, Product, TransactionHistory, Category} = require('../models')
const {verifyToken} = require('../helpers/jwt')

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
            //jika Category Product tidak ada saat dibuat
            if (!product.CategoryId) {
                return res.status(400).json({
                    message: 'Category Product not found',
                    devMessge: `Category Product with id ${product.CategoryId} not found`
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

    //category authorization
    function categoryAuthorization (req, res, next) {
        const id = req.params.id
        Category.findOne({
            where : {
                id : id
            }
        })
            .then(category => {
                if (!category) {
                    return res.status(404).json({
                        message: 'Category not found',
                        devMessge: `Category with id ${id} not found`
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

    //admin authorization
    async function adminAuthorization(req, res, next) {
        try {
          // const token = req.headers.access_token
          const token = req.get("token");
          const Userdecoded = verifyToken(token);
          User.findOne({
            where: {
              id: Userdecoded.id,
              email: Userdecoded.email,
              role: "admin",
            },
          })
            .then((user) => {
              if (!user) {
                return res.status(401).json({
                  message: "User not authenticated",
                  devMessage: `User with id ${Userdecoded.id} not admin`,
                });
              }
              res.locals.user = user;
              return next();
            })
            .catch((err) => {
              return res.status(500).json({
                message: "Internal server error",
                devMessage: err.message,
              });
            });
        } catch (err) {
          console.log(err);
          return res.status(401).json(err);
        }
      }

      

    function transactionAuthorization(req, res, next) {
        const id = req.params.id
        TransactionHistory.findOne({
            where : {
                id : id
            }
        })
            .then(transaction => {
                if (!transaction) {
                    return res.status(404).json({
                        message: 'Transaction not found',
                        devMessge: `Transaction with id ${id} not found`
                    })
                }
                if(transaction.UserId !== res.locals.user.id){ 
                    return res.status(401).json({
                        message: 'User not authorized',
                        devMessge: `User with id ${res.locals.user.id} not authorized to id ${id}`
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
    productAuthorization,
    categoryAuthorization,
    adminAuthorization,
    transactionAuthorization
}

