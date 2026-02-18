import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@shared/schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

let pool: pg.Pool;
let db: ReturnType<typeof drizzle>;
let dbAvailable = false;

try {
  pool = new Pool({ 
    connectionString: process.env.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });

  pool.on('error', (error) => {
    console.error("Database pool error (non-fatal):", error.message);
    dbAvailable = false;
  });

  db = drizzle(pool, { schema });

  pool.query('SELECT 1').then(() => {
    dbAvailable = true;
    console.log("Database connection verified successfully");
  }).catch((err) => {
    dbAvailable = false;
    console.warn("Database connection failed:", err.message);
    console.warn("Application will continue with in-memory storage fallback");
  });
} catch (error: any) {
  console.warn("Database pool creation failed:", error.message);
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle(pool, { schema });
  dbAvailable = false;
}

function isDatabaseAvailable(): boolean {
  return dbAvailable;
}

export { pool, db, isDatabaseAvailable };
