
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

module.exports = {
    userAuthorization,
}