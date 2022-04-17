import pool from '../connectors/crdb_connector';

// exports.getAllAssets = function(req, res) {}
export const getTenantAssets = (req, res) => {
  const tenantId = req.params.tenantId;

  pool.query(
    'SELECT * FROM assets WHERE tenant_id=$1 ORDER BY created_at ASC',
    [ tenantId ],
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
    }
  );
};

export const getAsset = (req, res) => {
  const id = req.params.assetId

  pool.query(
    'SELECT * FROM assets WHERE id=$1', 
    [ id ], 
    (error, result) => {
      if (error || result.rowCount == 0) {
        return res
          .status(400)
          .send('[ERROR] Cannot get the asset!');
      }

      return res
        .status(200)
        .json(result.rows);
    }
  );
};

export const insertAsset = (req, res) => {
  const {
    name, city, location, coordinates, description, tenant_id,
  } = req.body;

  pool.query(
    'INSERT INTO assets (name, city, location, coordinates, description, tenant_id) VALUES ($1, $2, $3, $4, $5, $6)', 
    [ name, city, location, coordinates, description, tenant_id ],
    (error, result) => {
      if (error || result.rowCount == 0) {
        return res
          .status(400)
          .send('[ERROR] New asset could not be inserted!');
      }

      return res
        .status(201)
        .send('New asset inserted successfully');
    }
  );
};

export const updateAsset = (req, res) => {
  const id = req.params.id;
  const {
    name, city, location, coordinates, description
  } = req.body;
  // const updated_at = Date.now()

  pool.query(
    'UPDATE assets SET name=$1, city=$2, location=$3, coordinates=$4, description=$5 WHERE id = $6',
    [ name, city, location, coordinates, description, id ],
    (error, result) => {
      if (error || result.rowCount == 0) {
        return res
          .status(400)
          .send(`[ERROR] The asset could not be updated!`);
      }

      return res
        .status(200)
        .send(`The asset updated successfully`);
    }
  );
};

export const deleteAsset = (req, res) => {
  const id = req.params.id;

  pool.query(
    'DELETE FROM assets WHERE id=$1', 
    [ id ], 
    (error, result) => {
      if (error || result.rowCount == 0) {
        return res
          .status(400)
          .send(`The asset could not be deleted!`);
      }

      // null -> devices

      
      return res
        .status(200)
        .send(`The asset deleted successfully`);
    }
  );
};