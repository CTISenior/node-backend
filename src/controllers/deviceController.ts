import pool from '../connectors/crdb_connector';
import * as kafkaAdmin from '../utils/kafkaHelper';

// const tenantID = 1;
// const assetID = 1;

/**
 * @param test
 */

// exports.getAllDevices = function(req, res) {}

export const getTenantDevices = (req, res) => {
  const tenantId = req.params.tenantId;

  pool.query(
    'SELECT * FROM devices WHERE tenant_id=$1 ORDER BY created_at ASC',
    [ tenantId ],
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
    }
  );
};

export const getAssetDevices = (req, res) => {
  const assetId = req.params.assetId;
  
  pool.query(
    'SELECT * FROM devices WHERE asset_id=$1 ORDER BY created_at ASC',
    [ assetId ],
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
      }
  );
};

export const getDevice = (req, res) => {
  const id = req.params.id;

  pool.query(
    'SELECT * FROM devices WHERE id=$1', 
    [ id ], 
    (error, result) => {
      if (error || result.rowCount == 0) {
        return res
          .status(400)
          .send('[ERROR] Cannot get the device!');
      }

      return res
        .status(200)
        .json(result.rows);
    }
  );
};

export const insertDevice = (req, res) => {
  const {
    sn, name, protocol, model, types, max_values, description, asset_id, tenant_id,
  } = req.body;

  pool.query(
    'INSERT INTO devices (sn, name, protocol, model, types, max_values, description, asset_id, tenant_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
    [ sn, name, protocol, model, types, max_values, description, asset_id, tenant_id ],
    (error, result) => {
      if (error || result.rowCount == 0) {
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
    }
  );
};

export const updateDevice = (req, res) => {
  const id = req.params.id
  const {
    name, protocol, model, types, max_values, description, asset_id
  } = req.body;
  // const updated_at = Date.now()

  pool.query(
    'UPDATE devices SET name=$1, protocol=$2, model=$3, types=$4, max_values=$5, description=$6, asset_id=$7 WHERE id=$8', 
    [ name, protocol, model, types, max_values, description, asset_id, id ],
    (error, result) => {
      if (error || result.rowCount == 0) {
        return res
          .status(400)
          .send(`[ERROR] The device could not be updated!`);
      }

      return res
        .status(200)
        .send(`The device updated successfully`);
    }
  );
};


export const deleteDevice = (req, res) => {
  const id = req.params.id;
  const sn = req.params.sn;

  pool.query(
    'DELETE FROM devices WHERE id=$1 AND sn=$2', 
    [ id, sn ], 
    (error, result) => {
      if (error || result.rowCount == 0) {
        return res
          .status(400)
          .send(`[ERROR] The device could not be deleted!`);
      }

      // delete kafka topic -> SN
      kafkaAdmin
        .deleteTopic(sn)
        .then((result) => console.log(result))
        .catch((error) => console.log(error));


      // delete telemetries & alerts ...

      return res
        .status(200)
        .send(`The device deleted successfully`);
    }
  );
};