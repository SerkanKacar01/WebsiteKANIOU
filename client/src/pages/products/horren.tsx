import ProductDetailTemplate from "@/components/products/ProductDetailTemplate";

const HorrenPage = () => {
  return (
    <ProductDetailTemplate
      productName="Inzethorren & Plissé Hordeuren"
      productDescription="Op maat gemaakt, stijlvol én functioneel - Laat frisse lucht binnen en houd ongewenste insecten buiten met onze hoogwaardige horren op maat. Of je nu kiest voor een elegante plissé hordeur, een subtiele inzethor of een vaste raamhor – wij zorgen voor een perfecte oplossing voor elk raam of deurtype. Wij voorzien duidelijke meetinstructies voor zelfplaatsing, of komen graag langs voor een professionele montage. Zo ben je zeker van een perfect resultaat."
      imageUrl="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600"
      startingPrice={45.00}
      priceUnit="per stuk"
      features={[
        "Inzethorren: ideaal voor draai-kiepramen, zonder schroeven of boren",
        "Opzethorren: stevig en geschikt voor vaste ramen", 
        "Plissé hordeuren: soepel in gebruik, inklapbaar en ruimtebesparend",
        "Scharnierende deurhorren: klassiek, stevig en duurzaam",
        "Zeer fijnmazig gaas, nauwelijks zichtbaar",
        "Aluminium frame in wit, zwart of grijs",
        "Maatwerk tot op de millimeter nauwkeurig",
        "Eenvoudig te demonteren en reinigen"
      ]}
      categoryName="Horren & Hordeuren"
      categoryPath="horren"
    />
  );
};

export default HorrenPage;