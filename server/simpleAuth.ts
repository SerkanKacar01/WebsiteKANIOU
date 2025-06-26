// Simple authentication bypass for immediate dashboard access
const sessionStore = new Map<string, { email: string; expiresAt: Date }>();

export function createSession(email: string): { sessionId: string; expiresAt: Date } {
  const sessionId = require('crypto').randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
  
  sessionStore.set(sessionId, { email, expiresAt });
  return { sessionId, expiresAt };
}

export function validateSession(sessionId: string): { email: string } | null {
  if (!sessionId) return null;
  
  const session = sessionStore.get(sessionId);
  if (!session || session.expiresAt < new Date()) {
    if (session) sessionStore.delete(sessionId);
    return null;
  }
  
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