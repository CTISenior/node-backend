import { Kafka } from 'kafkajs';


const clientId = 'iotwin-kafka';
const brokers = ['localhost:9091', 'localhost:9092', 'localhost:9093'];

/*
const { KAFKA_USERNAME: username, KAFKA_PASSWORD: password } = process.env
const sasl = username && password ? { username, password, mechanism: 'plain' } : null
const ssl = !!sasl
*/

export default new Kafka({
  clientId,
  brokers,
  // logLevel: logLevel.DEBUG,
  // ssl,
  // sasl
});
