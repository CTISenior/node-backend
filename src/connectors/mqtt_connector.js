"use strict";

const mqtt = require('mqtt');

const host = '127.0.0.1'
const port = '1883'
const clientID = `mqtt_${Math.random().toString(16).slice(3)}` // ID=IoTwin_TBGateway
const connectUrl = `mqtt://${host}:${port}`

module.exports = mqtt.connect(connectUrl, {
  clientID,
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
  username: 'username',
  password: 'password',
})