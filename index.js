const express = require("express");
const bodyParser = require("body-parser");
const apartmentsRouter = require("./services/apartments");
const authRouter = require("./services/auth");
const usersRouter = require("./services/users");
//const errorMiddleware = require("./middlewares/error");
const server = express();

server.use(bodyParser.json());

server.listen(3000, () => {
  console.log("We are live!");
});

// server.use(errorMiddleware);

server.use("/apartments", apartmentsRouter);
server.use("/auth", authRouter);
server.use("/users", usersRouter);

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: "Internal Server Error" });
});
