const express = require("express");
const bodyParser = require("body-parser");
const apartmentsRouter = require("./services/apartments");
const authRouter = require("./services/auth");
const server = express();

server.use(bodyParser.json());

server.listen(3000, () => {
  console.log("We are live!");
});

server.use("/apartments", apartmentsRouter);
server.use("/auth", authRouter);
