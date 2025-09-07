import ProductDetailTemplate from "@/components/products/ProductDetailTemplate";

const VouwgordijnenPage = () => {
  return (
    <ProductDetailTemplate
      productName="Vouwgordijnen op maat"
      productDescription="Sfeervol, stijlvol en functioneel - Onze op maat gemaakte vouwgordijnen combineren elegantie met praktische functionaliteit. Ze zijn ideaal voor wie houdt van een warme, huiselijke uitstraling met een strakke afwerking. Vouwgordijnen zijn geschikt voor zowel klassieke als moderne interieurs en kunnen volledig aangepast worden aan jouw wensen. Met meer dan 40 jaar ervaring selecteren wij alleen stoffen van topkwaliteit die jarenlang mooi blijven. Elk vouwgordijn wordt met zorg op maat gemaakt in ons eigen atelier – perfect passend, professioneel afgewerkt en met oog voor detail."
      imageUrl="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600"
      startingPrice={39.99}
      priceUnit="per lopende meter"
      features={[
        "Verkrijgbaar in verduisterende, lichtdoorlatende en transparante stoffen",
        "Keuze uit effen stoffen, natuurlijke linnen looks of rijke texturen", 
        "Strakke baleinen voor een gelijkmatige vouw",
        "Bedieningsmogelijkheden: kettingbediening, koord, of elektrische bediening",
        "Perfect voor woonkamer, slaapkamer, keuken of kantoor",
        "Wasbare stoffen (afneembaar klittenbandsysteem)",
        "Voering mogelijk voor extra isolatie of verduistering",
        "Combinatie met overgordijnen of vitrages mogelijk"
      ]}
      categoryName="Vouwgordijnen"
      categoryPath="vouwgordijnen"
    />
  );
};

export default VouwgordijnenPage;