/**
 * Created by Mb
 */

const express = require("express");
const router = express.Router();
const { forgotJwtAuth } = require("../../helpers/jwt.helper");
const controller = require("../../controllers").user;

router.get("/as", controller.AS);
//@route    POST auth/login
//@desc     login user
//@access   Public
router.post("/login", controller.login);
//@route    POST auth/signup
//@desc     Sign up user (create user account)
//@access   Public
router.post("/signup", controller.signup);

//@route    POST auth/forgotemail
//@desc     sent email to user for fotgot password
//@access   Public
router.post("/forgotemail", controller.sentForgotPinCodeViaEmail);

//@route    POST auth/verifyforgotpin
//@desc     verify pin code in db
//@access   private
router.post("/verifyforgotpin", forgotJwtAuth, controller.verifyForgotPinCode);

//@route    POST auth/resetpassword
//@desc     reset password
//@access   private
router.post("/resetpassword", forgotJwtAuth, controller.resetPassword);

module.exports = router;
