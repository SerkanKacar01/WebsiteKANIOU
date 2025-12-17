import type { Express } from "express";
import { shopStorage, calculateFabricPrice } from "./shop-storage";
import { z } from "zod";

// Validation schemas
const addToCartSchema = z.object({
  sessionId: z.string().min(1),
  fabricId: z.number().int().positive(),
  pleatId: z.number().int().positive().nullable().optional(),
  widthCm: z.number().int().min(30, "Minimale breedte is 30 cm"),
  heightCm: z.number().int().min(30, "Minimale hoogte is 30 cm"),
  quantity: z.number().int().min(1).default(1),
  isMadeToMeasure: z.boolean().default(false),
  notes: z.string().optional(),
});

const checkoutSchema = z.object({
  sessionId: z.string().min(1),
  customerEmail: z.string().email("Ongeldig e-mailadres"),
  customerFirstName: z.string().min(1, "Voornaam is verplicht"),
  customerLastName: z.string().min(1, "Achternaam is verplicht"),
  customerPhone: z.string().optional(),
  shippingAddress: z.string().min(1, "Adres is verplicht"),
  shippingCity: z.string().min(1, "Stad is verplicht"),
  shippingPostalCode: z.string().min(1, "Postcode is verplicht"),
  shippingCountry: z.string().default("BE"),
  customerNote: z.string().optional(),
});

export function registerShopRoutes(app: Express): void {
  // ==================== FABRICS ====================
  
  // Get all fabrics
  app.get("/api/shop/fabrics", async (req, res) => {
    try {
      const fabrics = await shopStorage.getCurtainFabrics();
      res.json(fabrics);
    } catch (error) {
      console.error("Error fetching fabrics:", error);
      res.status(500).json({ error: "Kon stoffen niet laden" });
    }
  });
  
  // Get featured fabrics
  app.get("/api/shop/fabrics/featured", async (req, res) => {
    try {
      const fabrics = await shopStorage.getFeaturedFabrics();
      res.json(fabrics);
    } catch (error) {
      console.error("Error fetching featured fabrics:", error);
      res.status(500).json({ error: "Kon uitgelichte stoffen niet laden" });
    }
  });
  
  // Get fabrics by category
  app.get("/api/shop/fabrics/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const fabrics = await shopStorage.getFabricsByCategory(category);
      res.json(fabrics);
    } catch (error) {
      console.error("Error fetching fabrics by category:", error);
      res.status(500).json({ error: "Kon stoffen niet laden" });
    }
  });
  
  // Get single fabric
  app.get("/api/shop/fabrics/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const fabric = await shopStorage.getCurtainFabricById(id);
      
      if (!fabric) {
        return res.status(404).json({ error: "Stof niet gevonden" });
      }
      
      res.json(fabric);
    } catch (error) {
      console.error("Error fetching fabric:", error);
      res.status(500).json({ error: "Kon stof niet laden" });
    }
  });
  
  // ==================== PLEAT TYPES ====================
  
  // Get all pleat types
  app.get("/api/shop/pleats", async (req, res) => {
    try {
      const pleats = await shopStorage.getPleatTypes();
      res.json(pleats);
    } catch (error) {
      console.error("Error fetching pleat types:", error);
      res.status(500).json({ error: "Kon plooitypes niet laden" });
    }
  });
  
  // ==================== PRICE CALCULATOR ====================
  
  // Calculate price for a configuration
  app.post("/api/shop/calculate-price", async (req, res) => {
    try {
      const { fabricId, pleatId, widthCm, heightCm, isMadeToMeasure } = req.body;
      
      const fabric = await shopStorage.getCurtainFabricById(fabricId);
      if (!fabric) {
        return res.status(404).json({ error: "Stof niet gevonden" });
      }
      
      // Validate height against fabric max height
      if (heightCm > fabric.maxHeight) {
        return res.status(400).json({ 
          error: `Hoogte mag niet meer dan ${fabric.maxHeight} cm zijn voor deze stof` 
        });
      }
      
      // Validate minimum width
      const minWidth = fabric.minWidth || 30;
      if (widthCm < minWidth) {
        return res.status(400).json({ 
          error: `Breedte moet minimaal ${minWidth} cm zijn` 
        });
      }
      
      let pleatPricePerMeter = 0;
      let fabricMultiplier = 1.0;
      
      if (pleatId) {
        const pleat = await shopStorage.getPleatTypeById(pleatId);
        if (pleat) {
          pleatPricePerMeter = pleat.pricePerMeter;
          fabricMultiplier = pleat.fabricMultiplier || 1.0;
        }
      }
      
      const price = calculateFabricPrice(
        fabric.pricePerMeter,
        widthCm,
        heightCm,
        pleatPricePerMeter,
        fabricMultiplier,
        isMadeToMeasure || false
      );
      
      res.json({ 
        price,
        breakdown: {
          fabricPricePerMeter: fabric.pricePerMeter,
          pleatPricePerMeter,
          fabricMultiplier,
          widthCm,
          heightCm,
          isMadeToMeasure: isMadeToMeasure || false,
        }
      });
    } catch (error) {
      console.error("Error calculating price:", error);
      res.status(500).json({ error: "Kon prijs niet berekenen" });
    }
  });
  
  // ==================== CART ====================
  
  // Get cart items
  app.get("/api/shop/cart/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const items = await shopStorage.getCartItems(sessionId);
      
      // Enrich items with fabric and pleat details
      const enrichedItems = await Promise.all(items.map(async (item) => {
        const fabric = await shopStorage.getCurtainFabricById(item.fabricId);
        let pleat = null;
        if (item.pleatId) {
          pleat = await shopStorage.getPleatTypeById(item.pleatId);
        }
        return {
          ...item,
          fabric,
          pleat,
        };
      }));
      
      const subtotal = enrichedItems.reduce((sum, item) => sum + (item.calculatedPrice * (item.quantity || 1)), 0);
      
      res.json({
        items: enrichedItems,
        itemCount: enrichedItems.length,
        subtotal: Math.round(subtotal * 100) / 100,
      });
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ error: "Kon winkelwagen niet laden" });
    }
  });
  
  // Add to cart
  app.post("/api/shop/cart", async (req, res) => {
    try {
      const validation = addToCartSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Ongeldige gegevens", 
          details: validation.error.issues 
        });
      }
      
      const data = validation.data;
      
      // Get fabric to validate and calculate price
      const fabric = await shopStorage.getCurtainFabricById(data.fabricId);
      if (!fabric) {
        return res.status(404).json({ error: "Stof niet gevonden" });
      }
      
      // Validate dimensions
      if (data.heightCm > fabric.maxHeight) {
        return res.status(400).json({ 
          error: `Hoogte mag niet meer dan ${fabric.maxHeight} cm zijn voor deze stof` 
        });
      }
      
      const minWidth = fabric.minWidth || 30;
      if (data.widthCm < minWidth) {
        return res.status(400).json({ 
          error: `Breedte moet minimaal ${minWidth} cm zijn` 
        });
      }
      
      // Get pleat if selected
      let pleatPricePerMeter = 0;
      let fabricMultiplier = 1.0;
      
      if (data.pleatId) {
        const pleat = await shopStorage.getPleatTypeById(data.pleatId);
        if (pleat) {
          pleatPricePerMeter = pleat.pricePerMeter;
          fabricMultiplier = pleat.fabricMultiplier || 1.0;
        }
      }
      
      // Calculate price
      const calculatedPrice = calculateFabricPrice(
        fabric.pricePerMeter,
        data.widthCm,
        data.heightCm,
        pleatPricePerMeter,
        fabricMultiplier,
        data.isMadeToMeasure
      );
      
      const cartItem = await shopStorage.addToCart({
        sessionId: data.sessionId,
        fabricId: data.fabricId,
        pleatId: data.pleatId || null,
        widthCm: data.widthCm,
        heightCm: data.heightCm,
        quantity: data.quantity,
        isMadeToMeasure: data.isMadeToMeasure,
        calculatedPrice,
        notes: data.notes,
      });
      
      res.json({ success: true, item: cartItem });
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ error: "Kon item niet toevoegen aan winkelwagen" });
    }
  });
  
  // Update cart item
  app.patch("/api/shop/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { quantity } = req.body;
      
      if (quantity !== undefined && (quantity < 1 || !Number.isInteger(quantity))) {
        return res.status(400).json({ error: "Ongeldig aantal" });
      }
      
      await shopStorage.updateCartItem(id, { quantity });
      res.json({ success: true });
    } catch (error) {
      console.error("Error updating cart item:", error);
      res.status(500).json({ error: "Kon item niet bijwerken" });
    }
  });
  
  // Remove from cart
  app.delete("/api/shop/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await shopStorage.removeFromCart(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error removing from cart:", error);
      res.status(500).json({ error: "Kon item niet verwijderen" });
    }
  });
  
  // Clear cart
  app.delete("/api/shop/cart/clear/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      await shopStorage.clearCart(sessionId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error clearing cart:", error);
      res.status(500).json({ error: "Kon winkelwagen niet legen" });
    }
  });
  
  // ==================== CHECKOUT ====================
  
  // Create checkout session (prepares for Stripe)
  app.post("/api/shop/checkout", async (req, res) => {
    try {
      const validation = checkoutSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Ongeldige gegevens", 
          details: validation.error.issues 
        });
      }
      
      const data = validation.data;
      
      // Get cart items
      const cartItems = await shopStorage.getCartItems(data.sessionId);
      if (cartItems.length === 0) {
        return res.status(400).json({ error: "Winkelwagen is leeg" });
      }
      
      // Calculate totals
      let subtotal = 0;
      for (const item of cartItems) {
        subtotal += item.calculatedPrice * (item.quantity || 1);
      }
      
      // Shipping cost (free above €150)
      const shippingCost = subtotal >= 150 ? 0 : 9.95;
      const totalAmount = subtotal + shippingCost;
      
      // Create order
      const order = await shopStorage.createFabricOrder({
        orderNumber: '', // Will be generated
        customerEmail: data.customerEmail,
        customerFirstName: data.customerFirstName,
        customerLastName: data.customerLastName,
        customerPhone: data.customerPhone,
        shippingAddress: data.shippingAddress,
        shippingCity: data.shippingCity,
        shippingPostalCode: data.shippingPostalCode,
        shippingCountry: data.shippingCountry,
        subtotal,
        shippingCost,
        totalAmount,
        customerNote: data.customerNote,
      });
      
      // Create order items
      for (const item of cartItems) {
        const fabric = await shopStorage.getCurtainFabricById(item.fabricId);
        let pleat = null;
        if (item.pleatId) {
          pleat = await shopStorage.getPleatTypeById(item.pleatId);
        }
        
        await shopStorage.createFabricOrderItem({
          orderId: order.id,
          fabricId: item.fabricId,
          pleatId: item.pleatId,
          fabricName: fabric?.name || 'Onbekende stof',
          fabricPricePerMeter: fabric?.pricePerMeter || 0,
          pleatName: pleat?.name,
          pleatPricePerMeter: pleat?.pricePerMeter,
          widthCm: item.widthCm,
          heightCm: item.heightCm,
          quantity: item.quantity || 1,
          isMadeToMeasure: item.isMadeToMeasure || false,
          lineTotal: item.calculatedPrice * (item.quantity || 1),
        });
      }
      
      // Clear cart after order creation
      await shopStorage.clearCart(data.sessionId);
      
      res.json({
        success: true,
        order: {
          id: order.id,
          orderNumber: order.orderNumber,
          totalAmount,
          shippingCost,
        },
      });
    } catch (error) {
      console.error("Error creating checkout:", error);
      res.status(500).json({ error: "Kon bestelling niet aanmaken" });
    }
  });
  
  // Get order by order number (for order confirmation page)
  app.get("/api/shop/orders/:orderNumber", async (req, res) => {
    try {
      const { orderNumber } = req.params;
      const order = await shopStorage.getFabricOrderByOrderNumber(orderNumber);
      
      if (!order) {
        return res.status(404).json({ error: "Bestelling niet gevonden" });
      }
      
      const items = await shopStorage.getOrderItems(order.id);
      
      res.json({ ...order, items });
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ error: "Kon bestelling niet laden" });
    }
  });
}
