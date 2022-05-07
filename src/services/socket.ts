import { createServer } from "http";
import { Server, Socket } from "socket.io";
import kafka from '../connectors/kafka_connector';

const httpServer = createServer();
const io = new Server(httpServer, {
  // wss, https
  //path: '/',
  cors: {
    origin: '*',
  }
});


let consumer
let topic

io.on('connection', (socket) => {
  console.log(`socket_id: ${socket.id}`)

  socket.on('telemetry_topic', (arg) => {
    if(arg){
      topic = arg.toString();
    }

    if (topic) {
      console.log(`kafka_topic: ${topic}`);

      consumer = kafka.consumer({ groupId: `consumer-group_${socket.id}` });
      consumer.connect()
      consumer.subscribe({ topic, fromBeginning: false });

      setTimeout(function () {
        consume(topic, socket).catch(console.error);
      }, 1000);
    }

  });

  socket.on("disconnect", () => {
    console.info(`Client disconnected [socket_id=${socket.id}]`);
    if (topic) {
      //consumer.pause([{ topic }])
      //consumer[socket.id].stop()

      // (async () => {
      // await consumer[socket.id].disconnect()
      // consumer[socket.id] = null
      // })();

    }
  });
  socket.on("start", (topic) => {
    console.info(`Topic resume again : ${topic}]`);
    consumer.resume([{ topic }]);
    socket.emit(`status`, topic + " resuming again", "success", true);
  });
  socket.on("stop", (topic) => {
    console.info(`Topic paused : ${topic}]`);
    consumer.pause([{ topic }]);
    socket.emit(`status`, topic + " stop resuming", "success", false);
  });
});


const consume = async (topic, socket) => {
  consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic,
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });

      socket.emit(`telemetry_topic_message`, message.value.toString());
      //socket.broadcast.to(topic).emit(`telemetry_topic_message`, message.value.toString());
      //socket.to(topic).emit(`telemetry_topic_message`, message.value.toString());
    },
  });
  // consumer.seek({ topic: topic, partition: 0, offset: 12384 })
};


io.on('disconnect', () => {
  console.log('disconnect');
});
io.on('register', (test) => {
  console.log('register');
});
io.on('unregister', (test) => {
  console.log('unregister');
});
io.on('subscribe', (test) => {
  console.log('subscribe');
});
io.on('unsubscribe', (test) => {
  console.log('unsubscribe');
});


export { httpServer };