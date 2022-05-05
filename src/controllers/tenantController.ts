import pool from '../connectors/db_connector';


export const getTenant = (req, res) => {
  const id = req.params.id

  pool.query(
    'SELECT * FROM tenants WHERE realm_id=$1', 
    [ id ])
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
    `
SELECT devices.*, assets.name as asset_name
FROM devices 
INNER JOIN assets ON assets.id = devices.asset_id
WHERE devices.tenant_id=$1
ORDER BY devices.created_at asc;
    `,
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

export const getTenantActiveAlerts = (req, res) => {
  const tenantId = req.params.tenantId;
  const limit = req.query.limit ? req.query.limit : 100; // api/v1/tenants/:tenantId/alerts?limit=100

  pool.query(
`
SELECT devices.name as device_name, da.device_id, da.id, da.telemetry_key, da.type, da.message, da.timestamptz, da.created_at
FROM device_alerts da
INNER JOIN devices ON devices.id = da.device_id
WHERE da.tenant_id=$1 AND da.status=false
ORDER BY da.created_at DESC LIMIT $2;
`,
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


///// Tenant Dashboard
export const getTotalTenantEntity = async (tenantId) => {
  const response = await pool.query(
`
SELECT 
(SELECT COUNT(*)
FROM assets
WHERE tenant_id=$1
) AS asset_count,
(SELECT COUNT(*)
FROM devices
WHERE tenant_id=$1
) AS device_count
`,
    [ tenantId ]
  );
  return response.rows[0];
};

export const getLatestTenantAlerts = async (tenantId) => {
  const response = await pool.query(
`
SELECT devices.name as device_name, da.telemetry_key, da.type, da.message, da.status, da.timestamptz, da.created_at
FROM device_alerts da
INNER JOIN devices ON devices.id = da.device_id
WHERE da.tenant_id=$1
ORDER BY da.created_at DESC LIMIT 20;
`,
    [ tenantId ]
  );
  return response.rows;
};

export const getLatestTenantTelemetries = async (tenantId) => {
  const response = await pool.query(
`
SELECT devices.name as device_name, dt.value, dt.timestamptz, dt.created_at
FROM device_telemetries dt
INNER JOIN devices ON devices.id = dt.device_id
WHERE dt.tenant_id=$1
ORDER BY dt.created_at DESC LIMIT 20;
`,
    [ tenantId ]
  );
  return response.rows;
};


export const insertTenant = (req, res) => {
  const {
    realm_id, client_id, name, country, city, address, postcode, email, phone, description
  } = req.body;

  pool.query(
`
INSERT INTO tenants (realm_id, client_id, name, country, city, address, postcode, email, phone, description) 
VALUES ($1, $2, $3, $4, $5, $6, $7 ,$8, $9, $10);
`, 
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
  const id = req.params.id;
  const {
      name, country, city, address, postcode, email, phone, description
  } = req.body;
  // const updated_at = Date.now()

  pool.query(
`
UPDATE tenants 
SET name=$1, country=$2, city=$3, address=$4, postcode=$5, email=$6, phone=$7, description=$8 
WHERE realm_id=$9;
`,
    [ name, country, city, address, postcode, email, phone, description, id])
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
