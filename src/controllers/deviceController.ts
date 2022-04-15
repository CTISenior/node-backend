import pool from '../connectors/crdb_connector';

import * as kafkaAdmin from '../utils/kafkaHelper';

// const tenantID = 1;
// const assetID = 1;

/**
 * @param test
 */

// exports.getAllDevices = function(req, res) {}
export const getAllDevices = (req, res) => {
  /// ///////dbHelper.getAllDevices(...);
  pool.query(
    'SELECT * FROM devices WHERE asset_id=$1 ORDER BY created_at ASC',
    (error, result) => {
      if (error) {
        return res
          .status(400)
          .send('[ERROR] Cannot get all devices!');
        // return res.status(400).send('error!');
      }

      return res
        .status(200)
        .json(result.rows);
    },
  );
};

export const getDevice = (req, res) => {
  const id = req.params.id;

  pool.query('SELECT * FROM devices WHERE id=$1', 
  [id], 
  (error, result) => {
    if (error) {
      return res
        .status(400)
        .send('[ERROR] Cannot get the device!');
    }

    return res
      .status(200)
      .json(result.rows);
  });
};

export const insertDevice = (req, res) => {
  const {
    sn, name, protocol, model, type, description, assetID,
  } = req.body;

  pool.query(
    'INSERT INTO devices (sn, name, protocol, model, type, description, asset_id) VALUES ($1, $2, $3, $4, $5, $6, $7)', // returning *;
    [sn, name, protocol, model, type, description, assetID],
    (error, result) => {
      if (error) {
        return res
          .status(400)
          .send('[ERROR] New device could not be inserted!');
      }

      // create kafka topic -> SN
      kafkaAdmin
        .createTopic(sn)
        .then((result) => console.log(result))
        .catch((error) => console.log(error));

      return res
        .status(201)
        .send('New device inserted successfully');
    },
  );
};

export const updateDevice = (req, res) => {
  const id = req.params.id
  const {
    name, protocol, model, type, description, assetID,
  } = req.body;
  // const updated_at = Date.now()

  pool.query(
    'UPDATE devices SET name=$1, protocol=$2, model=$3, type=$4, description=$5, asset_id=$6 WHERE id = $7', // returning *;
    [name, protocol, model, type, description, assetID, id],
    (error, result) => {
      if (error) {
        return res
          .status(400)
          .send(`[ERROR] Device could not be updated! | ID: ${id}`);
      }

      return res
        .status(200)
        .send(`Device updated successfully | ID: ${id}`);
    },
  );
};


export const deleteDevice = (req, res) => {
  const { id } = req.params.id;
  const { sn } = req.params;

  pool.query('DELETE FROM devices WHERE id=$1', [id], (error, result) => {
    if (error) {
      return res
        .status(400)
        .send(`[ERROR] Device could not be deleted! | ID: ${id}`);
    }

    // delete kafka topic -> SN
    kafkaAdmin
      .deleteTopic(sn)
      .then((result) => console.log(result))
      .catch((error) => console.log(error));


    // delete telemetries & alerts ...

    return res
      .status(200)
      .send(`Device deleted successfully | ID: ${id}`);
  });
};