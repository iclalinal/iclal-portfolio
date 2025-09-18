import mysql, { Pool } from "mysql2/promise";

const {
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASS,
} = process.env;

const isDbConfigured = Boolean(DB_HOST && DB_NAME && DB_USER && DB_PASS);
const connectionLimit = Number.parseInt(process.env.DB_CONNECTION_LIMIT ?? "5", 10) || 5;

declare global {
  // eslint-disable-next-line no-var
  var __MYSQL_POOL__: Pool | undefined;
}

const pool: Pool | undefined = isDbConfigured
  ? globalThis.__MYSQL_POOL__ ?? mysql.createPool({
      host: DB_HOST,
      user: DB_USER,
      database: DB_NAME,
      password: DB_PASS,
      waitForConnections: true,
      connectionLimit,
      charset: "utf8mb4_unicode_520_ci",
    })
  : undefined;

if (process.env.NODE_ENV !== "production" && isDbConfigured && pool) {
  globalThis.__MYSQL_POOL__ = pool;
}

export { isDbConfigured };
export default pool;
