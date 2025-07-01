import type { Express } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import { storage } from "./storage";
import {
  createSession,
  validateSession,
  deleteSession,
  isValidCredentials,
} from "./simpleAuth";
import { sendEmail } from "./services/sendgrid";
import {
  insertContactSubmissionSchema,
  insertQuoteRequestSchema,
  insertColorSampleRequestSchema,
} from "@shared/schema";
import { createContactEmailHtml } from "./services/email";
import { sendMailgunEmail } from "./mailgun/sendMail";

export async function registerRoutes(app: Express): Promise<Server> {
  // Session and cookie middleware
  app.use(cookieParser());

  app.use(
    session({
      secret: process.env.SESSION_SECRET || "fallback-secret-key",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false, // Set to true in production with HTTPS
        httpOnly: true,
        maxAge: 2 * 60 * 60 * 1000, // 2 hours
      },
    }),
  );

  // Admin authentication middleware for protected routes
  const requireAuth = (req: any, res: any, next: any) => {
    const sessionId = req.session?.sessionId || req.cookies?.sessionId;

    if (!sessionId) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const session = validateSession(sessionId);
    if (!session) {
      return res.status(401).json({ error: "Invalid or expired session" });
    }

    req.admin = session;
    next();
  };

  // Admin login route
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email en wachtwoord zijn vereist" });
      }

      if (isValidCredentials(email, password)) {
        const { sessionId, expiresAt } = createSession(email);

        (req.session as any).sessionId = sessionId;
        res.cookie("sessionId", sessionId, {
          httpOnly: true,
          secure: false,
          maxAge: 2 * 60 * 60 * 1000,
        });

        res.json({
          success: true,
          message: "Succesvol ingelogd",
          admin: { email },
        });
      } else {
        res.status(401).json({ error: "Ongeldige inloggegevens" });
      }
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Server error tijdens inloggen" });
    }
  });

  // Admin logout route
  app.post("/api/admin/logout", (req: any, res) => {
    const sessionId = req.session?.sessionId || req.cookies?.sessionId;

    if (sessionId) {
      deleteSession(sessionId);
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

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
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

      // Send email notification to business first (most important)
      let emailSent = false;
      try {
        const emailSubject = `[KANIOU Contact] ${subject}`;
        const emailHtml = createContactEmailHtml({
          name,
          email,
          subject,
          message,
        });

        // Send plain text email for better deliverability
        const emailText = `
Nieuw contactformulier bericht van KANIOU website

Van: ${name}
E-mail: ${email}
Onderwerp: ${subject}

Bericht:
${message}

---
Dit bericht werd verzonden op ${new Date().toLocaleDateString("nl-NL")} om ${new Date().toLocaleTimeString("nl-NL")}
        `.trim();

        await sendMailgunEmail("info@kaniou.be", emailSubject, emailText);
        console.log(
          `✅ Contact form email sent successfully to info@kaniou.be from ${email}`,
        );
        emailSent = true;
      } catch (emailError) {
        console.error("❌ Failed to send contact form email:", emailError);
      }

      // Try to save to database (secondary priority)
      try {
        await storage.createContactSubmission({
          name,
          email,
          subject,
          message,
        });
        console.log(`📝 Contact form submission saved to database`);
      } catch (dbError) {
        console.warn(
          `⚠️ Database unavailable for contact form storage:`,
          (dbError as Error).message,
        );
        // Continue anyway - email is the primary goal
      }

      // Return success if email was sent (primary goal achieved)
      if (emailSent) {
        res.json({
          success: true,
          message: "Contact form submitted successfully",
        });
      } else {
        res.status(500).json({
          error: "Failed to send contact form email",
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

      // Send email notification to business first (most important)
      let emailSent = false;
      try {
        console.log(`🔄 QUOTE FORM: Preparing to send email for quote request from ${email}`);
        
        const emailSubject = `[KANIOU Offerte] ${productType} - ${name}`;

        const emailText = `
Nieuwe offerteaanvraag van KANIOU website

Klantgegevens:
- Naam: ${name}
- E-mail: ${email}
- Telefoon: ${phone}

Product Details:
- Type: ${productType}
- Afmetingen: ${dimensions || "Niet opgegeven"}

Aanvullende wensen:
${requirements || "Geen aanvullende wensen opgegeven"}

---
Deze offerteaanvraag werd verzonden op ${new Date().toLocaleDateString("nl-NL")} om ${new Date().toLocaleTimeString("nl-NL")}
        `.trim();

        console.log(`📧 QUOTE FORM: Sending email to info@kaniou.be with subject: ${emailSubject}`);
        await sendMailgunEmail("info@kaniou.be", emailSubject, emailText);
        console.log(
          `✅ Quote request email sent successfully to info@kaniou.be from ${email}`,
        );
        
        // BACKUP: Also send to alternative email to ensure delivery
        console.log(`📧 BACKUP: Sending copy to serkann.k01@gmail.com for guaranteed delivery`);
        await sendMailgunEmail("serkann.k01@gmail.com", `[BACKUP] ${emailSubject}`, 
          `BACKUP COPY - Original sent to info@kaniou.be\n\n${emailText}`);
        console.log(`✅ Backup email sent to serkann.k01@gmail.com`);
        
        emailSent = true;
      } catch (emailError) {
        console.error("❌ Failed to send quote request email:", emailError);
      }

      // Try to save to database (secondary priority)
      try {
        await storage.createQuoteRequest({
          name,
          email,
          phone,
          productType,
          dimensions: dimensions || "",
          requirements: requirements || "",
        });
        console.log(`📝 Quote request submission saved to database`);
      } catch (dbError) {
        console.warn(
          `⚠️ Database unavailable for quote request storage:`,
          (dbError as Error).message,
        );
        // Continue anyway - email is the primary goal
      }

      // Return success if email was sent (primary goal achieved)
      if (emailSent) {
        res.json({
          success: true,
          message: "Quote request submitted successfully",
        });
      } else {
        res.status(500).json({
          error: "Failed to send quote request email",
        });
      }
    } catch (error: any) {
      console.error("Quote request submission error:", error);
      res.status(500).json({ error: "Failed to submit quote request" });
    }
  });

  // Admin authentication status route
  app.get("/api/admin/auth-status", async (req: any, res) => {
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
        email: session.email,
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
        pendingOrders: orders.filter((o) => o.status === "pending").length,
        totalRevenue: orders.reduce((sum, o) => sum + (o.amount || 0), 0),
        orders: orders.map((order) => ({
          ...order,
          notifyByEmail: order.notifyByEmail ?? true,
          customerPhone: order.customerPhone || "",
          notificationPreference: order.notificationPreference || "email",
        })),
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

📦 **Volg uw bestelling**  
━━━━━━━━━━━━━━━━━━━  
U kunt de voortgang van uw bestelling op elk moment bekijken via de volgende link: https://kaniou.be/bestelling-status/${orderId}

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

          await sendMailgunEmail(
            existingOrder.customerEmail,
            subject,
            emailBody,
          );
          console.log(
            `📧 Status update email sent to ${existingOrder.customerEmail} for order ${orderId}`,
          );
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
        amount,
        description,
        status = "pending",
        notifyByEmail = true,
        customerNote,
        internalNote,
        bonnummer,
      } = req.body;

      if (
        !customerName ||
        !customerEmail ||
        !productType ||
        !amount ||
        !description ||
        !bonnummer
      ) {
        return res.status(400).json({ error: "Vereiste velden ontbreken" });
      }

      const orderData = {
        orderNumber: bonnummer, // Use the custom reference number instead of auto-generated ID
        customerName,
        customerEmail,
        customerPhone,
        customerFirstName,
        customerLastName,
        customerAddress,
        customerCity,
        amount: parseFloat(amount),
        currency: "EUR",
        description,
        status,
        redirectUrl: "",
        webhookUrl: "",
        productDetails: JSON.stringify({ productType }),
        customerDetails: JSON.stringify({ customerNote, internalNote }),
        molliePaymentId: `manual_${Date.now()}`,
        clientNote: customerNote || null,
        noteFromEntrepreneur: internalNote || null,
        pdfFileName: null,
        invoiceUrl: null,
        notificationPreference: "email" as const,
        notifyByEmail: true,
        bonnummer,
      };

      const newOrder = await storage.createPaymentOrder(orderData);

      // Send order confirmation email to customer
      if (customerEmail && notifyByEmail) {
        try {
          const subject = `KANIOU Zilvernaald | Orderbevestiging en besteloverzicht ${bonnummer}`;
          const emailBody = `
Geachte ${customerName},

Bedankt voor uw bestelling bij KANIOU zilvernaald || Gordijnen & Zonweringen.

We hopen dat alles goed met u gaat.  
Dit is een automatische update over uw maatwerkbestelling bij **KANIOU Zilvernaald**.

🧾 **Bestelgegevens**
━━━━━━━━━━━━━━━━━━━  
📦 Bestelnummer: ${bonnummer}
📋 Status: Bestelling ontvangen

📦 **Volg uw bestelling**  
━━━━━━━━━━━━━━━━━━━  
U kunt de voortgang van uw bestelling op elk moment bekijken via de volgende link: https://kaniou.be/bestelling-status/${newOrder.id}
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

          await sendMailgunEmail(customerEmail, subject, emailBody);
          console.log(`📧 Order confirmation email sent to ${customerEmail}`);
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
• Klant status: https://kaniou.be/bestelling-status/${newOrder.id}

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

        await sendMailgunEmail('info@kaniou.be', adminSubject, adminEmailBody);
        console.log(`🔔 Admin notification sent for new order ${bonnummer}`);
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

  // Track order by bonnummer
  app.get("/api/orders/track/bonnummer/:bonnummer", async (req, res) => {
    try {
      const { bonnummer } = req.params;
      const order = await storage.getPaymentOrderByBonnummer(bonnummer);

      if (!order) {
        return res.status(404).json({ 
          error: "Bestelling niet gevonden",
          message: "Het ingevoerde bonnummer is niet gevonden. Controleer het nummer en probeer opnieuw."
        });
      }

      res.json(order);
    } catch (error: any) {
      console.error("Track order by bonnummer error:", error);
      res.status(500).json({ error: "Fout bij ophalen bestellingsstatus" });
    }
  });

  // Get order details by orderId for status page
  app.get("/api/orders/:orderId", async (req, res) => {
    try {
      const orderId = parseInt(req.params.orderId);
      
      if (isNaN(orderId)) {
        return res.status(400).json({ error: "Ongeldig order ID" });
      }

      const order = await storage.getPaymentOrderById(orderId);

      if (!order) {
        return res.status(404).json({ 
          error: "Bestelling niet gevonden",
          message: "Deze bestelling bestaat niet of is niet toegankelijk."
        });
      }

      res.json(order);
    } catch (error: any) {
      console.error("Get order by ID error:", error);
      res.status(500).json({ error: "Fout bij ophalen bestellingsinformatie" });
    }
  });

  // Legacy endpoint - Track order by orderNumber
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

Datum: ${new Date().toLocaleString("nl-BE")}

Deze klant vraagt om teruggebeld te worden.
      `.trim();

      try {
        await sendEmail({
          to: "info@kaniou.be",
          subject: subject,
          text: emailBody,
        });
        console.log("Callback request email sent successfully");
      } catch (emailError) {
        console.error("Failed to send callback email:", emailError);
        // Continue anyway - don't fail the request if email fails
      }

      res.json({
        success: true,
        message: "Terugbelverzoek ontvangen",
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
Datum: ${new Date().toLocaleString("nl-BE")}

Beantwoord deze vraag zo snel mogelijk via e-mail.
      `.trim();

      try {
        await sendEmail({
          to: "info@kaniou.be",
          subject: subject,
          text: emailBody,
        });
        console.log("Question email sent successfully");
      } catch (emailError) {
        console.error("Failed to send question email:", emailError);
        // Continue anyway - don't fail the request if email fails
      }

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

  const httpServer = createServer(app);
  return httpServer;
}
