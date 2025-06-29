/**
 * Test script to verify bonnummer display on order status page
 * This will create a test order and verify the status page shows the correct bonnummer
 */

import { storage } from './server/storage.js';

async function testBonnummerDisplay() {
  console.log('🔧 Testing bonnummer display on order status page...\n');

  try {
    // Create a test order with a specific bonnummer
    const testOrder = {
      orderNumber: `ORD-${Date.now()}`,
      customerName: 'Test Customer',
      customerEmail: 'test@kaniou.be',
      customerPhone: '+32123456789',
      amount: 299.99,
      currency: 'EUR',
      description: 'Test rolgordijn voor bonnummer verificatie',
      status: 'Bestelling in productie',
      redirectUrl: '',
      webhookUrl: '',
      productDetails: JSON.stringify({ 
        productType: 'Rolgordijnen',
        color: 'Wit',
        dimensions: '120cm x 180cm'
      }),
      customerDetails: JSON.stringify({}),
      molliePaymentId: `test_${Date.now()}`,
      clientNote: 'Test order om bonnummer functionaliteit te controleren',
      noteFromEntrepreneur: 'Order gebruikt om te testen of bonnummer correct wordt getoond in status pagina',
      pdfFileName: null,
      invoiceUrl: null,
      notificationPreference: 'email',
      notifyByEmail: true,
      bonnummer: 'TEST789XYZ', // Custom bonnummer for testing
    };

    console.log('📦 Creating test order with bonnummer:', testOrder.bonnummer);
    const createdOrder = await storage.createPaymentOrder(testOrder);
    
    console.log('✅ Test order created successfully!');
    console.log('   Order ID:', createdOrder.id);
    console.log('   Bonnummer:', createdOrder.bonnummer);
    console.log('   Order Number:', createdOrder.orderNumber);
    
    // Test API endpoints
    console.log('\n🔍 Testing API endpoints...');
    
    // Test get by ID
    const orderById = await storage.getPaymentOrderById(createdOrder.id);
    if (orderById) {
      console.log('✅ Get by ID successful');
      console.log('   Display number should be:', orderById.bonnummer || orderById.orderNumber);
    } else {
      console.log('❌ Get by ID failed');
    }
    
    // Test get by bonnummer
    const orderByBonnummer = await storage.getPaymentOrderByBonnummer(createdOrder.bonnummer);
    if (orderByBonnummer) {
      console.log('✅ Get by bonnummer successful');
      console.log('   Bonnummer found:', orderByBonnummer.bonnummer);
    } else {
      console.log('❌ Get by bonnummer failed');
    }
    
    console.log('\n📋 Test Summary:');
    console.log('   - Order ID for status page:', createdOrder.id);
    console.log('   - Expected display number:', createdOrder.bonnummer);
    console.log('   - Status page URL: /bestelling-status/' + createdOrder.id);
    console.log('   - Track by bonnummer URL: /volg-bestelling (search for: ' + createdOrder.bonnummer + ')');
    
    // Test API directly
    console.log('\n🌐 Testing API endpoints directly...');
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${createdOrder.id}`);
      if (response.ok) {
        const data = await response.json();
        console.log('✅ API /api/orders/:id successful');
        console.log('   Bonnummer in response:', data.bonnummer);
        console.log('   Order number in response:', data.orderNumber);
      } else {
        console.log('❌ API /api/orders/:id failed:', response.status);
      }
    } catch (error) {
      console.log('❌ API test failed:', error.message);
    }
    
    try {
      const response = await fetch(`http://localhost:5000/api/orders/track/bonnummer/${createdOrder.bonnummer}`);
      if (response.ok) {
        const data = await response.json();
        console.log('✅ API /api/orders/track/bonnummer/:bonnummer successful');
        console.log('   Found order with bonnummer:', data.bonnummer);
      } else {
        console.log('❌ API bonnummer lookup failed:', response.status);
      }
    } catch (error) {
      console.log('❌ API bonnummer test failed:', error.message);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testBonnummerDisplay().catch(console.error);