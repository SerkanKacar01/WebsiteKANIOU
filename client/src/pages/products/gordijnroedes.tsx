import ProductDetailTemplate from "@/components/products/ProductDetailTemplate";

const GordijnroedesPage = () => {
  return (
    <ProductDetailTemplate
      productName="Gordijnroedes"
      productDescription="De perfecte afwerking voor jouw gordijnen - Een goede gordijnroede is niet alleen functioneel, maar voegt ook stijl en karakter toe aan je interieur. Wij bieden een breed gamma aan gordijnroedes op maat, geschikt voor alle gordijntypes, van zware overgordijnen tot lichte vitrages. We helpen je graag bij de juiste keuze in functie van het gewicht van je gordijn, het interieur en de gewenste afwerking. Al onze gordijnroedes zijn van hoge kwaliteit en garanderen jarenlang comfort en stabiliteit."
      imageUrl="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600"
      startingPrice={48.00}
      priceUnit="per meter"
      features={[
        "RVS, zwart staal, messing, wit gelakt, hout",
        "Rond, vierkant of ovaal profiel", 
        "Decoratieve eindknoppen of minimalistische afwerking",
        "Enkel of dubbel systeem (bijv. voor combinatie overgordijn + vitrage)",
        "Plafond- of wandmontage",
        "Extra stevige steunen voor brede ramen of zware stoffen",
        "Bochten op maat voor erkers of speciale vormen",
        "Professioneel advies voor keuze op basis van gewicht en stijl"
      ]}
      categoryName="Gordijnroedes"
      categoryPath="gordijnroedes"
    />
  );
};

export default GordijnroedesPage;