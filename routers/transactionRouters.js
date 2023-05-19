const router = require('express').Router()
const transactionHistoryController = require('../controllers/transactionHistoryController')
const {authentication} = require('../middlewares/authentication')
const { adminAuthorization, transactionAuthorization } = require('../middlewares/authorization')

router.use(authentication)
router.get('/', transactionHistoryController.getTransactionByUser)
router.post('/', transactionHistoryController.createTransaction)
router.use('/:id', transactionAuthorization)
router.get('/:id', transactionHistoryController.getTransactionById)
router.use(adminAuthorization)
router.get('/all', transactionHistoryController.getAllTransaction)

module.exports = router