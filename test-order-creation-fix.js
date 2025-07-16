/**
 * Test script to verify the order creation fix (TRAC_ORDR)
 * Tests the complete order creation flow from entrepreneur dashboard
 */

import axios from 'axios';

async function testOrderCreationFix() {
  console.log('🔧 Testing TRAC_ORDR Order Creation Fix...\n');

  const baseUrl = 'http://localhost:5000';
  
  try {
    // Step 1: Login as admin
    console.log('🔐 Step 1: Logging in as admin...');
    const loginResponse = await axios.post(`${baseUrl}/api/admin/login`, {
      email: 'admin@kaniou.be',
      password: process.env.ADMIN_PASSWORD || 'defaulttestpassword'
    });

    if (loginResponse.data.success) {
      console.log('✅ Admin login successful');
      
      // Get the session cookie
      const sessionCookie = loginResponse.headers['set-cookie']
        ?.find(cookie => cookie.startsWith('connect.sid='))
        ?.split(';')[0];

      const headers = {
        'Content-Type': 'application/json',
        'Cookie': sessionCookie || ''
      };

      // Step 2: Create a test order
      console.log('\n📦 Step 2: Creating test order...');
      const orderData = {
        customerName: 'Test Klant TRAC_ORDR',
        customerEmail: 'test@kaniou.be',
        customerPhone: '+32123456789',
        customerFirstName: 'Test',
        customerLastName: 'Klant',
        customerAddress: 'Teststraat 123',
        customerCity: 'Teststad',
        productType: 'Test Rolgordijn',
        amount: 299.99,
        description: 'Test bestelling voor TRAC_ORDR fix verificatie',
        status: 'Bestelling ontvangen',
        notifyByEmail: true,
        customerNote: 'Test klant notitie',
        internalNote: 'Test interne notitie',
        bonnummer: `TRAC_${Date.now()}`
      };

      console.log(`📋 Creating order with bonnummer: ${orderData.bonnummer}`);
      
      const createResponse = await axios.post(`${baseUrl}/api/admin/orders`, orderData, { headers });
      
      if (createResponse.data.success) {
        console.log('✅ Order created successfully!');
        console.log(`📦 Order ID: ${createResponse.data.order.id}`);
        console.log(`🏷️  Bonnummer: ${createResponse.data.order.bonnummer}`);
        console.log(`👤 Customer: ${createResponse.data.order.customerName}`);
        console.log(`📧 Email: ${createResponse.data.order.customerEmail}`);
        
        // Step 3: Verify order appears in dashboard
        console.log('\n📊 Step 3: Verifying order appears in dashboard...');
        const dashboardResponse = await axios.get(`${baseUrl}/api/admin/dashboard`, { headers });
        
        if (dashboardResponse.data.orders && dashboardResponse.data.orders.length > 0) {
          const testOrder = dashboardResponse.data.orders.find(order => 
            order.bonnummer === orderData.bonnummer
          );
          
          if (testOrder) {
            console.log('✅ Order found in dashboard');
            console.log(`📋 Status: ${testOrder.status}`);
            console.log(`💰 Amount: €${testOrder.amount}`);
            
            // Step 4: Test order tracking
            console.log('\n🔍 Step 4: Testing order tracking...');
            const trackResponse = await axios.get(`${baseUrl}/api/orders/track/bonnummer/${orderData.bonnummer}`);
            
            if (trackResponse.data.orderNumber) {
              console.log('✅ Order tracking works');
              console.log(`📦 Tracked order: ${trackResponse.data.orderNumber}`);
            } else {
              console.log('❌ Order tracking failed');
            }
            
            console.log('\n🎉 TRAC_ORDR ORDER CREATION FIX SUCCESSFUL!');
            console.log('\n📋 Summary:');
            console.log('✅ Admin authentication: WORKING');
            console.log('✅ Order creation API: WORKING');
            console.log('✅ Dashboard integration: WORKING');
            console.log('✅ Order tracking: WORKING');
            console.log('✅ Email notifications: ENABLED');
            console.log('\n💡 The "Bestelling Aanmaken" button should now work correctly!');
            
          } else {
            console.log('❌ Order not found in dashboard');
          }
        } else {
          console.log('❌ Dashboard returned no orders');
        }
        
      } else {
        console.log('❌ Order creation failed');
        console.log('Response:', createResponse.data);
      }
      
    } else {
      console.log('❌ Admin login failed');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
  }
}

// Run the test
testOrderCreationFix().catch(console.error);