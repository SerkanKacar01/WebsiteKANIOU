import ProductDetailTemplate from "@/components/products/ProductDetailTemplate";

const SquidTextielFoliePage = () => {
  return (
    <ProductDetailTemplate
      productName="SQUID® raamtextiel"
      productDescription="Minimalistische privacy met een luxueuze look - SQUID® is een revolutionaire zelfklevende textielfolie voor ramen die privacy combineert met stijl. Het materiaal is semi-transparant, kleeft rechtstreeks op het raam, en biedt overdag voldoende privacy zonder het zicht volledig te blokkeren. SQUID® is een premium product en enkel geschikt voor gladde ramen zonder structuurglas. We adviseren steeds een professionele plaatsing of gedetailleerde instructie bij zelfplaatsing."
      imageUrl="https://images.unsplash.com/photo-1558618047-0c01c3a6d7c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600"
      startingPrice={73.00}
      priceUnit="per lopende meter"
      features={[
        "Elegante textieluitstraling, in verschillende neutrale kleuren",
        "Eenvoudige montage – zonder boren of schroeven", 
        "Ideaal voor moderne interieurs, kantoren of monumentale panden",
        "UV-werend en warmte-regulerend",
        "Kan op maat gesneden worden voor elk raamtype",
        "Perfect voor badkamers, leefruimtes, kantoren en etalages",
        "Compatibel met draai-kiepramen, dakramen, ramen met onregelmatige vormen",
        "Zowel voor tijdelijke als permanente toepassingen"
      ]}
      categoryName="SQUID® Textielfolie"
      categoryPath="squid-textiel-folie"
    />
  );
};

export default SquidTextielFoliePage;