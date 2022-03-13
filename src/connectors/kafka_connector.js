const { Kafka } = require('kafkajs')

const clientId = "iotwin-kafka"
const brokers = ["localhost:9091", "localhost:9092", "localhost:9093"]
const topic = "testTopic"

/*
const { KAFKA_USERNAME: username, KAFKA_PASSWORD: password } = process.env
const sasl = username && password ? { username, password, mechanism: 'plain' } : null
const ssl = !!sasl
*/

const kafka = new Kafka({
  clientId: clientId,
  brokers: brokers,
  //logLevel: logLevel.DEBUG,
  //ssl,
  //sasl
})

module.exports = kafka