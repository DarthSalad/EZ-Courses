import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

// let localPoolConfig = {
//   user: 'postgres',
//   password: '123',
//   host: 'localhost',
//   port: '5432',
//   database: 'jwtdb'
// };

const poolConfig = {
  connectionString: process.env.DATABASE_URL,
  // ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
};
// const poolConfig = process.env.DATABASE_URL ? {
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// } : localPoolConfig;

const pool = new Pool(poolConfig);
// console.log(process.env.DATABASE_URL);
export default pool;
