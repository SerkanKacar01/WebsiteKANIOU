// Simple authentication bypass for immediate dashboard access
import crypto from 'crypto';

const sessionStore = new Map<string, { email: string; expiresAt: Date }>();

export function createSession(email: string): { sessionId: string; expiresAt: Date } {
  const sessionId = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
  
  sessionStore.set(sessionId, { email, expiresAt });
  console.log('💾 Session stored in memory:', {
    sessionId: sessionId.substring(0, 8) + '...',
    email,
    storeSize: sessionStore.size
  });
  return { sessionId, expiresAt };
}

export function validateSession(sessionId: string): { email: string } | null {
  if (!sessionId) {
    console.log('🔍 Session validation: no sessionId provided');
    return null;
  }
  
  console.log('🔍 Validating session:', {
    sessionId: sessionId.substring(0, 8) + '...',
    storeSize: sessionStore.size,
    hasSession: sessionStore.has(sessionId)
  });
  
  const session = sessionStore.get(sessionId);
  if (!session) {
    console.log('❌ Session not found in store');
    return null;
  }
  
  if (session.expiresAt < new Date()) {
    console.log('❌ Session expired, deleting');
    sessionStore.delete(sessionId);
    return null;
  }
  
  console.log('✅ Session valid for:', session.email);
  return { email: session.email };
}

export function deleteSession(sessionId: string): void {
  if (sessionId) {
    sessionStore.delete(sessionId);
  }
}

export function isValidCredentials(email: string, password: string): boolean {
  return email === 'admin@kaniou.be' && password === process.env.ADMIN_PASSWORD;
}