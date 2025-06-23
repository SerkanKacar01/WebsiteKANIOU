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
- **Provider**: OpenAI GPT-4o for chatbot responses
- **Capabilities**: 24/7 multilingual support (Dutch, French, English, Turkish)
- **Features**: Price detection, product recommendations, knowledge base integration
- **Context Management**: Conversation memory and learned responses

## Key Components

### 1. E-commerce System
- Product catalog with categories (curtains, blinds, shutters, etc.)
- Shopping cart with session persistence
- Smart quote system with dimension calculators
- Image gallery with project showcases
- Customer testimonials and reviews

### 2. AI Chatbot System
- **Multilingual Support**: Automatic language detection and response
- **24/7 Operation**: Always available customer service
- **Smart Price Assistant**: Detects pricing inquiries and provides relevant information
- **Knowledge Base**: Comprehensive product and service information
- **Conversation Memory**: Context-aware responses using conversation history

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
- **Knowledge Base**: Admin-trainable chatbot responses
- **Testimonial System**: Customer review collection and display

## Data Flow

### 1. Customer Journey Flow
```
Landing Page → Product Browsing → Chatbot Interaction → Quote Request → Payment → Order Fulfillment
```

### 2. Chatbot Interaction Flow
```
User Message → Language Detection → Intent Analysis → Knowledge Retrieval → Response Generation → Follow-up Actions
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
- **AI Provider**: OpenAI API for GPT-4o chatbot responses
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
OPENAI_API_KEY=<OpenAI API key for chatbot>
MOLLIE_API_KEY=<Mollie payment gateway key>
SENDGRID_API_KEY=<SendGrid email service key>
```

## Changelog
- June 23, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.