const router = require('express').Router();
const UserController = require('../controllers/userController');
const {authentication} = require('../middlewares/authentication');

router.get('/', UserController.getAllUser);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.use(authentication);
router.put('/', UserController.updateUser);
router.delete('/', UserController.deleteUser);
router.patch('/topup', UserController.topUpBalance);

module.exports = router;