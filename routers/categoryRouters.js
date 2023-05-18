const router = require('express').Router()
const categoryController = require('../controllers/categoryController')
const {authentication, adminAuthentication} = require('../middlewares/authentication')
// const {categoryAuthorization} = require('../middlewares/authorization')

router.use(adminAuthentication)
// router.use(categoryAuthorization)
router.get('/', categoryController.getAllCategory)
router.post('/', categoryController.createCategory)
router.put('/:id', categoryController.editCategory)
router.delete('/:id', categoryController.deleteCategory)

module.exports = router
