'use strict';

const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  path: '/'
});
const SOCKET_PORT = 4001


httpServer.listen(SOCKET_PORT, () => {
  console.log("Websocket started at port: ", SOCKET_PORT)
});

module.exports = io