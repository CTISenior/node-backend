"use strict";

const kafka = require('../connectors/kafka_connector');
const admin = kafka.admin()


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


module.exports = {
  createTopic,
  deleteTopic
};
