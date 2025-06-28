import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Admin authentication routes
  app.get('/api/admin/auth-status', async (req: any, res) => {
    try {
      const isAuth = req.session && req.session.admin;
      res.json({ authenticated: !!isAuth, email: isAuth ? req.session.admin.email : null });
    } catch (error) {
      res.json({ authenticated: false });
    }
  });

  // Get all orders for admin dashboard
  app.get("/api/admin/dashboard", async (req, res) => {
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

  // Update order status
  app.patch("/api/admin/orders/:id", async (req, res) => {
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

      res.json({ 
        success: true, 
        message: "Order succesvol bijgewerkt" 
      });
    } catch (error: any) {
      console.error("Update order error:", error);
      res.status(500).json({ error: "Fout bij bijwerken order" });
    }
  });

  // Create new order
  app.post("/api/admin/orders", async (req, res) => {
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

  const httpServer = createServer(app);
  return httpServer;
}