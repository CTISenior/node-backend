"use strict";

const mqtt_client = require('../connectors/mqtt_connector');
const pool = require('../connectors/pgsql_connector');
const kafkaHelper = require('../utils/kafkaHelper');
const dbHelper = require('../utils/dbHelper');
const mqtt_topic = 'v1/gateway/telemetry'


mqtt_client.on('connect', () => {
    console.log('Connected to MQTT Broker')  //[LOG]
    mqtt_client.subscribe([mqtt_topic], () => {
        console.log(`Subscribe to topic '${mqtt_topic}'`) //[LOG]
    })
})


//Promise
mqtt_client.on('message', (mqtt_topic, payload) => {
    console.log('Received Message:', mqtt_topic, payload.toString())
    const obj = JSON.parse(payload.toString())
    const sn = Object.keys(obj)[0].toString()
    const telemetry = JSON.stringify(Object.values(obj)[0][0].values)
    const timestamp = Object.values(obj)[0][0].ts

    //next -> next()

    //write telemetry into kafkaTopic
    kafkaHelper.writeTelemetry(sn, telemetry)
        .then(result => console.log(result))
        .catch(error => console.log(error));
    
    //insert telemetry into "device_telemetries" db table
    dbHelper.insertTelemetry(sn, telemetry, timestamp);

})