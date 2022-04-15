// GET ->>>>  /api/v1/alerts

import pool from '../connectors/crdb_connector';

const tenantID = 1;
const assetID = 1;

export const getAllAlerts = (req, res) => {
  /// ///////dbHelper.getAlert(...);
  pool.query('SELECT * FROM device_alerts', (error, result) => {
    if (error) {
      return res
        .status(400)
        .send('[ERROR] Cannot get all alerts!');
    }

    return res
      .status(200)
      .json(result.rows);
  });
};

// exports.getAlert = function(req, res) {}
export const getAlert = (req, res) => {
  const { id } = req.params.id;

  /// ///////dbHelper.getAlert(...);
  pool.query(
    'SELECT * FROM device_alerts WHERE sn=$1',
    [id],
    (error, result) => {
      if (error) {
        return res
          .status(400)
          .send('[ERROR] Cannot get the alert!');
      }

      return res
        .status(200)
        .json(result.rows);
    },
  );
};

export const update_alert = (req, res) => {
  const { id } = req.params;
  const {
    status,
  } = req.body;
  pool.query(
    'UPDATE device_alerts SET status=$1 WHERE id = $2', // returning *;
    [status, id],
    (error, result) => {
      if (error) {
        return res
          .status(400)
          .send(`[ERROR] Alert status could not be updated! | ID: ${id}`);
      }

      return res
        .status(200)
        .send(`Alert status updated successfully | ID: ${id}`);
    },
  );
};

export const deleteAlert = (req, res) => {
  const { id } = req.params;

  pool.query('DELETE FROM device_alerts WHERE id=$1', 
  [id], 
  (error, result) => {
    if (error) {
      return res
        .status(400)
        .send(`[ERROR] Alert could not be deleted! | ID: ${id}`);
    }

    return res
      .status(200)
      .json(result.rows);
  });
};

export const deleteAllAlerts = (req, res) => {
  const { sn } = req.params;

  pool.query('DELETE FROM device_alerts WHERE sn=$1',
   [sn], 
  (error, result) => {
    if (error) {
      return res
        .status(400)
        .send(`[ERROR] Alerts could not be deleted! | SN: ${sn}`);
    }

    return res
      .status(200)
      .send(`Alerts deleted successfully | SN: ${sn}`);
  });
};

