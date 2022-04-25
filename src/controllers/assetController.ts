import pool from '../connectors/db_connector';


export const getAsset = (req, res) => {
  const id = req.params.id

  pool.query(
    'SELECT * FROM assets WHERE id=$1', 
    [ id ])
    .then(result => { 
      return res
        .status(200)
        .send(result.rows);
    })
    .catch(error => { 
      return res
        .status(400)
        .send(`${error}`);
    })
};


export const getAssetDevices = (req, res) => {
  const assetId = req.params.assetId;
  
  pool.query(
    'SELECT * FROM devices WHERE asset_id=$1 ORDER BY created_at ASC',
    [ assetId ])
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


export const getAssetAlerts = (req, res) => {
  const assetId = req.params.assetId;
  
  pool.query(
    'SELECT * FROM device_alerts where asset_id=$1 ORDER BY status asc, created_at desc',
    [ assetId ])
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


export const getAssetTelemetries = (req, res) => {
  const assetId = req.params.assetId
  const days = req.query.days ? req.query.days : 7; // api/v1/assets/:assetId/telemetry?days=14
  const sortedColumn = req.query.sortedColumn ? req.query.sortedColumn : 'created_at';
  const sorting = req.query.sorting ? req.query.sorting : 'DESC';

  pool.query(
    `SELECT * FROM device_telemetries WHERE asset_id=$1 AND (created_at > CURRENT_DATE - ${parseInt(days)}) ORDER BY created_at DESC`, 
    [ assetId ])
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


export const insertAsset = (req, res) => {
  const {
    name, city, location, coordinates, description, tenant_id,
  } = req.body;

  pool.query(
    'INSERT INTO assets (name, city, location, coordinates, description, tenant_id) VALUES ($1, $2, $3, $4, $5, $6)', 
    [ name, city, location, coordinates, description, tenant_id ])
    .then(result => { 
      return res
        .status(201)
        .send('New asset inserted successfully');
    })
    .catch(error => { 
      return res
        .status(400)
        .send(`${error}`);
    })
};


export const updateAsset = (req, res) => {
  const id = req.params.id;
  const {
    name, city, location, coordinates, description
  } = req.body;
  // const updated_at = Date.now()

  pool.query(
    'UPDATE assets SET name=$1, city=$2, location=$3, coordinates=$4, description=$5 WHERE id = $6',
    [ name, city, location, coordinates, description, id ])
    .then(result => { 
      return res
        .status(201)
        .send(`The asset updated successfully`);
    })
    .catch(error => { 
      return res
        .status(400)
        .send(`${error}`);
    })
};


export const deleteAsset = (req, res) => {
  const id = req.params.id;

  pool.query(
    'DELETE FROM assets WHERE id=$1', 
    [ id ])
    .then(result => { 
      return res
        .status(200)
        .send(`The asset deleted successfully`);
    })
    .catch(error => { 
      return res
        .status(400)
        .send(`${error}`);
    })
};
