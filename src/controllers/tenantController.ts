import pool from '../connectors/db_connector';


export const getTenant = (req, res) => {
  const realmID = req.params.realmId

  pool.query(
    'SELECT * FROM tenants WHERE realm_id=$1', 
    [ realmID ])
    .then(result => { 
      return res
        .status(200)
        .json(result.rows[0]);
    })
    .catch(error => { 
      return res
        .status(400)
        .send(`${error}`);
    })
};


export const getTenantAssets = (req, res) => {
  const tenantId = req.params.tenantId;

  pool.query(
    'SELECT * FROM assets WHERE tenant_id=$1 ORDER BY created_at ASC',
    [ tenantId ])
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


export const getTenantDevices = (req, res) => {
  const tenantId = req.params.tenantId;

  pool.query(
    'SELECT * FROM devices WHERE tenant_id=$1 ORDER BY created_at ASC',
    [ tenantId ])
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


export const getTenantAlerts = (req, res) => {
  const tenantId = req.params.tenantId;
  const limit = req.query.limit ? req.query.limit : '100'; // api/v1/tenants/:tenantId/alerts?limit=5

  pool.query(
    'SELECT * FROM device_alerts where tenant_id=$1 AND status=false ORDER BY created_at DESC LIMIT $2',
    [ tenantId, limit ])
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


export const getTenantTelemetries = (req, res) => {
  const tenantId = req.params.tenantId
  const limit = req.query.limit ? req.query.limit : '100'; // api/v1/tenants/:tenantId/telemetry?limit=50
  
  pool.query(
    `SELECT * FROM device_telemetries WHERE tenant_id=$1 ORDER BY created_at DESC LIMIT $2`,
    [ tenantId, limit ])
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


export const insertTenant = (req, res) => {
  const {
    realm_id, client_id, name, country, city, address, postcode, email, phone, description
  } = req.body;

  pool.query(
    'INSERT INTO tenants (realm_id, client_id, name, country, city, address, postcode, email, phone, description) VALUES ($1, $2, $3, $4, $5, $6, $7 ,$8, $9, $10)', 
    [ realm_id, client_id, name, country, city, address, postcode, email, phone, description])
    .then(result => { 
      return res
        .status(201)
        .send('New tenant inserted successfully');

    })
    .catch(error => { 
      return res
        .status(400)
        .send(`${error}`);
    })
};


export const updateTenant = (req, res) => {
  const realm_id = req.params.realmId;
  const {
      name, country, city, address, postcode, email, phone, description
  } = req.body;
  // const updated_at = Date.now()

  pool.query(
    'UPDATE tenants SET name=$1, country=$2, city=$3, address=$4, postcode=$5, email=$6, phone=$7, description=$8 WHERE realm_id=$9',
    [ name, country, city, address, postcode, email, phone, description, realm_id])
    .then(result => {
      return res
        .status(200)
        .send(`The tenant updated successfully`);
    })
    .catch(error => { 
      return res
        .status(400)
        .send(`${error}`);
    })
};



///// Tenant Dashboard
export const getTotalTenantEntity = async (tenantId, table:string) => {
  const response = await pool.query(
    `SELECT COUNT(*) as count FROM ${table} WHERE tenant_id=$1`,
    [ tenantId ]
  );
  return response.rows[0]['count'];
};

export const getLatestTenantAlerts = async (tenantId) => {
  const response = await pool.query(
    `SELECT * FROM device_alerts WHERE tenant_id=$1 ORDER BY created_at DESC LIMIT 100`,
    [ tenantId ]
  );
  return response.rows;
};

export const getLatestTenantTelemetries = async (tenantId) => {
  const response = await pool.query(
    `SELECT * FROM device_telemetries WHERE tenant_id=$1 ORDER BY created_at DESC LIMIT 100`,
    [ tenantId ]
  );
  return response.rows;
};

