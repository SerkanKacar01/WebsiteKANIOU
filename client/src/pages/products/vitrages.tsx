import React from "react";
import ProductDetailTemplate from "@/components/products/ProductDetailTemplate";

const VitragesPage = () => {
  return (
    <ProductDetailTemplate
      productName="Vitrages"
      productDescription="Elegant transparante gordijnen die zorgen voor zachte lichtinval en subtiele privacy. Perfect voor een lichte en sfeervolle ruimte."
      imageUrl="https://images.unsplash.com/photo-1585586463948-9e40851ed193?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
      startingPrice={19.99}
      priceUnit="per meter"
      features={[
        "Zachte lichtfiltering",
        "Subtiele privacy",
        "Diverse transparanties",
        "Verschillende plooien mogelijk",
        "Professionele confectie",
        "Gratis inmeting"
      ]}
      categoryName="Vitrages"
      categoryPath="vitrages"
    />
  );
};

export default VitragesPage;