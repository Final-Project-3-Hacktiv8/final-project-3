const router = require("express").Router();
const {
  createTransaction,
  getTransactionUser,
  getTransactionAdmin,
  getTransactionById,
} = require("../controllers/transactionHistoryController");
const { authentication } = require("../middlewares/authentication");
const {
  adminAuthorization,
  transactionAuthorization,
} = require("../middlewares/authorization");

router.use(authentication);
router.use("/admin", adminAuthorization);
router.get("/admin", getTransactionAdmin);
router.get("/user", getTransactionUser);
router.post("/", createTransaction);
router.use("/:id", transactionAuthorization);
router.get("/:id", getTransactionById);

module.exports = router;
