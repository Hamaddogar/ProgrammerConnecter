const express = require("express");

const userAuthController = require("../../controllers/usersAuth");

const router = express.Router();

router.post("/register", userAuthController.userRegister);
router.post("/login", userAuthController.userLogin);

module.exports = router;
