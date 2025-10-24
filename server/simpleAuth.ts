// Simple authentication bypass for immediate dashboard access
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

const sessionStore = new Map<string, { email: string; expiresAt: Date }>();

// Failed login attempts tracking for brute force protection
const loginAttempts = new Map<string, { count: number; lockUntil: Date | null }>();
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 30 * 60 * 1000; // 30 minutes

export function createSession(email: string, regenerate: boolean = false): { sessionId: string; expiresAt: Date } {
  // Generate cryptographically secure session ID (256 bits)
  const sessionId = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
  
  sessionStore.set(sessionId, { email, expiresAt });
  
  // Reset login attempts on successful login
  loginAttempts.delete(email);
  
  if (regenerate) {
    console.log('🔄 Session ID regenerated for security (session fixation prevention)');
  }
  
  console.log('💾 Session stored in memory:', {
    sessionId: sessionId.substring(0, 8) + '...',
    email,
    storeSize: sessionStore.size
  });
  return { sessionId, expiresAt };
}

export function regenerateSessionId(oldSessionId: string): { sessionId: string; expiresAt: Date } | null {
  const oldSession = sessionStore.get(oldSessionId);
  if (!oldSession) {
    return null;
  }
  
  // Delete old session
  sessionStore.delete(oldSessionId);
  
  // Create new session with same email but new ID (session fixation prevention)
  return createSession(oldSession.email, true);
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

export async function isValidCredentials(email: string, password: string): Promise<boolean> {
  // Check if account is locked
  const attempts = loginAttempts.get(email);
  if (attempts?.lockUntil && attempts.lockUntil > new Date()) {
    const remainingTime = Math.ceil((attempts.lockUntil.getTime() - Date.now()) / 1000 / 60);
    console.warn(`🔒 SECURITY: Account locked for ${email}. Remaining: ${remainingTime} minutes`);
    return false;
  }
  
  // Verify email is admin account
  if (email !== 'admin@kaniou.be') {
    console.warn(`⚠️  Invalid login attempt for unknown email: ${email}`);
    return false;
  }
  
  // Get bcrypt-hashed password from environment
  const adminPasswordHash = process.env.ADMIN_PASSWORD;
  if (!adminPasswordHash) {
    console.error('🚨 SECURITY: ADMIN_PASSWORD not configured in environment');
    return false;
  }
  
  // SECURITY: Validate that ADMIN_PASSWORD is a bcrypt hash, not plaintext
  // Bcrypt hashes always start with $2a$, $2b$, or $2y$ and are 60 characters
  const bcryptHashRegex = /^\$2[aby]\$\d{2}\$.{53}$/;
  if (!bcryptHashRegex.test(adminPasswordHash)) {
    console.error('🚨 CRITICAL SECURITY ERROR: ADMIN_PASSWORD is not a valid bcrypt hash!');
    console.error('   It appears to be plaintext. Use server/hashPassword.ts to generate a proper hash.');
    console.error('   Authentication is DISABLED until a valid bcrypt hash is provided.');
    return false;
  }
  
  // Verify password using bcrypt (secure constant-time comparison)
  let isPasswordValid = false;
  try {
    isPasswordValid = await bcrypt.compare(password, adminPasswordHash);
  } catch (error) {
    console.error('🚨 SECURITY: Error during password verification:', error);
    return false;
  }
  
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

/**
 * Hash a password using bcrypt (for setting up ADMIN_PASSWORD)
 * Use this function to generate the bcrypt hash for ADMIN_PASSWORD environment variable
 */
export async function hashPassword(plainPassword: string): Promise<string> {
  const saltRounds = 12; // OWASP recommended minimum for 2025
  return await bcrypt.hash(plainPassword, saltRounds);
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