import { AdminAuth } from "./auth";
import { storage } from "./storage";

export async function initializeAdminUser() {
  try {
    const adminEmail = "admin@kaniou.be";
    
    // Check if admin user already exists
    const existingAdmin = await storage.getAdminUserByEmail(adminEmail);
    if (existingAdmin) {
      console.log("Admin user already exists, skipping initialization");
      return;
    }
    
    // Get password from environment
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      console.warn("ADMIN_PASSWORD not set, skipping admin user creation");
      return;
    }
    
    // Hash the password
    const passwordHash = await AdminAuth.hashPassword(adminPassword);
    
    // Create admin user
    await storage.createAdminUser({
      email: adminEmail,
      passwordHash,
    });
    
    console.log("Admin user created successfully:", adminEmail);
  } catch (error) {
    console.error("Error initializing admin user:", error);
  }
}

// Cleanup expired sessions periodically
export function startSessionCleanup() {
  setInterval(async () => {
    try {
      await AdminAuth.cleanupExpiredSessions();
    } catch (error) {
      console.error("Error cleaning up expired sessions:", error);
    }
  }, 60 * 60 * 1000); // Run every hour
}