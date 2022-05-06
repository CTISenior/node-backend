import pool from '../connectors/db_connector';

export const getEntityAlerts = async (id, days: number, column:string) => {
  const response = await pool.query(
`
SELECT id, telemetry_key, type, message, status, timestamptz, created_at 
FROM device_alerts 
WHERE ${column}=$1 AND (created_at > CURRENT_DATE - ${days}) 
ORDER BY status asc, created_at desc;
`, 
[ id ])

  return response.rows;
};

export const updateAlertStatus = (req, res) => {
  const id = req.params.id;
  const {
    status,
  } = req.body;

  pool.query(
    'UPDATE device_alerts SET status=$1 WHERE id=$2',
    [ status, id ])
    .then(result => { 
      return res
        .status(200)
        .send(`Alert status updated successfully`);
    })
    .catch(error => { 
      return res
        .status(400)
        .send(`${error}`);
    })
};

export const deleteAlert = (req, res) => {
  const id = req.params.id;

  pool.query(
    'DELETE FROM device_alerts WHERE id=$1', 
    [ id ])
    .then(result => { 
      return res
        .status(200)
        .send(`The alert deleted successfully`);
    })
    .catch(error => { 
      return res
        .status(400)
        .send(`${error}`);
    })
};

export const clearActiveAlerts = async (id, column:string) => {
  const response = await pool.query(
    `UPDATE device_alerts SET status=true WHERE ${column}=$1`,
    [ id ]
  );
  return response
};

export const deleteClearedAlerts = async (id, column:string) => {
  const response = await pool.query(
    `DELETE FROM device_alerts WHERE ${column}=$1 AND status=true`,
    [ id ]
  );
  return response
};


export const getActiveAlertCount = async (id, column:string) => {
  const response = await pool.query(
    `SELECT COUNT(*) as count FROM device_alerts WHERE ${column}=$1 AND status=false`,
    [ id ]
  );
  return response.rows[0]['count'];
};


export const getTotalAlerts = async (id, column:string) => {
  const response = await pool.query(
    `
  SELECT 
  (SELECT COUNT(*)
  FROM device_alerts
  WHERE ${column}=$1 and created_at > now() - interval '1 days'
  ) AS daily_count,
  (SELECT COUNT(*)
  FROM device_alerts
  WHERE ${column}=$1 and created_at > now() - interval '7 days'
  ) AS weekly_count,
  (SELECT COUNT(*)
  FROM device_alerts
  WHERE ${column}=$1 and created_at > now() - interval '30 days'
  ) AS monthly_count,
  (SELECT COUNT(*)
  FROM device_alerts
  WHERE ${column}=$1 and created_at > now() - interval '365 days'
  ) AS yearly_count
    `,
    [ id ]
  );
  return response.rows[0];
};

