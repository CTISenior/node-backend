import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

// ('prisma');
// ('sequelize');

export default new Pool({
  host: process.env.CRDB_HOST,
  port: process.env.CRDB_PORT,
  database: process.env.CRDB_DB,
  user: process.env.CRDB_USER
});