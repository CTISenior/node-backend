"use strict";

const client = require('../connectors/mqtt_connector');

const kafkaAdmin = require('./kafkaAdmin');

const mqtt_topic = '/sensor/data'




client.on('connect', () => {
    console.log('Connected to MQTT Broker')
    client.subscribe([mqtt_], () => {
        console.log(`Subscribe to topic '${topic}'`)
    })
})


client.on('message', (topic, payload) => {
    console.log('Received Message:', topic, payload.toString())



    //write into kafka with topic-> SN
    //write into "device_history" table
})
