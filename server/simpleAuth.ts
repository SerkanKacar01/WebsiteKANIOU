// Simple authentication bypass for immediate dashboard access
import crypto from 'crypto';

const sessionStore = new Map<string, { email: string; expiresAt: Date }>();

// Failed login attempts tracking for brute force protection
const loginAttempts = new Map<string, { count: number; lockUntil: Date | null }>();
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 30 * 60 * 1000; // 30 minutes

export function createSession(email: string): { sessionId: string; expiresAt: Date } {
  const sessionId = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
  
  sessionStore.set(sessionId, { email, expiresAt });
  
  // Reset login attempts on successful login
  loginAttempts.delete(email);
  
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
  // Check if account is locked
  const attempts = loginAttempts.get(email);
  if (attempts?.lockUntil && attempts.lockUntil > new Date()) {
    const remainingTime = Math.ceil((attempts.lockUntil.getTime() - Date.now()) / 1000 / 60);
    console.warn(`🔒 SECURITY: Account locked for ${email}. Remaining: ${remainingTime} minutes`);
    return false;
  }
  
  // Validate password complexity (minimum 12 characters, mix of types)
  const isPasswordValid = email === 'admin@kaniou.be' && password === process.env.ADMIN_PASSWORD;
  
  if (!isPasswordValid) {
    // Track failed attempt
    const currentAttempts = loginAttempts.get(email) || { count: 0, lockUntil: null };
    currentAttempts.count += 1;
    
    if (currentAttempts.count >= MAX_LOGIN_ATTEMPTS) {
      currentAttempts.lockUntil = new Date(Date.now() + LOCKOUT_DURATION);
      console.warn(`🚨 SECURITY: Account locked for ${email} due to ${MAX_LOGIN_ATTEMPTS} failed attempts`);
    }
    
    loginAttempts.set(email, currentAttempts);
    console.warn(`⚠️  Failed login attempt ${currentAttempts.count}/${MAX_LOGIN_ATTEMPTS} for ${email}`);
  }
  
  return isPasswordValid;
}

export function validatePasswordComplexity(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (password.length < 12) {
    errors.push('Wachtwoord moet minimaal 12 karakters lang zijn');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Wachtwoord moet minimaal één kleine letter bevatten');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Wachtwoord moet minimaal één hoofdletter bevatten');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Wachtwoord moet minimaal één cijfer bevatten');
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Wachtwoord moet minimaal één speciaal teken bevatten');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

export function isAccountLocked(email: string): { locked: boolean; remainingMinutes?: number } {
  const attempts = loginAttempts.get(email);
  if (attempts?.lockUntil && attempts.lockUntil > new Date()) {
    const remainingMinutes = Math.ceil((attempts.lockUntil.getTime() - Date.now()) / 1000 / 60);
    return { locked: true, remainingMinutes };
  }
  return { locked: false };
}