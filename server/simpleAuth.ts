import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { storage } from './storage';
import { pool } from './db';

interface SessionData {
  email: string;
  expiresAt: Date;
  createdAt: Date;
  ip?: string;
}

const memoryCache = new Map<string, SessionData>();
const MAX_CACHE_SIZE = 20;
const SESSION_DURATION = 2 * 60 * 60 * 1000;

let cachedPasswordHash: string | null = null;

async function ensurePasswordHash(): Promise<string | null> {
  if (cachedPasswordHash) return cachedPasswordHash;
  if (!process.env.ADMIN_PASSWORD) return null;

  cachedPasswordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
  return cachedPasswordHash;
}

ensurePasswordHash();

function cleanMemoryCache(): void {
  const now = new Date();
  memoryCache.forEach((session, id) => {
    if (session.expiresAt < now) {
      memoryCache.delete(id);
    }
  });
  if (memoryCache.size > MAX_CACHE_SIZE) {
    let oldestId = '';
    let oldestTime = new Date();
    memoryCache.forEach((session, id) => {
      if (session.createdAt < oldestTime) {
        oldestTime = session.createdAt;
        oldestId = id;
      }
    });
    if (oldestId) memoryCache.delete(oldestId);
  }
}

async function cleanExpiredDbSessions(): Promise<void> {
  try {
    await pool.query('DELETE FROM admin_sessions WHERE expires_at < NOW()');
  } catch {}
}

export async function createSession(email: string, ip?: string): Promise<{ sessionId: string; expiresAt: Date }> {
  cleanMemoryCache();
  await cleanExpiredDbSessions();

  const sessionId = crypto.randomBytes(48).toString('hex');
  const expiresAt = new Date(Date.now() + SESSION_DURATION);

  let dbSuccess = false;
  try {
    let adminUserId = 1;
    try {
      const adminUser = await storage.getAdminUserByEmail(email);
      if (adminUser) adminUserId = adminUser.id;
    } catch {}

    await pool.query(
      'INSERT INTO admin_sessions (session_id, admin_user_id, expires_at, created_at) VALUES ($1, $2, $3, NOW())',
      [sessionId, adminUserId, expiresAt]
    );
    dbSuccess = true;
    console.log('✅ Session stored in database');
  } catch (dbError) {
    console.warn('Database session storage failed, using memory fallback');
  }

  if (!dbSuccess) {
    memoryCache.set(sessionId, {
      email,
      expiresAt,
      createdAt: new Date(),
      ip,
    });
  }

  return { sessionId, expiresAt };
}

export async function validateSession(sessionId: string): Promise<{ email: string } | null> {
  if (!sessionId || typeof sessionId !== 'string') {
    return null;
  }

  if (sessionId.length !== 96 || !/^[a-f0-9]+$/.test(sessionId)) {
    return null;
  }

  cleanMemoryCache();

  const memSession = memoryCache.get(sessionId);
  if (memSession && memSession.expiresAt > new Date()) {
    return { email: memSession.email };
  }

  try {
    const result = await pool.query(
      `SELECT s.session_id, s.expires_at, u.email 
       FROM admin_sessions s 
       JOIN admin_users u ON s.admin_user_id = u.id 
       WHERE s.session_id = $1 AND s.expires_at > NOW()`,
      [sessionId]
    );

    if (result.rows.length > 0) {
      const row = result.rows[0];
      return { email: row.email };
    }
  } catch (dbError) {
    console.warn('Database session validation failed:', dbError);
  }

  return null;
}

export async function deleteSession(sessionId: string): Promise<void> {
  if (sessionId) {
    memoryCache.delete(sessionId);
    try {
      await pool.query('DELETE FROM admin_sessions WHERE session_id = $1', [sessionId]);
    } catch {}
  }
}

export async function isValidCredentialsAsync(email: string, password: string): Promise<boolean> {
  if (!email || !password) return false;
  if (typeof email !== 'string' || typeof password !== 'string') return false;
  if (email !== 'admin@kaniou.be') return false;

  try {
    const adminUser = await storage.getAdminUserByEmail(email);
    if (adminUser && adminUser.passwordHash) {
      return await bcrypt.compare(password, adminUser.passwordHash);
    }
  } catch {
  }

  if (!process.env.ADMIN_PASSWORD) return false;
  const hash = await ensurePasswordHash();
  if (!hash) return false;

  return await bcrypt.compare(password, hash);
}

export function isValidCredentials(email: string, password: string): boolean {
  if (!email || !password) return false;
  if (typeof email !== 'string' || typeof password !== 'string') return false;
  if (email !== 'admin@kaniou.be') return false;
  if (!process.env.ADMIN_PASSWORD) return false;

  const key = crypto.randomBytes(32);
  const inputHash = crypto.createHmac('sha256', key).update(password).digest();
  const expectedHash = crypto.createHmac('sha256', key).update(process.env.ADMIN_PASSWORD).digest();

  return crypto.timingSafeEqual(inputHash, expectedHash);
}

export function getActiveSessionCount(): number {
  return memoryCache.size;
}
