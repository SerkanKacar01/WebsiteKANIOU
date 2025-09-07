import ProductDetailTemplate from "@/components/products/ProductDetailTemplate";
import squidImage from "@assets/Scherm­afbeelding 2025-09-07 om 15.54.00_1757253521535.png";

const SquidTextielFoliePage = () => {
  return (
    <ProductDetailTemplate
      productName="SQUID® raamtextiel"
      productDescription="Minimalistische privacy met een luxueuze look - SQUID® is een revolutionaire zelfklevende textielfolie voor ramen die privacy combineert met stijl. Het materiaal is semi-transparant, kleeft rechtstreeks op het raam, en biedt overdag voldoende privacy zonder het zicht volledig te blokkeren. SQUID® is een premium product en enkel geschikt voor gladde ramen zonder structuurglas. We adviseren steeds een professionele plaatsing of gedetailleerde instructie bij zelfplaatsing."
      imageUrl={squidImage}
      startingPrice={69.90}
      priceUnit="per lopende meter"
      features={[
        "Elegante textieluitstraling, in verschillende neutrale kleuren",
        "Eenvoudige montage – zonder boren of schroeven", 
        "Ideaal voor moderne interieurs, kantoren of monumentale panden",
        "UV-werend en warmte-regulerend",
        "Kan op maat gesneden worden voor elk raamtype",
        "Perfect voor badkamers, leefruimtes, kantoren en etalages",
        "Compatibel met draai-kiepramen, dakramen, ramen met onregelmatige vormen",
        "Zowel voor tijdelijke als permanente toepassingen",
        "Beschikbaar in kleuren: Chalk - Bone - Ash - Oak - Rock - Coal",
        "Beschikbaar in 2 transparanties: Transparant - Opaque"
      ]}
      categoryName="SQUID® Textielfolie"
      categoryPath="squid-textiel-folie"
    />
  );
};

export default SquidTextielFoliePage;