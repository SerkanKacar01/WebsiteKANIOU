import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { storage } from './storage';

interface SessionData {
  email: string;
  expiresAt: Date;
  createdAt: Date;
  ip?: string;
}

const sessionStore = new Map<string, SessionData>();
const MAX_SESSIONS = 10;
const SESSION_DURATION = 2 * 60 * 60 * 1000;

let cachedPasswordHash: string | null = null;

async function ensurePasswordHash(): Promise<string | null> {
  if (cachedPasswordHash) return cachedPasswordHash;
  if (!process.env.ADMIN_PASSWORD) return null;

  cachedPasswordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
  return cachedPasswordHash;
}

ensurePasswordHash();

function cleanExpiredSessions(): void {
  const now = new Date();
  sessionStore.forEach((session, id) => {
    if (session.expiresAt < now) {
      sessionStore.delete(id);
    }
  });
}

export function createSession(email: string, ip?: string): { sessionId: string; expiresAt: Date } {
  cleanExpiredSessions();

  if (sessionStore.size >= MAX_SESSIONS) {
    let oldestId = '';
    let oldestTime = new Date();
    sessionStore.forEach((session, id) => {
      if (session.createdAt < oldestTime) {
        oldestTime = session.createdAt;
        oldestId = id;
      }
    });
    if (oldestId) sessionStore.delete(oldestId);
  }

  const sessionId = crypto.randomBytes(48).toString('hex');
  const expiresAt = new Date(Date.now() + SESSION_DURATION);

  sessionStore.set(sessionId, {
    email,
    expiresAt,
    createdAt: new Date(),
    ip,
  });

  return { sessionId, expiresAt };
}

export function validateSession(sessionId: string): { email: string } | null {
  if (!sessionId || typeof sessionId !== 'string') {
    return null;
  }

  if (sessionId.length !== 96 || !/^[a-f0-9]+$/.test(sessionId)) {
    return null;
  }

  const session = sessionStore.get(sessionId);
  if (!session) {
    return null;
  }

  if (session.expiresAt < new Date()) {
    sessionStore.delete(sessionId);
    return null;
  }

  return { email: session.email };
}

export function deleteSession(sessionId: string): void {
  if (sessionId) {
    sessionStore.delete(sessionId);
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
  cleanExpiredSessions();
  return sessionStore.size;
}
