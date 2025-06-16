/**
 * Test script to verify Mollie payment integration
 * This demonstrates the complete payment flow from cart to checkout
 */

async function testMolliePaymentFlow() {
  const baseUrl = 'http://localhost:5000';
  
  console.log('🧪 Testing Mollie Payment Integration...\n');

  try {
    // Step 1: Test adding items to cart
    console.log('1. Adding test item to shopping cart...');
    const sessionId = 'test-session-' + Date.now();
    
    const cartItem = {
      sessionId: sessionId,
      productType: 'rolgordijnen',
      productName: 'Premium Rolgordijn Wit',
      material: 'Polyester',
      color: 'Wit',
      width: 120,
      height: 160,
      quantity: 2,
      unitPrice: 49.99,
      imageUrl: 'https://example.com/product.jpg'
    };

    const addCartResponse = await fetch(`${baseUrl}/api/cart/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cartItem)
    });

    if (!addCartResponse.ok) {
      throw new Error(`Failed to add item to cart: ${addCartResponse.status}`);
    }

    const cartResult = await addCartResponse.json();
    console.log('✅ Item added to cart:', cartResult.item.id);

    // Step 2: Get cart contents
    console.log('\n2. Retrieving cart contents...');
    const getCartResponse = await fetch(`${baseUrl}/api/cart/${sessionId}`);
    
    if (!getCartResponse.ok) {
      throw new Error(`Failed to get cart: ${getCartResponse.status}`);
    }

    const cartData = await getCartResponse.json();
    console.log('✅ Cart retrieved:', {
      itemCount: cartData.items.length,
      totalAmount: cartData.summary.totalAmount,
      currency: cartData.summary.currency
    });

    // Step 3: Create payment with Mollie
    console.log('\n3. Creating Mollie payment...');
    const paymentData = {
      amount: cartData.summary.totalAmount,
      currency: cartData.summary.currency,
      description: `Test Order - ${cartData.items.length} item(s)`,
      customerName: 'Test Customer',
      customerEmail: 'test@example.com',
      redirectUrl: `${baseUrl}/payment/success`,
      productDetails: {
        items: cartData.items.map(item => ({
          name: item.productName,
          type: item.productType,
          quantity: item.quantity,
          price: item.unitPrice
        }))
      },
      customerDetails: {
        sessionId: sessionId
      }
    };

    const paymentResponse = await fetch(`${baseUrl}/api/payment/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentData)
    });

    if (!paymentResponse.ok) {
      const errorText = await paymentResponse.text();
      throw new Error(`Failed to create payment: ${paymentResponse.status} - ${errorText}`);
    }

    const paymentResult = await paymentResponse.json();
    console.log('✅ Payment created:', {
      paymentId: paymentResult.paymentId,
      orderId: paymentResult.orderId,
      hasCheckoutUrl: !!paymentResult.checkoutUrl
    });

    // Step 4: Test payment status retrieval
    console.log('\n4. Checking payment status...');
    const statusResponse = await fetch(`${baseUrl}/api/payment/status/${paymentResult.paymentId}`);
    
    if (!statusResponse.ok) {
      throw new Error(`Failed to get payment status: ${statusResponse.status}`);
    }

    const statusResult = await statusResponse.json();
    console.log('✅ Payment status retrieved:', statusResult.status);

    // Step 5: Test order retrieval
    console.log('\n5. Retrieving order details...');
    const orderResponse = await fetch(`${baseUrl}/api/payment/order/${paymentResult.orderId}`);
    
    if (!orderResponse.ok) {
      throw new Error(`Failed to get order: ${orderResponse.status}`);
    }

    const orderResult = await orderResponse.json();
    console.log('✅ Order retrieved:', {
      orderId: orderResult.order.id,
      status: orderResult.order.status,
      amount: orderResult.order.amount
    });

    // Step 6: Test cart management
    console.log('\n6. Testing cart management...');
    
    // Update item quantity
    const updateResponse = await fetch(`${baseUrl}/api/cart/item/${cartResult.item.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: 3 })
    });

    if (updateResponse.ok) {
      console.log('✅ Cart item quantity updated');
    }

    // Clear cart
    const clearResponse = await fetch(`${baseUrl}/api/cart/${sessionId}`, {
      method: 'DELETE'
    });

    if (clearResponse.ok) {
      console.log('✅ Cart cleared successfully');
    }

    console.log('\n🎉 Mollie Payment Integration Test Completed Successfully!');
    console.log('\nNext steps for live deployment:');
    console.log('- Update customer information collection in checkout flow');
    console.log('- Implement order confirmation emails');
    console.log('- Set up webhook URL for production environment');
    console.log('- Test with real Mollie test payments');
    
    return {
      success: true,
      paymentId: paymentResult.paymentId,
      orderId: paymentResult.orderId,
      checkoutUrl: paymentResult.checkoutUrl
    };

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return { success: false, error: error.message };
  }
}

// Run the test
testMolliePaymentFlow().then(result => {
  if (result.success) {
    console.log('\n📋 Test Summary:');
    console.log(`Payment ID: ${result.paymentId}`);
    console.log(`Order ID: ${result.orderId}`);
    console.log(`Checkout URL: ${result.checkoutUrl}`);
  }
  process.exit(result.success ? 0 : 1);
}).catch(error => {
  console.error('Test execution failed:', error);
  process.exit(1);
});