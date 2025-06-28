/**
 * Test script to verify order creation and persistence
 * This will test the complete order flow and ensure orders are being saved
 */

import axios from 'axios';

async function testOrderCreation() {
  console.log('🧪 Testing Order Creation and Persistence...\n');

  try {
    // Step 1: Login to admin
    console.log('📋 Step 1: Admin login...');
    const loginResponse = await axios.post('http://localhost:5000/api/admin/login', {
      email: 'admin@kaniou.be',
      password: process.env.ADMIN_PASSWORD || 'KaniouAdmin2024!'
    });

    if (!loginResponse.data.success) {
      throw new Error('Admin login failed');
    }

    console.log('✅ Admin login successful');

    // Get session cookie for authenticated requests
    const cookies = loginResponse.headers['set-cookie'];
    const cookieHeader = cookies ? cookies.join('; ') : '';

    // Step 2: Create a test order
    console.log('\n📦 Step 2: Creating test order...');
    const testOrder = {
      customerName: 'Test Klant - Order Persistence',
      customerEmail: 'test.order@kaniou.be',
      customerPhone: '+32 9 123 45 67',
      customerFirstName: 'Test',
      customerLastName: 'Klant',
      customerAddress: 'Teststraat 123',
      customerCity: 'Gent',
      productType: 'Rolgordijn Test',
      amount: 299.99,
      description: 'Test rolgordijn voor order persistence test',
      status: 'pending',
      notifyByEmail: true,
      customerNote: 'Test bestelling voor database persistence',
      internalNote: 'Internal test note voor development',
      bonnummer: `TEST-ORDER-${Date.now()}`
    };

    const createResponse = await axios.post('http://localhost:5000/api/admin/orders', testOrder, {
      headers: {
        'Cookie': cookieHeader,
        'Content-Type': 'application/json'
      }
    });

    if (createResponse.data.success) {
      console.log('✅ Order created successfully');
      console.log(`📦 Order ID: ${createResponse.data.order.id}`);
      console.log(`🎯 Bonnummer: ${createResponse.data.order.bonnummer}`);
      
      // Step 3: Verify order appears in dashboard
      console.log('\n📊 Step 3: Checking dashboard for new order...');
      const dashboardResponse = await axios.get('http://localhost:5000/api/admin/dashboard', {
        headers: {
          'Cookie': cookieHeader
        }
      });

      if (dashboardResponse.data.orders && dashboardResponse.data.orders.length > 0) {
        console.log(`✅ Dashboard shows ${dashboardResponse.data.orders.length} orders`);
        console.log(`📈 Total orders: ${dashboardResponse.data.totalOrders}`);
        console.log(`⏳ Pending orders: ${dashboardResponse.data.pendingOrders}`);
        console.log(`💰 Total revenue: €${dashboardResponse.data.totalRevenue}`);
        
        // Find our test order
        const testOrderInDashboard = dashboardResponse.data.orders.find(order => 
          order.bonnummer === testOrder.bonnummer
        );
        
        if (testOrderInDashboard) {
          console.log('✅ Test order found in dashboard');
          console.log(`📋 Order details: ${testOrderInDashboard.customerName} - ${testOrderInDashboard.productDetails}`);
        } else {
          console.log('❌ Test order NOT found in dashboard');
        }
      } else {
        console.log('❌ Dashboard shows 0 orders - PERSISTENCE ISSUE!');
      }

      // Step 4: Try to track the order
      console.log('\n🔍 Step 4: Testing order tracking...');
      try {
        const trackResponse = await axios.get(`http://localhost:5000/api/orders/track/bonnummer/${testOrder.bonnummer}`);
        console.log('✅ Order tracking works');
        console.log(`📋 Tracked order status: ${trackResponse.data.status}`);
      } catch (trackError) {
        console.log('❌ Order tracking failed:', trackError.response?.data?.error || trackError.message);
      }

    } else {
      console.log('❌ Order creation failed:', createResponse.data);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Run the test
testOrderCreation();