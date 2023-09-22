/**
 * Created by Mb
 */

const _ = require("lodash");
let success = (response, data, message, token) => {
  let successResponse = {
    status: "Success",
    message: message,
  };
  let status = 200;
  if (data) {
    _.extend(successResponse, {
      data: data,
    });
  }
  if (token) {
    _.extend(successResponse, {
      token: token,
    });
  }

  response.status(status).json(successResponse);
};

let systemfailure = (response, err) => {
  let message = [
    "Error in handling this request. ",
    "Please contact system admin.",
  ].join("");
  let status = 500;

  if (typeof err === "object" && err.status) {
    status = err.status;
  }

  if (typeof err === "object" && err.message) {
    message = err.message;
  }

  response.status(status).json({
    status: "Fail",
    systemfailure: true,
    message: message,
    data: null,
  });
};

let requestfailure = (response, err, jsonerr = null) => {
  let status = 404;

  if (typeof err === "object" && err.message) {
    message = err.message;
  } else {
    message = err;
  }

  response.status(status).json({
    status: "Fail",
    systemfailure: false,
    message: message,
    jsonerr: jsonerr,
  });
};

let badRequest = (response, message) => {
  let status = 400;

  response.status(status).json({
    status: "Fail",
    systemfailure: false,
    message: message,
    data: null,
  });
};

module.exports = {
  success: success,
  badRequest: badRequest,
  systemfailure: systemfailure,
  requestfailure: requestfailure,
};
