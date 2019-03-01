const express = require("express");
const helmet = require("helmet");

const expressRouter = require("../router/express-router.js");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api", expressRouter);

module.exports = server;
