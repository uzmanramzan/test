
var User = require("../models/users.model");
const jwtHelper = require("../helpers/jwt.helper");
const { getHashValue } = require("../helpers/users.helper");
const clientHelper = require("../helpers/users.helper");
const responseHelper = require("../helpers/response.helper");


//@route    POST auth/login
//@desc     login user
//@access   Public
//@params   {email}, {password}
var login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email == "" || email == undefined) {
      let err = "email is required";
      return responseHelper.requestfailure(res, err);
    }
    if (password == "" || password == undefined) {
      let err = "Password is required";
      return responseHelper.requestfailure(res, err);
    }
    const exists = await User.findOne({ email: email });
    if (exists) {
      const isMatch = await clientHelper.comparePassword(
        password,
        exists.password
      );
      if (isMatch) {
        const token = await jwtHelper.signAccessToken(exists);
        var message = "Successfully Singed In ";
        delete exists.password;
        var responseData = { token: "Bearer " + token, user: exists };
        return responseHelper.success(res, responseData, message);
      } else {
        let err = "Invalid Password";
        return responseHelper.requestfailure(res, err);
      }
    } else {
      let err = "User doesn't exists";
      return responseHelper.requestfailure(res, err);
    }
  } catch (error) {
    responseHelper.requestfailure(res, error);
  }
};
//@route    POST auth/signup
//@desc     signup user
//@access   Public
//@params   {email, first_name, password}
var signup = async (req, res) => {
  const { first_name, username, phone_number, email, password } = req.body;
  try {
    if (email == "" || email == undefined) {
      let err = "email is required";
      return responseHelper.requestfailure(res, err);
    }
    if (password == "" || password == undefined) {
      let err = "Password is required";
      return responseHelper.requestfailure(res, err);
    }

    if (first_name == "" || first_name == undefined) {
      let err = "First name is required";
      return responseHelper.requestfailure(res, err);
    }

    const checkemail = await User.findOne({ email: email });
    if (checkemail) {
      let err = "Email already exists";
      return responseHelper.requestfailure(res, err);
    }
    let bodyData = req.body;
    const hashpassword = await getHashValue(password);
    bodyData["password"] = hashpassword;
    const newuser = await User.create(bodyData);
    var message = "Account Signup successful";
    const token = await jwtHelper.signAccessToken(newuser);
    var responseData = { token: "Bearer " + token, user: newuser };
    return responseHelper.success(res, responseData, message);
  } catch (error) {
    responseHelper.requestfailure(res, error);
  }
};

//@route    GET users
//@desc     get current login user
//@access   Public
var user = async (req, res) => {
  try {
    const { id } = req.token_decoded;
    const user = await User.findById(id);
    delete user.password;
    if (user) {
      var message = "User Loaded";
      var responseData = { user: user };
      return responseHelper.success(res, responseData, message);
    }
    let err = "Sorry Your Profile Not Exist";
    return responseHelper.requestfailure(res, err);
  } catch (err) {
    return responseHelper.requestfailure(res, err);
  }
};

var updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      req.body.user,
      {
        new: true,
      }
    );
    var message = "User updated successful";
    return responseHelper.success(res, updatedUser, message);
  } catch (error) {
    responseHelper.requestfailure(res, error);
  }
};

var deleteUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndDelete(req.params.user);
    var message = "User deleted successful";
    return responseHelper.success(res, updatedUser, message);
  } catch (error) {
    responseHelper.requestfailure(res, error);
  }
};



module.exports = {
  login,
  signup,
  user,
  updateUser,
  deleteUser
};
