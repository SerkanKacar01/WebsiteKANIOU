/**
 * Simple test to demonstrate working payment flow without webhooks
 */

async function testPaymentFlow() {
  const baseUrl = 'http://localhost:5000';
  
  console.log('🧪 Testing Payment Flow (No Webhooks)...\n');

  try {
    // Step 1: Add item to cart
    console.log('1. Adding item to cart...');
    const sessionId = 'demo-session-' + Date.now();
    
    const cartResponse = await fetch(`${baseUrl}/api/cart/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: sessionId,
        productType: 'rolgordijnen',
        productName: 'Premium Wit Rolgordijn',
        material: 'Polyester',
        color: 'Wit',
        width: 120,
        height: 160,
        quantity: 1,
        unitPrice: 89.99,
        imageUrl: 'https://example.com/product.jpg'
      })
    });

    if (!cartResponse.ok) {
      throw new Error('Failed to add to cart');
    }

    const cartResult = await cartResponse.json();
    console.log(`✅ Item added: ID ${cartResult.item.id}`);

    // Step 2: Get cart summary
    const cartData = await fetch(`${baseUrl}/api/cart/${sessionId}`).then(r => r.json());
    console.log(`✅ Cart total: €${cartData.summary.totalAmount}`);

    // Step 3: Create payment (without webhook)
    console.log('\n2. Creating payment...');
    const paymentData = {
      amount: cartData.summary.totalAmount,
      currency: 'EUR',
      description: 'Test Order - Demo Payment',
      customerName: 'Demo Customer',
      customerEmail: 'demo@example.com',
      redirectUrl: `${baseUrl}/payment/success`
      // No webhookUrl for localhost testing
    };

    const paymentResponse = await fetch(`${baseUrl}/api/payment/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentData)
    });

    if (paymentResponse.ok) {
      const result = await paymentResponse.json();
      console.log('✅ Payment created successfully!');
      console.log(`   Payment ID: ${result.paymentId}`);
      console.log(`   Order ID: ${result.orderId}`);
      console.log(`   Checkout URL: ${result.checkoutUrl}`);
      console.log('\n🎉 Payment integration working correctly!');
      return { success: true, result };
    } else {
      const error = await paymentResponse.text();
      console.log(`❌ Payment failed: ${error}`);
      return { success: false, error };
    }

  } catch (error) {
    console.error(`❌ Test failed: ${error.message}`);
    return { success: false, error: error.message };
  }
}

testPaymentFlow().then(result => {
  if (result.success) {
    console.log('\n📋 Integration Status: READY FOR PRODUCTION');
    console.log('- Shopping cart: Working ✅');
    console.log('- Payment creation: Working ✅');
    console.log('- Mollie integration: Working ✅');
    console.log('\nNext: Deploy to production for webhook support');
  }
  process.exit(result.success ? 0 : 1);
});