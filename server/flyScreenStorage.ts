import { db } from "./db";
import { 
  flyScreenOrders, 
  FlyScreenOrder, 
  InsertFlyScreenOrder 
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export class FlyScreenOrderStorage {
  async createFlyScreenOrder(order: InsertFlyScreenOrder): Promise<FlyScreenOrder> {
    // Generate unique order number
    const orderNumber = `FS-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    // Calculate total price
    const basePrice = 49.95;
    let totalPrice = basePrice;
    
    // Add extra costs for dimensions over 100x100cm
    if (order.width > 100) {
      totalPrice += Math.ceil((order.width - 100) / 10) * 10;
    }
    if (order.height > 100) {
      totalPrice += Math.ceil((order.height - 100) / 10) * 10;
    }
    
    // Add surcharge for black mesh
    if (order.meshColor === 'black') {
      totalPrice += 5;
    }
    
    const [result] = await db.insert(flyScreenOrders).values({
      ...order,
      orderNumber,
      totalPrice,
    }).returning();
    return result;
  }

  async getFlyScreenOrderById(id: number): Promise<FlyScreenOrder | undefined> {
    const [result] = await db.select().from(flyScreenOrders)
      .where(eq(flyScreenOrders.id, id));
    return result;
  }

  async getFlyScreenOrderByOrderNumber(orderNumber: string): Promise<FlyScreenOrder | undefined> {
    const [result] = await db.select().from(flyScreenOrders)
      .where(eq(flyScreenOrders.orderNumber, orderNumber));
    return result;
  }

  async updateFlyScreenOrder(id: number, updates: Partial<FlyScreenOrder>): Promise<FlyScreenOrder> {
    const [result] = await db.update(flyScreenOrders)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(flyScreenOrders.id, id))
      .returning();
    return result;
  }

  async getFlyScreenOrders(): Promise<FlyScreenOrder[]> {
    return await db.select().from(flyScreenOrders)
      .orderBy(desc(flyScreenOrders.createdAt));
  }
}

export const flyScreenStorage = new FlyScreenOrderStorage();