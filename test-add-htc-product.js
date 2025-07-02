/**
 * Test script to add HTC 620 cleaning product to the KANIOU system
 * This will create the cleaning products category and add the HTC 620 product
 */

async function addHTCProduct() {
  try {
    const baseUrl = 'http://localhost:5000';
    
    console.log('🧪 Testing HTC 620 product addition...\n');

    // First, create a cleaning products category if it doesn't exist
    console.log('1. Creating cleaning products category...');
    
    const categoryResponse = await fetch(`${baseUrl}/api/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name: 'Reiniging & Onderhoud',
        description: 'Professionele reinigingsproducten voor vloeren, textiel en gordijnen',
        imageUrl: '/images/cleaning-category.jpg'
      })
    });

    if (!categoryResponse.ok) {
      const errorText = await categoryResponse.text();
      console.log('Category response error:', errorText);
      throw new Error(`Category creation failed: ${categoryResponse.status}`);
    }

    const categoryData = await categoryResponse.json();
    console.log('✅ Category created:', categoryData);

    // Get the category ID (either newly created or existing)
    let categoryId = categoryData.id;

    // If category creation failed due to existing, fetch categories to get ID
    if (!categoryId) {
      const categoriesResponse = await fetch(`${baseUrl}/api/categories`);
      const categories = await categoriesResponse.json();
      const cleaningCategory = categories.find(cat => cat.name.includes('Reiniging'));
      categoryId = cleaningCategory?.id || 1; // Fallback to first category
    }

    // Now create the HTC 620 product
    console.log('\n2. Creating HTC 620 product...');
    
    const productResponse = await fetch(`${baseUrl}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'HTC 620 Vlekkenformule – Tapijt & Textiel Vlekkenreiniger (0,5 liter)',
        description: `**Professionele vlekkenreiniger voor tapijten en textiel**

HTC 620 is een krachtige vlekkenformule speciaal ontwikkeld voor het effectief verwijderen van vlekken uit tapijten, gordijnen en meubelstof. Deze professionele reiniger is geschikt voor alle textielsoorten en biedt uitstekende resultaten.

**Belangrijkste voordelen:**
• Verwijdert effectief vlekken van koffie, wijn, vet en algemeen vuil
• Veilig voor alle textielsoorten en kleuren
• Laat geen residu achter
• Snelle werking voor verse én ingedroogde vlekken
• Milieuvriendelijke formule

**Toepassingen:**
• Tapijten en vloerkleden
• Gordijnen en overgordijnen
• Meubelstof en bekleding
• Autointerieur textiel
• Commerciële en residentiële ruimtes

**Gebruiksaanwijzing:**
1. Test eerst op een onopvallende plek
2. Spray direct op de vlek
3. Laat 2-3 minuten inwerken
4. Dep voorzichtig met een schone doek
5. Spoel indien nodig na met water

**Technische specificaties:**
• Volume: 0,5 liter
• pH-waarde: 7-8 (mild alkalisch)
• Biologisch afbreekbaar
• Niet-giftig bij normaal gebruik`,
        price: 9.95,
        imageUrl: '/images/htc-620-vlekkenreiniger.jpg',
        categoryId: categoryId,
        isFeatured: true,
        isBestSeller: false,
        isNewArrival: true,
        material: 'Vloeistof',
        dimensions: '0,5 liter fles',
        features: [
          'Professionele kwaliteit',
          'Geschikt voor alle textielsoorten', 
          'Milieuvriendelijke formule',
          'Snelle werking',
          'Geen residu'
        ],
        colors: ['Transparant']
      })
    });

    if (!productResponse.ok) {
      const errorText = await productResponse.text();
      throw new Error(`Product creation failed: ${productResponse.status} ${errorText}`);
    }

    const productData = await productResponse.json();
    console.log('✅ HTC 620 product created successfully:', {
      id: productData.id,
      name: productData.name,
      price: `€${productData.price}`,
      category: categoryId
    });

    console.log('\n🎯 Product successfully added to KANIOU catalog!');
    console.log(`📍 Product can be found in category: Reiniging & Onderhoud`);
    console.log(`💰 Price: €${productData.price} (incl. 21% BTW)`);
    console.log(`🏷️ Features: ${productData.features?.join(', ')}`);

    return productData;

  } catch (error) {
    console.error('❌ Error adding HTC 620 product:', error.message);
    throw error;
  }
}

// Run the test
addHTCProduct()
  .then(() => {
    console.log('\n✅ HTC 620 product addition completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  });