'use strict';

const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, { //wss, https
  path: '/'
});

/*
const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  path: "/telemetry/"
});
*/

const SOCKET_PORT = 4001


httpServer.listen(SOCKET_PORT, () => {
  console.log("Websocket started at port: ", SOCKET_PORT)
});

module.exports = io