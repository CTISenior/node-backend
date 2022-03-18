"use strict";

const mqtt_client = require('../connectors/mqtt_connector');
const alertController = require('../controllers/alertController');
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
    const obj = JSON.parse(payload.toString())
    const sn = Object.keys(obj)[0].toString()
    const telemetry = JSON.stringify(Object.values(obj)[0][0].values)
    const timestamp = Object.values(obj)[0][0].ts

    //next -> next()

    //write telemetry into kafkaTopic
    kafkaHelper.writeTelemetry(sn, telemetry)
    .then(
        //insert telemetry into "device_telemetries" db table
        dbHelper.insertTelemetry(sn, telemetry, timestamp)
    )
    .then(
        result => console.log(result)
    )
    .catch(error => console.log(error));
    


    check_telemetry(telemetry)
    .then(value =>
        {
            console.log(value)
        })
    .catch(value =>
        {
            console.log(value)
            dbHelper.insertAlert(sn, value[0] ,"warning", value[1], timestamp)
        });

    //insert telemetry into "device_telemetries" db table

})



const check_telemetry = (telemetry) =>
{
    return new Promise((resolve, reject) =>
    {
        const telemetry_obj = JSON.parse(telemetry)
        const telemetry_keys = Object.keys(telemetry_obj)

        //Promise
        telemetry_keys.forEach((key) => {
            if(key == "temperature")
            {
                if(telemetry_obj[key] >= 50){
                    reject([key, `[WARNING] ${key} is ${telemetry_obj[key]}`]);
                }
            }
            else if(key == "humidity")
            {
                if(telemetry_obj[key] >= 60){
                    reject([key, `[WARNING] ${key} is ${telemetry_obj[key]}`]);
                }
            }
        });

        resolve("OK!");
    });
};