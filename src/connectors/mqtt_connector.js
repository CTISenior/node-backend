"use strict";

const mqtt = require('mqtt');

const host = '127.0.0.1'
const port = '11883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const connectUrl = `mqtt://${host}:${port}`

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'username',
  password: 'passwd',
  reconnectPeriod: 1000,
})

module.exports = client