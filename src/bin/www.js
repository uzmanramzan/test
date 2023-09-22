var express = require("express");
var app = express(); // Init Express APP
var server = require("http").Server(app);
const cors = require("cors"),
  config = require("dotenv").config(),
  path = require("path"),
  bodyParser = require("body-parser");
require("../config/connect-mongoose");
require("../models");

app.use(express.static(path.join(__dirname, "../../public")));
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401);
    res.json({ message: err.name + ": " + err.message });
  }
});
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

var route = require("../routes");
app.use(route);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../public", "index.html"));
});

// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    error: { code: err.code, msg: err.message },
  });
});

server.listen(process.env.PORT_NO, () => {
  console.log(`Server Running ON Port ${process.env.PORT_NO}`);
});
