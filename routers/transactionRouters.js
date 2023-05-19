const router = require('express').Router()
const transactionHistoryController = require('../controllers/transactionHistoryController')
const {authentication} = require('../middlewares/authentication')
const { adminAuthorization, transactionAuthorization } = require('../middlewares/authorization')

router.use(authentication)
router.use('/all',adminAuthorization)
router.get('/all', transactionHistoryController.getAllTransaction)
router.get('/', transactionHistoryController.getTransactionByUser)
router.post('/', transactionHistoryController.createTransaction)
router.use('/:id', transactionAuthorization)
router.get('/:id', transactionHistoryController.getTransactionById)

module.exports = router