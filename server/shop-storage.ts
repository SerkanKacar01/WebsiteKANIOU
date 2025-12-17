import {
  curtainFabrics,
  CurtainFabric,
  InsertCurtainFabric,
  pleatTypes,
  PleatType,
  InsertPleatType,
  cartItems,
  CartItem,
  InsertCartItem,
  fabricOrders,
  FabricOrder,
  InsertFabricOrder,
  fabricOrderItems,
  FabricOrderItem,
  InsertFabricOrderItem,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";
import { randomBytes } from 'crypto';

// Generate unique order number
function generateOrderNumber(): string {
  const prefix = 'KAN-SHOP';
  const year = new Date().getFullYear().toString().slice(-2);
  const chars = 'ABCDEFGHIJKLMNPQRSTUVWXYZ23456789';
  let randomPart = '';
  for (let i = 0; i < 6; i++) {
    randomPart += chars[Math.floor(Math.random() * chars.length)];
  }
  return `${prefix}-${year}-${randomPart}`;
}

// Calculate fabric price based on dimensions and options
export function calculateFabricPrice(
  pricePerMeter: number,
  widthCm: number,
  heightCm: number,
  pleatPricePerMeter: number = 0,
  fabricMultiplier: number = 1.0,
  isMadeToMeasure: boolean = false
): number {
  // Convert cm to meters for calculation
  const widthM = widthCm / 100;
  const heightM = heightCm / 100;
  
  // Calculate fabric needed (width * multiplier for pleats)
  const fabricWidthNeeded = widthM * fabricMultiplier;
  
  // Price is based on running meters (height determines length needed)
  const fabricCost = fabricWidthNeeded * heightM * pricePerMeter;
  
  // Pleat cost is per running meter
  const pleatCost = fabricWidthNeeded * pleatPricePerMeter;
  
  // Made-to-measure adds 15% surcharge
  const madeToMeasureSurcharge = isMadeToMeasure ? (fabricCost + pleatCost) * 0.15 : 0;
  
  return Math.round((fabricCost + pleatCost + madeToMeasureSurcharge) * 100) / 100;
}

export interface IShopStorage {
  // Fabrics
  getCurtainFabrics(): Promise<CurtainFabric[]>;
  getCurtainFabricById(id: number): Promise<CurtainFabric | undefined>;
  getFeaturedFabrics(): Promise<CurtainFabric[]>;
  getFabricsByCategory(category: string): Promise<CurtainFabric[]>;
  createCurtainFabric(fabric: InsertCurtainFabric): Promise<CurtainFabric>;
  updateCurtainFabric(id: number, updates: Partial<CurtainFabric>): Promise<void>;
  
  // Pleat Types
  getPleatTypes(): Promise<PleatType[]>;
  getPleatTypeById(id: number): Promise<PleatType | undefined>;
  
  // Cart
  getCartItems(sessionId: string): Promise<CartItem[]>;
  getCartItemById(id: number): Promise<CartItem | undefined>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, updates: Partial<CartItem>): Promise<void>;
  removeFromCart(id: number): Promise<void>;
  clearCart(sessionId: string): Promise<void>;
  
  // Orders
  createFabricOrder(order: InsertFabricOrder): Promise<FabricOrder>;
  getFabricOrderById(id: number): Promise<FabricOrder | undefined>;
  getFabricOrderByOrderNumber(orderNumber: string): Promise<FabricOrder | undefined>;
  getFabricOrders(): Promise<FabricOrder[]>;
  updateFabricOrder(id: number, updates: Partial<FabricOrder>): Promise<void>;
  
  // Order Items
  createFabricOrderItem(item: InsertFabricOrderItem): Promise<FabricOrderItem>;
  getOrderItems(orderId: number): Promise<FabricOrderItem[]>;
}

class ShopDatabaseStorage implements IShopStorage {
  // ==================== FABRICS ====================
  async getCurtainFabrics(): Promise<CurtainFabric[]> {
    try {
      return await db.select().from(curtainFabrics).where(eq(curtainFabrics.isActive, true));
    } catch (error) {
      console.error('Error fetching fabrics:', error);
      return [];
    }
  }
  
  async getCurtainFabricById(id: number): Promise<CurtainFabric | undefined> {
    try {
      const result = await db.select().from(curtainFabrics).where(eq(curtainFabrics.id, id));
      return result[0];
    } catch (error) {
      console.error('Error fetching fabric by id:', error);
      return undefined;
    }
  }
  
  async getFeaturedFabrics(): Promise<CurtainFabric[]> {
    try {
      return await db.select().from(curtainFabrics)
        .where(and(eq(curtainFabrics.isActive, true), eq(curtainFabrics.isFeatured, true)));
    } catch (error) {
      console.error('Error fetching featured fabrics:', error);
      return [];
    }
  }
  
  async getFabricsByCategory(category: string): Promise<CurtainFabric[]> {
    try {
      return await db.select().from(curtainFabrics)
        .where(and(eq(curtainFabrics.isActive, true), eq(curtainFabrics.category, category)));
    } catch (error) {
      console.error('Error fetching fabrics by category:', error);
      return [];
    }
  }
  
  async createCurtainFabric(fabric: InsertCurtainFabric): Promise<CurtainFabric> {
    const result = await db.insert(curtainFabrics).values(fabric).returning();
    return result[0];
  }
  
  async updateCurtainFabric(id: number, updates: Partial<CurtainFabric>): Promise<void> {
    await db.update(curtainFabrics).set(updates).where(eq(curtainFabrics.id, id));
  }
  
  // ==================== PLEAT TYPES ====================
  async getPleatTypes(): Promise<PleatType[]> {
    try {
      return await db.select().from(pleatTypes)
        .where(eq(pleatTypes.isActive, true))
        .orderBy(pleatTypes.sortOrder);
    } catch (error) {
      console.error('Error fetching pleat types:', error);
      return [];
    }
  }
  
  async getPleatTypeById(id: number): Promise<PleatType | undefined> {
    try {
      const result = await db.select().from(pleatTypes).where(eq(pleatTypes.id, id));
      return result[0];
    } catch (error) {
      console.error('Error fetching pleat type by id:', error);
      return undefined;
    }
  }
  
  // ==================== CART ====================
  async getCartItems(sessionId: string): Promise<CartItem[]> {
    try {
      return await db.select().from(cartItems)
        .where(eq(cartItems.sessionId, sessionId))
        .orderBy(desc(cartItems.createdAt));
    } catch (error) {
      console.error('Error fetching cart items:', error);
      return [];
    }
  }
  
  async getCartItemById(id: number): Promise<CartItem | undefined> {
    try {
      const result = await db.select().from(cartItems).where(eq(cartItems.id, id));
      return result[0];
    } catch (error) {
      console.error('Error fetching cart item by id:', error);
      return undefined;
    }
  }
  
  async addToCart(item: InsertCartItem): Promise<CartItem> {
    const result = await db.insert(cartItems).values(item).returning();
    return result[0];
  }
  
  async updateCartItem(id: number, updates: Partial<CartItem>): Promise<void> {
    await db.update(cartItems).set({ ...updates, updatedAt: new Date() }).where(eq(cartItems.id, id));
  }
  
  async removeFromCart(id: number): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.id, id));
  }
  
  async clearCart(sessionId: string): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.sessionId, sessionId));
  }
  
  // ==================== ORDERS ====================
  async createFabricOrder(order: InsertFabricOrder): Promise<FabricOrder> {
    const orderNumber = order.orderNumber || generateOrderNumber();
    const result = await db.insert(fabricOrders).values({
      ...order,
      orderNumber,
    }).returning();
    return result[0];
  }
  
  async getFabricOrderById(id: number): Promise<FabricOrder | undefined> {
    try {
      const result = await db.select().from(fabricOrders).where(eq(fabricOrders.id, id));
      return result[0];
    } catch (error) {
      console.error('Error fetching order by id:', error);
      return undefined;
    }
  }
  
  async getFabricOrderByOrderNumber(orderNumber: string): Promise<FabricOrder | undefined> {
    try {
      const result = await db.select().from(fabricOrders).where(eq(fabricOrders.orderNumber, orderNumber));
      return result[0];
    } catch (error) {
      console.error('Error fetching order by order number:', error);
      return undefined;
    }
  }
  
  async getFabricOrders(): Promise<FabricOrder[]> {
    try {
      return await db.select().from(fabricOrders).orderBy(desc(fabricOrders.createdAt));
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  }
  
  async updateFabricOrder(id: number, updates: Partial<FabricOrder>): Promise<void> {
    await db.update(fabricOrders).set({ ...updates, updatedAt: new Date() }).where(eq(fabricOrders.id, id));
  }
  
  // ==================== ORDER ITEMS ====================
  async createFabricOrderItem(item: InsertFabricOrderItem): Promise<FabricOrderItem> {
    const result = await db.insert(fabricOrderItems).values(item).returning();
    return result[0];
  }
  
  async getOrderItems(orderId: number): Promise<FabricOrderItem[]> {
    try {
      return await db.select().from(fabricOrderItems).where(eq(fabricOrderItems.orderId, orderId));
    } catch (error) {
      console.error('Error fetching order items:', error);
      return [];
    }
  }
}

export const shopStorage = new ShopDatabaseStorage();
