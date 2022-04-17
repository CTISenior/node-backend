// GET ->>>>  /api/v1/alerts

import pool from '../connectors/crdb_connector';


export const getTenantAlerts = (req, res) => {
  const tenantId = req.params.tenantId;
  
  pool.query(
    'SELECT * FROM device_alerts where tenant_id=$1 AND status=false',
    [ tenantId ],
    (error, result) => {
     if (error) {
      return res
        .status(400)
        .send('[ERROR] Cannot get all tenant alerts!');
    }

    return res
      .status(200)
      .json(result.rows);
    }
  );
};

export const getAssetAlerts = (req, res) => {
  const assetId = req.params.assetId;
  
  pool.query(
    'SELECT * FROM device_alerts where asset_id=$1 AND status=false',
    [ assetId ],
    (error, result) => {
      if (error) {
        return res
          .status(400)
          .send('[ERROR] Cannot get all asset alerts!');
      }

      return res
        .status(200)
        .json(result.rows);
    }
  );
};

export const getDeviceAlerts = (req, res) => {
  //const sn = req.params.sn;
  const deviceId = req.params.deviceId;

  pool.query(
    'SELECT * FROM device_alerts WHERE device_id=$1',
    [ deviceId ],
    (error, result) => {
      if (error) {
        return res
          .status(400)
          .send('[ERROR] Cannot get the devices alerts!');
      }

      return res
        .status(200)
        .json(result.rows);
    }
  );
};

export const updateAlertStatus = (req, res) => {
  const id = req.params.id;
  const {
    status,
  } = req.body;

  pool.query(
    'UPDATE device_alerts SET status=$1 WHERE id=$2',
    [ status, id ],
    (error, result) => {
      if (error || result.rowCount == 0) {
        return res
          .status(400)
          .send(`[ERROR] Alert status could not be updated!`);
      }

      return res
        .status(200)
        .send(`Alert status updated successfully`);
    }
  );
};

export const clearDeviceAlerts = (req, res) => {
  const deviceId = req.params.deviceId;

  pool.query(
    'UPDATE device_alerts SET status=true WHERE device_id=$1',
    [ deviceId ],
    (error, result) => {
      if (error || result.rowCount == 0) {
        return res
          .status(400)
          .send(`[ERROR] Device alerts could not be cleared!`);
      }

      return res
        .status(200)
        .send(`Device alerts cleared successfully`);
    }
  );
};

export const deleteAlert = (req, res) => {
  const id = req.params.id;

  pool.query(
    'DELETE FROM device_alerts WHERE id=$1', 
    [ id ], 
    (error, result) => {
      if (error || result.rowCount == 0) {
        return res
          .status(400)
          .send(`[ERROR] The alert could not be deleted!`);
      }

      return res
        .status(200)
        .send(`The alert deleted successfully`);
    }
  );
};

export const deleteDeviceAlerts = (req, res) => {
  //const sn = req.params.sn;
  const deviceId = req.params.deviceId;

  pool.query(
    'DELETE FROM device_alerts WHERE device_id=$1 AND status=true',
    [ deviceId ], 
    (error, result) => {
      if (error || result.rowCount == 0) {
        return res
          .status(400)
          .send(`[ERROR] The device alerts could not be deleted!`);
      }

      return res
        .status(200)
        .send(`The device alerts deleted successfully`);
    }
  );
};

