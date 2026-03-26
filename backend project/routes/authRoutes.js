const router = require("express").Router();

const {register, login, logout} = require("../controllers/authControllers");
const registerValidator = require("../validators/registerValidation");

router.post("/register", registerValidator, register)
      .post("/login", login)
      .post("/logout", logout);

module.exports = router;