const router = require('express').Router()
const categoryController = require('../controllers/categoryController')
const {authentication} = require('../middlewares/authentication')
const {adminAuthorization} = require('../middlewares/authorization')

router.use(authentication)
router.use(adminAuthorization)
router.get('/', categoryController.getAllCategory)
router.post('/', categoryController.createCategory)
router.put('/:id', categoryController.editCategory)
router.delete('/:id', categoryController.deleteCategory)

module.exports = router
