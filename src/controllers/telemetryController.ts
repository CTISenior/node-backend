// GET ->>>>  /api/v1/telemetry

import pool from '../connectors/db_connector';

export const getEntityTelemetries = async (id, limit: number, column:string) => {
  const response = await pool.query(
`
SELECT value, created_at, timestamptz 
FROM device_telemetries 
WHERE ${column}=$1 
ORDER BY created_at DESC LIMIT $2;
`, 
[ id, limit ])

  return response.rows;
};

export const deleteTelemetry = (req, res) => {
  const id = req.params.id;

  pool.query(
    'DELETE FROM device_telemetries WHERE id=$1', 
    [ id ])
    .then(result => { 
      return res
        .status(200)
        .send(`The telemetry deleted successfully`);
    })
    .catch(error => { 
      return res
        .status(400)
        .send(`${error}`);
    })
};


export const getAvgTelemetryValue = async (id, column:string, type:string) => {

   const response = await pool.query(
    `
SELECT 
(SELECT AVG((value->>'${type}')::numeric)
FROM device_telemetries
WHERE ${column}=$1 and created_at > now() - interval '1 days'  
) AS daily_avg,
(SELECT AVG((value->>'${type}')::numeric)
FROM device_telemetries
WHERE ${column}=$1 and created_at > now() - interval '7 days'  
) AS weekly_avg,
(SELECT AVG((value->>'${type}')::numeric)
FROM device_telemetries
WHERE ${column}=$1 and created_at > now() - interval '30 days'  
) AS monthly_avg,
(SELECT AVG((value->>'${type}')::numeric)
FROM device_telemetries
WHERE ${column}=$1 and created_at > now() - interval '365 days'  
) AS yearly_avg
    `,
    [ id ])

    return response.rows[0];
};


export const getMaxTelemetryValue = async (id, column:string, type:string) => {

  const response = await pool.query(
    `
SELECT 
(SELECT MAX((value->>'${type}')::numeric)
FROM device_telemetries
WHERE ${column}=$1 and created_at > now() - interval '1 days'  
) AS daily_max,
(SELECT MAX((value->>'${type}')::numeric)
FROM device_telemetries
WHERE ${column}=$1 and created_at > now() - interval '7 days'  
) AS weekly_max,
(SELECT MAX((value->>'${type}')::numeric)
FROM device_telemetries
WHERE ${column}=$1 and created_at > now() - interval '30 days'  
) AS monthly_max,
(SELECT MAX((value->>'${type}')::numeric)
FROM device_telemetries
WHERE ${column}=$1 and created_at > now() - interval '365 days'  
) AS yearly_max
    `,
    [ id ])

    return response.rows[0];
};


export const getTotalTelemetry = async (id, column:string) => {
  const response = await pool.query(
    `
SELECT 
(SELECT COUNT(*)
FROM device_telemetries
WHERE ${column}=$1 and created_at > now() - interval '1 days'
) AS daily_count,
(SELECT COUNT(*)
FROM device_telemetries
WHERE ${column}=$1 and created_at > now() - interval '7 days'
) AS weekly_count,
(SELECT COUNT(*)
FROM device_telemetries
WHERE ${column}=$1 and created_at > now() - interval '30 days'
) AS monthly_count,
(SELECT COUNT(*)
FROM device_telemetries
WHERE ${column}=$1 and created_at > now() - interval '365 days'
) AS yearly_count
    `,
    [ id ]
  );

  return response.rows[0];
};
