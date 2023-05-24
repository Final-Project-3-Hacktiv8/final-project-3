const router = require('express').Router()
const productController = require('../controllers/productController')
const {authentication} = require('../middlewares/authentication')
const {productAuthorization, adminAuthorization} = require('../middlewares/authorization')
const { patch } = require('./userRouters')

router.use(authentication)
router.get('/', productController.getAllProduct)
router.use(adminAuthorization)
router.use('/:id', productAuthorization)
router.post('/', productController.createProduct)
router.put('/:id', productController.editProduct)
router.delete('/:id', productController.deleteProduct)
router.patch('/:id', productController.patchCategoryId)

module.exports = router