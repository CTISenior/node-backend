import pool from '../connectors/crdb_connector';

const tenantID = 1;

// exports.getAllAssets = function(req, res) {}
export const getAllAssets = (req, res) => {
  // dbHelper.getAllAssets(...);
  pool.query(
    'SELECT * FROM assets WHERE tenant_id=$1 ORDER BY created_at ASC',
    [tenantID],
    (error, result) => {
      if (error) {
        return res
          .status(400)
          .send('[ERROR] Cannot get all assets!');
        // return res.status(400).send('error!');
      }

      return res
        .status(200)
        .json(result.rows);
    },
  );
};

export const getAsset = (req, res) => {
  const id = req.params.id

  pool.query('SELECT * FROM assets WHERE id=$1', [id], (error, result) => {
    if (error) {
      return res
        .status(400)
        .send('[ERROR] Cannot get the asset!');
    }

    return res
      .status(200)
      .json(result.rows);
  });
};

export const insertAsset = (req, res) => {
  const {
    name, location, description, tenantID,
  } = req.body;

  pool.query(
    'INSERT INTO assets (name, location, description, tenant_id) VALUES ($1, $2, $3, $4)', // returning *;
    [name, location, description, tenantID],
    (error, result) => {
      if (error) {
        return res
          .status(400)
          .send('[ERROR] New asset could not be inserted!');
      }

      return res
        .status(201)
        .send('New asset inserted successfully');
    },
  );
};

export const updateAsset = (req, res) => {
  const id = req.params.id;
  const {
    name, location, description, tenantID,
  } = req.body;
  // const updated_at = Date.now()

  pool.query(
    'UPDATE assets SET name=$1, location=$2, description=$3, tenant_id=$4 WHERE id = $5', // returning *;
    [name, location, description, tenantID, id],
    (error, result) => {
      if (error) {
        return res
          .status(400)
          .send(`[ERROR] Asset could not be updated!`);
      }

      return res
        .status(200)
        .send(`Asset updated successfully`);
    },
  );
};

export const deleteAsset = (req, res) => {
  const id = req.params.id;

  pool.query('DELETE FROM assets WHERE id=$1', [id], (error, result) => {
    if (error) {
      return res
        .status(400)
        .send(`[ERROR] Asset could not be deleted!`);
    }

    return res
      .status(200)
      .send(`Asset deleted successfully`);
  });
};