import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { cookieConsentMiddleware } from "./middleware/cookieConsent";
import { initializeAdminUser, startSessionCleanup } from "./adminSetup";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve attached assets statically
app.use('/attached_assets', express.static('attached_assets'));

// GDPR Cookie Consent Middleware - must be before other middlewares
app.use(cookieConsentMiddleware);

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
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
  const server = await registerRoutes(app);
  
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
          orderNumber: `ORD-${Date.now()}`,
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
    } catch (error) {
      console.warn('Could not create demo order:', error.message);
    }
  }

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
