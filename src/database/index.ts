import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

type pgConfig = {
  connectionString: string;
  ssl?: {
    rejectUnauthorized: boolean;
  };
};

const configDatabase: pgConfig = { connectionString: process.env.DATABASE_URL };
if (process.env.MODE !== 'DEV') {
  configDatabase.ssl = {
    rejectUnauthorized: false,
  };
}
const db = new Pool(configDatabase);
export default db;
