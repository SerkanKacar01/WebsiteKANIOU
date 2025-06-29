/**
 * Create a test order with a simple bonnummer that users can easily test
 */

async function createTestOrder() {
  try {
    const orderData = {
      customerName: "Test Klant",
      customerEmail: "test@kaniou.be",
      customerPhone: "+32499123456",
      customerFirstName: "Test",
      customerLastName: "Klant",
      customerAddress: "Teststraat 123",
      customerCity: "Gent",
      amount: 199.99,
      description: "Test rolgordijn voor status tracking",
      currency: "EUR",
      productDetails: JSON.stringify({
        productType: "Rolgordijnen",
        color: "Beige",
        dimensions: "100cm x 150cm"
      }),
      customerDetails: "{}",
      molliePaymentId: "manual_test_" + Date.now(),
      orderNumber: "TEST123",
      status: "Bestelling in verwerking",
      bonnummer: "TEST123",
      clientNote: "Test bestelling voor status pagina controle",
      noteFromEntrepreneur: "Order is klaar voor testen - alle functionaliteiten werken",
      notifyByEmail: true,
      notifyByWhatsapp: false
    };

    console.log("Creating test order with bonnummer: TEST123");
    
    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to create order: ${error}`);
    }

    const result = await response.json();
    console.log("✅ Test order created successfully!");
    console.log("📦 Order Details:");
    console.log(`   - Order ID: ${result.id}`);
    console.log(`   - Bonnummer: ${result.bonnummer}`);
    console.log(`   - Status: ${result.status}`);
    console.log(`   - Customer: ${result.customerName}`);
    console.log(`   - Amount: €${result.amount}`);
    console.log("");
    console.log("🔗 Test Links:");
    console.log(`   - Status page by ID: /bestelling-status/${result.id}`);
    console.log(`   - Track by bonnummer: /volg-bestelling (search: ${result.bonnummer})`);
    console.log("");
    console.log("🧪 For testing:");
    console.log("   1. Go to /volg-bestelling");
    console.log("   2. Enter 'TEST123' as bonnummer");
    console.log("   3. Verify order status page loads correctly");

  } catch (error) {
    console.error("❌ Error creating test order:", error.message);
  }
}

// Run the test
createTestOrder();