import { Request, Response, NextFunction } from 'express';

// Enhanced rate limiter with spam protection
interface RateLimitRecord {
  count: number;
  resetTime: number;
  suspiciousAttempts: number;
  lastAttempt: number;
}

const rateLimitStore: Map<string, RateLimitRecord> = new Map();
const suspiciousIPs = new Set<string>();

// Options for rate limiting
const MAX_REQUESTS = 5; // Maximum requests per window
const WINDOW_MS = 60 * 60 * 1000; // 1 hour window in milliseconds
const RAPID_REQUEST_THRESHOLD = 10 * 1000; // 10 seconds between requests
const MAX_SUSPICIOUS_ATTEMPTS = 3; // Number of rapid attempts before marking as suspicious

/**
 * Enhanced rate limiting middleware for form submissions
 * Provides multiple layers of protection against spam and abuse
 */
export function formRateLimiter(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip || 'unknown';
  const now = Date.now();
  
  // Check if IP is marked as suspicious
  if (suspiciousIPs.has(ip)) {
    return res.status(429).json({
      message: "Access temporarily restricted due to suspicious activity. Please try again later.",
      retryAfter: 60
    });
  }
  
  // Clean up expired entries occasionally
  if (Math.random() < 0.01) { // 1% chance to clean on each request
    cleanupExpiredRecords();
  }
  
  // Get current rate limit record for this IP
  let record = rateLimitStore.get(ip);
  if (!record) {
    record = { 
      count: 0, 
      resetTime: now + WINDOW_MS,
      suspiciousAttempts: 0,
      lastAttempt: now
    };
  }
  
  // If the record has expired, reset it
  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + WINDOW_MS;
    record.suspiciousAttempts = 0;
    record.lastAttempt = now;
  } else {
    // Check for rapid successive requests (potential bot behavior)
    const timeSinceLastAttempt = now - record.lastAttempt;
    if (timeSinceLastAttempt < RAPID_REQUEST_THRESHOLD) {
      record.suspiciousAttempts++;
      
      if (record.suspiciousAttempts >= MAX_SUSPICIOUS_ATTEMPTS) {
        // Mark IP as suspicious for 1 hour
        suspiciousIPs.add(ip);
        setTimeout(() => suspiciousIPs.delete(ip), 60 * 60 * 1000);
        
        return res.status(429).json({
          message: "Too many rapid requests detected. Please wait before trying again.",
          retryAfter: 60
        });
      }
    } else {
      // Reset suspicious attempts if enough time has passed
      record.suspiciousAttempts = 0;
    }
    
    // Increment count
    record.count += 1;
    record.lastAttempt = now;
  }
  
  // Update the record
  rateLimitStore.set(ip, record);
  
  // Add rate limit headers
  const remaining = Math.max(0, MAX_REQUESTS - record.count);
  const resetTime = new Date(record.resetTime);
  
  res.setHeader('X-RateLimit-Limit', MAX_REQUESTS.toString());
  res.setHeader('X-RateLimit-Remaining', remaining.toString());
  res.setHeader('X-RateLimit-Reset', Math.floor(resetTime.getTime() / 1000).toString());
  
  // If limit is exceeded, return 429 Too Many Requests
  if (record.count > MAX_REQUESTS) {
    return res.status(429).json({
      message: 'Too many form submissions. Please try again later.',
      retryAfter: Math.ceil((record.resetTime - now) / 1000)
    });
  }
  
  next();
}

/**
 * Additional validation for honeypot and other spam detection
 */
export function spamDetectionMiddleware(req: Request, res: Response, next: NextFunction) {
  const { website, name, email, message, subject } = req.body;
  
  // Honeypot field check
  if (website && website.trim().length > 0) {
    return res.status(400).json({
      message: "Invalid form submission detected."
    });
  }
  
  // Check for suspicious patterns
  const suspiciousPatterns = [
    /https?:\/\//gi, // URLs in name field
    /\b(viagra|cialis|casino|poker|loan|mortgage|insurance|seo|marketing)\b/gi, // Common spam keywords
    /(.)\1{10,}/, // Repeated characters (more than 10)
  ];
  
  const textFields = [name, email, message, subject].filter(Boolean);
  for (const field of textFields) {
    if (typeof field === 'string') {
      for (const pattern of suspiciousPatterns) {
        if (pattern.test(field)) {
          return res.status(400).json({
            message: "Form submission contains invalid content."
          });
        }
      }
    }
  }
  
  next();
}

/**
 * Cleanup function to remove expired records
 */
function cleanupExpiredRecords() {
  const now = Date.now();
  
  // Use forEach instead of for...of to avoid TypeScript issue
  rateLimitStore.forEach((record, ip) => {
    if (now > record.resetTime) {
      rateLimitStore.delete(ip);
    }
  });
}

/**
 * Enhanced rate limiter specifically for admin login attempts
 * Provides stronger protection for sensitive authentication endpoints
 */
export function adminLoginRateLimiter(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip || 'unknown';
  const now = Date.now();
  
  // Stricter limits for admin login attempts
  const ADMIN_MAX_REQUESTS = 3; // Maximum login attempts per window
  const ADMIN_WINDOW_MS = 15 * 60 * 1000; // 15 minutes window
  
  // Check if IP is marked as suspicious
  if (suspiciousIPs.has(ip)) {
    console.warn(`🚨 SECURITY: Blocked admin login attempt from suspicious IP ${ip}`);
    return res.status(429).json({
      error: "Toegang geweigerd vanwege verdachte activiteit. Probeer later opnieuw.",
      retryAfter: 900 // 15 minutes
    });
  }
  
  // Get current rate limit record for this IP
  let record = rateLimitStore.get(ip);
  if (!record) {
    record = { 
      count: 0, 
      resetTime: now + ADMIN_WINDOW_MS,
      suspiciousAttempts: 0,
      lastAttempt: now
    };
  }
  
  // If the record has expired, reset it
  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + ADMIN_WINDOW_MS;
    record.suspiciousAttempts = 0;
    record.lastAttempt = now;
  } else {
    record.count += 1;
    record.lastAttempt = now;
    
    // Check if exceeded admin login attempts
    if (record.count > ADMIN_MAX_REQUESTS) {
      // Mark IP as suspicious for longer period
      suspiciousIPs.add(ip);
      setTimeout(() => suspiciousIPs.delete(ip), 60 * 60 * 1000); // 1 hour
      
      console.warn(`🚨 SECURITY: Admin login rate limit exceeded for IP ${ip} (${record.count} attempts)`);
      
      return res.status(429).json({
        error: "Te veel inlogpogingen. Probeer over 15 minuten opnieuw.",
        retryAfter: Math.ceil((record.resetTime - now) / 1000)
      });
    }
  }
  
  // Update the record
  rateLimitStore.set(ip, record);
  
  // Add security headers for admin endpoints
  res.setHeader('X-RateLimit-Limit', ADMIN_MAX_REQUESTS.toString());
  res.setHeader('X-RateLimit-Remaining', Math.max(0, ADMIN_MAX_REQUESTS - record.count).toString());
  res.setHeader('X-RateLimit-Reset', new Date(record.resetTime).toISOString());
  
  next();
}