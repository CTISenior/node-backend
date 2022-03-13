"use strict";

const kafka = require('../connectors/kafka_connector');
const topic = 'testTopic'

const consumer = kafka.consumer({ groupId: 'test-group' })


const run = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic: topic, fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      })
    },
  })
}

run().catch(console.error)