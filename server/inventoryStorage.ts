/**
 * Inventory Storage Module for KANIOU
 * Handles all inventory alert and stock management database operations
 */

import { db } from "./db";
import { eq, desc, and, sql } from "drizzle-orm";
import {
  inventoryAlerts,
  InventoryAlert,
  InsertInventoryAlert,
  productStock,
  ProductStock,
  InsertProductStock,
  inventoryAlertLog,
  InventoryAlertLog,
  InsertInventoryAlertLog,
} from "@shared/schema";

export class InventoryStorage {
  // Inventory Alerts Implementation
  async createInventoryAlert(alert: InsertInventoryAlert): Promise<InventoryAlert> {
    const [result] = await db.insert(inventoryAlerts).values(alert).returning();
    return result;
  }

  async getInventoryAlertsByProduct(productName: string, productVariant?: string): Promise<InventoryAlert[]> {
    return db.select()
      .from(inventoryAlerts)
      .where(
        and(
          eq(inventoryAlerts.productName, productName),
          productVariant 
            ? eq(inventoryAlerts.productVariant, productVariant)
            : eq(inventoryAlerts.productVariant, null)
        )
      );
  }

  async getActiveInventoryAlerts(): Promise<InventoryAlert[]> {
    return db.select()
      .from(inventoryAlerts)
      .where(
        and(
          eq(inventoryAlerts.isActive, true),
          eq(inventoryAlerts.notificationSent, false)
        )
      );
  }

  async updateInventoryAlert(id: number, updates: Partial<InventoryAlert>): Promise<InventoryAlert> {
    const [result] = await db.update(inventoryAlerts)
      .set(updates)
      .where(eq(inventoryAlerts.id, id))
      .returning();
    return result;
  }

  async deactivateInventoryAlert(id: number): Promise<void> {
    await db.update(inventoryAlerts)
      .set({ isActive: false })
      .where(eq(inventoryAlerts.id, id));
  }

  // Product Stock Implementation
  async getProductStock(productName: string, productVariant?: string): Promise<ProductStock | undefined> {
    const [result] = await db.select()
      .from(productStock)
      .where(
        and(
          eq(productStock.productName, productName),
          productVariant 
            ? eq(productStock.productVariant, productVariant)
            : eq(productStock.productVariant, null)
        )
      );
    return result;
  }

  async createProductStock(stock: InsertProductStock): Promise<ProductStock> {
    const [result] = await db.insert(productStock).values(stock).returning();
    return result;
  }

  async updateProductStock(productName: string, productVariant: string | null, updates: Partial<ProductStock>): Promise<ProductStock> {
    const [result] = await db.update(productStock)
      .set({ ...updates, lastUpdated: new Date() })
      .where(
        and(
          eq(productStock.productName, productName),
          productVariant 
            ? eq(productStock.productVariant, productVariant)
            : eq(productStock.productVariant, null)
        )
      )
      .returning();
    return result;
  }

  async getLowStockProducts(): Promise<ProductStock[]> {
    return db.select()
      .from(productStock)
      .where(
        and(
          eq(productStock.isAvailable, true),
          sql`${productStock.stockLevel} <= ${productStock.lowStockThreshold}`
        )
      );
  }

  // Inventory Alert Log Implementation
  async createInventoryAlertLog(log: InsertInventoryAlertLog): Promise<InventoryAlertLog> {
    const [result] = await db.insert(inventoryAlertLog).values(log).returning();
    return result;
  }

  async getInventoryAlertLogs(alertId: number): Promise<InventoryAlertLog[]> {
    return db.select()
      .from(inventoryAlertLog)
      .where(eq(inventoryAlertLog.alertId, alertId))
      .orderBy(desc(inventoryAlertLog.sentAt));
  }
}

// Initialize the inventory storage
export const inventoryStorage = new InventoryStorage();