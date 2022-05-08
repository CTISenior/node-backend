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

export const getDeviceTelemetries2 = (req, res) => {
  const deviceId = req.params.deviceId
  const sensorType = req.query.sensorType ? req.query.sensorType : '';
  const limit = req.query.limit ? req.query.limit : 1000; // api/v1/devices/:deviceId/telemetry?days=14

  pool.query(
`
SELECT timestamptz as Date, values->>'${sensorType}' as value
FROM device_telemetries 
WHERE device_id=$1 LIMIT $2;
`, 
    [ deviceId, limit ])
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
    sn, name, protocol, model, sensor_types, max_values, description, asset_id, tenant_id,
  } = req.body;

  pool.query(
`
INSERT INTO devices (sn, name, protocol, model, sensor_types, max_values, description, asset_id, tenant_id) 
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id;
`,
    [ sn, name, protocol, model, sensor_types, max_values, description, asset_id, tenant_id ])
    .then(result => { 
      
      kafkaAdmin.createTopic(result.rows[0].id+'')
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
    name, protocol, model, sensor_types, max_values, description, asset_id
  } = req.body;
  // const updated_at = Date.now()

  pool.query(
`
UPDATE devices 
SET name=$1, protocol=$2, model=$3, sensor_types=$4, max_values=$5, description=$6, asset_id=$7 
WHERE id=$8;
`, 
    [ name, protocol, model, sensor_types, max_values, description, asset_id, id ])
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

  pool.query(
    'DELETE FROM devices WHERE id=$1', 
    [ id ])
    .then(result => { 
        // delete kafka topic -> SN
        kafkaAdmin
          .deleteTopic(id+'')
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
