import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

export interface FallbackAuthData {
  sessionId: string;
  adminId: number;
  email: string;
  expiresAt: Date;
}

// Memory store for sessions when database is unavailable
const memorySessionStore = new Map<string, FallbackAuthData>();

export class FallbackAuth {
  private static readonly SESSION_DURATION = 2 * 60 * 60 * 1000; // 2 hours

  static generateSessionId(): string {
    return randomBytes(32).toString("hex");
  }

  static async login(email: string, password: string): Promise<FallbackAuthData | null> {
    // Direct authentication using environment credentials
    if (email === 'admin@kaniou.be' && password === process.env.ADMIN_PASSWORD) {
      const sessionId = this.generateSessionId();
      const expiresAt = new Date(Date.now() + this.SESSION_DURATION);
      
      const authData: FallbackAuthData = {
        sessionId,
        adminId: 1,
        email: 'admin@kaniou.be',
        expiresAt
      };

      // Store in memory
      memorySessionStore.set(sessionId, authData);
      
      console.log('Fallback admin authentication successful');
      return authData;
    }

    return null;
  }

  static async validateSession(sessionId: string): Promise<FallbackAuthData | null> {
    if (!sessionId) {
      return null;
    }

    const session = memorySessionStore.get(sessionId);
    if (!session) {
      return null;
    }

    // Check if session is expired
    if (session.expiresAt < new Date()) {
      memorySessionStore.delete(sessionId);
      return null;
    }

    return session;
  }

  static async logout(sessionId: string): Promise<void> {
    if (sessionId) {
      memorySessionStore.delete(sessionId);
    }
  }

  static async cleanupExpiredSessions(): Promise<void> {
    const now = new Date();
    for (const [sessionId, session] of memorySessionStore.entries()) {
      if (session.expiresAt < now) {
        memorySessionStore.delete(sessionId);
      }
    }
  }
}