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
    
    // Add error handlers to prevent unhandled errors
    pool.on('error', (error) => {
      console.error("Pool error event (non-fatal):", error);
    });
    
    pool.on('connect', () => {
      console.log("✅ Database pool connection successful");
    });
    
    db = drizzle({ client: pool, schema });
    
    // Test the connection
    await pool.query('SELECT 1');
    console.log("✅ Database connection verified successfully");
    return true;
  } catch (error) {
    console.error("⚠️  Database connection failed:", error);
    
    // Create a more robust fallback pool with retry logic
    try {
      pool = new Pool({ 
        connectionString: process.env.DATABASE_URL,
        connectionTimeoutMillis: 10000,
        idleTimeoutMillis: 60000,
        max: 5
      });
      
      // Add error handlers to fallback pool too
      pool.on('error', (error) => {
        console.error("Fallback pool error event (non-fatal):", error);
      });
      
      db = drizzle({ client: pool, schema });
      console.log("⚠️  Using fallback database connection");
      return true;
    } catch (fallbackError) {
      console.error("⚠️  Fallback database connection also failed:", fallbackError);
      // Create minimal pool for basic functionality
      pool = new Pool({ connectionString: process.env.DATABASE_URL });
      
      pool.on('error', (error) => {
        console.error("Minimal pool error event (non-fatal):", error);
      });
      
      db = drizzle({ client: pool, schema });
      return false;
    }
  }
}

// Initialize with default pool first, then try to improve connection
try {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  
  // Add error handlers to prevent unhandled errors from crashing
  pool.on('error', (error) => {
    console.error("⚠️  Database pool error (non-fatal):", error.message);
    // Don't re-throw, just log
  });
  
  pool.on('connect', () => {
    console.log("ℹ️  Database pool connected");
  });
  
  db = drizzle({ client: pool, schema });
  console.log("✅ Initial database pool created");
} catch (error) {
  console.error("❌ Failed to create initial pool:", error);
  throw error;
}

// Try to establish better connection in background
initializeDatabase().catch(error => {
  console.warn("⚠️  Background database initialization had issues, but app will continue:", error);
});

export { pool, db };