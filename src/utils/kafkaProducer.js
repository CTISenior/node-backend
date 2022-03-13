"use strict";

const kafka = require('../connectors/kafka_connector');
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
