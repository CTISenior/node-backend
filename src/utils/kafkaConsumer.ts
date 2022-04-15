import  kafka from '../connectors/kafka_connector';

const topic = 'testTopic';

const consumer = kafka.consumer({ groupId: 'test-group' });
consumer.connect();
consumer.subscribe({ topic, fromBeginning: false });

const consume = async (topic) => {
  /*const consumer = kafka.consumer({ groupId: `test-group_${topic}` });
  await consumer.connect() // await 
  await consumer.subscribe({ topic, fromBeginning: false });*/
  consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
  consumer.seek({ topic: topic, partition: 0, offset: 12384 })
  //consumer.pause([{ topic }])
  //consumer.resume()
};
