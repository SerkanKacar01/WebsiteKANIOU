import express, { type Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { initializeAdminUser, startSessionCleanup } from "./adminSetup";

const app = express();

// Built-in body parsing middleware for Express 4.16+ and 5.x
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static file serving for Express 5.x
app.use('/attached_assets', express.static('attached_assets'));


app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson: any) {
    capturedJsonResponse = bodyJson;
    return originalResJson.call(this, bodyJson);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  await registerRoutes(app);
  
  // Initialize admin user and start session cleanup
  await initializeAdminUser();
  startSessionCleanup();
  
  // Create a test order for bonnummer demonstration (development only)
  if (app.get("env") === "development") {
    try {
      const { storage } = await import("./storage");
      
      // Check if test order already exists
      const existingOrder = await storage.getPaymentOrderByBonnummer('DEMO12345').catch(() => null);
      
      if (!existingOrder) {
        const testOrder = {
          orderNumber: 'DEMO12345', // Use the custom reference number as orderNumber
          customerName: 'Demo Klant',
          customerEmail: 'demo@kaniou.be',
          customerPhone: '+32467856405',
          customerFirstName: 'Demo',
          customerLastName: 'Klant',
          customerAddress: 'Demostraat 123',
          customerCity: 'Brussel',
          amount: 299.99,
          currency: 'EUR',
          description: 'Demo rolgordijn voor bonnummer test',
          status: 'Bestelling in productie',
          redirectUrl: '',
          webhookUrl: '',
          productDetails: JSON.stringify({ 
            productType: 'Rolgordijnen',
            color: 'Wit',
            dimensions: '120cm x 180cm'
          }),
          customerDetails: JSON.stringify({}),
          molliePaymentId: `demo_${Date.now()}`,
          clientNote: 'Dit is een demo bestelling om de bonnummer functionaliteit te testen',
          noteFromEntrepreneur: 'Demo order - bonnummer wordt correct getoond op status pagina',
          pdfFileName: null,
          invoiceUrl: null,
          notificationPreference: 'email' as const,
          notifyByEmail: true,
          bonnummer: 'DEMO12345', // Fixed bonnummer for easy testing
        };

        const createdOrder = await storage.createPaymentOrder(testOrder);
        console.log(`🎯 Demo order created for bonnummer testing:`);
        console.log(`   Order ID: ${createdOrder.id}`);
        console.log(`   Bonnummer: ${createdOrder.bonnummer}`);
        console.log(`   Status page: /bestelling-status/${createdOrder.id}`);
        console.log(`   Track page: /volg-bestelling (search: ${createdOrder.bonnummer})`);
      }
    } catch (error: any) {
      console.warn('Could not create demo order:', error.message);
      
      // Create demo orders in memory for testing the tracking system
      console.log("Creating demo orders in memory for testing...");
      if (!global.memoryOrders) {
        global.memoryOrders = [];
      }
      
      // Demo orders with different statuses for testing
      const demoOrders = [
        {
          id: 1,
          molliePaymentId: "tr_demo001",
          orderNumber: "ORD-2025-001", 
          bonnummer: "KAN-25-A7B9M3-XR",
          customerName: "Jan Janssen",
          customerEmail: "jan.janssen@example.be",
          amount: 299.99,
          currency: "EUR",
          description: "Rolgordijn voor woonkamer - Demo Bestelling",
          status: "In productie",
          redirectUrl: "https://kaniou.be/payment-success",
          webhookUrl: null,
          checkoutUrl: null,
          productDetails: { type: "Rolgordijn", color: "Beige", dimensions: "120x160cm" },
          customerDetails: { address: "Hoofdstraat 123", city: "Maasmechelen" },
          mollieStatus: "paid",
          clientNote: null,
          noteFromEntrepreneur: "Uw bestelling wordt momenteel geproduceerd",
          customerNote: "Wordt geproduceerd in onze werkplaats", 
          internalNote: "Klant wil levering op woensdag",
          pdfFileName: null,
          invoiceUrl: null,
          customerPhone: "+32499123456",
          customerFirstName: "Jan",
          customerLastName: "Janssen", 
          customerAddress: "Hoofdstraat 123",
          customerCity: "Maasmechelen",
          notifyByEmail: true,
          notifyByWhatsapp: false,
          notificationPreference: "email",
          notificationLogs: {},
          statusBestelOntvangen: new Date('2025-01-01'),
          statusInVerwerking: new Date('2025-01-02'),
          statusVerwerkt: new Date('2025-01-03'),
          statusInProductie: new Date('2025-01-05'),
          statusGereed: null,
          statusWordtGebeld: null,
          statusGeleverd: null,
          paidAt: new Date('2025-01-01'),
          createdAt: new Date('2025-01-01'),
          updatedAt: new Date('2025-01-05')
        },
        {
          id: 2, 
          molliePaymentId: "tr_demo002",
          orderNumber: "ORD-2025-002",
          bonnummer: "KAN-25-K2P8N7-DM", 
          customerName: "Marie Peeters",
          customerEmail: "marie.peeters@example.be",
          amount: 459.99,
          currency: "EUR", 
          description: "Houten jaloeziën - Demo Bestelling",
          status: "Gereed voor levering",
          redirectUrl: "https://kaniou.be/payment-success",
          webhookUrl: null,
          checkoutUrl: null,
          productDetails: { type: "Houten jaloeziën", color: "Wit", dimensions: "100x140cm" },
          customerDetails: { address: "Kerkstraat 45", city: "Hasselt" },
          mollieStatus: "paid",
          clientNote: null,
          noteFromEntrepreneur: "Uw jaloeziën zijn klaar! We nemen binnenkort contact op voor levering",
          customerNote: "Klaar voor levering - wordt binnenkort gecontacteerd",
          internalNote: "Klant heeft voorkeur voor levering 's ochtends",
          pdfFileName: null, 
          invoiceUrl: null,
          customerPhone: "+32477987654",
          customerFirstName: "Marie",
          customerLastName: "Peeters",
          customerAddress: "Kerkstraat 45", 
          customerCity: "Hasselt",
          notifyByEmail: true,
          notifyByWhatsapp: true,
          notificationPreference: "both",
          notificationLogs: {},
          statusBestelOntvangen: new Date('2024-12-15'),
          statusInVerwerking: new Date('2024-12-16'),
          statusVerwerkt: new Date('2024-12-17'),
          statusInProductie: new Date('2024-12-20'),
          statusGereed: new Date('2025-01-03'),
          statusWordtGebeld: null,
          statusGeleverd: null,
          paidAt: new Date('2024-12-15'),
          createdAt: new Date('2024-12-15'),
          updatedAt: new Date('2025-01-03')
        },
        {
          id: 3,
          molliePaymentId: "tr_demo003", 
          orderNumber: "ORD-2025-003",
          bonnummer: "KAN-25-R5T2Q8-FH",
          customerName: "Peter Van Der Berg", 
          customerEmail: "peter.vandenberg@example.be",
          amount: 189.99,
          currency: "EUR",
          description: "Plissé gordijnen - Demo Bestelling",
          status: "Geleverd",
          redirectUrl: "https://kaniou.be/payment-success",
          webhookUrl: null,
          checkoutUrl: null,
          productDetails: { type: "Plissé gordijnen", color: "Grijs", dimensions: "80x120cm" },
          customerDetails: { address: "Dorpsplein 12", city: "Genk" },
          mollieStatus: "paid", 
          clientNote: null,
          noteFromEntrepreneur: "Geleverd en geïnstalleerd. Veel plezier van uw nieuwe gordijnen!",
          customerNote: "Bestelling succesvol geleverd en geïnstalleerd",
          internalNote: "Klant zeer tevreden met resultaat",
          pdfFileName: null,
          invoiceUrl: null,
          customerPhone: "+32456789123",
          customerFirstName: "Peter", 
          customerLastName: "Van Der Berg",
          customerAddress: "Dorpsplein 12",
          customerCity: "Genk",
          notifyByEmail: true,
          notifyByWhatsapp: false,
          notificationPreference: "email",
          notificationLogs: {},
          statusBestelOntvangen: new Date('2024-11-20'),
          statusInVerwerking: new Date('2024-11-21'),
          statusVerwerkt: new Date('2024-11-22'),
          statusInProductie: new Date('2024-11-25'),
          statusGereed: new Date('2024-12-05'),
          statusWordtGebeld: new Date('2024-12-06'),
          statusGeleverd: new Date('2024-12-10'),
          paidAt: new Date('2024-11-20'),
          createdAt: new Date('2024-11-20'),
          updatedAt: new Date('2024-12-10')
        }
      ];
      
      global.memoryOrders = demoOrders;
      console.log("✅ Demo orders created in memory - tracking system ready for testing");
      console.log("Demo bonnummers for testing:");
      demoOrders.forEach(order => {
        console.log(`- ${order.bonnummer} (${order.customerName}) - Status: ${order.status}`);
      });
    }
  }

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  
  // Express 5.x - use app.listen() with proper callback
  const server = app.listen(port, "0.0.0.0", () => {
    log(`serving on port ${port}`);
  });

  // Setup appropriate serving based on environment
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
})();
