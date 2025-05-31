/**
 * Comprehensive Email System Test for KANIOU
 * Tests all email notification flows
 */

import { sendEmail } from "./emailService";
import { sendInventoryAlertToAdmin } from "./inventoryEmailService";
import { sendAppointmentNotificationToAdmin, sendAppointmentConfirmationToCustomer } from "./appointmentEmailService";

export async function testAllEmailNotifications(): Promise<void> {
  console.log("🧪 Starting comprehensive email system test...");

  // Test 1: Basic contact form email
  console.log("1. Testing contact form email...");
  try {
    const contactEmailSuccess = await sendEmail({
      to: 'info@kaniou.be',
      subject: 'Test: Contact Form Email System',
      html: `
        <h2>Email System Test - Contact Form</h2>
        <p>This is a test of the contact form email notification system.</p>
        <p><strong>Test Status:</strong> Successfully sent</p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString('nl-NL')}</p>
      `,
      text: 'Email System Test - Contact Form notification sent successfully'
    });
    console.log(`✅ Contact form email: ${contactEmailSuccess ? 'SUCCESS' : 'FAILED'}`);
  } catch (error) {
    console.log(`❌ Contact form email: FAILED - ${error}`);
  }

  // Test 2: Smart quote request email
  console.log("2. Testing smart quote request email...");
  try {
    const quoteEmailSuccess = await sendEmail({
      to: 'info@kaniou.be',
      subject: 'Test: Smart Quote Request System',
      html: `
        <h2>Email System Test - Smart Quote Request</h2>
        <p>This is a test of the smart quote request email notification system.</p>
        <p><strong>Test Status:</strong> Successfully sent</p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString('nl-NL')}</p>
      `,
      text: 'Email System Test - Smart quote request notification sent successfully'
    });
    console.log(`✅ Smart quote email: ${quoteEmailSuccess ? 'SUCCESS' : 'FAILED'}`);
  } catch (error) {
    console.log(`❌ Smart quote email: FAILED - ${error}`);
  }

  // Test 3: Inventory alert admin notification
  console.log("3. Testing inventory alert admin notification...");
  try {
    const testAlert = {
      id: 999,
      email: 'test@example.com',
      productType: 'rolgordijnen',
      alertType: 'back_in_stock' as const,
      isActive: true,
      createdAt: new Date().toISOString()
    };
    
    const inventoryEmailSuccess = await sendInventoryAlertToAdmin(testAlert);
    console.log(`✅ Inventory alert email: ${inventoryEmailSuccess ? 'SUCCESS' : 'FAILED'}`);
  } catch (error) {
    console.log(`❌ Inventory alert email: FAILED - ${error}`);
  }

  // Test 4: Appointment booking admin notification
  console.log("4. Testing appointment booking admin notification...");
  try {
    const testAppointment = {
      id: 999,
      name: 'Test Customer',
      email: 'test@example.com',
      phone: '+32 123 45 67 89',
      appointmentType: 'measurement',
      preferredDate: '2025-06-15',
      preferredTime: '14:00',
      address: 'Test Street 123',
      city: 'Brussels',
      postalCode: '1000',
      projectDescription: 'Test appointment booking system',
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    const appointmentAdminEmailSuccess = await sendAppointmentNotificationToAdmin(testAppointment);
    console.log(`✅ Appointment admin email: ${appointmentAdminEmailSuccess ? 'SUCCESS' : 'FAILED'}`);
  } catch (error) {
    console.log(`❌ Appointment admin email: FAILED - ${error}`);
  }

  // Test 5: Appointment confirmation to customer
  console.log("5. Testing appointment confirmation to customer...");
  try {
    const testAppointment = {
      id: 999,
      name: 'Test Customer',
      email: 'test@example.com',
      phone: '+32 123 45 67 89',
      appointmentType: 'measurement',
      preferredDate: '2025-06-15',
      preferredTime: '14:00',
      address: 'Test Street 123',
      city: 'Brussels',
      postalCode: '1000',
      projectDescription: 'Test appointment booking system',
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };
    
    const appointmentCustomerEmailSuccess = await sendAppointmentConfirmationToCustomer(testAppointment);
    console.log(`✅ Appointment customer email: ${appointmentCustomerEmailSuccess ? 'SUCCESS' : 'FAILED'}`);
  } catch (error) {
    console.log(`❌ Appointment customer email: FAILED - ${error}`);
  }

  // Test 6: Chatbot escalation notification
  console.log("6. Testing chatbot escalation notification...");
  try {
    const escalationEmailSuccess = await sendEmail({
      to: 'info@kaniou.be',
      subject: 'Test: Chatbot Escalation System',
      html: `
        <h2>Email System Test - Chatbot Escalation</h2>
        <p>This is a test of the chatbot escalation email notification system.</p>
        <p><strong>Test Status:</strong> Successfully sent</p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString('nl-NL')}</p>
      `,
      text: 'Email System Test - Chatbot escalation notification sent successfully'
    });
    console.log(`✅ Chatbot escalation email: ${escalationEmailSuccess ? 'SUCCESS' : 'FAILED'}`);
  } catch (error) {
    console.log(`❌ Chatbot escalation email: FAILED - ${error}`);
  }

  console.log("🧪 Email system test completed!");
  console.log("📧 All email notifications should be sent to: info@kaniou.be");
}