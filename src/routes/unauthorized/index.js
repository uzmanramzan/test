/**
 * Created by Mb
 */

const express = require("express");
const router = express.Router();

const usersRoutes = require("./users.route");

//@route     auth
//@desc     inital route
//@access   Public
router.use("/auth", usersRoutes);

module.exports = router;
