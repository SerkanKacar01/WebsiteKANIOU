# KANIOU Window Treatment E-commerce & AI Chatbot Platform

## Overview

KANIOU is a comprehensive Belgian window treatment e-commerce platform that combines traditional product sales with advanced AI-powered customer service. The system features a 24/7 multilingual chatbot, smart quote generation, payment processing, and comprehensive business management tools.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI with shadcn/ui component library
- **State Management**: TanStack React Query for server state
- **Build Tool**: Vite for development and production builds
- **Color Scheme**: Primary (#2C3E50), Secondary (#D5B992), Accent (#E67E22)

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript (ESM modules)
- **API Design**: RESTful endpoints with comprehensive validation
- **Session Management**: Session-based user tracking
- **File Uploads**: Multer for image processing
- **Rate Limiting**: Express rate limiting with spam detection

### AI Integration
- **Status**: AI chatbot component removed as requested
- **Previous Features**: Previously included 24/7 multilingual support
- **Current State**: Traditional contact forms and quote system maintained

## Key Components

### 1. E-commerce System
- Product catalog with categories (curtains, blinds, shutters, etc.)
- Shopping cart with session persistence
- Smart quote system with dimension calculators
- Image gallery with project showcases
- Customer testimonials and reviews

### 2. Customer Communication System
- **Contact Forms**: Multi-step quote requests and general inquiries
- **Email Integration**: Automated confirmation and status updates
- **Language Support**: Multilingual content support (Dutch, French, English, Turkish)
- **Quote System**: Smart quote generation with dimension calculators

### 3. Payment Integration
- **Payment Processor**: Mollie for European market
- **Supported Methods**: Credit cards, SEPA, iDEAL, Bancontact
- **Order Management**: Complete order lifecycle tracking
- **Email Notifications**: Automated confirmation and status updates

### 4. Communication Systems
- **Email Service**: SendGrid for transactional emails
- **Newsletter System**: Subscription management with welcome sequences
- **Contact Forms**: Multi-step quote requests and general inquiries
- **Dealer Portal**: Specialized contact system for business partners

### 5. Content Management
- **Product Management**: Full CRUD operations for products and categories
- **Gallery Management**: Project showcase and inspiration images
- **Admin Dashboard**: Simplified content and customer management interface
- **Testimonial System**: Customer review collection and display

## Data Flow

### 1. Customer Journey Flow
```
Landing Page → Product Browsing → Contact/Quote Forms → Payment → Order Fulfillment
```

### 2. Customer Inquiry Flow
```
Contact Form → Email Notification → Admin Review → Human Response → Follow-up Communication
```

### 3. Quote Processing Flow
```
Customer Input → Dimension Calculation → Material Selection → Price Estimation → Admin Notification → Human Follow-up
```

### 4. Order Processing Flow
```
Cart Items → Payment Creation → Mollie Processing → Order Confirmation → Email Notifications → Fulfillment Tracking
```

## External Dependencies

### Core Infrastructure
- **Database**: PostgreSQL with Neon serverless hosting
- **ORM**: Drizzle for type-safe database operations
- **Deployment**: Replit with auto-scaling capabilities

### Third-Party Services
- **Payment Gateway**: Mollie for European payment processing
- **Email Service**: SendGrid for transactional and marketing emails
- **Image Processing**: Built-in color matching and room analysis

### GDPR Compliance
- **Cookie Management**: Cookiebot integration for GDPR compliance
- **Consent System**: User consent tracking for analytics and marketing
- **Privacy Controls**: Data protection and user rights management

## Deployment Strategy

### Development Environment
- **Runtime**: Node.js 20 with PostgreSQL 16
- **Development Server**: `npm run dev` with hot reloading
- **Database**: Drizzle migrations with `npm run db:push`

### Production Deployment
- **Platform**: Replit auto-scaling deployment
- **Build Process**: Vite production build with server bundling
- **Start Command**: `npm run start` for production server
- **Port Configuration**: Internal 5000, external 80

### Environment Configuration
```
DATABASE_URL=<PostgreSQL connection string>
MOLLIE_API_KEY=<Mollie payment gateway key>
SENDGRID_API_KEY=<SendGrid email service key>
```

## Changelog
- June 26, 2025: Customer Information Display System (Step 15.6) implementation
  - Added customer information fields to database schema (customerFirstName, customerLastName, customerAddress, customerCity)
  - Created "Klantgegevens" section in entrepreneur dashboard order detail view
  - Implemented structured customer data display with Dutch labels (Voornaam, Achternaam, E-mailadres, Telefoonnummer, Adres, Woonplaats)
  - Added customer information cards to mobile/tablet view with compact grid layout
  - Integrated proper PaymentOrder type from shared schema for type safety
  - Added fallback "Niet opgegeven" text for missing customer data fields
  - Positioned customer information section between product/status and notes sections as requested
- June 26, 2025: Comprehensive Business Dashboard review and improvements
  - Enhanced header design with professional logo and improved branding using #E6C988 gold accent
  - Redesigned stats cards with colored left borders, hover effects, and enhanced visual hierarchy
  - Improved desktop table layout with better column organization and customer information display
  - Enhanced mobile/tablet card layout with professional styling and better information structure
  - Upgraded edit modal with enhanced visual design, better form styling, and improved user experience
  - Added comprehensive notification preferences display with visual email/WhatsApp status indicators
  - Implemented proper color scheme consistency (white, black, #E6C988) throughout the dashboard
  - Enhanced PDF upload sections with better visual feedback and status indicators
  - Improved responsiveness across all screen sizes with proper breakpoints
  - Added professional styling to all form elements with focus states using brand colors
- June 26, 2025: Enhanced notification preferences system with visual status indicators
  - Added comprehensive notification preferences display on entrepreneur dashboard
  - Implemented email and WhatsApp status indicators with checkmarks and icons
  - Created notification log tracking system for future automated notifications
  - Added customer phone number display and validation for WhatsApp notifications
  - Built visual preference badges (📧 Email ✅/❌, 📱 WhatsApp ✅/❌) on dashboard
  - Enhanced mobile card layout with notification status tracking
  - Created notification service framework ready for email/WhatsApp automation
  - Added database schema for notification logs with status tracking
- June 25, 2025: Completed comprehensive entrepreneur dashboard with full order management
  - Built responsive entrepreneur dashboard with desktop table and mobile card layouts
  - Implemented order status updates with 6-step progression system
  - Added client note functionality for internal communications visible to customers
  - Created PDF upload system for order documentation
  - Integrated notification preference management (email/WhatsApp/both)
  - Added comprehensive order statistics and revenue tracking
  - Updated database schema with clientNote, pdfFileName, and notificationPreference fields
- June 25, 2025: Completed hidden entrepreneur login system with secure authentication
  - Implemented secure admin authentication with bcryptjs password hashing
  - Created hidden login page at /kaniouzilvernaald-dashboard (admin@kaniou.be access)
  - Built entrepreneur dashboard at /entrepreneur-dashboard with order management
  - Added admin users and sessions tables to PostgreSQL schema
  - Integrated cookie-based session management with 2-hour timeout
  - Added automatic session cleanup and logout functionality
  - Created admin user initialization script with ADMIN_PASSWORD secret
- June 25, 2025: Implemented comprehensive order tracking system with mobile-first design
  - Added "Volg uw bestelling" button above bottom navigation with light gold styling (#E6C988)
  - Created order search page at /volg-bestelling for order number input
  - Built detailed order status page at /bestelling-status/:id with complete order timeline
  - Integrated 6-step status progression with visual timeline and business notes
  - Added PDF download functionality for order receipts
  - Implemented backend API endpoints for order lookup and tracking
- June 24, 2025: Added Rolgordijnen product tile and custom category page with pricing, configurator integration, and "Bekijk producten" button
- June 24, 2025: Completed full AI chatbot removal - eliminated all frontend components, backend services, database schemas, locale files, and replaced with traditional contact forms
- June 23, 2025: Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.