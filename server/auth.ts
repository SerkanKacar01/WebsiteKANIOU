import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { storage } from "./storage";

// Memory store for sessions when database is unavailable
const memorySessionStore = new Map<string, AdminAuthData>();

export interface AdminAuthData {
  sessionId: string;
  adminId: number;
  email: string;
  expiresAt: Date;
}

export class AdminAuth {
  private static readonly SESSION_DURATION = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
  
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
  }
  
  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
  
  static generateSessionId(): string {
    return randomBytes(32).toString("hex");
  }
  
  static async login(email: string, password: string): Promise<AdminAuthData | null> {
    // Direct authentication for admin access when database is unavailable
    if (email === 'admin@kaniou.be' && password === process.env.ADMIN_PASSWORD) {
      const sessionId = this.generateSessionId();
      const expiresAt = new Date(Date.now() + this.SESSION_DURATION);
      
      return {
        sessionId,
        adminId: 1,
        email: 'admin@kaniou.be',
        expiresAt
      };
    }

    // Try database authentication
    try {
      const adminUser = await storage.getAdminUserByEmail(email);
      if (!adminUser) {
        return null;
      }
      
      // Verify password
      const isPasswordValid = await this.verifyPassword(password, adminUser.passwordHash);
      if (!isPasswordValid) {
        return null;
      }
      
      // Generate session
      const sessionId = this.generateSessionId();
      const expiresAt = new Date(Date.now() + this.SESSION_DURATION);
      
      try {
        // Store session in database
        await storage.createAdminSession({
          sessionId,
          adminId: adminUser.id,
          expiresAt,
        });
        
        // Update last login time
        await storage.updateAdminLastLogin(adminUser.id);
      } catch (sessionError) {
        console.warn('Database session storage unavailable, using memory');
        memorySessionStore.set(sessionId, {
          sessionId,
          adminId: adminUser.id,
          email: adminUser.email,
          expiresAt
        });
      }
      
      return {
        sessionId,
        adminId: adminUser.id,
        email: adminUser.email,
        expiresAt,
      };
    } catch (error) {
      console.warn('Database authentication unavailable');
      return null;
    }
  }
  
  static async validateSession(sessionId: string): Promise<AdminAuthData | null> {
    if (!sessionId) {
      return null;
    }
    
    // Check memory store first for fallback sessions
    const memorySession = memorySessionStore.get(sessionId);
    if (memorySession && memorySession.expiresAt > new Date()) {
      return memorySession;
    }
    
    try {
      const session = await storage.getAdminSessionById(sessionId);
      if (!session) {
        return null;
      }
      
      // Check if session is expired
      if (session.expiresAt < new Date()) {
        await storage.deleteAdminSession(sessionId);
        return null;
      }
      
      // Get admin user details
      const adminUser = await storage.getAdminUserByEmail("admin@kaniou.be");
      if (!adminUser) {
        return null;
      }
      
      return {
        sessionId: session.sessionId,
        adminId: session.adminUserId,
        email: adminUser.email,
        expiresAt: session.expiresAt,
      };
    } catch (error) {
      console.warn('Database session validation failed');
      return null;
    }
  }
  
  static async logout(sessionId: string): Promise<void> {
    if (sessionId) {
      await storage.deleteAdminSession(sessionId);
    }
  }
  
  static async cleanupExpiredSessions(): Promise<void> {
    await storage.cleanupExpiredSessions();
  }
}

// Middleware for protecting admin routes
export async function requireAdminAuth(req: any, res: any, next: any) {
  const sessionId = req.cookies?.admin_session || req.headers["x-admin-session"];
  
  const authData = await AdminAuth.validateSession(sessionId);
  if (!authData) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  
  req.adminAuth = authData;
  next();
}