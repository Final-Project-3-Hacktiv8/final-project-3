
const {User, Product, TransactionHistory} = require('../models')
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
  }


module.exports = {
    userAuthorization,
    adminAuthorization,
    productAuthorization
}
