import mysql from 'mysql2/promise';
import { config } from 'dotenv';

config();
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 100,
  connectTimeout: 100000,
});

pool.getConnection().then(() => {
  console.log('Database connected');
});

export default pool;
