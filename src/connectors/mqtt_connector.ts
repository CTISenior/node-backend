import mqtt from 'mqtt';


const host = '127.0.0.1';
const port = '1883';
const clientID = `mqtt_${Math.random().toString(16).slice(3)}`; // ID=IoTwin_TBGateway
const connectUrl = `mqtt://${host}:${port}`;

export default mqtt.connect(connectUrl, {
  clientID,
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
  username: 'iotwin',
  password: 'iotwin-9097',
});
