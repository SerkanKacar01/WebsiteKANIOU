import express, { type Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { initializeAdminUser, startSessionCleanup } from "./adminSetup";
import { startSecurityAuditScheduler } from "./securityAudit";

function validateEnvironment() {
  const requiredEnvVars = ['DATABASE_URL'];
  const missingVars = requiredEnvVars.filter(v => !process.env[v]);
  
  if (missingVars.length > 0) {
    console.error(`Missing required environment variables: ${missingVars.join(', ')}`);
    console.error('Deployment cannot proceed without these variables configured in your Deployments settings.');
    process.exit(1);
  }
  
  console.log('Environment validation passed');
}

validateEnvironment();

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

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
        logLine = logLine.slice(0, 79) + "\u2026";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  await registerRoutes(app);
  
  await initializeAdminUser();
  startSessionCleanup();
  
  startSecurityAuditScheduler();
  
  if (app.get("env") === "development") {
    try {
      const { storage } = await import("./storage");
      const existingOrder = await storage.getPaymentOrderByBonnummer('DEMO12345').catch(() => null);
      if (existingOrder) {
        console.log("Demo order already exists - tracking system ready");
      } else {
        const testOrder = {
          orderNumber: 'DEMO12345',
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
          productDetails: JSON.stringify({ productType: 'Rolgordijnen', color: 'Wit', dimensions: '120cm x 180cm' }),
          customerDetails: JSON.stringify({}),
          molliePaymentId: `demo_${Date.now()}`,
          clientNote: 'Dit is een demo bestelling',
          noteFromEntrepreneur: 'Demo order voor bonnummer test',
          pdfFileName: null,
          invoiceUrl: null,
          notificationPreference: 'email' as const,
          notifyByEmail: true,
          bonnummer: 'DEMO12345',
        };
        await storage.createPaymentOrder(testOrder);
        console.log("Demo order created - tracking system ready");
      }
    } catch (error: any) {
      console.log("Demo order setup skipped");
    }
  }

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  const port = 5000;
  const host = "0.0.0.0";
  
  try {
    const server = app.listen(port, host, () => {
      log(`Server successfully listening on ${host}:${port}`);
      log(`Application ready to handle requests`);
      console.log(`Server details: NODE_ENV=${process.env.NODE_ENV}, PORT=${port}, HOST=${host}`);
    });

    server.on('error', (error: any) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use`);
      } else if (error.code === 'EACCES') {
        console.error(`Permission denied listening on port ${port}`);
      } else {
        console.error(`Server error:`, error);
      }
      process.exit(1);
    });

    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})().catch(error => {
  console.error('Application initialization failed:', error);
  process.exit(1);
});
