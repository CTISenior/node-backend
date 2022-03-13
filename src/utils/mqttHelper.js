"use strict";

const client = require('../connectors/mqtt_connector');
const topic = '/sensor/data'


function subscribe()
{
    client.on('connect', () => {
        console.log('Connected to MQTT Broker')
        client.subscribe([topic], () => {
          console.log(`Subscribe to topic '${topic}'`)
        })
      })
}

function get_messages()
{
    client.on('message', (topic, payload) => {
        console.log('Received Message:', topic, payload.toString())
    })
}


function main()
{
    subscribe()
    get_messages()
}
main()