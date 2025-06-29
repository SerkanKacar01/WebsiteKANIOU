/**
 * Test script to verify smart notification system
 * Tests that notifications are only sent when status or notes change
 */

async function testSmartNotifications() {
  const baseUrl = 'http://localhost:5000';
  
  console.log('🔧 Testing Smart Notification System');
  console.log('===================================');
  
  try {
    // First, login as admin
    console.log('1. Logging in as admin...');
    const loginResponse = await fetch(`${baseUrl}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@kaniou.be',
        password: process.env.ADMIN_PASSWORD || 'admin123'
      }),
      credentials: 'include'
    });

    if (!loginResponse.ok) {
      throw new Error('Admin login failed');
    }
    console.log('✅ Admin login successful');

    // Create a test order first
    console.log('\n2. Creating test order...');
    const orderData = {
      customerName: 'Test Smart Notifications',
      customerEmail: 'test@kaniou.be',
      customerPhone: '+32 123 456 789',
      productType: 'Rolgordijnen',
      amount: 29999, // €299.99
      description: 'Test order for smart notification system',
      status: 'pending',
      notifyByEmail: true,
      customerNote: 'Initial customer note',
      internalNote: 'Initial internal note',
      bonnummer: 'SMART123'
    };

    const createResponse = await fetch(`${baseUrl}/api/admin/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
      credentials: 'include'
    });

    const newOrder = await createResponse.json();
    if (!createResponse.ok) {
      console.log('Order creation response:', createResponse.status, newOrder);
      throw new Error(`Order creation failed: ${newOrder.error || 'Unknown error'}`);
    }
    if (!newOrder.success) {
      console.log('Order creation result:', newOrder);
      throw new Error(`Order creation failed: ${newOrder.error || 'No success flag'}`);
    }
    
    const orderId = newOrder.order.id;
    console.log(`✅ Test order created with ID: ${orderId}`);

    // Test 1: Update only name (should NOT send notification)
    console.log('\n3. Test 1: Updating only customer name (should NOT notify)...');
    const updateNameResponse = await fetch(`${baseUrl}/api/admin/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'pending', // Same status
        clientNote: 'Initial customer note', // Same note
        noteFromEntrepreneur: 'Initial internal note' // Same note
      }),
      credentials: 'include'
    });

    if (updateNameResponse.ok) {
      console.log('✅ Name-only update completed - check logs for "no relevant changes"');
    } else {
      console.log('❌ Name-only update failed');
    }

    // Wait a moment for logs
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Test 2: Update status (should send notification)
    console.log('\n4. Test 2: Updating order status (should notify)...');
    const updateStatusResponse = await fetch(`${baseUrl}/api/admin/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'Bestelling in verwerking', // Different status
        clientNote: 'Initial customer note', // Same note
        noteFromEntrepreneur: 'Initial internal note' // Same note
      }),
      credentials: 'include'
    });

    if (updateStatusResponse.ok) {
      console.log('✅ Status update completed - should have sent email notification');
    } else {
      console.log('❌ Status update failed');
    }

    // Wait a moment for logs
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Test 3: Update customer note (should send notification)
    console.log('\n5. Test 3: Updating customer note (should notify)...');
    const updateNoteResponse = await fetch(`${baseUrl}/api/admin/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'Bestelling in verwerking', // Same status as before
        clientNote: 'Updated customer note - visible to customer', // Different note
        noteFromEntrepreneur: 'Initial internal note' // Same note
      }),
      credentials: 'include'
    });

    if (updateNoteResponse.ok) {
      console.log('✅ Customer note update completed - should have sent email notification');
    } else {
      console.log('❌ Customer note update failed');
    }

    // Wait a moment for logs
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Test 4: Update entrepreneur note (should send notification)
    console.log('\n6. Test 4: Updating entrepreneur note (should notify)...');
    const updateEntrepreneurNoteResponse = await fetch(`${baseUrl}/api/admin/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'Bestelling in verwerking', // Same status
        clientNote: 'Updated customer note - visible to customer', // Same note
        noteFromEntrepreneur: 'Updated entrepreneur note - also included in emails' // Different note
      }),
      credentials: 'include'
    });

    if (updateEntrepreneurNoteResponse.ok) {
      console.log('✅ Entrepreneur note update completed - should have sent email notification');
    } else {
      console.log('❌ Entrepreneur note update failed');
    }

    // Test 5: No changes (should NOT send notification)
    console.log('\n7. Test 5: No actual changes (should NOT notify)...');
    const noChangeResponse = await fetch(`${baseUrl}/api/admin/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'Bestelling in verwerking', // Same status
        clientNote: 'Updated customer note - visible to customer', // Same note
        noteFromEntrepreneur: 'Updated entrepreneur note - also included in emails' // Same note
      }),
      credentials: 'include'
    });

    if (noChangeResponse.ok) {
      console.log('✅ No-change update completed - check logs for "no relevant changes"');
    } else {
      console.log('❌ No-change update failed');
    }

    console.log('\n🎉 SMART NOTIFICATION SYSTEM TEST COMPLETED');
    console.log('\n📋 Expected Results:');
    console.log('• Test 1 (name only): No notification sent');
    console.log('• Test 2 (status change): Email sent');
    console.log('• Test 3 (customer note change): Email sent');
    console.log('• Test 4 (entrepreneur note change): Email sent');
    console.log('• Test 5 (no changes): No notification sent');
    console.log('\n🔍 Check the console logs above for confirmation of each test');

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
testSmartNotifications();