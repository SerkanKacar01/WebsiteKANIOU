import { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import { randomBytes, createHash } from 'crypto';

const isProduction = process.env.NODE_ENV === 'production' || process.env.REPL_SLUG === 'kaniou-production';

export function createHelmetMiddleware() {
  return helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: { policy: 'same-origin' },
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    dnsPrefetchControl: { allow: false },
    frameguard: { action: 'deny' },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    ieNoOpen: true,
    noSniff: true,
    originAgentCluster: true,
    permittedCrossDomainPolicies: { permittedPolicies: 'none' },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    xssFilter: true,
  });
}

export function createSecurityHeaders() {
  return (req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('X-Download-Options', 'noopen');
    res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
    
    if (isProduction) {
      res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    }

    res.setHeader('Permissions-Policy', [
      'accelerometer=()',
      'ambient-light-sensor=()',
      'autoplay=()',
      'battery=()',
      'camera=()',
      'display-capture=()',
      'document-domain=()',
      'encrypted-media=()',
      'execution-while-not-rendered=()',
      'execution-while-out-of-viewport=()',
      'fullscreen=(self)',
      'geolocation=()',
      'gyroscope=()',
      'magnetometer=()',
      'microphone=()',
      'midi=()',
      'navigation-override=()',
      'payment=()',
      'picture-in-picture=()',
      'publickey-credentials-get=()',
      'screen-wake-lock=()',
      'sync-xhr=()',
      'usb=()',
      'web-share=()',
      'xr-spatial-tracking=()',
    ].join(', '));

    const cspDirectives = [
      "default-src 'self'",
      `script-src 'self' ${isProduction ? "'unsafe-inline'" : "'unsafe-inline' 'unsafe-eval'"} https://consent.cookiebot.com https://consentcdn.cookiebot.com`,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: https://images.unsplash.com https://images.pexels.com",
      `connect-src 'self' ${isProduction ? '' : 'ws: wss:'}`.trim(),
      "frame-src https://consent.cookiebot.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "media-src 'self'",
      "worker-src 'self' blob:",
      "manifest-src 'self'",
      "upgrade-insecure-requests",
    ];

    res.setHeader('Content-Security-Policy', cspDirectives.join('; '));

    res.removeHeader('X-Powered-By');
    res.removeHeader('Server');

    next();
  };
}

export function createGlobalRateLimiter() {
  return rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      error: 'Te veel verzoeken. Probeer het later opnieuw.',
      retryAfter: 900,
    },
    skip: (req) => {
      return req.path.startsWith('/assets/') ||
             req.path.startsWith('/images/') ||
             req.path.endsWith('.js') ||
             req.path.endsWith('.css') ||
             req.path.endsWith('.png') ||
             req.path.endsWith('.jpg') ||
             req.path.endsWith('.ico');
    },
    validate: { trustProxy: false, xForwardedForHeader: false },
  });
}

export function createApiRateLimiter() {
  return rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      error: 'Te veel API-verzoeken. Probeer het later opnieuw.',
      retryAfter: 900,
    },
    validate: { trustProxy: false, xForwardedForHeader: false },
  });
}

export function createAuthRateLimiter() {
  return rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      error: 'Te veel inlogpogingen. Probeer het over 15 minuten opnieuw.',
      retryAfter: 900,
    },
    validate: { trustProxy: false, xForwardedForHeader: false },
  });
}

export function createFormRateLimiter() {
  return rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      error: 'Te veel formulierinzendingen. Probeer het later opnieuw.',
      retryAfter: 3600,
    },
    validate: { trustProxy: false, xForwardedForHeader: false },
  });
}

export function createHppProtection() {
  return hpp({
    whitelist: ['language', 'category', 'status'],
  });
}

export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return input;

  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/\\/g, '&#92;')
    .replace(/`/g, '&#96;');
}

export function sanitizeObject(obj: any): any {
  if (typeof obj === 'string') return sanitizeInput(obj);
  if (typeof obj !== 'object' || obj === null) return obj;
  if (Array.isArray(obj)) return obj.map(sanitizeObject);

  const sanitized: any = {};
  for (const [key, value] of Object.entries(obj)) {
    sanitized[sanitizeInput(key)] = sanitizeObject(value);
  }
  return sanitized;
}

export function inputSanitizationMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.body && typeof req.body === 'object') {
    const sensitiveFields = ['password', 'passwordHash', 'token', 'sessionId', '_csrfToken'];
    const sanitizedBody: any = {};

    for (const [key, value] of Object.entries(req.body)) {
      if (sensitiveFields.includes(key)) {
        sanitizedBody[key] = value;
      } else {
        sanitizedBody[key] = sanitizeObject(value);
      }
    }
    req.body = sanitizedBody;
  }

  if (req.query && typeof req.query === 'object') {
    const sanitizedQuery: any = {};
    for (const [key, value] of Object.entries(req.query)) {
      if (typeof value === 'string') {
        sanitizedQuery[key] = sanitizeInput(value);
      } else {
        sanitizedQuery[key] = value;
      }
    }
    req.query = sanitizedQuery;
  }

  next();
}

const requestLog = new Map<string, { count: number; firstSeen: number; patterns: string[] }>();

export function suspiciousActivityDetector(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip || 'unknown';
  const now = Date.now();
  const path = req.path;

  const suspiciousPatterns = [
    /\.\.\/|\.\.\\/, // Path traversal
    /\.(php|asp|aspx|jsp|cgi|env|git|svn|htaccess|htpasswd|bak|old|swp|sql|db|config)/i, // Sensitive files
    /<script|javascript:|vbscript:|data:text\/html|on\w+\s*=/i, // XSS attempts
    /union\s+(all\s+)?select|insert\s+into|update\s+.*set|delete\s+from|drop\s+(table|database)/i, // SQL injection
    /\/wp-admin|\/wp-login|\/wp-content|\/administrator|\/phpmyadmin|\/adminer/i, // CMS probing
    /\/\.env|\/\.git|\/\.svn|\/\.htaccess|\/config\.php|\/web\.config/i, // Config file probing
    /\/(etc\/passwd|etc\/shadow|proc\/self|windows\/system32)/i, // System file access
    /\x00|%00/, // Null byte injection
  ];

  const fullUrl = req.url || path;
  const bodyStr = JSON.stringify(req.body || {});
  const checkStr = `${fullUrl} ${bodyStr}`;

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(checkStr)) {
      console.warn(`🚨 SECURITY ALERT: Suspicious request detected`, {
        ip,
        method: req.method,
        path,
        pattern: pattern.source.substring(0, 50),
        userAgent: req.get('user-agent')?.substring(0, 100),
        timestamp: new Date().toISOString(),
      });

      return res.status(403).json({ error: 'Forbidden' });
    }
  }

  const isInternalIp = ip === '127.0.0.1' || ip === '::1' || ip.startsWith('10.') || ip.startsWith('172.') || ip.startsWith('192.168.');
  
  if (!isInternalIp) {
    let record = requestLog.get(ip);
    if (!record || now - record.firstSeen > 60000) {
      record = { count: 1, firstSeen: now, patterns: [path] };
    } else {
      record.count++;
      if (record.patterns.length < 50) {
        record.patterns.push(path);
      }

      if (record.count > 100) {
        const uniquePaths = new Set(record.patterns).size;
        if (uniquePaths > 30) {
          console.warn(`🚨 SECURITY: Possible scanning/enumeration from ${ip}`, {
            requestCount: record.count,
            uniquePaths,
            timeWindow: '60s',
          });
        }
      }
    }
    requestLog.set(ip, record);
  }

  if (Math.random() < 0.001) {
    const cutoff = now - 120000;
    requestLog.forEach((r, key) => {
      if (r.firstSeen < cutoff) requestLog.delete(key);
    });
  }

  next();
}

export function requestSizeLimiter(maxSizeKB: number = 100) {
  return (req: Request, res: Response, next: NextFunction) => {
    const contentLength = parseInt(req.headers['content-length'] || '0', 10);

    if (contentLength > maxSizeKB * 1024) {
      return res.status(413).json({
        error: 'Verzoek te groot. Maximaal ' + maxSizeKB + 'KB toegestaan.',
      });
    }
    next();
  };
}

export function secureErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error('Server error:', {
    message: err.message,
    stack: isProduction ? undefined : err.stack,
    path: req.path,
    method: req.method,
    ip: req.ip,
    timestamp: new Date().toISOString(),
  });

  if (isProduction) {
    res.status(500).json({ error: 'Er is een serverfout opgetreden.' });
  } else {
    res.status(500).json({
      error: 'Server error',
      message: err.message,
    });
  }
}

export function generateRequestId() {
  return (req: Request, res: Response, next: NextFunction) => {
    const requestId = randomBytes(16).toString('hex');
    (req as any).requestId = requestId;
    res.setHeader('X-Request-ID', requestId);
    next();
  };
}

export function securityAuditLogger(req: Request, res: Response, next: NextFunction) {
  const sensitiveEndpoints = [
    '/api/admin/',
    '/api/payment',
    '/api/orders',
  ];

  const isSensitive = sensitiveEndpoints.some(ep => req.path.startsWith(ep));

  if (isSensitive) {
    const auditEntry = {
      requestId: (req as any).requestId,
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.path,
      ip: req.ip,
      userAgent: req.get('user-agent')?.substring(0, 200),
      contentType: req.get('content-type'),
    };

    console.log(`🔐 AUDIT: ${JSON.stringify(auditEntry)}`);
  }

  next();
}

const bruteForceStore = new Map<string, { attempts: number; lastAttempt: number; lockUntil: number }>();

export function bruteForcePrevention(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip || 'unknown';
  const now = Date.now();

  let record = bruteForceStore.get(ip);

  if (record && record.lockUntil > now) {
    const waitSeconds = Math.ceil((record.lockUntil - now) / 1000);
    return res.status(429).json({
      error: `Account tijdelijk vergrendeld. Probeer opnieuw over ${waitSeconds} seconden.`,
      retryAfter: waitSeconds,
    });
  }

  if (!record || now - record.lastAttempt > 3600000) {
    record = { attempts: 0, lastAttempt: now, lockUntil: 0 };
  }

  (req as any).recordBruteForce = (success: boolean) => {
    if (success) {
      bruteForceStore.delete(ip);
    } else {
      record!.attempts++;
      record!.lastAttempt = now;

      if (record!.attempts >= 3) {
        const lockDuration = Math.min(
          Math.pow(2, record!.attempts - 3) * 60000,
          3600000
        );
        record!.lockUntil = now + lockDuration;

        console.warn(`🚨 SECURITY: Brute force lockout for IP ${ip}`, {
          attempts: record!.attempts,
          lockDurationMinutes: lockDuration / 60000,
        });
      }

      bruteForceStore.set(ip, record!);
    }
  };

  next();
}

export function noCache(req: Request, res: Response, next: NextFunction) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
}
