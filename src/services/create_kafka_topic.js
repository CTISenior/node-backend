"use strict";

const client = require('../connectors/kafkaConnector');
const topic = "abc1"

const admin = kafka.admin()

const main = async () => {
  await admin.connect()
  await admin.createTopics({
    topics: [{ topic }],
    waitForLeaders: true,
  })
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})