import { Request, Response, NextFunction } from 'express';
import { randomBytes, createHmac } from 'crypto';

// CSRF Token Management
// Eenvoudige maar veilige implementatie voor formulier bescherming

interface CSRFTokenData {
  token: string;
  timestamp: number;
  sessionId: string;
}

const csrfTokenStore = new Map<string, CSRFTokenData>();
const TOKEN_EXPIRY = 60 * 60 * 1000; // 1 uur geldig

/**
 * Genereer een veilige CSRF token
 */
export function generateCSRFToken(sessionId: string): string {
  // Maak een random token
  const token = randomBytes(32).toString('hex');
  
  // Sla op met tijdstempel
  csrfTokenStore.set(token, {
    token,
    timestamp: Date.now(),
    sessionId: sessionId || 'anonymous'
  });
  
  // Ruim oude tokens op
  cleanupExpiredTokens();
  
  return token;
}

/**
 * Valideer CSRF token
 */
export function validateCSRFToken(token: string, sessionId: string): boolean {
  if (!token) return false;
  
  const tokenData = csrfTokenStore.get(token);
  if (!tokenData) return false;
  
  // Controleer of token niet verlopen is
  if (Date.now() - tokenData.timestamp > TOKEN_EXPIRY) {
    csrfTokenStore.delete(token);
    return false;
  }
  
  // Controleer of token bij juiste sessie hoort
  if (tokenData.sessionId !== (sessionId || 'anonymous')) {
    return false;
  }
  
  // Token is geldig - verwijder na gebruik (single-use)
  csrfTokenStore.delete(token);
  return true;
}

/**
 * Ruim verlopen tokens op
 */
function cleanupExpiredTokens(): void {
  const now = Date.now();
  const tokensToDelete: string[] = [];
  
  csrfTokenStore.forEach((data, token) => {
    if (now - data.timestamp > TOKEN_EXPIRY) {
      tokensToDelete.push(token);
    }
  });
  
  tokensToDelete.forEach(token => csrfTokenStore.delete(token));
}

/**
 * CSRF bescherming middleware voor formulieren
 */
export function csrfProtection(req: Request, res: Response, next: NextFunction) {
  // Skip voor GET requests (alleen POST/PUT/DELETE beschermen)
  if (req.method === 'GET' || req.method === 'HEAD' || req.method === 'OPTIONS') {
    return next();
  }
  
  const token = req.body._csrfToken || req.headers['x-csrf-token'];
  const sessionId = (req.session as any)?.sessionId || req.cookies?.sessionId || 'anonymous';
  
  if (!validateCSRFToken(token, sessionId)) {
    console.warn('🚨 SECURITY: CSRF token validation failed:', {
      ip: req.ip,
      path: req.path,
      method: req.method,
      hasToken: !!token,
      sessionId: sessionId ? sessionId.substring(0, 8) + '...' : 'none'
    });
    
    return res.status(403).json({
      error: 'Invalid security token. Please refresh the page and try again.',
      code: 'CSRF_TOKEN_INVALID'
    });
  }
  
  next();
}

/**
 * Endpoint om CSRF token op te halen
 */
export function csrfTokenEndpoint(req: Request, res: Response) {
  const sessionId = (req.session as any)?.sessionId || req.cookies?.sessionId || 'anonymous';
  const token = generateCSRFToken(sessionId);
  
  res.json({
    csrfToken: token,
    expires: Date.now() + TOKEN_EXPIRY
  });
}