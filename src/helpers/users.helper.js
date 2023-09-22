/**
 * Created by Mb
 */

//import mongoose and models
const User = require("../models/users.model");
const bcrypt = require("bcryptjs");

//@helper function
//@desc     get user by email or username
module.exports = {
  isUserEmailOrUsernameExists: async (u_email) => {
    var where = u_email.includes("@")
      ? { email: u_email }
      : { username: u_email };
    try {
      const user = await User.findOne(where);
      if (user) {
        return user;
      } else {
        return false;
      }
    } catch (err) {
      return err;
    }
  },
};
//@helper function
//@desc   convert user password to hash
module.exports.getHashValue = async (value) => {
  const salt = await bcrypt.genSalt(10);
  const hashValue = await bcrypt.hash(value, salt);
  return hashValue;
};

//@helper function
//@desc     compare or Match user hash password
module.exports.comparePassword = async (password, userPassword) => {
  const isMatch = await bcrypt.compare(password, userPassword);
  return isMatch;
};

//@helper function
//@desc   get user by id from database
module.exports.getUserById = async (user_id) => {
  try {
    let user = await User.findById(user_id);
    if (user) {
      return user;
    } else {
      return false;
    }
  } catch (err) {
    return err;
  }
};
//@helper function
//@desc     remove/delete user from database by id
module.exports.removeUser = async (user_id) => {
  let user = await User.findById(user_id);
  const result = await user.remove();
  return result;
};
