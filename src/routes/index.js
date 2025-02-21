const { AuthController } = require("../controllers");

const router = require("express").Router();

router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);

module.exports = router;
