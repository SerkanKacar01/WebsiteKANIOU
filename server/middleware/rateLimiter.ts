import { Request, Response, NextFunction } from 'express';

// Simple in-memory rate limiter to prevent form spam
interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitStore: Map<string, RateLimitRecord> = new Map();

// Options for rate limiting
const MAX_REQUESTS = 5; // Maximum requests per window
const WINDOW_MS = 60 * 60 * 1000; // 1 hour window in milliseconds

/**
 * Rate limiting middleware for form submissions
 * Limits by IP address to prevent spam submissions
 */
export function formRateLimiter(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip || 'unknown';
  const now = Date.now();
  
  // Clean up expired entries occasionally
  if (Math.random() < 0.01) { // 1% chance to clean on each request
    cleanupExpiredRecords();
  }
  
  // Get current rate limit record for this IP
  const record = rateLimitStore.get(ip) || { count: 0, resetTime: now + WINDOW_MS };
  
  // If the record has expired, reset it
  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + WINDOW_MS;
  } else {
    // Increment count
    record.count += 1;
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