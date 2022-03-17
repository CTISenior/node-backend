"use strict";

const kafka = require('../connectors/kafka_connector');
const admin = kafka.admin()
const producer = kafka.producer()

//-> Promise
const createTopic = async function(topic)
{
  await admin.connect()
  const result = await admin.createTopics({
    topics: [{ topic }],
    waitForLeaders: true,
  })
  await admin.disconnect()
  //-> Try/Catch

  return `Create Kafka topic: ${result}`;
}


//-> Promise
const deleteTopic = async function(topic)
{
  await admin.connect()
  const result = await admin.deleteTopics({ 
    topics: [topic] 
  })
  await admin.disconnect()
  //-> Try/Catch

  return `Delete Kafka topic: ${result}`;
}


//-> Promise
const writeTelemetry = async function(topic, msg)
{
  await producer.connect()
  const result = await producer.send({
    topic: topic,
    messages: [
      { value: msg },
    ],
  })

  return `Write Topic message: ${result}`;
}


module.exports = {
    createTopic,
    deleteTopic,
    writeTelemetry
  };
