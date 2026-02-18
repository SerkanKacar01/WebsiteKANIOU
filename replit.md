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
- **API Design**: RESTful endpoints with validation
- **Database Driver**: node-postgres (pg) for standard PostgreSQL compatibility
- **Session Management**: PostgreSQL-backed session store (connect-pg-simple) with MemoryStore fallback
- **File Uploads**: Multer for image processing

### Security Architecture (Maximum Protection Level)
- **Security Middleware Suite**: server/middleware/security.ts - centralized security module
- **Helmet Integration**: Comprehensive HTTP security headers via helmet.js
- **Rate Limiting (4-tier)**:
  - Global: 300 requests/15min (static assets excluded)
  - API: 100 requests/15min for API endpoints
  - Auth: 5 attempts/15min for login endpoints
  - Forms: 10 submissions/hour for contact/quote forms
- **Security Headers**: X-Content-Type-Options, X-Frame-Options: DENY, X-XSS-Protection, HSTS (max-age 1 year, preload), Permissions-Policy (all sensors/APIs blocked), X-Download-Options, X-DNS-Prefetch-Control, X-Permitted-Cross-Domain-Policies, Referrer-Policy
- **Content Security Policy**: Strict CSP with 'self' default, whitelisted Cookiebot/Google Fonts, frame-ancestors 'none', object-src 'none', form-action 'self', upgrade-insecure-requests
- **Brute Force Prevention**: Exponential backoff lockout (1min → 2min → 4min → up to 1hr) after 3 failed attempts per IP
- **Admin Authentication**: bcrypt password verification (cost factor 12), timing-safe HMAC comparison fallback, 48-byte session tokens, max 10 concurrent sessions, format validation
- **Input Sanitization**: HTML entity encoding on all text inputs, honeypot fields, spam pattern detection
- **Attack Detection**: Automatic blocking of path traversal, SQL injection, XSS, CMS probing (WordPress/PHP), config file probing (.env/.git), null byte injection
- **HPP Protection**: HTTP Parameter Pollution prevention via hpp middleware
- **Request Controls**: 100KB body size limit, request ID generation for audit trails
- **Security Audit Logging**: All sensitive endpoint access logged with request ID, IP, method, path, user-agent
- **Session Security**: httpOnly + secure + sameSite:strict cookies, 2-hour expiry, LRU session eviction
- **Error Handling**: Production error handler hides stack traces and internal details
- **CSRF Protection**: Single-use tokens with 1-hour expiry, session-bound validation
- **Technical Implementations**: Memory-based fallbacks for database operations during downtime, smart notification system for order updates, comprehensive document management.

### Feature Specifications
- **Product Catalog (Informational)**: Product catalog (curtains, blinds, shutters), smart quote system, image gallery, customer testimonials. All e-commerce/shop functionality (cart, checkout, payment, shop pages) has been completely removed. Product pages serve as informational displays only.
- **Customer Communication**: Multi-step quote requests, general inquiries, automated email notifications via SendGrid, multilingual content (Dutch, French, English, Turkish). Floating action buttons provide quick access to contact forms, callback requests, measuring instructions, and quote requests.
- **Payment Integration**: Mollie for European payments (credit cards, SEPA, iDEAL, Bancontact). This functionality is integrated for order management but not directly accessible for customer e-commerce purchases due to the removal of the shopping cart.
- **Content Management**: Full CRUD for products/categories, gallery management, simplified admin dashboard for content and customer management, testimonial system.
- **Order Management**: Comprehensive entrepreneur dashboard for order status updates (6-step progression), client notes, PDF document uploads, notification preference management (email/WhatsApp). Secure hidden login at `/kaniouzilvernaald-dashboard`.
- **Order Tracking**: Customer-facing order tracking system via bonnummer, with visual timeline and business notes. Accessible via a floating button on the homepage and a dedicated search page.
- **Product Configurators**: Modern 6-step roller blind configurator with progressive disclosure, real-time price calculation, and visual selection. Simplified 3-step roller blind configurator for lead generation, including color sample requests with email automation.

### System Design Choices
- **AI Integration**: AI chatbot components have been removed; traditional contact forms and quote systems are maintained.
- **GDPR Compliance**: Cookiebot integration for GDPR-compliant cookie consent management. Session-based functionality with production-aware secure cookie settings to ensure privacy compliance.
- **Security Posture**: Multi-layered security architecture with rate limiting, IP blocking, security headers, secure session management, and comprehensive audit logging.
- **Data Flow**: Defined flows for customer journey, inquiries, quote processing, and order processing, emphasizing human follow-up for complex interactions.

## External Dependencies

### Core Infrastructure
- **Database**: PostgreSQL with Neon serverless hosting
- **ORM**: Drizzle
- **Deployment**: Replit with auto-scaling capabilities

### Third-Party Services
- **Payment Gateway**: Mollie
- **Email Service**: SendGrid (for transactional and marketing emails), Mailgun (for specific email notifications like order confirmations and status updates)
