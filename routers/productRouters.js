const router = require('express').Router()
const productController = require('../controllers/productController')
const {authentication, adminAuthentication} = require('../middlewares/authentication')
const {productAuthorization} = require('../middlewares/authorization')

router.use(authentication)
router.post('/', productController.createProduct)
router.use('/:id', productAuthorization)
router.put('/:id', productController.editProduct)
router.delete('/:id', productController.deleteProduct)
router.patch('/:id', productController.patchCategoryId)
router.use(adminAuthentication)
router.get('/', productController.getAllProduct)

module.exports = router