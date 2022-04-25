import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

// ('prisma');
// ('sequelize');

export default new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DB,
  user: process.env.DB_USER
});