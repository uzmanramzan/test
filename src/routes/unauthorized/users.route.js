
const express = require("express");
const router = express.Router();
const controller = require("../../controllers").user;

//@route    POST auth/login
//@desc     login user
//@access   Public
router.post("/login", controller.login);
//@route    POST auth/signup
//@desc     Sign up user (create user account)
//@access   Public
router.post("/signup", controller.signup);


module.exports = router;
