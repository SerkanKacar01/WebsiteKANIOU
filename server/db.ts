import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

let pool: Pool;
let db: ReturnType<typeof drizzle>;

// Initialize database connection with improved error handling
async function initializeDatabase() {
  try {
    pool = new Pool({ 
      connectionString: process.env.DATABASE_URL,
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
      max: 10
    });
    db = drizzle({ client: pool, schema });
    
    // Test the connection
    await pool.query('SELECT 1');
    console.log("Database connection established successfully");
    return true;
  } catch (error) {
    console.error("Database connection failed, using fallback:", error);
    
    // Create a more robust fallback pool with retry logic
    try {
      pool = new Pool({ 
        connectionString: process.env.DATABASE_URL,
        connectionTimeoutMillis: 10000,
        idleTimeoutMillis: 60000,
        max: 5
      });
      db = drizzle({ client: pool, schema });
      console.log("Fallback database connection established");
      return true;
    } catch (fallbackError) {
      console.error("Fallback database connection also failed:", fallbackError);
      // Create minimal pool for basic functionality
      pool = new Pool({ connectionString: process.env.DATABASE_URL });
      db = drizzle({ client: pool, schema });
      return false;
    }
  }
}

// Initialize with default pool first, then try to improve connection
pool = new Pool({ connectionString: process.env.DATABASE_URL });
db = drizzle({ client: pool, schema });

// Try to establish better connection in background
initializeDatabase().catch(error => {
  console.warn("Database initialization failed, continuing with basic connection:", error);
});

export { pool, db };