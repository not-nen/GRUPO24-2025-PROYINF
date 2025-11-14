import pg from "pg";
const { Pool } = pg;

/**
 * para conectarse a la bdd
 */
export const db = new Pool({
  connectionString: process.env.DATABASE_URL
});