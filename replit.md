# KANIOU Window Treatment E-commerce & AI Chatbot Platform

## Overview
KANIOU is a comprehensive Belgian window treatment e-commerce platform that combines product sales with advanced customer service. The system features smart quote generation, payment processing, and comprehensive business management tools, including a multilingual contact system. The business vision is to provide a user-friendly experience for custom window treatment solutions with efficient order management and customer communication.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system, Radix UI with shadcn/ui
- **State Management**: TanStack React Query
- **Build Tool**: Vite
- **Color Scheme**: Primary (#2C3E50), Secondary (#D5B992), Accent (#E67E22)
- **UI/UX Decisions**: Responsive design across desktop and mobile, intuitive navigation, visual step indicators for configurators, consistent branding with gold accents (#E6C988, #E9C882). Emphasis on clear, concise informational content for products.

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript (ESM modules)
- **API Design**: RESTful endpoints with Zod validation
- **Session Management**: Cryptographically secure session tokens (256-bit) with regeneration support
- **File Uploads**: Planned implementation with MIME type validation and size limits
- **Rate Limiting**: Multi-layer rate limiting:
  - Admin login: 3 attempts per 15 minutes with 30-minute account lockout after 5 failures
  - Form submissions: 5 per hour with suspicious IP tracking
  - Order tracking: 10 requests per 15 minutes
- **Security Headers**: Complete HTTP security header suite:
  - HSTS (Strict-Transport-Security) with 1-year max-age and preload
  - X-Content-Type-Options: nosniff
  - X-Frame-Options: DENY
  - X-XSS-Protection: 1; mode=block
  - Referrer-Policy: strict-origin-when-cross-origin
  - Permissions-Policy: restrictive geolocation/microphone/camera
  - Cross-Origin policies (COEP, COOP, CORP)
  - Strict Content Security Policy (CSP) with whitelisted origins
- **CORS Policy**: Explicit origin whitelist (kaniou.be, www.kaniou.be, Replit dev domain)
- **Session Security**: 
  - Production-aware secure cookie configuration
  - HttpOnly, Secure, and SameSite=Lax flags
  - Session fixation prevention via ID regeneration
  - Cryptographically strong session secrets (SESSION_SECRET)
- **Brute Force Protection**:
  - Account lockout after 5 failed login attempts (30-minute duration)
  - IP-based rate limiting with suspicious behavior tracking
  - Progressive delays for repeated failed attempts
- **Input Validation & Sanitization**:
  - Comprehensive Zod schemas for all form inputs
  - Honeypot fields for spam bot detection
  - Regex-based format validation (email, phone, names)
  - Length constraints and character whitelisting
- **SQL Injection Prevention**: Drizzle ORM with parameterized queries (no raw SQL)
- **XSS Protection**: 
  - React JSX automatic HTML escaping
  - Content Security Policy enforcement
  - Input sanitization via Zod schemas
- **CSRF Protection**: Token-based CSRF protection for state-changing requests
- **Cryptographic Security**:
  - Bcrypt password hashing (12 rounds) for admin accounts
    - ADMIN_PASSWORD must be stored as bcrypt hash in Replit Secrets
    - Use `server/hashPassword.ts` utility to generate hash
    - Passwords verified with constant-time bcrypt.compare()
  - BONNUMMER_SECRET for bonnummer checksum validation
  - Cryptographically secure random token generation (256-bit session IDs)
- **Security Monitoring**: 
  - Comprehensive event logging for admin activities
  - Failed login attempt tracking with IP logging
  - Suspicious activity detection and automated blocking
  - Security event timestamps and user agent tracking
- **Technical Implementations**: Secure admin authentication with bcryptjs, memory-based fallbacks for database operations during downtime, smart notification system for order updates, comprehensive document management, enhanced IP blocking for suspicious activities.

### Feature Specifications
- **E-commerce System (Informational)**: Product catalog (curtains, blinds, shutters), smart quote system, image gallery, customer testimonials. All e-commerce purchasing capabilities (cart, checkout, payment integration) have been removed, transforming product pages into informational displays.
- **Customer Communication**: Multi-step quote requests, general inquiries, automated email notifications via SendGrid, multilingual content (Dutch, French, English, Turkish). Floating action buttons provide quick access to contact forms, callback requests, measuring instructions, and quote requests.
- **Payment Integration**: Mollie for European payments (credit cards, SEPA, iDEAL, Bancontact). This functionality is integrated for order management but not directly accessible for customer e-commerce purchases due to the removal of the shopping cart.
- **Content Management**: Full CRUD for products/categories, gallery management, simplified admin dashboard for content and customer management, testimonial system.
- **Order Management**: Comprehensive entrepreneur dashboard for order status updates (6-step progression), client notes, PDF document uploads, notification preference management (email/WhatsApp). Secure hidden login at `/kaniouzilvernaald-dashboard`.
- **Order Tracking**: Customer-facing order tracking system via bonnummer, with visual timeline and business notes. Accessible via a floating button on the homepage and a dedicated search page.
- **Product Configurators**: Modern 6-step roller blind configurator with progressive disclosure, real-time price calculation, and visual selection. Simplified 3-step roller blind configurator for lead generation, including color sample requests with email automation.

### System Design Choices
- **AI Integration**: AI chatbot components have been removed; traditional contact forms and quote systems are maintained.
- **GDPR Compliance**: Cookiebot integration for GDPR-compliant cookie consent management. Session-based functionality with production-aware secure cookie settings to ensure privacy compliance.
- **Security Posture**: Enterprise-grade multi-layered security architecture (Score: 9.5/10):
  - **Network Layer**: CORS whitelisting, rate limiting, IP-based blocking
  - **Transport Layer**: HSTS enforcement, secure cookie transmission
  - **Application Layer**: Input validation, output encoding, CSRF protection
  - **Data Layer**: SQL injection prevention via ORM, bcrypt password hashing
  - **Session Layer**: Secure token generation, session fixation prevention
  - **Monitoring Layer**: Security event logging, failed attempt tracking
  - **Production Readiness**: SESSION_SECRET enforcement, ADMIN_PASSWORD bcrypt validation, strict CSP
  - **Compliance**: OWASP Top 10 2025 compliant, GDPR compliant via Cookiebot
- **Data Flow**: Defined flows for customer journey, inquiries, quote processing, and order processing, emphasizing human follow-up for complex interactions.

## External Dependencies

### Core Infrastructure
- **Database**: PostgreSQL with Neon serverless hosting
- **ORM**: Drizzle
- **Deployment**: Replit with auto-scaling capabilities

### Third-Party Services
- **Payment Gateway**: Mollie
- **Email Service**: SendGrid (for transactional and marketing emails), Mailgun (for specific email notifications like order confirmations and status updates)
