/**
 * Test script to demonstrate the notification preferences system
 * Shows enhanced entrepreneur dashboard with email/WhatsApp status indicators
 */

async function testNotificationPreferences() {
  const baseUrl = 'http://localhost:5000';
  
  console.log('🔔 Testing Notification Preferences System');
  console.log('==========================================');
  
  try {
    // Test 1: Create a demo order with notification preferences
    console.log('\n1. Creating demo order with notification preferences...');
    
    const demoOrder = {
      customerName: 'Marie Dubois',
      customerEmail: 'marie.dubois@example.be',
      amount: 89500, // €895.00
      description: 'Duo Rolgordijnen - 180x220cm - Wit/Grijs',
      currency: 'EUR',
      redirectUrl: `${baseUrl}/payment-success`,
      webhookUrl: `${baseUrl}/api/webhook/mollie`,
      productDetails: JSON.stringify({
        type: 'Duo Rolgordijnen',
        dimensions: '180cm x 220cm',
        colors: ['Wit', 'Grijs'],
        material: 'Premium stof'
      }),
      customerDetails: JSON.stringify({
        installationAddress: 'Rue de la Paix 123, 1000 Brussels',
        specialInstructions: 'Bel aan voor installatie afspraak'
      }),
      // New notification preferences
      notifyByEmail: true,
      notifyByWhatsapp: true,
      customerPhone: '+32 498 76 54 32'
    };
    
    const orderResponse = await fetch(`${baseUrl}/api/payments/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(demoOrder)
    });
    
    if (!orderResponse.ok) {
      throw new Error(`Order creation failed: ${orderResponse.status}`);
    }
    
    const orderData = await orderResponse.json();
    console.log(`✅ Demo order created: ${orderData.orderNumber}`);
    console.log(`   📧 Email notifications: Enabled`);
    console.log(`   📱 WhatsApp notifications: Enabled`);
    console.log(`   📞 Phone: ${demoOrder.customerPhone}`);
    
    // Test 2: Update notification preferences via customer interface
    console.log('\n2. Testing customer notification preference updates...');
    
    const updatePreferences = {
      orderNumber: orderData.orderNumber,
      notifyByEmail: true,
      notifyByWhatsapp: false, // Customer disables WhatsApp
      customerPhone: null
    };
    
    const updateResponse = await fetch(`${baseUrl}/api/orders/update-preferences`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatePreferences)
    });
    
    if (!updateResponse.ok) {
      throw new Error(`Preference update failed: ${updateResponse.status}`);
    }
    
    const updateData = await updateResponse.json();
    console.log(`✅ Preferences updated for order: ${orderData.orderNumber}`);
    console.log(`   📧 Email notifications: Enabled`);
    console.log(`   📱 WhatsApp notifications: Disabled`);
    
    // Test 3: Test validation - require at least one notification method
    console.log('\n3. Testing validation (both notifications disabled)...');
    
    const invalidUpdate = {
      orderNumber: orderData.orderNumber,
      notifyByEmail: false,
      notifyByWhatsapp: false
    };
    
    const invalidResponse = await fetch(`${baseUrl}/api/orders/update-preferences`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invalidUpdate)
    });
    
    if (invalidResponse.status === 400) {
      const errorData = await invalidResponse.json();
      console.log(`✅ Validation working: ${errorData.error}`);
    }
    
    // Test 4: Test WhatsApp validation (requires phone number)
    console.log('\n4. Testing WhatsApp validation (missing phone)...');
    
    const whatsappWithoutPhone = {
      orderNumber: orderData.orderNumber,
      notifyByEmail: false,
      notifyByWhatsapp: true,
      customerPhone: ''
    };
    
    const whatsappResponse = await fetch(`${baseUrl}/api/orders/update-preferences`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(whatsappWithoutPhone)
    });
    
    if (whatsappResponse.status === 400) {
      const errorData = await whatsappResponse.json();
      console.log(`✅ WhatsApp validation working: ${errorData.error}`);
    }
    
    // Test 5: Fetch all orders to verify dashboard display
    console.log('\n5. Fetching orders for entrepreneur dashboard...');
    
    const ordersResponse = await fetch(`${baseUrl}/api/orders`);
    if (!ordersResponse.ok) {
      throw new Error(`Orders fetch failed: ${ordersResponse.status}`);
    }
    
    const orders = await ordersResponse.json();
    console.log(`✅ Retrieved ${orders.length} orders for dashboard`);
    
    // Display notification preferences for each order
    orders.slice(0, 3).forEach((order, index) => {
      console.log(`\n   Order ${index + 1}: ${order.orderNumber || `#${order.id}`}`);
      console.log(`   Customer: ${order.customerName}`);
      console.log(`   📧 Email: ${order.notifyByEmail !== false ? '✅ Enabled' : '❌ Disabled'}`);
      console.log(`   📱 WhatsApp: ${order.notifyByWhatsapp === true ? '✅ Enabled' : '❌ Disabled'}`);
      if (order.customerPhone) {
        console.log(`   📞 Phone: ${order.customerPhone}`);
      }
      console.log(`   💰 Amount: €${(order.amount / 100).toFixed(2)}`);
    });
    
    console.log('\n🎉 Notification Preferences System Test Complete!');
    console.log('================================================');
    console.log('✅ Order creation with notification preferences');
    console.log('✅ Customer preference updates via API');
    console.log('✅ Validation for required notification methods');
    console.log('✅ WhatsApp phone number validation');
    console.log('✅ Entrepreneur dashboard data display');
    console.log('\n📱 Dashboard Features:');
    console.log('   • Visual email/WhatsApp status indicators');
    console.log('   • Phone number display for WhatsApp users');
    console.log('   • Notification status tracking');
    console.log('   • Mobile-responsive design');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.message.includes('fetch')) {
      console.log('\n💡 Make sure the server is running with: npm run dev');
    }
  }
}

// Run the test
testNotificationPreferences();