import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertCategorySchema,
  insertProductSchema,
  insertGalleryItemSchema,
  insertTestimonialSchema,
  insertQuoteRequestSchema,
  insertContactSubmissionSchema
} from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { sendEmail, createContactEmailHtml, createQuoteRequestEmailHtml } from "./services/email";
import { emailConfig } from "./config/email";
import { formRateLimiter, spamDetectionMiddleware } from "./middleware/rateLimiter";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoints
  const apiRouter = app.route("/api");
  
  // Categories
  app.get("/api/categories", async (req: Request, res: Response) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });
  
  app.get("/api/categories/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
      
      const category = await storage.getCategoryById(id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      res.json(category);
    } catch (error) {
      console.error("Error fetching category:", error);
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });
  
  app.post("/api/categories", async (req: Request, res: Response) => {
    try {
      const validatedData = insertCategorySchema.safeParse(req.body);
      if (!validatedData.success) {
        return res.status(400).json({ 
          message: "Invalid category data", 
          errors: fromZodError(validatedData.error).message 
        });
      }
      
      const newCategory = await storage.createCategory(validatedData.data);
      res.status(201).json(newCategory);
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).json({ message: "Failed to create category" });
    }
  });
  
  // Products
  app.get("/api/products", async (req: Request, res: Response) => {
    try {
      let products;
      
      if (req.query.categoryId) {
        const categoryId = parseInt(req.query.categoryId as string);
        if (isNaN(categoryId)) {
          return res.status(400).json({ message: "Invalid category ID" });
        }
        products = await storage.getProductsByCategory(categoryId);
      } else if (req.query.featured === 'true') {
        products = await storage.getFeaturedProducts();
      } else {
        products = await storage.getProducts();
      }
      
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });
  
  app.get("/api/products/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      
      const product = await storage.getProductById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });
  
  app.post("/api/products", async (req: Request, res: Response) => {
    try {
      const validatedData = insertProductSchema.safeParse(req.body);
      if (!validatedData.success) {
        return res.status(400).json({ 
          message: "Invalid product data", 
          errors: fromZodError(validatedData.error).message 
        });
      }
      
      const newProduct = await storage.createProduct(validatedData.data);
      res.status(201).json(newProduct);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Failed to create product" });
    }
  });
  
  // Gallery Items
  app.get("/api/gallery", async (req: Request, res: Response) => {
    try {
      const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined;
      let galleryItems;
      
      if (categoryId) {
        galleryItems = await storage.getGalleryItemsByCategory(categoryId);
      } else {
        galleryItems = await storage.getGalleryItems();
      }
      
      res.json(galleryItems);
    } catch (error) {
      console.error("Error fetching gallery items:", error);
      res.status(500).json({ message: "Failed to fetch gallery items" });
    }
  });
  
  app.get("/api/gallery/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid gallery item ID" });
      }
      
      const galleryItem = await storage.getGalleryItemById(id);
      if (!galleryItem) {
        return res.status(404).json({ message: "Gallery item not found" });
      }
      
      res.json(galleryItem);
    } catch (error) {
      console.error("Error fetching gallery item:", error);
      res.status(500).json({ message: "Failed to fetch gallery item" });
    }
  });
  
  app.post("/api/gallery", async (req: Request, res: Response) => {
    try {
      const validatedData = insertGalleryItemSchema.safeParse(req.body);
      if (!validatedData.success) {
        return res.status(400).json({ 
          message: "Invalid gallery item data", 
          errors: fromZodError(validatedData.error).message 
        });
      }
      
      const newGalleryItem = await storage.createGalleryItem(validatedData.data);
      res.status(201).json(newGalleryItem);
    } catch (error) {
      console.error("Error creating gallery item:", error);
      res.status(500).json({ message: "Failed to create gallery item" });
    }
  });
  
  app.put("/api/gallery/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid gallery item ID" });
      }
      
      // Check if the gallery item exists
      const existingItem = await storage.getGalleryItemById(id);
      if (!existingItem) {
        return res.status(404).json({ message: "Gallery item not found" });
      }

      // Validate and update the gallery item
      const updateData = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        categoryId: req.body.categoryId
      };
      
      const updatedItem = await storage.updateGalleryItem(id, updateData);
      res.json(updatedItem);
    } catch (error) {
      console.error("Error updating gallery item:", error);
      res.status(500).json({ message: "Failed to update gallery item" });
    }
  });
  
  // Testimonials
  app.get("/api/testimonials", async (req: Request, res: Response) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });
  
  app.get("/api/testimonials/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid testimonial ID" });
      }
      
      const testimonial = await storage.getTestimonialById(id);
      if (!testimonial) {
        return res.status(404).json({ message: "Testimonial not found" });
      }
      
      res.json(testimonial);
    } catch (error) {
      console.error("Error fetching testimonial:", error);
      res.status(500).json({ message: "Failed to fetch testimonial" });
    }
  });
  
  app.post("/api/testimonials", async (req: Request, res: Response) => {
    try {
      const validatedData = insertTestimonialSchema.safeParse(req.body);
      if (!validatedData.success) {
        return res.status(400).json({ 
          message: "Invalid testimonial data", 
          errors: fromZodError(validatedData.error).message 
        });
      }
      
      const newTestimonial = await storage.createTestimonial(validatedData.data);
      res.status(201).json(newTestimonial);
    } catch (error) {
      console.error("Error creating testimonial:", error);
      res.status(500).json({ message: "Failed to create testimonial" });
    }
  });
  
  // Quote Requests
  app.post("/api/quote-requests", formRateLimiter, spamDetectionMiddleware, async (req: Request, res: Response) => {
    try {
      const validatedData = insertQuoteRequestSchema.safeParse(req.body);
      if (!validatedData.success) {
        return res.status(400).json({ 
          message: "Invalid quote request data", 
          errors: fromZodError(validatedData.error).message 
        });
      }
      
      const newQuoteRequest = await storage.createQuoteRequest(validatedData.data);
      
      // Send email notification about the new quote request
      try {
        // Create properly typed email data
        const emailData: {
          name: string;
          email: string;
          phone: string;
          productType: string;
          dimensions?: string;
          requirements?: string;
        } = {
          name: validatedData.data.name,
          email: validatedData.data.email,
          phone: validatedData.data.phone,
          productType: validatedData.data.productType
        };
        
        // Only add optional fields if they exist and aren't null
        if (validatedData.data.dimensions) {
          emailData.dimensions = validatedData.data.dimensions;
        }
        
        if (validatedData.data.requirements) {
          emailData.requirements = validatedData.data.requirements;
        }
        
        const htmlContent = createQuoteRequestEmailHtml(emailData);
        
        // Create plain text version as fallback
        const textContent = `
NEW QUOTE REQUEST

CUSTOMER INFORMATION
Name: ${emailData.name}
Email: ${emailData.email}
Phone: ${emailData.phone}

PROJECT DETAILS
Product Type: ${emailData.productType}
${emailData.dimensions ? `Dimensions: ${emailData.dimensions}` : ''}
${emailData.requirements ? `\nSpecial Requirements:\n${emailData.requirements}` : ''}

---
Submitted on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
To prepare a quote, please contact the customer directly.
        `.trim();
        
        await sendEmail({
          to: emailConfig.notificationEmail,
          from: emailConfig.senderEmail,
          subject: `${emailConfig.quoteForm.subjectPrefix}New Request from ${emailData.name}`,
          html: htmlContent,
          text: textContent
        });
        
        console.log('Quote request email notification sent');
      } catch (emailError) {
        // Log the error but don't fail the request if email sending fails
        console.error('Failed to send quote request email notification:', emailError);
      }
      
      res.status(201).json(newQuoteRequest);
    } catch (error) {
      console.error("Error creating quote request:", error);
      res.status(500).json({ message: "Failed to create quote request" });
    }
  });
  
  // Contact Submissions
  app.post("/api/contact", formRateLimiter, spamDetectionMiddleware, async (req: Request, res: Response) => {
    try {
      const validatedData = insertContactSubmissionSchema.safeParse(req.body);
      if (!validatedData.success) {
        return res.status(400).json({ 
          message: "Invalid contact submission data", 
          errors: fromZodError(validatedData.error).message 
        });
      }
      
      const newSubmission = await storage.createContactSubmission(validatedData.data);
      
      // Send email notification about the new contact form submission
      try {
        // Create properly typed email data
        const emailData: {
          name: string;
          email: string;
          subject: string;
          message: string;
        } = {
          name: validatedData.data.name,
          email: validatedData.data.email,
          subject: validatedData.data.subject,
          message: validatedData.data.message
        };
        
        const htmlContent = createContactEmailHtml(emailData);
        
        // Create plain text version as fallback
        const textContent = `
NEW CONTACT FORM MESSAGE

FROM: ${emailData.name} (${emailData.email})
SUBJECT: ${emailData.subject}

MESSAGE:
${emailData.message}

---
Submitted on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
To respond, simply reply to this email.
        `.trim();
        
        await sendEmail({
          to: emailConfig.notificationEmail,
          from: emailConfig.senderEmail,
          subject: `${emailConfig.contactForm.subjectPrefix}${emailData.subject}`,
          html: htmlContent,
          text: textContent
        });
        
        console.log('Contact form email notification sent');
      } catch (emailError) {
        // Log the error but don't fail the request if email sending fails
        console.error('Failed to send contact form email notification:', emailError);
      }
      
      res.status(201).json(newSubmission);
    } catch (error) {
      console.error("Error creating contact submission:", error);
      res.status(500).json({ message: "Failed to create contact submission" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
