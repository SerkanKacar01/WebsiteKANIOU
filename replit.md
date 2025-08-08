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
- **Session Management**: Session-based user tracking
- **File Uploads**: Multer for image processing
- **Rate Limiting**: Express rate limiting
- **Technical Implementations**: Secure admin authentication with bcryptjs, memory-based fallbacks for database operations during downtime, smart notification system for order updates, comprehensive document management.

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
- **GDPR Compliance**: Cookiebot integration for consent management, server-side cookie blocking, proper cookie classification, and user consent tracking for analytics/marketing.
- **Data Flow**: Defined flows for customer journey, inquiries, quote processing, and order processing, emphasizing human follow-up for complex interactions.

## External Dependencies

### Core Infrastructure
- **Database**: PostgreSQL with Neon serverless hosting
- **ORM**: Drizzle
- **Deployment**: Replit with auto-scaling capabilities

### Third-Party Services
- **Payment Gateway**: Mollie
- **Email Service**: SendGrid (for transactional and marketing emails), Mailgun (for specific email notifications like order confirmations and status updates)
- **GDPR Compliance**: Cookiebot