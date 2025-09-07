import ProductDetailTemplate from "@/components/products/ProductDetailTemplate";

const VouwgordijnenPage = () => {
  return (
    <ProductDetailTemplate
      productName="Vouwgordijnen op Maat"
      productDescription="Tijdloze elegantie met een moderne afwerking - Bij Kaniou Zilvernaald combineren we ambacht met functionaliteit. Onze vouwgordijnen worden volledig op maat gemaakt en zijn ideaal voor wie op zoek is naar stijlvolle, maar praktische raamdecoratie. Dankzij de zachte plooien creëren ze een warme en elegante sfeer in elke ruimte — van woonkamer tot kantoor. Met meer dan 40 jaar ervaring leveren wij maatwerk van topkwaliteit met persoonlijke begeleiding."
      imageUrl="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600"
      startingPrice={39.99}
      priceUnit="per lopende meter"
      features={[
        "Volledig op maat gemaakt (breedte & hoogte exact afgestemd op jouw ramen)",
        "Verkrijgbaar in verduisterende, lichtdoorlatende en transparante stoffen",
        "Strak vouwmechanisme met kettingbediening of optionele elektrische motor",
        "Afneembare stof voor eenvoudig reinigen",
        "Perfect voor zowel moderne als klassieke interieurs",
        "Keuze uit honderden stoffen, kleuren en texturen",
        "Dubbele voering of thermische isolatie op aanvraag"
      ]}
      categoryName="Vouwgordijnen"
      categoryPath="vouwgordijnen"
    />
  );
};

export default VouwgordijnenPage;