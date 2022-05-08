import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

// ('prisma');
// ('sequelize');


const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  /*ssl: {
    rejectUnauthorized: false,
    ca: fs.readFileSync('/path/to/server-certificates/root.crt').toString(),
    key: fs.readFileSync('/path/to/client-key/postgresql.key').toString(),
    cert: fs.readFileSync('/path/to/client-certificates/postgresql.crt').toString(),
  },*/
})

/*pool
  .connect()
  .then(client => {
    console.log('Connected to DB pool')
    client.release()
  })
  .catch(err => console.error('Error connecting', err.stack))*/

export default pool ;