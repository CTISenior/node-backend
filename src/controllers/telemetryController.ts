// GET ->>>>  /api/v1/telemetry

import pool from '../connectors/crdb_connector';


export const getTenantTelemetries = (req, res) => {
  const tenantId = req.params.tenantId
  const limit = req.query.limit ? req.query.limit : '100'; // api/v1/tenants/:tenantId/telemetry?limit=5

  pool.query(
    `SELECT * FROM device_telemetries WHERE tenant_id=$1 ORDER BY created_at DESC LIMIT $2`,
    [ tenantId, limit ],
    (error, result) => {
      if (error) {
        return res
          .status(400)
          .send('[ERROR] Cannot get the tenant telemetries!');
      }

      return res
          .status(200)
          .json(result.rows);
    }
  );
};

export const getAssetTelemetries = (req, res) => {
  const assetId = req.params.assetId
  const limit = req.query.limit ? req.query.limit : '100'; // api/v1/assets/:assetId/telemetry?limit=5

  pool.query(
    `SELECT * FROM device_telemetries WHERE asset_id=$1 ORDER BY created_at DESC LIMIT $2`, 
    [ assetId, limit ],
    (error, result) => {
      if (error) {
        return res
          .status(400)
          .send('[ERROR] Cannot get the asset telemetries!');
      }

      return res
          .status(200)
          .json(result.rows);
    }
  );
};

export const getDeviceTelemetries = (req, res) => {
  //sn
  const deviceId = req.params.deviceId
  const filter = req.query.filter ? req.query.filter : 3; // api/v1/devices/:deviceId/telemetry?filter=5
  const sortedColumn = req.query.sortedColumn ? req.query.sortedColumn : 'created_at';
  const sorting = req.query.sorting ? req.query.sorting : 'DESC';

  pool.query(
    `SELECT * FROM device_telemetries WHERE device_id=$1 AND (created_at > CURRENT_DATE - ${parseInt(filter)}) ORDER BY created_at DESC`, 
    [ deviceId ],
    (error, result) => {
      if (error) {
        return res
          .status(400)
          .send('[ERROR] Cannot get the device telemetries!');
      }

      return res
          .status(200)
          .json(result.rows);
    }
  );
};

export const deleteTelemetry = (req, res) => {
  const id = req.params.id;

  pool.query(
    'DELETE FROM device_telemetries WHERE id=$1', 
    [ id ], 
    (error, result) => {
      if (error || result.rowCount == 0) {
        return res
          .status(400)
          .send(`[ERROR] The telemetry could not be deleted!`);
      }

      return res
        .status(200)
        .send(`The telemetry deleted successfully`);
    }
  );
};

/*
export const deleteDeviceTelemetries = (req, res) => {
  const sn = req.params.sn;

  pool.query(
    'DELETE FROM device_telemetries WHERE sn=$1', 
    [ sn ], 
    (error, result) => {
      if (error || result.rowCount == 0) {
        return res
          .status(400)
          .send(`[ERROR] The device telemetries could not be deleted! | SN: ${sn}`);
      }

      return res
        .status(200)
        .send(`The device telemetries deleted successfully | SN: ${sn}`);
    }
  );
};*/
