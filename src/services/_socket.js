"use strict";

const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
    path: '/'
});

const SOCKET_PORT = 3100

const kafka = require('../connectors/kafka_connector');
const consumer = kafka.consumer({ groupId: 'test-group' })
const topic = 'testTopic'


consume(({ from, to, message }) => {
  io.sockets.emit('newMessage', { from, to, message });
})

io.on('connection', function(socket) {
    await consumer.connect()
    await consumer.subscribe({ topic: topic, fromBeginning: false })
  
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          partition,
          offset: message.offset,
          value: message.value.toString(),
        })
      },
    })
    run().catch(console.error)
});


//socket
httpServer.listen(SOCKET_PORT, () => {
   console.log("Websocket started at port: ", SOCKET_PORT)
});