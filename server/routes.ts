import type { Express } from "express";
import express from "express";
import session from "express-session";
import ConnectPgSimple from "connect-pg-simple";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import { storage } from "./storage";
import { pool } from "./db";
import { SecureBonnummerGenerator, TrackingSecurityMonitor } from "./storage";
import {
  createSession,
  validateSession,
  deleteSession,
  isValidCredentials,
  isValidCredentialsAsync,
} from "./simpleAuth";
import {
  insertContactSubmissionSchema,
  insertQuoteRequestSchema,
  insertColorSampleRequestSchema,
} from "@shared/schema";
import { randomBytes } from "crypto";
import { adminLoginRateLimiter } from "./middleware/rateLimiter";
import { csrfProtection, csrfTokenEndpoint, generateCSRFToken } from "./middleware/csrf";
import {
  createHelmetMiddleware,
  createSecurityHeaders,
  createGlobalRateLimiter,
  createApiRateLimiter,
  createAuthRateLimiter,
  createFormRateLimiter,
  createHppProtection,
  inputSanitizationMiddleware,
  suspiciousActivityDetector,
  requestSizeLimiter,
  secureErrorHandler,
  generateRequestId,
  securityAuditLogger,
  bruteForcePrevention,
  noCache,
} from "./middleware/security";

function generateSecureSessionSecret(): string {
  const secret = randomBytes(64).toString('hex');
  console.warn('⚠️  SECURITY: Using generated session secret. Set SESSION_SECRET environment variable for production!');
  return secret;
}

export async function registerRoutes(app: Express): Promise<void> {
  app.set('trust proxy', 1);

  app.use(express.json({ limit: '100kb' }));
  app.use(express.urlencoded({ extended: false, limit: '100kb' }));

  app.use(cookieParser());

  app.use(generateRequestId());

  app.use(createHelmetMiddleware());

  app.use(createSecurityHeaders());

  app.use(createHppProtection());

  app.use(suspiciousActivityDetector);

  app.use(createGlobalRateLimiter());

  app.use(securityAuditLogger);

  // GDPR-compliant session configuration with enhanced security
  const isProduction = process.env.NODE_ENV === 'production' || process.env.REPL_SLUG === 'kaniou-production';
  const sessionSecret = process.env.SESSION_SECRET || generateSecureSessionSecret();
  
  // Get database connection for session storage
  let sessionStore;
  try {
    // Test database connectivity before initializing PgSession
    const testResult = await pool.query('SELECT 1');
    if (testResult) {
      const PgSession = ConnectPgSimple(session);
      sessionStore = new PgSession({
        pool,
        tableName: 'session',
        createTableIfMissing: true,
      });
      console.log('✅ Using PostgreSQL session store for multi-instance deployment');
    }
  } catch (error) {
    console.warn('⚠️  PostgreSQL session store unavailable, falling back to memory store:', error);
    // Fall back to memory store if database is unavailable
    sessionStore = new session.MemoryStore();
  }
  
  // Ensure sessionStore is always initialized
  if (!sessionStore) {
    console.warn('⚠️  Session store not initialized, using memory store fallback');
    sessionStore = new session.MemoryStore();
  }
  
  // Modern session configuration for Express 5.x with database-backed storage
  app.use(
    session({
      store: sessionStore,
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: isProduction,
        maxAge: 2 * 60 * 60 * 1000, // 2 hours
        sameSite: 'lax',
      },
    }),
  );

  // Admin authentication middleware for protected routes
  const requireAuth = async (req: any, res: any, next: any) => {
    const sessionId = req.session?.sessionId || req.cookies?.sessionId;

    if (!sessionId) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const session = await validateSession(sessionId);
    if (!session) {
      return res.status(401).json({ error: "Invalid or expired session" });
    }

    req.admin = session;
    next();
  };

  app.post("/api/admin/login", adminLoginRateLimiter, bruteForcePrevention, noCache, async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email en wachtwoord zijn vereist" });
      }

      if (typeof email !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ error: "Ongeldig verzoek" });
      }

      if (email.length > 254 || password.length > 128) {
        return res.status(400).json({ error: "Ongeldig verzoek" });
      }

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Ongeldig e-mailadres" });
      }

      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));

      if (await isValidCredentialsAsync(email, password)) {
        if ((req as any).recordBruteForce) (req as any).recordBruteForce(true);

        const { sessionId, expiresAt } = await createSession(email);

        console.log('🔑 SECURITY: Successful admin login:', {
          sessionId: sessionId.substring(0, 8) + '...',
          ip: req.ip || 'unknown',
          timestamp: new Date().toISOString()
        });

        (req.session as any).sessionId = sessionId;
        res.cookie("sessionId", sessionId, {
          httpOnly: true,
          secure: isProduction,
          maxAge: 2 * 60 * 60 * 1000,
          sameSite: 'lax',
          path: '/',
        });

        res.json({
          success: true,
          message: "Succesvol ingelogd",
          admin: { email },
        });
      } else {
        if ((req as any).recordBruteForce) (req as any).recordBruteForce(false);

        console.warn('🚨 SECURITY: Failed admin login attempt:', {
          ip: req.ip || 'unknown',
          timestamp: new Date().toISOString()
        });
        res.status(401).json({ error: "Ongeldige inloggegevens" });
      }
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Server error tijdens inloggen" });
    }
  });

  // Admin logout route
  app.post("/api/admin/logout", async (req: any, res) => {
    const sessionId = req.session?.sessionId || req.cookies?.sessionId;

    if (sessionId) {
      await deleteSession(sessionId);
      
      // Enhanced security logging for logout
      console.log('🔓 SECURITY: Admin logout:', {
        sessionId: sessionId.substring(0, 8) + '...',
        ip: req.ip || 'unknown',
        timestamp: new Date().toISOString()
      });
    }

    req.session.destroy((err: any) => {
      if (err) {
        console.error("Session destruction error:", err);
      }
    });

    res.clearCookie("sessionId");
    res.json({ success: true, message: "Succesvol uitgelogd" });
  });
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Language preference endpoint - no persistent storage for GDPR compliance
  app.post("/api/set-language", (req: any, res) => {
    try {
      const { language } = req.body;
      
      if (!language || !['nl', 'fr', 'en', 'tr'].includes(language)) {
        return res.status(400).json({ error: "Invalid language code" });
      }

      // No cookies stored - session-based language only for GDPR compliance
      console.log(`🔄 Language set to ${language} (session only - no persistent storage)`);
      
      res.json({ 
        success: true, 
        message: `Language set to ${language} (session only)`,
        cookieSet: false,
        reason: "GDPR compliance - no persistent storage without explicit consent system"
      });
    } catch (error) {
      console.error("Language setting error:", error);
      res.status(500).json({ error: "Server error setting language" });
    }
  });

  const apiLimiter = createApiRateLimiter();
  const formLimiter = createFormRateLimiter();

  app.post("/api/contact", formLimiter, inputSanitizationMiddleware, async (req, res) => {
    try {
      // Validate request body
      const validation = insertContactSubmissionSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({
          error: "Invalid form data",
          details: validation.error.issues,
        });
      }

      const { name, email, subject, message, website } = validation.data;

      // Check honeypot field for spam protection
      if (website && website.length > 0) {
        return res.status(400).json({ error: "Invalid submission" });
      }

      await storage.createContactSubmission({
        name,
        email,
        subject,
        message,
        type: "contact",
      });
      console.log(`📝 Contact form submission saved to database`);

      res.json({
        success: true,
        message: "Contact form submitted successfully",
      });
    } catch (error: any) {
      console.error("Contact form submission error:", error);
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  });

  // Color sample request submission endpoint
  app.post("/api/color-sample-requests", formLimiter, inputSanitizationMiddleware, async (req, res) => {
    try {
      // Validate request body
      const validation = insertColorSampleRequestSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({
          error: "Invalid color sample request data",
          details: validation.error.issues,
        });
      }

      const { email, selectedColor, colorName, website } = validation.data;

      // Check honeypot field for spam protection
      if (website && website.length > 0) {
        return res.status(400).json({ error: "Invalid submission" });
      }

      // Store the request in database
      const sampleRequest = await storage.createColorSampleRequest({
        email,
        selectedColor,
        colorName,
      });

      console.log(`📝 Color sample request saved to database: ${colorName} (${selectedColor})`);

      res.json({
        success: true,
        message: "Staalverzoek succesvol ingediend",
        requestId: sampleRequest.id,
      });

    } catch (error: any) {
      console.error("Color sample request submission error:", error);
      res.status(500).json({ error: "Er is een fout opgetreden bij het indienen van uw verzoek" });
    }
  });

  // Quote request submission endpoint
  app.post("/api/quote-requests", formLimiter, inputSanitizationMiddleware, async (req, res) => {
    try {
      // Validate request body
      const validation = insertQuoteRequestSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({
          error: "Invalid quote request data",
          details: validation.error.issues,
        });
      }

      const {
        name,
        email,
        phone,
        productType,
        dimensions,
        requirements,
        website,
      } = validation.data;

      // Check honeypot field for spam protection
      if (website && website.length > 0) {
        return res.status(400).json({ error: "Invalid submission" });
      }

      await storage.createQuoteRequest({
        name,
        email,
        phone,
        productType,
        dimensions: dimensions || "",
        requirements: requirements || "",
      });
      console.log(`📝 Quote request submission saved to database`);

      res.json({
        success: true,
        message: "Quote request submitted successfully",
      });
    } catch (error: any) {
      console.error("Quote request submission error:", error);
      res.status(500).json({ error: "Failed to submit quote request" });
    }
  });

  // Enterprise quote request submission
  app.post("/api/enterprise-quote-requests", formLimiter, inputSanitizationMiddleware, async (req, res) => {
    try {
      const { customerType, projectType, planning, hasMeasurements, rooms, preferences, services, contact, website } = req.body;

      if (website && website.length > 0) {
        return res.status(400).json({ error: "Invalid submission" });
      }

      const validCustomerTypes = ["Particulier", "Zakelijk", "Project"];
      const validProjectTypes = ["Nieuwbouw", "Renovatie", "Vervanging"];
      const validPlannings = ["asap", "2-4w", "1-2m", "later"];

      if (!customerType || !validCustomerTypes.includes(customerType)) {
        return res.status(400).json({ error: "Ongeldig klanttype" });
      }
      if (!projectType || !validProjectTypes.includes(projectType)) {
        return res.status(400).json({ error: "Ongeldig projecttype" });
      }
      if (!planning || !validPlannings.includes(planning)) {
        return res.status(400).json({ error: "Ongeldige planning" });
      }
      if (!Array.isArray(rooms) || rooms.length === 0) {
        return res.status(400).json({ error: "Minstens één ruimte vereist" });
      }
      for (const room of rooms) {
        if (!room.name || typeof room.name !== "string") {
          return res.status(400).json({ error: "Elke ruimte moet een naam hebben" });
        }
        if (!Array.isArray(room.windows) || room.windows.length === 0) {
          return res.status(400).json({ error: "Elke ruimte moet minstens één raam hebben" });
        }
        for (const win of room.windows) {
          if (!win.widthCm || !win.heightCm || win.widthCm <= 0 || win.heightCm <= 0 || win.widthCm > 2000 || win.heightCm > 1000) {
            return res.status(400).json({ error: "Ongeldige raammaten (breedte/hoogte moeten positief zijn)" });
          }
        }
      }
      if (!preferences || !Array.isArray(preferences.productTypes) || preferences.productTypes.length === 0) {
        return res.status(400).json({ error: "Selecteer minstens één producttype" });
      }
      if (!contact || typeof contact !== "object") {
        return res.status(400).json({ error: "Contactgegevens vereist" });
      }
      const { firstName, lastName, email, phone } = contact;
      if (!firstName || typeof firstName !== "string" || firstName.trim().length < 2) {
        return res.status(400).json({ error: "Voornaam is verplicht (min. 2 tekens)" });
      }
      if (!lastName || typeof lastName !== "string" || lastName.trim().length < 2) {
        return res.status(400).json({ error: "Achternaam is verplicht (min. 2 tekens)" });
      }
      if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: "Geldig e-mailadres is verplicht" });
      }
      if (!phone || typeof phone !== "string" || phone.trim().length < 8) {
        return res.status(400).json({ error: "Geldig telefoonnummer is verplicht" });
      }

      const submissionId = `OFR-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

      const quote = await storage.createEnterpriseQuote({
        submissionId,
        customerType,
        projectType,
        planning,
        hasMeasurements: hasMeasurements || false,
        rooms,
        preferences,
        services: services || {},
        contact,
        language: "nl",
        status: "nieuw",
      });

      console.log(`📝 Enterprise quote request saved to database: ${submissionId}`);

      res.json({ success: true, submissionId, message: "Offerteaanvraag succesvol ontvangen" });
    } catch (error: any) {
      console.error("Enterprise quote submission error:", error);
      res.status(500).json({ error: "Verzending mislukt" });
    }
  });

  // Admin: get enterprise quotes
  app.get("/api/admin/enterprise-quotes", requireAuth, async (req: any, res) => {
    try {
      const quotes = await storage.getEnterpriseQuotes();
      res.json(quotes);
    } catch (error) {
      console.error("Error fetching enterprise quotes:", error);
      res.status(500).json({ error: "Server error" });
    }
  });

  app.delete("/api/admin/enterprise-quotes/:id", requireAuth, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid quote ID" });
      }
      await storage.deleteEnterpriseQuote(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting enterprise quote:", error);
      res.status(500).json({ error: "Server error" });
    }
  });

  app.get("/api/admin/contact-submissions", requireAuth, async (req: any, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ error: "Server error" });
    }
  });

  // Admin authentication status route
  app.get("/api/admin/auth-status", async (req: any, res) => {
    try {
      // Check multiple sources for session ID with priority order
      const sessionId = req.cookies?.sessionId || req.session?.sessionId || req.headers?.authorization;
      
      console.log('🔍 Auth status check:', {
        cookieSessionId: req.cookies?.sessionId ? 'present' : 'missing',
        requestSessionId: req.session?.sessionId ? 'present' : 'missing',
        sessionId: sessionId ? sessionId.substring(0, 8) + '...' : 'none',
        sessionStore: req.session ? 'available' : 'missing'
      });

      if (!sessionId) {
        console.log('❌ No session ID found in any source');
        return res.json({ authenticated: false });
      }

      const session = await validateSession(sessionId);
      if (!session) {
        console.log('❌ Session validation failed - clearing cookies');
        // Clear invalid session cookie
        res.clearCookie('sessionId', { path: '/' });
        if (req.session) {
          delete req.session.sessionId;
          delete req.session.adminEmail;
        }
        return res.json({ authenticated: false });
      }

      console.log('✅ Session validated for:', session.email);
      
      // Refresh session in request if valid
      if (req.session && !req.session.sessionId) {
        req.session.sessionId = sessionId;
        req.session.adminEmail = session.email;
      }
      
      res.json({
        authenticated: true,
        email: session.email,
      });
    } catch (error) {
      console.error('Auth status error:', error);
      res.json({ authenticated: false });
    }
  });

  // Get all orders for admin dashboard (protected)
  app.get("/api/admin/dashboard", requireAuth, noCache, async (req, res) => {
    try {
      const orders = await storage.getPaymentOrders();

      // Get document counts for each order (with fallback)
      const ordersWithDocCounts = orders.map((order) => ({
        ...order,
        notifyByEmail: order.notifyByEmail ?? true,
        customerPhone: order.customerPhone || "",
        notificationPreference: order.notificationPreference || "email",
        documentCount: 0, // Default to 0 when database unavailable
      }));

      res.json({
        totalOrders: orders.length,
        pendingOrders: orders.filter((o) => o.status === "pending").length,
        totalRevenue: orders.reduce((sum, o) => sum + (o.amount || 0), 0),
        orders: ordersWithDocCounts,
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
      const {
        status,
        clientNote,
        noteFromEntrepreneur,
        notificationPreference,
        // Individual status fields
        statusBestelOntvangen,
        statusInVerwerking,
        statusVerwerkt,
        statusInProductie,
        statusGereed,
        statusWordtGebeld,
        statusGeleverd,
      } = req.body;

      const existingOrder = await storage.getPaymentOrderById(orderId);
      if (!existingOrder) {
        return res.status(404).json({ error: "Order niet gevonden" });
      }

      // Track what values are actually changing for smart notifications
      const newStatus = status || existingOrder.status;
      const newClientNote = clientNote !== undefined ? clientNote : existingOrder.clientNote;
      const newNoteFromEntrepreneur = noteFromEntrepreneur !== undefined 
        ? noteFromEntrepreneur 
        : existingOrder.noteFromEntrepreneur;

      // Determine if we should send notifications based on actual changes
      const statusChanged = newStatus !== existingOrder.status;
      const clientNoteChanged = newClientNote !== existingOrder.clientNote;
      const entrepreneurNoteChanged = newNoteFromEntrepreneur !== existingOrder.noteFromEntrepreneur;
      
      // Only send notification if status or customer-visible notes changed
      const shouldSendNotification = statusChanged || clientNoteChanged || entrepreneurNoteChanged;

      // Debug logging for change tracking
      console.log(`📝 Order ${orderId} update analysis:`);
      console.log(`   Status changed: ${statusChanged} (${existingOrder.status} → ${newStatus})`);
      console.log(`   Client note changed: ${clientNoteChanged}`);
      console.log(`   Entrepreneur note changed: ${entrepreneurNoteChanged}`);
      console.log(`   Will send notification: ${shouldSendNotification}`);

      // Prepare update data - include individual status fields if provided
      const updateData: any = {
        status: newStatus,
        clientNote: newClientNote,
        noteFromEntrepreneur: newNoteFromEntrepreneur,
        notificationPreference:
          notificationPreference || existingOrder.notificationPreference,
        updatedAt: new Date(),
      };

      // Add individual status fields if provided in request
      if (statusBestelOntvangen !== undefined) updateData.statusBestelOntvangen = statusBestelOntvangen;
      if (statusInVerwerking !== undefined) updateData.statusInVerwerking = statusInVerwerking;
      if (statusVerwerkt !== undefined) updateData.statusVerwerkt = statusVerwerkt;
      if (statusInProductie !== undefined) updateData.statusInProductie = statusInProductie;
      if (statusGereed !== undefined) updateData.statusGereed = statusGereed;
      if (statusWordtGebeld !== undefined) updateData.statusWordtGebeld = statusWordtGebeld;
      if (statusGeleverd !== undefined) updateData.statusGeleverd = statusGeleverd;

      // Map legacy status strings to individual status fields for backward compatibility
      if (statusChanged && !statusBestelOntvangen && !statusInVerwerking && !statusVerwerkt && !statusInProductie && !statusGereed && !statusWordtGebeld && !statusGeleverd) {
        console.log(`🔄 Mapping legacy status "${newStatus}" to individual status fields`);
        
        const now = new Date();
        
        // Define the status progression order
        const statusProgression = [
          { key: 'statusBestelOntvangen', labels: ['Nieuw', 'Bestelling ontvangen'] },
          { key: 'statusInVerwerking', labels: ['Bestelling in verwerking'] },
          { key: 'statusVerwerkt', labels: ['Bestelling verwerkt'] },
          { key: 'statusInProductie', labels: ['Bestelling in productie'] },
          { key: 'statusGereed', labels: ['Bestelling is gereed'] },
          { key: 'statusWordtGebeld', labels: ['U wordt gebeld voor levering'] },
          { key: 'statusGeleverd', labels: ['Bestelling geleverd'] }
        ];
        
        // Find the target status level
        let targetLevel = -1;
        for (let i = 0; i < statusProgression.length; i++) {
          if (statusProgression[i].labels.includes(newStatus)) {
            targetLevel = i;
            break;
          }
        }
        
        if (targetLevel >= 0) {
          // Clear all status fields first
          updateData.statusBestelOntvangen = null;
          updateData.statusInVerwerking = null;
          updateData.statusVerwerkt = null;
          updateData.statusInProductie = null;
          updateData.statusGereed = null;
          updateData.statusWordtGebeld = null;
          updateData.statusGeleverd = null;
          
          // Set all statuses up to and including the target level
          for (let i = 0; i <= targetLevel; i++) {
            const statusKey = statusProgression[i].key;
            updateData[statusKey] = now;
            console.log(`✅ Progressive status: ${statusKey} set to ${now.toISOString()}`);
          }
          
          console.log(`✅ Mapped "${newStatus}" with ${targetLevel + 1} progressive statuses activated`);
        } else {
          console.warn(`⚠️ No mapping found for status: "${newStatus}"`);
        }
      }

      await storage.updatePaymentOrder(orderId, updateData);

      // Send status update email notification ONLY if relevant fields changed
      if (
        shouldSendNotification &&
        existingOrder.customerEmail &&
        existingOrder.notifyByEmail
      ) {
        try {
          const statusMessages: { [key: string]: string } = {
            pending: "Uw bestelling wordt verwerkt",
            Nieuw: "Uw bestelling is ontvangen",
            "Bestelling in verwerking": "Uw bestelling wordt verwerkt",
            "Bestelling verwerkt":
              "Uw bestelling is verwerkt en gaat naar productie",
            "Bestelling in productie": "Uw bestelling is in productie",
            "Bestelling is gereed": "Uw bestelling is gereed voor levering",
            "U wordt gebeld voor levering":
              "We nemen binnenkort contact op voor de levering",
          };

          const statusMessage = statusMessages[newStatus] || newStatus;
          let productType = "Raambekledingsproduct";
          try {
            if (
              existingOrder.productDetails &&
              typeof existingOrder.productDetails === "string"
            ) {
              const details = JSON.parse(existingOrder.productDetails);
              productType = details.productType || "Raambekledingsproduct";
            }
          } catch (error) {
            // Use default value
          }

          const subject = `KANIOU - Update bestelling ${existingOrder.bonnummer || existingOrder.orderNumber}`;
          const emailBody = `
Geachte ${existingOrder.customerName},

We hopen dat alles goed met u gaat.  
Dit is een automatische update over uw maatwerkbestelling bij **KANIOU Zilvernaald || Gordijnen & Zonweringen**.

🧾 **Bestelgegevens**
━━━━━━━━━━━━━━━━━━━  
📦 Bestelnummer: ${existingOrder.bonnummer || existingOrder.orderNumber}
📋 Huidige status: ${statusMessage}

📞 **Contact**  
━━━━━━━━━━━━━━━━━━━  
Voor vragen over uw bestelling kunt u contact opnemen via info@kaniou.be of telefonisch.

🛠 **Over uw bestelling**  
━━━━━━━━━━━━━━━━━━━  
Uw bestelling wordt speciaal voor u op maat gemaakt met oog voor detail en kwaliteit.
We houden u uiteraard op de hoogte zodra uw bestelling gereed is voor levering of plaatsing.

📩 **Vragen of hulp nodig?**  
━━━━━━━━━━━━━━━━━━━  
Heeft u vragen over uw bestelling, levering of iets anders? Neem gerust contact met ons op:  
📧 E-mail: info@kaniou.be  
📞 Telefoon: +32 467 85 64 05 
🌐 Website: www.kaniou.be

${newNoteFromEntrepreneur ? `💬 Bericht van KANIOU: ${newNoteFromEntrepreneur}` : ""}

🛍 Bedankt voor uw vertrouwen in **KANIOU Zilvernaald || Gordijnen & Zonweringen** –  
Dé specialist in premium gordijnen en zonwering op maat.

Met vriendelijke groet,  
**Team KANIOU**  

Accountmanager
Mr. Serkan KACAR
          `.trim();

          console.log("📋 Status update opgeslagen voor order", orderId);
        } catch (emailError) {
          console.error(`Failed to send status update email:`, emailError);
        }
      } else if (!shouldSendNotification) {
        console.log(`🔇 No notification sent for order ${orderId} - no relevant changes detected`);
      } else {
        console.log(`🔇 No notification sent for order ${orderId} - customer email settings or missing email`);
      }

      res.json({
        success: true,
        message: "Order succesvol bijgewerkt",
      });
    } catch (error: any) {
      console.error("Update order error:", error);
      res.status(500).json({ error: "Fout bij bijwerken order" });
    }
  });

  // Update individual order status (protected)
  app.patch("/api/admin/orders/:id/status", requireAuth, async (req, res) => {
    try {
      const orderId = parseInt(req.params.id);
      const { statusKey, isActive } = req.body;

      if (!statusKey || typeof isActive !== 'boolean') {
        return res.status(400).json({ error: "Status key en actieve status zijn vereist" });
      }

      const existingOrder = await storage.getPaymentOrderById(orderId);
      if (!existingOrder) {
        return res.status(404).json({ error: "Order niet gevonden" });
      }

      await storage.updateOrderStatus(orderId, statusKey, isActive);

      res.json({
        success: true,
        message: `Status ${statusKey} ${isActive ? 'geactiveerd' : 'gedeactiveerd'}`,
      });
    } catch (error: any) {
      console.error("Update order status error:", error);
      res.status(500).json({ error: "Fout bij bijwerken status" });
    }
  });

  // Create new order (protected)
  app.post("/api/admin/orders", requireAuth, async (req, res) => {
    try {
      const {
        customerName,
        customerEmail,
        customerPhone = "",
        customerFirstName = "",
        customerLastName = "",
        customerAddress = "",
        customerCity = "",
        productType,
        productModel,
        productDetails,
        amount,
        description,
        status = "pending",
        expectedDeliveryDate,
        sendNotification = false,
        notifyByEmail = true,
        customerNote,
        internalNote,
        bonnummer,
      } = req.body;

      if (!customerName || !customerEmail) {
        return res.status(400).json({ error: "Vereiste velden ontbreken: klantnaam en email" });
      }

      // Generate bonnummer if not provided
      const finalBonnummer = bonnummer || `KAN-25-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Math.random().toString(36).substring(2, 4).toUpperCase()}`;

      const orderData = {
        orderNumber: finalBonnummer, // Use the custom reference number instead of auto-generated ID
        customerName,
        customerEmail,
        customerPhone,
        customerFirstName,
        customerLastName,
        customerAddress,
        customerCity,
        amount: amount ? parseFloat(amount) : 0,
        currency: "EUR",
        description: description || "Besteldetails beschikbaar in geüploade PDF",
        status,
        redirectUrl: "",
        webhookUrl: "",
        productDetails: JSON.stringify({ 
          productType: productType || "Zie PDF voor productdetails",
          productModel: productModel || null,
          productDetails: productDetails || null,
          expectedDeliveryDate: expectedDeliveryDate || null,
        }),
        customerDetails: JSON.stringify({ customerNote, internalNote }),
        molliePaymentId: `manual_${Date.now()}`,
        clientNote: customerNote || null,
        noteFromEntrepreneur: internalNote || null,
        pdfFileName: null,
        invoiceUrl: null,
        notificationPreference: "email" as const,
        notifyByEmail: true,
        bonnummer: finalBonnummer,
      };

      const newOrder = await storage.createPaymentOrder(orderData);

      // Send order confirmation email to customer (if notification enabled)
      if (customerEmail && sendNotification && (notifyByEmail || sendNotification)) {
        try {
          const subject = `KANIOU Zilvernaald | Orderbevestiging en besteloverzicht ${finalBonnummer}`;
          const emailBody = `
Geachte ${customerName},

Bedankt voor uw bestelling bij KANIOU zilvernaald || Gordijnen & Zonweringen.

We hopen dat alles goed met u gaat.  
Dit is een automatische update over uw maatwerkbestelling bij **KANIOU Zilvernaald**.

🧾 **Bestelgegevens**
━━━━━━━━━━━━━━━━━━━  
📦 Bestelnummer: ${finalBonnummer}
📋 Status: ${status || 'In behandeling'}
${productType ? `🏷️ Categorie: ${productType}` : ''}
${productModel ? `📋 Model: ${productModel}` : ''}
${productDetails ? `📝 Details: ${productDetails}` : ''}
${expectedDeliveryDate ? `📅 Verwachte levering: ${expectedDeliveryDate}` : ''}

📦 **Volg uw bestelling**  
━━━━━━━━━━━━━━━━━━━  
Voor vragen over uw bestelling kunt u contact opnemen via info@kaniou.be of +32 467 85 64 05.
${description ? `Beschrijving: ${description}` : ""}

🛠 **Over uw bestelling**  
━━━━━━━━━━━━━━━━━━━  
Uw bestelling wordt speciaal voor u op maat gemaakt met oog voor detail en kwaliteit.
We houden u uiteraard op de hoogte zodra uw bestelling gereed is voor levering of plaatsing.

📩 **Vragen of hulp nodig?**  
━━━━━━━━━━━━━━━━━━━  
Heeft u vragen over uw bestelling, levering of iets anders? Neem gerust contact met ons op:  
📧 E-mail: info@kaniou.be  
📞 Telefoon: +32 467 85 64 05 
🌐 Website: www.kaniou.be

🛍 Bedankt voor uw vertrouwen in **KANIOU Zilvernaald || Gordijnen & Zonweringen** –  
Dé specialist in premium gordijnen en zonwering op maat.

Wij houden u op de hoogte van de voortgang.

Met vriendelijke groet,  
**Team KANIOU**  

Accountmanager
Mr. Serkan KACAR
          `.trim();

          console.log(`📋 Orderbevestiging opgeslagen voor ${customerEmail}`);
        } catch (emailError) {
          console.error(`Failed to send order confirmation email:`, emailError);
        }
      }

      // Send admin notification email for new order
      try {
        const adminSubject = `🆕 NIEUWE BESTELLING - ${bonnummer} | KANIOU Admin Dashboard`;
        const adminEmailBody = `
🚨 **NIEUWE BESTELLING ONTVANGEN**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 **BESTELLING DETAILS**
• Bestelnummer: ${bonnummer}
• Order ID: ${newOrder.id}
• Bedrag: €${parseFloat(amount).toFixed(2)}
• Product: ${productType}
• Status: Bestelling ontvangen

👤 **KLANT INFORMATIE**
• Naam: ${customerName}
• E-mail: ${customerEmail}
• Telefoon: ${customerPhone || 'Niet opgegeven'}
• Adres: ${customerAddress || 'Niet opgegeven'}
• Stad: ${customerCity || 'Niet opgegeven'}

📝 **BESTELLING BESCHRIJVING**
${description}

💬 **KLANT NOTITIE**
${customerNote || 'Geen klantnotitie opgegeven'}

🔧 **INTERNE NOTITIE**
${internalNote || 'Geen interne notitie opgegeven'}

🌐 **DIRECTE ACTIES**
• Dashboard: https://kaniou.be/entrepreneur-dashboard
• Order bewerken: https://kaniou.be/entrepreneur-dashboard (zoek order ${bonnummer})
• Klant contact: info@kaniou.be

⚡ **VOLGENDE STAPPEN**
1. Log in op het admin dashboard
2. Bekijk de volledige orderdetails
3. Update de status wanneer verwerking begint
4. Klant ontvangt automatisch een statusupdate

📧 Notification Settings: ${notifyByEmail ? '✅ Email' : '❌ Email'}

────────────────────────────────────────
Dit is een automatische melding van het KANIOU bestellingssysteem.
Tijd: ${new Date().toLocaleString('nl-BE')}
        `.trim();

        console.log(`📋 Admin notificatie opgeslagen voor nieuwe order ${bonnummer}`);
      } catch (adminEmailError) {
        console.error(`Failed to send admin notification email:`, adminEmailError);
      }

      res.json({
        success: true,
        order: newOrder,
        message: "Order succesvol aangemaakt",
      });
    } catch (error: any) {
      console.error("Create order error:", error);
      res.status(500).json({ error: "Fout bij aanmaken order" });
    }
  });

  // Delete order (protected)
  app.delete("/api/admin/orders/:id", requireAuth, async (req, res) => {
    try {
      const orderId = parseInt(req.params.id);
      
      if (isNaN(orderId)) {
        return res.status(400).json({ error: "Ongeldig order ID" });
      }

      // Check if order exists before deleting
      const existingOrder = await storage.getPaymentOrderById(orderId);
      if (!existingOrder) {
        return res.status(404).json({ error: "Order niet gevonden" });
      }

      // Delete the order
      await storage.deletePaymentOrder(orderId);

      console.log(`Order ${orderId} successfully deleted by admin`);
      
      res.json({
        success: true,
        message: "Order succesvol verwijderd",
      });
    } catch (error: any) {
      console.error("Delete order error:", error);
      res.status(500).json({ error: "Fout bij verwijderen order" });
    }
  });

  // Document upload endpoint (protected)
  app.post("/api/orders/:id/upload-documents", requireAuth, async (req, res) => {
    try {
      const orderId = parseInt(req.params.id);
      
      if (isNaN(orderId)) {
        return res.status(400).json({ error: "Ongeldig order ID" });
      }

      // Check if order exists
      const existingOrder = await storage.getPaymentOrderById(orderId);
      if (!existingOrder) {
        return res.status(404).json({ error: "Order niet gevonden" });
      }

      // For now, we'll store document metadata without actual file storage
      // In a production environment, you would implement actual file upload to cloud storage
      const uploadedDocuments = [];
      
      // Mock document upload process - in reality you'd handle multipart/form-data
      if (req.body.documents && Array.isArray(req.body.documents)) {
        for (let i = 0; i < req.body.documents.length; i++) {
          const doc = req.body.documents[i];
          const documentType = req.body.documentTypes?.[i] || 'document';
          const isVisible = req.body.documentVisibility?.[i] === 'true';
          
          const documentData = {
            orderId: orderId,
            filename: `document_${i + 1}.pdf`, // Mock filename
            storedFilename: `order_${orderId}_doc_${Date.now()}_${i}.pdf`,
            documentType: documentType,
            filePath: `/uploads/orders/${orderId}/`,
            isVisibleToCustomer: isVisible,
            fileSize: 1024, // Mock file size
          };

          try {
            const savedDoc = await storage.createOrderDocument(documentData);
            uploadedDocuments.push(savedDoc);
          } catch (docError) {
            console.warn(`Failed to save document ${i + 1}:`, docError);
            // Continue with other documents
          }
        }
      }

      res.json({
        success: true,
        message: `${uploadedDocuments.length} documenten succesvol geüpload`,
        documents: uploadedDocuments,
      });
    } catch (error: any) {
      console.error("Document upload error:", error);
      res.status(500).json({ error: "Fout bij uploaden documenten" });
    }
  });

  // Get order documents endpoint (protected)
  app.get("/api/orders/:id/documents", requireAuth, async (req, res) => {
    try {
      const orderId = parseInt(req.params.id);
      
      if (isNaN(orderId)) {
        return res.status(400).json({ error: "Ongeldig order ID" });
      }

      const documents = await storage.getOrderDocuments(orderId);
      res.json(documents);
    } catch (error: any) {
      console.error("Get documents error:", error);
      res.status(500).json({ error: "Fout bij ophalen documenten" });
    }
  });

  // Update document visibility endpoint (protected)  
  app.patch("/api/orders/documents/:id/visibility", requireAuth, async (req, res) => {
    try {
      const documentId = parseInt(req.params.id);
      const { isVisible } = req.body;
      
      if (isNaN(documentId)) {
        return res.status(400).json({ error: "Ongeldig document ID" });
      }

      await storage.updateOrderDocumentVisibility(documentId, isVisible);
      
      res.json({
        success: true,
        message: "Document zichtbaarheid bijgewerkt",
      });
    } catch (error: any) {
      console.error("Update document visibility error:", error);
      res.status(500).json({ error: "Fout bij bijwerken document zichtbaarheid" });
    }
  });

  // Delete document endpoint (protected)
  app.delete("/api/orders/documents/:id", requireAuth, async (req, res) => {
    try {
      const documentId = parseInt(req.params.id);
      
      if (isNaN(documentId)) {
        return res.status(400).json({ error: "Ongeldig document ID" });
      }

      await storage.deleteOrderDocument(documentId);
      
      res.json({
        success: true,
        message: "Document succesvol verwijderd",
      });
    } catch (error: any) {
      console.error("Delete document error:", error);
      res.status(500).json({ error: "Fout bij verwijderen document" });
    }
  });




  // Add customer note endpoint
  app.post("/api/orders/add-customer-note", async (req, res) => {
    try {
      const { orderId, noteText } = req.body;

      if (!orderId || !noteText) {
        return res
          .status(400)
          .json({ error: "Order ID en notitie zijn vereist" });
      }

      const existingOrder = await storage.getPaymentOrderById(orderId);
      if (!existingOrder) {
        return res.status(404).json({ error: "Order niet gevonden" });
      }

      await storage.updatePaymentOrder(orderId, {
        clientNote: noteText,
        updatedAt: new Date(),
      });

      res.json({
        success: true,
        message: "Klantnotitie succesvol opgeslagen",
      });
    } catch (error: any) {
      console.error("Add customer note error:", error);
      res.status(500).json({ error: "Fout bij opslaan notitie" });
    }
  });

  // Contact form endpoints for floating action buttons
  app.post("/api/contact/callback", formLimiter, inputSanitizationMiddleware, async (req, res) => {
    try {
      const { firstName, lastName, phone } = req.body;

      if (!firstName || !lastName || !phone) {
        return res.status(400).json({ error: "Alle velden zijn verplicht" });
      }

      await storage.createContactSubmission({
        name: firstName + " " + lastName,
        email: "callback@kaniou.be",
        subject: "Terugbelverzoek",
        message: "Telefoonnummer: " + phone,
        type: "callback",
        phone,
      });
      console.log(`📝 Callback request saved to database`);

      res.json({
        success: true,
        message: "Terugbelverzoek ontvangen",
      });
    } catch (error: any) {
      console.error("Callback request error:", error);
      res.status(500).json({ error: "Er is een fout opgetreden" });
    }
  });

  app.post("/api/contact/question", formLimiter, inputSanitizationMiddleware, async (req, res) => {
    try {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: "Alle velden zijn verplicht" });
      }

      await storage.createContactSubmission({
        name,
        email,
        subject: "Vraag via website",
        message,
        type: "question",
      });
      console.log(`📝 Question saved to database`);

      res.json({
        success: true,
        message: "Vraag verzonden",
      });
    } catch (error: any) {
      console.error("Question submission error:", error);
      res.status(500).json({ error: "Er is een fout opgetreden" });
    }
  });

  // Gallery items endpoint
  app.get("/api/gallery", async (req, res) => {
    try {
      const galleryItems = await storage.getGalleryItems();
      res.json(galleryItems);
    } catch (error: any) {
      console.error("Gallery fetch error:", error);
      res.status(500).json({ error: "Failed to fetch gallery items" });
    }
  });

  // Testimonials endpoint
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error: any) {
      console.error("Testimonials fetch error:", error);
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  // Categories endpoints
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error: any) {
      console.error("Categories fetch error:", error);
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  app.post("/api/categories", async (req, res) => {
    try {
      const category = await storage.createCategory(req.body);
      res.status(201).json(category);
    } catch (error: any) {
      console.error("Category creation error:", error);
      res.status(500).json({ error: "Failed to create category" });
    }
  });

  // Products endpoints
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error: any) {
      console.error("Products fetch error:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.post("/api/products", async (req, res) => {
    try {
      const product = await storage.createProduct(req.body);
      res.status(201).json(product);
    } catch (error: any) {
      console.error("Product creation error:", error);
      res.status(500).json({ error: "Failed to create product" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProductById(id);
      
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      res.json(product);
    } catch (error: any) {
      console.error("Product fetch error:", error);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  app.get("/api/products/category/:categoryId", async (req, res) => {
    try {
      const categoryId = parseInt(req.params.categoryId);
      const products = await storage.getProductsByCategory(categoryId);
      res.json(products);
    } catch (error: any) {
      console.error("Products by category fetch error:", error);
      res.status(500).json({ error: "Failed to fetch products by category" });
    }
  });


  // 🔐 ULTRA-SECURE ORDER TRACKING ENDPOINT 🔐
  // This endpoint implements ALL security best practices against hackers
  app.get("/api/orders/track/:bonnummer", async (req, res) => {
    const clientIp = req.ip || req.connection.remoteAddress || 'unknown';
    const { bonnummer } = req.params;
    const { email } = req.query;

    try {
      // SECURITY LAYER 1: Rate limiting specific to tracking
      if (TrackingSecurityMonitor.isRateLimited(clientIp)) {
        console.warn(`🚨 BLOCKED: Rate limit exceeded for IP ${clientIp}`);
        return res.status(429).json({ 
          error: "Te veel tracking pogingen. Probeer later opnieuw.", 
          retryAfter: 3600 
        });
      }

      // SECURITY LAYER 2: Validate bonnummer format and checksum
      if (!SecureBonnummerGenerator.isValidBonnummer(bonnummer)) {
        TrackingSecurityMonitor.logSuspiciousActivity(clientIp, bonnummer, 'Invalid format/checksum attempt');
        return res.status(400).json({ 
          error: "Ongeldig bonnummer formaat. Controleer je invoer." 
        });
      }

      // SECURITY LAYER 3: Email verification (optional but recommended)
      const customerEmail = email ? email.toString().toLowerCase().trim() : undefined;
      if (customerEmail && !isValidEmail(customerEmail)) {
        TrackingSecurityMonitor.logSuspiciousActivity(clientIp, bonnummer, 'Invalid email format');
        return res.status(400).json({ 
          error: "Ongeldig e-mailadres formaat." 
        });
      }

      // SECURITY LAYER 4: Database lookup with all security checks
      const order = await storage.getPaymentOrderByBonnummer(bonnummer, customerEmail, clientIp);
      
      if (!order) {
        // Don't reveal if it's invalid format, non-existent, or access denied
        TrackingSecurityMonitor.logSuspiciousActivity(clientIp, bonnummer, 'Order not found or access denied');
        return res.status(404).json({ 
          error: "Bestelling niet gevonden of geen toegang." 
        });
      }

      // SECURITY LAYER 5: Return only safe, limited information
      const safeOrderInfo = {
        bonnummer: order.bonnummer,
        status: order.status,
        customerName: order.customerName?.charAt(0) + "*".repeat(Math.max(0, (order.customerName?.length || 1) - 2)) + order.customerName?.slice(-1),
        orderDate: order.createdAt ? new Date(order.createdAt).toLocaleDateString('nl-BE') : 'Onbekend',
        // Status progression (safe to show)
        statusProgress: {
          received: !!order.statusBestelOntvangen,
          processing: !!order.statusInVerwerking,
          processed: !!order.statusVerwerkt,
          production: !!order.statusInProductie,
          ready: !!order.statusGereed,
          contacted: !!order.statusWordtGebeld,
          delivered: !!order.statusGeleverd
        }
      };

      // Security log for successful tracking
      console.log(`✅ Secure tracking access: IP ${clientIp}, Order ${bonnummer}`);

      res.json({
        success: true,
        order: safeOrderInfo,
        message: "Bestelling gevonden"
      });

    } catch (error) {
      console.error("Secure tracking error:", error);
      TrackingSecurityMonitor.logSuspiciousActivity(clientIp, bonnummer, 'Server error during tracking');
      res.status(500).json({ 
        error: "Er is een fout opgetreden. Probeer later opnieuw." 
      });
    }
  });

  // Email validation helper function
  function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254; // RFC 5321 limit
  }

  app.use(secureErrorHandler);
}
