// GET ->>>>  /api/v1/telemetry

import pool from '../connectors/db_connector';

export const getEntityTelemetries = async (id, limit: number, column:string) => {
  const response = await pool.query(
`
SELECT devices.name as device_name, dt.id, dt.values, dt.created_at, dt.timestamptz 
FROM device_telemetries dt
INNER JOIN devices ON devices.id = dt.device_id
WHERE dt.${column}=$1 
ORDER BY dt.created_at DESC LIMIT $2;
`, 
[ id, limit ])

  return response.rows;
};

export const getTimeseriesTelemetries = async (id, sensorType:string, column:string) => {

  const response = await pool.query(
`
SELECT AVG((values->>'${sensorType}')::numeric) as value, 

extract(year from device_telemetries."timestamptz") || '-' 
|| extract(month from device_telemetries."timestamptz")  || '-' 
|| extract(day from device_telemetries."timestamptz") as date

FROM device_telemetries
WHERE ${column}=$1

GROUP BY extract(year from device_telemetries."timestamptz"),
extract(month from device_telemetries."timestamptz"),
extract(day from device_telemetries."timestamptz")
`, 
    [ id ])


    return response.rows;
};

export const getChartTelemetries = async (id, sensorType: string, sensorType2: string, days: number, column: string) => {

  const response = await pool.query(
`
SELECT AVG((values->>'${sensorType}')::numeric) as ${sensorType},  AVG((values->>'${sensorType2}')::numeric) as ${sensorType2}, 
extract(year from device_telemetries."timestamptz") || '-' 
|| extract(month from device_telemetries."timestamptz")  || '-' 
|| extract(day from device_telemetries."timestamptz")  || ' ' 
|| extract(hour from device_telemetries."timestamptz")  || ':00:00:000' as date

FROM device_telemetries
WHERE ${column}=$1 AND (device_telemetries."timestamptz" > CURRENT_DATE - ${days})

GROUP BY extract(year from device_telemetries."timestamptz"),
extract(month from device_telemetries."timestamptz"),
extract(day from device_telemetries."timestamptz"),
extract(hour from device_telemetries."timestamptz");
`, 
  [ id])

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


export const getAvgTelemetryValue = async (id, column:string, sensorType:string) => {

   const response = await pool.query(
    `
SELECT 
(SELECT AVG((values->>'${sensorType}')::numeric)
FROM device_telemetries
WHERE ${column}=$1 and timestamptz > now() - interval '1 days'  
) AS daily_avg,
(SELECT AVG((values->>'${sensorType}')::numeric)
FROM device_telemetries
WHERE ${column}=$1 and timestamptz > now() - interval '7 days'  
) AS weekly_avg,
(SELECT AVG((values->>'${sensorType}')::numeric)
FROM device_telemetries
WHERE ${column}=$1 and timestamptz > now() - interval '30 days'  
) AS monthly_avg,
(SELECT AVG((values->>'${sensorType}')::numeric)
FROM device_telemetries
WHERE ${column}=$1 and timestamptz > now() - interval '365 days'  
) AS yearly_avg
    `,
    [ id ])

    return response.rows[0];
};


export const getMaxTelemetryValue = async (id, column:string, sensorType:string) => {

  const response = await pool.query(
    `
SELECT 
(SELECT MAX((values->>'${sensorType}')::numeric)
FROM device_telemetries
WHERE ${column}=$1 and timestamptz > now() - interval '1 days'  
) AS daily_max,
(SELECT MAX((values->>'${sensorType}')::numeric)
FROM device_telemetries
WHERE ${column}=$1 and timestamptz > now() - interval '7 days'  
) AS weekly_max,
(SELECT MAX((values->>'${sensorType}')::numeric)
FROM device_telemetries
WHERE ${column}=$1 and timestamptz > now() - interval '30 days'  
) AS monthly_max,
(SELECT MAX((values->>'${sensorType}')::numeric)
FROM device_telemetries
WHERE ${column}=$1 and timestamptz > now() - interval '365 days'  
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
WHERE ${column}=$1 and timestamptz > now() - interval '1 days'
) AS daily_count,
(SELECT COUNT(*)
FROM device_telemetries
WHERE ${column}=$1 and timestamptz > now() - interval '7 days'
) AS weekly_count,
(SELECT COUNT(*)
FROM device_telemetries
WHERE ${column}=$1 and timestamptz > now() - interval '30 days'
) AS monthly_count,
(SELECT COUNT(*)
FROM device_telemetries
WHERE ${column}=$1 and timestamptz > now() - interval '365 days'
) AS yearly_count
    `,
    [ id ]
  );

  return response.rows[0];
};
