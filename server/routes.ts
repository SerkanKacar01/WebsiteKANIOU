import type { Express } from "express";
import { createServer, type Server } from "http";
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bcrypt from "bcryptjs";
import { storage } from "./storage";
import { createSession, validateSession, deleteSession, isValidCredentials } from "./simpleAuth";
import { sendMailgunEmail } from "./mailgun/sendMail";
import { insertContactSubmissionSchema, insertQuoteRequestSchema } from "@shared/schema";
import { createContactEmailHtml } from "./services/email";

export async function registerRoutes(app: Express): Promise<Server> {
  // Session and cookie middleware
  app.use(cookieParser());
  
  app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000, // 2 hours
    },
  }));

  // Admin authentication middleware for protected routes
  const requireAuth = (req: any, res: any, next: any) => {
    const sessionId = req.session?.sessionId || req.cookies?.sessionId;
    
    if (!sessionId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const session = validateSession(sessionId);
    if (!session) {
      return res.status(401).json({ error: 'Invalid or expired session' });
    }
    
    req.admin = session;
    next();
  };

  // Admin login route
  app.post('/api/admin/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ error: 'Email en wachtwoord zijn vereist' });
      }
      
      if (isValidCredentials(email, password)) {
        const { sessionId, expiresAt } = createSession(email);
        
        (req.session as any).sessionId = sessionId;
        res.cookie('sessionId', sessionId, {
          httpOnly: true,
          secure: false,
          maxAge: 2 * 60 * 60 * 1000,
        });
        
        res.json({
          success: true,
          message: 'Succesvol ingelogd',
          admin: { email }
        });
      } else {
        res.status(401).json({ error: 'Ongeldige inloggegevens' });
      }
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Server error tijdens inloggen' });
    }
  });

  // Admin logout route
  app.post('/api/admin/logout', (req: any, res) => {
    const sessionId = req.session?.sessionId || req.cookies?.sessionId;
    
    if (sessionId) {
      deleteSession(sessionId);
    }
    
    req.session.destroy((err: any) => {
      if (err) {
        console.error('Session destruction error:', err);
      }
    });
    
    res.clearCookie('sessionId');
    res.json({ success: true, message: 'Succesvol uitgelogd' });
  });
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const validation = insertContactSubmissionSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid form data", 
          details: validation.error.issues 
        });
      }

      const { name, email, subject, message, website } = validation.data;

      // Check honeypot field for spam protection
      if (website && website.length > 0) {
        return res.status(400).json({ error: "Invalid submission" });
      }

      // Send email notification to business first (most important)
      let emailSent = false;
      try {
        const emailSubject = `[KANIOU Contact] ${subject}`;
        const emailHtml = createContactEmailHtml({ name, email, subject, message });
        
        // Send plain text email for better deliverability
        const emailText = `
Nieuw contactformulier bericht van KANIOU website

Van: ${name}
E-mail: ${email}
Onderwerp: ${subject}

Bericht:
${message}

---
Dit bericht werd verzonden op ${new Date().toLocaleDateString('nl-NL')} om ${new Date().toLocaleTimeString('nl-NL')}
        `.trim();

        await sendMailgunEmail('info@kaniou.be', emailSubject, emailText);
        console.log(`✅ Contact form email sent successfully to info@kaniou.be from ${email}`);
        emailSent = true;
      } catch (emailError) {
        console.error('❌ Failed to send contact form email:', emailError);
      }

      // Try to save to database (secondary priority)
      try {
        await storage.createContactSubmission({
          name,
          email,
          subject,
          message
        });
        console.log(`📝 Contact form submission saved to database`);
      } catch (dbError) {
        console.warn(`⚠️ Database unavailable for contact form storage:`, (dbError as Error).message);
        // Continue anyway - email is the primary goal
      }

      // Return success if email was sent (primary goal achieved)
      if (emailSent) {
        res.json({ 
          success: true, 
          message: "Contact form submitted successfully" 
        });
      } else {
        res.status(500).json({ 
          error: "Failed to send contact form email" 
        });
      }
    } catch (error: any) {
      console.error("Contact form submission error:", error);
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  });

  // Quote request submission endpoint
  app.post("/api/quote-requests", async (req, res) => {
    try {
      // Validate request body
      const validation = insertQuoteRequestSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid quote request data", 
          details: validation.error.issues 
        });
      }

      const { name, email, phone, productType, dimensions, requirements, website } = validation.data;

      // Check honeypot field for spam protection
      if (website && website.length > 0) {
        return res.status(400).json({ error: "Invalid submission" });
      }

      // Send email notification to business first (most important)
      let emailSent = false;
      try {
        const emailSubject = `[KANIOU Offerte] ${productType} - ${name}`;
        
        const emailText = `
Nieuwe offerteaanvraag van KANIOU website

Klantgegevens:
- Naam: ${name}
- E-mail: ${email}
- Telefoon: ${phone}

Product Details:
- Type: ${productType}
- Afmetingen: ${dimensions || 'Niet opgegeven'}

Aanvullende wensen:
${requirements || 'Geen aanvullende wensen opgegeven'}

---
Deze offerteaanvraag werd verzonden op ${new Date().toLocaleDateString('nl-NL')} om ${new Date().toLocaleTimeString('nl-NL')}
        `.trim();

        await sendMailgunEmail('info@kaniou.be', emailSubject, emailText);
        console.log(`✅ Quote request email sent successfully to info@kaniou.be from ${email}`);
        emailSent = true;
      } catch (emailError) {
        console.error('❌ Failed to send quote request email:', emailError);
      }

      // Try to save to database (secondary priority)
      try {
        await storage.createQuoteRequest({
          name,
          email,
          phone,
          productType,
          dimensions: dimensions || '',
          requirements: requirements || ''
        });
        console.log(`📝 Quote request submission saved to database`);
      } catch (dbError) {
        console.warn(`⚠️ Database unavailable for quote request storage:`, (dbError as Error).message);
        // Continue anyway - email is the primary goal
      }

      // Return success if email was sent (primary goal achieved)
      if (emailSent) {
        res.json({ 
          success: true, 
          message: "Quote request submitted successfully" 
        });
      } else {
        res.status(500).json({ 
          error: "Failed to send quote request email" 
        });
      }
    } catch (error: any) {
      console.error("Quote request submission error:", error);
      res.status(500).json({ error: "Failed to submit quote request" });
    }
  });

  // Admin authentication status route
  app.get('/api/admin/auth-status', async (req: any, res) => {
    try {
      const sessionId = req.session?.sessionId || req.cookies?.sessionId;
      
      if (!sessionId) {
        return res.json({ authenticated: false });
      }
      
      const session = validateSession(sessionId);
      if (!session) {
        return res.json({ authenticated: false });
      }
      
      res.json({ 
        authenticated: true, 
        email: session.email 
      });
    } catch (error) {
      res.json({ authenticated: false });
    }
  });

  // Get all orders for admin dashboard (protected)
  app.get("/api/admin/dashboard", requireAuth, async (req, res) => {
    try {
      const orders = await storage.getPaymentOrders();
      
      res.json({
        totalOrders: orders.length,
        pendingOrders: orders.filter(o => o.status === 'pending').length,
        totalRevenue: orders.reduce((sum, o) => sum + (o.amount || 0), 0),
        orders: orders.map(order => ({
          ...order,
          notifyByEmail: order.notifyByEmail ?? true,
          customerPhone: order.customerPhone || '',
          notificationPreference: order.notificationPreference || 'email'
        }))
      });
    } catch (error: any) {
      console.error("Dashboard error:", error);
      res.status(500).json({ error: "Failed to load dashboard" });
    }
  });

  // Update order status (protected)
  app.patch("/api/admin/orders/:id", requireAuth, async (req, res) => {
    try {
      const orderId = parseInt(req.params.id);
      const { status, clientNote, noteFromEntrepreneur, notificationPreference } = req.body;

      const existingOrder = await storage.getPaymentOrderById(orderId);
      if (!existingOrder) {
        return res.status(404).json({ error: "Order niet gevonden" });
      }

      await storage.updatePaymentOrder(orderId, {
        status: status || existingOrder.status,
        clientNote: clientNote !== undefined ? clientNote : existingOrder.clientNote,
        noteFromEntrepreneur: noteFromEntrepreneur !== undefined ? noteFromEntrepreneur : existingOrder.noteFromEntrepreneur,
        notificationPreference: notificationPreference || existingOrder.notificationPreference,
        updatedAt: new Date()
      });

      // Send status update email notification
      if (status && existingOrder.customerEmail && existingOrder.notifyByEmail) {
        try {
          const statusMessages: { [key: string]: string } = {
            'pending': 'Uw bestelling wordt verwerkt',
            'Nieuw': 'Uw bestelling is ontvangen',
            'Bestelling in verwerking': 'Uw bestelling wordt verwerkt',
            'Bestelling verwerkt': 'Uw bestelling is verwerkt en gaat naar productie',
            'Bestelling in productie': 'Uw bestelling is in productie',
            'Bestelling is gereed': 'Uw bestelling is gereed voor levering',
            'U wordt gebeld voor levering': 'We nemen binnenkort contact op voor de levering'
          };

          const statusMessage = statusMessages[status] || status;
          let productType = 'Raambekledingsproduct';
          try {
            if (existingOrder.productDetails) {
              const details = JSON.parse(existingOrder.productDetails);
              productType = details.productType || 'Raambekledingsproduct';
            }
          } catch (error) {
            // Use default value
          }

          const subject = `KANIOU - Update bestelling ${existingOrder.bonnummer || existingOrder.orderNumber}`;
          const emailBody = `
Beste ${existingOrder.customerName},

Er is een update voor uw bestelling:

📦 Bestelnummer: ${existingOrder.bonnummer || existingOrder.orderNumber}
🛍️ Product: ${productType}
📋 Status: ${statusMessage}

${noteFromEntrepreneur ? `💬 Bericht van KANIOU: ${noteFromEntrepreneur}` : ''}

U kunt uw bestelling volgen via: https://kaniou.be/volg-bestelling

Met vriendelijke groet,
Team KANIOU
          `.trim();

          await sendMailgunEmail(existingOrder.customerEmail, subject, emailBody);
          console.log(`Status update email sent to ${existingOrder.customerEmail} for order ${orderId}`);
        } catch (emailError) {
          console.error(`Failed to send status update email:`, emailError);
        }
      }

      res.json({ 
        success: true, 
        message: "Order succesvol bijgewerkt" 
      });
    } catch (error: any) {
      console.error("Update order error:", error);
      res.status(500).json({ error: "Fout bij bijwerken order" });
    }
  });

  // Create new order (protected)
  app.post("/api/admin/orders", requireAuth, async (req, res) => {
    try {
      const {
        customerName,
        customerEmail,
        customerPhone = '',
        customerFirstName = '',
        customerLastName = '',
        customerAddress = '',
        customerCity = '',
        productType,
        amount,
        description,
        status = "pending",
        notifyByEmail = true,
        customerNote,
        internalNote,
        bonnummer
      } = req.body;

      if (!customerName || !customerEmail || !productType || !amount || !description || !bonnummer) {
        return res.status(400).json({ error: "Vereiste velden ontbreken" });
      }

      const orderData = {
        orderNumber: `ORD-${Date.now()}`,
        customerName,
        customerEmail,
        customerPhone,
        customerFirstName,
        customerLastName,
        customerAddress,
        customerCity,
        amount: parseFloat(amount),
        currency: 'EUR',
        description,
        status,
        redirectUrl: '',
        webhookUrl: '',
        productDetails: JSON.stringify({ productType }),
        customerDetails: JSON.stringify({ customerNote, internalNote }),
        molliePaymentId: `manual_${Date.now()}`,
        clientNote: customerNote || null,
        noteFromEntrepreneur: internalNote || null,
        pdfFileName: null,
        invoiceUrl: null,
        notificationPreference: 'email' as const,
        notifyByEmail: true,
        bonnummer
      };

      const newOrder = await storage.createPaymentOrder(orderData);

      // Send order confirmation email
      if (customerEmail && notifyByEmail) {
        try {
          const subject = `KANIOU - Bevestiging bestelling ${bonnummer}`;
          const emailBody = `
Beste ${customerName},

Bedankt voor uw bestelling bij KANIOU!

📦 Bestelnummer: ${bonnummer}
🛍️ Product: ${productType}
💰 Bedrag: €${amount}
📋 Status: Bestelling ontvangen

${description ? `Beschrijving: ${description}` : ''}

U kunt uw bestelling volgen via: https://kaniou.be/volg-bestelling

Wij houden u op de hoogte van de voortgang.

Met vriendelijke groet,
Team KANIOU
          `.trim();

          await sendMailgunEmail(customerEmail, subject, emailBody);
          console.log(`Order confirmation email sent to ${customerEmail}`);
        } catch (emailError) {
          console.error(`Failed to send order confirmation email:`, emailError);
        }
      }

      res.json({
        success: true,
        order: newOrder,
        message: "Order succesvol aangemaakt"
      });
    } catch (error: any) {
      console.error("Create order error:", error);
      res.status(500).json({ error: "Fout bij aanmaken order" });
    }
  });

  // Track order by bonnummer
  app.get("/api/orders/:orderNumber/track", async (req, res) => {
    try {
      const { orderNumber } = req.params;
      const order = await storage.getOrderByOrderNumber(orderNumber);
      
      if (!order) {
        return res.status(404).json({ error: "Bestelling niet gevonden" });
      }

      res.json(order);
    } catch (error: any) {
      console.error("Track order error:", error);
      res.status(500).json({ error: "Fout bij ophalen bestellingsstatus" });
    }
  });

  // Add customer note endpoint
  app.post("/api/orders/add-customer-note", async (req, res) => {
    try {
      const { orderId, noteText } = req.body;
      
      if (!orderId || !noteText) {
        return res.status(400).json({ error: "Order ID en notitie zijn vereist" });
      }

      const existingOrder = await storage.getPaymentOrderById(orderId);
      if (!existingOrder) {
        return res.status(404).json({ error: "Order niet gevonden" });
      }

      await storage.updatePaymentOrder(orderId, {
        clientNote: noteText,
        updatedAt: new Date()
      });

      res.json({ 
        success: true, 
        message: "Klantnotitie succesvol opgeslagen" 
      });
    } catch (error: any) {
      console.error("Add customer note error:", error);
      res.status(500).json({ error: "Fout bij opslaan notitie" });
    }
  });

  // Contact form endpoints for floating action buttons
  app.post("/api/contact/callback", async (req, res) => {
    try {
      const { firstName, lastName, phone, type } = req.body;

      if (!firstName || !lastName || !phone) {
        return res.status(400).json({ error: "Alle velden zijn verplicht" });
      }

      // Send email notification using SendGrid
      const subject = "KANIOU - Nieuw terugbelverzoek";
      const emailBody = `
Nieuw terugbelverzoek ontvangen via KANIOU website:

Naam: ${firstName} ${lastName}
Telefoonnummer: ${phone}
Type: Terugbelverzoek

Datum: ${new Date().toLocaleString('nl-BE')}

Deze klant vraagt om teruggebeld te worden.
      `.trim();

      try {
        await sendMailgunEmail({
          to: 'info@kaniou.be',
          subject: subject,
          text: emailBody
        });
        console.log("Callback request email sent successfully");
      } catch (emailError) {
        console.error("Failed to send callback email:", emailError);
        // Continue anyway - don't fail the request if email fails
      }

      res.json({ 
        success: true, 
        message: "Terugbelverzoek ontvangen" 
      });
    } catch (error: any) {
      console.error("Callback request error:", error);
      res.status(500).json({ error: "Er is een fout opgetreden" });
    }
  });

  app.post("/api/contact/question", async (req, res) => {
    try {
      const { name, email, message, type } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: "Alle velden zijn verplicht" });
      }

      // Send email notification using SendGrid
      const subject = "KANIOU - Nieuwe vraag via website";
      const emailBody = `
Nieuwe vraag ontvangen via KANIOU website:

Naam: ${name}
E-mailadres: ${email}
Bericht:
${message}

Type: Vraag via floating button
Datum: ${new Date().toLocaleString('nl-BE')}

Beantwoord deze vraag zo snel mogelijk via e-mail.
      `.trim();

      try {
        await sendMailgunEmail({
          to: 'info@kaniou.be',
          subject: subject,
          text: emailBody
        });
        console.log("Question email sent successfully");
      } catch (emailError) {
        console.error("Failed to send question email:", emailError);
        // Continue anyway - don't fail the request if email fails
      }

      res.json({ 
        success: true, 
        message: "Vraag verzonden" 
      });
    } catch (error: any) {
      console.error("Question submission error:", error);
      res.status(500).json({ error: "Er is een fout opgetreden" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}