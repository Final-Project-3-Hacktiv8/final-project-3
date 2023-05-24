const router = require('express').Router()
const categoryController = require('../controllers/categoryController')
const {authentication} = require('../middlewares/authentication')
const {adminAuthorization} = require('../middlewares/authorization')
const {categoryAuthorization} = require('../middlewares/authorization')

router.use(authentication)
router.use(adminAuthorization)
router.use('/:id', categoryAuthorization)
router.get('/', categoryController.getAllCategory)
router.post('/', categoryController.createCategory)
router.patch('/:id', categoryController.editCategory)
router.delete('/:id', categoryController.deleteCategory)

module.exports = router
