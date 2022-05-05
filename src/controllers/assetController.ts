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

export const insertAsset = (req, res) => {
  const {
    name, city, location, capacity, description, tenant_id,
  } = req.body;

  pool.query(
`
INSERT INTO assets (name, city, location, capacity, description, tenant_id) 
VALUES ($1, $2, $3, $4, $5, $6);
`, 
    [ name, city, location, capacity, description, tenant_id ])
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
    name, city, location, capacity, description
  } = req.body;
  // const updated_at = Date.now()

  pool.query(
`
UPDATE assets 
SET name=$1, city=$2, location=$3, capacity=$4, description=$5 
WHERE id = $6;
`,
    [ name, city, location, capacity, description, id ])
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
