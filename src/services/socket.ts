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

let consumerObj = {};

io.on('connection', (socket) => {
  // receive message
  socket.on('telemetry_topic', (arg) => {
    const topic = arg.toString();

    if (topic) {
      console.log(`connection: ${topic}`);

      if(!consumerObj[topic]){
        console.log(`New consumer for topic: ${topic}`);
        consumerObj[topic] = kafka.consumer({ groupId: `consumer-group_${topic}` });
        consumerObj[topic].connect() // await 
        consumerObj[topic].subscribe({ topic, fromBeginning: false });
      }

      setTimeout(function() {
        consume(topic).catch(console.error);
      }, 1000);
    }
  });

  //https://kafka.js.org/docs/consuming

  const consume = async (topic) => {
    /*const consumer = kafka.consumer({ groupId: `test-group_${topic}` });
    await consumer.connect() // await 
    await consumer.subscribe({ topic, fromBeginning: false });*/
    consumerObj[topic].run({
      autoCommit: false,
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          partition,
          offset: message.offset,
          value: message.value.toString(),
        });

        io.sockets.emit(`telemetry_topic_message-${topic}`, message.value.toString());
      },
    });
    consumerObj[topic].seek({ topic: topic, partition: 0, offset: 12384 })
    //consumer.pause([{ topic }])
    //consumer.resume()
  };
});

io.on('disconnect', () => {
  console.log('disconnect');
  consumerObj = {};
});
io.on('subscribe', (test) => {
  console.log('subscribe');
});
io.on('unsubscribe', (test) => {
  console.log('unsubscribe');
  consumerObj = {};
});


export { httpServer };