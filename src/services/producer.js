"use strict";

const client = require('../connectors/kafkaConnector');
const topic = "testTopic"


const producer = kafka.producer()

const run = async () => {
  await producer.connect()
  await producer.send({
    topic: topic,
    messages: [
      { value: 'Hello KafkaJS user!' },
    ],
  })
}

run().catch(console.error)
