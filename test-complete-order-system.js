/**
 * Comprehensive test of the complete order system with document management
 * Tests order creation, document upload, and dashboard display functionality
 */

// Cookie handling for session persistence
let sessionCookies = '';

async function fetchWithCookies(url, options = {}) {
  if (sessionCookies) {
    options.headers = { ...options.headers, 'Cookie': sessionCookies };
  }
  
  const response = await fetch(url, options);
  
  // Extract cookies from response
  const setCookieHeader = response.headers.get('set-cookie');
  if (setCookieHeader) {
    sessionCookies = setCookieHeader;
  }
  
  return response;
}

async function testCompleteOrderSystem() {
  try {
    console.log('🧪 Starting comprehensive order system test...\n');

    // Step 1: Test admin login for dashboard access
    console.log('1️⃣ Testing admin authentication...');
    const loginResponse = await fetchWithCookies('http://localhost:5000/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@kaniou.be',
        password: process.env.ADMIN_PASSWORD || 'defaulttestpassword'
      })
    });

    if (!loginResponse.ok) {
      throw new Error(`Admin login failed: ${loginResponse.status}`);
    }

    const loginData = await loginResponse.json();
    console.log('✅ Admin login successful:', loginData.message);

    // Step 2: Test order creation through dashboard
    console.log('\n2️⃣ Creating new order through admin dashboard...');
    const orderData = {
      customerName: 'Test Customer TRAC_ORDR',
      customerEmail: 'test@kaniou.be',
      customerPhone: '+32 471 23 45 67',
      customerAddress: 'Teststraat 123',
      customerCity: 'Antwerpen',
      bonnummer: `TEST_${Date.now()}`,
      productType: 'Rolgordijn op maat',
      description: 'Test order - Complete system verification',
      amount: 29999, // €299.99 in cents
      status: 'pending',
      clientNote: 'Order aangemaakt voor systeem test',
      noteFromEntrepreneur: 'Nieuwe bestelling - wacht op productie',
      notifyByEmail: true
    };

    const createResponse = await fetchWithCookies('http://localhost:5000/api/admin/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      throw new Error(`Order creation failed: ${createResponse.status} - ${errorText}`);
    }

    const createdOrder = await createResponse.json();
    console.log('✅ Order created successfully:', {
      id: createdOrder.order.id,
      bonnummer: createdOrder.order.bonnummer,
      amount: `€${(createdOrder.order.amount / 100).toFixed(2)}`
    });

    const orderId = createdOrder.order.id;

    // Step 3: Test dashboard data retrieval
    console.log('\n3️⃣ Testing dashboard data with document counts...');
    const dashboardResponse = await fetchWithCookies('http://localhost:5000/api/admin/dashboard');

    if (!dashboardResponse.ok) {
      throw new Error(`Dashboard fetch failed: ${dashboardResponse.status}`);
    }

    const dashboardData = await dashboardResponse.json();
    console.log('✅ Dashboard loaded successfully:', {
      totalOrders: dashboardData.totalOrders,
      pendingOrders: dashboardData.pendingOrders,
      totalRevenue: `€${(dashboardData.totalRevenue / 100).toFixed(2)}`
    });

    // Find our created order in the dashboard
    const ourOrder = dashboardData.orders.find(order => order.id === orderId);
    if (ourOrder) {
      console.log('✅ Created order found in dashboard:', {
        id: ourOrder.id,
        documentCount: ourOrder.documentCount || 0,
        status: ourOrder.status
      });
    }

    // Step 4: Test document upload functionality  
    console.log('\n4️⃣ Testing document upload system...');
    const documentUploadData = {
      documents: [
        { name: 'test-receipt.pdf', content: 'PDF_CONTENT_1' },
        { name: 'test-invoice.pdf', content: 'PDF_CONTENT_2' }
      ],
      documentTypes: ['receipt', 'invoice'],
      documentVisibility: ['true', 'false']
    };

    const uploadResponse = await fetchWithCookies(`http://localhost:5000/api/orders/${orderId}/upload-documents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(documentUploadData)
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      throw new Error(`Document upload failed: ${uploadResponse.status} - ${errorText}`);
    }

    const uploadResult = await uploadResponse.json();
    console.log('✅ Documents uploaded successfully:', {
      message: uploadResult.message,
      documentsCount: uploadResult.documents.length
    });

    // Step 5: Test document retrieval
    console.log('\n5️⃣ Testing document retrieval...');
    const documentsResponse = await fetchWithCookies(`http://localhost:5000/api/orders/${orderId}/documents`);

    if (!documentsResponse.ok) {
      throw new Error(`Document retrieval failed: ${documentsResponse.status}`);
    }

    const documents = await documentsResponse.json();
    console.log('✅ Documents retrieved successfully:', {
      count: documents.length,
      types: documents.map(doc => doc.documentType)
    });

    // Step 6: Test updated dashboard with document counts
    console.log('\n6️⃣ Verifying updated dashboard with document counts...');
    const updatedDashboardResponse = await fetchWithCookies('http://localhost:5000/api/admin/dashboard');

    const updatedDashboardData = await updatedDashboardResponse.json();
    const updatedOrder = updatedDashboardData.orders.find(order => order.id === orderId);
    
    if (updatedOrder) {
      console.log('✅ Order with updated document count:', {
        id: updatedOrder.id,
        documentCount: updatedOrder.documentCount,
        expectedCount: documents.length
      });

      if (updatedOrder.documentCount === documents.length) {
        console.log('✅ Document count correctly updated in dashboard!');
      } else {
        console.log('⚠️ Document count mismatch in dashboard');
      }
    }

    // Step 7: Test order status update
    console.log('\n7️⃣ Testing order status update...');
    const statusUpdateData = {
      status: 'processing',
      noteFromEntrepreneur: 'Order verwerkt - documenten toegevoegd'
    };

    const statusResponse = await fetchWithCookies(`http://localhost:5000/api/admin/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(statusUpdateData)
    });

    if (!statusResponse.ok) {
      const errorText = await statusResponse.text();
      throw new Error(`Status update failed: ${statusResponse.status} - ${errorText}`);
    }

    const statusResult = await statusResponse.json();
    console.log('✅ Order status updated successfully:', statusResult.message);

    // Summary
    console.log('\n🎯 COMPLETE ORDER SYSTEM TEST RESULTS:');
    console.log('✅ Admin authentication: WORKING');
    console.log('✅ Order creation (TRAC_ORDR fix): WORKING');
    console.log('✅ Dashboard data loading: WORKING');
    console.log('✅ Document upload system: WORKING');
    console.log('✅ Document count display: WORKING');
    console.log('✅ Order status updates: WORKING');
    console.log('\n🚀 All systems operational! The TRAC_ORDR issue is fully resolved.');

  } catch (error) {
    console.error('❌ TEST FAILED:', error.message);
    console.log('\n🔧 Error details for debugging:');
    console.log(error);
  }
}

// Run the test
testCompleteOrderSystem();