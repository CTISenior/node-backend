// GET ->>>>  /api/v1/telemetry

import pool from '../connectors/crdb_connector';

export const getTelemetries = (req, res) => {
  const sn = req.params.sn
  const {
    dayFilter
  } = req.body;

  pool.query(`SELECT * FROM device_telemetries WHERE sn=$1 AND created_at > current_date - interval '$2 day' ORDER BY created_at ASC`, 
  [sn, dayFilter],
  (error, result) => {
    if (error) {
      return res
        .status(400)
        .send('[ERROR] Cannot get the filtered telemetries!');
    }

    return res
        .status(200)
        .json(result.rows);
  });
};

