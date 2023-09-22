const JWT = require("jsonwebtoken");
const responseHelper = require("./response.helper");

module.exports.signAccessToken = async (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  const token = await JWT.sign(payload, process.env.JWT_SECRETE);
  return token;
};
module.exports.verifyJWTToken = async (authToken) => {
  const token = authToken.split(" ")[1];
  const payload = await JWT.verify(token, process.env.JWT_SECRETE);
  return payload;
};
module.exports.verificationToken = async (req, res, next) => {
  const { token } = req.params;
  if (!token) {
    return responseHelper.requestfailure(res, "Token is required");
  }
  try {
    const user = JWT.verify(token, process.env.JWT_SECRETE);
    req.user = user;
    next();
  } catch (error) {
    return responseHelper.requestfailure(res, error);
  }
};

module.exports.forgotPasswordToken = async (user) => {
  const payload = {
    id: user._id,
  };
  const token = await JWT.sign(payload, process.env.JWT_SECRETE, {
    expiresIn: "40m",
  });
  return token;
};

module.exports.forgotJwtAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return responseHelper.requestfailure(
      res,
      "Authorization token is required"
    );
  }
  try {
    const token = authorization.split(" ")[1];
    const user = JWT.verify(token, process.env.JWT_SECRETE);
    req.forgot_user = user;
    next();
  } catch (error) {
    return responseHelper.requestfailure(res, error);
  }
};
