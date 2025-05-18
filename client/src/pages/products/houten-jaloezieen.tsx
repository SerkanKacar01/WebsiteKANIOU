import ProductDetailTemplate from "@/components/products/ProductDetailTemplate";

const HoutenJaloezieen = () => {
  return (
    <ProductDetailTemplate
      productName="Houten Jaloezieën"
      productDescription="Premium wooden blinds that bring natural warmth and elegance to any interior. Precision light control with a luxurious finish."
      imageUrl="https://images.unsplash.com/photo-1513373319897-766211181486?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000"
      startingPrice={99}
      priceUnit="per window"
      features={[
        "Made from sustainable wood sources",
        "Available in multiple slat widths",
        "Custom staining and color options",
        "Cord or cordless operation",
        "Perfect light control and privacy",
        "Made to measure in any size"
      ]}
      categoryName="Wooden Blinds"
      categoryPath="houten-jaloezieen"
    />
  );
};

export default HoutenJaloezieen;