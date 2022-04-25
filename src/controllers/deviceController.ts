import pool from '../connectors/db_connector';
import * as kafkaAdmin from '../utils/kafkaHelper';

/**
 * @param test
 */

export const getDevice = (req, res) => {
  const id = req.params.id;

  pool.query(
    'SELECT * FROM devices WHERE id=$1', 
    [ id ])
    .then(result => { 
      return res
        .status(200)
        .json(result.rows[0]);
    })
    .catch(error => { 
      return res
        .status(400)
        .send(`${error}`);
    })
};


export const getDeviceAlerts = (req, res) => {
  //const sn = req.params.sn;
  const deviceId = req.params.deviceId;

  pool.query(
    'SELECT * FROM device_alerts WHERE device_id=$1 ORDER BY status asc, created_at desc',
    [ deviceId ])
    .then(result => { 
      return res
        .status(200)
        .json(result.rows);
    })
    .catch(error => { 
      return res
        .status(400)
        .send(`${error}`);
    })
};


export const getDeviceTelemetries = (req, res) => {
  //sn
  const deviceId = req.params.deviceId
  const days = req.query.days ? req.query.days : 7; // api/v1/devices/:deviceId/telemetry?days=14
  const sortedColumn = req.query.sortedColumn ? req.query.sortedColumn : 'created_at';
  const sorting = req.query.sorting ? req.query.sorting : 'DESC';

  pool.query(
    `SELECT * FROM device_telemetries WHERE device_id=$1 AND (created_at > CURRENT_DATE - ${parseInt(days)}) ORDER BY created_at DESC`, 
    [ deviceId ])
    .then(result => { 
      return res
        .status(200)
        .json(result.rows);
    })
    .catch(error => { 
      return res
        .status(400)
        .send(`${error}`);
    })
};


export const insertDevice = (req, res) => {
  const {
    sn, name, protocol, model, types, max_values, description, asset_id, tenant_id,
  } = req.body;

  pool.query(
    'INSERT INTO devices (sn, name, protocol, model, types, max_values, description, asset_id, tenant_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
    [ sn, name, protocol, model, types, max_values, description, asset_id, tenant_id ])
    .then(result => { 
      
      kafkaAdmin.createTopic(sn)
        .then((result) => console.log(result))
        .catch((error) => console.log(error));

      return res
        .status(201)
        .send('New device inserted successfully');
    })
    .catch(error => { 
      return res
        .status(400)
        .send(`${error}`);
    })
};


export const updateDevice = (req, res) => {
  const id = req.params.id
  const {
    name, protocol, model, types, max_values, description, asset_id
  } = req.body;
  // const updated_at = Date.now()

  pool.query(
    'UPDATE devices SET name=$1, protocol=$2, model=$3, types=$4, max_values=$5, description=$6, asset_id=$7 WHERE id=$8', 
    [ name, protocol, model, types, max_values, description, asset_id, id ])
    .then(result => { 
      return res
        .status(200)
        .send(`The device updated successfully`);
    })
    .catch(error => { 
      return res
        .status(400)
        .send(`${error}`);
    })
};


export const deleteDevice = (req, res) => {
  const id = req.params.id;
  const sn = req.params.sn;

  pool.query(
    'DELETE FROM devices WHERE id=$1', 
    [ id ])
    .then(result => { 
        // delete kafka topic -> SN
        kafkaAdmin
        .deleteTopic(sn)
        .then((result) => console.log(result))
        .catch((error) => console.log(error));


      // delete telemetries & alerts ...
      
      return res
        .status(200)
        .send(`The device deleted successfully`);
    })
    .catch(error => { 
      return res
        .status(400)
        .send(`${error}`);
    })
};


export const clearDeviceAlerts = (req, res) => {
  const deviceId = req.params.deviceId;

  pool.query(
    'UPDATE device_alerts SET status=true WHERE device_id=$1',
    [ deviceId ])
    .then(result => { 
      return res
        .status(200)
        .send(`Device alerts cleared successfully`);
    })
    .catch(error => { 
      return res
        .status(400)
        .send(`${error}`);
    })
};


export const deleteDeviceAlerts = (req, res) => {
  //const sn = req.params.sn;
  const deviceId = req.params.deviceId;

  pool.query(
    'DELETE FROM device_alerts WHERE device_id=$1 AND status=true',
    [ deviceId ])
    .then(result => { 
      return res
        .status(200)
        .send(`The device alerts deleted successfully`);
    })
    .catch(error => { 
      return res
        .status(400)
        .send(`${error}`);
    })
};
